import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CelebrityReply: React.FC = () => {
  // Mock data for the fan's message and celebrity's reply
  const fanMessage = {
    name: 'Sarah Johnson',
    message: 'Hi Taylor, you’ve been my inspiration since I was 12! Can you wish me luck for my college exams? 💖',
    date: 'October 10, 2023',
  };

  const celebrityReply = {
    name: 'Taylor Swift',
    message: 'Hey Sarah! Good luck on your exams—you’re going to crush it! 🎓✨ Love, Taylor',
    date: 'October 12, 2023',
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-success text-white">
              <h3 className="mb-0 d-flex flex-column align-items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                <h4 className='text-center'>Your Message Has Been Replied!</h4>
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              {/* Fan's Message */}
              <div className="mb-4">
                <h5 className="text-muted mb-3">Your Message</h5>
                <Card className="bg-light border-success">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-grow-1">
                        <strong>{fanMessage.name}</strong>
                        <small className="text-muted ms-2">{fanMessage.date}</small>
                      </div>
                    </div>
                    <p className="mb-0">{fanMessage.message}</p>
                  </Card.Body>
                </Card>
              </div>

              {/* Celebrity's Reply */}
              <div>
                <h5 className="text-muted mb-3">Reply from {celebrityReply.name}</h5>
                <Card className="bg-white border-black shadow-sm">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-grow-1">
                        <strong className="text-success">{celebrityReply.name}</strong>
                        <small className="text-muted ms-2">{celebrityReply.date}</small>
                      </div>
                    </div>
                    <p className="mb-0">{celebrityReply.message}</p>
                  </Card.Body>
                </Card>
              </div>

              {/* Share Button */}
              <div className="mt-4 text-center">
                <Button variant="success" size="lg" className="me-3">
                  <FontAwesomeIcon icon={faShare} className="me-2" />
                  Share This Moment
                </Button>
                {'  '}
                <Button variant="outline-success" size="lg">
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Send Another Message
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CelebrityReply;