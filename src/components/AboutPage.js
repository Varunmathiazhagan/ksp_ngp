import React from "react";
import { motion } from "framer-motion";
import { FaHistory, FaLeaf, FaUsers } from "react-icons/fa";

const TextReveal = ({ children, delay }) => (
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

const AnimatedSection = ({ icon, title, children, delay }) => {
  return (
    <motion.section
      className="group p-8 bg-white rounded-2xl shadow-lg transition-all duration-500 
                 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          {icon &&
            React.cloneElement(icon, {
              className:
                "text-3xl text-teal-600 transform transition-transform duration-500 group-hover:scale-110",
            })}
          <h3
            className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 
                         bg-clip-text text-transparent"
          >
            {title}
          </h3>
        </motion.div>
        <div
          className="h-1 w-16 bg-gradient-to-r from-teal-500 to-blue-500 mb-4 
                        transform origin-left transition-transform duration-500 group-hover:scale-x-150"
        />
        <p className="text-gray-600 leading-relaxed">
          <TextReveal delay={delay + 0.3}>
            {children}
          </TextReveal>
        </p>
      </div>
    </motion.section>
  );
};

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-16 
                     bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About KSP Yarns
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatedSection icon={<FaHistory />} title="Our History" delay={0.2}>
            Founded in 2020, KSP Yarns has been redefining textile excellence.
            What started as a small family-owned business has evolved into a
            globally recognized manufacturer of premium-quality yarns, trusted
            by industry leaders worldwide.
          </AnimatedSection>

          <AnimatedSection
            icon={<FaLeaf />}
            title="Our Commitment to Sustainability"
            delay={0.4}
          >
            At KSP Yarns, we embrace sustainable manufacturing. Our initiatives
            include recycled materials, energy-efficient production, and waste
            reduction strategies to minimize our ecological footprint.
          </AnimatedSection>

          <AnimatedSection icon={<FaUsers />} title="Our Team" delay={0.6}>
            Our skilled team drives our success. From expert technicians to
            visionary designers, every KSP Yarns member is committed to
            delivering excellence, innovation, and superior craftsmanship.
          </AnimatedSection>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;