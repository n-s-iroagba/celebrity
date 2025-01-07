// src/pages/Index.tsx
import React from "react";
import { Container, Row, Col, Navbar, Nav,} from "react-bootstrap";
import CelebrityCard from "../../components/CelebrityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ContactedCelebrity from "../../types/ContactedCelebrity";

const celebrities : ContactedCelebrity[] = [

  {
    id: 1,
    name: "Ariana Grande",
    communications: [
      { communicationType: "Personalized Video", status: 'completed' },
    ],
    imageUrl: "/placeholder.svg",
  },
];


const Dashboard: React.FC = () => {
  return (
    <Container fluid className="min-vh-100 d-flex flex-column">
      {/* Sidebar and Header */}
      <Row>
        <Col md={3} lg={2} className="bg-light border-end">
          <Navbar bg="light" expand="md" className="flex-md-column py-3">
            <Navbar.Brand className="mb-3">Fan Dashboard</Navbar.Brand>
            <Nav className="flex-column">
              <Nav.Link href="/">Dashboard</Nav.Link>
              <Nav.Link href="/shoutout">Shout Out</Nav.Link>
              <Nav.Link href="/video-call">Video Call</Nav.Link>
              <Nav.Link href="/phone-call">Phone Call</Nav.Link>
              <Nav.Link href="/personalized-video">Personalized Video</Nav.Link>
              <Nav.Link>Donation Campaigns</Nav.Link>
              <Nav.Link>Club Memberships</Nav.Link>
            </Nav>
          </Navbar>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="p-4">
          {/* Header with Notification */}
          <Row className="justify-content-between align-items-center mb-4">
            <Col>
              <h1 className="display-5">Fan Dashboard</h1>
              <p className="text-muted">Manage your celebrity interactions</p>
            </Col>
            <Col xs="auto">
              <FontAwesomeIcon icon={faBell} size="2x" className="text-secondary" />
            </Col>
          </Row>

          {/* Celebrity Cards */}
          <Row className="g-4">
            {celebrities.map((celebrity) => (
              <Col xs={4} key={celebrity.name}>
                <CelebrityCard
                  name={celebrity.name}
                 communications={celebrity.communications}
                  imageUrl={celebrity.imageUrl}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
