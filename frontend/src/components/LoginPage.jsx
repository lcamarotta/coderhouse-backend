import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

import { emailLogin } from '../utils/fetchAPI';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {

  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const formSubmit = async(event) => {
    event.preventDefault()
    
    const formData = {
      email: formEmail.value,
      password: formPassword.value
    }
    const response =  await emailLogin(formData);

    if(response.ok == false){
      const error = response.status == 401 ? 'bad username or password' : 'unknown';
      toast.error(`Error ${error}`, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    else{
      toast.success(`Logged in as ${response.name}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      userCtx.setUserSession(response);
      setTimeout( () => {
        navigate('/all/1')
      }, 3000)
    }
  }

  return (
    <Container className='mt-5'>
        <Row className="justify-content-center">
          <Col sm={6}>

            <Form onSubmit={formSubmit}>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3 text-center">
                <Button variant="primary" type="submit">Log In</Button>
              </Form.Group>

            </Form>
        </Col>
      </Row>

      <Row className="my-3 justify-content-center">
          <Col sm={3} className='text-center my-1'>
                <a href='http://localhost:8080/api/sessions/github' className='text-decoration-none text-reset'>
                  <Button variant='outline-info'>GitHub Log In</Button>
                </a>
          </Col>
          <Col sm={3} className='text-center m-1'>                
            <Link to={'/registerpage'} className='text-decoration-none text-reset'>
              <Button variant='outline-info'>Sign up here!</Button>
            </Link>
          </Col>
        </Row>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </Container>
  );

}

export default LoginPage