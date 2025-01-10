import React from "react";import { Container, Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentInformation = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Card className="w-75 shadow-lg rounded-lg p-4">
        <Card.Body>
          <Card.Title className="font-title text-2xl text-neutral-950 mb-4">
            Payment Information
          </Card.Title>
          <Card.Text className="text-neutral-950 mb-4">
            Due to the bureaucracy involved with card payments, we kindly
            request you to contact the admin for the account details where you
            can securely make your payment. Please use one of the following
            channels:
          </Card.Text>
          <ListGroup variant="flush" className="space-y-4">
            <ListGroup.Item className="d-flex align-items-center text-primary-950 gap-3 border-0">
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              <span>Contact us on WhatsApp</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center text-primary-950 gap-3 border-0">
              <i className="fa-brands fa-telegram text-2xl"></i>
              <span>Message us on Telegram</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentInformation;