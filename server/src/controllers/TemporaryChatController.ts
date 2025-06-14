import type { Request, Response } from "express"
import { TemporaryChatService } from "../services/TemporaryChatService"
import type { TemporaryMessageMediaType } from "../models/TemporaryMessage" // Ensure this type is exported and imported

export class TemporaryChatController {
  static async initiate(req: Request, res: Response): Promise<void> {
    try {
      const { celebrityId } = req.body
      if (!celebrityId || typeof celebrityId !== "number") {
        res.status(400).json({ message: "Valid celebrityId is required." })
        return
      }

      const tempChat = await TemporaryChatService.initiateTemporaryChat(celebrityId)
      res.status(201).json({ sessionId: tempChat.sessionId, expiresAt: tempChat.expiresAt })
    } catch (error) {
      console.error("Error initiating temporary chat:", error)
      const message = error instanceof Error ? error.message : "Could not initiate temporary chat."
      // More specific error codes based on error type
      if (message.includes("Celebrity not found")) {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message })
      }
    }
  }

  static async postMessage(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params
      const { content, mediaType, mediaUrl } = req.body

      if (!content || !mediaType) {
        res.status(400).json({ message: "Content and mediaType are required." })
        return
      }
      if (!["text", "video", "voice", "image"].includes(mediaType)) {
        res.status(400).json({ message: "Invalid mediaType." })
        return
      }

      // Basic validation for mediaUrl if mediaType is not 'text'
      if (mediaType !== "text" && !mediaUrl) {
        // res.status(400).json({ message: `mediaUrl is required for mediaType '${mediaType}'.` });
        // return;
        // Allowing mediaUrl to be optional for now, assuming content might be a placeholder or direct data for voice/video
      }

      const tempMessage = await TemporaryChatService.addMessageToTemporaryChat(
        sessionId,
        content,
        mediaType as TemporaryMessageMediaType, // Cast here after validation
        mediaUrl,
      )
      res.status(201).json(tempMessage)
    } catch (error) {
      console.error("Error posting temporary message:", error)
      const message = error instanceof Error ? error.message : "Could not post message."
      if (message.includes("not found or expired") || message.includes("has expired")) {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message })
      }
    }
  }

  static async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params
      const messages = await TemporaryChatService.getTemporaryMessages(sessionId)
      res.status(200).json(messages)
    } catch (error) {
      console.error("Error fetching temporary messages:", error)
      res.status(500).json({ message: error instanceof Error ? error.message : "Could not fetch messages." })
    }
  }
}
