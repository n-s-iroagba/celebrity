import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from '../assets/images/actor.jpeg'
import image2 from '../assets/images/musician.jpeg'
import image3 from '../assets/images/athlete.jpeg'
import image4 from '../assets/images/entreprenuer.webp'
import image5 from '../assets/images/reality.webp'

const images = [
  { src: image1, alt: "Image 1", link: "#", linkLabel: "ACTORS" },
  { src: image2, alt: "Image 2", link: "#", linkLabel: "MUSICIANS" },
  { src: image3, alt: "Image 3", link: "#", linkLabel: "ATHLETES" },
  { src: image4, alt: "Image 4", link: "#", linkLabel: "ENTREPRENUER" },
  { src: image5, alt: "Image 5", link: "#", linkLabel: "REALITY TV" },
];

const CircularImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isSmallScreen = window.innerWidth <= 768; // Detect small screens
  const isMediumScreen = window.innerWidth > 768 && window.innerWidth <= 992; // Detect medium screens
  const imagesPerSlide = isSmallScreen ? 2 : isMediumScreen ? 4 : 6; // 3 for small, 4 for medium, 6 otherwise

  const handleNext = () => {
    if (currentIndex + imagesPerSlide < images.length) {
      setCurrentIndex(currentIndex + imagesPerSlide);
    }
  };

  const handlePrev = () => {
    if (currentIndex - imagesPerSlide >= 0) {
      setCurrentIndex(currentIndex - imagesPerSlide);
    }
  };

  const displayedImages = images.slice(
    currentIndex,
    currentIndex + imagesPerSlide
  );

  return (
    <Container className="text-center">
      <Row className="justify-content-center">
        {displayedImages.map((image, index) => (
          <Col key={index} xs={6} md={3} lg={2} className="mb-3">
            <div
              style={{
                width: "11rem",
                height: "11rem",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid grey",
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <a
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "black",
                display: "block",
                marginTop: "0.5rem",
              }}
            >
              {image.linkLabel}
            </a>
          </Col>
        ))}
      </Row>
      {(isSmallScreen || isMediumScreen) && (
  <div className="d-flex justify-content-center align-items-center mt-3">
    {currentIndex > 0 && (
      <Button variant="dark" className="me-2" onClick={handlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} /> Prev
      </Button>
    )}
    {currentIndex === 0 ? (
      <Button variant="outline-dark" onClick={handleNext}>
        <FontAwesomeIcon icon={faArrowRight} /> Next Category
      </Button>
    ) : (
      currentIndex + imagesPerSlide < images.length && (
        <Button variant="outline-dark" onClick={handleNext}>
          <FontAwesomeIcon icon={faArrowRight} /> Next
        </Button>
      )
    )}
  </div>
)}

    </Container>
  );
  
}
export default CircularImageSlider;

