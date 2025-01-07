// src/components/CelebrityCard.tsx
import React from "react";
import { Card, Dropdown, Image, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBan } from "@fortawesome/free-solid-svg-icons";
import { CelebrityCardProps } from "../types/CelebrityCardProps";



const navigationItems = [
  "Club Membership",
  "Donation Campaign",
  "Souvenir Purchase",
  "Celebrity Shadowing Tour",
  "Events",
  "Biography",
  "Trending News",
];

const CelebrityCard: React.FC<CelebrityCardProps> = ({
  name,
  communications,
  imageUrl,
}) => {
  return (
    <Card className="shadow-sm w-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">{name}</Card.Title>
        <Dropdown>
          <Dropdown.Toggle
            as={Button}
            variant="link"
            size="sm"
            className="text-decoration-none"
          >
            More
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            {navigationItems.map((item) => (
              <Dropdown.Item key={item}>{item}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body className="d-flex align-items-center">
        <Image
          src={imageUrl}
          roundedCircle
          alt={name}
          className="me-3"
          width={48}
          height={48}
        />
        <>
            { communications.map((communication, inde)=>(
                <div className="d-flex justify-content-evenly w-100">
                <p className="text-muted small mb-0">{communication.communicationType}</p>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={communication.status === "completed" ? faCheckCircle : faBan}
                    className={`me-2 ${
                      communication.status === "completed" ? "text-success" : "text-warning"
                    }`}
                  />
                  <span className="small text-capitalize">{communication.status}</span>
                </div>
                </div>

            ))
        
}
        </>
      </Card.Body>
    </Card>
  );
};

export default CelebrityCard;
