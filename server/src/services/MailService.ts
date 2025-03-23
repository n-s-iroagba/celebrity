import nodemailer from "nodemailer";
import { User } from "../models/User";

export class MailService {
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  static async sendVerificationEmail(user:User): Promise<void> {
    const subject = "Verify Your Email";
    const text=''
    const html=""
    
    await this.sendMail(user.email, subject, text, html);
  }

  static async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
  }
  static async SendForgotPasswordMail (user:User){
    this.sendMail(
      user.email,
      "Password Reset Code",
      `Password Reset`,
      //make href link to the change password route
      `<p>Your password reset veriicationCode is: <b>${user.passwordResetToken}</b></p>`
    );
  }
}


