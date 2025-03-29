import { Card, Button, Container, Row, Col, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {Souvenir} from '../types/Souvenir'




const CelebritySouvenirs:React.FC<{souvenirs:Souvenir[],name:string}> = ({souvenirs,name}) => {
  const handlePurchase = (souvenir: Souvenir) => {
    alert(`${souvenir.name} has been added to your cart!`);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Celebrity Souvenirs</h1>
      <p className="text-center text-muted mb-5">
        Support your favorite celebrities' causes while getting unique memorabilia.
      </p>
      <Row xs={1} sm={2} md={3} className="g-4">
        {souvenirs.map((souvenir) => (
          <Col key={souvenir.id}>
            <Card>
              <Carousel >
                {souvenir.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Card.Img variant="top" src={image} alt={souvenir.name} />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body>
                <Card.Title>{souvenir.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By {souvenir.celebrityName}
                </Card.Subtitle>
                <Card.Text>{souvenir.description}</Card.Text>
                <h4 className="text-primary">${souvenir.price.toFixed(2)}</h4>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="primary" onClick={() => handlePurchase(souvenir)}>
                  <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CelebritySouvenirs;
