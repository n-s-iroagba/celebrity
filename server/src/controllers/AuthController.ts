
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async verifyEmail(req: Request, res: Response): Promise<any> {
    const token = req.params.token

    try {
      const { code } = req.body;
      if (!code) throw new Error ('code not available')
      if (!token) throw new Error ('token not available')
      const result = await AuthService.verifyEmail({ verificationCode:code.verificationCode, verificationToken:token });
      return res.status(200).json(result);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async forgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;
      const result = await AuthService.forgotPassword(email);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<any> {
    const token = req.params.token
    try {

      const {password } = req.body;
      if (!password) throw new Error ('password not available')
      if (!token) throw new Error ('token not available')
      await AuthService.resetPassword({token,password:password.password});
      return res.status(200).json({ message: "Password reset successful" });
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }
}
