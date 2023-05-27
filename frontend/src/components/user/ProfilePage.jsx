import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, ListGroup } from 'react-bootstrap';

const ProfilePage = ({ user, logout }) => {
  const navigate = useNavigate();

  function logoutOnClick() {
    logout();
    user.setUserSession(false);
    user.setIsUserLogged(false);
    navigate('/all/1')
  }

	return (
    <Container>
      <Row className='m-5'>
        <Col className='justify-content-center d-flex align-items-center'>
          <ListGroup>
            <ListGroup.Item>Username: { user.userSession.name }</ListGroup.Item>
            <ListGroup.Item>User email: { user.userSession.email }</ListGroup.Item>
            <ListGroup.Item>Age: { user.userSession.age || 'Empty' }</ListGroup.Item>
            <ListGroup.Item variant="info" action onClick={  () => { navigate('/user/cart') } }>Cart ID: { user.userSession.cart }</ListGroup.Item>
            <ListGroup.Item className='text-center' variant="danger" action onClick={  () => { logoutOnClick() } }>LOGOUT</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage