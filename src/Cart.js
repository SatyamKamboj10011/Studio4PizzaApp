import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

// Styled Components
const CartContainer = styled(Container)`
  max-width: 900px;
  margin: auto;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const CartImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const CheckoutButton = styled(Button)`
  background: linear-gradient(135deg, #ff5733, #ffcc00);
  border: none;
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  &:hover {
    background: linear-gradient(135deg, #ffcc00, #ff5733);
    transform: scale(1.05);
  }
`;

const RemoveButton = styled(Button)`
  background: #dc3545;
  border: none;
  padding: 6px 12px;
  transition: all 0.3s;
  &:hover {
    background: #b52a38;
    transform: scale(1.05);
  }
`;

const Cart = () => {
  const [cart, setCart] = useState([]);

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

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/checkout", { cart });
      toast.success("✅ Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("⚠️ Failed to place order. Try again!");
    }
  };

  return (
    <CartContainer className="mt-5">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <h5 className="text-center">Your cart is empty.</h5>
      ) : (
        <Table responsive bordered hover className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item</th>
              <th>Size</th>
              <th>Toppings</th>
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
                <td>{item.size || "None"}</td>
                <td>{item.toppings?.length > 0 ? item.toppings.join(", ") : "None"}</td>
                <td>{item.total_price ? parseFloat(item.total_price).toFixed(2) : "0.00"}</td>
                <td>
                  <RemoveButton onClick={() => handleRemove(index)}>❌ Remove</RemoveButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {cart.length > 0 && (
        <div className="text-center mt-4">
          <CheckoutButton onClick={handleCheckout}>✅ Checkout & Place Order</CheckoutButton>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </CartContainer>
  );
};

export default Cart;
