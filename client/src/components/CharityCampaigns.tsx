import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { CharityCampaignProps } from "../types/CharityCampaign";

// Define the CharityCampaign type


const CharityCampaign: React.FC<CharityCampaignProps> = ({ campaigns,name }) => {
  return (
    <Container className="py-4">
      <Row className="g-4">
        {campaigns.map((campaign) => (
          <Col key={campaign.id} md={6} lg={4}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Img
                variant="top"
                src={campaign.imageUrl}
                alt={campaign.title}
                className="rounded-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-primary">{campaign.title}</Card.Title>
                <Card.Text className="flex-grow-1">{campaign.description}</Card.Text>
                <div className="mb-2">
                  <strong>Raised:</strong> ${campaign.raisedAmount.toLocaleString()} / ${campaign.goalAmount.toLocaleString()}
                </div>
                <Button variant="success" className="mt-auto w-100">Donate Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CharityCampaign;
