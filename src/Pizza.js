import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const prices = {
  small: "small_price",
  large: "large_price",
  extraLarge: "extra_large_price",
};

const PizzaMenu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSize, setSelectedSize] = useState("medium");

  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        setPizzas(response.data);
        setFilteredPizzas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPizzas(pizzas);
    } else {
      setFilteredPizzas(pizzas.filter((pizza) => pizza.category === selectedCategory));
    }
  }, [selectedCategory, pizzas]);

  const openCustomizationModal = (pizza) => {
    setSelectedPizza(pizza);
    setModalShow(true);
    setSelectedToppings([]);
  };

  const addToCart = () => {
    const totalPrice =
      selectedPizza[prices[selectedSize]] + selectedToppings.length * 1.5;
    const newItem = {
      pizza: selectedPizza,
      size: selectedSize,
      toppings: selectedToppings,
      totalPrice,
    };
    setCart([...cart, newItem]);
    toast.success(
      `${selectedPizza.name} (${selectedSize}) added to cart! Total: $${totalPrice.toFixed(2)}`
    );
    setModalShow(false);
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
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ background: "rgba(0, 0, 0, 0.6)", padding: "20px", borderRadius: "10px" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>🍕 Pizza Menu</h1>
          <p style={{ fontSize: "1.5rem" }}>Choose your favorite pizza and customize it!</p>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Pizza Grid */}
      <Container className="my-5">
        <h4 className="text-center mb-4" style={{ fontWeight: "bold" }}>
          Our Delicious Pizza Menu
        </h4>

        {/* Category Filter */}
        <Row className="justify-content-center mb-4">
          <Col md={4}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ borderRadius: "25px", padding: "10px" }}
            >
              <option value="all">All</option>
              <option value="veg">Veg</option>
              <option value="nonVeg">Non-Veg</option>
              <option value="specialty">Specialty</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Pizza Cards */}
        <Row className="g-4">
          {filteredPizzas.map((pizza) => (
            <Col xs={12} sm={6} md={4} key={pizza.id}>
              <Card
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/images/${pizza.image}`}
                  alt={pizza.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {pizza.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1.2rem", color: "#555" }}>
                    {pizza.description}
                  </Card.Text>
                  <Button
                    variant="warning"
                    style={{
                      backgroundColor: "#ff4b2b",
                      border: "none",
                      borderRadius: "25px",
                      padding: "10px 20px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => openCustomizationModal(pizza)}
                  >
                    Customize 🍕
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Customization Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Customize Your Pizza 🍕</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPizza && (
            <>
              <Row>
                <Col md={6}>
                  <img
                    src={`http://localhost:5000/images/${selectedPizza.image}`}
                    alt={selectedPizza.name}
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Col>
                <Col md={6}>
                  <h5>{selectedPizza.name}</h5>
                  <p>{selectedPizza.description}</p>
                  <Form.Group controlId="formPizzaSize">
                    <Form.Label>Choose Size</Form.Label>
                    <Form.Select onChange={(e) => setSelectedSize(e.target.value)}>
                      <option value="small">Small - ${selectedPizza.small_price}</option>
                      <option value="large">Large - ${selectedPizza.large_price}</option>
                      <option value="extraLarge">Extra Large - ${selectedPizza.extra_large_price}</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="formToppings" className="mt-3">
                    <Form.Label>Choose Toppings ($1.50 each)</Form.Label>
                    {[
                      "Pepperoni",
                      "Mushrooms",
                      "Olives",
                      "Jalapeños",
                      "Pineapple",
                    ].map((topping) => (
                      <Form.Check
                        key={topping}
                        type="checkbox"
                        label={topping}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedToppings([...selectedToppings, topping]);
                          } else {
                            setSelectedToppings(
                              selectedToppings.filter((t) => t !== topping)
                            );
                          }
                        }}
                      />
                    ))}
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

export default PizzaMenu;