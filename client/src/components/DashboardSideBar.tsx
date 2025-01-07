// src/components/DashboardSidebar.tsx
import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCommentDots,
  faPhoneAlt,
  faVideo,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const navigationItems = [
  { title: "Dashboard", icon: faHome, url: "/" },
  { title: "Shout Out", icon: faCommentDots, url: "/shoutout" },
  { title: "Phone Call", icon: faPhoneAlt, url: "/phone-call" },
  { title: "Video Call", icon: faVideo, url: "/video-call" },
  { title: "Personalized Video", icon: faUser, url: "/personalized-video" },
];

const DashboardSidebar: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Sidebar toggle button for small screens */}
      <button
        className="btn btn-primary d-lg-none"
        onClick={handleShow}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Communication</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navigationItems.map((item) => (
              <Nav.Link href={item.url} key={item.title} className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                <span>{item.title}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DashboardSidebar;
