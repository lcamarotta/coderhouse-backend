import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, ListGroup } from 'react-bootstrap';

import { UserContext } from '../../context/UserContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
	return (
    <Container>
      <Row className='m-5'>
        <Col className='justify-content-center d-flex align-items-center'>
          <ListGroup>
            <ListGroup.Item>Name: { userCtx.userSession.name }</ListGroup.Item>
            <ListGroup.Item>Email: { userCtx.userSession.email }</ListGroup.Item>
            <ListGroup.Item variant="info">Cart ID: { userCtx.userSession.cart }</ListGroup.Item>
            <ListGroup.Item variant="info">Items: { false || 'Empty' }</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage