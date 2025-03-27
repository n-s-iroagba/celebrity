import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Cropper from 'react-cropper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import 'cropperjs/dist/cropper.css';
import { IdProps } from '../types/idProps';



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
    <div className="profile-page">
      <div className="profile-picture-container">
        <div className="profile-picture">
          <img
            src={profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          {isEditing && (
            <label htmlFor="upload-image" className="upload-icon">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </label>
          )}
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {profileImage && isEditing && (
        <div className="cropper-container">
          <Cropper
            src={profileImage}
            style={{ height: 400, width: '100%' }}
            aspectRatio={1}
            viewMode={1}
            guides={false}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => setCropper(instance)}
          />
          <Button onClick={cropImage} variant="primary" className="mt-2">
            Crop Image
          </Button>
        </div>
      )}

      <Button onClick={toggleEditMode} variant="secondary" className="mb-3">
        {isEditing ? 'Cancel' : 'Edit Details'}
      </Button>

      <Form className="profile-form">
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editableFields.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={editableFields.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="address1">
              <Form.Label>1st Line Address</Form.Label>
              <Form.Control
                type="text"
                name="address1"
                value={editableFields.address1}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address2">
              <Form.Label>2nd Line Address</Form.Label>
              <Form.Control
                type="text"
                name="address2"
                value={editableFields.address2}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="district">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={editableFields.district}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="profile-input"
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
                className="profile-input"
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
                className="profile-input"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={nonEditableFields.email}
            readOnly
            className="profile-input"
          />
        </Form.Group>
        {isEditing && (
          <Button onClick={saveChanges} variant="primary" className="mt-3">
            Save Changes
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Profile;
