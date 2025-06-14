import { formatDistanceToNow } from 'date-fns';
import Message from '../models/Message';
import Chat from '../models/Chat';


export interface ChatListItem {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageType: 'text' | 'voice' | 'video'|'image';
  lastMessageTime: string;
  unreadCount: number;
}

export async function messageListToDto(
  chat: Chat  ,
  lastMessage: Message | null,
  unreadCount: number
): Promise<ChatListItem> {
  let lastMessageContent = '';
  let lastMessageType: 'text' | 'voice' | 'video'|'image' = 'text';

  if (lastMessage) {
    lastMessageType = lastMessage.mediaType;
    lastMessageContent = lastMessage.mediaType === 'text' 
      ? lastMessage.content || ''
      : lastMessage.mediaUrl || '';
  }

  return {
    id: chat.id,
    name: (await chat.getCelebrity()).stageName||(await chat.getCelebrity()).firstName ||'',
    image: (await chat.getCelebrity()).image || 'https://via.placeholder.com/50',
    lastMessage: lastMessageContent,
    lastMessageType,
    lastMessageTime: lastMessage 
      ? formatDistanceToNow(lastMessage.createdAt, { addSuffix: true })
      : 'No messages yet',
    unreadCount
  };
}
