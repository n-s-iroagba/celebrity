import { Ticket } from "./Ticket";

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  ticketTiers: Ticket[];
}