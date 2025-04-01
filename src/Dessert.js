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

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shineAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: "url('https://images.unsplash.com/photo-1551024506-0bccfd828388?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: 500,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
  backdropFilter: "blur(5px)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
    zIndex: 1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
    zIndex: 1,
  },
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.5)",
  padding: "40px 80px",
  borderRadius: "30px",
  textAlign: "center",
  position: "relative",
  zIndex: 2,
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
    backgroundSize: "200% 100%",
    animation: `${shineAnimation} 3s linear infinite`,
    borderRadius: "30px",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 25,
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-15px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    "& .MuiCardMedia-root": {
      transform: "scale(1.1)",
    },
    "& .favorite-icon": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff4b2b, #ff416c)",
  color: "white",
  borderRadius: 30,
  padding: "12px 30px",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop: "auto",
  textTransform: "none",
  fontSize: "1.1rem",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  boxShadow: "0 4px 15px rgba(255, 75, 43, 0.2)",
  "&:hover": {
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    transform: "translateY(-3px)",
    boxShadow: "0 8px 25px rgba(255, 75, 43, 0.3)",
  },
}));

const CategoryButton = styled(Button)(({ theme, active }) => ({
  borderRadius: 30,
  padding: "10px 25px",
  margin: "0 5px",
  textTransform: "none",
  background: active ? "linear-gradient(45deg, #ff4b2b, #ff416c)" : "transparent",
  color: active ? "white" : "#ff4b2b",
  border: active ? "none" : "2px solid #ff4b2b",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "all 0.3s ease",
  boxShadow: active ? "0 4px 15px rgba(255, 75, 43, 0.2)" : "none",
  "&:hover": {
    background: "linear-gradient(45deg, #ff4b2b, #ff416c)",
    color: "white",
    border: "none",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(255, 75, 43, 0.3)",
  },
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff4b2b, #ff416c)",
  color: "white",
  padding: "10px 20px",
  borderRadius: 25,
  display: "inline-block",
  fontWeight: "bold",
  animation: `${pulseAnimation} 2s infinite`,
  boxShadow: "0 4px 15px rgba(255, 75, 43, 0.2)",
  letterSpacing: "0.5px",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 25,
    padding: theme.spacing(3),
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
}));

const FavoriteIcon = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  background: "rgba(255, 255, 255, 0.9)",
  opacity: 0,
  transform: "translateY(-10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 1)",
    transform: "translateY(-10px) scale(1.1)",
  },
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  marginTop: 8,
  color: "#ffd700",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  background: "linear-gradient(45deg, #ff4b2b, #ff416c)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

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
        // Format prices to ensure they're numbers
        const formattedDesserts = response.data.map(dessert => ({
          ...dessert,
          price: parseFloat(dessert.price)
        }));
        setDesserts(formattedDesserts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching desserts:", error);
        setLoading(false);
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

  const sortedDesserts = [...desserts];
  if (sortOption === "alphabetically") {
    sortedDesserts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "priceLowToHigh") {
    sortedDesserts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    sortedDesserts.sort((a, b) => b.price - a.price);
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

        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mb: 6,
          "& .MuiFormControl-root": {
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            padding: 1,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }
        }}>
          <FormControl sx={{ minWidth: 200 }}>
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