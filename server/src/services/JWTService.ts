import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User";  // Adjust the path based on your project structure

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret"; 
const JWT_EXPIRES_IN = "1h"; // Adjust expiry as needed

export class JwtService {
  static generateLoginToken(user: User) {
    return jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  static generateEmailVerificationToken(user: User) {
    return jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
  }

  static generateForgotPasswordToken(user: User) {
    return jwt.sign(
      { id: user.id,email:user.email},

      JWT_SECRET,
      { expiresIn: "15m" } 
    );
  }

  static verifyToken<T>(token: string): JwtPayload & T {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as JwtPayload & T;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}
