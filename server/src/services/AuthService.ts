import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Admin } from "../models/Admin";
import { Fan } from "../models/Fan";
import { MailService } from "./MailService";
import { UserService } from "./UserService";
import { JwtService } from "./JWTService";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export class AuthService {
  static hashPassword = (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
  };

  static async verifyEmail(payload: { veriicationCode: string; token: string }): Promise<{ token: string; user: Admin | Fan }> {
    try {
      const user = await User.findOne({ where: { verificationToken: payload.token } });
      if (!user) throw new Error("User not found");
      const token = user.verificationToken;
      if (!token) throw new Error("Token not found");
  
      const decoded = JwtService.verifyToken<{verificationCode:string,email:string}>(token);
      if (!decoded.verificationCode || !decoded.email) throw new Error("Invalid token structure");
      if (user.email !== decoded.email || decoded.verificationCode !== payload.veriicationCode) {
        throw new Error("Invalid verification");
      }
      user.verificationToken = null;
      await user.save();
      let detailedUser;
      switch (user.role) {
        case "admin":
          detailedUser = await Admin.findOne({ where: { userId: user.id } });
          break;
        case "fan":
          detailedUser = await Fan.findOne({ where: { userId: user.id } });
          break;
        default:
          throw new Error("Role not recognized");
      }
      if (!detailedUser) throw new Error("User details not found for the specified role");
      const newToken = JwtService.generateLoginToken(user);
      return { token: newToken, user: detailedUser };
    } catch (error) {
      throw new Error("Invalid or expired verification token");
    }
  }
  

  static async login(email: string, password: string): Promise<{ token: string; user: Admin | Fan }> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    if (user.verificationToken) throw new Error("Email not verified");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");
    let detailedUser;
    switch (user.role) {
      case "admin":
        detailedUser = await Admin.findOne({ where: { userId: user.id } });
        break;
      case "fan":
        detailedUser = await Fan.findOne({ where: { userId: user.id } });
        break;
      default:
        throw new Error("Role not recognized");
    }
    if (!detailedUser) throw new Error("User details not found for the specified role");
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user: detailedUser };
  }

  static async forgotPassword(email: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetToken = jwt.sign({ id: user.id, email: user.email, veriicationCode: resetCode }, JWT_SECRET, { expiresIn: "15m" });
    user.passwordResetToken = resetToken;
    await user.save();
    await MailService.sendMail(
      user.email,
      "Password Reset Code",
      `Your password reset veriicationCode is: ${resetCode}`,
      `<p>Your password reset veriicationCode is: <b>${resetCode}</b></p>`
    );
    return user.email;
  }

  static async resetPassword(email: string, resetCode: string, newPassword: string): Promise<void> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    const token = user.passwordResetToken || "";
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; veriicationCode: string };
    if (!decoded || decoded.veriicationCode !== resetCode || decoded.email !== email) {
      throw new Error("Invalid or expired reset veriicationCode");
    }
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.verificationToken = null;
    await user.save();
  }
}
