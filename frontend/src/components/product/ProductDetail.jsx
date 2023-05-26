//  Render one product w/ details
//  Includes fn AddCheckoutButton, ProductCount

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import ProductCount from './ProductCount';
import ProductImageSlide from './ProductImageSlide';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';

const ProductDetail = ( product ) => {
  
  const [productWasAddedToCart, setProductWasAddedToCart] = useState(false)
  
  const cartCtx = useContext(CartContext)
  const userCtx = useContext(UserContext)
  
  
  const addToCartButton = (productQuantity) => {
    cartCtx.addToCart(productQuantity, product)
    setProductWasAddedToCart(true)
    toast.success(`You added ${productQuantity} products to cart`, {
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
  
  const userIsNotLoggedButton = <Link to={'/user/login'} className='text-decoration-none text-reset'><Button variant='outline-info'>Log In!</Button></Link>;
  const userIsLoggedButton = <ProductCount stock={ product.stock } addToCartButton={ addToCartButton }/>;

  const conditionalButton = userCtx.isUserLogged ? userIsLoggedButton : userIsNotLoggedButton;
  
  const checkoutButton = <>
    <Link to={'/user/cart'} className='text-decoration-none text-reset mx-1'><Button variant='outline-info'>Checkout</Button></Link>
    <Link to={'/all/1'} className='text-decoration-none text-reset mx-1'><Button variant='outline-success'>Home</Button></Link>
  </>;

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col sm={10} lg={6}>
          <Card className="text-center ProductDetailCard mx-1 my-4"> 
            <Card.Header>Best for: { product.category[0].toUpperCase() + product.category.substring(1) }</Card.Header>
            <ProductImageSlide imgUrlArray={product.thumbnail}/>
            <Card.Body>
              <Card.Title>{ product.title }</Card.Title>
              <Card.Title>${ product.price }</Card.Title>
              <Row className='justify-content-center my-3'>
                <Col sm={10}>
                  <Card.Text>{ product.description }</Card.Text>
                </Col>
              </Row>
              { productWasAddedToCart ? checkoutButton : conditionalButton }
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