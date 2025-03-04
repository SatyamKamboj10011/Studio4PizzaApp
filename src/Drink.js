import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const drinks = [
  {
    id: 1,
    name: "Coca Cola",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 2,
    name: "Pepsi",
    image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 3,
    name: "Mirinda",
    image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 4,
    name: "Red Bull",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 5,
    name: "Monster",
    image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 6,
    name: "Fanta",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 7,
    name: "Nimbooz",
    image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 8,
    name: "Coke Zero Sugar",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 9,
    name: "Sprite",
    image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
  {
    id: 10,
    name: "L&P",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 3.5,
  },
];

const DrinkMenu = () => {
  const [cart, setCart] = useState({});

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[id] || 0) + delta;
      if (newQuantity < 0) return prevCart; // Prevent negative quantity
      return { ...prevCart, [id]: newQuantity };
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Drink Menu */}
      <Container className="py-5">
        <h1 className="text-center text-white mb-4" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          🥤 Drink Menu
        </h1>
        <Row className="g-4">
          {drinks.map((drink) => (
            <Col key={drink.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-lg border-0 drink-card">
                <Card.Img
                  variant="top"
                  src={drink.image}
                  alt={drink.name}
                  className="drink-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center text-success fw-bold">
                    {drink.name}
                  </Card.Title>
                  <Card.Text className="text-center fw-bold">
                    ${drink.price.toFixed(2)}
                  </Card.Text>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => updateQuantity(drink.id, -1)}
                    >
                      -
                    </Button>
                    <span className="mx-3 fw-bold">{cart[drink.id] || 0}</span>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => updateQuantity(drink.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="success"
                    className="mt-auto add-to-cart-button"
                    onClick={() =>
                      alert(`Added ${cart[drink.id] || 0} ${drink.name} to cart!`)
                    }
                    disabled={!cart[drink.id]}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ✨ Ultimate CSS Magic */}
      <style>
        {`
          /* 🌟 Drink Card */
          .drink-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            animation: fadeInUp 0.5s ease-in-out;
          }

          .drink-card:hover {
            transform: translateY(-10px);
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
          }

          .drink-image {
            height: 200px;
            object-fit: contain;
            padding: 1rem;
            transition: transform 0.3s ease-in-out;
          }

          .drink-card:hover .drink-image {
            transform: scale(1.1);
          }

          /* 🌟 Add to Cart Button */
          .add-to-cart-button {
            background: #28a745;
            border: none;
            border-radius: 25px;
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: 600;
            transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;
          }

          .add-to-cart-button:hover {
            background: #218838;
            transform: scale(1.05);
          }

          .add-to-cart-button:disabled {
            background: #6c757d;
            cursor: not-allowed;
          }

          /* 🌟 Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default DrinkMenu;