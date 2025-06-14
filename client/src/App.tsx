"use client"

import type React from "react" // Ensure React is imported
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import ChatList from "./components/ChatList"
import ForgotPassword from "./pages/auth/Login"
import Login from "./pages/auth/Login"
import NewPassword from "./pages/auth/ResetPassword"
import VerifyEmailPage from "./pages/auth/VerifyEmailPage"
import Signup from "./pages/auth/Signup"
import ProfileCompletePage from "./pages/fan/ProfileCompletePage"
import FirstShoutout from "./pages/fan/FirstShoutout"
import Home from "./pages/Home"
import CelebrityReply from "./pages/temp/CelebrityReply"
import { Container, Spinner } from "react-bootstrap"
import OAuthCallbackPage from "./pages/auth/OAuthCallbackPage"
import PublicCelebritiesPage from "./pages/PublicCelebritiesPage"

// Admin Pages
import AdminChatsPage from "./pages/admin/AdminChatsPage"
import AdminChatViewPage from "./pages/admin/AdminChatViewPage"
import { Role } from "./types/Role" // Assuming Role enum/type is available on client

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth()
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    )
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user && user.role === Role.FAN && user.isEmailVerified && !user.isProfileComplete) {
    return <Navigate to="/profile/complete" replace />
  }
  return <Outlet />
}

const AdminProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth()
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    )
  }
  if (!isAuthenticated || user?.role !== Role.ADMIN) {
    return <Navigate to="/login" replace /> // Or a specific "Unauthorized" page
  }
  return <Outlet />
}

const AppContent: React.FC = () => {
  const { isLoading } = useAuth()
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/celebrities" element={<PublicCelebritiesPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<NewPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmailPage action="verifyLink" />} />
      <Route path="/email-verified-success" element={<VerifyEmailPage action="success" />} />
      <Route path="/email-verified-failed" element={<VerifyEmailPage action="failed" />} />
      <Route path="/oauth-callback" element={<OAuthCallbackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<ChatList />} />
        <Route path="/profile/complete" element={<ProfileCompletePage />} />
        <Route path="/book/shout-out" element={<FirstShoutout />} />
        <Route path="/replies" element={<CelebrityReply />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/chats" element={<AdminChatsPage />} />
        <Route path="/admin/chat/:chatId" element={<AdminChatViewPage />} />
        {/* Add other admin routes here */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
)

export default App
