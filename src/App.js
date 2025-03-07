import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from "./Pizza";
import Home from "./Home";
import Drink from "./Drink";
import SideMenu from "./Side";
import Navbar from "./Navbar";
import DessertMenu from "./Dessert";
import Checkout from "./Checkout"; // Import the Checkout component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/pizzas" element={<Pizza />} />
        <Route path="/" element={<Home />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/side" element={<SideMenu />} />
        <Route path="/dessert" element={<DessertMenu />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Add the Checkout route */}
      </Routes>
    </Router>
  );
}

export default App;