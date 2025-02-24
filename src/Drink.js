import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar"; // Import the Navbar

const drinks = [
  { id: 1, name: "Coca Cola", image: "coke.jpg", price: 3.5 },
  { id: 2, name: "Pepsi", image: "pepsi.jpg", price: 3.5 },
  { id: 3, name: "Mirinda", image: "mirinda.jpg", price: 3.5 },
  { id: 4, name: "Red Bull", image: "redbull.jpg", price: 3.5 },
  { id: 5, name: "Monster", image: "Monster.jpg", price: 3.5 },
  { id: 6, name: "Fanta", image: "fanta.jpg", price: 3.5 },
  { id: 7, name: "Nimbooz", image: "nimbooz.jpg", price: 3.5 },
  { id: 8, name: "Coke Zero Sugar", image: "cokeZS.jpg", price: 3.5 },
  { id: 9, name: "Sprite", image: "sprite.jpg", price: 3.5 },
  { id: 10, name: "L&P", image: "L&P.jpg", price: 3.5 },
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
    <div style={{ backgroundImage: "url('/backgrounddrink.jpg')", backgroundSize: "cover", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Drink Menu */}
      <Container className="mt-4">
        <Row>
          {drinks.map((drink) => (
            <Col key={drink.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="text-center shadow-lg p-3 rounded">
                <Card.Img variant="top" src={drink.image} alt={drink.name} style={{ height: "150px", objectFit: "contain" }} />
                <Card.Body>
                  <Card.Title>{drink.name}</Card.Title>
                  <Card.Text className="fw-bold">${drink.price.toFixed(2)}</Card.Text>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button variant="outline-danger" size="sm" onClick={() => updateQuantity(drink.id, -1)}>-</Button>
                    <span className="mx-2 fw-bold">{cart[drink.id] || 0}</span>
                    <Button variant="outline-success" size="sm" onClick={() => updateQuantity(drink.id, 1)}>+</Button>
                  </div>
                  <Button 
                    className="mt-2 w-100" 
                    variant="primary" 
                    onClick={() => alert(`Added ${cart[drink.id] || 0} ${drink.name} to cart!`)}
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
    </div>
  );
};

export default DrinkMenu;
