import { faCalendar, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Table } from "react-bootstrap";
import { useBookedEvents } from "../hooks/useBookedEvents";
import { BookedEvent } from "../types/BookEvent";
import { IdProps } from "../types/idProps";


const MyBookedEvents: React.FC<IdProps> = ({ id }) => {
  const { events, loading, error } = useBookedEvents(id);

  if (loading) return <p className="text-center">Loading events...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Purchased Event Tickets</h2>
      {events.length === 0 ? (
        <p className="text-center text-muted">No tickets purchased yet.</p>
      ) : (
        events.map((event: BookedEvent) => (
          <Card key={event.id} className="mb-4 shadow-sm">
            <Card.Header className="d-flex align-items-center gap-3">
              <img src={event.image} alt={event.title} className="rounded" width={80} height={50} />
              <h4 className="mb-0">{event.title}</h4>
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
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon icon={faTicket} className="text-primary" />
                        {event.title}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} className="text-muted" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td>{event.ticketBought.name}</td>
                    <td>${event.ticketBought.price}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-end fw-light">
                <small>
                  <strong>Total Spent:</strong> ${event.ticketBought.price}
                </small>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyBookedEvents;
