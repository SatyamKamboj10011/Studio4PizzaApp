import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const CustomNavbar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled ? "rgba(0, 0, 0, 0.85)" : "linear-gradient(90deg, #ff416c, #ff4b2b)",
  boxShadow: scrolled ? "0px 4px 15px rgba(255, 255, 255, 0.2)" : "0px 4px 15px rgba(255, 64, 91, 0.5)",
  transition: "all 0.3s ease-in-out",
}));

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CustomNavbar position="sticky" scrolled={scrolled}>
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>

        {/* Brand / Logo */}
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "1.8rem" }}>
          🍕 BestPizza
        </Typography>

        {/* Navigation Links */}
        <Nav className="d-none d-sm-flex">
          {[{ path: "/pizzas", name: "Pizza" }, { path: "/side", name: "Side" }, { path: "/dessert", name: "Dessert" }, { path: "/drink", name: "Drink" }, { path: "/addmenu", name: "Add Menu" }, { path: "/checkout", name: "Checkout" }].map((item, index) => (
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
                  textShadow: "0px 0px 8px #ffd700",
                },
              }}
            >
              {item.name}
            </Button>
          ))}
        </Nav>
      </Toolbar>
    </CustomNavbar>
  );
};

export default NavbarComponent;
