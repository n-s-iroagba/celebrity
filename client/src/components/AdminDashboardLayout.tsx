import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  faCalendarAlt, 

  faUsers, 
  faStar,  
  faBars, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Offcanvas, Nav } from "react-bootstrap";

interface NavItem {
  icon: any; // FontAwesomeIcon type
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: faCalendarAlt, label: "Schedules", path: "/admin/schedules" },
  { icon: faUsers, label: "Clients", path: "/admin/clients" },
  { icon: faStar, label: "Celebrities", path: "/admin/celebrities" },

];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <Container fluid>
      {/* Mobile menu button */}
      <Button
        variant="outline-primary"
        className="d-lg-none mt-3"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
      </Button>

      {/* Sidebar */}
      <Offcanvas
        show={sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        className="d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Dashboard</Offcanvas.Title>
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

      {/* Sidebar for larger screens */}
      <Row>
        <Col
          lg={2}
          className="d-none d-lg-block bg-light vh-100 border-end"
        >
          <div className="p-4">
            <h4>Admin Dashboard</h4>
          </div>
          <Nav className="flex-column px-3">
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
        </Col>

        {/* Main content */}
        <Col lg={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
