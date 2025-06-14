import type { Request, Response } from "express"
import { ChatService } from "../services/ChatService"
import { MessageService } from "../services/MesageService" // Corrected typo
import { Role } from "../enums/Role" // Ensure Role is imported

export class ChatController {
  static async getMessagesForChat(req: Request, res: Response): Promise<void> {
    try {
      const chatId = Number.parseInt(req.params.chatId, 10)
      // @ts-ignore
      const userId = req.user.id

      if (isNaN(chatId)) {
        res.status(400).json({ message: "Invalid chat ID." })
        return
      }
      // @ts-ignore
      const isParticipant = await ChatService.isUserParticipant(userId, chatId)

      if (!isParticipant) {
        res.status(403).json({ message: "Access denied. You are not a participant in this chat." })
        return
      }
      const messages = await MessageService.getChatMessages(chatId)
      res.status(200).json(messages)
    } catch (error) {
      console.error("Error fetching chat messages:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  static async listChatsForAdmin(req: Request, res: Response): Promise<void> {
    try {
      // @ts-ignore - authMiddleware populates req.user and should verify ADMIN role
      if (req.user?.role !== Role.ADMIN) {
        res.status(403).json({ message: "Access denied. Admin role required." })
        return
      }
      const chats = await ChatService.getAllChatsForAdmin(req.query)
      res.status(200).json(chats)
    } catch (error) {
      console.error("Error fetching chats for admin:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}
