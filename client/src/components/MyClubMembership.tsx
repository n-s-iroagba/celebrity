import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import useFanMemberships from "../hooks/useFanMemberships";
import { ClubMembership } from "../types/ClubMembership";
import { IdProps } from "../types/idProps";



const MyClubMembership:React.FC<IdProps> = ({id}) => {
  const {fanMemberships} = useFanMemberships(id)
  return (
    <>
      <Row className=" d-flex ">
      {fanMemberships.map((membership:ClubMembership, index) => (
        <Col
          key={index}
          xs={12}     // 1 column on small screens
          sm={6}      // 2 columns on medium screens
          lg={4}      // 3 columns on large screens
          className="mb-3"
        >
          <Card style={{width:'8cm'}} >
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title>{membership.celebrityName}</Card.Title>
              <Card.Text>
                Membership Tier: {membership.membership.tier}
              </Card.Text>
              <Card.Text>
                Date Subscribed: {membership.membership.dateOfSubscription}
              </Card.Text>
              {!membership.membership.isHighesTier && (
                <Button variant="primary">Upgrade to Higher Tier</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
         
         </>
  
  );
};

export default MyClubMembership;
