import React from 'react';
import { Button } from 'react-bootstrap';
import '../assets/styles/ActionButton.css'
import { useNavigate } from 'react-router-dom';
const ActionButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="d-flex flex-grow-1 gap-2 small-font px-2  bg-transparent ">
     
      <button  onClick={() => navigate(`book/shout-out`)} className="w-100 purple-button-outline action-button w-lg-25 bg-transparent">
        Send Shoutout
      </button>
   
    </div>
  );
};

export default ActionButton;
