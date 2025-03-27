import React from 'react';
import { Button } from 'react-bootstrap';
import '../assets/styles/ActionButton.css'
import { useNavigate } from 'react-router-dom';
const ActionButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="d-flex flex-grow-1 gap-2 small-font px-2 ">
     
      <Button variant="outline-light"  onClick={() => navigate(`book/shout-out`)} className="w-100 action-button">
        Shout Out
      </Button>
   
    </div>
  );
};

export default ActionButton;
