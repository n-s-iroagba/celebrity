
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { MailService } from "./MailService";
import { Role } from "../enums/Role";
import { Fan, FanCreationAttributes } from "../models/Fan";
import { Admin } from "../models/Admin";
import { SuperAdmin } from "../models/SuperAdmin";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const SALT_ROUNDS = 10;
const BASE_URL = process.env.BASE_URL || "http://localhost:8000";
 
  export class AuthService {
    // Create user (fan, admin, and superadmin)

    static async addAdmin(adminData: Partial <Admin>,userData: Partial<User>): Promise<string> {
      const { firstName, surname } = adminData;
      const {
        username,
        password,
      }= userData
      if (
        !firstName ||
        !surname ||
        !username ||
        !password 
      ) {
        throw new Error("Missing required fields");
      }
      const code = Math.random()*1000000
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const verificationToken = jwt.sign({ email:username,code,role:Role.FAN }, JWT_SECRET, { expiresIn: "1h" });
      const user = await User.create({
        username,
        password: hashedPassword,
        role:Role.ADMIN,
       verificationToken: verificationToken,
      });
      if (!user) {
        throw new Error("User not found. Cannot create Admin.");
      }
  await Admin.create({ firstName, surname, userId:user.id })
  await MailService.sendVerificationEmail(user.username, code as unknown as string);
  return user.username;
      
    }
    static async createFan(fanData: Partial<Fan>,userData: Partial<User>): Promise<string> {
        const {
          firstName,
          surname,
          socialMediaHandle,
          socialMediaType,
          phoneNumber,
          country,
          dateOfBirth,
        } = fanData;
      const {
        username,
        password,
      }= userData
        if (
          !firstName ||
          !surname ||
          !username ||
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
    
        const verificationToken = jwt.sign({ email:username,code,role:Role.FAN }, JWT_SECRET, { expiresIn: "1h" });
    
 
  
      const user = await User.create({
        username,
        password: hashedPassword,
        role:Role.FAN,
       verificationToken: verificationToken,
      });
       await Fan.create({
        firstName,
        surname,
        socialMediaHandle,
        socialMediaType,
        phoneNumber,
        country,
        dateOfBirth,
        userId:user.id
      } as FanCreationAttributes);
  
      await MailService.sendVerificationEmail(user.username, code as unknown as string);
      return user.username;
    }
  
    // Verify email with code
    static async verifyEmail(payload: { code: number; email: string }): Promise<{ token: string; user: Admin|SuperAdmin|Fan }> {
      try {
        const user = await User.findOne({ where: { username: payload.email } });
        if (!user) throw new Error("User not found");
  
        const token = user.verificationToken || "";
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string; code: number };
  
        if (decoded.email !== payload.email || decoded.code !== payload.code) {
          throw new Error("Invalid verification code");
        }
  
        user.verificationToken = null
        await user.save();
        return await this.login (user.username,user.password);
       
      } catch (error) {
        throw new Error("Invalid or expired verification token");
      }
    }
  
    // Login user (role-agnostic)
    static async login(email: string, password: string): Promise<{ token: string; user: Admin | SuperAdmin | Fan }> {
        const user = await User.findOne({ where: { username: email } });
        if (!user) throw new Error("User not found");
        if (user.verificationToken) throw new Error("Email not verified");
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid credentials");
    
        let detailedUser;
        switch (user.role) {
          case "admin":
            detailedUser = await Admin.findOne({ where: { userId: user.id } });
            break;
          case "superAdmin":
            detailedUser = await SuperAdmin.findOne({ where: { userId: user.id } });
            break;
          case "fan":
            detailedUser = await Fan.findOne({ where: { userId: user.id } });
            break;
          default:
            throw new Error("Role not recognized");
        }
    
        if (!detailedUser) throw new Error("User details not found for the specified role");
    
        const token = jwt.sign(
          { id: user.id, email: user.username, role: user.role },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
    
        return { token, user: detailedUser };
      }
    
  
    // Forgot password
    static async forgotPassword(email: string): Promise<string> {
      const user = await User.findOne({ where: {username:email } });
      if (!user) throw new Error("User not found");

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); 
    const resetToken = jwt.sign({ id: user.id, email: user.username, code:resetCode }, JWT_SECRET, { expiresIn: "15m" });
    
      user.passwordResetToken = resetToken;

      await user.save();
  
      await MailService.sendMail(
        user.username,
        "Password Reset Code",
        `Your password reset code is: ${resetCode}`,
        `<p>Your password reset code is: <b>${resetCode}</b></p>`
      );

      return user.username;
    }

    // Reset password
    static async resetPassword(email: string, resetCode: string, newPassword: string): Promise<void> {
      const user = await User.findOne({ where: { username:email } });
      if (!user) throw new Error("User not found");
      const token = user.passwordResetToken||''

      const decoded = jwt.verify(token, JWT_SECRET) as unknown as { email: string; code: number };
      if (!decoded || decoded.code !== Number(resetCode)|| decoded.email !== email) {
        throw new Error("Invalid or expired reset code");
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  
      user.password = hashedPassword;
      user.passwordResetToken = null;
      user.verificationToken = null;
      await user.save();
    }
  }
  