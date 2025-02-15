import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaSpinner,
  FaTruck,
  FaBoxOpen,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";
import { useState } from "react";

const CartPage = ({ cart, updateQuantity, removeFromCart, isLoading }) => {
  const [step, setStep] = useState("cart"); // Tracks the current step: 'cart', 'shipping', 'delivery', 'payment', 'confirmation'
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    postalCode: "",
  });
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const steps = ["cart", "shipping", "delivery", "payment", "confirmation"];
  const currentStepIndex = steps.indexOf(step);

  // Handle Back Button Click
  const handleBackClick = () => {
    const previousStepIndex = Math.max(currentStepIndex - 1, 0);
    setStep(steps[previousStepIndex]);
  };

  // Determine icon color based on step completion
  const getIconColor = (stepName) => {
    const stepIndex = steps.indexOf(stepName);
    return stepIndex <= currentStepIndex ? "text-blue-600" : "text-gray-500";
  };

  // Loading Spinner Animation
  const spinnerVariants = {
    spin: { rotate: 360 },
  };

  // Empty Cart Animation
  const emptyCartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Checkout Button Hover Animation
  const checkoutButtonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  // Enhanced animation variants
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const successAnimation = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      rotate: [0, 360],
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInScale = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        className="text-center mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            transition: { duration: 2, repeat: Infinity }
          }}
          className="text-6xl mx-auto text-blue-500 mb-4"
        >
          <FaSpinner />
        </motion.div>
        <motion.h2 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl font-semibold mb-4"
        >
          Loading your cart...
        </motion.h2>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <motion.div
        variants={emptyCartVariants}
        initial="hidden"
        animate="visible"
        className="text-center mt-20"
      >
        <motion.div
          variants={floatingAnimation}
          animate="animate"
        >
          <FaShoppingCart className="text-6xl mx-auto text-gray-400 mb-4" />
        </motion.div>
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </motion.div>
    );
  }

  // Handle Shipping Info Form Submission
  const handleShippingInfoSubmit = (e) => {
    e.preventDefault();
    const { fullName, addressLine1, city, postalCode } = shippingInfo;

    // Validate inputs
    if (!fullName || !addressLine1 || !city || !postalCode) {
      alert("Please fill in all fields.");
      return;
    }

    // Proceed to the next step
    setStep("delivery");
  };

  // Handle Delivery Method Selection
  const handleDeliverySelection = () => {
    setStep("payment");
  };

  // Handle Payment Submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment validation
    setStep("confirmation");
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Progress Bar */}
      <motion.div 
        className="relative pt-1"
        variants={fadeInScale}
      >
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {((currentStepIndex + 1) / steps.length) * 100}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
          ></div>
        </div>
      </motion.div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div className="flex space-x-4">
          <span className={`text-gray-500 ${getIconColor("shipping")}`}>
            <FaTruck className={`inline-block mr-1 ${getIconColor("shipping")}`} /> Shipping Info
          </span>
          <span className={`text-gray-500 ${getIconColor("delivery")}`}>
            <FaBoxOpen className={`inline-block mr-1 ${getIconColor("delivery")}`} /> Delivery Info
          </span>
          <span className={`text-gray-500 ${getIconColor("payment")}`}>
            <FaCreditCard className={`inline-block mr-1 ${getIconColor("payment")}`} /> Payment
          </span>
          <span className={`text-gray-500 ${getIconColor("confirmation")}`}>
            <FaCheckCircle className={`inline-block mr-1 ${getIconColor("confirmation")}`} /> Confirmation
          </span>
        </div>
      </div>

      {/* Show Content Based on Current Step */}
      <AnimatePresence mode="wait">
        {step === "cart" && (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {/* Cart Table */}
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Tax</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="border-b"
                  >
                    <td className="py-4 flex items-center space-x-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className="text-xl font-semibold">{item.name}</span>
                    </td>
                    <td className="py-4">₹{(item.price * 82.23).toFixed(2)}</td>
                    <td className="py-4">₹0.00</td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-xl font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="py-4">₹{(item.price * item.quantity * 82.23).toFixed(2)}</td>
                    <td className="py-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Cart Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex justify-between items-center"
            >
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                ← Return to shop
              </button>
              <div className="text-right">
                <span className="text-xl font-semibold">
                  Subtotal: ₹{(totalPrice * 82.23).toFixed(2)}
                </span>
                <motion.button
                  variants={checkoutButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setStep("shipping")}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold mt-4"
                >
                  Continue to Shipping
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === "shipping" && (
          <motion.div
            variants={fadeInScale}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <FaTruck className="text-blue-600" /> <span>Shipping Info</span>
            </h2>
            <form onSubmit={handleShippingInfoSubmit}>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                placeholder="Full Name"
                value={shippingInfo.fullName}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                placeholder="Address Line 1"
                value={shippingInfo.addressLine1}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                placeholder="Postal Code"
                value={shippingInfo.postalCode}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBackClick}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Continue to Delivery
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "delivery" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 p-6 rounded-lg shadow-md mt-6"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <FaBoxOpen className="text-green-600" /> <span>Delivery Info</span>
            </h2>
            <p>Select your preferred delivery method:</p>
            <div className="mt-4 space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="delivery" className="form-radio" />
                <span>Standard Delivery (3-5 days)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="delivery" className="form-radio" />
                <span>Express Delivery (1-2 days)</span>
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleBackClick}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                ← Back
              </button>
              <button
                onClick={handleDeliverySelection}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Continue to Payment
              </button>
            </div>
          </motion.div>
        )}

        {step === "payment" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 p-6 rounded-lg shadow-md mt-6"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <FaCreditCard className="text-yellow-600" /> <span>Payment</span>
            </h2>
            <form onSubmit={handlePaymentSubmit}>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Expiry Date"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBackClick}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Complete Payment
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "confirmation" && (
          <motion.div
            variants={successAnimation}
            initial="initial"
            animate="animate"
            className="bg-gray-100 p-6 rounded-lg shadow-md mt-6"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <FaCheckCircle className="text-green-600" /> <span>Order Confirmation</span>
            </h2>
            <p>Your order has been successfully placed!</p>
            <p className="mt-2">Thank you for shopping with us.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CartPage;