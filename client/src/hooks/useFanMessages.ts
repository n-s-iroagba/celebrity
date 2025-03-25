import { useState, useEffect } from 'react';

interface ChatListItem {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageType: 'text' | 'voice' | 'video';
  lastMessageTime: string;
  unreadCount: number;
}

const useFanChats = (fanId: number) => {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Make API call to your backend endpoint
        const response = await fetch(`/api/fans/${fanId}/chats`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setChats(data);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load chats');
      } finally {
        setLoading(false);
      }
    };

    if (fanId) {
      fetchMessages();
    }
  }, [fanId]);

  return { chats, loading, error };
};

export default useFanChats;