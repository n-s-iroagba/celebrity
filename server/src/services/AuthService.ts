import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Admin } from "../models/Admin";
import { Fan } from "../models/Fan";
import { MailService } from "./MailService";

import { JwtService } from "./JWTService";

import { VerificationPayload } from "../types/VerificationPayload";
import { NewPasswordPayload } from "../types/NewPasswordPayload";
import { NewPasswordToken } from "../types/NewPasswordToken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export class AuthService {
  static hashPassword = (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
  };

  static async verifyEmail(payload: VerificationPayload): Promise<string> {
    try {
      const user = await User.findOne({
        where: { verificationToken: payload.verificationToken },
      });

      if (!user) throw new Error("User not found");
      const userToken = user.verificationToken;
      if (!userToken) throw new Error("User token not found");
      const payloadToken = payload.verificationToken;
      if (!payloadToken) throw new Error("Payload token not found");
      if (userToken !== payloadToken) {
        throw Error("invalid Token");
      }
      if (payload.verificationCode !== user.emailVerificationCode)
        throw new Error("wrong email verification code");
      user.isEmailVerified = true;
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
      if (!detailedUser)
        throw new Error("User details not found for the specified role");
      const loginToken = JwtService.generateLoginToken(user);
      return loginToken;
    } catch (error) {
      console.error(error,'error in auth service verifyEmail function')
      throw new Error("Invalid or expired verification token");
    }
  }

  static async login(email: string, password: string): Promise<string> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
      if (!user.isEmailVerified) throw new Error("Email not verified");
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
      if (!detailedUser)
        throw new Error("User details not found for the specified role");
      const loginToken = JwtService.generateLoginToken(user);
      return loginToken;
    } catch (error) {
      console.error(error,'error in authService function')
      throw new Error("Invalid or expired verification token");
    }
  }

  static async resendVerificationToken(verificationToken:string): Promise<void> {
    try {
      const user = await User.findOne({ where: { verificationToken } });
      if (!user) throw new Error("User not found");
      if (user.isEmailVerified) throw new Error("User is already verified");

      user.verificationToken = JwtService.generateEmailVerificationToken(user);
      user.emailVerificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      await user.save();


      await MailService.sendVerificationEmail(user);

    } catch (error) {
      console.error(error,'error in auth service resendVerificationToken function')
      
      throw new Error("Failed to resend verification token");
    }
  }

  static async forgotPassword(email: string): Promise<string> {
    try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    user.passwordResetToken = JwtService.generateForgotPasswordToken(user);
    await user.save();
    await MailService.SendForgotPasswordMail(user);
    return user.passwordResetToken;
    }catch(error:any){
      console.error(error,'error in auth service forgotPassword function')
      
      throw new Error(error);
    }
  }

  static async resetPassword(payload: NewPasswordPayload): Promise<string> {
    const decodedToken = JwtService.verifyToken<NewPasswordToken>(
      payload.token
    );
    try{
    const user = await User.findOne({ where: { email: decodedToken.email } });
    if (!user) throw new Error("User not found");
    if (user.passwordResetToken !== payload.token)
      throw new Error("Invalid token");
    const token = user.passwordResetToken || "";
    const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.verificationToken = null;
    await user.save();
    return this.login(user.email,user.password)
  }catch (error:any){
    console.error(error,'error in auth service resetPassword function')
    throw new Error (error)
  }
}
}