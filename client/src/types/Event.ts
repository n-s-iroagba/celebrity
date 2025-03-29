import { Job } from "./Job";
import { Ticket } from "./Ticket";

export type Event = {
    id?: number;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    image: string;
    tickets: Ticket[];
    job:Job
    jobId:number
  }
