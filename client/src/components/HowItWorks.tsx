import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../assets/styles/HowItWorks.css'

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: '1. Click the button for the preferred conversation',
      text: 'Select the type of conversation you want to initiate by clicking the appropriate button.',
    },
    {
      title: '2. Search celeb',
      text: 'Find your favorite celebrity by searching their name in our search bar.',
    },
    {
      title: '3. Book a schedule (for calls only)',
      text: 'Schedule a call at a time that is convenient for you.',
    },
    {
      title: '4. Get a response',
      text: 'Receive a prompt response tailored to your selected conversation type.',
    },
  ];

  return (
    <Container className="py-4">
      <Row className="g-4">
        {steps.map((step, index) => (
          <Col key={index} sm={12} md={6} lg={3}>
            <Card className="shadow-sm bg-grey rounded-4 border-0 h-100">
              <Card.Body>
                <Card.Title className="text-start">{step.title}</Card.Title>
                <Card.Text className="text-start">{step.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HowItWorks;
