import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, InputBase, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Styled components
const CustomNavbar = styled(AppBar)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.85)", // Fixed dark background
  backdropFilter: "blur(10px)",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
}));

const StyledNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    color: #ff4b2b;
    transform: translateY(-2px);
  }
`;

const NavbarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItems, setCartItems] = useState(); // Example cart items count

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    { path: "/pizzas", name: "Pizza" },
    { path: "/side", name: "Side" },
    { path: "/dessert", name: "Dessert" },
    { path: "/drink", name: "Drink" },
    { path: "/addmenu", name: "Add Menu" },
    { path: "/checkout", name: "Checkout" },
    { path: "/", name: "Login" }, // Added Login link
  ];

  return (
    <CustomNavbar position="sticky">
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {navLinks.map((item, index) => (
            <MenuItem key={index} component={Link} to={item.path} onClick={handleMenuClose}>
              {item.name}
            </MenuItem>
          ))}
        </Menu>

        {/* Brand / Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/home"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.8rem",
            fontFamily: "'Pacifico', cursive",
          }}
        >
          🍕 BestPizza
        </Typography>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {navLinks.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
                mx: 1,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  color: "#ffd700",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>

        {/* Cart Icon */}
        <IconButton component={Link} to="/cart" color="inherit" sx={{ ml: 2 }}>
          <Badge badgeContent={cartItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </CustomNavbar>
  );
};

export default Navbar;