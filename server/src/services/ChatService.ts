import { Chat, ChatAttributes, ChatCreationAttributes } from "../models/Chat";
import { Message } from "../models/Message";



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

  

}