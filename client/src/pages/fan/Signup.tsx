import React, { useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import countryList from "react-select-country-list";
import Select from "react-select";
import AuthOption from "../../components/AuthOption";
import ErrorMessage from "../../components/ErrorMessage";
import Logo from "../../components/Logo";
import MiniFooter from "../../components/MiniFooter";
import { Fan } from "../../types/Fan";
import { User } from "../../types/User";

interface SignUpProps {
  handleUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFanChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFan: React.Dispatch<React.SetStateAction<Fan>>;
  setComponentView:React.Dispatch<React.SetStateAction<any>>;
  fan: Fan;
  user: User;
  submitting: boolean;
  errorMessage: string;
  errors: Record<string, string>;
  setConfirmPassword:any
  confirmPassword:string
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
  setComponentView,
  setConfirmPassword,
  confirmPassword
}) => {
  const [passwordType, setPasswordType] = useState<"text" | "password">("password");

  const [startDate, setStartDate] = useState<Date | null>(fan.dateOfBirth || new Date());
  const options = useMemo(() => countryList().getData(), []);

  const showPassword = () => {
    setPasswordType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="auth-wrapper">
      <AuthOption route="login" title="Already have an account?" buttonText="Login" />
      <p className="text-sm text-muted text-center">
        <small>
          Please kindly sign up. We'll use your email and phone number to send you important information about your
          request.
        </small>
      </p>

      <Form className="form-wrapper p-2 pb-5">
        <div className="d-flex justify-content-center my-3">
          <Logo />
        </div>
        <h6 className="text-center">Sign Up</h6>

        {/* First Name */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={fan.firstName}
            onChange={handleFanChange}
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
          />
        </Form.Group>

        {/* Date of Birth */}
        <Form.Group className="mb-3" controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              setStartDate(date);
              setFan({ ...fan, dateOfBirth: date });
            }}
          />
        </Form.Group>

        {/* Country of Residence */}
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country of Residence</Form.Label>
          <Select
            options={options}
            value={options.find((opt) => opt.label === fan.countryOfResidence)}
            onChange={(e) => setFan({ ...fan, countryOfResidence: e?.label || "" })}
          />
        </Form.Group>

        {/* Gender */}
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            value={fan.gender}
            onChange={(e) => setFan({ ...fan, gender: e.target.value })}
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
          />
        </Form.Group>

        {/* WhatsApp Number */}
        <Form.Group className="mb-3" controlId="formContactNumber">
          <Form.Label>
            WhatsApp Number <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
          </Form.Label>
          <Form.Control
            type="tel"
            name="whatsAppNumber"
            placeholder="Enter your WhatsApp number"
            value={user.whatsAppNumber}
            pattern="^\+?[1-9]\d{1,14}$"
            maxLength={15}
            onChange={handleUserChange}
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
            />
            <InputGroup.Text onClick={showPassword}>
              <FontAwesomeIcon icon={passwordType === "text" ? faEye : faEyeSlash} />
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
            />
            <InputGroup.Text onClick={showPassword}>
              <FontAwesomeIcon icon={passwordType === "text" ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Form>

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
      <Button className="auth-button mt-3" onClick={handleSubmit}
      // disabled={submitting}
      >
        {submitting ? <Spinner as="span" animation="border" size="sm" /> : "Send SignUp"}
      </Button>

      <MiniFooter />
    </div>
  );
};

export default SignUp;
