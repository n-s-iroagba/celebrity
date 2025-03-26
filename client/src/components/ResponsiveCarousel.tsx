import React from "react";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import actor from "../assets/images/actor.jpeg";
import athlete from "../assets/images/athlete.jpeg";
import artist from "../assets/images/entreprenuer.webp";
import singer from "../assets/images/felton.png";
import dancer from "../assets/images/reality.webp";
import gamer from "../assets/images/musician.jpeg";
import "../assets/styles/ResponsiveCarousel.css"; // Import CSS for styling

const images = [actor, athlete, artist, singer, dancer, gamer];

// Function to split images into groups (3 per slide on large screens, 1 per slide on small)
const chunkArray = (arr: string[], size: number) => {
  return arr.reduce<string[][]>((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

const ResponsiveCarousel: React.FC = () => {
  const largeScreenSlides = chunkArray(images, 3);


  return (
    <Container>
      <Carousel interval={5000} controls indicators>
        {largeScreenSlides.map((group, index) => (
          <Carousel.Item key={index}>
            <Row className="d-none d-lg-flex">
              {group.map((image, i) => (
                <Col key={i} lg={4}>
                  <img src={image} alt={`Slide ${index}-${i}`} className="carousel-img" />
                </Col>
              ))}
            </Row>
            <Row className="d-flex d-lg-none">
              <Col>
                <img src={group[0]} alt={`Slide ${index}`} className="carousel-img" />
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ResponsiveCarousel;
