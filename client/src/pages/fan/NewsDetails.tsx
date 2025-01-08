import React from "react";import { Card, Row, Col, Container } from "react-bootstrap";

const NewsDetails: React.FC = () => {
  return (
    <Container>
      <Row className="g-4">
        <Col xs={12} md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://tools-api.webcrumbs.org/image-placeholder/300/200/news/1"
              alt="News Image 1"
            />
            <Card.Body>
              <Card.Title>News Title 1</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                sit amet dictum justo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://tools-api.webcrumbs.org/image-placeholder/300/200/news/2"
              alt="News Image 2"
            />
            <Card.Body>
              <Card.Title>News Title 2</Card.Title>
              <Card.Text>
                Nullam vehicula orci sed lorem pretium, ut interdum massa
                interdum.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://tools-api.webcrumbs.org/image-placeholder/300/200/news/3"
              alt="News Image 3"
            />
            <Card.Body>
              <Card.Title>News Title 3</Card.Title>
              <Card.Text>
                Cras non risus id erat feugiat ullamcorper. Integer sit amet
                lacus non sapien fermentum malesuada.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetails;