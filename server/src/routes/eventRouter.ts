import { Router } from "express"
import EventController from "../controllers/EventController"

const router = Router()
const eventController = new EventController()

router.get("/", eventController.getAllEvents)
router.get("/:id", eventController.getEventById)

export default router
