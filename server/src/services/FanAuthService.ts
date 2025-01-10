
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { MailService } from "./MailService";
import { Role } from "../enums/Role";
import { Fan, FanCreationAttributes } from "../models/Fan";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const SALT_ROUNDS = 10;
const BASE_URL = process.env.BASE_URL || "http://localhost:8000";
 
  export class AuthService {
    // Create user (fan, admin, or superadmin)
    static async createFan(fanData: Partial<Fan>,email:string): Promise<string> {
        const {
          firstName,
          surname,
          password,
          socialMediaHandle,
          socialMediaType,
          phoneNumber,
          country,
          dateOfBirth,
        } = fanData;
    
        if (
          !firstName ||
          !surname ||
          !email ||
          !password ||
          !socialMediaHandle ||
          !socialMediaType ||
          !phoneNumber ||
          !country ||
          !dateOfBirth
        ) {
          throw new Error("Missing required fields");
        }
    
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
        const code = Math.random()*1000000
    
        const verificationToken = jwt.sign({ email,code,role:Role.FAN }, JWT_SECRET, { expiresIn: "1h" });
    
        const fan = await Fan.create({
          firstName,
          surname,
          socialMediaHandle,
          socialMediaType,
          phoneNumber,
          country,
          dateOfBirth,
        } as FanCreationAttributes);
  
      const user = await User.create({
        username:email,
        password: hashedPassword,
        role:Role.FAN
        verificationToken,
      });
  
      await MailService.sendVerificationEmail(user.username, code as unknown as string);
      return user.username;
    }
  
    // Verify email with code
    static async verifyEmail(payload: { code: number; email: string }): Promise<void> {
      try {
        const user = await User.findOne({ where: { username: payload.email } });
        if (!user) throw new Error("User not found");
  
        const token = user.verificationToken || "";
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string; code: number };
  
        if (decoded.email !== payload.email || decoded.code !== payload.code) {
          throw new Error("Invalid verification code");
        }
  
        user.verificationToken = null; // Clear the verification token
        await user.save();
      } catch (error) {
        throw new Error("Invalid or expired verification token");
      }
    }
  
    // Login user (role-agnostic)
    static async login(email: string, password: string): Promise<{ token: string; user: User }> {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
      if (user.verificationToken) throw new Error("Email not verified");
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid credentials");
  
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
      return { token, user };
    }
  
    // Forgot password
    static async forgotPassword(email: string): Promise<void> {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
  
      const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "15m" });
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
  
      user.resetPasswordToken = resetToken;
      user.verificationToken = resetCode; // Temporarily store the code
      await user.save();
  
      await MailService.sendMail(
        user.email,
        "Password Reset Code",
        `Your password reset code is: ${resetCode}`,
        `<p>Your password reset code is: <b>${resetCode}</b></p>`
      );
    }
  
    // Reset password
    static async resetPassword(email: string, resetCode: string, newPassword: string): Promise<void> {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
      if (!user.resetPasswordToken || user.verificationToken !== resetCode) {
        throw new Error("Invalid or expired reset code");
      }
  
      const isTokenValid = jwt.verify(user.resetPasswordToken, JWT_SECRET);
      if (!isTokenValid) throw new Error("Invalid or expired reset token");
  
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.verificationToken = null;
      await user.save();
    }
  }
  