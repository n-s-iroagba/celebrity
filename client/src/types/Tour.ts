import { Job } from "./Job";


export type Tour = {
  id: number;
  price: number;
  description: string;
  duration:string
  features: string[];
  location:string;
  jobId:string
  job:Job
};
