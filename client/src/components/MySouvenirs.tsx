import { Card, Row, Col, Accordion } from "react-bootstrap";
import { IdProps } from "../types/idProps";
import { Souvenir } from "../types/Souvenir";
import { useSouvenirs } from "../hooks/useSouvenirs";




//SOUVENIRS SHOULD RECEIVE LOCATION WHEN BOOKING
const MySouvenirs:React.FC<IdProps> = ({id}) => {

const {souvenirs} = useSouvenirs()
  // Group souvenirs by celebrity
  const groupedByCelebrity = souvenirs.reduce((acc, souvenir) => {
    if (!acc[souvenir.celebrityName]) {
      acc[souvenir.celebrityName] = [];
    }
    acc[souvenir.celebrityName].push(souvenir);
    return acc;
  }, {} as Record<string, Souvenir[]>);

  return (
    <div > 
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
                      <Card.Img variant="top" style={{height:'9cm', width:'9cm'}} src={souvenir.images[0]} alt={souvenir.name} />
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
    </div>
  );
};

export default MySouvenirs;
