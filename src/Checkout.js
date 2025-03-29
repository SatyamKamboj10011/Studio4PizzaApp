import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Spinner } from "react-bootstrap";
import { FaUser, FaHome, FaPhone, FaMoneyBillWave, FaCreditCard, FaLock, FaTruck, FaBoxOpen } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import styled, { keyframes } from "styled-components";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shineAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const PageContainer = styled(Container)`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
    border-radius: 3px;
  }
`;

const PageTitle = styled.h2`
  color: #2c3e50;
  font-weight: 800;
  font-size: 2.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${floatAnimation} 3s ease-in-out infinite;
  margin-bottom: 15px;
`;

const PageSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 25px;
  border: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled(Card.Header)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  color: white;
  border-radius: 25px 25px 0 0 !important;
  padding: 20px 30px;
  font-weight: 700;
  font-size: 1.4rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardBody = styled(Card.Body)`
  padding: 30px;
`;

const StyledFormControl = styled(Form.Control)`
  border-radius: 15px;
  padding: 12px 20px;
  border: 2px solid #eee;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  
  &:focus {
    border-color: #ff4b2b;
    box-shadow: 0 0 0 0.2rem rgba(255, 75, 43, 0.25);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const StyledFormLabel = styled(Form.Label)`
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const StyledSelect = styled(Form.Select)`
  border-radius: 15px;
  padding: 12px 20px;
  border: 2px solid #eee;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  
  &:focus {
    border-color: #ff4b2b;
    box-shadow: 0 0 0 0.2rem rgba(255, 75, 43, 0.25);
  }
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
  
  img {
    width: 80px;
    height: 80px;
    border-radius: 15px;
    object-fit: cover;
    margin-right: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .item-details {
    flex-grow: 1;
    
    h5 {
      margin: 0;
      color: #2c3e50;
      font-weight: 700;
    }
    
    p {
      margin: 5px 0 0;
      color: #666;
    }
  }
  
  .item-price {
    font-weight: 700;
    color: #ff4b2b;
    font-size: 1.2rem;
    animation: ${pulseAnimation} 2s infinite;
  }
`;

const TotalSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    span {
      font-size: 1.2rem;
      color: #666;
    }
    
    strong {
      font-size: 1.3rem;
      color: #2c3e50;
    }
  }
  
  .final-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    
    span {
      font-size: 1.5rem;
      color: #2c3e50;
      font-weight: 700;
    }
    
    strong {
      font-size: 2rem;
      color: #ff4b2b;
      font-weight: 800;
    }
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  border-radius: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(255, 75, 43, 0.3);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
    background-size: 200% 100%;
    animation: ${shineAnimation} 3s linear infinite;
  }
  
  &:hover {
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(255, 75, 43, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    transform: none;
    box-shadow: none;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 25px;
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    border-bottom: none;
    padding: 25px 30px;
  }
  
  .modal-body {
    padding: 30px;
    text-align: center;
  }
  
  .modal-footer {
    border-top: none;
    padding: 25px 30px;
  }
`;

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
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <FaCreditCard style={{ marginRight: "15px" }} />
          Checkout
        </PageTitle>
        <PageSubtitle>Complete your order details</PageSubtitle>
      </PageHeader>

      <Row>
        <Col lg={7} className="mb-4">
          <StyledCard>
            <CardHeader>
              <FaUser /> Order Summary
            </CardHeader>
            <CardBody>
              {cart.length > 0 ? (
                <>
                  {cart.map((item, idx) => (
                    <OrderItem key={idx}>
                      <img
                        src={`http://localhost:5000/images/${item.image}`}
                        alt={item.name}
                      />
                      <div className="item-details">
                        <h5>{item.name}</h5>
                        <p>Quantity: {item.quantity || 1}</p>
                      </div>
                      <div className="item-price">
                        ${item.total_price?.toFixed(2)}
                      </div>
                    </OrderItem>
                  ))}
                  <TotalSection>
                    <div className="total-row">
                      <span>Subtotal</span>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </div>
                    <div className="total-row">
                      <span>Tax (10%)</span>
                      <strong>${(totalPrice * 0.1).toFixed(2)}</strong>
                    </div>
                    <div className="final-total">
                      <span>Total Amount</span>
                      <strong>${(totalPrice * 1.1).toFixed(2)}</strong>
                    </div>
                  </TotalSection>
                </>
              ) : (
                <div className="text-center py-5">
                  <FaBoxOpen style={{ fontSize: "4rem", color: "#ff4b2b", marginBottom: "20px" }} />
                  <h5>Your cart is empty</h5>
                  <p>Add some items to your cart first!</p>
                </div>
              )}
            </CardBody>
          </StyledCard>
        </Col>

        <Col lg={5}>
          <StyledCard>
            <CardHeader>
              <FaUser /> Delivery & Payment
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <StyledFormLabel>
                    <FaUser className="me-2" /> Full Name
                  </StyledFormLabel>
                  <StyledFormControl
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                    placeholder="Enter your full name"
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <StyledFormLabel>
                    <FaHome className="me-2" /> Delivery Address
                  </StyledFormLabel>
                  <StyledFormControl
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    placeholder="Enter your delivery address"
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <StyledFormLabel>
                    <FaPhone className="me-2" /> Contact Number
                  </StyledFormLabel>
                  <StyledFormControl
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                    placeholder="Enter your contact number"
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <StyledFormLabel>
                    <FaMoneyBillWave className="me-2" /> Payment Method
                  </StyledFormLabel>
                  <StyledSelect
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="creditCard">💳 Credit Card</option>
                    <option value="debitCard">🏦 Debit Card</option>
                    <option value="paypal">💰 PayPal</option>
                    <option value="cashOnDelivery">🚪 Cash on Delivery</option>
                  </StyledSelect>
                </Form.Group>

                <SubmitButton type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaLock className="me-2" />
                      Place Order
                    </>
                  )}
                </SubmitButton>
              </Form>
            </CardBody>
          </StyledCard>
        </Col>
      </Row>

      <StyledModal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FaTruck style={{ fontSize: "3rem", color: "#ff4b2b", marginBottom: "20px" }} />
          <h4>Are you sure you want to place this order?</h4>
          <p className="text-muted">Your order will be processed and delivered shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <SubmitButton onClick={confirmOrder}>
            Yes, Place Order
          </SubmitButton>
        </Modal.Footer>
      </StyledModal>

      <ToastContainer 
        position="bottom-right" 
        autoClose={3000}
        style={{ 
          borderRadius: "15px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      />
    </PageContainer>
  );
};

export default Checkout;
