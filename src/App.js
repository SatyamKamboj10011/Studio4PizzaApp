import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from "./Pizza";
import Home from "./Home";
import Drink from "./Drink";
import SideMenu from "./Side";
import Navbar from "./Navbar"; // Import the Navbar component
import DessertMenu from "./Dessert";
import Login from "./Login";

function App() {
  return (
    <Router>
      {/* Include the Navbar component here */}
      <Navbar />

      <Routes>
        <Route path="/pizzas" element={<Pizza />} />
        <Route path="/" element={<Home />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/side" element={<SideMenu />} />
        <Route path="/dessert" element={<DessertMenu />} />
       <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;