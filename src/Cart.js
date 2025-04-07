import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaArrowRight, FaBoxOpen, FaRegClock, FaRegCreditCard } from "react-icons/fa";

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

const CartContainer = styled(Container)`
  max-width: 1200px;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.98);
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const CartHeader = styled.div`
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

const CartTitle = styled.h2`
  color: #2c3e50;
  font-weight: 800;
  font-size: 2.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${floatAnimation} 3s ease-in-out infinite;
  margin-bottom: 15px;
`;

const CartSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const CartImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  &:hover {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CheckoutButton = styled(Button)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  border: none;
  padding: 18px 40px;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  border-radius: 35px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(255, 75, 43, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 40px auto;
  letter-spacing: 0.5px;
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
`;

const RemoveButton = styled(Button)`
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 75, 43, 0.2);
  
  &:hover {
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 75, 43, 0.3);
  }
`;

const StyledTable = styled(Table)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  
  th {
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
    color: white;
    font-weight: 700;
    border: none;
    padding: 20px;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  td {
    padding: 20px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 1.1rem;
    color: #2c3e50;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover {
    background: rgba(255, 75, 43, 0.03);
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  
  h5 {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  p {
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .cart-icon {
    font-size: 5rem;
    color: #ff4b2b;
    margin-bottom: 30px;
    animation: ${floatAnimation} 3s ease-in-out infinite;
  }
`;

const PriceCell = styled.td`
  font-weight: 700;
  color: #ff4b2b;
  font-size: 1.3rem;
  animation: ${pulseAnimation} 2s infinite;
`;

const OrderSummary = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

const SummaryTitle = styled.h3`
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 25px;
  font-size: 1.8rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
  
  span {
    font-size: 1.2rem;
    color: #666;
  }
  
  strong {
    font-size: 1.3rem;
    color: #2c3e50;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-top: 20px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  
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
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("❌ Item removed from cart!");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/checkout", { state: { cart } });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.total_price || 0), 0).toFixed(2);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.total_price || 0), 0).toFixed(2);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * 0.1).toFixed(2);
  };

  return (
    <CartContainer>
      <CartHeader>
        <CartTitle>
          <FaShoppingCart style={{ marginRight: "15px" }} />
          Your Cart
        </CartTitle>
        <CartSubtitle>Review and manage your order</CartSubtitle>
      </CartHeader>
      
      {cart.length === 0 ? (
        <EmptyCartMessage>
          <FaShoppingCart className="cart-icon" />
          <h5>Your cart is empty</h5>
          <p>Add some delicious items to your cart!</p>
        </EmptyCartMessage>
      ) : (
        <>
          <StyledTable responsive bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <CartImage
                      src={`http://localhost:5000/images/${item.image}`}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name || "Unknown Item"}</td>
                  <td>{item.category || "N/A"}</td>
                  <td>{item.quantity || 1}</td>
                  <PriceCell>${item.total_price ? parseFloat(item.total_price).toFixed(2) : "0.00"}</PriceCell>
                  <td>
                    <RemoveButton onClick={() => handleRemove(index)}>
                      <FaTrash /> Remove
                    </RemoveButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          
          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <span>Subtotal</span>
              <strong>${calculateSubtotal()}</strong>
            </SummaryItem>
            <SummaryItem>
              <span>Tax (10%)</span>
              <strong>${calculateTax()}</strong>
            </SummaryItem>
            <TotalAmount>
              <span>Total Amount</span>
              <strong>${calculateTotal()}</strong>
            </TotalAmount>
          </OrderSummary>
          
          <div style={{ textAlign: "center" }}>
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout <FaArrowRight />
            </CheckoutButton>
          </div>
        </>
      )}
      
      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        style={{ 
          borderRadius: "15px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      />
    </CartContainer>
  );
};

export default Cart;