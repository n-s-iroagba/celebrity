import { v4 as uuidv4 } from "uuid"
import { addHours } from "date-fns" // npm install date-fns
import { TemporaryChat } from "../models/TemporaryChat"
import {
  TemporaryMessage,
  type TemporaryMessageCreationAttributes,
  type TemporaryMessageMediaType,
} from "../models/TemporaryMessage"
import { Celebrity } from "../models/Celebrity"
import { Chat } from "../models/Chat"
import { Message } from "../models/Message"
import sequelize from "../config/orm"

const TEMPORARY_CHAT_EXPIRY_HOURS = 24 // Chat expires in 24 hours

export class TemporaryChatService {
  static async initiateTemporaryChat(celebrityId: number): Promise<TemporaryChat> {
    try {
      const celebrity = await Celebrity.findByPk(celebrityId)
      if (!celebrity) {
        throw new Error("Celebrity not found")
      }

      const expiresAt = addHours(new Date(), TEMPORARY_CHAT_EXPIRY_HOURS)
      const sessionId = uuidv4()

      const tempChat = await TemporaryChat.create({
        celebrityId,
        sessionId,
        expiresAt,
      })

      return tempChat
    } catch (error) {
      console.error("Error initiating temporary chat:", error)
      throw new Error(`Could not initiate temporary chat: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async addMessageToTemporaryChat(
    sessionId: string,
    content: string,
    mediaType: TemporaryMessageMediaType,
    mediaUrl?: string | null,
  ): Promise<TemporaryMessage> {
    try {
      const tempChat = await TemporaryChat.findOne({ where: { sessionId } })
      if (!tempChat) {
        throw new Error("Temporary chat session not found or expired.")
      }
      if (new Date() > tempChat.expiresAt) {
        // Optionally delete expired chat here or have a cron job
        await tempChat.destroy()
        throw new Error("Temporary chat session has expired.")
      }

      const messageData: TemporaryMessageCreationAttributes = {
        temporaryChatId: tempChat.id,
        content,
        mediaType,
      }
      if (mediaUrl) {
        messageData.mediaUrl = mediaUrl
      }

      const tempMessage = await TemporaryMessage.create(messageData)
      return tempMessage
    } catch (error) {
      console.error("Error adding message to temporary chat:", error)
      throw new Error(`Could not add message: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getTemporaryMessages(sessionId: string): Promise<TemporaryMessage[]> {
    try {
      const tempChat = await TemporaryChat.findOne({
        where: { sessionId },
        include: [{ model: TemporaryMessage, as: "temporaryMessages", order: [["createdAt", "ASC"]] }],
      })

      if (!tempChat) {
        // It's okay if not found, might be expired or never existed
        return []
      }
      if (new Date() > tempChat.expiresAt) {
        return [] // Treat as empty if expired
      }

      return tempChat.temporaryMessages || []
    } catch (error) {
      console.error("Error fetching temporary messages:", error)
      throw new Error(`Could not fetch messages: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async claimTemporaryChat(
    tempSessionId: string,
    fanId: number,
    userId: number, // User ID of the fan
  ): Promise<Chat | null> {
    const transaction = await sequelize.transaction()
    try {
      const tempChat = await TemporaryChat.findOne({
        where: { sessionId: tempSessionId },
        include: [{ model: TemporaryMessage, as: "temporaryMessages" }],
        transaction,
      })

      if (!tempChat || !tempChat.temporaryMessages || tempChat.temporaryMessages.length === 0) {
        await transaction.commit() // Commit even if nothing to claim
        return null // No chat to claim or no messages
      }

      if (new Date() > tempChat.expiresAt) {
        console.warn(`Attempt to claim expired temporary chat: ${tempSessionId}`)
        await tempChat.destroy({ transaction }) // Clean up expired chat
        await transaction.commit()
        return null
      }

      // Find or create the permanent chat
      let permanentChat = await Chat.findOne({
        where: {
          fanId: fanId,
          celebrityId: tempChat.celebrityId,
        },
        transaction,
      })

      if (!permanentChat) {
        permanentChat = await Chat.create(
          {
            fanId: fanId,
            celebrityId: tempChat.celebrityId,
          },
          { transaction },
        )
      }

      // Migrate messages
      const messagesToCreate = tempChat.temporaryMessages.map((msg) => ({
        chatId: permanentChat!.id,
        senderId: userId, // The fan is the sender of these pre-signup messages
        senderType: "fan", // Explicitly set senderType
        content: msg.content,
        mediaType: msg.mediaType as "text" | "video" | "voice" | "image", // Cast to Message's mediaType
        mediaUrl: msg.mediaUrl,
        createdAt: msg.createdAt, // Preserve original timestamp
        updatedAt: msg.updatedAt,
      }))

      if (messagesToCreate.length > 0) {
        await Message.bulkCreate(messagesToCreate, { transaction, validate: true })
      }

      // Delete the temporary chat and its messages
      await TemporaryMessage.destroy({ where: { temporaryChatId: tempChat.id }, transaction })
      await tempChat.destroy({ transaction })

      await transaction.commit()
      return permanentChat
    } catch (error) {
      await transaction.rollback()
      console.error("Error claiming temporary chat:", error)
      throw new Error(`Could not claim temporary chat: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}
