import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Pizza Palace</h5>
            <p className="mt-2">
              The best pizza in town, now delivered straight to your door!
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/menu">Menu</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com"><FaFacebook /></a>
              <a href="https://instagram.com"><FaInstagram /></a>
              <a href="https://twitter.com"><FaTwitter /></a>
            </div>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <Button variant="danger">Subscribe</Button>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Pizza Palace. All rights reserved.</p>
        </div>
      </Container>

      {/* Footer CSS */}
      <style>
        {`
          .footer {
            background: #333;
            color: white;
            padding: 40px 0;
          }

          .footer h5 {
            font-weight: 700;
            margin-bottom: 20px;
          }

          .footer-links {
            list-style: none;
            padding: 0;
          }

          .footer-links li {
            margin-bottom: 10px;
          }

          .footer-links a {
            color: white;
            text-decoration: none;
          }

          .footer-links a:hover {
            text-decoration: underline;
          }

          .social-icons {
            display: flex;
            gap: 15px;
            font-size: 1.5rem;
          }

          .social-icons a {
            color: white;
            transition: color 0.3s ease;
          }

          .social-icons a:hover {
            color: #ff4b2b;
          }

          .newsletter {
            display: flex;
            gap: 10px;
            margin-top: 20px;
          }

          .newsletter input {
            flex: 1;
            padding: 10px;
            border-radius: 5px;
            border: none;
          }

          .newsletter button {
            background: #ff4b2b;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 600;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;