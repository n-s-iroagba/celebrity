import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const VideoContent: React.FC = () => {
  return (
    <Container fluid className="py-4">
      <Row className="d-flex flex-column-reverse flex-lg-row align-items-center">
         {/* Video Column */}
         <Col lg={6} className="text-center p-3">
          <video
            controls
            loop
            style={{ width: '100%', borderRadius: '8px' }}
          >
            <source src="/videos/magicvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
        {/* Text Column */}
        <Col lg={6} className="  p-3">
          <div className='fs-6'>
              <h5>Connect With You Favorite Celebrities All Over The World!</h5>
              <p>Send a shoutout, book a phone or video call with your favorite celebrities from anywhere on the globe!</p>
              <p>Its simple and free.</p>
              <p>Click any of the buttons below to get started</p>
            </div>
        </Col>

       
      </Row>
    </Container>
  );
};

export default VideoContent;
