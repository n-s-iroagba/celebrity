import React, { useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClient: Client = {
      id: editingClient?.id || Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
    };

    if (editingClient) {
      setClients(clients.map((c) => (c.id === editingClient.id ? newClient : c)));
      alert("Client updated successfully");
    } else {
      setClients([...clients, newClient]);
      alert("Client created successfully");
    }

    setShowModal(false);
    setEditingClient(null);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
    alert("Client deleted successfully");
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setShowModal(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Clients</h1>
        <Button variant="primary" onClick={handleAddClient}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Client
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.company}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" onClick={() => handleEdit(client)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(client.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No clients found. Add one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingClient ? "Edit" : "Add"} Client</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={editingClient?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={editingClient?.email || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                defaultValue={editingClient?.phone || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                defaultValue={editingClient?.company || ""}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingClient ? "Update" : "Create"} Client
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
