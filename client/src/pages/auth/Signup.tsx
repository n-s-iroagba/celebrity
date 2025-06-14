"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button, Container, Form, InputGroup, Spinner, Alert } from "react-bootstrap"
import { faWhatsapp, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faEye, faEyeSlash, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useLocation } from "react-router-dom"
import "../../../src/assets/styles/Form.css"
import MiniFooter from "../../components/MiniFooter"
import Logo from "../../components/Logo"
import {
  validatePassword,
  initialPasswordValidationResult,
  passwordCriteria,
  type PasswordValidationResult,
} from "../../utils/password-validator"
import { registerFanApi, resendVerificationApi, googleAuthUrl } from "../../services/api"
import { ErrorMessageDisplay } from "@/components/ui/ErrorMessageDisplay" // Adjust path if needed

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation() // To get state passed from navigation
  const { tempSessionId, celebrityName } = (location.state as { tempSessionId?: string; celebrityName?: string }) || {}

  const [fanData, setFanData] = useState({ firstName: "", surname: "" })
  const [userData, setUserData] = useState({ email: "", password: "", whatsAppNumber: "" })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordType, setPasswordType] = useState<"text" | "password">("password")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidationResult>(
    initialPasswordValidationResult,
  )
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [signupSuccess, setSignupSuccess] = useState<string | null>(null)
  const [showResendButton, setShowResendButton] = useState(false)

  useEffect(() => {
    if (userData.password) {
      setPasswordValidation(validatePassword(userData.password))
    } else {
      setPasswordValidation(initialPasswordValidationResult)
    }
  }, [userData.password])

  const handleFanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFanData({ ...fanData, [e.target.name]: e.target.value })
  }
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const showPassword = () => setPasswordType((prev) => (prev === "text" ? "password" : "text"))
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => setAgreeTerms(e.target.checked)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setSignupSuccess(null)
    if (!agreeTerms) {
      setFormError("You must agree to the terms and conditions.")
      return
    }
    if (userData.password !== confirmPassword) {
      setFormError("Passwords do not match.")
      return
    }
    if (userData.password && !passwordValidation.allValid) {
      setFormError("Please ensure your password meets all criteria.")
      return
    }
    setSubmitting(true)
    try {
      const registrationData = { ...userData, ...fanData }
      // Pass tempSessionId if it exists
      await registerFanApi(registrationData, tempSessionId)
      let successMessage = "Registration successful! Please check your email to verify your account."
      if (celebrityName && tempSessionId) {
        successMessage += ` Your chat with ${celebrityName} will be saved once you log in.`
      }
      setSignupSuccess(successMessage)
      setShowResendButton(true)
    } catch (error: any) {
      setFormError(error.message || "Registration failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleResendVerification = async () => {
    // ... (implementation remains the same)
    if (!userData.email) {
      setFormError("Please enter your email address to resend verification.")
      return
    }
    setSubmitting(true)
    setFormError(null)
    try {
      await resendVerificationApi({ email: userData.email })
      setSignupSuccess("Verification email resent! Please check your inbox.")
    } catch (error: any) {
      setFormError(error.message || "Failed to resend verification email.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleSignup = () => {
    // Store tempSessionId in localStorage before redirecting to Google
    // The OAuthCallbackPage will need to pick this up
    if (tempSessionId) {
      localStorage.setItem("oauthTempSessionId", tempSessionId)
      localStorage.setItem("oauthCelebrityName", celebrityName || "")
    }
    window.location.href = googleAuthUrl
  }

  return (
    <div className="purple-gradient-bg">
      <Container className="container-custom mt-0 py-3">
        <div className="d-flex justify-content-center mb-3">
          <Logo />
        </div>
        <p className="text-sm text-muted text-center">
          <small>
            Sign up to connect with {celebrityName ? `${celebrityName} and other stars` : "your favorite stars"}.
            {tempSessionId && " Your current chat will be saved!"}
          </small>
        </p>

        <Form className="bg-light border-white p-4" onSubmit={handleSubmit}>
          <h6 className="text-center">Sign Up</h6>

          {/* Replaced Alert with ErrorMessageDisplay */}
          <ErrorMessageDisplay message={formError} className="mb-3" />

          {signupSuccess && <Alert variant="success">{signupSuccess}</Alert>}

          {/* Form fields remain the same */}
          <Form.Group className="mb-3 " controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={fanData.firstName}
              onChange={handleFanChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your surname"
              name="surname"
              value={fanData.surname}
              onChange={handleFanChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactNumber">
            <Form.Label>
              WhatsApp Number <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
            </Form.Label>
            <Form.Control
              type="tel"
              name="whatsAppNumber"
              placeholder="Enter your WhatsApp number"
              value={userData.whatsAppNumber}
              onChange={handleUserChange}
              pattern="^\+?[1-9]\d{1,14}$"
              maxLength={15}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                name="password"
                value={userData.password || ""}
                onChange={handleUserChange}
                required
                className="form-control-custom"
                aria-describedby="passwordHelpBlock"
              />
              <InputGroup.Text onClick={showPassword} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={passwordType === "text" ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          {userData.password && (
            <div className="password-criteria-container mb-3" id="passwordHelpBlock">
              <p className="password-criteria-heading">Password must contain:</p>
              <ul className="list-unstyled password-criteria-list">
                {passwordCriteria.map((criterion) => (
                  <li
                    key={criterion.key}
                    className={`password-criterion-item ${
                      passwordValidation[criterion.key] ? "is-valid" : "is-invalid"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={passwordValidation[criterion.key] ? faCheckCircle : faTimesCircle}
                      className="criterion-icon"
                    />
                    {criterion.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              <InputGroup.Text onClick={showPassword} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={passwordType === "text" ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
            {/* Replaced Form.Text with ErrorMessageDisplay */}
            <ErrorMessageDisplay
              message={
                userData.password && confirmPassword && userData.password !== confirmPassword
                  ? "Passwords do not match."
                  : null
              }
            />
          </Form.Group>

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

          <Button
            type="submit"
            className="auth-button mt-3 w-100"
            disabled={
              submitting ||
              !agreeTerms ||
              (userData.password && !passwordValidation.allValid) ||
              userData.password !== confirmPassword
            }
          >
            {submitting ? (
              <>
                <Spinner as="span" animation="border" size="sm" /> Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className="text-center my-3">OR</div>
          <Button
            variant="outline-danger"
            className="w-100 mt-2 d-flex align-items-center justify-content-center"
            onClick={handleGoogleSignup}
          >
            <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign up with Google
          </Button>

          {showResendButton && !signupSuccess?.includes("resent") && (
            <Button
              variant="link"
              onClick={handleResendVerification}
              disabled={submitting}
              className="mt-2 d-block mx-auto"
            >
              Resend Verification Email
            </Button>
          )}
        </Form>

        <div className="auth-footer mb-5">
          <p>
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 m-0 align-baseline"
              onClick={() => navigate("/login", { state: { tempSessionId, celebrityName } })}
            >
              Login
            </Button>
          </p>
        </div>
      </Container>
      <MiniFooter />
    </div>
  )
}
export default SignUp
