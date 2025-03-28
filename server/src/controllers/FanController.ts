import { Request, Response } from "express";
import { FanService } from "../services/FanService";
import { MessageService } from "../services/MesageService";
import ChatService from "../services/ChatService";
import { CelebrityService } from "../services/CelebrityService";

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
      const chat = await ChatService.createChat(fanId,celebrity.id)
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

 static async getFanChats(req: Request, res: Response):Promise<any> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ 
          error: 'Valid fan ID is required' 
        });
      }

      const messages = await FanService.getFanChats(Number(id));
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching fan messages:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }
}
