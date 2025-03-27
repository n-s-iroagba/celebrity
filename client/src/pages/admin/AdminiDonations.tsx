import React, { useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  endDate: string;
}

export default function AdminDonation() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCampaign = {
      id: editingCampaign?.id || Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      goal: Number(formData.get("goal")),
      raised: editingCampaign?.raised || 0,
      endDate: formData.get("endDate") as string,
    };

    if (editingCampaign) {
      setCampaigns(campaigns.map((c) => (c.id === editingCampaign.id ? newCampaign : c)));
      alert("Campaign updated successfully!");
    } else {
      setCampaigns([...campaigns, newCampaign]);
      alert("Campaign created successfully!");
    }

    setShowModal(false);
    setEditingCampaign(null);
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    alert("Campaign deleted successfully!");
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Donation Campaigns</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Campaign
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Goal</th>
            <th>Raised</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.title}</td>
              <td>${campaign.goal.toLocaleString()}</td>
              <td>${campaign.raised.toLocaleString()}</td>
              <td>{new Date(campaign.endDate).toLocaleString()}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setEditingCampaign(campaign);
                      setShowModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(campaign.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {campaigns.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No campaigns found. Create one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingCampaign ? "Edit" : "Add"} Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={editingCampaign?.title || ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                defaultValue={editingCampaign?.description || ""}
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group controlId="goal" className="mb-3">
              <Form.Label>Goal Amount</Form.Label>
              <Form.Control
                type="number"
                name="goal"
                defaultValue={editingCampaign?.goal || ""}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
            <Form.Group controlId="endDate" className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                defaultValue={editingCampaign?.endDate || ""}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100">
              {editingCampaign ? "Update" : "Create"} Campaign
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
