import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavbarComponent: React.FC = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="py-3">
      <Container>
        {/* For Small and Medium Screens */}
        <Button
          variant="outline-dark"
          className="d-lg-none"
        >
          Login
        </Button>
        <Navbar.Brand href="/" className="d-lg-none">
          <img
            src="logo.png"
            alt="Logo"
            style={{ width: '30px', height: '30px' }}
          />
        </Navbar.Brand>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-lg-none">
            <Nav.Link href="#how-it-works" className="text-dark">
              How It Works
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      

        {/* For Large Screens */}
        <Navbar.Collapse
          id="basic-navbar-nav-lg"
          className="d-none d-lg-flex w-100 justify-content-between"
        >
          <Nav>
            <Nav.Link
              href="#how-it-works"
              className="text-dark"
              style={{ fontWeight: 'bold' }}
            >
              How It Works
            </Nav.Link>
          </Nav>
          <Navbar.Brand href="/" className="text-center">
            <img
              src="logo.png"
              alt="Logo"
              style={{ width: '30px', height: '30px' }}
            />
          </Navbar.Brand>
          <Nav>
            <Button
              variant="outline-dark"
              className="text-dark"
              style={{ fontWeight: 'bold' }}
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
