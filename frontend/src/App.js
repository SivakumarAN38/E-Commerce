import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import axios from 'axios';

function App() {

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Load user profile when token changes
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [token]);

  // Load cart once user logs in
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCart(res.data))
        .catch(() => setCart([]));
    }
  }, [token]);

  return (
    <Router>

      {/* NAVBAR (receives global cart + user) */}
      <Navbar user={user} cart={cart} />

      <Routes>

        <Route path="/" element={<HomePage />} />

        {/* PRODUCT LIST */}
        <Route
          path="/products"
          element={
            <ProductListPage
              token={token}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/products/:id"
          element={
            <ProductDetailPage
              token={token}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* CART PAGE */}
        <Route
          path="/cart"
          element={
            <CartPage
              token={token}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PROFILE */}
        <Route path="/profile" element={<ProfilePage user={user} />} />

        {/* CHECKOUT */}
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />

        {/* ORDER SUCCESS */}
        <Route path="/order-success" element={<OrderSuccessPage />} />

      </Routes>
    </Router>
  );
}

export default App;
