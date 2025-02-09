import { Row, Col } from "react-bootstrap"
import CelebrityCard from "../../components/CelebrityCard"
import ContactedCelebrity from "../../types/ContactedCelebrity";
import FanDashboardLayout from "../../components/FanDashboardLayout";


const Interactions    = ()=>{
    const celebrities : ContactedCelebrity[] = [

        {
          id: 1,
          name: "Ariana Grande",
          communications: [
            { communicationType: "Personalized Video", status: 'completed' },
          ],
          imageUrl: "/placeholder.svg",
        },

        {
            id: 1,
            name: "Ariana Grande",
            communications: [
              { communicationType: "Personalized Video", status: 'completed' },
            ],
            imageUrl: "/placeholder.svg",
          },

        {
            id: 1,
            name: "Ariana Grande",
            communications: [
              { communicationType: "Personalized Video", status: 'completed' },
            ],
            imageUrl: "/placeholder.svg",
          },
      ];
    return (
<FanDashboardLayout>
<Row   className="d-flex g-2">
{celebrities.map((celebrity) => (
  <Col className="" xs={12}  md={6} lg={6} key={celebrity.name}>
    <CelebrityCard
      name={celebrity.name}
      communications={celebrity.communications}
      imageUrl={celebrity.imageUrl}
    />
  </Col>
))}
</Row>
</FanDashboardLayout>
    )
}
export default Interactions