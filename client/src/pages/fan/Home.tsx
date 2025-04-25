import React, { useRef } from "react";
import { Container, Navbar, Nav, Col, Row } from "react-bootstrap";

import ActionButton from "../../components/ActionButton";
import Footer from "../../components/Footer";
import VideoContent from "../../components/VideoSection";
// import "../../assets/styles/Home.css";
import "../../assets/styles/ActionButton.css";
import Hero from "../../components/Hero";
import ResponsiveCarousel from "../../components/ResponsiveCarousel";
import './Home.css'

const Home = () => {
  const howItWorksRef = useRef<any>(null);

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="gradient-animation"
    >
      <Navbar
        // style={{ backgroundColor: 'black', color: 'white' }}
        expand="lg"
       
        bg="transparent"
        className="py-3 custom-navbar"

      >
        <Container fluid>
          {/* Brand and Toggle Wrapper */}
          <div className="d-flex align-items-center w-100 me-auto">
            {/* Brand */}
            <Navbar.Brand href="#" className="fs-2 font-title me-auto">
              Vercel Celebrity Connect
            </Navbar.Brand>

            {/* Toggle Button */}
            <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />
          </div>

          {/* Collapsible Content */}
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/login" className=" hover-underline ">
                Login
              </Nav.Link>
              <Nav.Link
                style={{ width: "30rem" }}
                onClick={scrollToHowItWorks}
                className=" hover-underline "
              >
                How It Works
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="px-3">
        <Row className="mt-5 animated-side-section gy-3 mb-3">
          <Col className="" xs={12} lg={6}>
            <Hero />
          </Col>

          <Col xs={12} lg={6} className=" text-start">
            <div className="hero-content">
              <h1 className="hero-title mb-4">
                Connect with Your Your Favorite Celebrities
                <span className="highlight d-block mt-2">
                  Like Never Before.
                </span>
              </h1>
              <p className="lead ">
                Share your thoughts, admiration, and creativity directly with
                your favorite stars through text, video, or voice messages at no
                cost.
              </p>
              <ActionButton />
            </div>
          </Col>
        </Row>

        <section id="py-5">
          {/* Add ref to HowItWorks */}
          <div ref={howItWorksRef}>
            <VideoContent />
          </div>

          <ResponsiveCarousel />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
