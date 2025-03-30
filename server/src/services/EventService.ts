// services/EventService.ts
import { Event, EventAttributes, EventCreationAttributes } from "../models/Event";
import { Celebrity } from "../models/Celebrity";
import { Ticket } from "../models/Ticket";

export class EventService {
  /**
   * Create a new event
   * @param eventData Event data including celebrityId
   * @returns Created event
   */
  static async createEvent(eventData: EventCreationAttributes): Promise<Event> {
    try {
      // Verify the celebrity exists
      const celebrity = await Celebrity.findByPk(eventData.celebrityId);
      if (!celebrity) {
        throw new Error('celebrity not found');
      }

      const event = await Event.create(eventData);
      return event;
    } catch (error) {
      throw new Error(`Error creating event: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all events
   * @param options Optional include options
   * @returns Array of events
   */
  static async getAllEvents(options: {
    includecelebrity?: boolean;
    includeTickets?: boolean;
    includeCelebrity?: boolean;
  } = {}): Promise<Event[]> {
    try {
      const include = [];
      
      if (options.includecelebrity) {
        include.push({ model: Celebrity });
      }
      
      if (options.includeTickets) {
        include.push({ model: Ticket });
      }
      
   

      return await Event.findAll({
        include: include.length ? include : undefined
      });
    } catch (error) {
      throw new Error(`Error getting events: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get event by ID
   * @param id Event ID
   * @param options Optional include options
   * @returns Event or null if not found
   */
  static async getEventById(
    id: number,
    options: {
      includeTickets?: boolean;
      includeCelebrity?: boolean;
    } = {}
  ): Promise<Event | null> {
    try {
      const include = [];
      
      if (options.includeCelebrity) {
        include.push({ model: Celebrity });
      }
      
      if (options.includeTickets) {
        include.push({ model: Ticket });
      }
      
  

      return await Event.findByPk(id, {
        include: include.length ? include : undefined
      });
    } catch (error) {
      throw new Error(`Error getting event: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  

  /**
   * Update event by ID
   * @param id Event ID
   * @param updateData Data to update
   * @returns Updated event or null if not found
   */
  static async updateEvent(
    id: number,
    updateData: Partial<EventAttributes>
  ): Promise<Event | null> {
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        return null;
      }
      await event.update(updateData);
      return event;
    } catch (error) {
      throw new Error(`Error updating event: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Add ticket to event
   * @param eventId Event ID
   * @param ticketData Ticket data
   * @returns Created ticket
   */
  static async addTicketToEvent(
    eventId: number,
    ticketData: any // Replace with your TicketCreationAttributes type
  ): Promise<Ticket> {
    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      const ticket = await Ticket.create({
        ...ticketData,
        eventId
      });

      return ticket;
    } catch (error) {
      throw new Error(`Error adding ticket to event: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}