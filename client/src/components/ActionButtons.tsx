import React from 'react';
import { Button } from 'react-bootstrap';
import '../assets/styles/ActionButton.css'
import { useNavigate } from 'react-router-dom';
const ActionButtons: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="d-flex flex-grow-1 gap-2 small-font px-2 ">
      <Button variant="outline-light" onClick={() => navigate(`book/video-call`)} className="w-100 action-button">
        Video Call
      </Button>
      <Button variant="outline-light" onClick={() => navigate(`book/phone-call`)} className="w-100 action-button">
        Phone Call
      </Button>
      <Button variant="outline-light"  onClick={() => navigate(`book/shout-out`)} className="w-100 action-button">
        Shout Out
      </Button>
      <Button variant="outline-light" onClick={() => navigate(`book/personalized-video`)} className="w-100 action-button">
        personalized Video
      </Button>
    </div>
  );
};

export default ActionButtons;
