import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import DashboardLanding from "./components/DashboardLanding";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RecommendationsPage from "./components/RecommendationsPage"; // Imported RecommendationsPage
import { checkAuthStatus } from "./utils/auth";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load cart from local storage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Check user authentication status
    const { isAuthenticated, username } = checkAuthStatus();
    if (isAuthenticated) {
      setUser({ username });
    }
  }, []);

  useEffect(() => {
    // Persist cart changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // PrivateRoute to protect authenticated routes
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Show Navbar for logged-in users */}
        {user && <Navbar cart={cart} user={user} setUser={setUser} />}

        <main className="flex-grow container mx-auto p-6 mt-16">
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<DashboardLanding />} />

            {/* Login & Signup - Redirect if logged in */}
            <Route
              path="/login"
              element={user ? <Navigate to="/home" replace /> : <Login setUser={setUser} />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/home" replace /> : <Signup />}
            />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductPage addToCart={addToCart} />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <AboutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <ContactPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                </PrivateRoute>
              }
            />
            <Route
              path="/recommendations"
              element={
                <PrivateRoute>
                  <RecommendationsPage />
                </PrivateRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Show Footer only for logged-in users */}
        {user && <Footer />}
      </div>
    </Router>
  );
}

export default App;
