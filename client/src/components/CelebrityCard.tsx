"use client"

import type React from "react"
import { Card, Button } from "react-bootstrap"
import type { Celebrity } from "../types/Celebrity" // Assuming you have a Celebrity type

interface CelebrityCardProps {
  celebrity: Celebrity // Use your actual Celebrity type
  onSendMessage: (celebrityId: number, celebrityName: string) => void
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({ celebrity, onSendMessage }) => {
  // Construct image URL if your celebrity object has a photo path
  const imageUrl = celebrity.profilePhotoUrl
    ? `${process.env.REACT_APP_API_BASE_URL?.replace("/api", "")}${celebrity.profilePhotoUrl}`
    : "/placeholder.svg?width=200&height=200" // Fallback placeholder

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={celebrity.stageName || "Celebrity"}
        style={{ height: "180px", objectFit: "cover" }}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null // prevent infinite loop
          target.src = "/placeholder.svg?width=200&height=200"
        }}
      />
      <Card.Body>
        <Card.Title>{celebrity.stageName || "N/A"}</Card.Title>
        <Card.Text
          style={{
            minHeight: "3em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {celebrity.bio || "No bio available."}
        </Card.Text>
        <Button variant="primary" onClick={() => onSendMessage(celebrity.id, celebrity.stageName || "Celebrity")}>
          Send Message
        </Button>
      </Card.Body>
    </Card>
  )
}

export default CelebrityCard
