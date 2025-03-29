import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import AdminDashboard from "./AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login/>}/>
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
