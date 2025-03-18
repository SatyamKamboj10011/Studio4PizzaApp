import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { AddShoppingCart } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

// Snackbar Alert
const CustomAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DrinksMenu = () => {
  const [drinks, setDrinks] = useState([]);
  const [cart, setCart] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("alphabetically");

  // Fetch drinks from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/drinks")
      .then((response) => {
        setDrinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drinks:", error);
      });
  }, []);

  // Add item to cart
  const addToCart = (drink, quantity) => {
    const totalPrice = drink.price * quantity;
    const newItem = { drink, quantity, totalPrice };
    setCart([...cart, newItem]);
    setSnackbarMessage(`${quantity} ${drink.name} added to cart! Total: $${totalPrice.toFixed(2)}`);
    setOpenSnackbar(true);
  };

  // Sorting logic
  const sortedDrinks = [...drinks];
  if (sortOption === "alphabetically") {
    sortedDrinks.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "priceLowToHigh") {
    sortedDrinks.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    sortedDrinks.sort((a, b) => b.price - a.price);
  }

  // Filter drinks based on category
  const filteredDrinks = category === "all" ? sortedDrinks : sortedDrinks.filter((drink) => drink.category === category);

  return (
    <Container fluid className="drinks-container">
      <style>
        {`
          .drinks-container {
            background: #0d0d0d;
            color: #fff;
            padding: 20px;
          }
          .hero-section {
            background: linear-gradient(45deg, #ff416c, #ff4b2b);
            height: 60vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #fff;
          }
          .hero-title {
            font-size: 3rem;
            font-weight: bold;
          }
          .drink-card {
            background: #222;
            border: none;
            color: white;
            transition: transform 0.3s;
          }
          .drink-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 10px 20px rgba(255, 75, 43, 0.5);
          }
          .add-to-cart-btn {
            background: #ff4b2b;
            border: none;
            transition: background 0.3s;
          }
          .add-to-cart-btn:hover {
            background: #e63946;
          }
        `}
      </style>
      
      <div className="hero-section">
        <div>
          <h1 className="hero-title">🥤 Futuristic Drinks</h1>
          <p className="hero-subtitle">Sip into the future with our cosmic flavors!</p>
        </div>
      </div>

      <Container className="filters">
        <Row>
          <Col md={4}>
            <InputGroup>
              <FormControl as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All</option>
                <option value="cold">Cold Drinks</option>
                <option value="hot">Hot Drinks</option>
                <option value="alcoholic">Alcoholic Drinks</option>
              </FormControl>
            </InputGroup>
          </Col>
          <Col md={4}>
            <InputGroup>
              <FormControl as="select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="alphabetically">Alphabetically</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </FormControl>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Row className="g-4">
        {filteredDrinks.map((drink) => (
          <Col key={drink.id} xs={12} sm={6} md={4}>
            <Card className="drink-card">
              <Card.Img variant="top" src={`http://localhost:5000/images/${drink.image}`} alt={drink.name} />
              <Card.Body>
                <Card.Title>{drink.name}</Card.Title>
                <Card.Text>Price: ${drink.price}</Card.Text>
                <Button className="add-to-cart-btn" onClick={() => addToCart(drink, 1)}>
                  <AddShoppingCart /> Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <CustomAlert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </CustomAlert>
      </Snackbar>
    </Container>
  );
};

export default DrinksMenu;
