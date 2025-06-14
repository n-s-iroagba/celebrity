import type { Role } from "../enums/Role"
import { User } from "../models/User"
import { AuthService } from "./AuthService"
import { JwtService } from "./JWTService"

export class UserService {
  static async createUser(role: Role, userData: { email: string; password: string; whatsAppNumber: string }) {
    const { email, password, whatsAppNumber } = userData
    const emailCode = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    const whatsAppCode = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    const hashedPassword = await AuthService.hashPassword(password)
    const user = await User.create({
      email: email,
      password: hashedPassword,
      role: role,
      verificationToken: null,
      emailVerificationCode: emailCode, // Ensure it's a string
      whatsAppVerificationCode: whatsAppCode, // Ensure it's a string
      whatsAppNumber,
      isWhatsAppVerified: false, // Default to false for new user
      isEmailVerified: false, // Default to false for new user
      // passwordResetToken: null, // Already optional
    })
    const verificationToken = JwtService.generateEmailVerificationToken(user)
    user.verificationToken = verificationToken
    await user.save()
    return user
  }

  static async findOrCreateUser(
    role: Role,
    userData: { email: string; password: string; whatsAppNumber: string },
    isVerified = false, // Add option to create a verified user for tests
  ): Promise<[User, boolean]> {
    const { email, password, whatsAppNumber } = userData
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      // Optionally update password or verification status if needed for tests
      // For simplicity, we'll just return the existing user
      // If you need to ensure they are verified:
      if (isVerified && (!existingUser.isEmailVerified || !existingUser.isWhatsAppVerified)) {
        existingUser.isEmailVerified = true
        existingUser.isWhatsAppVerified = true // Or just one, depending on test needs
        existingUser.emailVerificationCode = null
        existingUser.whatsAppVerificationCode = null
        await existingUser.save()
      }
      return [existingUser, false] // User found, not created
    }

    // User not found, create them
    const emailCode = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    const whatsAppCode = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    const hashedPassword = await AuthService.hashPassword(password)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
      whatsAppNumber,
      emailVerificationCode: isVerified ? null : emailCode,
      whatsAppVerificationCode: isVerified ? null : whatsAppCode,
      isEmailVerified: isVerified,
      isWhatsAppVerified: isVerified, // Or just one, depending on test needs
      verificationToken: null, // Will be set below if not verified
    })

    if (!isVerified) {
      const verificationToken = JwtService.generateEmailVerificationToken(newUser)
      newUser.verificationToken = verificationToken
      await newUser.save()
    }
    return [newUser, true] // User created
  }
}
