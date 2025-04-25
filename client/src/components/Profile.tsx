import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Cropper from 'react-cropper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'cropperjs/dist/cropper.css';
import { IdProps } from '../types/IdProps';



const Profile: React.FC<IdProps> = ({id}) => {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [cropper, setCropper] = useState<any>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableFields, setEditableFields] = useState({
    name: 'John Doe',
    phoneNumber: '1234567890',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    district: 'Central District',
    localGovernment: 'City Council',
    state: 'California',
  });

  const nonEditableFields = {
    email: 'johndoe@example.com',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableFields({ ...editableFields, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const cropImage = () => {
    if (cropper) {
      setProfileImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    setIsEditing(false);
    alert('Changes saved successfully!');
  };


  return (
    <div className="profile-page p-4" style={{ backgroundColor: 'white', maxWidth: '800px', margin: '0 auto' }}>
      {/* Profile Picture Section */}
      <div className="profile-picture-container text-center mb-4">
        <div className="position-relative d-inline-block">
          <div 
            className="rounded-circle overflow-hidden" 
            style={{ 
              width: '150px', 
              height: '150px', 
              border: '3px solid #8A2BE2',
              boxShadow: '0 4px 6px rgba(75, 0, 130, 0.1)'
            }}
          >
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
          
          {isEditing && (
            <label 
              htmlFor="upload-image" 
              className="position-absolute bottom-0 end-0 bg-violet rounded-circle p-2"
              style={{
                transform: 'translate(25%, 25%)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesomeIcon 
                icon={faCamera} 
                className="text-white"
                style={{ fontSize: '1.2rem' }}
              />
            </label>
          )}
        </div>
      </div>

      {/* Image Cropper Modal */}
      {profileImage && isEditing && (
        <div className="cropper-modal mb-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="mb-3">
            <h5 className="text-indigo mb-2">Crop Profile Picture</h5>
            <Cropper
              src={profileImage}
              style={{ height: '300px', width: '100%' }}
              aspectRatio={1}
              viewMode={1}
              guides={false}
              background={false}
              responsive={true}
              autoCropArea={1}
              onInitialized={(instance) => setCropper(instance)}
            />
          </div>
          <Button 
            onClick={cropImage} 
            variant="indigo" 
            className="me-2"
            style={{
              backgroundColor: '#4B0082',
              borderColor: '#4B0082',
            }}
          >
            Save Cropped Image
          </Button>
          <Button 
            variant="outline-violet" 
            onClick={() => setProfileImage(undefined)}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Edit/Save Controls */}
      <div className="text-center mb-4">
        <Button 
          onClick={toggleEditMode} 
          variant={isEditing ? 'outline-violet' : 'indigo'}
          className="px-4 py-2"
          style={{
            backgroundColor: isEditing ? 'transparent' : '#4B0082',
            borderColor: '#4B0082',
            color: isEditing ? '#4B0082' : 'white',
          }}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Form */}
      <Form className="profile-form p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <Row className="g-3 mb-4">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label className="text-indigo fw-bold">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editableFields.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="profile-input"
                style={{
                  borderColor: '#8A2BE2',
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label className="text-indigo fw-bold">Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={editableFields.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="profile-input"
                style={{
                  borderColor: '#8A2BE2',
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Address Section */}
        <div className="mb-4">
          <h5 className="text-indigo mb-3 border-bottom pb-2">Address Information</h5>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="address1">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  value={editableFields.address1}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="address2">
                <Form.Label>Apt/Suite</Form.Label>
                <Form.Control
                  type="text"
                  name="address2"
                  value={editableFields.address2}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="district">
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={editableFields.district}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="localGovernment">
                <Form.Label>Local Government</Form.Label>
                <Form.Control
                  type="text"
                  name="localGovernment"
                  value={editableFields.localGovernment}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={editableFields.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Email Section */}
        <Form.Group controlId="email" className="mb-4">
          <Form.Label className="text-indigo fw-bold">Email Address</Form.Label>
          <Form.Control
            type="email"
            value={nonEditableFields.email}
            readOnly
            className="bg-light"
          />
        </Form.Group>

        {isEditing && (
          <div className="text-center">
            <Button 
              onClick={saveChanges} 
              variant="indigo"
              className="px-5 py-2"
              style={{
                backgroundColor: '#4B0082',
                borderColor: '#4B0082',
              }}
            >
              Save Changes
            </Button>
          </div>
        )}
      </Form>

      <style>{`
        .text-indigo { color: #4B0082; }
        .bg-violet { background-color: #8A2BE2; }
        .btn-indigo {
          background-color: #4B0082;
          color: white;
        }
        .btn-indigo:hover {
          background-color: #3a0063;
        }
        .btn-outline-violet {
          border-color: #8A2BE2;
          color: #8A2BE2;
        }
        .btn-outline-violet:hover {
          background-color: #8A2BE2;
          color: white;
        }
        .profile-input:disabled {
          background-color: #f8f9fa;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Profile;