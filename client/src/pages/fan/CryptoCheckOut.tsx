import React from 'react';
import { Button, Form,  Row, Col, Card } from 'react-bootstrap';

const CryptoCheckout = () => {
  return (
    <Card className="shadow-lg rounded-lg p-4">
      <Card.Body>
        <h1 className="font-title text-2xl fw-bold text-black mb-4">Crypto Payment Checkout</h1>
        <p className="text-black mb-4">
          Please select your preferred cryptocurrency and provide your wallet details before proceeding. After submitting, payment instructions will be displayed. For further assistance, feel free to reach us via WhatsApp or Telegram.
        </p>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="text-black fw-medium">Select Cryptocurrency</Form.Label>
            <Row xs={1} sm={3} className="g-2">
              <Col>
                <Button variant="outline-secondary" className="w-100">Bitcoin</Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" className="w-100">Ethereum</Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" className="w-100">USDT</Button>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="text-black fw-medium">Your Wallet Address</Form.Label>
            <Form.Control type="text" placeholder="Enter your wallet address" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="text-black fw-medium">Network</Form.Label>
            <Form.Select>
              <option value="" disabled>
                Select network
              </option>
              <option value="eth">Ethereum</option>
              <option value="bnb">Binance Smart Chain</option>
              <option value="sol">Solana</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" className="w-100 py-2">Proceed</Button>
        </Form>
        <div className="mt-5">
          <h2 className="fw-bold text-black text-lg font-title">Payment Instructions</h2>
          <p className="text-black mt-2 mb-4">
            Send your payment to the following wallet address:
          </p>
          <Card bg="light" className="p-3 rounded-lg">
            <Card.Text className="mb-2 text-primary">
              Wallet Address: <span className="font-title">your_wallet_address_here</span>
            </Card.Text>
            <Card.Text>
              Ensure you send the exact amount in your selected cryptocurrency to avoid any issues.
            </Card.Text>
          </Card>
          <div className="d-flex align-items-center justify-content-start gap-4 mt-4">
            <div className="d-flex align-items-center gap-2 text-primary">
              <i className="fa-brands fa-whatsapp"></i> <span>Contact us on WhatsApp</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-primary">
              <i className="fa-brands fa-telegram"></i> <span>Message us on Telegram</span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CryptoCheckout;