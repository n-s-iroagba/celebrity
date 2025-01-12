
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import Celebrity from '../../types/Celebrity';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/useUserContext';
import SearchPic from '../../components/SearchPic';
import MiniFooter from '../../components/MiniFooter';


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
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { isSignedIn } = useUserContext();

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
    setQuery('');
  };

  const createCelebrity = (name: string) => {
    const newCelebrity: Celebrity = {
      stageName: name,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1] || '',
      picture: '',
    };
    celebrities.push(newCelebrity);
    setSelectedCelebrity(newCelebrity);
    setQuery('');

  }

  const filteredCelebrities = celebrities.filter((celebrity) =>
    celebrity.stageName.toLowerCase().includes(query.toLowerCase()) ||
    celebrity.firstName.toLowerCase().includes(query.toLowerCase()) ||
    celebrity.lastName.toLowerCase().includes(query.toLowerCase())
  );


  const handleSubmit = () => {
    if (isSignedIn) {
      // Navigate to /contact for signed-in users
      navigate('/contact');
    } else {
      const state = {}
      navigate('/signup', { state });
    }
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
    <>
    <div className="d-flex justify-content-center my-5">
      <div className="md-w-50 px-5 ">
        <h6 className="mt-3 text-center">
          Connect With Your Favorite Celebrities All Over The World!
        </h6>
        <SearchPic />
        <div className="d-flex justify-content-center text-center py-3">
          <small >kindly search the celebrity you wish to send a shout out to.</small>
        </div>
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          items={filteredCelebrities}
          onSelectItem={handleSelectCelebrity}
          createEntity={createCelebrity}
          renderItem={(celebrity) => (
            <div className="d-flex align-items-center">
              <img
                src={celebrity.picture}
                alt={celebrity.stageName}
                style={{ width: 40, height: 40, borderRadius: '50%' }}
                className="me-3"
              />
              <div>
                <strong>
                  {celebrity.firstName} {celebrity.lastName}
                </strong>
                <br />
                <small>{celebrity.stageName}</small>
              </div>
            </div>
          )}
        />
        {selectedCelebrity && (
          <div className="">
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
                rows={6}
                placeholder="Write your personalized message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button className='auth-button' onClick={handleSubmit}>
              Request Video
            </Button>
          </div>
        )}
      </div>
      </div>
      <MiniFooter/>
      </>
      );
};

      export default PersonalizedVideo
