import type { Response } from "express"
import OrderService from "../services/OrderService"
import type { AuthenticatedRequest } from "../types/AuthenticatedRequest"

class OrderController {
  public async createTicketOrder(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const fanId = req.user?.id
      if (!fanId) {
        res.status(401).json({ message: "Authentication required." })
        return
      }

      const { items } = req.body // Expects an array like [{ ticketId: 1, quantity: 2 }]

      if (!Array.isArray(items) || items.length === 0) {
        res.status(400).json({ message: "Request body must contain an 'items' array." })
        return
      }

      const newOrder = await OrderService.createTicketOrder(fanId, items)
      res.status(201).json(newOrder)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
      res.status(500).json({ message: "Failed to create order.", error: errorMessage })
    }
  }
}

export default new OrderController()
