import express, { type Request, type Response } from "express"
import { UserService } from "../services/UserService"
import { Role } from "../enums/Role"
import { User } from "../models/User"
import { ChatService } from "../services/ChatService"
import { MessageService } from "../services/MesageService"
import { Celebrity } from "../models/Celebrity"
import { Fan } from "../models/Fan"

const router = express.Router()

// IMPORTANT: Protect this endpoint so it's only available in test environments
if (process.env.NODE_ENV === "test" || process.env.CYPRESS_ENV === "test") {
  // CYPRESS_ENV is a custom flag you might set when running Cypress
  router.post("/ensure-user", async (req: Request, res: Response) => {
    try {
      const { email, password, role = Role.FAN, whatsAppNumber = "0000000000", isVerified = true } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." })
      }

      const [user, created] = await UserService.findOrCreateUser(
        role as Role, // Cast role to Role type
        { email, password, whatsAppNumber },
        isVerified,
      )

      res.status(200).json({
        message: created ? "User created successfully." : "User already existed.",
        user: { id: user.id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified },
      })
    } catch (error: any) {
      console.error("Error in /ensure-user endpoint:", error)
      res.status(500).json({ message: "Failed to ensure user.", error: error.message })
    }
  })

  // 👇 NEW ENDPOINT FOR SEEDING A SHOUTOUT
  router.post("/seed-shoutout", async (req: Request, res: Response) => {
    try {
      const { fanEmail, celebrityEmail, content, mediaType = "text" } = req.body

      if (!fanEmail || !celebrityEmail || !content) {
        return res.status(400).json({ message: "fanEmail, celebrityEmail, and content are required." })
      }

      // 1. Find the Fan and Celebrity users and their associated profiles
      const fanUser = await User.findOne({ where: { email: fanEmail } })
      const celebrityUser = await User.findOne({ where: { email: celebrityEmail } })

      if (!fanUser || !celebrityUser) {
        return res.status(404).json({ message: "Fan or Celebrity user not found." })
      }

      const fanProfile = await Fan.findOne({ where: { userId: fanUser.id } })
      const celebrityProfile = await Celebrity.findOne({ where: { userId: celebrityUser.id } })

      if (!fanProfile || !celebrityProfile) {
        return res.status(404).json({ message: "Fan or Celebrity profile not found." })
      }

      // 2. Find or create a Chat between them
      const [chat] = await ChatService.findOrCreateChat({
        fanId: fanProfile.id,
        celebrityId: celebrityProfile.id,
      })

      // 3. Create the Message (shoutout request) from the fan
      const message = await MessageService.postMessage({
        chatId: chat.id,
        senderId: fanUser.id, // Assuming senderId is the User ID
        content,
        mediaType,
        isSeen: false,
      })

      res.status(201).json({
        message: "Shoutout seeded successfully.",
        data: {
          chatId: chat.id,
          messageId: message.id,
          content: message.content,
          celebrityEmail: celebrityEmail, // ✨ ADDED celebrityEmail to the response
        },
      })
    } catch (error: any) {
      console.error("Error in /seed-shoutout endpoint:", error)
      res.status(500).json({ message: "Failed to seed shoutout.", error: error.message })
    }
  })
  // You can add other test setup endpoints here (e.g., clear database, seed specific scenarios)
  // router.post('/clear-users', async (req: Request, res: Response) => { ... });
} else {
  // In non-test environments, these routes will not be available
  router.use((req, res) => {
    res.status(404).send("Test endpoint not available in this environment.")
  })
}

export default router
