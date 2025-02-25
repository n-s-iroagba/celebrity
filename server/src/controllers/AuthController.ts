import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async verifyEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { code, email } = req.body;
      const result = await AuthService.verifyEmail({ code, email });
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      const result = await AuthService.forgotPassword(email);
      return res.status(200).json({ message: "Reset email sent", email: result });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email, resetCode, newPassword } = req.body;
      await AuthService.resetPassword(email, resetCode, newPassword);
      return res.status(200).json({ message: "Password reset successful" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
