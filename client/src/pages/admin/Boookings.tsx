import React from 'react';import { Table, Button } from 'react-bootstrap';

const Booking = () => {
    const bookings:any[]= []
    const handleMarkAsDone = (id:number) => {
    }
  return (
    <div className="w-[800px] bg-white shadow rounded-lg p-4">
      <h1 className="font-title text-xl text-neutral-950 mb-4">Manage Bookings</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Country</th>
            <th>Age</th>
            <th>Time</th>
            <th>Date</th>
            <th>Booking Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.firstname}</td>
              <td>{booking.surname}</td>
              <td>{booking.country}</td>
              <td>{booking.age}</td>
              <td>{booking.time}</td>
              <td>{booking.date}</td>
              <td>{booking.type}</td>
              <td>
                <Button
                  variant="primary"
                  className="rounded-md"
                  onClick={() => handleMarkAsDone(booking.id)}
                >
                  Mark as Done
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Booking;