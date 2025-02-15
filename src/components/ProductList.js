import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FaSort, FaCartPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import CartPage from './CartPage';
import Footer from './Footer';
import Navbar from './Navbar';
import DashboardLanding from './DashboardLanding';
import Login from './Login';
import Signup from './Signup';
import { checkAuthStatus } from '../utils/auth';
import './App.css';

const ProductSort = ({ onSort, currentSort }) => {
  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  return (
    <div className="flex items-center space-x-2 mb-4">
      <FaSort className="text-gray-600" />
      <select
        value={currentSort}
        onChange={(e) => onSort(e.target.value)}
        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort by...</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = checkAuthStatus();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const sortProducts = (productsToSort, sortCriteria) => {
    if (!sortCriteria) return productsToSort;

    const sorted = [...productsToSort];
    switch (sortCriteria) {
      case 'price-asc':
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price-desc':
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5004/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data); // Log fetched products
        // Apply initial sorting if sortBy has a value
        const sortedData = sortProducts(data, sortBy);
        console.log('Sorted products:', sortedData); // Log sorted products
        setProducts(sortedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy]); // Add sortBy to dependencies to fetch products when sortBy changes

  const handleSort = (value) => {
    setSortBy(value);
    console.log('Selected sort option:', value); // Log selected sort option
    // Sort the existing products array instead of fetching again
    const sortedProducts = sortProducts(products, value);
    console.log('Sorted products after selection:', sortedProducts); // Log sorted products after selection
    setProducts(sortedProducts);
  };

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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
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

  // If the user is not logged in, navigate to /login
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">Error: {error}</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Show Navbar for users */}
        {user && <Navbar cart={cart} user={user} setUser={setUser} />}

        <main className="flex-grow container mx-auto p-6 mt-16">
          <Routes>
            <Route path="/" element={<DashboardLanding />} />

            {/* Redirect logged in users from /login to /home */}
            <Route
              path="/login"
              element={
                user ? <Navigate to="/home" /> : <Login setUser={setUser} />
              }
            />

            {/* Redirect logged in users from /signup to /home */}
            <Route
              path="/signup"
              element={user ? <Navigate to="/home" /> : <Signup />}
            />

            {/* Protected routes for normal users */}
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
                  <CartPage
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
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

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Show Footer only for logged-in users */}
        {user && <Footer />}
      </div>
    </Router>
  );
};

export default ProductList;
