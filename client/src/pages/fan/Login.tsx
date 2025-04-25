import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, InputGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../components/ErrorMessage";

import Logo from "../../components/Logo";
import { postWithNoAuth } from "../../utils/apiUtils";
import { LoginData } from "../../types/LoginData";
import { loginUrl } from "../../data/urls";
import JWTService from "../../services/JWTService";
import '../../assets/styles/Form.css'
import MiniFooter from "../../components/MiniFooter";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const showPassword = () => {
    setPasswordType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitting(true);

    try {
      const response = await postWithNoAuth<LoginData, string>(
        loginUrl,
        loginData
      );
      JWTService.saveLoginToken(response);
      navigate("/interactions");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to login, please try again later");
    }
  };

  return (
  
    <div className="purple-gradient-bg d-flex align-items-center">
    <Container className="container-custom mt-0 py-3 bg-light min-h-100">
      <div className="d-flex justify-content-center mb-3">
          <Logo />
        </div>
        

        <Form
          className=" p-4 "
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row>
            <Form.Group as={Col} lg="12" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="form-control-custom "
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group as={Col} lg="12" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="password"
                value={loginData.password}
                onChange={handleChange}
                  className="form-control-custom "
              />
              <InputGroup.Text onClick={showPassword}>
                <FontAwesomeIcon
                  icon={passwordType === "text" ? faEye : faEyeSlash}
                />
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-evenly w-100 pt-3">
            <button
              className="auth-button "
              type={submitting ? "button" : "submit"}
            >
              {submitting ? <Spinner animation="border" size="sm" /> : "Submit"}
            </button>
          </div>
          <div className="auth-footer mb-5">
        <p>
           <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          Do not have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

        
        </Form>
        
      
      {errorMessage && <ErrorMessage message={errorMessage} />}
  </Container>

 
    </div>
  );
};

export default Login;
