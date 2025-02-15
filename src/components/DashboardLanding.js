import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaUserPlus } from 'react-icons/fa';

const DashboardCard = ({ title, description, icon, buttons, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.03 }}
    className={`p-8 bg-white rounded-xl shadow-lg relative overflow-hidden
                transition-shadow duration-300 hover:shadow-2xl`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 
                     rounded-full opacity-10 ${color}`} />
    
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, delay: delay + 0.2 }}
      className={`text-3xl ${color.replace('bg-', 'text-')} mb-4`}
    >
      {icon}
    </motion.div>
    
    <h2 className={`text-2xl font-semibold mb-4 ${color.replace('bg-', 'text-')}`}>
      {title}
    </h2>
    <p className="text-gray-600 mb-6">{description}</p>
    <div className="space-y-3">{buttons}</div>
  </motion.div>
);

const DashboardButton = ({ icon, label, onClick, primary, color }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg
                transition-all duration-300 ${
                  primary
                    ? `${color} text-white hover:brightness-110`
                    : `border-2 ${color.replace('bg-', 'border-')} ${color.replace('bg-', 'text-')} 
                       hover:bg-opacity-10 hover:bg-gray-100`
                }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const DashboardLanding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-3xl w-full mx-auto p-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r 
                     from-teal-600 to-blue-600 bg-clip-text text-transparent"
        >
          Welcome to KSP Yarns Dashboard
        </motion.h1>
        
        <div className="flex justify-center">
          <DashboardCard
            title="User Access"
            description="Manage your orders, track shipments, and update your profile all in one place"
            icon={<FaUser />}
            color="bg-teal-600"
            delay={0.2}
            buttons={
              <>
                <DashboardButton
                  icon={<FaLock size={16} />}
                  label={loading ? "Loading..." : "Login"}
                  onClick={() => handleNavigation('/login')}
                  primary
                  color="bg-teal-600"
                />
                <DashboardButton
                  icon={<FaUserPlus size={16} />}
                  label="Create Account"
                  onClick={() => handleNavigation('/signup')}
                  color="bg-teal-600"
                />
              </>
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardLanding;
