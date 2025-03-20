import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "creditCard",
  });

  // Fetch cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    // Calculate total price
    const total = savedCart.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! Thank you for your purchase.");
    // Clear cart and redirect to home or confirmation page
    localStorage.removeItem("cart");
    window.location.href = "/";
  };

  return (
    <Container className="my-5 checkout-container">
      <h1 className="text-center mb-4 checkout-title">Checkout</h1>
      <Row>
        {/* Order Summary */}
        <Col md={8}>
          <Card className="mb-4 order-summary-card">
            <Card.Body>
              <Card.Title className="order-summary-title">Order Summary</Card.Title>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} className="mb-3 order-item">
                    <p>
                      {item.quantity} x {item.pizza?.name || item.side?.name || item.dessert?.name || item.drink?.name} (
                      {item.size}) - <span className="item-price">${item.totalPrice.toFixed(2)}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="empty-cart-message">Your cart is empty.</p>
              )}
              <hr className="summary-divider" />
              <h5 className="total-price">Total: ${totalPrice.toFixed(2)}</h5>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment and Delivery Details */}
        <Col md={4}>
          <Card className="payment-card">
            <Card.Body>
              <Card.Title className="payment-title">Payment and Delivery</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  >
                    <option value="creditCard">Credit Card</option>
                    <option value="debitCard">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cashOnDelivery">Cash on Delivery</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 submit-button">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Custom CSS */}
      <style>
        {`
          .checkout-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .checkout-title {
            font-size: 2.5rem;
            font-weight: bold;
            color: #333;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          }

          .order-summary-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background-color: #f8f9fa;
          }

          .order-summary-title {
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }

          .order-item {
            font-size: 1.1rem;
            color: #555;
          }

          .item-price {
            font-weight: bold;
            color: #28a745;
          }

          .empty-cart-message {
            font-size: 1.2rem;
            color: #777;
            text-align: center;
          }

          .summary-divider {
            border-top: 2px solid #ddd;
          }

          .total-price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            text-align: right;
          }

          .payment-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background-color: #f8f9fa;
          }

          .payment-title {
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }

          .form-label {
            font-size: 1.1rem;
            font-weight: bold;
            color: #333;
          }

          .form-input {
            border-radius: 8px;
            border: 1px solid #ddd;
            padding: 10px;
            font-size: 1rem;
          }

          .form-input:focus {
            border-color: #28a745;
            box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
          }

          .submit-button {
            background-color: #28a745;
            border: none;
            border-radius: 8px;
            padding: 12px;
            font-size: 1.1rem;
            font-weight: bold;
            transition: background-color 0.3s ease;
          }

          .submit-button:hover {
            background-color: #218838;
          }
        `}
      </style>
    </Container>
  );
};

export default Checkout;