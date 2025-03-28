import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../assets/styles/HowItWorks.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: faSearch,
      title: 'Search celeb',
      text: 'Find your favorite celebrity by searching their name in our search bar.',
    },
    {
      icon: faArrowAltCircleLeft,
      title: 'Send a shoutout message',
      text: 'Type and send your shout out message.'
      // title: ' Book a schedule for calls or Request Personalized Video',
      // text: 'Schedule a call at a time that is convenient for you or request for a personalized video.',
    },
    {
      icon: faArrowAltCircleRight,
      title: ' Get a response',
      text: 'Receive a prompt response tailored to your selected conversation type.',
    },
  ];

  return (
    <div className="py-1 mt-4 text-light">
    <h2 className=''>How it works</h2>
      <Row className="">
        {steps.map((step, index) => (
          <Col key={index} className='px-0' sm={12} md={6} lg={12}>
            <Card className="shadow-sm bg-grey text-light  rounded-4 border-0 h-100">
              <Card.Body>
                <Card.Title
                  style={window.innerWidth >= 992 ? { height: '1cm' } : {}}
                  className="text-start"
                >
                  {step.title}
                </Card.Title>
                <FontAwesomeIcon className="mb-1" color="white" icon={step.icon} />
                <Card.Text
                  style={window.innerWidth >= 992 ? { height: '1cm' } : {}}
                  className="text-start"
                >
                  {step.text}
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HowItWorks;
