import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormControl,
  InputGroup,
  Modal,
  Toast,
} from "react-bootstrap";
import { AddShoppingCart } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 
const prices = {
  small: "small_price",
  large: "large_price",
  extraLarge: "extra_large_price",
};
 
const PizzaMenu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
 
  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);
 
  const addToCart = (pizza, size, quantity) => {
    const totalPrice = pizza[prices[size]] * quantity;
    const newItem = { pizza, size, quantity, totalPrice };
    setCart([...cart, newItem]);
    setToastMessage(`${quantity} ${size} ${pizza.name} added to cart! Total: $${totalPrice.toFixed(2)}`);
    setShowToast(true);
  };
 
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200.png?text=Image+Not+Available"; // Fallback image if loading fails
  };
 
  return (
    <Container fluid style={{ backgroundColor: "#f8f9fa", paddingTop: 10 }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ fontWeight: "bold", textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)" }}>
          Welcome to Pizza Palace 🍕
        </h1>
      </div>
 
      {/* Menu Section */}
      <Container className="py-5" maxWidth="lg">
        <h4 className="text-center mb-4" style={{ fontWeight: "bold" }}>
          Our Delicious Pizza Menu
        </h4>
 
        {/* Category Filters Section */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} sm={6} md={4}>
            <InputGroup>
              <FormControl as="select">
                <option value="all">All</option>
                <option value="veg">Veg</option>
                <option value="nonVeg">Non-Veg</option>
                <option value="specialty">Specialty</option>
              </FormControl>
            </InputGroup>
          </Col>
        </Row>
 
        {/* Menu Grid */}
        <Row className="g-4">
          {pizzas.map((pizza) => (
            <Col xs={12} sm={6} md={4} key={pizza.id}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/images/${pizza.image}`}
                  alt={pizza.name}
                  style={{
                    height: 220,
                    objectFit: "cover",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                  onError={handleImageError}
                />
                <Card.Body>
                  <Card.Title>{pizza.name}</Card.Title>
                  <Card.Text>
                    Small: ${pizza.small_price} | Large: ${pizza.large_price} | XL: ${pizza.extra_large_price}
                  </Card.Text>
                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#f57c00",
                      borderRadius: "10px",
                      padding: "10px 20px",
                    }}
                    onClick={() => addToCart(pizza, "small", 1)}
                  >
                    <AddShoppingCart /> Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
 
      {/* Cart Summary */}
      {cart.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 15,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
            zIndex: 10,
            width: 280,
          }}
        >
          <h5 className="text-primary mb-3" style={{ fontWeight: "bold" }}>🛒 Cart Summary</h5>
          {cart.map((item, index) => (
            <div key={index}>
              <p>{item.quantity} x {item.pizza.name} ({item.size})</p>
              <p style={{ fontWeight: "bold" }}>${item.totalPrice.toFixed(2)}</p>
            </div>
          ))}
          <Button
            block
            variant="warning"
            onClick={() => setModalShow(true)}
            style={{
              backgroundColor: "#f57c00",
              borderRadius: 10,
              padding: "10px 20px",
            }}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
 
      {/* Footer Section */}
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "40px 0",
          marginTop: "60px",
        }}
      >
        <Container>
          <Row>
            <Col xs={12} sm={6}>
              <h5>Pizza Palace</h5>
              <p className="mt-2" style={{ fontStyle: "italic" }}>
                The best pizza in town, now delivered straight to your door!
              </p>
            </Col>
            <Col xs={12} sm={6}>
              <h6>Quick Links</h6>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                <li><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a></li>
                <li><a href="/menu" style={{ color: "#fff", textDecoration: "none" }}>Menu</a></li>
                <li><a href="/locations" style={{ color: "#fff", textDecoration: "none" }}>Locations</a></li>
                <li><a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</a></li>
              </ul>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <p>© {new Date().getFullYear()} Pizza Palace. All Rights Reserved.</p>
          </div>
        </Container>
      </div>
 
      {/* Toast for Adding Items to Cart */}
      <ToastContainer position="top-center" autoClose={3000} />
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};
 
export default PizzaMenu;