import React from "react";
import { Form, Button, Container } from "react-bootstrap";


type PostChatProps ={
    celebrityReply:{name:string, message:string, date:string}
    handleFanChange:(e:any) => void,
    handleCelebrityChange:(e:any) => void
    handleSubmit: (e: React.FormEvent) => void,
    fanMessage: {name:string, message:string, date:string}
}

const PostChat: React.FC<PostChatProps> = ({
    celebrityReply,
    fanMessage,
    handleSubmit,
    handleFanChange,
    handleCelebrityChange,
  
}) => {



  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>

      <Form.Group controlId="inputOne" className="mb-3">
          <Form.Label>Fan Name</Form.Label>
          <Form.Control 
            name="name"
            value={fanMessage.name}
            onChange={handleFanChange}
            required
          />
         
        </Form.Group>

        <Form.Group controlId="inputOne" className="mb-3">
          <Form.Label>Celebrity Name</Form.Label>
          <Form.Control
            name="name"
            value={celebrityReply.name}
            onChange={handleCelebrityChange}
            required
          />
         
        </Form.Group>

        <Form.Group controlId="inputOne" className="mb-3">
          <Form.Label>Fan Message Date</Form.Label>
          <Form.Control
            name="date"
            value={fanMessage.date}
            onChange={handleFanChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="inputOne" className="mb-3">
          <Form.Label>Celebrity Reply Date</Form.Label>
          <Form.Control
            name="date"
            value={celebrityReply.date}
            onChange={handleCelebrityChange}
            required
          /> 
        </Form.Group>
     
        <Form.Group controlId="inputOne" className="mb-3">
          <Form.Label>Fan Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={fanMessage.message}
            onChange={handleFanChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="inputOne" className="mb-3">
          <Form.Label>Celebrity Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={celebrityReply.message}
            onChange={handleCelebrityChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostChat;
