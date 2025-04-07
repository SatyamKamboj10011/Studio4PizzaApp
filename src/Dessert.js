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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  keyframes,
  Paper,
} from "@mui/material";
import { AddShoppingCart, Close, LocalCafe, Cake, Icecream, BakeryDining, Star, Favorite } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DessertMenu = () => {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("alphabetically");
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/desserts")
      .then((response) => {
        setDesserts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching desserts:", error);
      });
  }, []);

  const handleOpenDialog = (dessert) => {
    setSelectedDessert(dessert);
    setQuantity(1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDessert(null);
    setQuantity(1);
  };

  const addToCart = () => {
    if (!selectedDessert) return;

    const totalPrice = selectedDessert.price * quantity;
    const newItem = {
      item_id: selectedDessert.id,
      name: selectedDessert.name,
      category: "Dessert",
      quantity: quantity,
      total_price: totalPrice,
      image: selectedDessert.image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setSnackbarMessage(`${quantity} ${selectedDessert.name}${quantity > 1 ? 's' : ''} added to cart!`);
    setOpenSnackbar(true);
    handleCloseDialog();
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

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  return (
    <Box>
      <HeroSection>
        <HeroOverlay>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: "bold", 
              mb: 3, 
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              letterSpacing: "1px",
            }}
          >
            🍰 Gourmet Desserts
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mt: 2, 
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              fontWeight: "300",
              letterSpacing: "1px",
            }}
          >
            Sweet endings to your perfect meal!
          </Typography>
        </HeroOverlay>
      </HeroSection>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mb: 8, 
          gap: 2, 
          flexWrap: "wrap",
          "& > button": {
            marginBottom: 2,
          }
        }}>
          <CategoryButton active={category === "all"} onClick={() => setCategory("all")}>
            All Desserts
          </CategoryButton>
          <CategoryButton active={category === "cakes"} onClick={() => setCategory("cakes")}>
            <Cake sx={{ mr: 1 }} /> Cakes
          </CategoryButton>
          <CategoryButton active={category === "ice_cream"} onClick={() => setCategory("ice_cream")}>
            <Icecream sx={{ mr: 1 }} /> Ice Cream
          </CategoryButton>
          <CategoryButton active={category === "pastries"} onClick={() => setCategory("pastries")}>
            <BakeryDining sx={{ mr: 1 }} /> Pastries
          </CategoryButton>
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

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredDesserts.map((dessert) => (
              <Grid item xs={12} sm={6} md={4} key={dessert.id}>
                <StyledCard>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={`http://localhost:5000/images/${dessert.image}`}
                      alt={dessert.name}
                      sx={{ 
                        height: 280, 
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                    <FavoriteIcon className="favorite-icon">
                      <Favorite sx={{ color: "#ff4b2b" }} />
                    </FavoriteIcon>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: "bold", 
                        mb: 2,
                        color: "#2c3e50",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {dessert.name}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 3, 
                        minHeight: "60px",
                        lineHeight: 1.6,
                      }}
                    >
                      {dessert.description}
                    </Typography>
                    <RatingBox>
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </RatingBox>
                    <Box sx={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      mb: 3,
                      mt: 2,
                    }}>
                      <PriceTag>${formatPrice(dessert.price)}</PriceTag>
                    </Box>
                    <StyledButton
                      fullWidth
                      startIcon={<AddShoppingCart />}
                      onClick={() => handleOpenDialog(dessert)}
                    >
                      Add to Cart
                    </StyledButton>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <StyledDialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          pb: 2,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Add to Cart</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ 
              color: "#ff4b2b",
              "&:hover": {
                background: "rgba(255, 75, 43, 0.1)",
              }
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          {selectedDessert && (
            <>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                mb: 3,
                gap: 3,
              }}>
                <img
                  src={`http://localhost:5000/images/${selectedDessert.image}`}
                  alt={selectedDessert.name}
                  style={{ 
                    width: 150, 
                    height: 150, 
                    objectFit: "cover", 
                    borderRadius: 20,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    }
                  }}
                />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    {selectedDessert.name}
                  </Typography>
                  <PriceTag sx={{ mt: 1 }}>${formatPrice(selectedDessert.price)} each</PriceTag>
                  <RatingBox sx={{ mt: 2 }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </RatingBox>
                </Box>
              </Box>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={quantity}
                  label="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography 
                variant="h5" 
                sx={{ 
                  textAlign: "right", 
                  color: "#ff4b2b", 
                  fontWeight: "bold",
                  mt: 2,
                }}
              >
                Total: ${formatPrice(selectedDessert.price * quantity)}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              color: "#666",
              "&:hover": {
                background: "rgba(0,0,0,0.05)",
              }
            }}
          >
            Cancel
          </Button>
          <StyledButton onClick={addToCart}>Add to Cart</StyledButton>
        </DialogActions>
      </StyledDialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success" 
          sx={{ 
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DessertMenu;
