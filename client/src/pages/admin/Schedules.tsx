import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Schedule {
  id: string;
  title: string;
  date: string;
  location: string;
}

export default function Schedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSchedule: Schedule = {
      id: editingSchedule?.id || Date.now().toString(),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      location: formData.get("location") as string,
    };

    if (editingSchedule) {
      setSchedules((prev) =>
        prev.map((s) => (s.id === editingSchedule.id ? newSchedule : s))
      );
      alert("Schedule updated successfully");
    } else {
      setSchedules((prev) => [...prev, newSchedule]);
      alert("Schedule created successfully");
    }

    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const handleDelete = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    alert("Schedule deleted successfully");
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3 justify-content-between align-items-center">
        <Col xs="auto">
          <h1>Schedules</h1>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => {
              setEditingSchedule(null);
              setIsModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Schedule
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.title}</td>
              <td>{new Date(schedule.date).toLocaleString()}</td>
              <td>{schedule.location}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditingSchedule(schedule);
                    setIsModalOpen(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(schedule.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
          {schedules.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                No schedules found. Create one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSchedule ? "Edit Schedule" : "Add Schedule"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={editingSchedule?.title || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                defaultValue={editingSchedule?.date || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                defaultValue={editingSchedule?.location || ""}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingSchedule ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
