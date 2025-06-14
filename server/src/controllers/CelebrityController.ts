import type { Request, Response } from "express"
import { CelebrityService } from "../services/CelebrityService"
import type { Celebrity } from "../models/Celebrity"

export class CelebrityController {
  /**
   * Update a celebrity's attributes.
   */
  static async updateCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updates: Partial<Celebrity> = req.body
      const updatedCelebrity = await CelebrityService.updateCelebrity(Number(id), updates)
      res.status(200).json(updatedCelebrity)
    } catch (error: any) {
      console.error(error)
      res.status(404).json({ message: error.message })
    }
  }

  /**
   * Get all celebrities.
   */
  static async getAllCelebrities(req: Request, res: Response): Promise<void> {
    try {
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10
      const offset = (page - 1) * limit

      const { rows, count } = await CelebrityService.getAllCelebrities(limit, offset)
      res.status(200).json({
        data: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
      console.error("Error fetching all celebrities:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  /**
   * Delete a celebrity by ID.
   */
  static async deleteCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const isDeleted = await CelebrityService.deleteCelebrity(Number(id))
      if (isDeleted) {
        res.status(204).send() // No content
      } else {
        res.status(404).json({ message: "Celebrity not found" })
      }
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async listPublicCelebrities(req: Request, res: Response): Promise<void> {
    try {
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10
      const offset = (page - 1) * limit

      const { rows, count } = await CelebrityService.getPublicCelebrities(limit, offset)

      res.status(200).json({
        data: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalCelebrities: count,
      })
    } catch (error) {
      console.error("Error in listPublicCelebrities controller:", error)
      res.status(500).json({ message: "Failed to fetch celebrities." })
    }
  }
  static async createCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const { userData, celebrityData } = req.body

      if (!userData || !celebrityData) {
        res.status(400).json({ message: "User and celebrity data are required." })
        return
      }

      const celebrity = await CelebrityService.createCelebrity(userData, celebrityData)
      res.status(201).json(celebrity)
    } catch (error) {
      console.error("Error creating celebrity:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  static async getCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const celebrity = await CelebrityService.getCelebrityById(Number.parseInt(id))
      if (!celebrity) {
        res.status(404).json({ message: "Celebrity not found" })
        return
      }
      res.status(200).json(celebrity)
    } catch (error) {
      console.error("Error fetching celebrity:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  static async searchCelebrities(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string
      if (!query) {
        res.status(400).json({ message: "Search query is required." })
        return
      }
      const celebrities = await CelebrityService.searchCelebrities(query)
      res.status(200).json(celebrities)
    } catch (error) {
      console.error("Error searching celebrities:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}
