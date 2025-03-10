import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

// Prices object for selecting the size
const prices = {
  small: "small_price",
  large: "large_price",
};

// Snackbar Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SideMenu = () => {
  const [sides, setSides] = useState([]);
  const [cart, setCart] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("alphabetically");

  // Fetch sides from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/side")
      .then((response) => {
        setSides(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sides:", error);
      });
  }, []);

  // Add item to cart
  const addToCart = (side, size, quantity) => {
    const totalPrice = side[prices[size]] * quantity;
    const newItem = { side, size, quantity, totalPrice };
    setCart([...cart, newItem]);
    setSnackbarMessage(`${quantity} ${size} ${side.name} added to cart! Total: $${totalPrice.toFixed(2)}`);
    setOpenSnackbar(true);
  };

  // Sorting logic
  const sortedSides = [...sides];
  if (sortOption === "alphabetically") {
    sortedSides.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "priceLowToHigh") {
    sortedSides.sort((a, b) => a.small_price - b.small_price);
  } else if (sortOption === "priceHighToLow") {
    sortedSides.sort((a, b) => b.small_price - a.small_price);
  }

  // Filter sides based on category
  const filteredSides = category === "all" ? sortedSides : sortedSides.filter((side) => side.category === category);

  return (
    <Box sx={{ backgroundColor: "#fafafa", paddingTop: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 450,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          backdropFilter: "blur(5px)",
          position: "relative",
        }}
      >
        <Box sx={{ background: "rgba(0, 0, 0, 0.6)", padding: "20px 40px", borderRadius: "10px" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            🍔 Side Delights
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Indulge in our best side dishes, crafted with passion!
          </Typography>
        </Box>
      </Box>

      {/* Sorting & Filters */}
      <Container sx={{ py: 6 }} maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4, gap: 2 }}>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="nonVegan">Non-Vegan</MenuItem>
              <MenuItem value="specialty">Specialty</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <MenuItem value="alphabetically">Alphabetically</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Sides Grid */}
        <Grid container spacing={4}>
          {filteredSides.map((side) => (
            <Grid item xs={12} sm={6} md={4} key={side.id}>
              <Card sx={{ borderRadius: 6, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" }, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:5000/images/${side.image}`}
                  alt={side.name}
                  sx={{ height: 250, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                    {side.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Small: ${side.small_price} | Large: ${side.large_price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, borderRadius: 4 }}
                    startIcon={<AddShoppingCart />}
                    onClick={() => addToCart(side, "small", 1)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SideMenu;
