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
    <Card style={{height:'6cm'}} className="shadow-sm w-100">
      <Card.Header className="d-flex justify-content-between ">
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
        <div className="d-flex flex-column gap-3">
  {communications.map((communication, index) => (
    <div key={index} className="d-flex justify-content-between align-items-center">
      <small className="text-muted me-2">{communication.communicationType}</small>
      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={communication.status === "completed" ? faCheckCircle : faBan}
          className={`me-2 ${
            communication.status === "completed" ? "text-success" : "text-warning"
          }`}
        />
        <small className="text-capitalize">{communication.status}</small>
      </div>
    </div>
  ))}
</div>

        </>
      </Card.Body>
    </Card>
  );
};

export default CelebrityCard;
