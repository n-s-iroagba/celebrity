import { Job } from "./Job";
export default interface Celebrity {
    id?:string
    stageName: string;
    firstName: string;
    surname: string;
    bio:string;
    isConfirmed:boolean;
    image: string;
    jobs?:Job[]
   
  }