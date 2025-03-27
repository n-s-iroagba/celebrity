import { Ticket } from "./Ticket";

export interface BookedEvent {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
    ticketBought: Ticket;
  }