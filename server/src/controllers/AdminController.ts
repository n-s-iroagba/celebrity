import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

export class AdminController {
  static async addAdmin(req: Request, res: Response): Promise<any> {
    try {
      const { admin: adminData, user: userData } = req.body;
      if (!adminData || !userData) {
        return res.status(400).json({ error: "Missing admin or user data" });
      }
      const admin = await AdminService.addAdmin(adminData, userData);
      return res.status(201).json(admin);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateAdminName(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const { firstName, surname } = req.body;
      const updatedAdmin = await AdminService.updateAdminName(id, { firstName, surname });
      return res.status(200).json(updatedAdmin);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }
}
