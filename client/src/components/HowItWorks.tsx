import { faCommentDots, faVideo, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ActionButton from './ActionButton';


const HowItWorks: React.FC = () => {


  return (
    <section className=" ">
    
          <Row className="gy-5 mb-5  justify-content-center text-center">
            <Col xs={12} >
              <div className=" h-100">
                <FontAwesomeIcon icon={faCommentDots}  size='2x' />
                <h3 className=" mb-2">Text Messages</h3>
                <p className="mb-0">Share your thoughts in heartfelt written messages</p>
              </div>
            </Col>
            <Col xs={12} >
              <div className=" h-100">
                <FontAwesomeIcon icon={faVideo}  size='2x' />
                <h3 className=" mb-2">Video Clips</h3>
                <p className="mb-0">Express yourself through personal video messages</p>
              </div>
            </Col>
            <Col xs={12} >
              <div className=" h-100">
                <FontAwesomeIcon icon={faMicrophone} size='2x'  />
                <h3 className=" mb-2">Voice Notes</h3>
                <p className="mb-0">Send authentic audio messages with your unique voice</p>
              </div>
            </Col>
          </Row>
          <ActionButton/>
        
      </section>
     
 
  );
};

export default HowItWorks;
