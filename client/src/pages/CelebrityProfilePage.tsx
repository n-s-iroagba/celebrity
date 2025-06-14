"use client"

import type React from "react"
import { useParams } from "react-router-dom"
import { ProtectedContent } from "../components/ProtectedContent"
import { Button } from "../components/ui/button" // Assuming shadcn/ui button

// A simple component to show if the user doesn't have access
const SubscribePrompt = ({ celebrityId }: { celebrityId: number }) => (
  <div style={{ border: "2px dashed grey", padding: "20px", textAlign: "center" }}>
    <h3>Exclusive Content</h3>
    <p>Subscribe to this celebrity to unlock exclusive videos, posts, and more!</p>
    <Button onClick={() => alert(`Navigate to subscription page for celebrity ${celebrityId}`)}>
      View Subscription Plans
    </Button>
  </div>
)

// A placeholder for your exclusive content component
const ExclusiveVideoPlayer = ({ videoUrl }: { videoUrl: string }) => (
  <div>
    <h4>Exclusive Video</h4>
    <video src={videoUrl} controls width="100%"></video>
  </div>
)

export const CelebrityProfilePage: React.FC = () => {
  const { celebrityId } = useParams<{ celebrityId: string }>()
  const numericCelebrityId = Number(celebrityId)

  if (isNaN(numericCelebrityId)) {
    return <p>Invalid Celebrity ID</p>
  }

  return (
    <div>
      <h1>Celebrity Profile Page (ID: {numericCelebrityId})</h1>
      <hr />

      <h2>Public Information</h2>
      <p>This is the celebrity's bio. Everyone can see this.</p>
      <hr />

      <h2>Exclusive Member-Only Content</h2>
      <ProtectedContent
        celebrityId={numericCelebrityId}
        fallback={<SubscribePrompt celebrityId={numericCelebrityId} />}
      >
        {/* This content will only be rendered if the user has an active subscription */}
        <ExclusiveVideoPlayer videoUrl="/placeholder/exclusive_video.mp4" />
        <p>Here is an exclusive blog post...</p>
      </ProtectedContent>
    </div>
  )
}
