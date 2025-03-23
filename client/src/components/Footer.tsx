import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { COMPANY_EMAIL } from '../data/data';


const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-light py-4 border-0 border-top border-light mt-5">
      <Container>
        <Row className="text-center text-lg-start">
          {/* Navigation Links */}
          <Col sm={12} md={6} lg={4} className="mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#how-it-works" className="text-light text-decoration-none">How It Works</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li><a href="#faq" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col sm={12} md={6} lg={4} className="mb-3">
            <h5 className="fw-bold">Contact</h5>
            <p className="mb-1"><strong>Email:</strong> {COMPANY_EMAIL}</p>
            <p className="mb-1"><strong>Phone:</strong> +1(213) 787-4896</p>
            <p><strong>Address:</strong> Downtown, Los Angeles, California, USA</p>
          </Col>

          {/* Social Media Links */}
          <Col sm={12} lg={4} className="mb-3">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              <a href="https://facebook.com" className="text-light" target="_blank" rel="noopener noreferrer">
                 <FontAwesomeIcon icon ={faFacebook}/>
              </a>
              <a href="https://twitter.com" className="text-light" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon ={faX}/>
              </a>
              <a href="https://instagram.com" className="text-light" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon ={faInstagram}/>
              </a>
              <a href="https://linkedin.com" className="text-light" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon ={faLinkedin}/>
              </a>
            </div>
          </Col>
        </Row>
        {/* Copyright Section */}
        <Row>
          <Col className="text-center mt-3">
            <p className="mb-0 ">&copy; {new Date().getFullYear()} Vercel Celebrity Connect. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
