import { TicketTier } from "./TicketTier";

export interface Event {
    id: number;
    name: string;
    date: string;
    ticketTiers: TicketTier[];
  }