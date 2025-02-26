import React, { useState } from "react";
import OnionPizzaImage from './images/beef and onion.jpg';
import MargheritaPizzaImage from './images/Margherita Pizza.jpg';
import BBQChickenPizzaImage from './images/BBQ Chicken Pizza.jpg';
import CheesePizzaImage from './images/Cheese Pizza.jpg';
import SpicyVegTrioImage from './images/spicy veg trio.jpg';
import HawaiianPizzaImage from './images/Hawaiian Pizza.jpg';


const pizzas = [
  { id: 1, name: "Beef and Onion", image: OnionPizzaImage},
  { id: 2, name: "Margherita Pizza", image:MargheritaPizzaImage },
  { id: 3, name: "BBQ Chicken Pizza", image:BBQChickenPizzaImage },
  { id: 4, name: "Cheese Pizza", image:CheesePizzaImage},
  { id: 5, name: "Spicy Veg Trio", image:SpicyVegTrioImage },
  { id: 6, name: "Hawaiian Pizza", image:HawaiianPizzaImage },
];

const prices = {
  small: 10.99,
  large: 15.99,
  extraLarge: 19.99,
};

const Pizza = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza, size, quantity) => {
    const totalPrice = prices[size] * quantity;
    const newItem = { pizza, size, quantity, totalPrice };
    setCart([...cart, newItem]);
    alert(`${quantity} ${size} ${pizza} added to cart! Total: $${totalPrice.toFixed(2)}`);
  };

  // Inline Styles
  const styles = {
    pizzaPage: {
      padding: "2rem",
      backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
    },
    pizzaContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "rgba(255, 255, 255, 0.80)",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    pageTitle: {
      textAlign: "center",
      fontSize: "2.5rem",
      color: "#4caf50",
      marginBottom: "2rem",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    pizzaGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
    },
    pizzaCard: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    pizzaCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
    pizzaImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
    pizzaName: {
      fontSize: "1.5rem",
      color: "#333",
      marginBottom: "0.5rem",
      fontWeight: "bold",
    },
    pizzaPrice: {
      color: "#666",
      marginBottom: "1rem",
      fontSize: "1rem",
    },
    sizeSelect: {
      width: "100%",
      padding: "0.5rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontSize: "1rem",
    },
    quantityInput: {
      width: "100%",
      padding: "0.5rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontSize: "1rem",
    },
    addToCartButton: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    addToCartButtonHover: {
      backgroundColor: "#45a049",
    },
    cartSummary: {
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    cartItem: {
      marginBottom: "0.5rem",
    },
    cartItemPrice: {
      color: "#666",
      fontSize: "0.9rem",
    },
    checkoutButton: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    checkoutButtonHover: {
      backgroundColor: "#45a049",
    },
  };

  return (
    <div style={styles.pizzaPage}>
      {/* Main Content */}
      <div style={styles.pizzaContainer}>
        <h2 style={styles.pageTitle}>🍕 Pizza Menu</h2>
        <div style={styles.pizzaGrid}>
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              style={styles.pizzaCard}
              onMouseEnter={(e) => (e.currentTarget.style.transform = styles.pizzaCardHover.transform)}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <img src={pizza.image} alt={pizza.name} style={styles.pizzaImage} />
              <h3 style={styles.pizzaName}>{pizza.name}</h3>
              <p style={styles.pizzaPrice}>
                Small: ${prices.small} | Large: ${prices.large} | XL: ${prices.extraLarge}
              </p>
              <select
                id={`size-${pizza.id}`}
                style={styles.sizeSelect}
              >
                <option value="small">Small</option>
                <option value="large">Large</option>
                <option value="extraLarge">Extra Large</option>
              </select>
              <input
                type="number"
                id={`quantity-${pizza.id}`}
                defaultValue={1}
                min={1}
                style={styles.quantityInput}
              />
              <button
                style={styles.addToCartButton}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.addToCartButtonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = styles.addToCartButton.backgroundColor)}
                onClick={() => {
                  const size = document.getElementById(`size-${pizza.id}`).value;
                  const quantity = parseInt(document.getElementById(`quantity-${pizza.id}`).value);
                  addToCart(pizza.name, size, quantity);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary (Optional) */}
      {cart.length > 0 && (
        <div style={styles.cartSummary}>
          <h3>🛒 Cart Summary</h3>
          {cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <p>
                {item.quantity} x {item.pizza} ({item.size})
              </p>
              <p style={styles.cartItemPrice}>${item.totalPrice.toFixed(2)}</p>
            </div>
          ))}
          <button
            style={styles.checkoutButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.checkoutButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.checkoutButton.backgroundColor)}
            onClick={() => alert("Proceed to Checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Pizza;