import React, { useMemo, useState } from "react";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import countryList from "react-select-country-list";
import "../../assets/styles/Form.css";
import MiniFooter from "../../components/MiniFooter";
import ErrorMessage from "../../components/ErrorMessage";
import Logo from "../../components/Logo";
import { Fan } from "../../types/Fan";
import { User } from "../../types/User";

interface SignUpProps {
  handleUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFanChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFan: React.Dispatch<React.SetStateAction<Fan>>;
  setComponentView?: React.Dispatch<React.SetStateAction<any>>;
  fan: Fan;
  user: User;
  submitting: boolean;
  errorMessage: string;
  errors: Record<string, string>;
  setConfirmPassword: (password: string) => void;
  confirmPassword: string;
}

const SignUp: React.FC<SignUpProps> = ({
  errorMessage,
  errors,
  submitting,
  setFan,
  handleUserChange,
  handleFanChange,
  fan,
  user,
  handleSubmit,
  setConfirmPassword,
  confirmPassword,
}) => {
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [agreeTerms, setAgreeTerms] = useState(false); // Local state for checkbox only
  const options = useMemo(() => countryList().getData(), []);

  const showPassword = () => {
    setPasswordType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(e.target.checked);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("You must agree to the terms and conditions");
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="purple-gradient-bg">
      <Container className="container-custom mt-0 py-3">
        <div className="d-flex justify-content-center mb-3">
          <Logo />
        </div>
        <p className="text-sm text-muted text-center">
          <small>
            Please kindly sign up. We'll use your email and phone number to send
            you important information about your request.
          </small>
        </p>

        <Form className="bg-light border-white p-4" onSubmit={handleFormSubmit}>
          <h6 className="text-center">Sign Up</h6>

          {/* First Name */}
          <Form.Group className="mb-3 " controlId="formName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={fan.firstName}
              onChange={handleFanChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          {/* Surname */}
          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your surname"
              name="surname"
              value={fan.surname}
              onChange={handleFanChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          {/* Date of Birth */}
          <Form.Group className="mb-3" controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={fan.dateOfBirth?.toString() || new Date().toString()}
              onChange={handleFanChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Country of Residence</Form.Label>
            <Form.Select
              value={fan.countryOfResidence}
              onChange={(e) =>
                setFan({ ...fan, countryOfResidence: e.target.value })
              }
              required
              className="form-control-custom"
            >
              <option value="">Select Country Of Residence</option>
              {options.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={fan.gender}
              onChange={(e) => setFan({ ...fan, gender: e.target.value })}
              required
              className="form-control-custom"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </Form.Select>
          </Form.Group>

          {/* Occupation */}
          <Form.Group className="mb-3" controlId="occupation">
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your occupation"
              name="occupation"
              className="form-control-custom"
              value={fan.occupation}
              onChange={handleFanChange}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          {/* WhatsApp Number */}
          <Form.Group className="mb-3" controlId="formContactNumber">
            <Form.Label>
              WhatsApp Number{" "}
              <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
            </Form.Label>
            <Form.Control
              type="tel"
              name="whatsAppNumber"
              placeholder="Enter your WhatsApp number"
              value={user.whatsAppNumber}
              pattern="^\+?[1-9]\d{1,14}$"
              maxLength={15}
              onChange={handleUserChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                name="password"
                value={user.password}
                onChange={handleUserChange}
                required
                className="form-control-custom"
              />
              <InputGroup.Text
                onClick={showPassword}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={passwordType === "text" ? faEye : faEyeSlash}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="form-control-custom"
              />
              <InputGroup.Text
                onClick={showPassword}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={passwordType === "text" ? faEye : faEyeSlash}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          {/* Terms and Conditions Checkbox */}
          <Form.Group className="mb-4 mt-4">
            <Form.Check
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={handleCheckboxChange}
              required
              className="custom-checkbox"
              label={
                <span className="checkbox-label">
                  I agree to the{" "}
                  <a href="/terms" className="terms-link">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="terms-link">
                    Privacy Policy
                  </a>
                </span>
              }
            />
          </Form.Group>

          {/* Error Messages */}
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger mt-3">
              <ul>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="auth-button mt-3"
            disabled={submitting || !agreeTerms}
          >
            {submitting ? (
              <>
                <Spinner as="span" animation="border" size="sm" /> Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>

        <div className="auth-footer mb-5">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </Container>
      <MiniFooter />
    </div>
  );
};

export default SignUp;
