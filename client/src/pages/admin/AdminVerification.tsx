import React from "react";import { Form, Button,  Card, Row, Col } from "react-bootstrap";

const AdminVerification = () => {
  return (
    <Card className="w-100" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <Card.Title className="font-title  fs-4 mb-3">
          Enter Verification Code
        </Card.Title>
        <Card.Text className="text-muted mb-4">
          Please enter the verification code sent to your email or social media account.
        </Card.Text>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="verificationCode" className=" fw-bold">
              Verification Code
            </Form.Label>
            <Form.Control
              type="text"
              id="verificationCode"
              placeholder="Enter code"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-4">
            Submit
          </Button>
        </Form>
        <div className="border-top mt-4 pt-3">
          <p className="text-center text-muted mb-3">
            Or verify using social media:
          </p>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button
                variant="primary"
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "40px", height: "40px", backgroundColor: "#1877F2" }}
              >
                <i className="fa-brands fa-facebook"></i>
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="danger"
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="fa-brands fa-google"></i>
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="info"
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "40px", height: "40px", backgroundColor: "#1DA1F2" }}
              >
                <i className="fa-brands fa-twitter"></i>
              </Button>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdminVerification;