import { messageListToDto } from "../helper/messageDto";
import { Celebrity } from "../models/Celebrity";
import Charity from "../models/Charity";
import Chat from "../models/Chat";
import ClubMembership from "../models/ClubMembership";
import { Job } from "../models/Job";
import Message from "../models/Message";
import Souvenir from "../models/Souvenir";
import Ticket from "../models/Ticket";
import { Tour } from "../models/Tour";
import { MessageService } from "./MesageService";
import {Event} from '../models/Event'

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

  
  static async getJobDetails(fanId: string, celebrityId: string) {
    try {
      // Fetch job details based on fanId and celebrityId
      const job = await Job.findOne({
        where: { fanId, celebrityId },
        include: [
          {
            model: Chat,
            as: "chat",
            include: [
              {
                model: Message,
                as: "messages",
                order: [["createdAt", "DESC"]], // Orders messages by createdAt in descending order
              },
            ],
          },
          {
            model: Celebrity,
            as: "celebrity",
            include: [
              {
                model: Event,
                as: "events", // One-to-many relationship with events
                include: [
                  {
                    model: Ticket,
                    as: "tickets", // One-to-many relationship with tickets
                    order: [["price", "DESC"]], // Orders tickets by price in descending order
                  },
                ],
              },
              {
                model: Tour,
                as: "tours", // One-to-many relationship with tour packages
                order: [["price", "DESC"]], // Orders tours by price in descending order
              },
              {
                model: ClubMembership,
                as: "clubMemberships", // One-to-many relationship with club memberships
              },
              {
                model: Souvenir,
                as: "souvenirs", // One-to-many relationship with souvenirs
              },
              {
                model: Charity,
                as: "charities", // One-to-many relationship with charity
              },
            ],
          },
        ],
      });
  
      // Check if job is found
      if (!job) {
        throw new Error("Job not found.");
      }
     console.log(job.chat?.messages)
      // Return the fetched job details
      return job;
    } catch (error) {
      console.error("Error fetching job details:", error);
      throw new Error("Failed to retrieve job details.");
    }
  }
  


    static async getJobsByFanId(fanId: number) {
      try {
        const jobs = await Job.findAll({
          where: { fanId }, // Correct placement of `where`
          include: [
            {
              model: Celebrity,
              as: "celebrity", 
            },
            {
              model:Chat,
              as:'chat',
              include:[
                {
                  model:Message,
                  as:'messages'
                }
              ]
            }
          ],
        });
        // const unseenMessagesCount = await Message.count({
        //   where: {
        //     chatId: chat.id,
        //     senderId: job.fanId, 
        //     isSeen: false, 
        //   },
        // });
  
        // return {
        //   job:job,
        //   unseenMessagesCount:unseenMessagesCount
        // };
       return jobs
  
      } catch (error) {
        console.error(`Error fetching jobs by fanId ${fanId}:`, error);
        throw new Error("Failed to retrieve jobs.");
      }
    }
    
  }
  
  export default JobService;
  