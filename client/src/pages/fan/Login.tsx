import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { InputGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../../components/ErrorMessage";
import AuthOption from "../../components/AuthOption";
import Logo from "../../components/Logo";
import { postWithNoAuth } from "../../utils/apiUtils";
import { LoginData } from "../../types/LoginData";
import { loginUrl } from "../../data/urls";
import JWTService from "../../services/JWTService";
import '../../assets/styles/Auth.css'

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
  
      <div className="form-wrapper">
        <h3 className="text-center">Login</h3>
        <div className="d-flex justify-content-center">
          <Logo />
        </div>

        <Form
          className=" py-2"
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
                className="custom-input bg-transparent form-control "
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
                className="custom-input bg-transparent form-control "
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
          <a
            className="small-font grey-text"
            href="/forgot-password"
            style={{ cursor: "pointer" }}
          >
            Forgot Password
          </a>

          <div className="d-flex justify-content-evenly w-100 pt-3">
            <button
              className="auth-button "
              type={submitting ? "button" : "submit"}
            >
              {submitting ? <Spinner animation="border" size="sm" /> : "Submit"}
            </button>
          </div>
        </Form>
      
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className="mt-5">
        <AuthOption
          route={"book/shout-out"}
          title={"Haven't sent a shoutout yet?"}
          buttonText={"Send Message"}
        />
      </div>
    </div>
  );
};

export default Login;
