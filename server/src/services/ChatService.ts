import { Chat, ChatAttributes, ChatCreationAttributes } from "../models/Chat";
import { Message } from "../models/Message";
import { Job } from "../models/Job";
import { MessageService } from "./MesageService";

export class ChatService {
  /**
   * Create a new chat
   * @param chatData Data to create chat
   * @returns Created chat
   */
  static async createChat(chatData: ChatCreationAttributes): Promise<Chat> {
    try {
      const chat = await Chat.create(chatData);
      return chat;
    } catch (error) {
      throw new Error(`Error creating chat: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all chats
   * @param includeMessages Whether to include associated messages
   * @param includeJob Whether to include associated job
   * @returns Array of all chats
   */
  static async getAllChats(
    includeMessages: boolean = false,
    includeJob: boolean = false
  ): Promise<Chat[]> {
    try {
      const options: any = {};
      const include = [];
      
      if (includeMessages) {
        include.push({
          model: Message,
          as: 'messages'
        });
      }
      
      if (includeJob) {
        include.push({
          model: Job,
          as: 'job'
        });
      }
      
      if (include.length > 0) {
        options.include = include;
      }
      
      const chats = await Chat.findAll(options);
      return chats;
    } catch (error) {
      throw new Error(`Error getting all chats: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get chat by ID
   * @param id Chat ID
   * @param includeMessages Whether to include associated messages
   * @param includeJob Whether to include associated job
   * @returns Chat if found, null otherwise
   */
  static async getChatById(
    id: number,
    includeMessages: boolean = false,
    includeJob: boolean = false
  ): Promise<Chat | null> {
    try {
      const options: any = {
        where: { id }
      };
      const include = [];
      
      if (includeMessages) {
        include.push({
          model: Message,
          as: 'messages'
        });
      }
      
      if (includeJob) {
        include.push({
          model: Job,
          as: 'job'
        });
      }
      
      if (include.length > 0) {
        options.include = include;
      }
      
      const chat = await Chat.findOne(options);
      return chat;
    } catch (error) {
      throw new Error(`Error getting chat by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get chat by job ID
   * @param jobId Job ID
   * @param includeMessages Whether to include associated messages
   * @returns Chat if found, null otherwise
   */
  static async getChatByJobId(
    jobId: number,
    includeMessages: boolean = false
  ): Promise<Chat | null> {
    try {
      const options: any = {
        where: { jobId }
      };
      
      if (includeMessages) {
        options.include = [{
          model: Message,
          as: 'messages'
        }];
      }
      
      const chat = await Chat.findOne(options);
      return chat;
    } catch (error) {
      throw new Error(`Error getting chat by job ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Add message to chat
   * @param chatId Chat ID
   * @param messageData Message data to create
   * @returns Created message
   */
  static async addMessageToChat(
    chatId: number,
    messageData: any // Replace with your MessageCreationAttributes type
  ): Promise<Message> {
    try {
      const chat = await Chat.findByPk(chatId);
      if (!chat) {
        throw new Error('Chat not found');
      }
      
      const message = await chat.createMessage(messageData);
      return message;
    } catch (error) {
      throw new Error(`Error adding message to chat: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all messages for a chat
   * @param chatId Chat ID
   * @returns Array of messages
   */
  static async getChatMessages(chatId: number): Promise<Message[]> {
    try {
      const chat = await Chat.findByPk(chatId);
      if (!chat) {
        throw new Error('Chat not found');
      }
      
      return await chat.getMessages();
      
    } catch (error) {
      throw new Error(`Error getting chat messages: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update chat by ID
   * @param id Chat ID
   * @param updateData Data to update
   * @returns Updated chat
   */
  static async updateChat(
    id: number,
    updateData: Partial<ChatAttributes>
  ): Promise<Chat | null> {
    try {
      const chat = await Chat.findByPk(id);
      if (!chat) {
        return null;
      }

      await chat.update(updateData);
      return chat;
    } catch (error) {
      throw new Error(`Error updating chat: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

}