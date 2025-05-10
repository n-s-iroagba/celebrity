import { Ticket } from "./Ticket";
export type Events = {
    id?: number;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    image: string;
    tickets: Ticket[];
    jobId:number
  }
