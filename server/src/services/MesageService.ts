import  Message  from "../models/Message";
import { Fan } from "../models/Fan";
import { Celebrity } from "../models/Celebrity";
import { CreateMessage } from "../types/CreateMessage";

export class MessageService {

  static async postMessage(createMessageData:CreateMessage): Promise<Message> {
    const {senderId, content, isSeen, chatId, mediaType} = {...createMessageData}
    try {
      const shoutout = await Message.create({
        senderId,
        content,
        isSeen,
        chatId,
        mediaType,
      });
      return shoutout;
    } catch (error:any) {
      throw new Error(`Failed to create shoutout: ${error.message}`);
    }
  }

  static async getChatMessages(chatId: number): Promise<Message[]> {
    try {
      return await Message.findAll({
        where: { chatId },
        include: [
          { model: Celebrity, attributes: ['id', 'name'] },
        ],
      });
    } catch (error:any) {
      throw new Error(`Failed to fetch shoutouts for fan: ${error.message}`);
    }
  }

  static async markMessageAsSeen(messageId: number) {
    try {
      const message = await Message.findByPk(messageId);
      if (message) {
        message.isSeen = true;
        await message.save();
        return message;
      } else {
        throw new Error('Message not found');
      }
    } catch (error) {
      throw new Error('Failed to mark message as seen');
    }
  }

  static async getLastChatMessage(chatId: number) {
    return Message.findOne({
      where: { chatId },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'message', 'mediaType', 'mediaUrl', 'createdAt', 'isSeen', 'senderId']
    });
  }

  static async getUnreadCount(chatId: number,fanId:number) {
    return Message.count({
      where: {
        chatId,
        isSeen: false,
        senderId:fanId
      }
    });
  }


}
