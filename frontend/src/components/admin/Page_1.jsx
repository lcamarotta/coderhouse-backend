import { useEffect, useState } from 'react';
import { Col, Container, Row, ListGroup, Card } from 'react-bootstrap';

const Page_1 = ({ getAllUsers, changeRole, deleteUser }) => {
	const [allUsers, setAllUsers] = useState([]);
	const [reload, setReload] = useState(false);
  
  useEffect(() => {
    async function fetchUsers() {
        setAllUsers(await getAllUsers());
    }
    fetchUsers();
  }, [reload])

  function render(user, index) {
    if(allUsers.length == 0) return <p className='text-center m-5'>No users</p>
    return (
      <Row className="text-center align-items-center justify-content-center" key={index}>
        <Col className='col-lg-4'>
          <Card className="mx-1 my-3">
            <ListGroup>
              <ListGroup.Item>Username: { user.first_name + ' ' +user.last_name }</ListGroup.Item>
              <ListGroup.Item>User email: { user.email }</ListGroup.Item>
              <ListGroup.Item>Role: { user.role || 'Empty' }</ListGroup.Item>
              <ListGroup.Item className='text-center' variant="info" action onClick={  async() => { await changeRole(user._id); setReload(!reload) } }>Change role</ListGroup.Item>
              <ListGroup.Item className='text-center' variant="danger" action onClick={  async() => { await deleteUser(user.email); setReload(!reload) } }>DELETE</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
  }

	return (
    <Container>
        {
          allUsers.map( (user, index) => render(user, index))
        }
    </Container>
  )
}

export default Page_1