import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const memberships = [
  {
    celebrity: "John Doe",
    membership: {
      tier: "Gold",
      isHighestTier: false,
      dateSubscribed: "2024-01-01",
    },
  },
  {
    celebrity: "Jane Smith",
    membership: {
      tier: "Platinum",
      isHighestTier: true,
      dateSubscribed: "2023-12-15",
    },
  },
  {
    celebrity: "Emily Johnson",
    membership: {
      tier: "Silver",
      isHighestTier: false,
      dateSubscribed: "2023-11-20",
    },
  },
];

const MyClubMembership = () => {
  return (
    <Container id="webcrumbs" className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-primary mb-4">My Club Memberships</Card.Title>
              <div>
                {memberships.map((membership, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <Card.Title>{membership.celebrity}</Card.Title>
                      <Card.Text>
                        Membership Tier: {membership.membership.tier}
                      </Card.Text>
                      <Card.Text>
                        Date Subscribed: {membership.membership.dateSubscribed}
                      </Card.Text>
                      {!membership.membership.isHighestTier && (
                        <Button variant="primary">Upgrade to Higher Tier</Button>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyClubMembership;
