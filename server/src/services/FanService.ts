import { Role } from "../enums/Role";
import { messageListToDto } from "../helper/messageDto";
import Chat from "../models/Chat";
import { Fan, FanCreationAttributes } from "../models/Fan";
import { User } from "../models/User";
import ChatService from "./ChatService";
import { MailService } from "./MailService";
import { MessageService } from "./MesageService";
import { UserService } from "./UserService";


export class FanService {
  static ChatService: any;
  static MessageService: any;

      static async createFan(fanData: Partial<Fan>,userData: Partial<User>): Promise<{token:string|null, fanId:number}> {
          const {
            firstName,
            surname,
            whatsappNumber,
            country,
            dateOfBirth,
            gender,
          } = fanData;
        const {
          email,
          password,
        }= userData
          if (
            !firstName ||
            !surname ||
            !email||
            !password ||
            !gender||
            !whatsappNumber ||
            !country ||
            !dateOfBirth
          ) {
            throw new Error("Missing user fields  required in createFan Service function");
          }
      try{
          const user = await UserService.createUser(Role.FAN, userData as {email:string, password:string})
    
         const fan = await Fan.create({
          firstName,
          surname,
          whatsappNumber,
          country,
          dateOfBirth,
          userId:user.id,
          gender

        } as FanCreationAttributes);
  //because of how special their message was
    
        // await MailService.sendVerificationEmail(user);
        return {token:user.verificationToken,fanId:fan.id};
      }catch(e:any){
        console.error(e)
        throw new Error("Error creating fan in createFan Service function")
      }
      }

  static async getAllFans(): Promise<Fan[]> {
    return await Fan.findAll();
  }

  static async getFanById(id: number): Promise<Fan | null> {
    return await Fan.findByPk(id);
  }

  static async updateFan(id: number, updates: Partial<Fan>): Promise<Fan | null> {
    const fan = await Fan.findByPk(id);
    if (!fan) return null;
    return await fan.update(updates);
  }

  static async deleteFan(userId: number): Promise<boolean> {
    const deleted = await User.destroy({ where: { id:userId
 } });
    return deleted > 0;
  }


  static async getFanChats(fanId: number) {

    const chats:Chat[] = await ChatService.getFanChatwithMessages(fanId);
    
    if (!chats || chats.length === 0) {
      return [];
    }

    // Process each chat
    const messageListItems = await Promise.all(
      chats.map(async (chat) => {
        const [lastMessage, unreadCount] = await Promise.all([
          MessageService.getLastChatMessage(chat.id),
          MessageService.getUnreadCount(chat.id, chat.celebrityId)
        ]);

        return messageListToDto(chat, lastMessage, unreadCount);
      })
    );


    return messageListItems.sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
  }
}
