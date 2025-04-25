import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HowItWorks from './HowItWorks';

const VideoSection: React.FC = () => {
  return (
    <section className="py-4">
      <Row className="d-flex flex-column-reverse flex-lg-row gy-3 ">
        {/* Video Column */}
        
        {/* Text Column */}
        <Col lg={6} className="">
         <HowItWorks/>
        </Col>
        <Col lg={6} className="text-center ">
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
    </section>
  );
};

export default VideoSection;
