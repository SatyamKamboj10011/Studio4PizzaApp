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

  // Sample drinks data
  const sampleDrinks = [
    {
      id: 1,
      name: "Neon Nitro Cola",
      price: 4.99,
      category: "cold",
      image: "cola.jpeg",
      description: "Glowing carbonated beverage with electric lime flavor"
    },
    {
      id: 2,
      name: "Quantum Quencher",
      price: 5.49,
      category: "cold",
      image: "quantum.jpeg",
      description: "Zero-gravity infused ice tea with holographic bubbles"
    },
    {
      id: 3,
      name: "Solar Flare Latte",
      price: 6.99,
      category: "hot",
      image: "latte.jpeg",
      description: "Sun-powered coffee with caramelized stardust topping"
    },
    {
      id: 4,
      name: "Galactic Gulp",
      price: 7.99,
      category: "alcoholic",
      image: "gulp.jpeg",
      description: "Vortex vodka with nebula nectar and asteroid ice"
    },
    {
      id: 5,
      name: "Cyber Citrus Splash",
      price: 4.49,
      category: "cold",
      image: "splash.jpg",
      description: "AI-enhanced orange juice with quantum pulp"
    },
    {
      id: 6,
      name: "Hologram Hot Chocolate",
      price: 6.49,
      category: "hot",
      image: "hotchocolate.jpeg",
      description: "Projection-mapped cocoa with floating marshmallow clouds"
    },
    {
      id: 7,
      name: "Plasma Punch",
      price: 8.99,
      category: "alcoholic",
      image: "punch.jpeg",
      description: "Ionized rum with anti-gravity pineapple foam"
    },
    {
      id: 8,
      name: "Neural Network Nitro",
      price: 5.99,
      category: "cold",
      image: "nitro.jpeg",
      description: "Deep learning-optimized cold brew coffee"
    },
    {
      id: 9,
      name: "Singularity Soda",
      price: 4.99,
      category: "cold",
      image: "soda.jpeg",
      description: "Black hole-infused cola with infinite fizz"
    },
    {
      id: 10,
      name: "Warp Core Whiskey",
      price: 9.99,
      category: "alcoholic",
      image: "whiskey.jpeg",
      description: "Subspace-aged bourbon with dilithium crystals"
    },
    {
      id: 11,
      name: "Android Affogato",
      price: 7.49,
      category: "hot",
      image: "affogato.webp",
      description: "Robotic espresso poured over quantum ice cream"
    },
    {
      id: 12,
      name: "Photon Frappé",
      price: 6.99,
      category: "cold",
      image: "frappe.jpeg",
      description: "Light-speed blended mocha with laser whipped cream"
    }
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/drinks")
      .then((response) => {
        // Use API data if available, otherwise use sample drinks
        setDrinks(response.data.length > 0 ? response.data : sampleDrinks);
      })
      .catch((error) => {
        console.error("Error fetching drinks:", error);
        setDrinks(sampleDrinks); // Fallback to sample data
      });
  }, []);

  const addToCart = (drink) => {
    setCart([...cart, drink]);
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
            <InputLabel></InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="cold">Cold Drinks</MenuItem>
              <MenuItem value="hot">Hot Drinks</MenuItem>
              <MenuItem value="alcoholic">Alcoholic Drinks</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160, backgroundColor: "white", borderRadius: 1 }}>
            <InputLabel></InputLabel>
            <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <MenuItem value="alphabetically">Alphabetically</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={4}>
          {filteredDrinks.map((drink) => (
            <Grid item xs={12} sm={6} md={4} key={drink.id}>
              <Card sx={{ 
                borderRadius: 6, 
                transition: "transform 0.3s", 
                "&:hover": { transform: "scale(1.05)" }, 
                boxShadow: 3,
                backgroundColor: "#222",
                color: "white"
              }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:5000/images/${drink.image}`}
                  alt={drink.name}
                  sx={{ height: 250, objectFit: "cover" }}
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