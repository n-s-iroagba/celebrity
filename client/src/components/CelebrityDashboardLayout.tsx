// components/Celebrity.tsx
import React, { useState } from 'react';
import { Offcanvas, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { AdminDashboardCelebrity } from '../types/AdminDashboardCelebrity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faBriefcase, faHeart, faImage, faNewspaper, faShoppingBag, faTicketAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';


function CelebrityDashboardLayout ({  children,
}: {
  children: React.ReactNode;}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [celebrity, setCelebrity] = useState<AdminDashboardCelebrity | null>(null);
  const location = useLocation();

   const navItems = [
    { icon: faUserPlus, label: "Club Memberships", path: "/celebrity/memberships" },
    { icon: faBoxOpen, label: "Tour Packages", path: "/admin/tours" },
    { icon: faShoppingBag, label: "Souvenirs", path: "/celebrity/souvenirs" },
      { icon: faHeart, label: "Donations", path: "/admin/donations" },
    { icon: faImage, label: "Gallery", path: "/celebrity/gallery" },
    { icon: faTicketAlt, label: "Events", path: "/celebrity/events" },
    { icon: faBriefcase, label: "Jobs", path: "/celebrity/jobs" },
    { icon: faNewspaper, label: "News", path: "/celebrity/news" },
    
   ]


  return (
    <Container>
      {/* Offcanvas Navigation */}
      <Button variant="primary" onClick={handleShow}>
        Open Sidebar
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Celebrity Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navItems.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
    
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Row>
       {/* Main content */}
       <Col lg={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CelebrityDashboardLayout;
