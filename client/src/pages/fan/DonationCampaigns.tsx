import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CampaignCard from '../../components/CampaignCard';
import Hero from '../../components/Hero';
import { CampaignWithCelebrity } from '../../types/CampaignWithCelebrity';


const campaigns:CampaignWithCelebrity[] = [
  {
    celebrity: {
       id:1,
      name: "Leonardo DiCaprio",
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80",
    },
    campaign: {
      title: "Ocean Conservation Initiative",
      description: "Help protect marine ecosystems and fight ocean pollution with Leonardo DiCaprio's environmental foundation.",
      minDonation: 25,
      currentAmount: 750000,
      goalAmount: 1000000,
    },
  },
  
];

const DonationCampaigns = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Hero />
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

export default DonationCampaigns;
