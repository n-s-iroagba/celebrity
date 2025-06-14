"use client"

import type React from "react"
import { useState, useEffect, type ReactNode } from "react"
import { checkActiveSubscriptionApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"

interface ProtectedContentProps {
  celebrityId: number
  requiredTier?: string // Optional: Name of the required tier (e.g., "Gold", "Silver")
  children: ReactNode
  fallback?: ReactNode
  loadingComponent?: ReactNode
}

export const ProtectedContent: React.FC<ProtectedContentProps> = ({
  celebrityId,
  requiredTier, // New prop
  children,
  fallback = null,
  loadingComponent = <p>Loading content...</p>,
}) => {
  const { isAuthenticated } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false)
      setHasAccess(false)
      return
    }

    const checkSubscription = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Pass the requiredTier to the API call
        const response = await checkActiveSubscriptionApi(celebrityId, requiredTier)
        setHasAccess(response.hasActiveSubscription)
      } catch (err: any) {
        console.error("Failed to check subscription status:", err)
        setError("Could not verify your subscription status. Please try again later.")
        setHasAccess(false) // Default to no access on error
      } finally {
        setIsLoading(false)
      }
    }

    checkSubscription()
  }, [celebrityId, requiredTier, isAuthenticated]) // Add requiredTier to dependency array

  if (isLoading) {
    return <>{loadingComponent}</>
  }

  if (error) {
    // You might want a more user-friendly error display
    return <p style={{ color: "red" }}>{error}</p>
  }

  if (hasAccess) {
    return <>{children}</>
  }

  // If no custom fallback, provide a generic one if a tier was required
  if (!fallback && requiredTier) {
    return <p>You need a '{requiredTier}' subscription or higher to view this content.</p>
  }
  if (!fallback) {
    return <p>You need an active subscription to view this content.</p>
  }

  return <>{fallback}</>
}
