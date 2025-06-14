import type { Request, Response } from "express"
import { FanService } from "../services/FanService"
import type { AuthTokenPayload } from "../services/JwtService" // Assuming req.user is of this type or similar

export class FanController {
  static async updateMyProfile(req: Request, res: Response): Promise<any> {
    try {
      // Assuming authMiddleware adds user object to req, and it contains fanId if user is a fan
      const user = req.user as AuthTokenPayload | undefined
      if (!user || !user.fanId) {
        return res.status(403).json({ message: "Forbidden: User is not a fan or not authenticated properly." })
      }

      const fanId = user.fanId
      const { countryOfResidence, dateOfBirth, gender, occupation, profilePicture, firstName, surname } = req.body

      // Basic validation: Ensure at least one field is being updated
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "No profile data provided for update." })
      }

      const profileDataToUpdate: any = {}
      if (countryOfResidence !== undefined) profileDataToUpdate.countryOfResidence = countryOfResidence
      if (dateOfBirth !== undefined) profileDataToUpdate.dateOfBirth = dateOfBirth
      if (gender !== undefined) profileDataToUpdate.gender = gender
      if (occupation !== undefined) profileDataToUpdate.occupation = occupation
      if (profilePicture !== undefined) profileDataToUpdate.profilePicture = profilePicture
      if (firstName !== undefined) profileDataToUpdate.firstName = firstName
      if (surname !== undefined) profileDataToUpdate.surname = surname

      if (Object.keys(profileDataToUpdate).length === 0) {
        return res.status(400).json({ message: "No updatable profile data provided." })
      }

      const updatedFan = await FanService.updateFanProfile(fanId, profileDataToUpdate)
      return res.status(200).json(updatedFan)
    } catch (error: any) {
      console.error("Update fan profile error:", error)
      if (error.message === "Fan profile not found." || error.message === "Invalid gender value.") {
        return res.status(404).json({ message: error.message })
      }
      return res.status(500).json({ message: "Failed to update fan profile.", error: error.message })
    }
  }

  static async getMyProfile(req: Request, res: Response): Promise<any> {
    try {
      const user = req.user as AuthTokenPayload | undefined
      if (!user || !user.fanId) {
        return res.status(403).json({ message: "Forbidden: User is not a fan or not authenticated properly." })
      }
      const fanId = user.fanId
      const fanProfile = await FanService.getFanById(fanId) // Or getFanByUserId(user.userId)
      if (!fanProfile) {
        return res.status(404).json({ message: "Fan profile not found." })
      }
      return res.status(200).json(fanProfile)
    } catch (error: any) {
      console.error("Get fan profile error:", error)
      return res.status(500).json({ message: "Failed to retrieve fan profile.", error: error.message })
    }
  }
}
