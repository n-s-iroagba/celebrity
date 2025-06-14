"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// This should mirror the user object structure returned from your API after login/registration
export interface AuthenticatedUser {
  id: number
  email: string
  role: string
  isEmailVerified: boolean
  fanId?: number
  celebrityId?: number
  adminId?: number
  isProfileComplete?: boolean // Specific to fan flow
  // Add other relevant user fields
}

interface AuthContextType {
  isAuthenticated: boolean
  user: AuthenticatedUser | null
  token: string | null
  isLoading: boolean
  login: (token: string, userData: AuthenticatedUser) => void
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>> // To update user after profile completion
  checkAuthStatus: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true) // Start with loading true

  const checkAuthStatus = () => {
    setIsLoading(true)
    const storedToken = localStorage.getItem("authToken")
    const storedUser = localStorage.getItem("authUser")
    if (storedToken && storedUser) {
      try {
        const parsedUser: AuthenticatedUser = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user data:", error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("authUser")
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const login = (newToken: string, userData: AuthenticatedUser) => {
    localStorage.setItem("authToken", newToken)
    localStorage.setItem("authUser", JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    setIsAuthenticated(true)
    setIsLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("authUser")
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, isLoading, login, logout, setUser, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
