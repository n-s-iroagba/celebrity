import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HowItWorks from './HowItWorks';

const VideoContent: React.FC = () => {
  return (
    <Container fluid className="py-4">
      <Row className="d-flex flex-column-reverse flex-lg-row align-items-center">
        {/* Video Column */}
        
        {/* Text Column */}
        <Col lg={6} className="p-3">
         <HowItWorks/>
        </Col>
        <Col lg={6} className="text-center p-3">
          <video
            loop
            autoPlay
            muted
            playsInline
            style={{ width: '100%', borderRadius: '8px' }}
          >
            <source src="/videos/magicvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoContent;
