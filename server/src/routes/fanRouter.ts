import { Router } from "express"
import { FanController } from "../controllers/FanController"
import { authMiddleware } from "../middlewares/authMIddleware" // Assuming you have this

const fanRouter = Router()

// All routes in this router will require authentication
fanRouter.use(authMiddleware)

fanRouter.put("/me/profile", FanController.updateMyProfile)
fanRouter.get("/me/profile", FanController.getMyProfile)

export default fanRouter
