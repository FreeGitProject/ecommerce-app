import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
       <Navbar />
       <div className="container my-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
