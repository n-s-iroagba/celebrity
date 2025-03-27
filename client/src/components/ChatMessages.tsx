import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Message } from "../types/Messages";

// Message type based on your model

// Props for the ChatMessages component


const ChatMessages: React.FC<{messages:Message[],userId:number}> = ({messages, userId}) => {
  return (
    <Container className="py-3">
      {messages.map((message) => {
        const isSent = message.senderId === userId;
        return (
          <Row key={message.id} className="mb-2 justify-content-center">
            <Col xs={10} className={isSent ? "text-end" : "text-start"}>
              <Card 
                className={`p-2 d-inline-block ${isSent ? "bg-light text-dark" : "bg-primary text-white"}`}
                style={{ maxWidth: "75%", borderRadius: "12px" }}
              >
                {message.mediaType === "text" ? (
                  <p className="mb-1">{message.content}</p>
                ) : message.mediaType === "image" ? (
                  <Card.Img src={message.mediaUrl ?? ""} alt="Media" className="rounded" />
                ) : message.mediaType === "video" ? (
                  <video src={message.mediaUrl ?? ""} controls className="w-100 rounded" />
                ) : (
                  <p>Unsupported media</p>
                )}
              </Card>
              <div className="text-muted" style={{ fontSize: "12px", marginTop: "5px" }}>
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default ChatMessages;

