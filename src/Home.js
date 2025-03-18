import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <Container fluid className="p-0">
      {/* 🌟 Hero Section */}
      <Carousel fade controls={false} indicators={false} interval={3000}>
        {[
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1950&auto=format&fit=crop",
        ].map((image, index) => (
          <Carousel.Item key={index}>
            <div
              className="hero-section"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="hero-content">
                <h1 className="hero-title">The Best Pizza in the World! 🍕🔥</h1>
                <p className="hero-subtitle">
                  Savor the perfect blend of flavors and freshness in every bite!
                </p>
                <Link to="/pizzas">
                  <Button className="hero-button">Order Now 🚀</Button>
                </Link>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* 🌟 Featured Deals Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5 feature-section-title">Special Offers</h2>
        <Row className="justify-content-center">
          {[
            {
              title: "Buy 1 Get 1 Free 🍕",
              text: "Grab our special combo and enjoy two delicious pizzas for the price of one!",
              image: "https://images.unsplash.com/photo-1544395676-https://img.freepik.com/premium-psd/buy-1-get-1-free-pizza-fast-food-restaurant-promotion-social-media-template_723663-98.jpg",
            },
            {
              title: "Family Combo 🍕🍕🍕",
              text: "Perfect for family dinners with our special family-sized pizzas!",
              image: "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "30 Min Delivery Guarantee ⚡",
              text: "Hot pizza delivered to your door in 30 minutes or less!",
              image: "https://images.unsplash.com/photo-1610886147082-2f8dfa0c1f1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzdCUyMGRlbGl2ZXJ5fGVufDB8fDB8fHww",
            },
          ].map((feature, index) => (
            <Col key={index} md={4} className="d-flex align-items-stretch mb-4">
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

      {/* 🌟 Testimonials Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5 feature-section-title">What Our Customers Say</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Carousel className="testimonial-carousel">
              {[
                {
                  quote: "The best pizza I’ve ever had! Fresh, hot, and always delicious!",
                  author: "Sarah J.",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                  quote: "Lightning-fast delivery and amazing quality. Highly recommend!",
                  author: "Mark P.",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                  quote: "I love the family combos. The kids can’t get enough!",
                  author: "Emily L.",
                  image: "https://randomuser.me/api/portraits/women/12.jpg",
                },
              ].map((testimonial, index) => (
                <Carousel.Item key={index}>
                  <div className="testimonial">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="testimonial-img"
                    />
                    <blockquote>{testimonial.quote}</blockquote>
                    <footer>- {testimonial.author}</footer>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>

      {/* ✨ Ultimate CSS Magic */}
      <style>
        {`
          /* 🌟 Hero Section */
          .hero-section {
            background-size: cover;
            background-position: center;
            color: white;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
            padding: 150px 20px;
            text-align: center;
            min-height: 85vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .hero-content {
            position: relative;
            z-index: 2;
          }

          .hero-title {
            font-size: 4.5rem;
            font-weight: 700;
            letter-spacing: 2px;
            font-family: 'Playfair Display', serif;
            animation: fadeInUp 1s ease-in-out;
          }

          .hero-subtitle {
            font-size: 1.5rem;
            font-weight: 400;
            font-family: 'Poppins', sans-serif;
            max-width: 600px;
            margin: 20px auto;
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
            animation: fadeInUp 1.4s ease-in-out;
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
            background: white;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
          }

          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
          }

          .feature-img {
            height: 220px;
            object-fit: cover;
          }

          .feature-title {
            font-weight: 700;
            font-size: 1.5rem;
            font-family: 'Playfair Display', serif;
            color: #333;
          }

          .feature-text {
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            color: #555;
          }

          /* 🌟 Testimonials Section */
          .testimonial {
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 12px;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
          }

          .testimonial-img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 15px;
          }

          .testimonial blockquote {
            font-size: 1.2rem;
            font-family: 'Poppins', sans-serif;
            color: #555;
            font-style: italic;
          }

          .testimonial footer {
            font-size: 1rem;
            font-weight: 600;
            color: #333;
          }
        `}
      </style>
    </Container>
  );
};

export default Home;