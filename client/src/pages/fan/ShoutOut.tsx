// components/Shoutout.tsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import Celebrity from '../../types/Celebrity';


const Shoutout: React.FC = () => {
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
  const [message, setMessage] = useState('');

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
  };

  const handleSubmit = () => {
    if (selectedCelebrity && message.trim()) {
      alert(`Shoutout to ${selectedCelebrity.firstName}: "${message}"`);
      setMessage(''); // Clear the message after submission
    } else {
      alert('Please select a celebrity and enter a message.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="mb-3">Send a Shoutout!</h4>
      <SearchBar celebrities={celebrities} onSelect={handleSelectCelebrity} />
      {selectedCelebrity && (
        <div className="mt-3 w-50">
          <p>
            <strong>You selected:</strong> {selectedCelebrity.firstName} {selectedCelebrity.lastName}
          </p>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your shoutout message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-3"
          />
          <Button variant="primary" onClick={handleSubmit}>
            Send Shoutout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Shoutout;
