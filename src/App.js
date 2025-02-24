import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pizza from "./Pizza";
import Home from "./Home";
import Drink from "./Drink";
import Navbar from "./Navbar";
// import Side from "./pages/Side";
// import Dessert from "./pages/Dessert";
// import Drink from "./pages/Drink";
// import Checkout from "./pages/Checkout";


function App() {
  return (
    <Router>
     

      <Routes>

        <Route path="/pizzas" element={<Pizza />} />
        <Route path="/home" element={<Home />} />
        <Route path="/drink" element={<Drink />} />
        {/* <Route path="/side" element={<Side />} />
        <Route path="/dessert" element={<Dessert />} />
     
        <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
