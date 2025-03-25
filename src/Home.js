import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import { FaFire, FaStar, FaClock, FaShoppingCart, FaQuoteLeft } from "react-icons/fa";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

// Styled Components
const HeroOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const CarouselCaptionStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-top: 10px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const HeroButton = styled(Button)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  border: none;
  padding: 12px 28px;
  font-weight: bold;
  border-radius: 30px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(255, 75, 43, 0.3);
  }
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  &::after {
    content: "";
    width: 80px;
    height: 4px;
    background: #ff4b2b;
    display: block;
    margin: 10px auto 0;
    border-radius: 2px;
  }
`;

const FeatureCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

const WhyCard = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
`;

const CallToAction = styled.div`
  background: linear-gradient(135deg, #ff4b2b, #ff416c);
  padding: 60px 20px;
  text-align: center;
  color: white;
`;

const Home = () => {
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80",
      title: "Artisan Pizzas Crafted with Love",
      subtitle: "Hand-tossed dough, premium ingredients, and authentic flavors"
    },
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80",
      title: "The Perfect Blend of Flavors",
      subtitle: "Discover our signature recipes passed down for generations"
    },
    {
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80",
      title: "Fresh From Our Wood-Fired Oven",
      subtitle: "Crispy crust with the perfect char - just like Naples!"
    }
  ];

  const offers = [
    {
      title: "Buy 1 Get 1 Free",
      text: "Enjoy two delicious pizzas for the price of one!",
      image: "https://img.freepik.com/premium-psd/buy-1-get-1-free-pizza-fast-food-restaurant-promotion-social-media-template_723663-98.jpg",
      icon: <FaFire className="text-danger" />
    },
    {
      title: "Family Feast Deal",
      text: "Two large pizzas, garlic bread, and drinks - perfect for family night!",
      image: "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80",
      icon: <FaStar className="text-warning" />
    },
    {
      title: "30-Minute Guarantee",
      text: "Hot pizza delivered in 30 minutes or it's free!*",
      image: "https://images.unsplash.com/photo-1610886147082-2f8dfa0c1f1b?w=600",
      icon: <FaClock className="text-primary" />
    }
  ];

  const whyChoose = [
    { title: "Premium Ingredients", text: "Only the freshest, highest quality ingredients", icon: "🥬" },
    { title: "Handcrafted Dough", text: "Made fresh daily and hand-tossed", icon: "👨‍🍳" },
    { title: "Fast Delivery", text: "Hot, fresh pizza delivered fast", icon: "⚡" },
    { title: "Family Recipes", text: "Authentic recipes passed down generations", icon: "👪" },
    { title: "Eco-Friendly", text: "Sustainable packaging, local sources", icon: "🌱" },
    { title: "24/7 Support", text: "We're always ready to take your order", icon: "📞" }
  ];

  const testimonials = [
    {
      name: "Aarav Sharma",
      quote: "Best pizza I've ever had! Fresh, hot, and full of flavor. Delivery was super fast too!",
      location: "Auckland"
    },
    {
      name: "Emily Walker",
      quote: "Their family deal is amazing and the crust is perfect every time. Highly recommended!",
      location: "Wellington"
    },
    {
      name: "Liam Patel",
      quote: "Love the eco-friendly packaging and amazing customer support. Go Pizza Paradise!",
      location: "Christchurch"
    }
  ];

  const bestSellers = [
    { name: "Margherita Supreme", img: "https://images.unsplash.com/photo-1585238342028-4bd06167b784?q=80" },
    { name: "Spicy Chicken Inferno", img: "https://images.unsplash.com/photo-1601925261345-4b3ba3fda8df?q=80" },
    { name: "Cheesy Garlic Bread", img: "https://images.unsplash.com/photo-1601059482077-43f4825a05bb?q=80" }
  ];

  return (
    <Container fluid className="p-0">
      {/* Hero Carousel */}
      <Carousel fade indicators={false} controls={false} interval={5000}>
        {heroSlides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div style={{ height: "90vh", backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
              <HeroOverlay />
              <CarouselCaptionStyled>
                <HeroTitle>{slide.title}</HeroTitle>
                <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
                <Link to="/menu">
                  <HeroButton>
                    Order Now <FaShoppingCart className="ms-2" />
                  </HeroButton>
                </Link>
              </CarouselCaptionStyled>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Special Offers */}
      <Container className="py-5">
        <SectionTitle>Today's Special Offers</SectionTitle>
        <Row className="g-4">
          {offers.map((offer, i) => (
            <Col lg={4} md={6} key={i}>
              <FeatureCard>
                <Card.Img variant="top" src={offer.image} />
                <Card.Body>
                  <Card.Title className="d-flex align-items-center gap-2">{offer.icon} {offer.title}</Card.Title>
                  <Card.Text>{offer.text}</Card.Text>
                  <Button variant="outline-danger" className="mt-3">Claim Offer</Button>
                </Card.Body>
              </FeatureCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Why Choose Us */}
      <Container fluid className="bg-light py-5">
        <Container>
          <SectionTitle>Why Choose Pizza Paradise?</SectionTitle>
          <Row className="g-4">
            {whyChoose.map((item, i) => (
              <Col md={4} key={i}>
                <WhyCard>
                  <div className="display-4 mb-3">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </WhyCard>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      {/* Best Sellers */}
      <Container className="py-5">
        <SectionTitle>Best Sellers</SectionTitle>
        <Carousel indicators={false} interval={3500}>
          {bestSellers.map((item, i) => (
            <Carousel.Item key={i}>
              <Row className="justify-content-center">
                <Col md={6} className="text-center">
                  <img src={item.img} className="img-fluid rounded" alt={item.name} />
                  <h3 className="mt-3">{item.name}</h3>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Testimonials */}
      <Container fluid className="bg-light py-5">
        <Container>
          <SectionTitle>What Our Customers Say</SectionTitle>
          <Row className="g-4">
            {testimonials.map((testi, i) => (
              <Col md={4} key={i}>
                <TestimonialCard>
                  <FaQuoteLeft className="mb-3 text-danger fs-3" />
                  <p>"{testi.quote}"</p>
                  <h5 className="mt-3">{testi.name}</h5>
                  <small className="text-muted">{testi.location}</small>
                </TestimonialCard>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      {/* CTA Banner */}
      <CallToAction>
        <h2 className="fw-bold mb-3">Hungry Yet?</h2>
        <p className="mb-4">Order your favorite pizza now and get it delivered hot and fresh!</p>
        <Link to="/menu">
          <HeroButton>Browse Menu</HeroButton>
        </Link>
      </CallToAction>
    </Container>
  );
};

export default Home;
