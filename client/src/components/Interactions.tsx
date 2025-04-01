import React from 'react';
import { ListGroup, Image, Badge } from 'react-bootstrap';

import '../assets/styles/Interactions.css'; 

import { IdProps } from '../types/IdProps';
import { truncateString } from '../utils/truncateString';
import useFanJobs from '../hooks/useFanJobs';
import { Job } from '../types/Job';
import { useNavigate } from 'react-router-dom';

const Interactions: React.FC<IdProps> = ({ id }) => {
  const { jobs } = useFanJobs(id); // Use dynamic id
  const navigate = useNavigate()

  return (
    <div className="bg-danger w-100">
      <h4 className="mb-4">My Interactions</h4>
      <ListGroup className='w-100 bg-success'>
        {jobs.map((job: Job) => (
          <ListGroup.Item onClick={()=>navigate(`/celebrity-dashboard/${id}/${job.celebrityId}`)} key={job.id} className="w-100 bg-warning" >
            <div className="d-flex justify-content-between align-items-center w-100">
              {/* Left Side: Celebrity Image and Details */}
              <div className="d-flex align-items-center flex-grow-1">
                <Image
                  src={job.celebrity.image} // Fix reference
                  alt={job.celebrity.firstName} // Fix reference
                  roundedCircle
                  className="celebrity-image"
                />
                <div className="ms-3">
                  <h6 className="mb-0">{job.celebrity.firstName}</h6>
                  <div className="d-flex align-items-center">
                   
                  </div>
                </div>
              </div>
              {/* Right Side: Message Info */}
              <div className="d-flex align-items-center">
                
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Interactions;
