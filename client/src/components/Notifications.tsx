import { Modal } from "react-bootstrap";
interface NotificationsProps {
  show: boolean;
  onClose: () => void;
  notifications: { id: number; message: string; timestamp: string }[];
}
const Notifications: React.FC<NotificationsProps> = ({
  show,
  onClose,
  notifications,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary-950 font-title">
          Notifications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }} className="text-neutral-950">
        <ul className="space-y-4">
          {notifications
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((notification) => (
              <li
                key={notification.id}
                className="p-4 bg-neutral-100 rounded-md"
              >
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm text-neutral-600">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-primary-500 text-primary-50 px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default Notifications;