import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../assets/styles/HowItWorks.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon:faUser,
      title: 'Click the button for the preferred conversation',
      text: 'Select the type of conversation you want to initiate by clicking the appropriate button.',
    },
    {
      icon:faSearch,
      title: 'Search celeb',
      text: 'Find your favorite celebrity by searching their name in our search bar.',
    },
    {
      icon:faArrowAltCircleLeft,
      title: ' Book a schedule (for calls only)',
      text: 'Schedule a call at a time that is convenient for you.',
    },
    {
      icon:faArrowAltCircleRight,
      title: ' Get a response',
      text: 'Receive a prompt response tailored to your selected conversation type.',
    },
  ];

  return (
    <div className="py-4">
      <Row className="g-4">
        {steps.map((step, index) => (
          <Col key={index} sm={12} md={6} lg={3}>
            <Card className="shadow-sm bg-grey rounded-4 border-0 h-100">
              <Card.Body>
                <Card.Title className="text-start">{step.title}</Card.Title>
                <FontAwesomeIcon color='black' icon ={step.icon}  />
                <Card.Text className="text-start">{step.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HowItWorks;
