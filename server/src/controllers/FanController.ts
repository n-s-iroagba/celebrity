import { Request, Response } from "express";
import { FanService } from "../services/FanService";
import { Fan } from "../models/Fan";

export class FanController {

    static async createFan(req: Request, res: Response): Promise<any> {
        try {
          const { fan: fanData, user: userData } = req.body;
    
          if (!fanData || !userData) {
            throw new Error("Missing fan or user data");
          }
    
          const fan = await FanService.createFan(fanData, userData);
          return res.status(201).json(fan);
        } catch (error: any) {
          return res.status(500).json({ error: error.message });
        }
      }
  static async getAllFans(req: Request, res: Response): Promise<any> {
    try {
      const fans = await FanService.getAllFans();
      return res.status(200).json(fans);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async getFanById(req: Request, res: Response) : Promise<any>{
    try {
      const id = parseInt(req.params.id, 10);
      const fan = await FanService.getFanById(id);
      if (!fan) {
        throw new Error("Fan not found" );
      }
      return res.status(200).json(fan);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const updates = req.body;
      const updatedFan = await FanService.updateFan(id, updates);
      if (!updatedFan) {
        throw new Error("Fan not found" );
      }
      return res.status(200).json({ message: "Fan updated successfully", fan: updatedFan });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await FanService.deleteFan(id);
      if (!success) {
        throw new Error("Fan not found" );
      }
      return res.status(200).json({ message: "Fan deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
