"use client"

import type React from "react"
import { useState } from "react"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import { Container, Spinner } from "react-bootstrap"
import "../../assets/styles/Form.css"
import Logo from "../../components/Logo"
import { ErrorMessageDisplay } from "@/components/ui/ErrorMessageDisplay"
import { SuccessMessageDisplay } from "@/components/ui/SuccessMessageDisplay"
import { forgotPasswordApi } from "@/services/api" // Import the new API function

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [validated, setValidated] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }

    setSubmitting(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Call the actual API
      const response = await forgotPasswordApi(email)
      setSuccessMessage(response.message || "Password reset link sent to your email!") // Use message from API or a default
      setEmail("") // Clear the email field on success
      setValidated(false) // Reset validation state
    } catch (error: any) {
      // Handle API errors
      setErrorMessage(error.message || "Failed to send password reset email. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="purple-gradient-bg d-flex align-items-center">
        <Container className="container-custom mt-0 py-3 bg-light">
          <div className="d-flex justify-content-center mb-3">
            <Logo />
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
                disabled={submitting || !!successMessage}
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
                  type="submit" // Changed from conditional type
                  disabled={submitting || !!successMessage}
                >
                  {submitting ? <Spinner animation="border" size="sm" /> : "Submit"}
                </button>
              </div>
            </Form.Group>
          </Form>
          <ErrorMessageDisplay message={errorMessage} className="mt-3" />
          <SuccessMessageDisplay message={successMessage} className="mt-3" />
        </Container>
      </div>
    </>
  )
}

export default ForgotPassword
