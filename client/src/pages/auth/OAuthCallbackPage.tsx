"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Spinner, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { googleAuthCallbackApi } from "../../services/api" // Assuming this API handles the final step

const OAuthCallbackPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string>("Processing authentication...")

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get("code") // For Google, it's 'code'
    const oauthError = params.get("error")

    // Retrieve tempSessionId from localStorage if it was set before OAuth redirect
    const tempSessionId = localStorage.getItem("oauthTempSessionId")
    // const celebrityName = localStorage.getItem("oauthCelebrityName"); // If needed for messages

    if (oauthError) {
      setError(`OAuth failed: ${oauthError}`)
      setMessage("")
      return
    }

    if (code) {
      googleAuthCallbackApi(code, tempSessionId) // Pass tempSessionId to backend
        .then((response: any) => {
          // Assuming response contains { token, user }
          login(response.token, response.user)
          localStorage.removeItem("oauthTempSessionId") // Clean up
          localStorage.removeItem("oauthCelebrityName")
          localStorage.removeItem("tempChatSessions") // Clean up all temp sessions

          setMessage("Successfully authenticated! Redirecting...")
          // Redirect logic: if profile not complete, go to complete, else dashboard
          const redirectTo =
            response.user.isProfileComplete || !response.user.isEmailVerified ? "/dashboard" : "/profile/complete"
          // If a temp chat was active, maybe prioritize dashboard/chat page
          navigate(tempSessionId ? "/dashboard" : redirectTo, { replace: true })
        })
        .catch((err) => {
          console.error("OAuth callback error:", err)
          setError(err.message || "Authentication failed during callback.")
          setMessage("")
          localStorage.removeItem("oauthTempSessionId") // Clean up
          localStorage.removeItem("oauthCelebrityName")
        })
    } else {
      setError("No authorization code found in callback.")
      setMessage("")
    }
  }, [location, navigate, login])

  return (
    <Container className="text-center mt-5">
      {message && !error && (
        <>
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>{message}</p>
        </>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!message && !error && <Alert variant="warning">Invalid OAuth callback state.</Alert>}
    </Container>
  )
}

export default OAuthCallbackPage
