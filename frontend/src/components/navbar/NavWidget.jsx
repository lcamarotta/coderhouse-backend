import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart, MdMessage } from "react-icons/md";
import {  Navbar } from 'react-bootstrap';

import { CartContext } from "../../context/CartContext";
import { UserContext } from '../../context/UserContext';

const NavWidget = () => {
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);

  const cartIconLink = userCtx.userSession ? '/user/cart' : '/user/login';

  function showUsername() {
    return (
      <>
        <Link to="/user/profile" className='text-decoration-none me-2'>
          <Navbar.Text className='me-3 text-success'>{userCtx.userSession.name}</Navbar.Text>
        </Link>
        <Link to='/user/chat' className='me-3 text-decoration-none text-reset'><MdMessage size="2em"/></Link>
      </>
    )
  }
  
  function showLoginButton() {
    return (
      <Link to="/user/login" className='text-decoration-none mx-3'>Log in</Link>
      )
    }

  return (
    <div className="me-3">
      { userCtx.userSession ? showUsername() : showLoginButton() }
      <Link to={`${cartIconLink}`} className='text-decoration-none text-reset'>
      { userCtx.userSession.role == 'admin' ? <></> : <MdShoppingCart size="2em"/> }
      { userCtx.userSession ? <span className="ms-1">{ cartCtx.totalProducts() || '' }</span> : <></> }
      </Link>
    </div>
  )
}

export default NavWidget;