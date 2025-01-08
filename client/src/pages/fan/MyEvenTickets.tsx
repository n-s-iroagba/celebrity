import { faCalendar, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Table } from "react-bootstrap";

interface PurchasedTicket {
  eventId: number;
  eventTitle: string;
  date: string;
  ticketTier: string;
  price: number;
}

interface Fan {
  id: number;
  name: string;
  email: string;
  purchasedTickets: PurchasedTicket[];
}

// Sample data
const fans: Fan[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    purchasedTickets: [
      {
        eventId: 1,
        eventTitle: "Charity Gala Dinner with Leonardo DiCaprio",
        date: "2024-06-15",
        ticketTier: "VIP",
        price: 1000,
      },
      {
        eventId: 2,
        eventTitle: "Ocean Conservation Summit",
        date: "2024-07-20",
        ticketTier: "Premium",
        price: 500,
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    purchasedTickets: [
      {
        eventId: 1,
        eventTitle: "Charity Gala Dinner with Leonardo DiCaprio",
        date: "2024-06-15",
        ticketTier: "Elite",
        price: 2500,
      },
    ],
  },
];

const MyEventTickets: React.FC = () => {
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Purchased Event Tickets</h2>
      {fans.map((fan) => (
        <Card key={fan.id} className="mb-4 shadow-sm">
          <Card.Header>
            <h4 className="mb-0">{fan.name}</h4>
            <small className="text-muted">{fan.email}</small>
          </Card.Header>
          <Card.Body>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Ticket Tier</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {fan.purchasedTickets.map((ticket) => (
                  <tr key={ticket.eventId}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                      <FontAwesomeIcon icon={faTicket} className="text-primary" />
                        {ticket.eventTitle}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                      <FontAwesomeIcon icon={faCalendar} className="text-muted" />
                        {new Date(ticket.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td>{ticket.ticketTier}</td>
                    <td>${ticket.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end fw-light">
              <small>
                <strong>Total Spent:</strong> $
                {fan.purchasedTickets.reduce((sum, ticket) => sum + ticket.price, 0)}
              </small>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MyEventTickets;
