import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, ListGroup } from 'react-bootstrap';

import { UserContext } from '../../context/UserContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
	return (
    <Container>
      <Row className='m-5'>
        <Col className='justify-content-center d-flex align-items-center'>
          <ListGroup>
            <ListGroup.Item>Username: { userCtx.userSession.name }</ListGroup.Item>
            <ListGroup.Item>User email: { userCtx.userSession.email }</ListGroup.Item>
            <ListGroup.Item>Age: { userCtx.userSession.age || 'Empty' }</ListGroup.Item>
            <ListGroup.Item variant="info" action onClick={  () => { navigate('/user/cart') } }>Cart ID: { userCtx.userSession.cart }</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage