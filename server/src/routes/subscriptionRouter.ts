import { Router } from "express"
import { SubscriptionController } from "../controllers/SubscriptionController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadReceipt } from "../middlewares/uploadReceipts" // Ensure this path is correct

const router = Router()
const subscriptionController = new SubscriptionController()

// Existing route
router.post("/subscribe", authMiddleware, uploadReceipt.single("receipt"), subscriptionController.subscribeToMembership)
router.get("/my-subscriptions", authMiddleware, subscriptionController.getMySubscriptions)

/**
 * NEW ROUTE
 * This route must be protected by authMiddleware to know who the fan is.
 */
router.get("/check/:celebrityId", authMiddleware, subscriptionController.checkSubscriptionStatus)

export default router
