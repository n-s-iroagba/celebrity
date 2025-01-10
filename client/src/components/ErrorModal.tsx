import { Modal, Button } from "react-bootstrap";interface ErrorModalProps {
    show: boolean;
    onClose: () => void;
    message: string;
  }
  const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose, message }) => {
    return (
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary-950 font-title">Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-neutral-950">{message}</Modal.Body>
        <Modal.Footer>
          <Button className="bg-red-500 text-primary-50 px-4 py-2 rounded-md" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default ErrorModal;