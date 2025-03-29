import { Message } from "./Messages"

export type Chat = {
    id:number
    messages:Message[]
    jobId:number
    job:string
}