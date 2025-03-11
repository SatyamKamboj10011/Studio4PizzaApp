import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from "./Pizza";
import Home from "./Home";
import Drink from "./Drink";
import SideMenu from "./Side";
import Navbar from "./Navbar";
import DessertMenu from "./Dessert";
<<<<<<< HEAD
import Login from "./Login";
=======
import Checkout from "./Checkout"; // Import the Checkout component
>>>>>>> e89ce78582f1801bc151c00185bc5ed34db57cce

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/pizzas" element={<Pizza />} />
        
        <Route path="/drink" element={<Drink />} />
        <Route path="/side" element={<SideMenu />} />
        <Route path="/dessert" element={<DessertMenu />} />
<<<<<<< HEAD
       <Route path="/Login" element={<Login/>} />
=======
        <Route path="/checkout" element={<Checkout />} /> {/* Add the Checkout route */}
>>>>>>> e89ce78582f1801bc151c00185bc5ed34db57cce
      </Routes>
    </Router>
  );
}

export default App;