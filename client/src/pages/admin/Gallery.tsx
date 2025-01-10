// components/Gallery.tsx
import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { AdminDashboardCelebrity } from '../../types/AdminDashboardCelebrity';

interface CelebrityGalleryProps {
  celebrity: AdminDashboardCelebrity;
  onUpdate: (updatedCelebrity: AdminDashboardCelebrity) => void;
}

const Gallery: React.FC<CelebrityGalleryProps> = ({ celebrity, onUpdate }) => {
  const [newImage, setNewImage] = useState('');

  const handleAddImage = () => {
    if (newImage) {
      const updatedCelebrity = { ...celebrity, images: [...celebrity.images, newImage] };
      onUpdate(updatedCelebrity);
      setNewImage('');
    }
  };

  const handleRemoveImage = (image: string) => {
    const updatedCelebrity = { ...celebrity, images: celebrity.images.filter(img => img !== image) };
    onUpdate(updatedCelebrity);
  };

  return (
    <div>
      <h3>Gallery</h3>
      <Form>
        <Form.Group controlId="image">
          <Form.Label>Add New Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddImage}>
          Add Image
        </Button>
      </Form>
      <ListGroup>
        {celebrity.images.map((image:any, index:number) => (
          <ListGroup.Item key={index}>
            <img src={image} alt="celebrity" width="100" height="100" />
            <Button variant="danger" onClick={() => handleRemoveImage(image)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Gallery;
