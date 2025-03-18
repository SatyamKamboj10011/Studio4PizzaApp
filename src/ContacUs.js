import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  return (
    <Container fluid className="p-0">
      {/* 🌟 Hero Section */}
      <div
        className="contact-hero-section"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We’d love to hear from you! Reach out for any questions or feedback. 🍕
          </p>
        </div>
      </div>

      {/* 🌟 Contact Form and Details Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          {/* Contact Form */}
          <Col md={6} className="mb-4">
            <h2 className="section-title">Send Us a Message</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter your message" required />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </Col>

          {/* Contact Details */}
          <Col md={6}>
            <h2 className="section-title">Our Contact Information</h2>
            <div className="contact-details">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h5>Address</h5>
                  <p>123 Pizza Street, Food City, FC 12345</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h5>Phone</h5>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h5>Email</h5>
                  <p>info@pizzapalace.com</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-icons mt-4">
              <a href="https://facebook.com" className="social-link">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" className="social-link">
                <FaTwitter />
              </a>
            </div>

            {/* Map */}
            <div className="mt-4">
              <iframe
                title="Pizza Palace Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a2b6a43f1!2sPizza%20Palace!5e0!3m2!1sen!2sus!4v1622549400000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>


      {/* ✨ Ultimate CSS Magic */}
      <style>
        {`
          /* 🌟 Hero Section */
          .contact-hero-section {
            background-size: cover;
            background-position: center;
            color: white;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
            padding: 150px 20px;
            text-align: center;
            min-height: 60vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .contact-hero-content {
            position: relative;
            z-index: 2;
          }

          .contact-hero-title {
            font-size: 4.5rem;
            font-weight: 700;
            letter-spacing: 2px;
            font-family: 'Playfair Display', serif;
            animation: fadeInUp 1s ease-in-out;
          }

          .contact-hero-subtitle {
            font-size: 1.5rem;
            font-weight: 400;
            font-family: 'Poppins', sans-serif;
            max-width: 600px;
            margin: 20px auto;
            animation: fadeInUp 1.2s ease-in-out;
          }

          /* 🌟 Sections */
          .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            color: #333;
            margin-bottom: 20px;
          }

          /* 🌟 Contact Form */
          .form-control {
            border-radius: 10px;
            padding: 12px;
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
          }

          .form-control:focus {
            border-color: #ff4b2b;
            box-shadow: 0 0 0 0.2rem rgba(255, 75, 43, 0.25);
          }

          /* 🌟 Contact Details */
          .contact-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          }

          .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }

          .contact-icon {
            font-size: 1.5rem;
            color: #ff4b2b;
            margin-right: 15px;
          }

          .contact-item h5 {
            font-size: 1.2rem;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            color: #333;
          }

          .contact-item p {
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            color: #555;
            margin: 0;
          }

          /* 🌟 Social Icons */
          .social-icons {
            display: flex;
            gap: 15px;
            font-size: 1.5rem;
          }

          .social-link {
            color: #333;
            transition: color 0.3s ease;
          }

          .social-link:hover {
            color: #ff4b2b;
          }

          /* 🌟 Footer */
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

          /* ✨ Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Container>
  );
};

export default ContactUs;