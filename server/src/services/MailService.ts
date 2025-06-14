import type { User } from "../models/User" // Ensure User model is imported

// Placeholder MailService - In a real app, integrate with a proper email provider.
export class MailService {
  static async sendVerificationEmail(user: User): Promise<void> {
    if (!user.verificationToken) {
      console.error(
        `MailService: Attempted to send verification email to ${user.email} but no verificationToken found.`,
      )
      // Optionally throw an error or handle gracefully
      return
    }
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${user.verificationToken}`
    console.log("---- SENDING VERIFICATION EMAIL (SIMULATED) ----")
    console.log(`To: ${user.email}`)
    console.log(`Subject: Verify Your Email Address`)
    console.log(`Body: Hello ${user.email}, please verify your email by clicking this link: ${verificationLink}`)
    console.log(`Or use this code (if applicable): ${user.emailVerificationCode || "N/A"}`)
    console.log("-------------------------------------------------")
    // In a real app:
    // await this.transporter.sendMail({ /* ... email options ... */ });
  }

  static async SendForgotPasswordMail(user: User): Promise<void> {
    if (!user.passwordResetToken) {
      console.error(
        `MailService: Attempted to send password reset email to ${user.email} but no passwordResetToken found.`,
      )
      return
    }
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${user.passwordResetToken}`
    console.log("---- SENDING PASSWORD RESET EMAIL (SIMULATED) ----")
    console.log(`To: ${user.email}`)
    console.log(`Subject: Password Reset Request`)
    console.log(`Body: Hello ${user.email}, reset your password here: ${resetLink}`)
    console.log("---------------------------------------------------")
  }

  static async sendPasswordChangedNotification(user: User): Promise<void> {
    console.log("---- SENDING PASSWORD CHANGED NOTIFICATION (SIMULATED) ----")
    console.log(`To: ${user.email}`)
    console.log(`Subject: Your Password Has Been Changed`)
    console.log(
      `Body: Hello ${user.email}, this email confirms that the password for your account has been changed recently.`,
    )
    console.log("---------------------------------------------------------")
  }
}
