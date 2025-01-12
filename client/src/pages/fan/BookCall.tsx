import React, { useState } from 'react';

import '../../assets/styles/BookCall.css';
import Celebrity from '../../types/Celebrity';
import SearchBar from '../../components/SearchBar';
import Schedule from '../../types/Schedule';
import SearchPic from '../../components/SearchPic';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useUserContext } from '../../context/useUserContext';
import { useNavigate } from 'react-router-dom';


const BookCall: React.FC<{ isVideo?: boolean; isFan?: boolean }> = ({ isFan, isVideo }) => {
  const celebrities: Celebrity[] = [
    {
      stageName: 'Adele',
      firstName: 'Adele',
      lastName: 'Adkins',
      picture: ''
    },
    {
      stageName: 'Drake',
      firstName: 'Aubrey',
      lastName: 'Graham',
      picture: '',
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { isSignedIn } = useUserContext();
  

  const handleBookClick = () => {
    if (isSignedIn) {
      // Navigate to /contact for signed-in users
      navigate('/contact');
    } else {
      const state ={}
      navigate('/signup', { state });
    }
  };

  const handleOpenCalendar = () => setShowCalendar(true);
  const handleCloseCalendar = () => setShowCalendar(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close modal after date selection
  };

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
    setQuery('');
  };

  const createCelebrity = (name:string) => {
    const newCelebrity: Celebrity = {
      stageName: name,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1]||'',
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
        <small >kindly search the celebrity you wish to connect with via {isVideo?'Video Call': 'Phone Call'}.</small>
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
            </p>
            <div className="line my-2"></div>
            <p className="mt-0 mb-0">
              <b> {isVideo?'Video Call': 'Phone Call'} Schedules For {selectedCelebrity.firstName} {selectedCelebrity.lastName}</b>
            </p>
            <div className="line my-2"></div>

            {schedules.length > 0 ? (
              <ul className="list-unstyled">
                {schedules.map((schedule, index) => (
                  <li
                    key={index}
                    className="border-0 d-flex flex-wrap gap-4 justify-content-center py-4 align-items-center border-bottom  border-black"
                  >
                    <p className="mb-0">
                      <small>Date: {schedule.date}</small>
                    </p>
                    <p className="mb-0">
                      <small>Time: {schedule.time}</small>
                    </p>
                    <p className="mb-0">
                      <small>Duration: 10 minutes</small>
                    </p>
                    <p  className="mb-0 text-center">
                   {isVideo&&<small>**The medium of this video call shall be sent to your mail</small>}
                   </p>

                    <button className='book-button' onClick={handleBookClick}>Book</button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
              <p>No schedules available for this celebrity.</p>
              <Button variant="primary" onClick={handleOpenCalendar}>
        Create Schedule
      </Button>

      <Modal show={showCalendar} onHide={handleCloseCalendar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCalendar}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookCall;
