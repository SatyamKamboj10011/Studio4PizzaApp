import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { FaHeart, FaUsers, FaAward, FaPizzaSlice, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  return (
    <Container fluid className="p-0">
      {/* 🌟 Hero Section */}
      <div
        className="about-hero-section"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1950&auto=format&fit=crop')`,
        }}
      >
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            Discover the story behind the best pizza in the world! 🍕
          </p>
        </div>
      </div>

      {/* 🌟 Our Story Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              At Pizza Palace, we started with a simple dream: to create the most delicious, fresh,
              and authentic pizzas that bring people together. Founded in 2010 by two pizza
              enthusiasts, we’ve grown from a small family-owned shop to a beloved local chain.
              Every pizza we make is crafted with love, passion, and the finest ingredients.
            </p>
          </Col>
        </Row>
      </Container>

      {/* 🌟 Our Mission Section */}
      <div className="mission-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-text">
                Our mission is simple: to deliver happiness, one slice at a time. We believe in
                quality, authenticity, and creating unforgettable experiences for our customers.
                Whether it’s a family dinner, a party, or a quick bite, we’re here to make every
                moment special.
              </p>
            </Col>
          </Row>
        </Container>
      </div>


      {/* 🌟 Our Values Section */}
      <div className="values-section">
        <Container>
          <h2 className="text-center section-title">Our Values</h2>
          <Row className="justify-content-center g-4">
            {[ 
              {
                icon: <FaHeart size={40} />,
                title: "Passion",
                description: "We pour our heart into every pizza we make.",
              },
              {
                icon: <FaUsers size={40} />,
                title: "Community",
                description: "We believe in bringing people together through food.",
              },
              {
                icon: <FaAward size={40} />,
                title: "Excellence",
                description: "We strive for perfection in every detail.",
              },
              {
                icon: <FaPizzaSlice size={40} />,
                title: "Quality",
                description: "Only the freshest ingredients make it to your plate.",
              },
            ].map((value, index) => (
              <Col key={index} md={3} className="text-center">
                <div className="value-icon">{value.icon}</div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-description">{value.description}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* 🌟 Call to Action */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="section-title">Join Us in the Pizza Revolution!</h2>
            <p className="section-text">
              Experience the best pizza delivered straight to your door. Order now and taste the difference!
            </p>
            <Button href="/pizzas" className="cta-button">Order Now 🚀</Button>
          </Col>
        </Row>
      </Container>

   


      {/* ✨ Ultimate CSS Magic */}
      <style>
        {`
          /* 🌟 Hero Section */
          .about-hero-section {
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

          .about-hero-content {
            position: relative;
            z-index: 2;
          }

          .about-hero-title {
            font-size: 4.5rem;
            font-weight: 700;
            letter-spacing: 2px;
            font-family: 'Playfair Display', serif;
            animation: fadeInUp 1s ease-in-out;
          }

          .about-hero-subtitle {
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

          .section-text {
            font-size: 1.1rem;
            font-family: 'Poppins', sans-serif;
            color: #555;
            line-height: 1.8;
          }

          /* 🌟 Mission Section */
          .mission-section {
            background: #f8f9fa;
            padding: 60px 0;
          }

          /* 🌟 Team Section */
          .team-card {
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            background: white;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
          }

          .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
          }

          .team-img {
            height: 250px;
            object-fit: cover;
          }

          .team-name {
            font-size: 1.5rem;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            color: #333;
          }

          .team-role {
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            color: #555;
          }

          /* 🌟 Values Section */
          .values-section {
            background: #ff4b2b;
            color: white;
            padding: 60px 0;
          }

          .value-icon {
            margin-bottom: 20px;
          }

          .value-title {
            font-size: 1.5rem;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            margin-bottom: 10px;
          }

          .value-description {
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
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

export default AboutUs;
