import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.message) newErrors.message = "Message is required"
    return newErrors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsLoading(true)
    // Here you would typically send the form data to a server
    setTimeout(() => {
      console.log("Form submitted:", formData)
      alert("Thank you for your message. We'll get back to you soon!")
      setFormData({ name: "", email: "", message: "" })
      setIsLoading(false)
    }, 2000)
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:kspyarnskarur@gmail.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919994955782";
  };

  const handleAddressClick = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=124/4+Gandhi+Nagar+Sukkaliyur+Karur,+Tamil+Nadu+639003", "_blank");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="p-6"
    >
      <motion.h2 
        className="text-3xl font-bold mb-6"
        variants={fadeInUp}
      >
        Contact Us
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div variants={fadeInUp}>
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded transition-all duration-200 hover:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded transition-all duration-200 hover:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded transition-all duration-200 hover:border-blue-500 focus:ring-2 focus:ring-blue-200"
              ></textarea>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.message}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Sending...
                </motion.span>
              ) : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
          <motion.div 
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.p
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={handleEmailClick}
            >
              <FaEnvelope className="mr-2" /> Email: kspyarnskarur@gmail.com
            </motion.p>

            <motion.p
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={handlePhoneClick}
            >
              <FaPhone className="mr-2" /> Phone: +91 9994955782
            </motion.p>

            <motion.p
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={handleAddressClick}
            >
              <FaMapMarkerAlt className="mr-2" /> Address: 124/4 Gandhi Nagar Sukkaliyur Karur, Tamil Nadu 639003
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-6 p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="text-xl font-semibold mb-2">Business Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ContactPage

