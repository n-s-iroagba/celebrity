import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

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
    <>
      <Row className=" d-flex ">
      {memberships.map((membership, index) => (
        <Col
          key={index}
          xs={12}     // 1 column on small screens
          sm={6}      // 2 columns on medium screens
          lg={4}      // 3 columns on large screens
          className="mb-3"
        >
          <Card style={{width:'8cm'}} >
            <Card.Body className="d-flex flex-column align-items-center">
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
        </Col>
      ))}
    </Row>
         
         </>
  
  );
};

export default MyClubMembership;
