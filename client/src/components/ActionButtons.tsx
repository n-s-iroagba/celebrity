import React from 'react';
import { Button } from 'react-bootstrap';
import '../assets/styles/ActionButton.css'
const ActionButtons: React.FC = () => {
  return (
    <div className="d-flex flex-grow-1 gap-2 small-font px-2 outline-dara">
      <Button variant="outline-dark" className="w-100 action-button">
        Video Call
      </Button>
      <Button variant="outline-dark" className="w-100 action-button">
        Phone Call
      </Button>
      <Button variant="outline-dark" className="w-100 action-button">
        Shout Out
      </Button>
      <Button variant="outline-dark" className="w-100 action-button">
        Personalised Video
      </Button>
    </div>
  );
};

export default ActionButtons;
