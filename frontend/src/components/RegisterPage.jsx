import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import { registerUser } from '../utils/fetchAPI';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const formSubmit = async(event) => {
    event.preventDefault()
    
    const formData = {
      first_name: formFirstname.value,
      last_name: formLastname.value,
      age: formAge.value,
      email: formEmail.value,
      password: formPassword.value
    }

    if(!formFirstname.value || !formLastname.value || !formAge.value || !formEmail.value || !formPassword.value){
      toast.info(`Please complete all fields`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    return
    }

    const response =  await registerUser(formData);
    if(response.ok == false){
      toast.warning(`email already registered?`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else{
      toast.success(`User Registered, Now Log In`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout( () => {
        navigate('/loginpage')
      }, 5000)
    }
  }

  return (
    <Container className='mt-5'> <ToastContainer
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
        <Row className="justify-content-center">
          <Col sm={6}>

            <Form onSubmit={formSubmit}>

              <Form.Group className="mb-3" controlId="formFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" placeholder="Firstname" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" placeholder="Lastname" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Age" />
              </Form.Group>

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
                <Button variant="primary" type="submit">Sign Up</Button>
              </Form.Group>

            </Form>
        </Col>
      </Row>

      <Row className="my-3 justify-content-center">
          <Col sm={3} className='text-center my-1'>
                <Link to={'/loginpage'} className='text-decoration-none text-reset'>
                  <Button variant='outline-info'>Log In instead</Button>
                </Link>
          </Col>
        </Row>
    </Container>
  );

}

export default LoginPage