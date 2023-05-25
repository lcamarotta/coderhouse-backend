import { useContext, useState, useEffect } from 'react';
import { Col, Container, Row, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import socketIO from 'socket.io-client';


import { backendURL } from "../../utils/config";
import { UserContext } from '../../context/UserContext';

const ChatPage = () => {
  
  const socket = socketIO.connect( backendURL );
  const userCtx = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const msgBox = document.getElementById('msg');

    messages.push(<ListGroup.Item key={messages.length + 1}>{userCtx.userSession.name}: { msgBox.value }</ListGroup.Item>);

    socket.emit('newMessage', {
      user: userCtx.userSession.name,
      message: msgBox.value
    });
    
    setNewMessage(!newMessage)
    msgBox.value = ''
  };


  socket.on('messagesLog', data => {
    data.forEach(message => {
      messages.push(<ListGroup.Item key={messages.length + 1}>{ message.user }: { message.message }</ListGroup.Item>)
      setNewMessage(!newMessage)
    });
  });

	return (
    <Container>
      <Row className='m-5'>
        <Col className='d-flex justify-content-center align-items-center'>
          <ListGroup>
            { messages }
          </ListGroup>
        </Col>
      </Row>
      <Row className='m-5 d-flex justify-content-center'>
        <Col lg={6}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control placeholder="Message" aria-label="Message" id='msg' type="text"/>
              <Button variant="outline-secondary" type='submit'>Send</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatPage