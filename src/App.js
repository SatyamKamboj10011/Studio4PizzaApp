import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pizza from "./Pizza";
import Home from "./Home";
import Drink from "./Drink";
import SideMenu from "./Side";
import Navbar from "./Navbar"; // Import the Navbar component
import DessertMenu from "./Dessert";
import AddMenuPage from "./AddMenu";
import AboutUs from "./Aboutus";
import ContactUs from "./ContacUs";

function App() {
  return (
    <Router>
      {/* Include the Navbar component here */}
      <Navbar />

      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/pizzas" element={<Pizza />} />
        <Route path="/" element={<Login />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/side" element={<SideMenu />} />
        <Route path="/dessert" element={<DessertMenu />} />
        <Route path="/addmenu" element={<AddMenuPage/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        {/* <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
    <Footer/>
    </Router>
  );
}

export default App;