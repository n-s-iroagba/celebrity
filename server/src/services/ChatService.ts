import { Op } from 'sequelize';
import Chat from '../models/Chat';
import Message from '../models/Message';
import {Fan} from '../models/Fan';
import {Celebrity} from '../models/Celebrity';

class ChatService {
  // Create a new chat between fan and celebrity
  async createChat(fanId: number, celebrityId: number): Promise<Chat> {
    // Check if fan and celebrity exist
    const [fan, celebrity] = await Promise.all([
      Fan.findByPk(fanId),
      Celebrity.findByPk(celebrityId)
    ]);

    if (!fan || !celebrity) {
      throw new Error('Fan or Celebrity not found');
    }

    // Check if chat already exists
    const existingChat = await Chat.findOne({
      where: { fanId, celebrityId }
    });

    if (existingChat) {
      return existingChat;
    }

    return await Chat.create({ 
      fanId, 
      celebrityId, 
      status: 'not_yet_seen' 
    });
  }

  // Get all chats for a user (fan or celebrity) with last message preview
  async getUserChats(userId: number, userType: 'fan' | 'celebrity'): Promise<Chat[]> {
    const userField = userType === 'fan' ? 'fanId' : 'celebrityId';
    const oppositeField = userType === 'fan' ? 'Celebrity' : 'Fan';

    return await Chat.findAll({
      where: { [userField]: userId },
      include: [
        {
          association: oppositeField,
          attributes: ['id', 'name', 'profilePicture']
        },
        {
          association: 'Messages',
          attributes: ['content', 'createdAt', 'mediaType'],
          order: [['createdAt', 'DESC']],
          limit: 1,
          separate: true
        }
      ],
      order: [['updatedAt', 'DESC']]
    });
  }

  // Get a single chat with all messages and participant info
  async getChatWithMessages(
    chatId: number, 
    userId: number, 
    userType: 'fan' | 'celebrity'
  ): Promise<Chat | null> {
    const userField = userType === 'fan' ? 'fanId' : 'celebrityId';
    const oppositeField = userType === 'fan' ? 'Celebrity' : 'Fan';

    const chat = await Chat.findOne({
      where: { 
        id: chatId,
        [userField]: userId 
      },
      include: [
        {
          association: oppositeField,
          attributes: ['id', 'name', 'profilePicture']
        },
        {
          association: 'Messages',
          order: [['createdAt', 'ASC']]
        }
      ]
    });

    if (!chat) return null;

    // Update chat status if celebrity is viewing unseen messages
    if (userType === 'celebrity' && chat.status === 'not_yet_seen') {
      await chat.update({ status: 'seen' });
      await this.markMessagesAsSeen(chatId, userId, userType);
    }

    return chat;
  }

  // Send a message and update chat status accordingly
  async sendMessage(
    chatId: number,
    senderId: number,
    senderType: 'fan' | 'celebrity',
    content: string,
    mediaType: 'text' | 'video' | 'voice' | 'image' = 'text',
    mediaUrl: string | null = null
  ): Promise<{message: Message, chat: Chat}> {
    const chat = await Chat.findByPk(chatId, {
      include: [
        { association: 'Fan' },
        { association: 'Celebrity' }
      ]
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    // Verify sender is a participant in this chat
    if (
      (senderType === 'fan' && chat.fanId !== senderId) ||
      (senderType === 'celebrity' && chat.celebrityId !== senderId)
    ) {
      throw new Error('Unauthorized to send message in this chat');
    }

    // Fans can only send messages if chat is responded
    if (senderType === 'fan' && chat.status !== 'responded') {
      throw new Error('Cannot send message until celebrity responds');
    }

    // Update chat status based on who is sending
    let statusUpdate = {};
    if (senderType === 'fan') {
      statusUpdate = { status: 'not_yet_seen' };
    } else if (senderType === 'celebrity') {
      statusUpdate = { status: 'responded' };
    }

    const [message, updatedChat] = await Promise.all([
      Message.create({
        chatId,
        senderType,
        senderId,
        content,
        mediaType,
        mediaUrl,
        isSeen: false
      }),
      chat.update({
        ...statusUpdate,
        updatedAt: new Date()
      })
    ]);

    return { message, chat: updatedChat };
  }

  // Mark chat as responded (typically when a job is created)
  async markAsResponded(chatId: number, celebrityId: number): Promise<Chat> {
    const chat = await Chat.findOne({
      where: {
        id: chatId,
        celebrityId
      }
    });

    if (!chat) {
      throw new Error('Chat not found or unauthorized');
    }

    return await chat.update({ status: 'responded' });
  }

  // Mark all unseen messages in a chat as seen
  async markMessagesAsSeen(
    chatId: number, 
    userId: number, 
    userType: 'fan' | 'celebrity'
  ): Promise<number> {
    if (userType !== 'celebrity') {
      return 0; // Only celebrities can mark messages as seen
    }

    const [affectedCount] = await Message.update(
      { isSeen: true },
      {
        where: {
          chatId,
          senderType: 'fan',
          isSeen: false
        }
      }
    );

    return affectedCount;
  }

  // Get unread message count for a celebrity
  async getUnreadCount(celebrityId: number): Promise<number> {
    return await Message.count({
      include: [{
        association: 'Chat',
        where: { 
          celebrityId,
          status: { [Op.ne]: 'responded' } 
        }
      }],
      where: {
        senderType: 'fan',
        isSeen: false
      }
    });
  }
}

export default new ChatService();