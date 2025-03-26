import React from 'react';
import { Carousel } from 'react-bootstrap';
import actor from '../assets/images/actor.jpeg';
import athlete from '../assets/images/athlete.jpeg';

const images = [actor, athlete, actor, athlete];

const Hero = () => {
  return (
    <Carousel controls={false} indicators={false} interval={5000}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img src={image} alt={`Slide ${index + 1}`} className="d-block w-75" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
