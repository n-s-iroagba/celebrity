import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faStar, } from '@fortawesome/free-solid-svg-icons';
import { Tour } from '../../types/Tour';

const tourTiers:Tour[] = [
  {
    id:1,
    name: "Backstage Experience",
    price: 299.99,
    description: "Get an exclusive backstage tour and meet-and-greet",
    icon: faTicketAlt,
    features: [
      "30-minute backstage tour",
      "Professional photo opportunity",
      "Autographed merchandise",
      "Priority venue entry",
    ],
  },
];

const Tours = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 font-weight-bold">Immersive Fan Experiences</h1>
          <p className="text-muted">
            Choose your perfect immersion experience and create unforgettable memories with your favorite celebrity.
          </p>
        </div>
        <Row className="g-4">
          {tourTiers.map((tier, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon
                      icon={tier.icon}
                      className="text-primary me-2"
                      size="2x"
                    />
                    <Card.Title as="h5" className="mb-0">{tier.name}</Card.Title>
                  </div>
                  <Card.Text>{tier.description}</Card.Text>
                  <h3 className="text-primary mb-4">
                    ${tier.price.toLocaleString()}
                    <span className="fs-6 text-muted">/person</span>
                  </h3>
                  <ul className="list-unstyled">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="d-flex align-items-center mb-2">
                        <FontAwesomeIcon icon={faStar} className="text-accent me-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <Button
                    variant={index === 2 ? "primary" : "outline-primary"}
                    size="lg"
                    className="w-100"
                  >
                    Book {tier.name}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Tours;
