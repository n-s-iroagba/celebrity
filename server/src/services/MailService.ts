import nodemailer from "nodemailer";

export class MailService {
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  static async sendVerificationEmail(email: string, verificationUrl: string): Promise<void> {
    const subject = "Verify Your Email";
    const text = `Please verify your email by clicking the link: ${verificationUrl}`;
    const html = `<p>Please verify your email by clicking the link: <a href="${verificationUrl}">Verify Email</a></p>`;

    await this.sendMail(email, subject, text, html);
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
}
