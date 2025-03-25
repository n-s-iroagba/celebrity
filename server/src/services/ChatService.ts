import { Celebrity } from '../models/Celebrity';
import Chat from '../models/Chat';
import Message from '../models/Message';
import { Op } from 'sequelize';

class ChatService {

  static async createChat(fanId: number, celebrityId: number) {
    try {
      const chat = await Chat.create({ fanId, celebrityId });
      return chat;
    } catch (error) {
      throw new Error('Failed to create chat');
    }
  }



  static async getChats(userId: number) {
    try {
      const chats = await Chat.findAll({
        where: { [Op.or]: [{ fanId: userId }, { celebrityId: userId }] },
        include: [{ model: Message, as: 'messages' }],
      });
      return chats;
    } catch (error) {
      throw new Error('Failed to retrieve chats');
    }
  }

  static async getFanChatsWithCelebrity(fanId: number) {
    return Chat.findAll({
      where: { fanId },
      include: [{
        model: Celebrity,
        attributes: ['id', 'stageName', 'image']
      }]
    });
  }

  static async getMessages(chatId: number) {
    try {
      const messages = await Message.findAll({ where: { chatId } });
      return messages;
    } catch (error) {
      throw new Error('Failed to retrieve messages');
    }
  }
}

export default ChatService;