import { formatDistanceToNow } from 'date-fns';
import Message from '../models/Message';
import Chat from '../models/Chat';


export interface MessageListItem {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageType: 'text' | 'voice' | 'video'|'image';
  lastMessageTime: string;
  unreadCount: number;
}

export function messageListToDto(
  chat: Chat  ,
  lastMessage: Message | null,
  unreadCount: number
): MessageListItem {
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
    name: chat.Celebrity?.stageName||chat.Celebrity?.firstName ||'',
    image: chat.Celebrity?.image || 'https://via.placeholder.com/50',
    lastMessage: lastMessageContent,
    lastMessageType,
    lastMessageTime: lastMessage 
      ? formatDistanceToNow(lastMessage.createdAt, { addSuffix: true })
      : 'No messages yet',
    unreadCount
  };
}