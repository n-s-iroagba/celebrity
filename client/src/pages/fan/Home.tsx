import React, { useRef } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import CircularImageSlider from "../../components/CircularImageSlider";
import ActionButtons from "../../components/ActionButtons";
import Footer from "../../components/Footer";
import HowItWorks from "../../components/HowItWorks";
import VideoContent from "../../components/VideoContent";
import  '../../assets/styles/Home.css'

 const Home = () => {
  const howItWorksRef = useRef<any>(null);

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <Navbar expand="lg" variant="dark" bg="dark" className="px-4 py-3 shadow-lg">
        <Navbar.Brand href="#" className="fs-2 font-title">
          Vercel Celebrity Connect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/login" className="text-white hover-underline">
              Login
            </Nav.Link>
            <Nav.Link onClick={scrollToHowItWorks} className="text-white hover-underline">
              How It Works
            </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="py-5">
        <header className="text-center mb-5">
          <h6 className="display-4"><b>
            Book Personalized Experiences with Your Favorite Celebrities
            {/* Send Personalized Shoutout Messages to your Favorite Celebrities. */}
            
            </b></h6>
          <p className="text-grey">
            Connect with actors, musicians, athletes, and more for video calls, shout-outs, and personalized experiences.
          Connect with actors, musicians, athletes, tv hosts and more all over the world.
          </p>
          <CircularImageSlider />
        </header>

        <section id="py-5">
          <VideoContent />
     
          {/* Add ref to HowItWorks */}
          <div ref={howItWorksRef}>
            <HowItWorks />
          </div>
          <ActionButtons />
        </section>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
