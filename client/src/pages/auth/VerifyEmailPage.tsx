"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { Container, Alert, Spinner, Button } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext" // Assuming you have AuthContext

// No direct API call from here for link verification, backend handles it and redirects.
// This page handles the result of the redirect.

interface VerifyEmailPageProps {
  action: "verifyLink" | "success" | "failed" // To determine what to display
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ action }) => {
  const { token: verificationTokenFromPath } = useParams<{ token?: string }>() // For /verify-email/:token
  const [searchParams] = useSearchParams() // For query params like ?token= on success/fail
  const navigate = useNavigate()
  const { login: contextLogin, isLoading: authIsLoading, isAuthenticated, user } = useAuth()

  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(action === "verifyLink") // Only load if it's the initial verification attempt

  useEffect(() => {
    if (action === "verifyLink") {
      // This case is mostly for if the backend didn't redirect properly
      // or if we wanted to show a loading spinner before backend redirect happens.
      // The actual verification happens on the backend when user clicks the link.
      // Backend redirects to /email-verified-success or /email-verified-failed
      setMessage("Processing your email verification...")
      // No API call needed here, backend handles the token from URL.
      // If this page is reached directly via /verify-email/:token, it means the backend
      // should have processed it. If it didn't redirect, something is wrong with backend routing.
      // For robustness, you could add a timeout and then show an error.
      setTimeout(() => {
        if (isLoading) {
          // if still loading after a few seconds
          setError(
            "Verification link seems to be taking too long or is invalid. Please try logging in or contact support.",
          )
          setIsLoading(false)
        }
      }, 10000) // 10 seconds timeout
    } else if (action === "success") {
      const loginToken = searchParams.get("token")
      if (loginToken) {
        // Attempt to "login" the user with this token by fetching their details
        // This assumes the token is a short-lived session token or a full JWT
        // For simplicity, we'll assume it's a full JWT and update AuthContext
        // A more robust flow might involve exchanging this for a full session/user details.

        // Mocking user data fetch based on token for this example
        // In a real app, you'd verify this token with backend or the token itself contains user data
        try {
          // This part is tricky without a backend endpoint to validate this specific "loginToken"
          // and get user details. For now, we assume the token is a full JWT.
          // The backend's verifyEmailLink now redirects with the actual login JWT.
          const tempUser = JSON.parse(atob(loginToken.split(".")[1])) // Decode JWT payload (simplistic)
          const userData = {
            id: tempUser.userId,
            email: tempUser.email,
            role: tempUser.role,
            isEmailVerified: true,
            fanId: tempUser.fanId,
            isProfileComplete: false, // Assume profile is not complete yet
          }
          contextLogin(loginToken, userData)
          setMessage("Email verified successfully! You are now logged in.")
          // Redirect to profile completion or dashboard
          setTimeout(() => {
            navigate(userData.isProfileComplete ? "/dashboard" : "/profile/complete")
          }, 2000)
        } catch (e) {
          console.error("Error processing login token from verification:", e)
          setError("Email verified, but failed to log you in automatically. Please try logging in manually.")
        }
      } else {
        setMessage("Email verified successfully! Please log in.")
      }
      setIsLoading(false)
    } else if (action === "failed") {
      const errorMsg = searchParams.get("error")
      setError(
        errorMsg ||
          "Email verification failed. The link may be invalid or expired. Please try registering again or request a new verification email.",
      )
      setIsLoading(false)
    }
  }, [action, verificationTokenFromPath, searchParams, navigate, contextLogin, isLoading])

  if (authIsLoading || isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">{message || "Loading..."}</p>
      </Container>
    )
  }

  return (
    <Container className="text-center mt-5">
      {message && !error && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!isAuthenticated && (action === "success" || action === "failed") && (
        <Button variant="primary" onClick={() => navigate("/login")} className="mt-3">
          Go to Login
        </Button>
      )}
      {isAuthenticated && action === "success" && (
        <Button
          variant="primary"
          onClick={() => navigate(user?.isProfileComplete ? "/dashboard" : "/profile/complete")}
          className="mt-3"
        >
          Continue
        </Button>
      )}
    </Container>
  )
}

export default VerifyEmailPage
