import { Order } from "../models/Order"
import { OrderItem } from "../models/OrderItem"
import { Ticket } from "../models/Ticket"
import sequelize from "../config/orm"

interface TicketOrderItem {
  ticketId: number
  quantity: number
}

class OrderService {
  public async createTicketOrder(fanId: number, items: TicketOrderItem[]): Promise<Order> {
    if (!items || items.length === 0) {
      throw new Error("Order must contain at least one item.")
    }

    const t = await sequelize.transaction()
    try {
      let totalAmount = 0
      const orderItemsData = []

      for (const item of items) {
        const ticket = await Ticket.findByPk(item.ticketId, { transaction: t })
        if (!ticket) {
          throw new Error(`Ticket with ID ${item.ticketId} not found.`)
        }
        if (item.quantity <= 0) {
          throw new Error(`Quantity for ticket ${item.ticketId} must be positive.`)
        }

        // Here you could add inventory check in the future
        // if (ticket.quantityAvailable < item.quantity) {
        //   throw new Error(`Not enough tickets available for ${ticket.name}.`);
        // }

        const pricePerTicket = ticket.price
        totalAmount += pricePerTicket * item.quantity

        orderItemsData.push({
          ticketId: item.ticketId,
          quantity: item.quantity,
          pricePerTicket: pricePerTicket,
        })
      }

      // For now, we'll mark the order as 'completed' assuming payment is successful.
      // In a real scenario, this would be 'pending' until payment is confirmed.
      const order = await Order.create(
        {
          fanId,
          totalAmount,
          status: "completed",
        },
        { transaction: t },
      )

      for (const itemData of orderItemsData) {
        await OrderItem.create(
          {
            ...itemData,
            orderId: order.id,
          },
          { transaction: t },
        )
      }

      // Here you would reduce ticket inventory if tracking it
      // for (const item of items) { ... }

      await t.commit()

      // Refetch the order with its items to return the full object
      return await Order.findByPk(order.id, {
        include: [{ model: OrderItem, as: "orderItems" }],
      })
    } catch (error) {
      await t.rollback()
      console.error("Failed to create ticket order:", error)
      throw error // Re-throw the original error
    }
  }
}

export default new OrderService()
