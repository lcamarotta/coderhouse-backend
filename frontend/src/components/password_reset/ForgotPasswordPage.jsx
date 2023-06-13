import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const ForgotPasswordPage = ({ requestPasswordChange }) => {
  const [flag, setFlag] = useState(true);

  const renderForm = () => {
    return(
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Button variant="primary" type="submit">Request Password Change</Button>
        </Form.Group>
      </Form>
    )
  }

  const renderButton = () => {
    return(
      <div>
        <p>Request Sent - Check email</p>
        <Link to="/all/1"><Button variant='primary'>Home</Button></Link>
      </div>
    )
  }

  const formSubmit = async(event) => {
    event.preventDefault()
    if(!formEmail.value) return;

    const response = await requestPasswordChange(formEmail.value);
    if(response.status != 200){
      toast.error(`Email already sent`, {
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
      toast.success(`Check your email`, {
        position: "top-right",
        autoClose: 15000,
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

export default ForgotPasswordPage