import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperclip,
  faMicrophone,
  faPaperPlane,
  faCheck,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import { BACKEND_SERVER_URL } from '../data/urls';

interface Message {
  id: number;
  content: string;
  mediaType: 'text' | 'video' | 'voice';
  sender: 'user' | 'other';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

// -------------------- Global Styles --------------------
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    background-color: #ffffff;
  }
`;

// -------------------- Styled Components --------------------
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  background-color: #ffffff;
  overflow-x: hidden;
`;

const Header = styled.header`
  background: linear-gradient(90deg, #8e2de2 0%, #4a00e0 100%);
  color: #ffffff;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderInfo = styled.div`
  margin-left: 0.75rem;
`;

const HeaderName = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  font-weight: 600;
`;

const HeaderStatus = styled.p`
  font-size: 0.875rem;
  opacity: 0.85;
  margin: 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MessageRow = styled.div<{ fromUser: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.fromUser ? 'flex-end' : 'flex-start')};
  padding: 0 1rem;
`;

const Bubble = styled.div<{ fromUser: boolean }>`
  max-width: 65%;
  position: relative;
  background-color: ${(props) => (props.fromUser ? '#6f42c1' : '#ffffff')};
  color: ${(props) => (props.fromUser ? '#ffffff' : '#212529')};
  border: ${(props) => (props.fromUser ? 'none' : '1px solid #dee2e6')};
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    ${(props) =>
      props.fromUser
        ? 'right: -8px; border-left: 8px solid transparent; border-top: 8px solid #6f42c1;'
        : 'left: -8px; border-right: 8px solid transparent; border-top: 8px solid #ffffff;'}
    width: 0;
    height: 0;
  }
`;

const Timestamp = styled.span<{ fromUser: boolean }>`
  font-size: 0.75rem;
  color: ${(props) => (props.fromUser ? 'rgba(255,255,255,0.75)' : '#6c757d')};
`;

const InputArea = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const TextInput = styled.input`
  flex: 1;
  border: 1px solid #ced4da;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #8e2de2;
    box-shadow: 0 0 0 0.2rem rgba(142, 45, 226, 0.25);
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #6f42c1;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(111, 66, 193, 0.1);
  }
`;

const SendButton = styled(IconButton)`
  background-color: #6f42c1;
  color: #ffffff;
  padding: 0.75rem;
  &:hover {
    background-color: #5a359e;
  }
`;

// -------------------- Component --------------------
const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: 'Hey there! How are you?', mediaType: 'text', sender: 'other', timestamp: '09:30', status: 'read' },
    { id: 2, content: 'I\'m great, thanks! 😊', mediaType: 'text', sender: 'user', timestamp: '09:31', status: 'read' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: messages.length + 1,
      content: newMessage,
      mediaType: 'text',
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
  };

  const StatusIndicator = ({ status }: { status: Message['status'] }) => (
    <FontAwesomeIcon
      icon={status === 'read' ? faCheckDouble : faCheck}
      style={{ fontSize: '0.75rem', marginLeft: '0.25rem', color: status === 'read' ? '#4b0082' : '#adb5bd' }}
    />
  );

  return (
    <>
      <GlobalStyle />
      <ChatContainer>
        <Header>
          <HeaderInfo>
            <HeaderName>John Doe</HeaderName>
            <HeaderStatus>Online</HeaderStatus>
          </HeaderInfo>
        </Header>

        <MessagesContainer>
          {messages.map((msg) => (
            <MessageRow key={msg.id} fromUser={msg.sender === 'user'}>
              <Bubble fromUser={msg.sender === 'user'}>
                {msg.mediaType === 'text' && <p style={{ margin: 0 }}>{msg.content}</p>}
                {msg.mediaType === 'voice' && (
                  <audio controls style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}>
                    <source src={`${BACKEND_SERVER_URL}${msg.content}`} type="audio/mpeg" />
                    Your browser does not support audio.
                  </audio>
                )}
                {msg.mediaType === 'video' && (
                  <video controls style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}>
                    <source src={`${BACKEND_SERVER_URL}${msg.content}`} type="video/mp4" />
                    Your browser does not support video.
                  </video>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '4px' }}>
                  <Timestamp fromUser={msg.sender === 'user'}>{msg.timestamp}</Timestamp>
                  {msg.sender === 'user' && <StatusIndicator status={msg.status} />}
                </div>
              </Bubble>
            </MessageRow>
          ))}
        </MessagesContainer>

        <InputArea>
          <IconButton>
            <FontAwesomeIcon icon={faPaperclip} />
          </IconButton>
          <TextInput
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton>
            <FontAwesomeIcon icon={faMicrophone} />
          </IconButton>
          <SendButton onClick={handleSendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </SendButton>
        </InputArea>
      </ChatContainer>
    </>
  );
};

export default ChatMessages;
