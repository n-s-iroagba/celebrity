import React from "react";
import { Card, Table, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCalendar, faDollarSign } from "@fortawesome/free-solid-svg-icons";

interface Donation {
  campaignId: number;
  campaignTitle: string;
  date: string;
  amount: number;
}

interface Celebrity {
  id: number;
  name: string;
  image: string;
  campaigns: Donation[];
}

interface Fan {
  id: number;
  name: string;
  email: string;
  donations: Celebrity[];
}

// Sample data - in a real app this would come from your backend
const fans: Fan[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    donations: [
      {
        id: 1,
        name: "Leonardo DiCaprio",
        image:
          "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80",
        campaigns: [
          {
            campaignId: 1,
            campaignTitle: "Ocean Conservation Initiative",
            date: "2024-03-15",
            amount: 500,
          },
          {
            campaignId: 2,
            campaignTitle: "Climate Change Awareness",
            date: "2024-02-20",
            amount: 250,
          },
        ],
      },
      {
        id: 2,
        name: "Emma Watson",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
        campaigns: [
          {
            campaignId: 3,
            campaignTitle: "Girls Education Worldwide",
            date: "2024-03-01",
            amount: 1000,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    donations: [
      {
        id: 1,
        name: "Leonardo DiCaprio",
        image:
          "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80",
        campaigns: [
          {
            campaignId: 1,
            campaignTitle: "Ocean Conservation Initiative",
            date: "2024-03-10",
            amount: 1500,
          },
        ],
      },
    ],
  },
];

const DonationHistory = () => {
  return (
    <div className="container py-4">
      <h2 className="text-center my-4">Donation History</h2>
      {fans.map((fan) => (
        <Card key={fan.id} className="mb-4 shadow-sm">
          <Card.Header>
            <h4>{fan.name}</h4>
            <small>{fan.email}</small>
          </Card.Header>
          <Card.Body>
            {fan.donations.map((celebrity) => (
              <div key={celebrity.id} className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src={celebrity.image}
                    roundedCircle
                    width={50}
                    height={50}
                    alt={celebrity.name}
                    className="me-3"
                  />
                  <h5 className="mb-0">{celebrity.name}</h5>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Campaign</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {celebrity.campaigns.map((donation) => (
                      <tr key={donation.campaignId}>
                        <td>
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="me-2 text-primary"
                          />
                          {donation.campaignTitle}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="me-2 text-muted"
                          />
                          {new Date(donation.date).toLocaleDateString()}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faDollarSign}
                            className="me-2 text-success"
                          />
                          ${donation.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-end text-muted">
                  Total Donated to {celebrity.name}: $
                  {celebrity.campaigns.reduce(
                    (sum, donation) => sum + donation.amount,
                    0
                  )}
                </div>
              </div>
            ))}
            <div className="text-end fw-bold">
              Total Lifetime Donations: $
              {fan.donations.reduce(
                (sum, celebrity) =>
                  sum +
                  celebrity.campaigns.reduce(
                    (celebSum, donation) => celebSum + donation.amount,
                    0
                  ),
                0
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default DonationHistory;
