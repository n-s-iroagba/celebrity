import React from 'react';
import { ListGroup, Image, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faMicrophone, faVideo } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Interactions.css'; // Updated CSS file name
import FanDashboardLayout from '../../components/FanDashboardLayout';
import { truncateString } from '../../utils/truncateString';

interface MessageListItem {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageType: 'text' | 'voice' | 'video'; // Type of the last message
  lastMessageTime: string;
  unreadCount: number;
}

const celebrities: MessageListItem[] = [
  {
    id: 1,
    name: 'Adele',
    image: 'https://via.placeholder.com/50',
    lastMessage: 'Thank you for your support!',
    lastMessageType: 'text',
    lastMessageTime: '20 hours ago',
    unreadCount: 2,
  },
  {
    id: 2,
    name: 'Drake',
    image: 'https://via.placeholder.com/50',
    lastMessage: '0:15', // Duration of the voice note
    lastMessageType: 'voice',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 3,
    name: 'Beyoncé',
    image: 'https://via.placeholder.com/50',
    lastMessage: '0:30', // Duration of the video
    lastMessageType: 'video',
    lastMessageTime: 'Last week',
    unreadCount: 5,
  },
];

const Interactions: React.FC = () => {
  return (
    <div className="interactions-container">
      <FanDashboardLayout>
        <h4 className="mb-4">My Interactions</h4>
        <ListGroup>
          {celebrities.map((celebrity) => (
            <ListGroup.Item key={celebrity.id} className="interaction-item">
              <div className="d-flex justify-content-between align-items-center w-100">
                {/* Left Side: Celebrity Image and Details */}
                <div className="d-flex align-items-center flex-grow-1">
                  <Image
                    src={celebrity.image}
                    alt={celebrity.name}
                    roundedCircle
                    className="celebrity-image"
                  />
                  <div className="ms-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">{celebrity.name}</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Display icon and label based on message type */}
                      {celebrity.lastMessageType === 'voice' && (
                        <>
                          <FontAwesomeIcon icon={faMicrophone} className="text-muted me-2" />
                          <small className="text-muted me-2">Voice note · {celebrity.lastMessage}</small>
                        </>
                      )}
                      {celebrity.lastMessageType === 'video' && (
                        <>
                          <FontAwesomeIcon icon={faVideo} className="text-muted me-2" />
                          <small className="text-muted me-2">Video · {celebrity.lastMessage}</small>
                        </>
                      )}
                      {celebrity.lastMessageType === 'text' && (
                        <small className="text-muted me-2">{truncateString(celebrity.lastMessage, 13)}</small>
                      )}
               
                  <small className="text-muted me-3">{celebrity.lastMessageTime}</small>
                  {celebrity.unreadCount > 0 && (
                    <Badge pill bg="success" className="me-2">
                      {celebrity.unreadCount}
                    </Badge>
                  )}
                  {celebrity.unreadCount === 0 && (
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
      </FanDashboardLayout>
    </div>
  );
};

export default Interactions;