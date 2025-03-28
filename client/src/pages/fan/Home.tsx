import React, { useRef } from "react";
import { Container, Navbar, Nav, Col, Row, Button } from "react-bootstrap";

import ActionButtons from "../../components/ActionButtons";
import Footer from "../../components/Footer";
import VideoContent from "../../components/VideoSection";
import '../../assets/styles/Home.css';
import Hero from "../../components/Hero";
import ResponsiveCarousel from "../../components/ResponsiveCarousel";

import Typewriter from 'typewriter-effect';


const Home = () => {
  const howItWorksRef = useRef<any>(null);

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <Navbar
        style={{ backgroundColor: 'black', color: 'white' }}
        expand="lg"
        variant="dark"
        bg="transparent"
        className="py-3 shadow-lg"
      >
        <Container fluid>
          {/* Brand and Toggle Wrapper */}
          <div className="d-flex align-items-center w-100">
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
              <Nav.Link href="/login" className="text-white hover-underline mx-3">
                Login
              </Nav.Link>
              <Nav.Link style={{width:'10rem'}} onClick={scrollToHowItWorks} className="text-white hover-underline ">
                How It Works
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5">
        <header className=" mb-5">
          <h1 className="display-inline">
            <Typewriter
           
  onInit={(typewriter) => {
    typewriter.changeDelay(10)
    .changeDeleteSpeed(10)
    .typeString('<span className="">Send A Personal Message To <span style="color:violet;">Your Favorite Celebrity!</span></span>')
    .pauseFor(2000)
    .deleteChars(24)
    .typeString(' <span style="color:purple">An Actor!</span>')
      .pauseFor(2000)
      .deleteChars(9)
      .typeString('<span style="color:violet;">A Musician!</span>')
      .pauseFor(2000)
      .deleteChars(11)
   
     
      .typeString('<span style="color:purple;">An Athelete!</span>')
      .pauseFor(2000)
      .deleteChars(12)
    
 
      .typeString('<span style="color:violet;">A TV Or Reality Star!</span>')
      .pauseFor(2000)
      .deleteChars(21)
      
      .typeString('<span style="color:purple;">Your Favorite Celebrity!</span>')
      .start();
  }}
/>
            </h1>
          <p className="text-grey">
            Connect with actors, musicians, athletes, and more for video calls, shout-outs, and personalized experiences.
          </p>
          
    
        </header>
       <Row >
        <Col xs={12} lg={6}>
        <Hero/>
        </Col>
        <Col xs={12} lg={6}>
          
                 <div className="fs-6">
                   <h1>Connect With Your Favorite Celebrities All Over The World!</h1>
                
                   <p>
                     Send a shoutout, favorite celebrities from anywhere on the globe!
                   </p>
                   
                   <p>It's simple and free.</p>
                   
                   <p>And a response is guaranteed.</p>
                   
                   <p>Click any of the buttons below to get started</p>
                   
                 </div>
                 <br/>
                 <ActionButtons />
               </Col>

       </Row>
      
        <section id="py-5">
        

          {/* Add ref to HowItWorks */}
          <div ref={howItWorksRef}>
          <VideoContent />
          </div>
          <ActionButtons />
          <ResponsiveCarousel/>
        </section>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;