
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import Celebrity from '../../types/Celebrity';


const PersonalizedVideo: React.FC = () => {
  const celebrities: Celebrity[] = [
    {
      stageName: 'Adele',
      firstName: 'Adele',
      lastName: 'Adkins',
      picture: 'https://example.com/adele.jpg',
    },
    {
      stageName: 'Drake',
      firstName: 'Aubrey',
      lastName: 'Graham',
      picture: 'https://example.com/drake.jpg',
    },
  ];

  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(null);
  const [occasion, setOccasion] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
  };

  const handleSubmit = () => {
    if (selectedCelebrity && occasion.trim() && recipientName.trim() && message.trim()) {
      alert(
        `Request sent to ${selectedCelebrity.firstName} for a personalized video!\n\nDetails:\n- Occasion: ${occasion}\n- Recipient: ${recipientName}\n- Message: ${message}`
      );
      setOccasion('');
      setRecipientName('');
      setMessage('');
    } else {
      alert('Please fill in all fields and select a celebrity.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="mb-3">Request a Personalized Video</h4>
      <SearchBar celebrities={celebrities} onSelect={handleSelectCelebrity} />
      {selectedCelebrity && (
        <div className="mt-3 w-50">
          <p>
            <strong>You selected:</strong> {selectedCelebrity.firstName} {selectedCelebrity.lastName}
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Occasion</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Birthday, Anniversary, Congratulations"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Recipient Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., John, Sarah"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your personalized message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Request Video
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedVideo
