import React, { useEffect, useState } from 'react';
import { Container, Navbar, Button, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import image from '../../Gemini_Generated_Image.jpeg'

import '../../assets/styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage: React.FC = () => {
    const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg'>('sm');
    const navigate = useNavigate()

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setScreenSize('sm');
        } else if (window.innerWidth <= 992) {
          setScreenSize('md');
        } else {
          setScreenSize('lg');
        }
      };
  
      // Initial check on component mount
      handleResize();
  
      // Attach event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  const celebrityImages = [
    image,
    image,
    image,
    image,
    image,
    image,
    image,
    image,
  ];

  // Group images into chunks for the carousel
  const chunkArray = (array: string[]) => {
    const chunkSize = screenSize==='sm' ? 1: screenSize==='lg' ? 4 :2
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const imageChunks = chunkArray(celebrityImages);

  

  return (
    <div>
      {/* Brand Bar */}
      <Navbar bg="light" variant="light" className="mb-2  ">
      <Container className="d-flex bg-grey justify-content-between align-items-center">
  <div className="flex-grow-1 text-center">
   
      <h1 className="fw-3 fs-3">Celebrity Connect</h1>
 
  </div>
  <FontAwesomeIcon onClick={()=>navigate('/login')} style={{width:'2cm'}} icon={faUser}/>
</Container>

      </Navbar>

      <Container>
        {/* Image Carousel */}
        <Row className="mb-4">
          <Col>
            <Carousel className='bg-dark' indicators={false} controls={false} interval={3000}>
              {imageChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-center">
                    {chunk.map((img, idx) => (
                      <div className="p-2" style={{ flex: '1 1 25%' }} key={idx}>
                        <img
                          src={img}
                          alt={`Celebrity ${idx + 1}`}
                          className="img-fluid rounded"
                          style={{ maxHeight: '200px', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>

        {/* Write-up Section */}
 
  <div className='text-center fs-6'>
    <h5>Connect With You Favorite Celebrities All Over The World!</h5>
    <p>Send a shoutout, book a phone or video call with your favorite celebrities from anywhere on the globe!</p>
    <p>Its simple and free.</p>
    <p>Click any of the buttons below to get started</p>
  </div>


       <div className="d-flex justify-content-center gap-3">
  <Button onClick={() => navigate('/send/shout-out')}>
    Send Shout Out
  </Button>
  <Button onClick={() => navigate('/book/phone-call')}>
    Book Phone Call
  </Button>
  <Button onClick={() => navigate('/book/video-call')}>
    Book Video Call
  </Button>
</div>



  
      </Container>
    </div>
  );
};

export default HomePage;
