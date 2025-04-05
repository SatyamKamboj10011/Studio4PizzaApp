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
  CircularProgress,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [cart, setCart] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("alphabetically");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/drinks")
      .then((response) => {
        setDrinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drinks:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addToCart = (drink) => {
    const updatedCart = [...(JSON.parse(localStorage.getItem("cart")) || []), {
      ...drink,
      category: "drinks",
      quantity: 1,
      total_price: drink.price,  // drinks usually have fixed price
    }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSnackbarMessage(`${drink.name} added to cart!`);
    setOpenSnackbar(true);
  };
  

  const sortedDrinks = [...drinks];
  if (sortOption === "alphabetically") {
    sortedDrinks.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "priceLowToHigh") {
    sortedDrinks.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    sortedDrinks.sort((a, b) => b.price - a.price);
  }

  const filteredDrinks =
    category === "all"
      ? sortedDrinks
      : sortedDrinks.filter((drink) => drink.category === category);

  return (
    <Box sx={{ backgroundColor: "#0d0d0d", paddingTop: 10 }}>
      <Box
        sx={{
          backgroundImage: "linear-gradient(45deg, #ff416c, #ff4b2b)",
          height: 450,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box sx={{ padding: "20px 40px", borderRadius: "10px" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            🥤 Futuristic Drinks
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Sip into the future with our cosmic flavors!
          </Typography>
        </Box>
      </Box>

      <Container sx={{ py: 6 }} maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4, gap: 2 }}>
          <FormControl sx={{ minWidth: 160, backgroundColor: "white", borderRadius: 1 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="cold">Cold Drinks</MenuItem>
              <MenuItem value="hot">Hot Drinks</MenuItem>
              <MenuItem value="alcoholic">Alcoholic Drinks</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160, backgroundColor: "white", borderRadius: 1 }}>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              label="Sort"
            >
              <MenuItem value="alphabetically">Alphabetically</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
  {filteredDrinks.map((drink) => (
    <Grid item xs={12} sm={6} md={4} key={drink.drink_id}>
      <Card
        sx={{
          borderRadius: 6,
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.05)" },
          boxShadow: 3,
          backgroundColor: "#222",
          color: "white"
        }}
      >
        <CardMedia
          component="img"
          image={`http://localhost:5000/images/${drink.image}`}
          alt={drink.name}
          sx={{ height: 250, objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-drink.jpg"; // Make sure this exists in public folder
          }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff4b2b" }}>
            {drink.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            Price: ${drink.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: 4,
              backgroundColor: "#ff4b2b",
              "&:hover": { backgroundColor: "#e63946" }
            }}
            startIcon={<AddShoppingCart />}
            onClick={() => addToCart(drink)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

        )}
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Drinks;
