import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaSpinner, FaThumbsUp, FaExclamationCircle, FaStar } from 'react-icons/fa';

const RecommendationsPage = () => {
  const [userPreferences, setUserPreferences] = useState({
    purpose: '',
    color: '',
    priceRange: '',
    quantity: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const purposes = ['Knitting', 'Weaving', 'Crocheting', 'Industrial Use'];
  const colors = ['Black', 'Red', 'White', 'Grey', 'Blue'];
  const priceRanges = ['Budget', 'Mid-range', 'Premium'];

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const allRecommendations = [
        {
          id: 1,
          name: "2/20(s) Premium Black Yarn",
          purpose: "Knitting",
          color: "Black",
          priceRange: "Budget",
          confidence: 0.95,
          reason: "Perfect match for your knitting needs with desired color and budget",
          price: 7.99,
          image: "/images/20s_black.jpg",
          rating: 4.5,
        },
        {
          id: 2,
          name: "2/20(s) Enhanced Grey Yarn",
          purpose: "Knitting",
          color: "Grey",
          priceRange: "Mid-range",
          confidence: 0.85,
          reason: "Alternative option with similar properties and great value",
          price: 12.99,
          image: "/images/20s_grey.jpg",
          rating: 4.3,
        },
        {
          id: 3,
          name: "2/20(s) White Yarn",
          purpose: "Weaving",
          color: "White",
          priceRange: "Budget",
          confidence: 0.82,
          reason: "Durable polyester yarn for versatile textile applications",
          price: 6.99,
          image: "/images/20s_white.jpg",
          rating: 4.3,
        },
        {
          id: 4,
          name: "2/20(s) Grey Yarn",
          purpose: "Crocheting",
          color: "Grey",
          priceRange: "Premium",
          confidence: 0.88,
          reason: "Soft and sustainable cotton yarn for eco-friendly textiles",
          price: 12.99,
          image: "/images/20s_grey.jpg",
          rating: 4.8,
        },
        {
          id: 5,
          name: "2/20(s) Sky Blue Yarn",
          purpose: "Industrial Use",
          color: "Blue",
          priceRange: "Mid-range",
          confidence: 0.79,
          reason: "Natural bamboo yarn for breathable and comfortable fabrics",
          price: 8.99,
          image: "/images/20s_sky_blue.jpg",
          rating: 4.7,
        },
        {
          id: 6,
          name: "Wool Yarn",
          purpose: "Knitting",
          color: "Grey",
          priceRange: "Premium",
          confidence: 0.91,
          reason: "Warm and cozy wool yarn for winter garments",
          price: 14.99,
          image: "/images/20s_steel_grey.jpg",
          rating: 4.9,
        },
      ];

      const filteredRecommendations = allRecommendations.filter(item => 
        (!userPreferences.purpose || item.purpose === userPreferences.purpose) &&
        (!userPreferences.color || item.color === userPreferences.color) &&
        (!userPreferences.priceRange || item.priceRange === userPreferences.priceRange)
      );

      setRecommendations(filteredRecommendations);
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateRecommendations();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FaRobot className="text-blue-500 mr-3" />
            AI Yarn Recommendations
          </h1>
          <p className="text-lg text-gray-600">
            Let our AI help you find the perfect yarn for your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ x: -50 }} animate={{ x: 0 }} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Your Preferences</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Purpose</label>
                <select
                  value={userPreferences.purpose}
                  onChange={(e) => setUserPreferences({ ...userPreferences, purpose: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select purpose</option>
                  {purposes.map(purpose => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Preferred Color</label>
                <select
                  value={userPreferences.color}
                  onChange={(e) => setUserPreferences({ ...userPreferences, color: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select color</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Price Range</label>
                <select
                  value={userPreferences.priceRange}
                  onChange={(e) => setUserPreferences({ ...userPreferences, priceRange: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select price range</option>
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Quantity (kg)</label>
                <input
                  type="number"
                  value={userPreferences.quantity}
                  onChange={(e) => setUserPreferences({ ...userPreferences, quantity: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quantity"
                  min="1"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaRobot className="mr-2" />}
                {loading ? 'Generating...' : 'Get Recommendations'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div initial={{ x: 50 }} animate={{ x: 0 }} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Recommendations</h2>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 flex items-center">
                <FaExclamationCircle className="mr-2" />
                {error}
              </motion.div>
            )}

            <AnimatePresence>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <FaSpinner className="animate-spin text-blue-500 text-4xl" />
                </motion.div>
              ) : recommendations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center py-8"
                >
                  No recommendations found. Try adjusting your filters.
                </motion.div>
              ) : (
                recommendations.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-lg mb-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/placeholder-yarn.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex items-center text-green-600 mb-2">
                          <FaThumbsUp className="mr-1" />
                          <span>{(item.confidence * 100).toFixed(0)}% Match</span>
                        </div>
                        <p className="text-gray-600 text-sm">{item.reason}</p>
                        <p className="text-blue-600 font-semibold mt-2">₹{(item.price * 82.23).toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <FaStar className="text-yellow-500 mr-1" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-semibold mb-6">User Reviews</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-700">"Great quality yarn! Perfect for my knitting projects."</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-700">"The colors are vibrant and the yarn is very durable."</p>
              <div className="flex items-center mt-2">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
                <FaStar className="text-gray-300 mr-1" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecommendationsPage;