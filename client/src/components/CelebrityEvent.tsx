
import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt,  faStar, } from '@fortawesome/free-solid-svg-icons';
import { Event } from '../types/Event';






const CelebrityEvent:React.FC<{events:Event[]}> = ({events}) => {

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Upcoming Events</h2>
      {events.map((event) => (
        <Card className="mb-5 shadow-sm" key={event.id}>
          <Row className="g-0">
            <Col md={4}>
              <Card.Img src={event.image} alt={event.title} className="h-100 w-100" />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title className="mb-2">{event.title}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  {new Date(event.date).toLocaleDateString()} - {event.location}
                </Card.Subtitle>
                <Card.Text>{event.description}</Card.Text>
                <Row className="g-4">
                  {event.ticketTiers.map((tier:any, index:any) => (
                    <Col md={4} key={index}>
                      <Card className="h-100 border-light shadow-sm">
                        <Card.Body>
                          <div className="d-flex align-items-center mb-3">
                            <FontAwesomeIcon
                              icon={tier.icon}
                              className="text-primary me-2"
                              size="lg"
                            />
                            <Card.Title className="mb-0">{tier.name}</Card.Title>
                          </div>
                          <Card.Text className="text-primary fw-bold">
                            ${tier.price}
                          </Card.Text>
                          <ul className="list-unstyled">
                            {tier.perks.map((perk:string, perkIndex:number) => (
                              <li key={perkIndex} className="mb-2 d-flex align-items-center">
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-accent me-2"
                                  size="sm"
                                />
                                {perk}
                              </li>
                            ))}
                          </ul>
                        </Card.Body>
                        <Card.Footer>
                          <Button variant={index === 2 ? "primary" : "outline-primary"} className="w-100">
                            Purchase Ticket
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default CelebrityEvent;
