import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container, Spinner } from 'react-bootstrap';
import ErrorMessage from '../../components/ErrorMessage';
import '../../assets/styles/Form.css';
import Logo from '../../components/Logo';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      alert('Password reset link sent to your email!');
    }, 1500);
  };

  return (
    <>
    <div className="purple-gradient-bg d-flex align-items-center">
    <Container className="container-custom mt-0 py-3 bg-light">
      <div className="d-flex justify-content-center mb-3">
          <Logo/>
        </div>
          <h6 className="text-center">Forgot Password</h6>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationEmail">
              <Form.Label className="mb-0">Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-custom"
              />
              <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>
            <p className="grey small-font mt-3">
              Enter your registered email address, and we'll send you a password reset link.
            </p>
            <Form.Group>
              <div className="d-flex justify-content-evenly w-100 pb-3">
                <button
                  className="auth-button  py-2 small-font"
                  type={submitting ? 'button' : 'submit'}
                >
                  {submitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
                </button>
              </div>
            </Form.Group>
          </Form>
          {errorMessage &&  <ErrorMessage message={errorMessage} />}
        </Container>
      </div>

    </>
  );
};

export default ForgotPassword;
