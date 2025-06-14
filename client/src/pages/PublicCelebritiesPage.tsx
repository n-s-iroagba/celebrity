"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"
import CelebrityCard from "../components/CelebrityCard"
import TemporaryChatModal from "../components/TemporaryChatModal"
import { getPublicCelebritiesApi, initiateTemporaryChatApi } from "../services/api"
import type { Celebrity } from "../types/Celebrity"
import type { Message } from "../types/Message"

const PublicCelebritiesPage: React.FC = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Temporary Chat Modal State
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedCelebrityId, setSelectedCelebrityId] = useState<number | null>(null)
  const [selectedCelebrityName, setSelectedCelebrityName] = useState<string | null>(null)
  const [currentTempSessionId, setCurrentTempSessionId] = useState<string | null>(null)
  const [initialModalMessages, setInitialModalMessages] = useState<Message[]>([])

  useEffect(() => {
    getPublicCelebritiesApi()
      .then((data) => {
        setCelebrities(data || [])
        setError(null)
      })
      .catch((err) => {
        console.error("Failed to fetch celebrities:", err)
        setError(err.message || "Failed to load celebrities.")
        setCelebrities([])
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleOpenChatModal = async (celebrityId: number, celebrityName: string) => {
    setSelectedCelebrityId(celebrityId)
    setSelectedCelebrityName(celebrityName)
    setIsLoading(true) // For modal initiation

    // Check local storage for an existing session for this celebrity
    const storedSessions = JSON.parse(localStorage.getItem("tempChatSessions") || "{}")
    let sessionId = storedSessions[celebrityId]
    let messages: Message[] = []

    if (sessionId) {
      setCurrentTempSessionId(sessionId)
      // Optionally, you could pre-fetch messages here if you want,
      // but the modal itself also fetches. For simplicity, we pass empty.
      setInitialModalMessages([]) // Modal will fetch
    } else {
      try {
        const response = await initiateTemporaryChatApi(celebrityId)
        sessionId = response.tempSessionId
        messages = response.messages || [] // Messages from initiation (if any)
        setCurrentTempSessionId(sessionId)
        setInitialModalMessages(messages)
        storedSessions[celebrityId] = sessionId
        localStorage.setItem("tempChatSessions", JSON.stringify(storedSessions))
      } catch (err: any) {
        console.error("Failed to initiate temporary chat:", err)
        setError(err.message || "Could not start chat.")
        setIsLoading(false)
        return // Don't open modal if initiation fails
      }
    }
    setShowChatModal(true)
    setIsLoading(false) // For modal initiation
  }

  const handleCloseChatModal = () => {
    setShowChatModal(false)
    setSelectedCelebrityId(null)
    setSelectedCelebrityName(null)
    setCurrentTempSessionId(null) // Clear current session when modal closes
    setInitialModalMessages([])
  }

  if (isLoading && celebrities.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading celebrities...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  if (!isLoading && celebrities.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <p>No celebrities available at the moment. Please check back later.</p>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Meet Our Stars!</h1>
      <p className="mb-4 text-center text-muted">
        Browse your favorite celebrities and send them a message. Sign up or log in to save your conversation and get
        replies!
      </p>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
        {celebrities.map((celeb) => (
          <Col key={celeb.id} className="d-flex justify-content-center">
            <CelebrityCard celebrity={celeb} onSendMessage={handleOpenChatModal} />
          </Col>
        ))}
      </Row>

      {selectedCelebrityId && selectedCelebrityName && (
        <TemporaryChatModal
          show={showChatModal}
          handleClose={handleCloseChatModal}
          celebrityId={selectedCelebrityId}
          celebrityName={selectedCelebrityName}
          tempSessionId={currentTempSessionId}
          initialMessages={initialModalMessages}
        />
      )}
    </Container>
  )
}

export default PublicCelebritiesPage
