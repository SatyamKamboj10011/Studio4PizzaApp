import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FriesImage from "./images/Fries.jpg";
import ChickenWingsImage from "./images/chicken.jpg";
import GarlicBreadImage from "./images/Garlic bread.jpg";
import OnionRingsImage from "./images/onion rings.jpg";

const SideMenu = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Fries", quantity: 0, price: 5.5, image: FriesImage },
    { id: 2, name: "Chicken Wings", quantity: 0, price: 5.5, image: ChickenWingsImage },
    { id: 3, name: "Garlic Bread", quantity: 0, price: 5.5, image: GarlicBreadImage },
    { id: 4, name: "Onion Rings", quantity: 0, price: 5.5, image: OnionRingsImage },
  ]);

  const increaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const addToCart = (item) => {
    if (item.quantity > 0) {
      alert(
        `Added ${item.quantity} ${item.name} to the cart!\nTotal Price: $${(
          item.quantity * item.price
        ).toFixed(2)}`
      );
    } else {
      alert(
        `Please add at least one ${item.name} to the cart before proceeding.`
      );
    }
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container className="bg-white bg-opacity-90 p-4 rounded shadow-lg">
        <h1 className="text-center mb-4 text-success">🍟 Side Menu</h1>
        <Row className="g-4">
          {items.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center text-success">
                    {item.name}
                  </Card.Title>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <span className="mx-3 fw-bold">{item.quantity}</span>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </div>
                  <Card.Text className="text-center fw-bold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </Card.Text>
                  <Button
                    variant="success"
                    className="mt-auto"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default SideMenu;