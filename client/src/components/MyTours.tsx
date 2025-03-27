import React from "react";
import { Card, Spinner, Alert, ListGroup } from "react-bootstrap";
import { useBookedTours } from "../hooks/useBookedTours";
import { IdProps } from "../types/idProps";



const MyTours: React.FC<IdProps> = ({ id }) => {
  const { tours, loading, error } = useBookedTours(id);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading your booked tours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center my-5">
        <strong>Error:</strong> {error}
      </Alert>
    );
  }

  if (tours.length === 0) {
    return (
      <Alert variant="warning" className="text-center my-5">
        You have no booked tours yet.
      </Alert>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">My Booked Tours</h2>
      <div className="row">
        {tours.map((tour, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="text-primary">{tour.celebrity} Experience</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{tour.location}</Card.Subtitle>
                <Card.Text>
                  <strong>Cost:</strong> {tour.cost} <br />
                  <strong>Arrival Date:</strong> {new Date(tour.arrivalDate).toLocaleDateString()} <br />
                  <strong>Duration:</strong> {tour.duration} <br />
                  <strong>Tourist ID:</strong> {tour.touristId}
                </Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item className="fw-bold">Perks Included:</ListGroup.Item>
                  {tour.perks.map((perk, i) => (
                    <ListGroup.Item key={i} className="text-muted">
                      {perk}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTours;
