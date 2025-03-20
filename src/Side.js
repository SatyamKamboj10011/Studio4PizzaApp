import React, { useState, useEffect } from "react";
import axios from "axios";

const prices = {
  small: "small_price",
  large: "large_price",
};

const SideMenu = () => {
  const [sides, setSides] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch side menu data from the backend (Express API)
    axios.get("http://localhost:5000/side")
      .then((response) => {
        setSides(response.data);  // Store the side data
        console.log(response.data);  // Log the side data
      })
      .catch((error) => {
        console.error("Error fetching sides:", error);
      });
  }, []);

  const addToCart = (side, size, quantity) => {
    const totalPrice = side[prices[size]] * quantity;

    // Check if the side already exists in the cart with the same size
    const existingItemIndex = cart.findIndex(
      (item) => item.side.id === side.id && item.size === size
    );

    if (existingItemIndex !== -1) {
      // Update quantity and totalPrice of the existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice += totalPrice;
      setCart(updatedCart);
      alert(`Updated: ${quantity} ${size} ${side.name} added to cart! New Total: $${updatedCart[existingItemIndex].totalPrice.toFixed(2)}`);
    } else {
      // Add new item to cart
      const newItem = { side, size, quantity, totalPrice };
      setCart([...cart, newItem]);
      alert(`${quantity} ${size} ${side.name} added to cart! Total: $${totalPrice.toFixed(2)}`);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200.png?text=Image+Not+Available"; // Fallback image if loading fails
  };

  const styles = {
    sidePage: { padding: "2rem", backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" },
    sideContainer: { maxWidth: "1200px", margin: "0 auto", backgroundColor: "rgba(255, 255, 255, 0.80)", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    pageTitle: { textAlign: "center", fontSize: "2.5rem", color: "#4caf50", marginBottom: "2rem", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" },
    sideGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" },
    sideCard: { backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s, box-shadow 0.3s" },
    sideImage: { width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" },
    sideName: { fontSize: "1.5rem", color: "#333", marginBottom: "0.5rem", fontWeight: "bold" },
    sidePrice: { color: "#666", marginBottom: "1rem", fontSize: "1rem" },
    sizeSelect: { width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem", fontSize: "1rem" },
    quantityInput: { width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem", fontSize: "1rem" },
    addToCartButton: { width: "100%", padding: "0.75rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", transition: "background-color 0.3s" },
    addToCartButtonHover: { backgroundColor: "#45a049" },
    cartSummary: { position: "fixed", bottom: "1rem", right: "1rem", backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    cartItem: { marginBottom: "0.5rem" },
    cartItemPrice: { color: "#666", fontSize: "0.9rem" },
    checkoutButton: { width: "100%", padding: "0.75rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", transition: "background-color 0.3s" },
    checkoutButtonHover: { backgroundColor: "#45a049" },
  };

  return (
    <div style={styles.sidePage}>
      {/* Main Content */}
      <div style={styles.sideContainer}>
        <h2 style={styles.pageTitle}>🍟 Side Menu</h2>
        <div style={styles.sideGrid}>
          {sides.map((side) => (
            <div key={side.id} style={styles.sideCard}>
              {/* Add base URL for images */}
              <img
                src={`http://localhost:5000/images/${side.image}`} 
                alt={side.name}
                style={styles.sideImage}
                onError={handleImageError} // Handle missing images
              />

              <h3 style={styles.sideName}>{side.name}</h3>
              <p style={styles.sidePrice}>
                Small: ${side.small_price} | Large: ${side.large_price}
              </p>
              <select
                id={`size-${side.id}`}
                style={styles.sizeSelect}
              >
                <option value="small">Small</option>
                <option value="large">Large</option>
              </select>
              <input
                type="number"
                id={`quantity-${side.id}`}
                defaultValue={1}
                min={1}
                style={styles.quantityInput}
              />
              <button
                style={styles.addToCartButton}
                onClick={() => {
                  const size = document.getElementById(`size-${side.id}`).value;
                  const quantity = parseInt(document.getElementById(`quantity-${side.id}`).value);
                  addToCart(side, size, quantity);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div style={styles.cartSummary}>
          <h3>🛒 Cart Summary</h3>
          {cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <p>{item.quantity} x {item.side.name} ({item.size})</p>
              <p style={styles.cartItemPrice}>${item.totalPrice.toFixed(2)}</p>
            </div>
          ))}
          <button
            style={styles.checkoutButton}
            onClick={() => alert("Proceed to Checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
