import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddWidgetButton = ({ isOpen, onToggle }) => {
  const menuItems = ['Widget', 'Shortcut', 'Smart Stack'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0, y: 20 },
  };

  return (
    <div className="absolute top-20 right-6 z-50">
      {/* Plus Button */}
      <motion.button
        onClick={() => onToggle(!isOpen)}
        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl font-light shadow-lg active:scale-90"
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.div>
      </motion.button>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-14 right-0 flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item}
                variants={itemVariants}
                className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium shadow-lg active:scale-95 whitespace-nowrap"
                onClick={() => {
                  onToggle(false);
                }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onToggle(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddWidgetButton;
