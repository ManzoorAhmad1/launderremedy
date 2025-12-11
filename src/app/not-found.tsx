"use client"

import React from 'react'
import { Home, Search, RefreshCw, Shirt, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center px-6 py-8">
      <div className="container max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Oops! Page Not Found
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Lost in the <span className="text-primary">Laundry</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            It looks like this page got mixed up in the wash! Don't worry, we'll help you find your way back.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Illustration & Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            {/* Error Code with Animation */}
            <div className="relative mb-8">
              <div className="text-9xl font-bold text-primary/10 dark:text-primary/5">404</div>
              <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                <motion.h1 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2 
                  }}
                  className="text-6xl md:text-7xl font-bold text-primary"
                >
                  404
                </motion.h1>
              </div>
            </div>
            
            {/* Main Message */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Page <span className="text-primary">Not Found</span>
            </h2>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto lg:mx-0">
              The page you're looking for doesn't exist or has been moved. 
              But don't worry! We have plenty of other clean options for you.
            </p>
            
            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-md mb-8"
            >
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search for laundry services..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                Search
              </Button>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md"
            >
              <Button asChild size="lg" className="group">
                <Link href="/" className="flex items-center justify-center">
                  <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Back to Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/services" className="flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  View Services
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main Illustration Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 dark:from-primary/10 dark:via-primary/15 dark:to-primary/25 rounded-3xl shadow-xl" />
              
              {/* Floating Laundry Items */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut" 
                }}
                className="absolute top-1/4 left-1/4 w-20 h-20 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <Shirt className="w-10 h-10 text-primary" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  delay: 0.5,
                  ease: "easeInOut" 
                }}
                className="absolute top-1/3 right-1/4 w-24 h-24 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <div className="text-3xl">🔍</div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  delay: 1,
                  ease: "easeInOut" 
                }}
                className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <div className="text-2xl">🚫</div>
              </motion.div>
              
              {/* Animated Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 20,
                      ease: "linear" 
                    }}
                    className="absolute inset-0 border-4 border-dashed border-primary/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 25,
                      ease: "linear" 
                    }}
                    className="absolute inset-8 border-4 border-dashed border-primary/20 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-7xl animate-pulse">👕</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Dots */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    delay: i * 0.2 
                  }}
                  className={`absolute w-2 h-2 rounded-full bg-primary`}
                  style={{
                    top: `${25 + Math.sin(i * 45) * 30}%`,
                    left: `${25 + Math.cos(i * 45) * 30}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Explore Our <span className="text-primary">Services</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                name: 'Laundry Service', 
                href: '/services/laundry', 
                icon: '🧺',
                description: 'Wash & fold'
              },
              { 
                name: 'Dry Cleaning', 
                href: '/services/dry-cleaning', 
                icon: '👔',
                description: 'Professional care'
              },
              { 
                name: 'Ironing', 
                href: '/services/ironing', 
                icon: '♨️',
                description: 'Perfect press'
              },
              { 
                name: 'Pickup & Delivery', 
                href: '/services/delivery', 
                icon: '🚚',
                description: 'At your door'
              },
              { 
                name: 'About Us', 
                href: '/about', 
                icon: '👥',
                description: 'Our story'
              },
              { 
                name: 'Pricing', 
                href: '/pricing', 
                icon: '💰',
                description: 'Plans & rates'
              },
              { 
                name: 'Contact', 
                href: '/contact', 
                icon: '📞',
                description: 'Get in touch'
              },
              { 
                name: 'FAQ', 
                href: '/faq', 
                icon: '❓',
                description: 'Help center'
              },
            ].map((page, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (index * 0.05) }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={page.href}
                  className="group block p-6 rounded-2xl border border-neutral-300 dark:border-neutral-700 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 text-center h-full"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {page.icon}
                  </div>
                  <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">
                    {page.name}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {page.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Need immediate assistance? Contact our support team at{' '}
            <a 
              href="mailto:support@laundryremedy.com" 
              className="text-primary hover:underline font-medium"
            >
              support@laundryremedy.com
            </a>
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="text-xs text-neutral-400">© {new Date().getFullYear()} Laundry Remedy</span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-400">All rights reserved</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}