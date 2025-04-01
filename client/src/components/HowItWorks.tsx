import React from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import '../assets/styles/HowItWorks.css'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButton from './ActionButton';

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
    <Container className="py-1 mt-4 ">
    <h2 className=''>How it works</h2>
      <Row className="">
        {steps.map((step, index) => (
          <Col key={index} className='px-0' sm={12} md={6} lg={12}>
            <Card className=" rounded-4 border-0 h-100">
              <Card.Body>
                <Card.Title
                  style={
                    // window.innerWidth >= 992 ?
                     {fontSize:'large' } 
                    //  : {}
                    }
                  className="text-start"
                >
                  {step.title}
                </Card.Title>
                <FontAwesomeIcon className="mb-1" icon={step.icon} />
                <Card.Text
                  style={window.innerWidth >= 992 ? { height: '' } : {}}
                  className="text-start"
                >
                  {step.text}
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ActionButton/>
    </Container>
  );
};

export default HowItWorks;
