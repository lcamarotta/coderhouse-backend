import { Col, Container, Row, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';


import socket from "../../utils/socket";
import ChatWindow from './ChatWindow';

const ChatPage = ({ username }) => {

  const handleSubmit = (event) => {
    event.preventDefault();

    const msgBox = document.getElementById('msgBox');
    if(msgBox.value == '') return;
    
    socket.emit('send-message', {
      user: username,
      message: msgBox.value
    });
    msgBox.value = '';
  };

	return (
    <Container>
      <Row className='m-5'>
        <Col className='d-flex justify-content-center align-items-center'>
          <ListGroup>
            <ChatWindow/>
          </ListGroup>
        </Col>
      </Row>
      <Row className='m-5 d-flex justify-content-center'>
        <Col lg={6}>
          <Form onSubmit={ handleSubmit }>
            <InputGroup className="mb-3">
              <Form.Control placeholder="Message" aria-label="Message" id='msgBox' type="text"/>
              <Button variant="outline-secondary" type='submit'>Send</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatPage