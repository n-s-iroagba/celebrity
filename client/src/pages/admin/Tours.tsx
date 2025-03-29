import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Tour {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  maxParticipants: number;
}

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTour: Tour = {
      id: editingTour?.id || Date.now().toString(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      duration: formData.get("duration") as string,
      price: Number(formData.get("price")),
      maxParticipants: Number(formData.get("maxParticipants")),
    };

    if (editingTour) {
      setTours(tours.map((t) => (t.id === editingTour.id ? newTour : t)));
      alert("Tour package updated successfully");
    } else {
      setTours([...tours, newTour]);
      alert("Tour package created successfully");
    }

    setIsModalOpen(false);
    setEditingTour(null);
  };

  const handleDelete = (id: string) => {
    setTours(tours.filter((t) => t.id !== id));
    alert("Tour package deleted successfully");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Tour Packages</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Tour Package
        </Button>
      </div>

      <Table bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Max Participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.name}</td>
              <td>{tour.duration}</td>
              <td>${tour.price.toLocaleString()}</td>
              <td>{tour.maxParticipants}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setEditingTour(tour);
                      setIsModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(tour.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {tours.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No tour packages found. Create one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTour ? "Edit" : "Add"} Tour Package</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                defaultValue={editingTour?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                defaultValue={editingTour?.description || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                name="duration"
                type="text"
                defaultValue={editingTour?.duration || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={editingTour?.price || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max Participants</Form.Label>
              <Form.Control
                name="maxParticipants"
                type="number"
                min="1"
                defaultValue={editingTour?.maxParticipants || ""}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingTour ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
