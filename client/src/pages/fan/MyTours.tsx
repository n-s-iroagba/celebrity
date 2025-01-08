import React from 'react';
import { Card, Accordion, ListGroup} from 'react-bootstrap';

interface TourPackage {
  celebrity: string;
  cost: string;
  arrivalDate: string;
  location: string;
  touristId: string;
  duration: string;
  perks: string[];
}

const mockPackages: TourPackage[] = [
  {
    celebrity: "John Legend",
    cost: "$10,000",
    arrivalDate: "2025-02-01",
    location: "Paris, France",
    touristId: "TL123456",
    duration: "7 days",
    perks: [
      "VIP Concert Access",
      "Dinner with Celebrity",
      "Luxury Accommodation",
      "Private Tour Guide",
    ],
  },
  {
    celebrity: "Taylor Swift",
    cost: "$15,000",
    arrivalDate: "2025-03-15",
    location: "New York City, USA",
    touristId: "TL789012",
    duration: "5 days",
    perks: [
      "Exclusive Studio Visit",
      "Autographed Merchandise",
      "First-Class Flights",
      "Meet and Greet Event",
    ],
  },
  {
    celebrity: "Chris Hemsworth",
    cost: "$12,500",
    arrivalDate: "2025-04-10",
    location: "Sydney, Australia",
    touristId: "TL345678",
    duration: "10 days",
    perks: [
      "On-set Movie Experience",
      "Adventure Activities",
      "Helicopter Ride",
      "Exclusive Photoshoot",
    ],
  },
];

const CelebrityTourPackages: React.FC = () => {
  return (
    <div className="w-[1000px] bg-white shadow rounded-lg p-4">
      <h2 className="font-title text-neutral-950 mb-4">My Celebrity Immersion Tours</h2>
      <div className="flex flex-col gap-4">
        {mockPackages.map((pkg, index) => (
          <Card key={index} className="rounded-md">
            <Card.Body>
              <Card.Title className="text-primary-950">{pkg.celebrity}</Card.Title>
              <Card.Text>
                <strong>Tourist ID:</strong> {pkg.touristId}
              </Card.Text>
              <Card.Text>
                <strong>Cost:</strong> {pkg.cost}
              </Card.Text>
              <Card.Text>
                <strong>Arrival Date:</strong> {pkg.arrivalDate}
              </Card.Text>
              <Card.Text>
                <strong>Duration:</strong> {pkg.duration}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {pkg.location}
              </Card.Text>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Perks</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {pkg.perks.map((perk, i) => (
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
