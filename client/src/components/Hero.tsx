import React from 'react';
import { Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className="position-relative bg-primary text-white py-5 py-md-6">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="mb-4 display-3 font-weight-bold">
            Support Causes with Your Favorite Celebrities
          </h1>
          <p className="mb-4 text-lg text-muted">
            Join celebrities in making a difference. Every donation counts towards creating positive change in the world.
          </p>
          <Button variant="success" size="lg">
            Explore Campaigns
          </Button>
        </div>
      </div>
      <div
        className="position-absolute bottom-0 left-0 right-0"
        style={{
          height: '4rem',
          background: 'linear-gradient(to top, #000, transparent)',
        }}
      ></div>
    </div>
  );
};

export default Hero;
