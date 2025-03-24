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
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const DessertMenu = () => {
  const [desserts, setDesserts] = useState([]);
  const [cart, setCart] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("alphabetically");

  useEffect(() => {
    axios
      .get("http://localhost:5000/desserts")
      .then((response) => setDesserts(response.data))
      .catch((error) => console.error("Error fetching desserts:", error));
  }, []);

  const addToCart = (dessert) => {
    setCart([...cart, dessert]);
    setSnackbarMessage(`${dessert.name} added to cart!`);
    setOpenSnackbar(true);
  };

  const sortedDesserts = [...desserts].filter(
    (dessert) => dessert.name && dessert.price !== undefined
  );

  if (sortOption === "alphabetically") {
    sortedDesserts.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  } else if (sortOption === "priceLowToHigh") {
    sortedDesserts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (sortOption === "priceHighToLow") {
    sortedDesserts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  }

  const filteredDesserts =
    category === "all"
      ? sortedDesserts
      : sortedDesserts.filter((dessert) => dessert.category === category);

  return (
    <Box sx={{ backgroundColor: "#fafafa", paddingTop: 10 }}>
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
            🍰 Gourmet Desserts
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Savor the finest sweet delicacies!
          </Typography>
        </Box>
      </Box>

      <Container sx={{ py: 6 }} maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4, gap: 2 }}>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="cakes">Cakes</MenuItem>
              <MenuItem value="pastries">Pastries</MenuItem>
              <MenuItem value="icecream">Ice Cream</MenuItem>
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

        <Grid container spacing={4}>
          {filteredDesserts.map((dessert) => (
            <Grid item xs={12} sm={6} md={4} key={dessert.id}>
              <Card sx={{ borderRadius: 6, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" }, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:5000/images/${dessert.image}`}
                  alt={dessert.name}
                  sx={{ height: 250, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                    {dessert.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${dessert.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, borderRadius: 4 }}
                    startIcon={<AddShoppingCart />}
                    onClick={() => addToCart(dessert)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DessertMenu;
