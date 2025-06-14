import { Router } from "express"
import { TemporaryChatController } from "../controllers/TemporaryChatController"
// import { someRateLimiter } from "../middlewares/rateLimiter"; // Optional: Implement rate limiting

const temporaryChatRouter = Router()

/**
 * @route POST /api/temp-chats/initiate
 * @description Initiates a new temporary chat session with a celebrity.
 * @access Public
 */
// temporaryChatRouter.post("/initiate", someRateLimiter, TemporaryChatController.initiate); // Example with rate limiter
temporaryChatRouter.post("/initiate", TemporaryChatController.initiate)

/**
 * @route POST /api/temp-chats/:sessionId/messages
 * @description Adds a message to an existing temporary chat session.
 * @access Public
 */
temporaryChatRouter.post("/:sessionId/messages", TemporaryChatController.postMessage)

/**
 * @route GET /api/temp-chats/:sessionId/messages
 * @description Retrieves all messages for a given temporary chat session.
 * @access Public
 */
temporaryChatRouter.get("/:sessionId/messages", TemporaryChatController.getMessages)

export default temporaryChatRouter
