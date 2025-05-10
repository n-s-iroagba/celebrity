import { Request, Response } from 'express';
import { CelebrityService } from '../services/CelebrityService';
import { Celebrity, CelebrityCreationAttributes } from '../models/Celebrity';

export class CelebrityController {


  /**
   * Update a celebrity's attributes.
   */
  static async updateCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates: Partial<Celebrity> = req.body;
      const updatedCelebrity = await CelebrityService.updateCelebrity(Number(id), updates);
      res.status(200).json(updatedCelebrity);
    } catch (error: any) {
      console.error(error)
      res.status(404).json({ message: error.message });
    }
  }



  /**
   * Get all celebrities.
   */
  static async getAllCelebrities(req: Request, res: Response): Promise<void> {
    try {
      const celebrities = await CelebrityService.getAllCelebrities();
      res.status(200).json(celebrities);
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Delete a celebrity by ID.
   */
  static async deleteCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const isDeleted = await CelebrityService.deleteCelebrity(Number(id));
      if (isDeleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: 'Celebrity not found' });
      }
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ message: error.message });
    }
  }
}