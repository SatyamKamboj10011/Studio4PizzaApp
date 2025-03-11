import React, { useState, useEffect } from "react";
import axios from "axios";

const prices = {
  small: "small_price",
  large: "large_price",
  extraLarge: "extra_large_price",
};

const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/menu")
      .then((response) => {
        setPizzas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);

  const addToCart = (pizza, size, quantity) => {
    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    const totalPrice = pizza[prices[size]] * quantity;
    const newItem = { pizza, size, quantity, totalPrice };
    setCart([...cart, newItem]);
    alert(`${quantity} ${size} ${pizza.name} added to cart! Total: $${totalPrice.toFixed(2)}`);
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200.png?text=Image+Not+Available";
  };

  const styles = {
    pizzaPage: { padding: "2rem", backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" },
    pizzaContainer: { maxWidth: "1200px", margin: "0 auto", backgroundColor: "rgba(255, 255, 255, 0.80)", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    pageTitle: { textAlign: "center", fontSize: "2.5rem", color: "#4caf50", marginBottom: "2rem", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" },
    pizzaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" },
    pizzaCard: { backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s, box-shadow 0.3s" },
    pizzaImage: { width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" },
    pizzaName: { fontSize: "1.5rem", color: "#333", marginBottom: "0.5rem", fontWeight: "bold" },
    pizzaPrice: { color: "#666", marginBottom: "1rem", fontSize: "1rem" },
    sizeSelect: { width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem", fontSize: "1rem" },
    quantityInput: { width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem", fontSize: "1rem" },
    addToCartButton: { width: "100%", padding: "0.75rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", transition: "background-color 0.3s" },
    cartSummary: { position: "fixed", bottom: "1rem", right: "1rem", backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    cartItem: { marginBottom: "0.5rem" },
    cartItemPrice: { color: "#666", fontSize: "0.9rem" },
    checkoutButton: { width: "100%", padding: "0.75rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", transition: "background-color 0.3s" },
  };

  return (
    <div style={styles.pizzaPage}>
      <div style={styles.pizzaContainer}>
        <h2 style={styles.pageTitle}>🍕 Pizza Menu</h2>
        <div style={styles.pizzaGrid}>
          {pizzas.map((pizza) => (
            <div key={pizza.id} style={styles.pizzaCard}>
              <img
                src={`http://localhost:5000/images/${pizza.image}`} 
                alt={pizza.name}
                style={styles.pizzaImage}
                onError={handleImageError}
              />
              <h3 style={styles.pizzaName}>{pizza.name}</h3>
              <p style={styles.pizzaPrice}>
                Small: ${pizza.small_price} | Large: ${pizza.large_price} | XL: ${pizza.extra_large_price}
              </p>
              <select id={`size-${pizza.id}`} style={styles.sizeSelect}>
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
                onClick={() => {
                  const size = document.getElementById(`size-${pizza.id}`).value;
                  const quantity = parseInt(document.getElementById(`quantity-${pizza.id}`).value, 10);
                  addToCart(pizza, size, quantity);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <div style={styles.cartSummary}>
          <h3>🛒 Cart Summary</h3>
          {cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <p>{item.quantity} x {item.pizza.name} ({item.size})</p>
              <p style={styles.cartItemPrice}>${item.totalPrice.toFixed(2)}</p>
            </div>
          ))}
          <button style={styles.checkoutButton} onClick={() => alert("Proceed to Checkout")}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Pizza;
