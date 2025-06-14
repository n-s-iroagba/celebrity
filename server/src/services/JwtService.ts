import jwt from "jsonwebtoken"
import type { User } from "../models/User" // Assuming User model is in ../models/User
import type { LoginPayload } from "../types/LoginPayload"
import type { VerificationPayload } from "../types/VerificationPayload"
// import type { NewPasswordToken } from "../types/NewPasswordToken"; // Replaced by PasswordResetTokenPayload
import type { PasswordResetTokenPayload } from "../types/PasswordResetTokenPayload"

const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-jwt-secret"
const EMAIL_VERIFICATION_SECRET = process.env.EMAIL_VERIFICATION_SECRET || "your-email-verification-secret"
const PASSWORD_RESET_SECRET = process.env.PASSWORD_RESET_SECRET || "your-password-reset-secret" // Ensure this is in your .env

export class JWTService {
  static generateAuthToken(payload: LoginPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }) // Example: 1 day expiration
  }

  static verifyAuthToken(token: string): LoginPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as LoginPayload
    } catch (error) {
      console.error("Invalid auth token:", error)
      return null
    }
  }

  static generateEmailVerificationToken(user: Pick<User, "id" | "email">): string {
    const payload: VerificationPayload = { userId: user.id, email: user.email, type: "email_verification" }
    return jwt.sign(payload, EMAIL_VERIFICATION_SECRET, { expiresIn: "24h" })
  }

  static verifyEmailVerificationToken(token: string): VerificationPayload | null {
    try {
      const decoded = jwt.verify(token, EMAIL_VERIFICATION_SECRET) as VerificationPayload
      if (decoded.type === "email_verification") {
        return decoded
      }
      return null
    } catch (error) {
      console.error("Invalid email verification token:", error)
      return null
    }
  }

  static generatePasswordResetToken(user: Pick<User, "id" | "email">): string {
    const payload: PasswordResetTokenPayload = { userId: user.id, email: user.email }
    // Shorter expiry for password reset tokens is generally a good practice
    return jwt.sign(payload, PASSWORD_RESET_SECRET, { expiresIn: "1h" })
  }

  static verifyPasswordResetToken(token: string): PasswordResetTokenPayload | null {
    try {
      return jwt.verify(token, PASSWORD_RESET_SECRET) as PasswordResetTokenPayload
    } catch (error) {
      console.error("Invalid password reset token:", error)
      return null
    }
  }

  // For login after email verification or password reset (if you want a specific token for that)
  static generateLoginToken(user: User): string {
    const payload: LoginPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" }) // Shorter lived, e.g., for immediate login
  }

  static verifyLoginToken(token: string): LoginPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as LoginPayload
    } catch (error) {
      console.error("Invalid login token:", error)
      return null
    }
  }
}
