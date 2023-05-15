//  Render one product w/ details
//  Includes fn AddCheckoutButton, ProductCount

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import ProductCount from './ProductCount';
import { CartContext } from '../context/CartContext';

const ProductDetail = ( product ) => {

  const [checkoutButton, setCheckoutButton] = useState(false)

  const cartCtx = useContext(CartContext)
  
  const checkoutReady = (productCuantity) => {
    setCheckoutButton(true)
    cartCtx.addToCart(productCuantity, product)

    toast.success(`You added ${productCuantity} products to cart`, {
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
      <Row className='justify-content-center'>
        <Col sm={10} lg={6}>
          <Card className="text-center ProductDetailCard mx-1 my-4"> 
            <Card.Header>Best for: { product.category[0].toUpperCase() + product.category.substring(1) }</Card.Header>
            <Card.Img variant="top" src={ product.thumbnail[0] } />
            <Card.Body>
              <Card.Title>{ product.title }</Card.Title>
              <Card.Title>${ product.price }</Card.Title>
              <Row className='justify-content-center my-3'>
                <Col sm={10}>
                  <Card.Text>{ product.description }</Card.Text>
                </Col>
              </Row>
              { checkoutButton
               ?
                <Link to={'/cart'} className='text-decoration-none text-reset'><Button variant='outline-info'>Checkout</Button></Link>
               :
                <ProductCount stock={ product.stock } checkoutReady={ checkoutReady }/>
              }
            </Card.Body>
            <Card.Footer className="text-muted">{ product.stock } IN STOCK</Card.Footer>
          </Card>
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

export default ProductDetail