import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

export class AdminController {

  static async updateAdminName(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const { firstName, surname } = req.body;
      const updatedAdmin = await AdminService.updateAdminName(id, { firstName, surname });
      return res.status(200).json(updatedAdmin);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }
}
