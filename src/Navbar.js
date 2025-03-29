import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaPizzaSlice } from "react-icons/fa";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    color: #ff4b2b;
    transform: translateY(-2px);
  }
`;

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <StyledNavbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaPizzaSlice className="me-2" />
          Pizza Heaven
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/pizzas">Pizza</StyledNavLink>
            <StyledNavLink to="/side">Side</StyledNavLink>
            <StyledNavLink to="/dessert">Dessert</StyledNavLink>
            <StyledNavLink to="/drink">Drink</StyledNavLink>
            <StyledNavLink to="/cart">Cart</StyledNavLink>
            {user?.role === "admin" && (
              <StyledNavLink to="/admin">Admin Dashboard</StyledNavLink>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <span className="nav-link text-light">
                  Welcome, {user.name}
                </span>
                <Button
                  variant="outline-light"
                  className="ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <StyledNavLink to="/login">Login</StyledNavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default NavbarComponent;