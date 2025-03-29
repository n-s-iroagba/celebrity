import React from 'react';
import { Card, Accordion, ListGroup} from 'react-bootstrap';
import { Tour } from '../types/Tour';





const CelebrityTours: React.FC<{tours:Tour[],name:string}> = ({tours,name}) => {

  return (
    <div className="w-[1000px] bg-white shadow rounded-lg p-4">
      <h2 className="font-title text-neutral-950 mb-4">{name} Tour</h2>
      <div className="flex flex-col gap-4">
        {tours.map((tour, index) => (
          <Card key={index} className="rounded-md">
            <Card.Body>
             
              <Card.Text>
                <strong>Tourist ID:</strong> {tour.description}
              </Card.Text>
              <Card.Text>
                <strong>Cost:</strong> {tour.price}
              </Card.Text>
             
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Perks</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {tour.features.map((perk, i) => (
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

export default CelebrityTours;
