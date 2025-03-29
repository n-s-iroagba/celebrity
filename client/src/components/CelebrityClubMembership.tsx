import React from 'react';import { Card, Button, Row, Col } from 'react-bootstrap';
import { ClubMembership } from '../types/ClubMembership';





export const CelebrityClubMembership: React.FC<{packages:ClubMembership[],name:string}> = ({packages,name}) => {
  return (
    <div className="w-100 bg-white shadow rounded-lg p-4">
      <h2 className="font-title text-neutral-950 mb-4">Fan Club Membership Tiers</h2>
      <Row className="g-4 d-flex w-100 bg-danger">
        {packages.map((membership, i) => (
          <Col key={i} xs={12} md={4}>
            <Card className="bg-light border-0 rounded-md shadow-md text-neutral-950 h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="font-title text-primary-950 mb-2">{membership.tier}</Card.Title>
                <Card.Text className="fw-semibold mb-4">{membership.price}</Card.Text>
                <ul className="list-disc ps-3 mb-4">
                  {membership.perks.map((perk, index) => (
                    <li key={index} className="small">{perk}</li>
                  ))}
                </ul>
                <Button variant="primary" className="rounded-md align-self-start">
                  Subscribe
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};