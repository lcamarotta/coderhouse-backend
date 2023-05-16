import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import {  Navbar } from 'react-bootstrap';

import { CartContext } from "../context/CartContext";
import { UserContext } from '../context/UserContext';

const NavWidget = () => {
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);

  const cartIconLink = userCtx.userSession ? '/cart' : '/loginpage';

  function showUsername() {
    return (
      <Navbar.Text className='me-3 text-success'>Welcome {userCtx.userSession.name}</Navbar.Text>
    )
  }

  function showLoginButton() {
    return (
      <Link to="/loginpage" className='text-decoration-none mx-3'>Log in</Link>
    )
  }
  
  return (
    <div className="me-3">
      { userCtx.userSession ? showUsername() : showLoginButton() }
      <Link to={`${cartIconLink}`} className='text-decoration-none text-reset'>
      <MdShoppingCart size="2em"/>
      <span className="ms-1">{ cartCtx.totalProducts() || '' }</span>
      </Link>
    </div>
  )
}

export default NavWidget;