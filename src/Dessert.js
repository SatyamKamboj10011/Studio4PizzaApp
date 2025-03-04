import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const desserts = [
  {
    id: 1,
    name: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 6.99,
  },
  {
    id: 2,
    name: "Cheesecake",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 7.99,
  },
  {
    id: 3,
    name: "Tiramisu",
    image: "https://images.unsplash.com/photo-1627308595186-0bdc1f9b1f6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 8.99,
  },
  {
    id: 4,
    name: "Macarons",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 5.99,
  },
  {
    id: 5,
    name: "Ice Cream Sundae",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 4.99,
  },
  {
    id: 6,
    name: "Red Velvet Cake",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 6.99,
  },
  {
    id: 7,
    name: "Panna Cotta",
    image: "https://images.unsplash.com/photo-1606474845626-9267a6a5c6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 7.99,
  },
  {
    id: 8,
    name: "Chocolate Mousse",
    image: "https://images.unsplash.com/photo-1606313564203-9662a354b0d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 5.99,
  },
  {
    id: 9,
    name: "Fruit Tart",
    image: "https://images.unsplash.com/photo-1627308595136-37606644a5a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 6.99,
  },
  {
    id: 10,
    name: "Creme Brulee",
    image: "https://images.unsplash.com/photo-1606474845626-9267a6a5c6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 8.99,
  },
];

const DessertMenu = () => {
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
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Dessert Menu */}
      <Container className="py-5">
        <h1 className="text-center text-white mb-4" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          🍰 Dessert Menu
        </h1>
        <Row className="g-4">
          {desserts.map((dessert) => (
            <Col key={dessert.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-lg border-0 dessert-card">
                <Card.Img
                  variant="top"
                  src={dessert.image}
                  alt={dessert.name}
                  className="dessert-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center text-success fw-bold">
                    {dessert.name}
                  </Card.Title>
                  <Card.Text className="text-center fw-bold">
                    ${dessert.price.toFixed(2)}
                  </Card.Text>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => updateQuantity(dessert.id, -1)}
                    >
                      -
                    </Button>
                    <span className="mx-3 fw-bold">{cart[dessert.id] || 0}</span>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => updateQuantity(dessert.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="success"
                    className="mt-auto add-to-cart-button"
                    onClick={() =>
                      alert(`Added ${cart[dessert.id] || 0} ${dessert.name} to cart!`)
                    }
                    disabled={!cart[dessert.id]}
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
          /* 🌟 Dessert Card */
          .dessert-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            animation: fadeInUp 0.5s ease-in-out;
          }

          .dessert-card:hover {
            transform: translateY(-10px);
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
          }

          .dessert-image {
            height: 200px;
            object-fit: cover;
            padding: 1rem;
            transition: transform 0.3s ease-in-out;
          }

          .dessert-card:hover .dessert-image {
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

export default DessertMenu;