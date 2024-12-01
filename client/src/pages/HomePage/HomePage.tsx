import React, { useEffect, useState } from 'react';
import { Container, Navbar, Button, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import image from '../../Gemini_Generated_Image.jpeg'

import './HomePage.css';
import { useNavigate } from 'react-router-dom';

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
        <Container className='d-flex justify-content-center bg-grey'>
          <Navbar.Brand className='text-center '><h1 className='fw-3 fs-3'>Celebrity Feedback Survey</h1></Navbar.Brand>
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
        
  <Row className="mb-4">
  <Col className='text-center fs-6'>
    <h2>Take the Celebrity Survey!</h2>
    <p>Have your say about the performance and popularity of your favorite celebrities!</p>
    <p>Your feedback is invaluable in helping them connect better with their fans and grow in their journey.</p>
    <p>Who knows? Your insights might even catch their attention, and you could hear directly from them as a token of their appreciation!</p>
  </Col>
</Row>

        {/* Start Survey Button */}
        <Row className="text-center">
          <Col>
            <Button onClick={()=>navigate('/survey')} variant="primary" size="lg">
              Start Survey
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
