import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <Container fluid className="p-0">
      {/* Fixed image URL */}
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

      {/* Fixed featured deals image URL */}
      <Container className="my-5">
        <h2 className="text-center mb-5 feature-section-title">Special Offers</h2>
        <Row className="justify-content-center">
          {[
            {
              title: "Buy 1 Get 1 Free 🍕",
              text: "Grab our special combo and enjoy two delicious pizzas for the price of one!",
              image: "https://img.freepik.com/premium-psd/buy-1-get-1-free-pizza-fast-food-restaurant-promotion-social-media-template_723663-98.jpg",
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

      {/* Rest of the code remains the same */}
      {/* ... */} 
    </Container>
  );
};

export default Home;