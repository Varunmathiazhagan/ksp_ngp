import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import useProducts from "../hooks/useProducts"; // Updated import

const ProductPage = ({ addToCart }) => {
  const [products] = useState([
    {
      id: 1,
      name: "2/20(s) Black Yarn",
      description: "High-quality open-end yarn for various textile applications.",
      price: 7.99,
      image: "/images/20(s)Black.jpg",
      category: "Yarn",
      rating: 4.0,
    },
    {
      id: 2,
      name: "2/20(s) Red Yarn",
      description: "Premium ring spun yarn known for its softness and durability.",
      price: 9.99,
      image: "/images/20(s)Red.jpg",
      category: "Yarn",
      rating: 5.0,
    },
    {
      id: 3,
      name: "2/20(s) White Yarn",
      description: "Durable polyester yarn for versatile textile applications.",
      price: 6.99,
      image: "/images/20(s)White.jpg",
      category: "Yarn",
      rating: 4.3,
    },
    {
      id: 4,
      name: "2/20(s) Grey Yarn",
      description: "Soft and sustainable cotton yarn for eco-friendly textiles.",
      price: 12.99,
      image: "/images/20(s)Grey.jpg",
      category: "Yarn",
      rating: 4.8,
    },
    {
      id: 5,
      name: "2/20(s) Sky Blue Yarn",
      description: "Natural bamboo yarn for breathable and comfortable fabrics.",
      price: 8.99,
      image: "/images/20(s)Sky_Blue.webp",
      category: "Yarn",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Wool Yarn",
      description: "Warm and cozy wool yarn for winter garments.",
      price: 14.99,
      image: "/images/20(s)steel_grey.jpg",
      category: "Yarn",
      rating: 4.9,
    },
  ]);

  const {
    products: filteredProducts,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    loading,
    error,
  } = useProducts(products); // This hook now properly handles both filtering and sorting

  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (selectedProduct) {
      controls.start("visible");
    }
  }, [controls, selectedProduct]);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...selectedProduct, quantity });
      setShowModal(false);
      setQuantity(1);
    }
  };

  if (loading)
    return (
      <div className="text-center text-2xl mt-8">
        <FaSpinner className="animate-spin" /> Loading products...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-2xl mt-8">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 bg-gray-100 min-h-screen py-10">
      <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
        Our Premium Products
      </h1>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-4 pl-12 border border-gray-300 rounded w-2/3 focus:ring-2 focus:ring-teal-400 shadow-md bg-white text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-4 border border-gray-300 rounded w-1/4 focus:ring-2 focus:ring-teal-400 shadow-md bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer bg-white p-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-6 text-gray-900">
                <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                  {product.name}
                </h2>
                <p className="text-gray-700 mb-6">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    <FaRupeeSign className="inline-block mr-1" />
                    {(product.price * 82.23).toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-lg"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal for Adding to Cart */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">Add to Cart</h2>
              <p className="text-gray-700 mb-4">
                How many units of <strong>{selectedProduct?.name}</strong> would
                you like to add?
              </p>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAddToCart}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;