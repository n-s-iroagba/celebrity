import React from 'react';
import { Card, Accordion, ListGroup} from 'react-bootstrap';
import { IdProps } from '../../types/idProps';
import { useBookedTours } from '../../hooks/useBookedTours';



const CelebrityTourPackages: React.FC<IdProps> = ({id}) => {
  const {tours} = useBookedTours(id)
  return (
    <div className="w-[1000px] bg-white shadow rounded-lg p-4">
      <h2 className="font-title text-neutral-950 mb-4">My Celebrity Immersion Tours</h2>
      <div className="flex flex-col gap-4">
        {tours.map((tour, index) => (
          <Card key={index} className="rounded-md">
            <Card.Body>
              <Card.Title className="text-primary-950">{tour.celebrity}</Card.Title>
              <Card.Text>
                <strong>Tourist ID:</strong> {tour.touristId}
              </Card.Text>
              <Card.Text>
                <strong>Cost:</strong> {tour.cost}
              </Card.Text>
              <Card.Text>
                <strong>Arrival Date:</strong> {tour.arrivalDate}
              </Card.Text>
              <Card.Text>
                <strong>Duration:</strong> {tour.duration}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {tour.location}
              </Card.Text>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Perks</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {tour.perks.map((perk, i) => (
                        <ListGroup.Item key={i}>{perk}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CelebrityTourPackages;
