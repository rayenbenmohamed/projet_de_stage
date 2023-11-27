import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Product from './component/Product';
import About from './component/About';
import Cart from './component/Cart';
import ProductDetail from './component/ProductDetail';
import Checkout from './component/Checkout';
import Contact from './component/Contact';
import Footer from './component/Footer';
import Login from './component/Login'; 
import EditProfile from './component/EditProfile';
import Dashboard from './component/Dashboard';
import Admin from './component/Admin.js';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Utilisation de setIsAdmin, par exemple, pour basculer le statut admin
  const toggleAdminStatus = () => {
    setIsAdmin((prevAdmin) => !prevAdmin);
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/:userId"  element={<Dashboard/>} />
        <Route path="/edit-profile/:userId" element={<EditProfile/>} />
        <Route
          path="/login"
          element={<Login toggleAdminStatus={toggleAdminStatus} />}
        />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
