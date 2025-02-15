import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaYarn,
  FaInfoCircle,
  FaEnvelope,
  FaHome,
  FaBars,
  FaTimes,
  FaUser,
  FaRobot, // Add new icon for AI recommendations
} from "react-icons/fa";

const Navbar = ({ cart, user, setUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/home", icon: <FaHome />, text: "Home" },
    { to: "/products", icon: <FaShoppingCart />, text: "Products" },
    { to: "/recommendations", icon: <FaRobot />, text: "AI Recommendations" }, // Add new link
    { to: "/about", icon: <FaInfoCircle />, text: "About" },
    { to: "/contact", icon: <FaEnvelope />, text: "Contact" },
  ];

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/"); // Redirect to the dashboard page
  };

  const userDisplay = user ? (
    <div className="flex items-center space-x-2">
      <FaUser className="text-teal-600" />
      <span className="text-gray-700">{user.username}</span>
      <button
        onClick={handleLogout}
        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  ) : null;

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/home" className="flex items-center space-x-2">
          <FaYarn className="text-3xl text-blue-600" />
          <span className="text-2xl font-bold">KSP Yarns</span>
        </Link>

        <nav className="hidden md:flex space-x-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                location.pathname === link.to
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {link.icon}
              <span className="ml-2">{link.text}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {userDisplay}
          <Link
            to="/cart"
            className="relative p-2 rounded-md hover:bg-gray-100"
            aria-label="Cart"
          >
            <FaShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    location.pathname === link.to
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.text}</span>
                </Link>
              ))}
              <Link
                to="/cart"
                className="flex items-center px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600 relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaShoppingCart className="mr-2" /> Cart
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
