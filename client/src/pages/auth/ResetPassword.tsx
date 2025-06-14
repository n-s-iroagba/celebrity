"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import { Container, InputGroup, Spinner } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../components/Logo"
import { ErrorMessageDisplay } from "@/components/ui/ErrorMessageDisplay" // Adjust path if needed

const NewPassword: React.FC = () => {
  const navigate = useNavigate()
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordType, setPasswordType] = useState<"text" | "password">("password")
  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  const showPassword = () => {
    setPasswordType((prev) => (prev === "text" ? "password" : "text"))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false || passwordData.newPassword !== passwordData.confirmPassword) {
      e.stopPropagation()
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setErrorMessage("Passwords do not match.")
      }
      setValidated(true)
      return
    }

    setSubmitting(true)
    setErrorMessage("")

    // Simulating password update
    setTimeout(() => {
      alert("Password updated successfully!")
      navigate("/login")
      setSubmitting(false)
    }, 1000)
  }

  return (
    <div className="purple-gradient-bg d-flex align-items-center">
      <Container className="container-custom mt-0 py-3 bg-light">
        <div className="d-flex justify-content-center mb-3">
          <Logo />
        </div>
        <h3 className="text-center">Reset Password</h3>
        <Form className="form py-2" noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                className="form-control-custom"
              />
              <InputGroup.Text onClick={showPassword}>
                <FontAwesomeIcon icon={passwordType === "text" ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">Please enter your new password.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="confirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                className="form-control-custom"
              />
              <InputGroup.Text onClick={showPassword}>
                <FontAwesomeIcon icon={passwordType === "text" ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">Please confirm your password.</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-evenly w-100 pt-3">
            <button className="auth-button " type={submitting ? "button" : "submit"}>
              {submitting ? <Spinner animation="border" size="sm" /> : "Submit"}
            </button>
          </div>
        </Form>
        {/* Replaced ErrorMessage with ErrorMessageDisplay */}
        <ErrorMessageDisplay message={errorMessage} className="mt-3" />
      </Container>
    </div>
  )
}

export default NewPassword
