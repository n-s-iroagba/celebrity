import { Request, Response } from "express";
import { FanService } from "../services/FanService";

export class FanController {

  static async createFan(req: Request, res: Response): Promise<any> {
    const {
      firstName,
      surname,
      whatsappNumber,
      country,
      dateOfBirth,
      gender,
      email,
      password,
    } = req.body

    const fanData = {
      firstName,
      surname,
      whatsappNumber,
      country,
      dateOfBirth,
      gender,
    }

    const userData = {
      email,
      password,
    }
    try {

      const token = await FanService.createFan(fanData, userData);
      return res.status(201).json(token);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }
  static async getAllFans(req: Request, res: Response): Promise<any> {
    try {
      const fans = await FanService.getAllFans();
      return res.status(200).json(fans);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }


  static async getFanById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const fan = await FanService.getFanById(id);
      if (!fan) {
        throw new Error("Fan not found");
      }
      return res.status(200).json(fan);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const updates = req.body;
      const updatedFan = await FanService.updateFan(id, updates);
      if (!updatedFan) {
        throw new Error("Fan not found");
      }
      return res.status(200).json({ message: "Fan updated successfully", fan: updatedFan });
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await FanService.deleteFan(id);
      if (!success) {
        throw new Error("Fan not found");
      }
      return res.status(200).json({ message: "Fan deleted successfully" });
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }
}
