'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SlimerToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

const SlimerToggle: React.FC<SlimerToggleProps> = ({ isVisible, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-4 left-4 z-50 md:hidden bg-dark-lighter rounded-full p-3 shadow-lg border border-primary/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ rotate: isVisible ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isVisible ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default SlimerToggle; 