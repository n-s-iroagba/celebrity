import bcrypt from "bcryptjs"
import { User } from "../models/User"
import { Fan } from "../models/Fan"
import { MailService } from "./MailService"
import { JWTService, type LoginPayload, type VerificationPayload, type NewPasswordPayload } from "./JWTService"
import type { UserCreationAttributes } from "../models/User"
import type { CelebrityCreationAttributes } from "../models/Celebrity"
import { Role } from "../enums/Role"
import sequelize from "../config/orm"
import { Celebrity } from "../models/Celebrity"
import { FanService } from "./FanService" // Import FanService
import { Admin } from "../models/Admin"
import { TemporaryChatService } from "./TemporaryChatService" // Import the new service

const SALT_ROUNDS = 10
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"

export class AuthService {
  static hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS)
  }

  static validatePasswordComplexity(password: string): { isValid: boolean; message?: string } {
    if (!password) {
      return { isValid: false, message: "Password cannot be empty." }
    }
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)

    if (password.length < minLength) {
      return { isValid: false, message: `Password must be at least ${minLength} characters long.` }
    }
    if (!hasUpperCase) {
      return { isValid: false, message: "Password must contain at least one uppercase letter." }
    }
    if (!hasLowerCase) {
      return { isValid: false, message: "Password must contain at least one lowercase letter." }
    }
    if (!hasNumber) {
      return { isValid: false, message: "Password must contain at least one number." }
    }
    if (!hasSpecialChar) {
      return { isValid: false, message: "Password must contain at least one special character." }
    }
    return { isValid: true }
  }

  static async registerFan(
    userData: Pick<User, "email" | "password" | "firstName" | "lastName" | "phoneNumber">,
    fanData: Pick<Fan, "country" | "dateOfBirth" | "gender">, // Initial profile data can be optional here
    tempSessionId?: string, // Add this new parameter
  ): Promise<{ user: User; token: string; verificationToken?: string }> {
    const { email, password, firstName, lastName, phoneNumber } = userData

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new Error("User with this email already exists.")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = JWTService.generateEmailVerificationToken({ email })
    const verificationLink = `${CLIENT_URL}/verify-email?token=${verificationToken}`

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role: Role.FAN,
      isEmailVerified: false, // Email not verified initially
      isProfileComplete: false, // Profile not complete initially
    })

    // Create Fan profile stub (can be expanded later)
    const newFan = await FanService.createFanForUser(newUser.id, {
      // country: fanData.country, // These will be set after email verification
      // dateOfBirth: fanData.dateOfBirth,
      // gender: fanData.gender,
    })

    // Try to claim temporary chat messages
    if (tempSessionId && newFan) {
      try {
        await TemporaryChatService.claimTemporaryChat(tempSessionId, newFan.id, newUser.id)
        console.log(`Successfully claimed temporary chat ${tempSessionId} for new user ${newUser.email}`)
      } catch (claimError) {
        console.error(`Failed to claim temporary chat ${tempSessionId} for user ${newUser.email}:`, claimError)
        // Decide if this error should prevent registration or just be logged.
        // For now, we'll log it and continue.
      }
    }

    try {
      await MailService.sendVerificationEmail(email, verificationLink, firstName || "User")
    } catch (mailError) {
      console.error("Failed to send verification email:", mailError)
      // Potentially roll back user creation or mark for re-sending
      // For now, we proceed but this is a critical failure point in a real app
    }

    // For registration, we usually don't log them in directly until email is verified.
    // But if your flow requires immediate login, generate a token here.
    // For now, returning user and verification token for the frontend to handle.
    return { user: newUser, token: verificationToken } // Or an auth token if auto-login
  }

  static async verifyEmailWithLinkToken(token: string): Promise<{ user: User; loginToken: string }> {
    const decoded = JWTService.verifyEmailVerificationToken(token)
    if (!decoded) {
      throw new Error("Invalid or expired verification token.")
    }

    const user = await User.findByPk(decoded.userId)
    if (!user) {
      throw new Error("User not found for this verification token.")
    }
    if (user.isEmailVerified) {
      // Optional: if already verified, just generate a login token or inform the user
      const loginToken = JWTService.generateLoginToken(user)
      return { user, loginToken }
    }
    if (user.verificationToken !== token) {
      throw new Error("Verification token mismatch. It might have been reissued or is invalid.")
    }

    user.isEmailVerified = true
    user.verificationToken = null // Clear the token
    user.emailVerificationCode = null // Clear code if it was also set
    await user.save()

    const loginToken = JWTService.generateLoginToken(user)
    return { user, loginToken }
  }

  static async login(
    email: string,
    password?: string, // Password is now optional for OAuth
    googleId?: string, // Added for Google OAuth
    tempSessionId?: string, // Add this new parameter
  ): Promise<{
    user: User
    token: string
    fanProfile?: Fan | null
    celebrityProfile?: Celebrity | null
    adminProfile?: Admin | null
    message: string
  }> {
    let user: User | null = null

    if (googleId) {
      user = await User.findOne({ where: { googleId } })
      if (!user) {
        // This case should ideally be handled by an OAuth registration flow
        // For now, we'll throw an error or you could auto-register them.
        throw new Error("User with this Google account not found. Please sign up first or ensure Google ID is linked.")
      }
    } else if (email && password) {
      user = await User.findOne({ where: { email } })
      if (!user || !user.password) {
        // Check if password exists (might not for OAuth-only users)
        throw new Error("Invalid email or password.")
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        throw new Error("Invalid email or password.")
      }
    } else {
      throw new Error("Login credentials incomplete.")
    }

    if (!user) {
      // Should be caught above, but as a safeguard
      throw new Error("Authentication failed.")
    }

    // Removed the email verification check here to allow login for OAuth users who might not have verified via link
    // if (!user.isEmailVerified) {
    //   const verificationToken = JWTService.generateEmailVerificationToken({ email: user.email });
    //   const verificationLink = `${CLIENT_URL}/verify-email?token=${verificationToken}`;
    //   // Consider re-sending email or just informing the user
    //   // await MailService.sendVerificationEmail(user.email, verificationLink, user.firstName || "User");
    //   throw new Error(
    //     "Email not verified. Please check your inbox for the verification link or request a new one."
    //   );
    // }

    const tokenPayload: LoginPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }
    const token = JWTService.generateAuthToken(tokenPayload)

    let fanProfile: Fan | null = null
    let celebrityProfile: Celebrity | null = null
    let adminProfile: Admin | null = null
    const message = "Login successful."

    if (user.role === Role.FAN) {
      fanProfile = await Fan.findOne({ where: { userId: user.id } })
      if (fanProfile && tempSessionId) {
        try {
          const claimedChat = await TemporaryChatService.claimTemporaryChat(tempSessionId, fanProfile.id, user.id)
          if (claimedChat) {
            console.log(`Successfully claimed temporary chat ${tempSessionId} for user ${user.email} during login.`)
          }
        } catch (claimError) {
          console.error(
            `Failed to claim temporary chat ${tempSessionId} for user ${user.email} during login:`,
            claimError,
          )
        }
      }
      if (fanProfile && !user.isProfileComplete) {
        // message = "Login successful. Please complete your profile."; // Frontend will handle redirect
      }
    } else if (user.role === Role.CELEBRITY) {
      celebrityProfile = await Celebrity.findOne({ where: { userId: user.id } })
    } else if (user.role === Role.ADMIN) {
      adminProfile = await Admin.findOne({ where: { userId: user.id } })
    }

    return { user, token, fanProfile, celebrityProfile, adminProfile, message }
  }

  // ... (resendVerificationToken, forgotPassword, resetPassword from previous steps, ensure they use new JwtService methods)
  static async resendVerificationEmail(email: string): Promise<void> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error("User with this email not found.")
    }
    if (user.isEmailVerified) {
      throw new Error("Email is already verified.")
    }

    const verificationToken = JWTService.generateEmailVerificationToken({ email })
    const verificationLink = `${CLIENT_URL}/verify-email?token=${verificationToken}`
    await MailService.sendVerificationEmail(email, verificationLink, user.firstName || "User")
  }

  // forgotPassword and resetPassword would also use JwtService.generateForgotPasswordToken and JwtService.verifyForgotPasswordToken
  // Ensure they are updated similarly to verifyEmailWithLinkToken
  static async forgotPassword(email: string): Promise<void> {
    try {
      const user = await User.findOne({ where: { email } })

      if (user) {
        user.passwordResetToken = JWTService.generatePasswordResetToken({ userId: user.id, email: user.email })
        await user.save()
        await MailService.SendForgotPasswordMail(user)
      }
      console.log(`Password reset requested for email: ${email}. If user exists, email sent.`)
    } catch (error: any) {
      console.error("Error in AuthService.forgotPassword:", error)
      // Do not throw error to client to prevent email enumeration
    }
  }

  static async resetPassword(payload: NewPasswordPayload): Promise<string> {
    const passwordValidation = this.validatePasswordComplexity(payload.password)
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message)
    }

    const decodedToken = JWTService.verifyPasswordResetToken(payload.token) // Use specific verification
    if (!decodedToken) {
      throw new Error("Invalid or expired password reset token.")
    }

    try {
      const user = await User.scope("withPassword").findOne({
        where: {
          id: decodedToken.userId, // Use userId from token
          email: decodedToken.email,
          passwordResetToken: payload.token, // Still check the token itself
        },
      })

      if (!user) {
        throw new Error("Invalid or expired password reset token, or user not found. Please request a new one.")
      }

      const hashedPassword = await this.hashPassword(payload.password)
      user.password = hashedPassword
      user.passwordResetToken = null
      // user.isEmailVerified = true; // Email should already be verified to reset password, or verify it now if needed
      await user.save()

      await MailService.sendPasswordChangedNotification(user)

      // Log the user in after successful password reset
      const { token } = await this.login(user.email, payload.password)
      return token
    } catch (error: any) {
      console.error("Error in AuthService.resetPassword:", error)
      throw new Error(error instanceof Error ? error.message : `Failed to reset password: ${String(error)}`)
    }
  }

  static async registerCelebrity(
    userData: Pick<UserCreationAttributes, "email" | "password" | "whatsAppNumber">,
    celebrityData: Pick<CelebrityCreationAttributes, "firstName" | "surname" | "stageName" | "bio" | "image">,
  ): Promise<{ user: User; celebrity: Celebrity }> {
    const passwordValidation = this.validatePasswordComplexity(userData.password!)
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message)
    }

    const t = await sequelize.transaction()
    try {
      const hashedPassword = await AuthService.hashPassword(userData.password!)
      const newUser = await User.create(
        {
          ...userData,
          password: hashedPassword,
          role: Role.CELEBRITY,
        },
        { transaction: t },
      )

      const newCelebrity = await Celebrity.create(
        {
          ...celebrityData,
          userId: newUser.id,
        },
        { transaction: t },
      )

      await User.update({ celebrityId: newCelebrity.id }, { where: { id: newUser.id }, transaction: t })

      await t.commit()
      return { user: newUser, celebrity: newCelebrity }
    } catch (error) {
      await t.rollback()
      if (error instanceof Error && error.name === "SequelizeUniqueConstraintError") {
        throw new Error("User with this email already exists.")
      }
      console.error("Error registering celebrity:", error)
      // If it's a password validation error from above, it will be re-thrown here.
      // Otherwise, it's a generic registration failure.
      throw new Error(error instanceof Error ? error.message : `Failed to register celebrity: ${String(error)}`)
    }
  }

  static async verifyEmail(token: string): Promise<User> {
    try {
      const decoded = JWTService.verifyEmailVerificationToken(token) as VerificationPayload
      const user = await User.findOne({ where: { email: decoded.email } })

      if (!user) {
        throw new Error("Invalid or expired verification token. User not found.")
      }

      if (user.isEmailVerified) {
        // Optional: treat as success if already verified, or inform user
        // throw new Error("Email already verified.");
        return user // Return user, frontend can decide next step
      }

      user.isEmailVerified = true
      // Profile is not yet complete at this stage for new fan users
      // user.isProfileComplete = user.role === Role.FAN ? false : true; // Set based on role
      await user.save()
      return user
    } catch (error) {
      console.error("Email verification error:", error)
      throw new Error(`Email verification failed: ${error instanceof Error ? error.message : "Invalid token"}`)
    }
  }

  static async resendVerificationToken(verificationTokenInput: string): Promise<void> {
    try {
      const user = await User.findOne({ where: { verificationToken: verificationTokenInput } })
      if (!user) {
        console.warn(`Attempt to resend verification for non-existent or invalid token: ${verificationTokenInput}`)
        return
      }

      if (user.isEmailVerified) {
        console.log(`User ${user.email} attempted to resend verification but is already verified.`)
        return
      }

      user.emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      user.verificationToken = JWTService.generateEmailVerificationToken(user)
      await user.save()

      await MailService.sendVerificationEmail(user)
      console.log(`Resent verification email to ${user.email}`)
    } catch (error: any) {
      console.error("Error in AuthService.resendVerificationToken:", error)
      throw new Error("Failed to resend verification token. Please try again later.")
    }
  }

  // Add this new static method or integrate its logic into passport callback directly
  // For simplicity, the logic is mostly in passport-setup.ts for now.
  // If AuthService needs to be more involved:
  /*
  static async findOrCreateUserForGoogle(profile: any): Promise<User> {
    const t = await sequelize.transaction();
    try {
      const email = profile.emails && profile.emails[0]?.value;
      if (!email) {
        throw new Error("Email not found from Google profile.");
      }

      let user = await User.findOne({ where: { googleId: profile.id }, transaction: t });

      if (!user) {
        user = await User.findOne({ where: { email }, transaction: t });
        if (user) {
          user.googleId = profile.id;
          if (!user.isEmailVerified) user.isEmailVerified = true;
          await user.save({ transaction: t });
        } else {
          const newUser = await User.create({
            googleId: profile.id,
            email,
            role: Role.FAN,
            isEmailVerified: true,
            whatsAppNumber: "N/A_Google_Signup", // Placeholder
          }, { transaction: t });

          const fanData = {
            firstName: profile.name?.givenName || "GoogleUser",
            surname: profile.name?.familyName || "Fan",
          };
          await FanService.createFanProfile(newUser.id, fanData, t);
          user = newUser;
        }
      }
      await t.commit();
      return user;
    } catch (error) {
      await t.rollback();
      console.error("Error in findOrCreateUserForGoogle:", error);
      throw error;
    }
  }
  */

  // In the login method, when fetching user, include fanProfile:
  // const user = await User.scope("withPassword").findOne({
  //   where: { email },
  //   include: [{ model: Fan, as: "fanProfile" }] // Ensure Fan model is imported
  // });

  // In the login method, the password check should be conditional if allowing OAuth users to also set a password later
  // if (!user || !user.password && !user.googleId) { // If no password AND no googleId, then invalid for email/pass login
  //   throw new Error("Invalid credentials or user not found.");
  // }
  // if (user.password) { // Only check password if it exists
  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) throw new Error("Invalid credentials.");
  // } else if (!user.googleId) { // No password and no googleId means something is wrong
  //    throw new Error("Login method not supported for this account.");
  // }
  // This part needs careful thought if mixing email/pass and OAuth for the same account.
  // For now, the passport strategy handles OAuth login separately.
  // The existing login method is for email/password.

  static async completeFanProfile(
    userId: number,
    profileData: { country: string; dateOfBirth: string; gender: string },
  ): Promise<Fan> {
    const user = await User.findByPk(userId)
    if (!user || user.role !== Role.FAN) {
      throw new Error("User not found or not a fan.")
    }
    if (user.isProfileComplete) {
      throw new Error("Profile already completed.")
    }

    const fanProfile = await Fan.findOne({ where: { userId } })
    if (!fanProfile) {
      // This case should ideally not happen if Fan record is created during registration
      throw new Error("Fan profile not found.")
    }

    // Validate profileData (e.g., date format, gender enum) before updating
    // For simplicity, direct update here
    fanProfile.country = profileData.country
    fanProfile.dateOfBirth = new Date(profileData.dateOfBirth) // Ensure it's a Date object
    fanProfile.gender = profileData.gender as "male" | "female" | "other" | "prefer_not_to_say" // Cast if gender is an ENUM

    await fanProfile.save()

    user.isProfileComplete = true
    await user.save()

    return fanProfile
  }
}

// Ensure these types are defined or imported if not already
// export type UserCreationAttributes = import("../models/User").UserCreationAttributes
// export type FanCreationAttributes = import("../models/Fan").FanCreationAttributes
// export type CelebrityCreationAttributes = import("../models/Celebrity").CelebrityCreationAttributes
