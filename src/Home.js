import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./Navbar"; // Import Navbar

const Home = () => {
  return (
    <Container fluid className="p-0">
      <CustomNavbar /> {/* Navbar */}

      {/* 🌟 Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">The Best Pizza in the World! 🍕🔥</h1>
        <p className="hero-subtitle">Savor the perfect blend of flavors and freshness in every bite!</p>
        <Link to="/pizza">
          <Button className="hero-button">Order Now 🚀</Button>
        </Link>
      </div>

      {/* 🌟 Features Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          {[
            {
              title: "Authentic Italian Taste",
              text: "Crafted with the finest ingredients and baked to perfection.",
              image: "https://images.unsplash.com/photo-1621702379146-3c084cb0bfaa?q=80&w=2070&auto=format&fit=crop",
            },
            {
              title: "World-Class Chefs",
              text: "Our chefs ensure every pizza is an exquisite masterpiece.",
              image: "https://plus.unsplash.com/premium_photo-1661288474987-1e90159ff2ca?q=80&w=2070&auto=format&fit=crop",
            },
            {
              title: "Lightning-Fast Delivery",
              text: "Your pizza, hot and fresh, delivered in 30 minutes!",
              image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&auto=format&fit=crop&q=60",
            },
          ].map((feature, index) => (
            <Col key={index} md={4} className="d-flex align-items-stretch">
              <Card className="feature-card">
                <Card.Img variant="top" src={feature.image} className="feature-img" />
                <Card.Body>
                  <Card.Title className="feature-title">{feature.title}</Card.Title>
                  <Card.Text className="feature-text">{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 🌟 Footer */}
      <footer className="footer">
        <p className="footer-text">🔥 Taste the Best, Love the Rest! 🔥</p>
        <p>&copy; {new Date().getFullYear()} The Best Pizza. All rights reserved.</p>
      </footer>

      {/* ✨ Ultimate CSS Magic */}
      <style>
        {`
          /* 🌟 Hero Section */
          .hero-section {
            background: url('https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?q=80&w=1974&auto=format&fit=crop') no-repeat center/cover;
            color: white;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
            padding: 150px 20px;
            text-align: center;
            min-height: 85vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .hero-title {
            font-size: 3.8rem;
            font-weight: 700;
            letter-spacing: 2px;
            font-family: 'Playfair Display', serif;
            animation: fadeInUp 1s ease-in-out;
          }

          .hero-subtitle {
            font-size: 1.3rem;
            font-weight: 400;
            font-family: 'Poppins', sans-serif;
            max-width: 600px;
            margin: 10px auto;
            animation: fadeInUp 1.2s ease-in-out;
          }

          .hero-button {
            background: #ff4b2b;
            border: none;
            padding: 14px 32px;
            font-size: 1.2rem;
            font-weight: 600;
            border-radius: 30px;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            font-family: 'Poppins', sans-serif;
          }

          .hero-button:hover {
            transform: scale(1.1);
            box-shadow: 0px 0px 15px rgba(255, 75, 43, 0.8);
          }

          /* 🌟 Features Section */
          .feature-card {
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: none;
            color: black;
            text-align: center;
          }

          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.2);
          }

          .feature-img {
            height: 220px;
            object-fit: cover;
          }

          .feature-title {
            font-weight: 700;
            font-size: 1.5rem;
            font-family: 'Playfair Display', serif;
          }

          .feature-text {
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            color: #333;
          }

          /* 🌟 Footer */
          .footer {
            background: linear-gradient(90deg, #ff416c, #ff4b2b);
            color: white;
            text-align: center;
            padding: 25px;
            margin-top: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
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

export default Home;
