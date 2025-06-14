"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, ListGroup, Spinner, Alert, Card, Image } from "react-bootstrap"
import { getAdminChatListApi } from "../../services/api"
import type { User } from "../../types/User"
import type { Celebrity } from "../../types/Celebrity"
import type { Fan } from "../../types/Fan"

interface AdminChat {
  id: number
  fanId: number
  celebrityId: number
  createdAt: string
  updatedAt: string
  fan: Fan & { user: User }
  celebrity: Celebrity & { user: User }
  // lastMessage?: { content: string; createdAt: string }; // For preview
}

const AdminChatsPage: React.FC = () => {
  const [chats, setChats] = useState<AdminChat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true)
        const data = await getAdminChatListApi()
        setChats(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch chats")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchChats()
  }, [])

  const handleChatSelect = (chat: AdminChat) => {
    const celebrityName = chat.celebrity?.user?.stageName || chat.celebrity?.user?.firstName || "Celebrity"
    const fanName = `${chat.fan?.user?.firstName || ""} ${chat.fan?.user?.lastName || ""}`.trim() || "Fan"
    navigate(`/admin/chat/${chat.id}`, {
      state: { celebrityName, fanName, celebrityUserId: chat.celebrity?.user?.id, fanUserId: chat.fan?.user?.id },
    })
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading chats...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h2" className="text-center">
          Manage Chats
        </Card.Header>
        <Card.Body>
          {chats.length === 0 ? (
            <Alert variant="info">No active chats found.</Alert>
          ) : (
            <ListGroup variant="flush">
              {chats.map((chat) => (
                <ListGroup.Item
                  key={chat.id}
                  action
                  onClick={() => handleChatSelect(chat)}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={chat.fan?.user?.profilePictureUrl || "/placeholder.svg?width=50&height=50&query=fan+avatar"}
                      roundedCircle
                      width={50}
                      height={50}
                      className="me-3"
                      alt="Fan Avatar"
                    />
                    <div>
                      <strong className="d-block">
                        Fan:{" "}
                        {`${chat.fan?.user?.firstName || ""} ${chat.fan?.user?.lastName || ""}`.trim() || "Unknown Fan"}
                      </strong>
                      <small className="text-muted d-block">
                        vs. Celebrity: {chat.celebrity?.user?.stageName || chat.celebrity?.user?.firstName || "N/A"}
                      </small>
                      <small className="text-muted d-block">
                        Chat ID: {chat.id} | Last active: {new Date(chat.updatedAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                  <Image
                    src={
                      chat.celebrity?.user?.profilePictureUrl ||
                      "/placeholder.svg?width=50&height=50&query=celebrity+avatar"
                    }
                    roundedCircle
                    width={50}
                    height={50}
                    alt="Celebrity Avatar"
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AdminChatsPage
