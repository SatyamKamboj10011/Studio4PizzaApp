import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
<<<<<<< HEAD
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
=======
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

// Styled Components
const HeroSection = styled.div`
  background-image: url('https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroOverlay = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const PizzaCard = styled(Card)`
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  border: none;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled(Card.Img)`
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s;
  ${PizzaCard}:hover & {
    transform: scale(1.1);
  }
`;

const CardBody = styled(Card.Body)`
  padding: 20px;
  text-align: center;
`;

const CardTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const CardText = styled(Card.Text)`
  color: #666;
  margin-bottom: 15px;
`;

const PriceTag = styled.span`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 15px;
`;

const CustomButton = styled(Button)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  border: none;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(255, 75, 43, 0.3);
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #ff4b2b;
    border-radius: 2px;
  }
`;

const CustomModalHeader = styled(Modal.Header)`
  border-bottom: none;
  padding-bottom: 0;
`;

const CustomModalFooter = styled(Modal.Footer)`
  border-top: none;
  padding-top: 0;
`;

const PizzaMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/menu")
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  }, []);
<<<<<<< HEAD
 
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
=======

  const openModal = (item) => {
    setSelectedItem(item);
    setSelectedSize("Medium");
    setSelectedToppings([]);
    setModalShow(true);
  };

  const calculatePrice = () => {
    if (!selectedItem) return 0;

    let basePrice = 0;

    switch (selectedSize) {
      case "Small":
        basePrice = selectedItem.small_price ? parseFloat(selectedItem.small_price) : 0;
        break;
      case "Large":
        basePrice = selectedItem.large_price ? parseFloat(selectedItem.large_price) : 0;
        break;
      case "Extra Large":
        basePrice = selectedItem.extra_large_price ? parseFloat(selectedItem.extra_large_price) : 0;
        break;
      default:
        basePrice = 0;
    }

    const toppingsCost = selectedToppings.length * 1.5;
    return parseFloat((basePrice + toppingsCost).toFixed(2));
  };

  const addToCart = () => {
    const totalPrice = calculatePrice();
    const newItem = {
      item_id: selectedItem.id,
      name: selectedItem.name,
      category: "Pizza",
      size: selectedSize,
      toppings: selectedToppings,
      quantity: 1,
      total_price: totalPrice,
      image: selectedItem.image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`${selectedItem.name} added to cart! 🛒`);
    setModalShow(false);
  };

  return (
    <Container fluid>
      <HeroSection>
        <HeroOverlay>
          <h1 style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "20px" }}>🍕 Welcome to Pizza Paradise</h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "0" }}>Choose your favorite pizza, sides, or drinks!</p>
        </HeroOverlay>
      </HeroSection>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
        </div>
      ) : (
        <Container className="my-5">
          <SectionTitle>Our Delicious Menu</SectionTitle>
          <Row className="g-4">
            {menuItems.map((item) => (
              <Col xs={12} sm={6} md={4} key={item.id}>
                <PizzaCard>
                  <CardImage variant="top" src={`http://localhost:5000/images/${item.image}`} alt={item.name} />
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                    <PriceTag>${item.small_price} - ${item.large_price}</PriceTag>
                    <CustomButton onClick={() => openModal(item)}>Customize & Buy 🛒</CustomButton>
                  </CardBody>
                </PizzaCard>
              </Col>
            ))}
          </Row>
        </Container>
      )}
<<<<<<< HEAD
 
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
 
=======

      {/* Customization Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <ModalContent>
          <CustomModalHeader closeButton>
            <Modal.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Customize Your Order</Modal.Title>
          </CustomModalHeader>
          <Modal.Body>
            {selectedItem && (
              <>
                <h4 className="text-center" style={{ fontWeight: "bold", marginBottom: "15px" }}>{selectedItem.name}</h4>
                <p className="text-center" style={{ color: "#666", marginBottom: "20px" }}>{selectedItem.description}</p>

                <div className="text-center mb-3">
                  <img
                    src={`http://localhost:5000/images/${selectedItem.image}`}
                    alt={selectedItem.name}
                    style={{ width: "100%", maxWidth: "350px", borderRadius: "10px" }}
                  />
                </div>

                <h5 style={{ fontWeight: "bold", marginBottom: "20px" }}>Total Price: ${calculatePrice()}</h5>

                {/* Size Selection */}
                <Form.Group controlId="formPizzaSize" className="mb-3">
                  <Form.Label style={{ fontWeight: "bold" }}>Choose Size & Price</Form.Label>
                  <Form.Select onChange={(e) => setSelectedSize(e.target.value)}>
                    <option value="Small">Small - ${selectedItem.small_price}</option>
                    <option value="Large">Large - ${selectedItem.large_price}</option>
                    <option value="Extra Large">Extra Large - ${selectedItem.extra_large_price}</option>
                  </Form.Select>
                </Form.Group>

                {/* Toppings Selection */}
                <Form.Group controlId="formToppings" className="mb-3">
                  <Form.Label style={{ fontWeight: "bold" }}>Choose Toppings ($1.50 each)</Form.Label>
                  {["Pepperoni", "Mushrooms", "Olives", "Jalapeños", "Pineapple"].map((topping) => (
                    <Form.Check
                      key={topping}
                      type="checkbox"
                      label={topping}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedToppings([...selectedToppings, topping]);
                        } else {
                          setSelectedToppings(selectedToppings.filter((t) => t !== topping));
                        }
                      }}
                    />
                  ))}
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <CustomModalFooter>
            <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
            <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
          </CustomModalFooter>
        </ModalContent>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

>>>>>>> ff0af5f53605ea50d12bcbc9609006c23d17500b
export default PizzaMenu;