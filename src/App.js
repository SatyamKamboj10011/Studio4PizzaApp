import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Login from "./Login";
import Footer from "./Footer";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/pizzas" element={
            <ProtectedRoute>
              <Pizza />
            </ProtectedRoute>
          } />
          <Route path="/drink" element={
            <ProtectedRoute>
              <Drink />
            </ProtectedRoute>
          } />
          <Route path="/side" element={
            <ProtectedRoute>
              <SideMenu />
            </ProtectedRoute>
          } />
          <Route path="/dessert" element={
            <ProtectedRoute>
              <DessertMenu />
            </ProtectedRoute>
          } />
          <Route path="/addmenu" element={
            <ProtectedRoute>
              <AddMenuPage />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <ContactUs />
            </ProtectedRoute>
          } />
          
          {/* Redirect root to home if authenticated, login if not */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;