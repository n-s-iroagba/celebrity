import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-4 border-0 border-top border-dark mt-5">
      <Container>
        <Row className="text-center text-lg-start">
          {/* Navigation Links */}
          <Col sm={12} md={6} lg={4} className="mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#how-it-works" className="text-dark text-decoration-none">How It Works</a></li>
              <li><a href="#contact" className="text-dark text-decoration-none">Contact Us</a></li>
              <li><a href="#about" className="text-dark text-decoration-none">About</a></li>
              <li><a href="#faq" className="text-dark text-decoration-none">FAQ</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col sm={12} md={6} lg={4} className="mb-3">
            <h5 className="fw-bold">Contact</h5>
            <p className="mb-1"><strong>Email:</strong> support@example.com</p>
            <p className="mb-1"><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Address:</strong> 123 Main Street, Anytown, USA</p>
          </Col>

          {/* Social Media Links */}
          <Col sm={12} lg={4} className="mb-3">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              <a href="https://facebook.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a href="https://twitter.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a href="https://instagram.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a href="https://linkedin.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
              </a>
            </div>
          </Col>
        </Row>
        {/* Copyright Section */}
        <Row>
          <Col className="text-center mt-3">
            <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
