import React, { useState } from 'react';
import { ListGroup, Form, Spinner } from 'react-bootstrap';

interface Celebrity {
  stageName: string;
  firstName: string;
  lastName: string;
  picture: string;
  schedules?: string[]; // An array of schedules for the selected celebrity
}

const BookCall: React.FC<{isVideo?:boolean,isFan?:boolean}> = ({isFan,isVideo}) => {
  const celebrities: Celebrity[] = [
    {
      stageName: 'Adele',
      firstName: 'Adele',
      lastName: 'Adkins',
      picture: 'https://example.com/adele.jpg',
      schedules: ['Concert in NY', 'Live Performance in LA'],
    },
    {
      stageName: 'Drake',
      firstName: 'Aubrey',
      lastName: 'Graham',
      picture: 'https://example.com/drake.jpg',
      schedules: ['Concert in Toronto', 'Album Release Event'],
    },
    // Add more celebrities as needed
  ];

  const [query, setQuery] = useState('');
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
    setQuery(''); // Clear the search bar when a celebrity is selected
  };

  const filteredCelebrities = celebrities.filter((celebrity) =>
    celebrity.stageName.toLowerCase().includes(query.toLowerCase()) ||
    celebrity.firstName.toLowerCase().includes(query.toLowerCase()) ||
    celebrity.lastName.toLowerCase().includes(query.toLowerCase())
  );

  const noResultFound = query && filteredCelebrities.length === 0;

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search for a celebrity..."
        value={query}
        onChange={handleSearchChange}
      />
      
      {query && (
        <ListGroup className="mt-3">
          {filteredCelebrities.length > 0 ? (
            filteredCelebrities.map((celebrity) => (
              <ListGroup.Item
                key={celebrity.stageName}
                action
                onClick={() => handleSelectCelebrity(celebrity)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={celebrity.picture}
                    alt={celebrity.stageName}
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                    className="me-3"
                  />
                  <div>
                    <strong>{celebrity.firstName} {celebrity.lastName}</strong>
                    <br />
                    <small>{celebrity.stageName}</small>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : noResultFound ? (
            <ListGroup.Item
              action
              onClick={() => handleSelectCelebrity({ stageName: query, firstName: query, lastName: query, picture: '' })}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center">
                <div>
                  <strong>{query}</strong>
                  <br />
                  <small>{query}</small>
                </div>
              </div>
            </ListGroup.Item>
          ) : (
            <Spinner animation="border" size="sm" />
          )}
        </ListGroup>
      )}

      {selectedCelebrity ? (
        <div className="mt-4">
          <h5>Selected Celebrity: {selectedCelebrity.firstName} {selectedCelebrity.lastName}</h5>
          {selectedCelebrity.schedules ? (
            <ul>
              {selectedCelebrity.schedules.map((schedule, index) => (
                <li key={index}>{schedule}</li>
              ))}
            </ul>
          ) : (
            <p>No schedules available for this celebrity.</p>
          )}
        </div>
      ) : (
        <p>No celebrity has been selected.</p>
      )}
    </div>
  );
};

export default BookCall;
