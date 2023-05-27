import { Col, Container, Row, ListGroup, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"

const CartPage = ({ user, cart }) => {
  const navigate = useNavigate();

  const checkout = async() => {
    if(cart.totalProducts() == 0) {
      toast.warning(`Cart is empty`, {
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

    toast.info(`Sending order...`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const result = await cart.checkout();
    
    if(result == -1){
      toast.error(`Out of Stock`, {
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

    await cart.setCartFromAPI(cart.userCartId);
    navigate(`/user/orders`);
  }

  const remove = (productToDelete) => {
    if (productToDelete === 'all'){
      cart.deleteAll()
      toast.warning(`Cart emptied`, {
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
    cart.deleteProduct(productToDelete)
    toast.warning(`Item removed from cart`, {
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
  
	return (
    <Container fluid>
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
      <Row className='m-5'>
        <Col className='justify-content-center d-flex align-items-center'>
          <ListGroup>
            <ListGroup.Item>Name: { user.name }</ListGroup.Item>
            <ListGroup.Item>Email: { user.email }</ListGroup.Item>
            <ListGroup.Item variant="info">Cart ID: { user.cart }</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-lg-8 col-xl-6">
        {
          cart.cartProducts.map( item =>
            <Card className="mx-1 my-3" key={item._id}>
              <Row className="g-0 text-center align-items-center">
                <Col className="col-md-4">
                  <Card.Img className="img-fluid" src={item.product.thumbnail[0]} />
                </Col>
                <Col className="col-md-6">
                  <Card.Body>
                    <Card.Title>{item.product.title}</Card.Title>
                    <Card.Title className="mt-4">{item.quantity} x ${item.product.price} = ${cart.thisProductTotalPrice(item)}</Card.Title>
                  </Card.Body>
                </Col>
                <Col className="col-md-2">
                  <Button variant="outline-danger" onClick={() => remove( item )}>Remove</Button>
                </Col>
              </Row>
            </Card>
          )
        }
          <Card className="mx-1 my-3">
            <Card.Title className="text-end mx-4 my-3">Total amount: ${ cart.totalPrice() } </Card.Title>
            <Button className="my-2 mx-5" variant="success" onClick={() => checkout()}>Send Order</Button>
            <Button className="my-2 mx-5" variant="info" onClick={() => navigate('/user/orders')}>View Orders</Button>
            <Button className="my-2 mx-5" variant="outline-danger" onClick={() => remove('all')}>Remove all items</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartPage