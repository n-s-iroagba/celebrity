// components/Shoutout.tsx
import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Celebrity from '../../types/Celebrity';
import SearchPic from '../../components/SearchPic';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/useUserContext';
import { Button, Form } from 'react-bootstrap';



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


  const [query, setQuery] = useState('');
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(null);
  const [shoutout, setShoutout] = useState('');


  const navigate = useNavigate();
  const { isSignedIn } = useUserContext();

  const handleSubmit = () => {
    if (isSignedIn) {
      // Navigate to /contact for signed-in users
      navigate('/contact');
    } else {
      const state = {}
      navigate('/signup', { state });
    }
  };
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

  return (
    <div className="d-flex justify-content-center">
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
          <>
            <p className="mt-3 mb-0">
              <b>
                You picked {selectedCelebrity.firstName} {selectedCelebrity.lastName}
              </b>
            </p><Form className="p-2 pb-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <p className="text-sm text-neutral-950 mb-2">Write a heart felt message to {selectedCelebrity.firstName} {selectedCelebrity.lastName}</p>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder=""
                  className="border-black"
                  value={shoutout}
                  onChange={(e) => setShoutout(e.target.value)}
                />
              </Form.Group>
              <Button className='auth-button mt-3' type='submit'>Send Shoutout</Button>
            </Form>
          </>)
        }

      </div>
    </div>
  );
};

export default Shoutout;
