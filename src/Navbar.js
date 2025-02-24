import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          🍕 BestPizza
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Collapsible Navigation */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {[
              { path: "/pizzas", name: "Pizza" },
              { path: "/side", name: "Side" },
              { path: "/dessert", name: "Dessert" },
              { path: "/drink", name: "Drink" },
              { path: "/checkout", name: "Checkout" },
            ].map((item, index) => (
              <Nav.Link key={index} as={Link} to={item.path} className="nav-link-custom">
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Ultimate CSS Magic ✨ */}
      <style>
        {`
          /* --------------------- */
          /* 🌟 Navbar Styling 🌟 */
          /* --------------------- */

          .custom-navbar {
            background: linear-gradient(90deg, #ff416c, #ff4b2b);
            padding: 15px 0;
            transition: all 0.3s ease-in-out;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0px 4px 15px rgba(255, 64, 91, 0.5);
          }

          /* 🍕 Brand Logo */
          .brand-logo {
            font-size: 2rem;
            font-weight: bold;
            color: #fff !important;
            text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
            transition: transform 0.3s ease-in-out;
          }

          .brand-logo:hover {
            transform: scale(1.1);
          }

          /* 🌈 Navbar Links */
          .nav-link-custom {
            position: relative;
            font-size: 1.2rem;
            font-weight: bold;
            color: white !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 15px;
            transition: all 0.3s ease-in-out;
          }

          /* 🛸 Neon Hover Effect */
          .nav-link-custom::before {
            content: "";
            position: absolute;
            bottom: -4px;
            left: 50%;
            width: 0;
            height: 3px;
            background: white;
            box-shadow: 0px 0px 8px white;
            transition: all 0.4s ease-in-out;
            transform: translateX(-50%);
          }

          .nav-link-custom:hover::before {
            width: 100%;
          }

          .nav-link-custom:hover {
            color: #ffd700 !important;
            text-shadow: 0px 0px 8px #ffd700;
          }

          /* 🎇 Glow Effect on Scroll */
          .custom-navbar.scrolled {
            background: rgba(0, 0, 0, 0.9);
            box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
    </Navbar>
  );
};

export default NavbarComponent;
