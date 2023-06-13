import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const PasswordChangePage = ({ changePassword, token }) => {
  const [flag, setFlag] = useState(true);

  const renderForm = () => {
    return(
    <Form onSubmit={formSubmit}>
      <Form.Group className="mb-3" controlId="formPassword1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Retype Password" />
      </Form.Group>
      <Form.Group className="mb-3 text-center">
        <Button variant="primary" type="submit">Change password</Button>
      </Form.Group>
    </Form>
    )
  }

  const renderButton = () => {
    return(
      <>
        <p>Password Changed</p>
        <Link to="/user/login"><Button variant='primary'>Login</Button></Link>
      </>
    )
  }


  const formSubmit = async(event) => {
    event.preventDefault()
    const pwd1 = String(formPassword1.value);
    const pwd2 = String(formPassword2.value);
    
    if(!(pwd1 === pwd2) || !pwd1 || !pwd2){
      toast.error(`Passwords do not match or empty`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    }

    const formData = {
      newPassword: pwd1
    }

    const response =  await changePassword(token, formData);
    if(response.status != 200){
      toast.error(`Error ${response.status}, ${response.response.payload}`, {
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
    else{
      toast.success(`Password changed`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFlag(false);
      return
    }
  }

  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col sm={6} className="m-3 text-center">
          { flag ? renderForm() : renderButton() }
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

export default PasswordChangePage