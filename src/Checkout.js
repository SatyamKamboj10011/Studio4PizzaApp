import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Spinner } from "react-bootstrap";
import { FaUser, FaHome, FaPhone, FaMoneyBillWave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };

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
    const total = cart.reduce((sum, item) => sum + (item.total_price || 0), 0);
    setTotalPrice(total);
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.address.trim()) newErrors.address = "Please enter your delivery address.";
    if (!formData.phone.trim()) newErrors.phone = "Please enter your contact number.";
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
      toast.success("✅ Order placed successfully!", { position: "bottom-right" });
      localStorage.removeItem("cart");
      navigate("/invoice", {
        state: { cart, customer: formData },
      });
    }, 2000);
  };

  return (
    <Container style={styles.container}>
      <ToastContainer />
      <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
        Checkout
      </h2>

      <Row>
        {/* Order Summary */}
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3 fw-bold">🛒 Order Summary</h4>
              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <div key={idx} style={styles.orderItem}>
                    <p className="mb-2">
                      {item.name} <span className="text-muted">- ${item.total_price?.toFixed(2)}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted">Your cart is currently empty. 🛍️</p>
              )}
              <hr />
              <h5 className="text-end fw-bold">Total: ${totalPrice.toFixed(2)}</h5>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment & Delivery */}
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3 fw-bold">💳 Payment & Delivery</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" /> Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                    placeholder="Your full name"
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaHome className="me-2" /> Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    placeholder="Delivery address"
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaPhone className="me-2" /> Phone
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                    placeholder="e.g., 0211234567"
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <FaMoneyBillWave className="me-2" /> Payment Method
                  </Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="creditCard">💳 Credit Card</option>
                    <option value="debitCard">🏦 Debit Card</option>
                    <option value="paypal">💰 PayPal</option>
                    <option value="cashOnDelivery">🚪 Cash on Delivery</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: "#ff6347", border: "none", fontWeight: "600" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    "✅ Place Order"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Confirmation */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmOrder}>
            Yes, Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "1100px",
    marginTop: "40px",
    marginBottom: "60px",
  },
  orderItem: {
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
};

export default Checkout;
