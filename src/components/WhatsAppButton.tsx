"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = "442071234567"; // +44 20 7123 4567
  const whatsappMessage = encodeURIComponent("Hi! I need help with my laundry order.");

  const handleClick = () => {
    // Open WhatsApp with the number
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Main Button */}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" fill="white" />
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700">
                <p className="text-sm font-medium">Chat on WhatsApp</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">We'll reply instantly!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" style={{ animationDuration: "2s" }}></span>
      </motion.button>
    </motion.div>
  );
}
