import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useCampaigns } from '../hooks/useCampaign';
import { IdProps } from '../types/idProps';
import CampaignCard from './CampaignCard';


const MyDonationCampaigns:React.FC<IdProps> = ({id}) => {
  const {campaigns} = useCampaigns(id)
  return (
    <div className="min-vh-100 bg-light">
      
      <Container className="py-5">
        <h3  className="mb-4 display-4 font-weight-bold">
          Featured Campaigns
        </h3>
        <Row xs={1} md={2} lg={3} className="g-4">
          {campaigns.map((campaign, index) => (
            <Col key={index}>
              <CampaignCard {...campaign} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyDonationCampaigns;
