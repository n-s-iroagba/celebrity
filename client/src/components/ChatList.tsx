import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface ChatItem {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

// Global styling
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    background-color: #ffffff;
  }
`;

// Container
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;

// Header
const Header = styled.header`
  background: linear-gradient(90deg, #8e2de2 0%, #4a00e0 100%);
  color: #ffffff;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
`;

// Search bar
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  margin: 0.5rem 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  margin-left: 0.5rem;
  outline: none;
  font-size: 1rem;
`;

// Chat items
const ChatsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
`;

const ChatRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: rgba(111,66,193,0.05);
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChatInfo = styled.div`
  flex: 1;
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChatName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #212529;
`;

const LastMessage = styled.span`
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TimeStamp = styled.span`
  font-size: 0.75rem;
  color: #6c757d;
`;

const UnreadBadge = styled.span`
  background-color: #6f42c1;
  color: #ffffff;
  border-radius: 12px;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

// Component
const ChatList: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[]>([
    { id: 1, name: 'Alice Johnson', avatar: '/avatars/alice.jpg', lastMessage: 'See you tomorrow!', timestamp: '12:45', unreadCount: 2 },
    { id: 2, name: 'Bob Smith', avatar: '/avatars/bob.jpg', lastMessage: 'Thanks for the update.', timestamp: '11:20', unreadCount: 0 },
    { id: 3, name: 'Charlie Brown', avatar: '/avatars/charlie.jpg', lastMessage: 'Can we reschedule?', timestamp: '09:05', unreadCount: 5 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GlobalStyle />
      <ListContainer>
        <Header>
          <HeaderTitle>Chats</HeaderTitle>
        </Header>
        <SearchBar>
          <FontAwesomeIcon icon={faSearch} />
          <SearchInput
            type="text"
            placeholder="Search chats"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <ChatsList>
          {filteredChats.map(chat => (
            <ChatRow key={chat.id}>
              <Avatar src={chat.avatar} alt={chat.name} />
              <ChatInfo>
                <ChatName>{chat.name}</ChatName>
                <LastMessage>{chat.lastMessage}</LastMessage>
              </ChatInfo>
              <ChatMeta>
                <TimeStamp>{chat.timestamp}</TimeStamp>
                {chat.unreadCount > 0 && <UnreadBadge>{chat.unreadCount}</UnreadBadge>}
              </ChatMeta>
            </ChatRow>
          ))}
        </ChatsList>
      </ListContainer>
    </>
  );
};

export default ChatList;
