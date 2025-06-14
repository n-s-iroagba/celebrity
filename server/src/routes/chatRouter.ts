import { Router } from "express"
import { ChatController } from "../controllers/ChatController"
import { authMiddleware } from "../middlewares/authMIddleware" // Corrected typo
import { adminRoleMiddleware } from "../middlewares/adminRoleMiddleware" // Assuming you create this

const chatRouter = Router()

chatRouter.get("/:chatId/messages", authMiddleware, ChatController.getMessagesForChat)

// New route for admins to list chats
// Ensure authMiddleware is followed by a middleware that checks for ADMIN role, or authMiddleware handles it.
chatRouter.get("/admin/list", authMiddleware, adminRoleMiddleware, ChatController.listChatsForAdmin)

export default chatRouter
