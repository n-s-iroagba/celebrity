import type React from "react"
import AdminChatInterface from "../../components/admin/AdminChatInterface"
import { Container } from "react-bootstrap" // Optional: for consistent layout

const AdminChatViewPage: React.FC = () => {
  return (
    // You might want a container or specific layout for admin pages
    <Container fluid className="p-0">
      <AdminChatInterface />
    </Container>
  )
}

export default AdminChatViewPage
