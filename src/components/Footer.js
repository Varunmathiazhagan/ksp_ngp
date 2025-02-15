import React from "react"
import { motion } from "framer-motion"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute right-8 top-0 bg-teal-500 p-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <FaArrowUp className="text-white" />
        </motion.button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3 
              className="text-xl md:text-2xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                KSP Yarns
              </span>
            </motion.h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Providing high-quality yarns for all your textile needs since 2020
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <a href={link.path}
                     className="text-gray-300 hover:text-teal-400 transition-colors duration-300
                              flex items-center space-x-2">
                    <span>→</span>
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { Icon: FaFacebookF, url: 'https://facebook.com/kspyarns', color: '#1877f2' },
                { Icon: FaTwitter, url: 'https://twitter.com/kspyarns', color: '#1da1f2' },
                { Icon: FaInstagram, url: 'https://instagram.com/kspyarns', color: '#e4405f' },
                { Icon: FaLinkedinIn, url: 'https://linkedin.com/company/kspyarns', color: '#0077b5' }
              ].map(({ Icon, url, color }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  className="bg-gray-800 p-3 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <Icon className="text-xl md:text-2xl hover:text-[${color}] transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-white">Newsletter</h3>
            <motion.div 
              className="flex flex-col sm:flex-row gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-700/50 backdrop-blur-sm rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-teal-400 
                         text-gray-200 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg 
                         transition-all duration-300 text-white font-semibold
                         shadow-lg hover:shadow-teal-500/50"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-700/50 text-center"
        >
          <motion.p 
            className="text-gray-400 text-sm"
            whileHover={{ scale: 1.02 }}
          >
            &copy; {new Date().getFullYear()} KSP Yarns. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer

