import React from 'react';import { Card, Button, Row, Col } from 'react-bootstrap';

interface Membership {
  tier: string;
  price: string;
  perks: string[];
}

const membershipTiers: Membership[] = [
  {
    tier: 'Bronze',
    price: '$25/month',
    perks: ['Exclusive Updates', 'Access to Fan Community'],
  },
  {
    tier: 'Silver',
    price: '$50/month',
    perks: ['Bronze Perks', 'Quarterly Gift Packs', 'Priority Event Tickets'],
  },
  {
    tier: 'Gold',
    price: '$100/month',
    perks: ['Silver Perks', '1-on-1 Calls', 'Signed Merchandise'],
  },
];

export const ClubMembership: React.FC = () => {
  return (
    <div className="w-100 bg-white shadow rounded-lg p-4">
      <h2 className="font-title text-neutral-950 mb-4">Fan Club Membership Tiers</h2>
      <Row className="g-4">
        {membershipTiers.map((membership, i) => (
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