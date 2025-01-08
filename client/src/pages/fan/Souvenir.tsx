import { Card, Button, Container, Row, Col, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface Souvenir {
  id: number;
  celebrityName: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Changed to an array of images
}

const souvenirs: Souvenir[] = [
  {
    id: 1,
    celebrityName: "Leonardo DiCaprio",
    name: "Eco-Friendly Water Bottle",
    description: "Limited edition reusable water bottle featuring Leo's environmental message",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    ],
  },
  {
    id: 2,
    celebrityName: "Emma Watson",
    name: "Feminist Book Collection",
    description: "Curated collection of feminist literature signed by Emma Watson",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    ],
  },
  {
    id: 3,
    celebrityName: "Matt Damon",
    name: "Charity Bracelet",
    description: "Handcrafted bracelet supporting clean water initiatives",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80",
    ],
  },
];

const Souvenirs = () => {
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

export default Souvenirs;
