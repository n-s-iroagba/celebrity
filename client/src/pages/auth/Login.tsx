"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Container, Form, InputGroup, Spinner, Button, Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import Logo from "../../components/Logo"
import { loginApi, googleAuthUrl } from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"
import "../../assets/styles/Form.css"
import { ErrorMessageDisplay } from "@/components/ui/ErrorMessageDisplay" // Adjust path if needed

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login: contextLogin } = useAuth()
  const { tempSessionId, celebrityName } = (location.state as { tempSessionId?: string; celebrityName?: string }) || {}

  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [passwordType, setPasswordType] = useState<"text" | "password">("password")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const showPassword = () => setPasswordType((prev) => (prev === "text" ? "password" : "text"))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)
    setSubmitting(true)
    try {
      // Pass tempSessionId if it exists
      const response = await loginApi(loginData, tempSessionId)
      contextLogin(response.token, response.user)
      const from =
        location.state?.from?.pathname ||
        (response.user.isProfileComplete || !response.user.isEmailVerified ? "/dashboard" : "/profile/complete")
      // If a temp chat was active, maybe prioritize dashboard/chat page
      navigate(tempSessionId ? "/dashboard" : from, { replace: true })
      if (tempSessionId) localStorage.removeItem("tempChatSessions") // Clear temp sessions after successful login
    } catch (error: any) {
      setFormError(error.message || "Failed to login. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleLogin = () => {
    // Store tempSessionId in localStorage before redirecting to Google
    if (tempSessionId) {
      localStorage.setItem("oauthTempSessionId", tempSessionId)
      localStorage.setItem("oauthCelebrityName", celebrityName || "")
    }
    window.location.href = googleAuthUrl
  }

  return (
    <div className="purple-gradient-bg d-flex align-items-center">
      <Container className="container-custom mt-0 py-3 bg-light min-h-100">
        <div className="d-flex justify-content-center mb-3">
          <Logo />
        </div>
        <p className="text-sm text-muted text-center">
          <small>
            Login to continue your chat with {celebrityName || "your favorite stars"}.
            {tempSessionId && " Your current chat will be saved!"}
          </small>
        </p>

        <Form className="p-4" noValidate onSubmit={handleSubmit}>
          <h6 className="text-center mb-4">Login</h6>

          {/* Replaced Alert with ErrorMessageDisplay */}
          <ErrorMessageDisplay message={formError} className="mb-3" />

          <Row>
            <Form.Group as={Col} lg="12" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="form-control-custom"
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} lg="12" controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="form-control-custom"
              />
              <InputGroup.Text onClick={showPassword} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={passwordType === "text" ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-center w-100 pt-4">
            <Button className="auth-button w-100" type="submit" disabled={submitting}>
              {submitting ? <Spinner as="span" animation="border" size="sm" /> : "Login"}
            </Button>
          </div>

          <div className="text-center my-3">OR</div>
          <Button
            variant="outline-danger"
            className="w-100 mt-2 d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign in with Google
          </Button>

          <div className="auth-footer mb-5 mt-3">
            <p>
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <p>
              Do not have an account?{" "}
              <Button
                variant="link"
                className="p-0 m-0 align-baseline"
                onClick={() => navigate("/signup", { state: { tempSessionId, celebrityName } })}
              >
                Sign up
              </Button>
            </p>
          </div>
        </Form>
      </Container>
    </div>
  )
}
export default Login
