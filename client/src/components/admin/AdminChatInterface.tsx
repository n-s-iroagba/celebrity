"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Container, Form, Button, ListGroup, Spinner, Alert, Card, InputGroup, Image, Badge } from "react-bootstrap"
import { MessageService } from "../../services/MessageService"
import type { Message as MessageType } from "../../types/Message"
import { useAuth } from "../../contexts/AuthContext"
import { Role } from "../../types/Role" // Assuming Role enum is available

const AdminChatInterface: React.FC = () => {
  const { chatId: chatIdParam } = useParams<{ chatId: string }>()
  const chatId = Number(chatIdParam)
  const location = useLocation()
  const navigate = useNavigate()
  const { celebrityName, fanName, celebrityUserId, fanUserId } =
    (location.state as {
      celebrityName?: string
      fanName?: string
      celebrityUserId?: number
      fanUserId?: number
    }) || {}

  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socketError, setSocketError] = useState<string | null>(null)
  const ws = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const { user, token } = useAuth()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(scrollToBottom, [messages, scrollToBottom])

  const connectWebSocket = useCallback(() => {
    if (!chatId || !token) {
      setError("Chat ID or authentication token is missing for WebSocket.")
      setLoading(false)
      return
    }
    if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
      ws.current.close()
    }

    const wsUrl = `${process.env.REACT_APP_WS_BASE_URL || (window.location.protocol === "https:" ? "wss://" : "ws://") + window.location.host.split(":")[0] + (process.env.NODE_ENV === "development" ? ":3001" : "")}?token=${token}&chatId=${chatId}`
    ws.current = new WebSocket(wsUrl)
    setSocketError(null)

    ws.current.onopen = () => console.log(`Admin WebSocket connected to chat ${chatId}`)
    ws.current.onmessage = (event) => {
      try {
        const receivedMessage = JSON.parse(event.data as string)
        if (receivedMessage.type === "error") {
          console.error("WebSocket error from server:", receivedMessage.payload)
          setSocketError(receivedMessage.payload)
        } else {
          // Assuming direct message object or new message wrapped
          const messageData = receivedMessage.type === "newMessage" ? receivedMessage.payload : receivedMessage
          // Prevent duplicate messages if initial fetch and WS broadcast overlap
          setMessages((prevMessages) => {
            if (prevMessages.find((m) => m.id === messageData.id)) {
              return prevMessages
            }
            return [...prevMessages, messageData].sort(
              (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            )
          })
        }
      } catch (e) {
        console.error("Failed to parse WebSocket message:", e)
        setSocketError("Error processing message from server.")
      }
    }
    ws.current.onerror = (event) => {
      console.error("Admin WebSocket error:", event)
      setSocketError("WebSocket connection error. Try refreshing.")
    }
    ws.current.onclose = (event) => {
      console.log(`Admin WebSocket disconnected from chat ${chatId}:`, event.reason, event.code)
      if (!event.wasClean) setSocketError("WebSocket connection closed unexpectedly.")
    }
  }, [chatId, token])

  useEffect(() => {
    if (!user || user.role !== Role.ADMIN) {
      navigate("/login") // Or an unauthorized page
      return
    }

    const fetchInitialMessages = async () => {
      if (!chatId) return
      try {
        setLoading(true)
        const initialMessages = await MessageService.getChatMessages(chatId)
        setMessages(initialMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch initial messages")
      } finally {
        setLoading(false)
      }
    }

    fetchInitialMessages()
    connectWebSocket()

    return () => {
      if (ws.current) {
        ws.current.onclose = null
        ws.current.close()
      }
    }
  }, [chatId, user, navigate, connectWebSocket])

  const handleSendMessage = () => {
    if (newMessage.trim() && ws.current?.readyState === WebSocket.OPEN) {
      const messagePayload = {
        type: "chatMessage",
        payload: { content: newMessage, mediaType: "text" },
      }
      ws.current.send(JSON.stringify(messagePayload))
      setNewMessage("")
    } else if (ws.current?.readyState !== WebSocket.OPEN) {
      setSocketError("WebSocket is not connected. Cannot send message.")
    }
  }

  const getSenderName = (senderType?: Role, senderId?: number) => {
    if (senderType === Role.CELEBRITY || senderId === celebrityUserId) return celebrityName || "Celebrity"
    if (senderType === Role.FAN || senderId === fanUserId) return fanName || "Fan"
    return "Unknown"
  }

  if (loading && messages.length === 0)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading chat...</p>
      </Container>
    )
  if (error)
    return (
      <Container className="mt-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )

  return (
    <Container className="mt-4 mb-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          <span>
            Chat: {fanName || "Fan"} & {celebrityName || "Celebrity"}
          </span>
          <Badge bg={ws.current?.readyState === WebSocket.OPEN ? "success" : "danger"}>
            {ws.current?.readyState === WebSocket.OPEN ? "Connected" : "Disconnected"}
          </Badge>
        </Card.Header>
        <Card.Body style={{ height: "60vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {socketError && (
            <Alert variant="warning" onClose={() => setSocketError(null)} dismissible>
              {socketError}
            </Alert>
          )}
          <ListGroup variant="flush" className="flex-grow-1">
            {messages.map((msg) => (
              <ListGroup.Item
                key={msg.id}
                className={`d-flex mb-2 ${msg.senderType === Role.CELEBRITY ? "justify-content-end" : "justify-content-start"}`}
                style={{ border: "none", padding: "0.5rem 0" }}
              >
                <div className="d-flex" style={{ maxWidth: "75%" }}>
                  {msg.senderType === Role.FAN && (
                    <Image
                      src={
                        msg.sender?.profilePictureUrl ||
                        `/placeholder.svg?width=40&height=40&query=${getSenderName(msg.senderType, msg.senderId)}`
                      }
                      roundedCircle
                      width={40}
                      height={40}
                      className="me-2 align-self-start"
                      alt="Sender Avatar"
                    />
                  )}
                  <div
                    className={`p-2 rounded shadow-sm ${msg.senderType === Role.CELEBRITY ? "bg-primary text-white ms-auto" : "bg-light text-dark me-auto"}`}
                  >
                    <small className="fw-bold d-block">
                      {getSenderName(msg.senderType, msg.senderId)}
                      {msg.senderType === Role.ADMIN && " (Admin)"}{" "}
                      {/* Should not happen if impersonation is correct */}
                    </small>
                    <p className="mb-1" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {msg.content}
                    </p>
                    <small
                      className={`d-block text-end ${msg.senderType === Role.CELEBRITY ? "text-white-50" : "text-muted"}`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </small>
                  </div>
                  {msg.senderType === Role.CELEBRITY && (
                    <Image
                      src={
                        msg.sender?.profilePictureUrl ||
                        `/placeholder.svg?width=40&height=40&query=${getSenderName(msg.senderType, msg.senderId)}`
                      }
                      roundedCircle
                      width={40}
                      height={40}
                      className="ms-2 align-self-start"
                      alt="Sender Avatar"
                    />
                  )}
                </div>
              </ListGroup.Item>
            ))}
            <div ref={messagesEndRef} />
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <InputGroup>
            <Form.Control
              as="textarea"
              rows={1}
              style={{ resize: "none" }}
              placeholder={`Type as ${celebrityName || "Celebrity"}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              disabled={ws.current?.readyState !== WebSocket.OPEN}
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || ws.current?.readyState !== WebSocket.OPEN}
            >
              Send
            </Button>
          </InputGroup>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default AdminChatInterface
