"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Modal, Button, Form, ListGroup, Spinner, Alert, InputGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { sendTemporaryMessageApi, getTemporaryMessagesApi } from "../services/api"
import type { Message } from "../types/Message" // Assuming a Message type

interface TemporaryChatModalProps {
  show: boolean
  handleClose: () => void
  celebrityId: number | null
  celebrityName: string | null
  tempSessionId: string | null
  initialMessages?: Message[]
}

const TemporaryChatModal: React.FC<TemporaryChatModalProps> = ({
  show,
  handleClose,
  celebrityName,
  tempSessionId,
  initialMessages = [],
}) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (show && tempSessionId && initialMessages.length === 0) {
      // Fetch messages only if modal is shown, session exists, and no initial messages were passed
      setIsLoading(true)
      getTemporaryMessagesApi(tempSessionId)
        .then((data) => {
          setMessages(data || []) // Ensure data is an array
          setError(null)
        })
        .catch((err) => {
          console.error("Failed to fetch temporary messages:", err)
          setError(err.message || "Failed to load messages.")
          setMessages([]) // Clear messages on error
        })
        .finally(() => setIsLoading(false))
    } else if (show) {
      setMessages(initialMessages) // Use initial messages if provided
    }
  }, [show, tempSessionId, initialMessages])

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !tempSessionId) return
    setIsLoading(true)
    try {
      const sentMessage = await sendTemporaryMessageApi(tempSessionId, newMessage)
      setMessages((prevMessages) => [...(prevMessages || []), { ...sentMessage, sender: "USER" }]) // Assume sender is 'USER' for display
      setNewMessage("")
      setError(null)
    } catch (err: any) {
      console.error("Failed to send temporary message:", err)
      setError(err.message || "Failed to send message.")
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToAuth = (path: "/signup" | "/login") => {
    handleClose() // Close modal before navigating
    navigate(path, { state: { tempSessionId, celebrityName } })
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chat with {celebrityName || "Celebrity"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <ListGroup variant="flush">
          {isLoading && messages.length === 0 && (
            <div className="text-center">
              <Spinner animation="border" /> <p>Loading messages...</p>
            </div>
          )}
          {!isLoading && messages.length === 0 && !error && (
            <p className="text-center">No messages yet. Start the conversation!</p>
          )}
          {messages.map((msg, index) => (
            <ListGroup.Item
              key={msg.id || index} // Use msg.id if available, otherwise index
              className={`d-flex ${msg.sender === "USER" ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className={`p-2 rounded ${msg.sender === "USER" ? "bg-primary text-white" : "bg-light"}`}
                style={{ maxWidth: "70%" }}
              >
                <p className="mb-0">{msg.content}</p>
                <small className={`text-muted ${msg.sender === "USER" ? "text-light opacity-75" : ""}`}>
                  {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
                </small>
              </div>
            </ListGroup.Item>
          ))}
          <div ref={messagesEndRef} />
        </ListGroup>
      </Modal.Body>
      <Modal.Footer className="flex-column align-items-stretch">
        <Alert variant="info" className="w-100 text-center">
          <Button variant="link" onClick={() => navigateToAuth("/signup")} className="p-0 m-0 align-baseline">
            Sign up
          </Button>{" "}
          or{" "}
          <Button variant="link" onClick={() => navigateToAuth("/login")} className="p-0 m-0 align-baseline">
            Log in
          </Button>{" "}
          to save your conversation and get replies!
        </Alert>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            disabled={isLoading || !tempSessionId}
          />
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={isLoading || !tempSessionId || !newMessage.trim()}
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </Button>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  )
}

export default TemporaryChatModal
