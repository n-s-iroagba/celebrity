import { Modal, Button } from "react-bootstrap";
interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose, message }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary-950 font-title">Success</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-neutral-950">{message}</Modal.Body>
      <Modal.Footer>
        <Button className="bg-primary-500 text-primary-50 px-4 py-2 rounded-md" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;