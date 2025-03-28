import React from 'react';
import { Carousel, Ratio } from 'react-bootstrap';
import actor from '../assets/images/actor.jpeg';
import athlete from '../assets/images/athlete.jpeg';
import '../assets/styles/Hero.css'
const images = [actor, athlete, actor, athlete];

const Hero = () => {
  return (
    <div className='hero'>
    <Carousel controls={false} indicators={false} interval={5000} fade>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <Ratio aspectRatio="4x3">
          <img src={image} alt={`Slide ${index + 1}`} className="object-cover border" />
          </Ratio>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  );
};

export default Hero;
