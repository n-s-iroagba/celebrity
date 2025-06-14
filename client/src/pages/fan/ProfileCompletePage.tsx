"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button, Spinner, Alert, Row, Col } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { getMyFanProfileApi, updateMyFanProfileApi } from "../../services/api"
import type { FanAttributes, Gender } from "../../../../server/src/models/Fan" // Adjust path

// A simple list of countries for the dropdown
const countries = [
  "USA",
  "Canada",
  "UK",
  "Germany",
  "France",
  "Australia",
  "Nigeria",
  "Ghana",
  "South Africa",
  "Kenya",
  "India",
  "Other",
] // Add more as needed
const genderOptions: { value: Gender; label: string }[] = [
  { value: "MALE" as Gender, label: "Male" },
  { value: "FEMALE" as Gender, label: "Female" },
  { value: "NON_BINARY" as Gender, label: "Non-binary" },
  { value: "PREFER_NOT_TO_SAY" as Gender, label: "Prefer not to say" },
]

const ProfileCompletePage: React.FC = () => {
  const { user, setUser: setAuthUser, isAuthenticated, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [profileData, setProfileData] = useState<
    Partial<Pick<FanAttributes, "countryOfResidence" | "dateOfBirth" | "gender">>
  >({
    countryOfResidence: "",
    dateOfBirth: undefined, // Store as Date or string 'YYYY-MM-DD'
    gender: undefined,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login")
    }
    // Fetch existing profile data if user is a fan and has a fanId
    // This is more for an "edit profile" page, but good to have if user revisits
    if (user && user.fanId && !authLoading) {
      const fetchProfile = async () => {
        setIsLoading(true)
        try {
          const existingProfile = await getMyFanProfileApi()
          setProfileData({
            countryOfResidence: existingProfile.countryOfResidence || "",
            // Ensure dateOfBirth is formatted as YYYY-MM-DD string for input type="date"
            dateOfBirth: existingProfile.dateOfBirth
              ? new Date(existingProfile.dateOfBirth).toISOString().split("T")[0]
              : undefined,
            gender: existingProfile.gender || undefined,
          })
        } catch (err: any) {
          // setError(err.message || "Failed to load profile data.");
          console.warn("Could not load existing profile for completion form, starting fresh:", err.message)
        } finally {
          setIsLoading(false)
        }
      }
      // fetchProfile(); // Uncomment if you want to pre-fill from existing partial profile
    }
  }, [user, navigate, isAuthenticated, authLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!profileData.countryOfResidence || !profileData.dateOfBirth || !profileData.gender) {
      setError("All fields are required to complete your profile.")
      return
    }

    setIsLoading(true)
    try {
      const updatedProfile = await updateMyFanProfileApi(profileData)
      setSuccess("Profile updated successfully!")
      // Update user in AuthContext
      if (user) {
        setAuthUser({ ...user, isProfileComplete: true })
      }
      setTimeout(() => navigate("/dashboard"), 1500) // Redirect to dashboard
    } catch (err: any) {
      setError(err.message || "Failed to update profile.")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading Profile...</p>
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="p-4 shadow-sm bg-light rounded">
            <h2 className="text-center mb-4">Complete Your Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="countryOfResidence">
                <Form.Label>Country of Residence</Form.Label>
                <Form.Select
                  name="countryOfResidence"
                  value={profileData.countryOfResidence || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={
                    profileData.dateOfBirth
                      ? profileData.dateOfBirth instanceof Date
                        ? profileData.dateOfBirth.toISOString().split("T")[0]
                        : String(profileData.dateOfBirth)
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" value={profileData.gender || ""} onChange={handleChange} required>
                  <option value="" disabled>
                    Select your gender
                  </option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 auth-button" disabled={isLoading}>
                {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Save Profile"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileCompletePage
