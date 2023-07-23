import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useContext } from "react";

import NavWidget from './NavWidget';
import { UserContext } from '../../context/UserContext';


const NavBar = () => {
  const userCtx = useContext(UserContext);

  const userIsAdmin = () => {
    return <Link to="/admin/admin-1" className='text-decoration-none text-reset'>View all users</Link>
  }

  const userIsNotAdmin = () => {
    return(
      <NavDropdown title="Categories" id="basic-nav-dropdown">
        <div className="dropdown-item">
          <Link to="/work/1" className='text-decoration-none text-reset'>Work</Link>
        </div>
        <div className="dropdown-item">
          <Link to="/school/1" className='text-decoration-none text-reset'>School</Link>
        </div>
        <div className="dropdown-item">
          <Link to="/gaming/1" className='text-decoration-none text-reset'>Gaming</Link>
        </div>
        <div className="dropdown-item">
          <Link to="/everyday/1" className='text-decoration-none text-reset'>Everyday</Link>
        </div>
      </NavDropdown>
    )
  }

  return (
    <Navbar className="mx-1 justify-content-center" bg="light" expand="lg">
      <Container fluid className="mx-5">
        <Navbar.Brand href="">
            <Link to='/all/1'>
              <img
                alt="website brand"
                src="/logo.png"
                width="90"
                height="50"
                className="d-inline-block align-center"
              />
            </Link>
            <Link to='/all/1' className='text-decoration-none text-reset brand-text'>LaptopShopping.com</Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-3 me-auto align-items-center">
            { userCtx.userSession.role == 'admin' ? userIsAdmin() : userIsNotAdmin() }
          </Nav>
          <NavWidget/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;