import type { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/AuthService"
import { User } from "../models/User" // For type checking if needed
import { JwtService } from "../services/JwtService"
import passport from "passport"
import { Fan } from "../models/Fan"

export class AuthController {
  static async registerFan(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, whatsAppNumber, firstName, surname } = req.body
      if (!email || !password || !whatsAppNumber || !firstName || !surname) {
        return res.status(400).json({ message: "Missing required fields." })
      }

      const { user, fan, verificationToken } = await AuthService.registerFan(
        { email, password, whatsAppNumber },
        { firstName, surname },
      )

      // Exclude sensitive data before sending response
      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        fanId: fan.id,
      }

      return res.status(201).json({
        message: "Fan registered successfully. Please check your email to verify your account.",
        user: userResponse,
        // verificationToken // Optionally return token if client needs it for resend UI immediately
      })
    } catch (error: any) {
      console.error("Fan registration error:", error)
      if (
        error.message.includes("Password must") ||
        error.message.includes("Password cannot be empty") ||
        error.message.includes("User with this email already exists.")
      ) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(500).json({ message: "Fan registration failed.", error: error.message })
    }
  }

  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." })
      }
      const { user, token, isProfileComplete } = await AuthService.login(email, password)

      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        fanId: user.fanId,
        isProfileComplete,
      }

      return res.status(200).json({ token, user: userResponse })
    } catch (error: any) {
      console.error("Login error:", error)
      if (error.message.includes("Invalid credentials") || error.message.includes("Email not verified")) {
        return res.status(401).json({ message: error.message })
      }
      return res.status(500).json({ message: "Login failed.", error: error.message })
    }
  }

  static async verifyEmailLink(req: Request, res: Response): Promise<any> {
    try {
      const { token } = req.params
      if (!token) {
        return res.status(400).json({ message: "Verification token is missing." })
      }
      const { user, loginToken } = await AuthService.verifyEmailWithLinkToken(token)

      // Instead of sending user data, redirect to a frontend page with the login token
      // The frontend can then use this token to log the user in and fetch profile.
      // Or, for API testing, you might return the user and token.
      // For a real user flow, redirect is better.
      const clientVerifySuccessUrl = `${process.env.CLIENT_URL}/email-verified-success?token=${loginToken}`
      return res.redirect(clientVerifySuccessUrl)
    } catch (error: any) {
      console.error("Email verification error:", error)
      // Redirect to a failure page on the client
      const clientVerifyFailUrl = `${process.env.CLIENT_URL}/email-verified-failed?error=${encodeURIComponent(error.message)}`
      return res.redirect(clientVerifyFailUrl)
      // return res.status(400).json({ message: error.message });
    }
  }

  static async resendVerificationEmail(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body
      if (!email) {
        return res.status(400).json({ message: "Email is required." })
      }
      await AuthService.resendVerificationEmail(email)
      return res
        .status(200)
        .json({ message: "If your email is registered and unverified, a new verification email has been sent." })
    } catch (error: any) {
      // Should not happen if AuthService handles errors gracefully
      console.error("Resend verification error:", error)
      return res.status(500).json({ message: "Failed to resend verification email.", error: error.message })
    }
  }

  // forgotPassword and resetPassword controllers from previous steps
  // Ensure they call the updated AuthService methods
  static async forgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body
      if (!email) {
        return res.status(400).json({ message: "Email is required." })
      }
      await AuthService.forgotPassword(email)
      return res
        .status(200)
        .json({ message: "If your email address is registered, you will receive a password reset link shortly." })
    } catch (error: any) {
      console.error("Forgot password controller error:", error)
      return res.status(500).json({ message: "An error occurred processing your request." })
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      const { token } = req.params // Assuming token is in URL params
      const { password } = req.body

      if (!token || !password) {
        return res.status(400).json({ message: "Token and new password are required." })
      }

      const loginToken = await AuthService.resetPassword({ token, password })
      // After successful reset, the user is effectively logged in.
      // Fetch user details to return, similar to login.
      const decodedLoginToken = JwtService.verifyLoginToken(loginToken)
      if (!decodedLoginToken) {
        throw new Error("Failed to decode login token after password reset.")
      }
      const user = await User.findByPk(decodedLoginToken.userId, {
        include: [{ model: Fan, as: "fanProfile" }],
      })
      if (!user) {
        throw new Error("User not found after password reset.")
      }
      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        fanId: user.fanId,
        isProfileComplete: true,
      }

      return res.status(200).json({
        message: "Password has been reset successfully.",
        token: loginToken,
        user: userResponse,
      })
    } catch (error: any) {
      console.error("Reset password error:", error)
      if (error.message.includes("Password must") || error.message.includes("Invalid or expired")) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(500).json({ message: "Failed to reset password.", error: error.message })
    }
  }

  static googleAuth(req: Request, res: Response, next: NextFunction) {
    // `next` is important if passport.authenticate might call it.
    // For redirect strategy, often not explicitly called here.
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next)
  }

  static async googleAuthCallback(req: Request, res: Response) {
    // This is the new callback handler
    // passport.authenticate will call this after Google redirects
    // We need to define what happens on success (generate JWT, redirect client)
    // and on failure.
    // The actual passport.authenticate call for the callback will be in the router.
    // This function is what passport.authenticate will invoke upon successful authentication.
    try {
      const user = req.user as User // User is attached by Passport
      if (!user) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`)
      }

      const token = JwtService.generateLoginToken(user)

      // Check fan profile completion
      const fanProfile = await Fan.findOne({ where: { userId: user.id } })
      let isProfileComplete = false
      if (fanProfile) {
        isProfileComplete = !!(fanProfile.countryOfResidence && fanProfile.dateOfBirth && fanProfile.gender)
      }

      // Redirect to a frontend page that can process the token
      return res.redirect(
        `${process.env.CLIENT_URL}/oauth-callback?token=${token}&isProfileComplete=${isProfileComplete}&userId=${user.id}&email=${user.email}&role=${user.role}&fanId=${user.fanId || ""}`,
      )
    } catch (error) {
      console.error("Google OAuth callback error:", error)
      return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_callback_error`)
    }
  }
}
