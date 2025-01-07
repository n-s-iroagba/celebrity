import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import CampaignCardProps from '../types/CampaignCardProps';

const CampaignCard = ({ celebrity, campaign }: CampaignCardProps) => {
  const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

  return (
    <Card className="shadow-sm mb-4">
      <Card.Img variant="top" src={celebrity.image} alt={celebrity.name} />
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <h5 className="mb-0">{celebrity.name}</h5>
        </div>
        <h6 className="text-primary">{campaign.title}</h6>
        <p className="text-muted">{campaign.description}</p>
        <div className="d-flex justify-content-between mb-2">
          <span>${campaign.currentAmount.toLocaleString()}</span>
          <span>${campaign.goalAmount.toLocaleString()}</span>
        </div>
        <ProgressBar now={progress} variant="success" className="mb-3" />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <p className="text-muted mb-0">Min. Donation: ${campaign.minDonation}</p>
        <Button variant="success">Donate Now</Button>
      </Card.Footer>
    </Card>
  );
};

export default CampaignCard;
