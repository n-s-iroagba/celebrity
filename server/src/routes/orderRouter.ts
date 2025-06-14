import { Router } from "express"
import OrderController from "../controllers/OrderController"
import { authMiddleware } from "../middlewares/authMIddleware"

const router = Router()
const orderController = new OrderController()

// Route to create a new ticket order
router.post("/tickets", authMiddleware, orderController.createTicketOrder)

export default router
