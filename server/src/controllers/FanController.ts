import { Request, Response } from "express";
import { FanService } from "../services/FanService";
import { MessageService } from "../services/MesageService";
import { CelebrityService } from "../services/CelebrityService";
import { ChatService } from "../services/ChatService";
import JobService from "../services/JobService";

export class FanController {

  static async createFan(req: Request, res: Response): Promise<any> {
    let {
    
      fanData,
      mediaType,
      mediaFile,
      message,
      celebrity,
      userData,
      content

    } = req.body


    fanData = JSON.parse(fanData);
    userData = JSON.parse(userData);
    celebrity = JSON.parse(celebrity);
    const mediaData ={
      mediaType:mediaType,
      mediaFile,
      message:message,
    }
    if (!req.file&& mediaType !=='text') {
      throw Error ('No file uploaded');
    }
    try {
      if (!celebrity.id){
         console.log('no celebrity id')
         console.log('celebrity',celebrity)
        celebrity = await CelebrityService.createCelebrity(
          celebrity
        )

      }
      console.log('fan data is',fanData)
      console.log('user data is',userData)
      console.log('celebrity is ',celebrity)
     
      const {token,fanId} = await FanService.createFan(fanData, userData);
      const job = await JobService.createJob({fanId,celebrityId:celebrity.id})
      const chat = await ChatService.createChat({ jobId: job.id });
      await MessageService.postMessage({...mediaData,content:content,chatId:chat.id,isSeen:false,senderId:fanId})
      return res.status(201).json(token);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }
  static async getAllFans(req: Request, res: Response): Promise<any> {
    try {
      const fans = await FanService.getAllFans();
      return res.status(200).json(fans);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }


  static async getFanById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const fan = await FanService.getFanById(id);
      if (!fan) {
        throw new Error("Fan not found");
      }
      return res.status(200).json(fan);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const updates = req.body;
      const updatedFan = await FanService.updateFan(id, updates);
      if (!updatedFan) {
        throw new Error("Fan not found");
      }
      return res.status(200).json({ message: "Fan updated successfully", fan: updatedFan });
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await FanService.deleteFan(id);
      if (!success) {
        throw new Error("Fan not found");
      }
      return res.status(200).json({ message: "Fan deleted successfully" });
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

}
