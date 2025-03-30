import { Request, Response } from 'express';
import { CelebrityService } from '../services/CelebrityService';
import { Celebrity, CelebrityCreationAttributes } from '../models/Celebrity';

export class CelebrityController {
  /**
   * Create a new celebrity.
   */
  static async createCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const celebrityData: CelebrityCreationAttributes = req.body;
      const newCelebrity = await CelebrityService.createCelebrity(celebrityData);
      res.status(201).json(newCelebrity);
    } catch (error: any) {
      console.error(error)
      res.status(400).json({ message: error.message });
    }
  }

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
   * Get a celebrity by ID.
   */
  static async getCelebrityById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const celebrity = await CelebrityService.getCelebrityById(Number(id));
      if (!celebrity) {
        res.status(404).json({ message: 'Celebrity not found' });
      } else {
        res.status(200).json(celebrity);
      }
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ message: error.message });
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