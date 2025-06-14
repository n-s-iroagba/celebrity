import { Chat, type ChatCreationAttributes } from "../models/Chat"
import { User } from "../models/User"
import { Fan } from "../models/Fan"
import { Celebrity } from "../models/Celebrity"
import { Role } from "../enums/Role"

export class ChatService {
  /**
   * Create a new chat
   * @param chatData Data to create chat
   * @returns Created chat
   */
  static async createChat(chatData: ChatCreationAttributes): Promise<Chat> {
    try {
      const chat = await Chat.create(chatData)
      return chat
    } catch (error) {
      throw new Error(`Error creating chat: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Checks if a user (identified by their User ID) is a participant
   * (either the fan or the celebrity) in a given chat.
   * @param userId - The ID of the User (from the User table).
   * @param chatId - The ID of the Chat to check against.
   * @returns A boolean indicating if the user is a participant.
   */
  static async isUserParticipant(userId: number, chatId: number): Promise<boolean> {
    try {
      const user = await User.findByPk(userId, { attributes: ["id", "role"] })
      if (!user) return false
      const chat = await Chat.findByPk(chatId, { attributes: ["fanId", "celebrityId"] })
      if (!chat) return false

      if (user.role === Role.FAN) {
        const fanProfile = await Fan.findOne({ where: { userId: user.id }, attributes: ["id"] })
        return !!fanProfile && fanProfile.id === chat.fanId
      } else if (user.role === Role.CELEBRITY) {
        const celebrityProfile = await Celebrity.findOne({ where: { userId: user.id }, attributes: ["id"] })
        return !!celebrityProfile && celebrityProfile.id === chat.celebrityId
      } else if (user.role === Role.ADMIN) {
        return true // Admins can access any chat for moderation/impersonation
      }
      return false
    } catch (error) {
      console.error("Error in isUserParticipant:", error)
      return false
    }
  }

  static async getAllChatsForAdmin(filters: { celebrityId?: number; fanName?: string } = {}): Promise<Chat[]> {
    return Chat.findAll({
      include: [
        {
          model: Fan,
          as: "fan",
          include: [
            { model: User, as: "user", attributes: ["id", "firstName", "lastName", "email", "profilePictureUrl"] },
          ],
        },
        {
          model: Celebrity,
          as: "celebrity",
          include: [
            { model: User, as: "user", attributes: ["id", "firstName", "lastName", "stageName", "profilePictureUrl"] },
          ],
        },
        // Include the last message for each chat
        // This is a bit more complex and might require a subquery or a different approach
        // For simplicity, we'll fetch it separately or rely on client to fetch last message if needed for preview
        // Or, if your DB supports it well, you can use a subquery.
        // Example (conceptual, might need adjustment for your specific DB and Sequelize version):
        // {
        //   model: Message,
        //   as: 'messages', // Assuming you have an association 'messages' in Chat model
        //   attributes: ['content', 'createdAt'],
        //   limit: 1,
        //   order: [['createdAt', 'DESC']],
        //   required: false, // Left join
        // }
      ],
      order: [["updatedAt", "DESC"]],
    })
  }
}
