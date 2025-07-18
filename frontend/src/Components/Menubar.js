import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Css/Menubar.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../Assets/Images/logo.png";
import { useContextData } from "../Common/Context";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

function Menubar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { cart, handleSearch } = useContextData();
  const { user, logout } = useContext(AuthContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavbarToggle = () => {
    // Toggle the navbar open/close
    setExpanded((prevState) => !prevState);
  };

  const handleNavLinkClick = () => {
    // Close the navbar when a NavLink is clicked
    setExpanded(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.search.value;
    if (searchInput.trim()) {
      handleSearch(searchInput);
      navigate("/search");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setExpanded(false);
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" expanded={expanded}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img
              src={logo}
              alt="logo"
              width="40"
              height="40"
              className="d-inline-block align-top"
              style={{ marginRight: "10px" }}
            />
            GADGET<span>GROTTO</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavbarToggle}
            className="navbar-toggler"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <div className="navbar-right d-flex align-items-center ms-auto">
              <Nav className="nav-links">
                <NavLink
                  to="/"
                  className="navelement"
                  onClick={handleNavLinkClick}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/aboutus"
                  className="navelement"
                  onClick={handleNavLinkClick}
                >
                  About
                </NavLink>

                <NavDropdown
                  title="Products"
                  id="products-dropdown"
                  className="navelement custom-dropdown"
                >
                  <div className="dropdown-grid">
                    <div>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Powerbanks"
                        onClick={handleNavLinkClick}
                      >
                        PowerBank
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Bluetooth_Speaker"
                        onClick={handleNavLinkClick}
                      >
                        Bluetooth Speakers
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Fitness_Bands"
                        onClick={handleNavLinkClick}
                      >
                        Fitness Bands
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Phone_Cases & Covers"
                        onClick={handleNavLinkClick}
                      >
                        Phone Cases & Covers
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Gaming_Headsets"
                        onClick={handleNavLinkClick}
                      >
                        Gaming Headsets
                      </NavDropdown.Item>
                    </div>
                    <div>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Earbuds"
                        onClick={handleNavLinkClick}
                      >
                        EarBuds
                      </NavDropdown.Item>

                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Drone_Cameras"
                        onClick={handleNavLinkClick}
                      >
                        Drone Cameras
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Hard_Drives & SSDs"
                        onClick={handleNavLinkClick}
                      >
                        Hard Drives & SSDs
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Mobile_Skins"
                        onClick={handleNavLinkClick}
                      >
                        Mobile Skins
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={Link} 
                        to="/products/Charging_Cables"
                        onClick={handleNavLinkClick}
                      >
                        Charging Cables
                      </NavDropdown.Item>
                    </div>
                  </div>
                </NavDropdown>

                <NavLink
                  to="/contactus"
                  className="navelement"
                  onClick={handleNavLinkClick}
                >
                  Contact Us
                </NavLink>

                <NavLink
                  to="/addtocart"
                  className="navelement cart-icon position-relative"
                  onClick={handleNavLinkClick}
                >
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </Nav>

              {/* Search Bar */}
              <form className="search-form d-flex mx-3" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  className="form-control search-input"
                />
                <Button 
                  type="submit" 
                  variant="outline-info" 
                  className="ms-2"
                  style={{
                    background: 'linear-gradient(135deg, #00FFE5 0%, #7B5CFF 100%)',
                    border: 'none',
                    color: '#fff'
                  }}
                >
                  Search
                </Button>
              </form>

              {/* User Profile or Login Button */}
              {user ? (
                <NavDropdown
                  title={
                    <span className="d-flex align-items-center">
                      <img
                        src={user.image && (user.image.startsWith('http') ? user.image : `http://localhost:5000/${user.image}`) || '/default-avatar.png'}
                        alt="Profile"
                        className="navbar-profile-img me-2"
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00FFE5', background: '#222' }}
                        onError={e => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                      />
                      {user.name}
                    </span>
                  }
                  id="user-dropdown"
                  className="user-dropdown"
                >
                  <div className="dropdown-user-info" style={{ padding: '16px 24px', textAlign: 'center', minWidth: 220 }}>
                    <img
                      src={user.image && (user.image.startsWith('http') ? user.image : `http://localhost:5000/${user.image}`) || '/default-avatar.png'}
                      alt="Profile"
                      className="navbar-profile-img mb-2"
                      style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00FFE5', background: '#222' }}
                      onError={e => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                    />
                    <div style={{ color: '#00FFE5', fontWeight: 600, fontSize: '1.1rem', marginTop: 8 }}>{user.name}</div>
                    <div style={{ color: '#B0B0B8', fontSize: '0.95rem', marginBottom: 8 }}>{user.email}</div>
                  </div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/orders" style={{ textAlign: 'center', color: '#00FFE5', fontWeight: 500 }}>
                    My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout} style={{ textAlign: 'center', color: '#FF3B5B', fontWeight: 500 }}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="login-btn btn btn-outline-info" onClick={handleNavLinkClick}>
                  Login
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menubar;
