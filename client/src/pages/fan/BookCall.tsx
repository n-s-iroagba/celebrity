import React, { useState } from 'react';
import SearchPic from '../../assets/images/search.png';
import '../../assets/styles/BookCall.css';
import Celebrity from '../../types/Celebrity';
import SearchBar from '../../components/SearchBar';
import Schedule from '../../types/Schedule';


const BookCall: React.FC<{ isVideo?: boolean; isFan?: boolean }> = ({ isFan, isVideo }) => {
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

  const schedules: Schedule[] = [
    {
      date: '25 Jan 2025',
      time: '10:00 PM',
    },
    {
      date: '25 Jan 2025',
      time: '10:00 PM',
    },
  ];

  const [query, setQuery] = useState('');
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(null);

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
    setQuery('');
  };

  const filteredCelebrities = celebrities.filter((celebrity) =>
    celebrity.stageName.toLowerCase().includes(query.toLowerCase()) ||
    celebrity.firstName.toLowerCase().includes(query.toLowerCase()) ||
    celebrity.lastName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50">
        <h6 className="mt-3 text-center">
          Connect With Your Favorite Celebrities All Over The World!
        </h6>
        <SearchPic />
        <small>Search the celebrity you wish to connect with.</small>
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          items={filteredCelebrities}
          onSelectItem={handleSelectCelebrity}
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
          noResultMessage={`No results found for "${query}"`}
        />

        {selectedCelebrity && (
          <>
            <p className="mt-3 mb-0">
              <b>
                You picked {selectedCelebrity.firstName} {selectedCelebrity.lastName}
              </b>
            </p>
            <div className="lin mt-2"></div>
            <p className="mt-0 mb-0">
              <b>Video Call Schedules</b>
            </p>
            <div className="lin mb-3"></div>

            {schedules.length > 0 ? (
              <ul className="list-unstyled">
                {schedules.map((schedule, index) => (
                  <li
                    key={index}
                    className="border-0 d-flex justify-content-between align-items-center border-bottom pb-4 border-black"
                  >
                    <p className="mb-2">
                      <small>Date: {schedule.date}</small>
                    </p>
                    <p>
                      <small>Time: {schedule.time}</small>
                    </p>
                    <p>
                      <small>Duration: 10 minutes</small>
                    </p>
                    <small>Medium: Zoom</small>
                    <button>Book</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No schedules available for this celebrity.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookCall;
