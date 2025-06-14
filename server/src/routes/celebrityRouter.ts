import { Router } from "express"
import { CelebrityController } from "../controllers/CelebrityController"
import { authMiddleware, adminMiddleware } from "../middlewares/authMIddleware" // Assuming you have adminMiddleware

const celebrityRouter = Router()

// Public route to list celebrities for pre-signup browsing
celebrityRouter.get("/public", CelebrityController.listPublicCelebrities)

// Admin routes for managing celebrities
celebrityRouter.post("/", authMiddleware, adminMiddleware, CelebrityController.createCelebrity) // Create
celebrityRouter.get("/", authMiddleware, adminMiddleware, CelebrityController.getAllCelebrities) // Get all for admin
celebrityRouter.get("/search", authMiddleware, CelebrityController.searchCelebrities) // Search celebrities (can be public or auth based on needs)
celebrityRouter.get("/:id", authMiddleware, adminMiddleware, CelebrityController.getCelebrity) // Get one for admin

celebrityRouter.patch("/:id", CelebrityController.updateCelebrity)

celebrityRouter.delete("/:id", CelebrityController.deleteCelebrity)

export default celebrityRouter
