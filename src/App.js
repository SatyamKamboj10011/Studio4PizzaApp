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
import Login from "./Login";
import Footer from "./Footer";
import CartPage from "./Cart";
import UserDashboard from"./UserDashboard";
import Invoice from "./Invoice";
import Checkout from "./Checkout";

import Register from "./Registration";

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
        <Route path="/addmenu" element={<AddMenuPage/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/userdashboard" element={<UserDashboard/>}/>
        <Route path="/Registration" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
        {/* <Route path="/checkout" element={<Checkout />} /> */}
      
       
       
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;