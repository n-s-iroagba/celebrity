import { Card, Container, Row, Col, Accordion } from "react-bootstrap";


interface Souvenir {
  id: number;
  celebrityName: string;
  name: string;
  description: string;
  price: number;
  image: string;
}



const souvenirs: Souvenir[] = [
  {
    id: 1,
    celebrityName: "Leonardo DiCaprio",
    name: "Eco-Friendly Water Bottle",
    description: "Limited edition reusable water bottle featuring Leo's environmental message",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
  },
  {
    id: 2,
    celebrityName: "Emma Watson",
    name: "Feminist Book Collection",
    description: "Curated collection of feminist literature signed by Emma Watson",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
  },
  {
    id: 3,
    celebrityName: "Matt Damon",
    name: "Charity Bracelet",
    description: "Handcrafted bracelet supporting clean water initiatives",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
  },
];



const MySouvenirs = () => {


  // Group souvenirs by celebrity
  const groupedByCelebrity = souvenirs.reduce((acc, souvenir) => {
    if (!acc[souvenir.celebrityName]) {
      acc[souvenir.celebrityName] = [];
    }
    acc[souvenir.celebrityName].push(souvenir);
    return acc;
  }, {} as Record<string, Souvenir[]>);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Fan Souvenirs</h1>
      <p className="text-center text-muted mb-5">
        Here's a list of all the souvenirs fans have bought, grouped by celebrity.
      </p>

      <Accordion defaultActiveKey="0">
        {Object.keys(groupedByCelebrity).map((celebrityName, index) => (
          <Accordion.Item eventKey={String(index)} key={celebrityName}>
            <Accordion.Header>{celebrityName}</Accordion.Header>
            <Accordion.Body>
              <Row xs={1} sm={2} md={3} className="g-4">
                {groupedByCelebrity[celebrityName].map((souvenir) => (
                  <Col key={souvenir.id}>
                    <Card>
                      <Card.Img variant="top" src={souvenir.image} alt={souvenir.name} />
                      <Card.Body>
                        <Card.Title>{souvenir.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          By {souvenir.celebrityName}
                        </Card.Subtitle>
                        <Card.Text>{souvenir.description}</Card.Text>
                        <h4 className="text-primary">${souvenir.price.toFixed(2)}</h4>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        Thanks for your patronage
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default MySouvenirs;
