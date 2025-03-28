import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from "./Pizza";
import Home from "./Home";
import Drink from "./Drink";
import SideMenu from "./Side";
import Navbar from "./Navbar";
import DessertMenu from "./Dessert";
import Login from "./Login";  // ✅ Added import
import Footer from "./Footer";  // ✅ Added import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/pizzas" element={<Pizza />} />
        <Route path="/" element={<Login />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/side" element={<SideMenu />} />
        <Route path="/dessert" element={<DessertMenu />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
