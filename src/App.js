import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from "./Pizza";
import Home from "./Home";
import Drink from "./Drink";
import SideMenu from "./Side";
import Navbar from "./Navbar";
import DessertMenu from "./Dessert";
import AddMenuPage from "./AddMenu";
import AboutUs from "./Aboutus";
import ContactUs from "./ContacUs";
import Registration from "./Registration";
import Login from "./Login"; // Add missing import
import Footer from "./Footer"; // Add missing import

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
        <Route path="/addmenu" element={<AddMenuPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;