import React, { useState } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import '../assets/styles/CircularImageSlider.css'
import image1 from "../assets/images/actor.jpeg";
import image2 from "../assets/images/musician.jpeg";
import image3 from "../assets/images/athlete.jpeg";
import image4 from "../assets/images/entreprenuer.webp";
import image5 from "../assets/images/reality.webp";
import { useNavigate } from "react-router-dom";

const images = [
  { src: image1, alt: "Image 1", linkLabel: "ACTORS",talent:'actor' },
  { src: image2, alt: "Image 2", linkLabel: "MUSICIANS",talent:'musician' },
  { src: image3, alt: "Image 3", linkLabel: "ATHLETES",talent:'athlete' },
  { src: image4, alt: "Image 4", linkLabel: "ENTREPRENUERS",talent:'entreprenuer' },
  { src: image5, alt: "Image 5", linkLabel: "REALITY TV" ,talent:'reality-tv'},
];

const CircularImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const isSmallScreen = window.innerWidth <= 768;
  const isMediumScreen = window.innerWidth > 768 && window.innerWidth <= 992;
  const imagesPerSlide = isSmallScreen ? 2 : isMediumScreen ? 4 : 6;

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

  const handleDropdownToggle = (index: number) => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  const displayedImages = images.slice(
    currentIndex,
    currentIndex + imagesPerSlide
  );

  return (
    <Container className="text-center text-light">
      <Row className="justify-content-center">
        {displayedImages.map((image, index) => (
          <Col key={index} xs={6} md={3} lg={2} className="mb-3">
            <div    onClick={() => handleDropdownToggle(index)}>
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
            <p
              style={{
                textDecoration: "none",
                display: "block",
                marginTop: "0.5rem",
              }}
            >
              {image.linkLabel}
            </p>
            </div>
            {dropdownVisibleIndex === index && (
              <Dropdown show>
                <Dropdown.Menu className="text-light">
                  <Dropdown.Item className="dropdown-select" onClick={() => navigate(`book/${image.talent}/shout-out`)}>
                    Make a Shout Out
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-select" onClick={() => navigate(`book/${image.talent}/video-call`)}>
                   Book Video Call
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-select" onClick={() => navigate(`book/${image.talent}/phone-call`)}>
                    Book Phone Call
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-select" onClick={() => navigate(`book/${image.talent}/personalised-video`)}>
                  Request Personalized Video
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Col>
        ))}
      </Row>
      {(isSmallScreen || isMediumScreen) && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          {currentIndex > 0 && (
            <Button variant="light" className="me-2" onClick={handlePrev}>
              <FontAwesomeIcon icon={faArrowLeft} /> Prev
            </Button>
          )}
          {currentIndex + imagesPerSlide < images.length && (
            <Button variant="outline-light" onClick={handleNext}>
              <FontAwesomeIcon icon={faArrowRight} /> Next
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};

export default CircularImageSlider;
