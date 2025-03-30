import { messageListToDto } from "../helper/messageDto";
import Chat from "../models/Chat";
import { Job } from "../models/Job";
import Message from "../models/Message";
import { MessageService } from "./MesageService";

class JobService {



  static async createJob(createJobData:{fanId:number,celebrityId:number}){
    const {fanId,celebrityId}=createJobData;
    try{
    return Job.create({fanId,celebrityId})
    }catch(error:any){
      console.error('error in createJob function in JobService')
      throw new Error(error.message)
    }
  }

  
    static async getJobChat(jobId: number) {
      try {
       
        const job = await Job.findByPk(jobId, {
          include: [
            {
              model: Chat,
              as: "chat", 
              include: [
                {
                  model: Message,
                  as: "messages",
                  order: [["createdAt", "DESC"]], 
                },
              ],
            },
          ],
        });
  
        if (!job || !job.chat) {
          return [];
        }
  
        const chat = job.chat;
  
       
        const unseenMessagesCount = await Message.count({
          where: {
            chatId: chat.id,
            senderId: job.fanId, 
            isSeen: false, 
          },
        });
  
        return {
          job:job,
          unseenMessagesCount:unseenMessagesCount
        };
      } catch (error) {
        console.error(`Error fetching job chat for jobId ${jobId}:`, error);
        throw new Error("Failed to retrieve job chat.");
      }
    }
  }
  
  export default JobService;
  