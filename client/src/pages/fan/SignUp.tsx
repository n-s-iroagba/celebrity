import React from 'react';import { Form, Button, Card } from 'react-bootstrap';

const SignUp = () => {
  return (
    <Card className='w-100' style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title className='text-neutral-950 mb-4 fs-4'>Sign Up</Card.Title>
        <Form>
          <Form.Group className='mb-3' controlId='formName'>
            <Form.Label className='text-sm text-neutral-950 mb-2'>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your full name'
              className='rounded-md'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label className='text-sm text-neutral-950 mb-2'>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              className='rounded-md'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formWhatsAppTelegram'>
            <Form.Label className='text-sm text-neutral-950 mb-2'>WhatsApp / Telegram Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your WhatsApp or Telegram'
              className='rounded-md'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label className='text-sm text-neutral-950 mb-2'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Create a password'
              className='rounded-md'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formConfirmPassword'>
            <Form.Label className='text-sm text-neutral-950 mb-2'>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm your password'
              className='rounded-md'
            />
          </Form.Group>
          <Button
            type='submit'
            className='w-100 bg-primary rounded-md py-2 text-primary-50'
          >
            Sign Up
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUp;