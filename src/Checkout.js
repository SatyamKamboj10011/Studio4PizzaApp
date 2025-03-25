import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaHome, FaPhone, FaMoneyBillWave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] }; // Get cart data from state

  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "creditCard",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Calculate total price from cart
    const total = cart.reduce((sum, item) => sum + (item.total_price || 0), 0);
    setTotalPrice(total);
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("✅ Order placed successfully!");
      localStorage.removeItem("cart");

      // Navigate to the invoice page with cart and customer data
      navigate("/invoice", {
        state: { cart, customer: formData },
      });
    }, 2000); // Simulate a 2-second delay for order processing
  };

  return (
    <Container fluid style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>
      <Row>
        {/* Order Summary */}
        <Col md={7}>
          <Card style={styles.orderCard}>
            <Card.Body>
              <Card.Title style={styles.cardTitle}>🛒 Order Summary</Card.Title>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <p>
                      {item.name} - ${item.total_price?.toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p style={styles.emptyCartMessage}>Your cart is empty. 🛍️</p>
              )}
              <hr style={styles.divider} />
              <h4 style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</h4>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment and Delivery Details */}
        <Col md={5}>
          <Card style={styles.paymentCard}>
            <Card.Body>
              <Card.Title style={styles.cardTitle}>💳 Payment & Delivery</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>
                    <FaUser style={styles.icon} /> Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>
                    <FaHome style={styles.icon} /> Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>
                    <FaPhone style={styles.icon} /> Phone Number
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>
                    <FaMoneyBillWave style={styles.icon} /> Payment Method
                  </Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  >
                    <option value="creditCard">💳 Credit Card</option>
                    <option value="debitCard">🏦 Debit Card</option>
                    <option value="paypal">💰 PayPal</option>
                    <option value="cashOnDelivery">🚪 Cash on Delivery</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" style={styles.submitButton} disabled={isLoading}>
                  {isLoading ? "Processing..." : "✅ Place Order"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// 🎨 Styling
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "20px",
    background: "linear-gradient(to right, #FFEFBA, #FFFFFF)",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "2.8rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    fontFamily: "Poppins, sans-serif",
  },
  orderCard: {
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    padding: "20px",
  },
  paymentCard: {
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#444",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  orderItem: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "12px",
    fontFamily: "Arial, sans-serif",
  },
  itemPrice: {
    fontWeight: "bold",
    color: "#FF6347",
  },
  emptyCartMessage: {
    fontSize: "1.3rem",
    color: "#777",
    textAlign: "center",
    fontStyle: "italic",
  },
  divider: {
    borderTop: "2px solid #ddd",
  },
  totalPrice: {
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  label: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins, sans-serif",
  },
  input: {
    borderRadius: "8px",
    border: "1px solid #ddd",
    padding: "12px",
    fontSize: "1.1rem",
    width: "100%",
    backgroundColor: "#f8f9fa",
  },
  submitButton: {
    backgroundColor: "#FF6347",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    width: "100%",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    ":hover": {
      backgroundColor: "#e5533d",
    },
  },
  icon: {
    marginRight: "8px",
  },
};

export default Checkout;