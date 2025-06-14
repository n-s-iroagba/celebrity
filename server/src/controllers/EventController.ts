import type { Request, Response } from "express"
import EventService from "../services/EventService"

class EventController {
  public async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await EventService.findAllEvents()
      res.status(200).json(events)
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events." })
    }
  }

  public async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const eventId = Number.parseInt(req.params.id, 10)
      if (isNaN(eventId)) {
        res.status(400).json({ message: "Invalid event ID." })
        return
      }
      const event = await EventService.findEventById(eventId)
      if (event) {
        res.status(200).json(event)
      } else {
        res.status(404).json({ message: "Event not found." })
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event." })
    }
  }
}

export default new EventController()
