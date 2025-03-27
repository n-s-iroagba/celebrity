import React from 'react';
import { ListGroup, Image, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faMicrophone, faVideo } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Interactions.css'; // Updated CSS file name
import useFanChats from '../hooks/useFanMessages';
import { IdProps } from '../types/idProps';
import { truncateString } from '../utils/truncateString';




const Interactions: React.FC<IdProps> = ({id}) => {

const {chats} = useFanChats(id)
  return (
    <div className="interactions-container">
 
        <h4 className="mb-4">My Interactions</h4>
        <ListGroup>
          {chats.map((chat) => (
            <ListGroup.Item key={chat.id} className="interaction-item">
              <div className="d-flex justify-content-between align-items-center w-100">
                {/* Left Side: Celebrity Image and Details */}
                <div className="d-flex align-items-center flex-grow-1">
                  <Image
                    src={chat.image}
                    alt={chat.name}
                    roundedCircle
                    className="celebrity-image"
                  />
                  <div className="ms-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">{chat.name}</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Display icon and label based on message type */}
                      {chat.lastMessageType === 'voice' && (
                        <>
                          <FontAwesomeIcon icon={faMicrophone} className="text-muted me-2" />
                          <small className="text-muted me-2">Voice note · {chat.lastMessage}</small>
                        </>
                      )}
                      {chat.lastMessageType === 'video' && (
                        <>
                          <FontAwesomeIcon icon={faVideo} className="text-muted me-2" />
                          <small className="text-muted me-2">Video · {chat.lastMessage}</small>
                        </>
                      )}
                      {chat.lastMessageType === 'text' && (
                        <small className="text-muted me-2">{truncateString(chat.lastMessage, 13)}</small>
                      )}
               
                  <small className="text-muted me-3">{chat.lastMessageTime}</small>
                  {chat.unreadCount > 0 && (
                    <Badge pill bg="success" className="me-2">
                      {chat.unreadCount}
                    </Badge>
                  )}
                  {chat.unreadCount === 0 && (
                    <FontAwesomeIcon
                      icon={faCheckDouble}
                      className="text-primary"
                    />
                  )}
                </div>
                    </div>
                    
                  </div>
                </div>

             
             
            </ListGroup.Item>
          ))}
        </ListGroup>
    
    </div>
  );
};

export default Interactions;