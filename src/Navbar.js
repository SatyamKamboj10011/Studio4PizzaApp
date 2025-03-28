import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, InputBase, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "./context/AuthContext";

// Styled components
const CustomNavbar = styled(AppBar)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.85)", // Fixed dark background
  backdropFilter: "blur(10px)",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  marginLeft: theme.spacing(2),
  width: "100%",
  maxWidth: "300px",
  display: "flex",
  alignItems: "center",
  padding: "0.25rem 0.5rem",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "white",
  padding: theme.spacing(0, 1),
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: "/pizzas", name: "Pizza" },
    { path: "/side", name: "Side" },
    { path: "/dessert", name: "Dessert" },
    { path: "/drink", name: "Drink" },
    { path: "/addmenu", name: "Add Menu" },
    { path: "/checkout", name: "Checkout" },
  ];

  return (
    <CustomNavbar position="sticky">
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {navLinks.map((item, index) => (
            <MenuItem key={index} component={Link} to={item.path} onClick={handleClose}>
              {item.name}
            </MenuItem>
          ))}
        </Menu>

        {/* Brand / Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
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
          <StyledInputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Navigation Links */}
        <div sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
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

        {/* Authentication Buttons */}
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/cart">
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Button>
            <Button color="inherit" onClick={handleMenu}>
              {user?.name || 'User'}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </CustomNavbar>
  );
};

export default Navbar;