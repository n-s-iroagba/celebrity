import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTicketAlt, faStar, faCrown } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface TicketTier {
  name: string;
  price: number;
  perks: string[];
  icon: IconProp;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  ticketTiers: TicketTier[];
}

const events: Event[] = [
  {
    id: 1,
    title: "Charity Gala Dinner with Leonardo DiCaprio",
    date: "2024-06-15",
    location: "Beverly Hills Hotel, Los Angeles",
    description: "An exclusive evening of fine dining and environmental advocacy with Leonardo DiCaprio.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
    ticketTiers: [
      {
        name: "Standard",
        price: 500,
        perks: ["Gala dinner attendance", "Welcome drink", "Photo opportunity"],
        icon: faTicketAlt,
      },
      {
        name: "VIP",
        price: 1000,
        perks: ["Premium seating", "Meet & Greet", "Signed memorabilia", "Cocktail reception"],
        icon: faStar,
      },
      {
        name: "Elite",
        price: 2500,
        perks: ["Private table", "Extended interaction", "Exclusive gift bag", "Priority access", "After-party invitation"],
        icon: faCrown,
      },
    ],
  },
  {
    id: 2,
    title: "Ocean Conservation Summit",
    date: "2024-07-20",
    location: "Monterey Bay Aquarium, California",
    description: "Join leading environmentalists for a day of ocean conservation awareness and action.",
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
    ticketTiers: [
      {
        name: "General",
        price: 200,
        perks: ["Summit access", "Digital resources", "Certificate of participation"],
        icon: faTicketAlt,
      },
      {
        name: "Premium",
        price: 500,
        perks: ["Priority seating", "Lunch with speakers", "Exclusive workshop access", "Resource kit"],
        icon: faStar,
      },
      {
        name: "Patron",
        price: 1000,
        perks: ["VIP seating", "Private reception", "One-on-one sessions", "Annual membership", "Recognition"],
        icon: faCrown,
      },
    ],
  },
];

const EventTickets = () => {
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
                  {event.ticketTiers.map((tier, index) => (
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
                            {tier.perks.map((perk, perkIndex) => (
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

export default EventTickets;
