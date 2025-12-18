"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Calendar, Package, Sparkles, Truck, CheckCircle, Clock, Shield, Star, Droplets, Wind, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'

const steps = [
  {
    step: 1,
    title: "Schedule Pickup",
    description: "Choose a convenient time slot for pickup. We offer morning (12-3 PM) and evening (9-11 PM) slots.",
    icon: Calendar,
    color: "bg-blue-500",
    details: [
      "Select pickup time on our app or website",
      "Get instant confirmation",
      "Reschedule anytime for free",
    ],
  },
  {
    step: 2,
    title: "We Collect",
    description: "Our professional team arrives at your doorstep to collect your laundry. No contact required.",
    icon: Package,
    color: "bg-green-500",
    details: [
      "Free collection from your location",
      "Professional handling of all items",
      "Digital receipt and inventory",
    ],
  },
  {
    step: 3,
    title: "Expert Cleaning",
    description: "Your clothes are cleaned using premium detergents and state-of-the-art equipment.",
    icon: Sparkles,
    color: "bg-purple-500",
    details: [
      "Eco-friendly cleaning process",
      "Special care for delicate fabrics",
      "Stain removal expertise",
    ],
  },
  {
    step: 4,
    title: "Quality Check & Delivery",
    description: "Every item undergoes quality inspection before being delivered back to you within 24 hours.",
    icon: Truck,
    color: "bg-amber-500",
    details: [
      "24-hour turnaround guarantee",
      "Free delivery to your doorstep",
      "Contactless delivery option",
    ],
  },
]

const benefits = [
  {
    icon: Clock,
    title: "24-Hour Service",
    description: "Get your laundry back within 24 hours of pickup",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee on all services",
  },
  {
    icon: Star,
    title: "Premium Service",
    description: "Professional handling and premium detergents",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024

  return (
    <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-sm md:text-base mb-3 md:mb-4">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Simple & Efficient
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            How <span className="text-primary">Launder Remedy</span> Works
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-2 sm:px-0">
            Experience hassle-free laundry service in just four simple steps
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Steps Visualization */}
          <div className="relative">
            {/* Progress Line - Hide on mobile, show on tablet+ */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-purple-500 to-amber-500 hidden md:block" />

            {/* Steps */}
            <div className="space-y-6 md:space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className="flex items-start space-x-3 md:space-x-4 group cursor-pointer"
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Step Number */}
                    <div className={`relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${step.color} 
                      flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg
                      group-hover:scale-105 transition-transform`}>
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 p-4 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 ${activeStep === index
                        ? 'bg-white dark:bg-neutral-800 shadow-lg md:shadow-xl border-2 border-primary/20'
                        : 'bg-white/50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800'
                      }`}>
                      <div className="flex items-center mb-2 md:mb-3">
                        <step.icon className={`w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 ${step.color.replace('bg-', 'text-')}`} />
                        <h3 className="text-lg md:text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-3 md:mb-4">
                        {step.description}
                      </p>

                      <AnimatePresence>
                        {activeStep === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-1 md:space-y-2 pl-3 md:pl-4">
                              {step.details.map((detail, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center text-xs md:text-sm text-neutral-700 dark:text-neutral-300"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 md:mr-3 flex-shrink-0" />
                                  {detail}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Animated Process & Benefits */}
          <div className="space-y-6 md:space-y-8">
            {/* Animated Laundry Process */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-gradient-to-br from-primary-500 to-primary-700 aspect-video md:aspect-video"
            >
              {/* Background Animation */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Bubbles - Reduced number on mobile */}
                {[...Array(isMobile ? 8 : 15)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? {
                      y: [window.innerHeight * 0.5, -100],
                      x: [Math.random() * 80 - 40, Math.random() * 80 - 40],
                      scale: [0, Math.random() * 0.4 + 0.4, 0],
                      opacity: [0, 0.5, 0],
                    } : {}}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: isPlaying ? Infinity : 0,
                      delay: Math.random() * 2,
                    }}
                    className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-200/40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Main Animation Container */}
              <div className="relative h-full flex items-center justify-center p-4 md:p-8">

                {/* Washing Machine Animation */}
                <div className={`relative ${isMobile ? 'w-32 h-40' : isTablet ? 'w-40 h-52' : 'w-48 h-64'}`}>
                  {/* Machine Body */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg md:rounded-2xl shadow-lg md:shadow-2xl">

                    {/* Door */}
                    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-20 h-20' : isTablet ? 'w-24 h-24' : 'w-32 h-32'
                      } rounded-full border-3 md:border-4 border-gray-400 dark:border-gray-600`}>

                      {/* Door Glass with Clothes Animation */}
                      <motion.div
                        animate={isPlaying ? {
                          rotate: 360,
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: isPlaying ? Infinity : 0,
                          ease: "linear",
                        }}
                        className={`absolute ${isMobile ? 'inset-2' : isTablet ? 'inset-3' : 'inset-4'
                          } rounded-full bg-gradient-to-br from-blue-100/50 to-blue-200/30 dark:from-blue-900/40 dark:to-blue-800/30`}
                      >
                        {/* Animated Clothes Inside */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Shirt */}
                          <motion.div
                            animate={isPlaying ? {
                              y: [0, -8, 0],
                              rotate: [0, 180, 360],
                            } : {}}
                            transition={{
                              duration: 3,
                              repeat: isPlaying ? Infinity : 0,
                              ease: "linear",
                            }}
                            className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}`}
                          >
                            👕
                          </motion.div>

                          {/* Pants */}
                          <motion.div
                            animate={isPlaying ? {
                              y: [0, 8, 0],
                              rotate: [360, 180, 0],
                            } : {}}
                            transition={{
                              duration: 2.5,
                              repeat: isPlaying ? Infinity : 0,
                              ease: "linear",
                              delay: 0.5,
                            }}
                            className={`${isMobile ? 'text-xl ml-2' : isTablet ? 'text-2xl ml-3' : 'text-3xl ml-4'}`}
                          >
                            👖
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Control Panel */}
                    <div className={`absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 ${isMobile ? 'w-32 h-8' : isTablet ? 'w-36 h-10' : 'w-40 h-12'
                      } bg-gray-300 dark:bg-gray-700 rounded md:rounded-lg flex items-center justify-center shadow-inner`}>
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <Zap className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-500 animate-pulse`} />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-800 dark:text-gray-200`}>
                          Eco Mode
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Steps Indicator - Simplified on mobile */}
                <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2">
                  <div className={`flex items-center ${isMobile ? 'space-x-1 px-3 py-2' : 'space-x-2 md:space-x-4 px-4 md:px-6 py-2 md:py-3'
                    } bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg`}>
                    {['Wash', 'Rinse', 'Spin', 'Dry'].map((step, i) => (
                      <motion.div
                        key={step}
                        animate={isPlaying ? {
                          opacity: i === Math.floor((Date.now() / 1500) % 4) ? 1 : 0.5,
                          scale: i === Math.floor((Date.now() / 1500) % 4) ? 1.1 : 1,
                        } : {
                          opacity: 0.7,
                          scale: 1,
                        }}
                        className="flex items-center"
                      >
                        <div className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full ${i === Math.floor((Date.now() / 1500) % 4) && isPlaying
                            ? 'bg-primary animate-pulse'
                            : 'bg-gray-400'
                          }`} />
                        {!isMobile && (
                          <>
                            <span className={`ml-1 md:ml-2 ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-700 dark:text-gray-300`}>
                              {step}
                            </span>
                            {i < 3 && <span className="mx-1 md:mx-2 text-gray-400">›</span>}
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Icons & Indicators - Smaller on mobile */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4">
                  <motion.div
                    animate={isPlaying ? {
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: isPlaying ? Infinity : 0,
                    }}
                  >
                    <Droplets className={`${isMobile ? 'w-5 h-5' : isTablet ? 'w-6 h-6' : 'w-8 h-8'} text-blue-300`} />
                  </motion.div>
                </div>

                <div className="absolute top-2 md:top-4 right-2 md:right-4">
                  <motion.div
                    animate={isPlaying ? {
                      rotate: 360,
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "linear",
                    }}
                  >
                    <Wind className={`${isMobile ? 'w-5 h-5' : isTablet ? 'w-6 h-6' : 'w-8 h-8'} text-blue-300`} />
                  </motion.div>
                </div>

                {/* Control Button */}
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    size={isMobile ? "icon" : "lg"}
                    className={`rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'
                      } text-white shadow-lg hover:scale-105 transition-transform`}
                  >
                    {isPlaying ? (
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>⏸️</span>
                    ) : (
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>▶️</span>
                    )}
                  </Button>
                </div>

                {/* Status Text */}
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded px-2 md:px-3 py-1 md:py-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>
                      {isPlaying ? "Cleaning..." : "Ready"}
                    </p>
                  </div>
                </div>

                {/* Progress Indicator */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 30, ease: "linear" }}
                      onAnimationComplete={() => {
                        if (isPlaying) setIsPlaying(false)
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: isMobile ? 0 : -5 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg md:rounded-xl p-3 md:p-4 text-center shadow-md hover:shadow-lg transition-all border border-neutral-200 dark:border-neutral-700"
                >
                  <div className={`inline-flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'w-12 h-12'
                    } rounded-lg md:rounded-xl bg-primary/10 mb-2 md:mb-3`}>
                    <benefit.icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-primary`} />
                  </div>
                  <h4 className="text-sm md:text-base font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-neutral-800 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border border-neutral-200 dark:border-neutral-700"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
                <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3 md:space-y-4">
                {[
                  {
                    q: "How long does the service take?",
                    a: "We guarantee 24-hour turnaround from pickup to delivery."
                  },
                  {
                    q: "Do you handle delicate fabrics?",
                    a: "Yes, we have special processes for delicate and special care items."
                  },
                  {
                    q: "What are your operating hours?",
                    a: "We operate 24/7 for pickup scheduling and customer support."
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-neutral-200 dark:border-neutral-700 pb-3 md:pb-4 last:border-0">
                    <h4 className="text-sm md:text-base font-medium mb-1 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2 flex-shrink-0"></span>
                      {faq.q}
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 pl-4 md:pl-4">{faq.a}</p>
                  </div>
                ))}
              </div>

              <a
                className="w-full mt-3 md:mt-4 text-primary group text-sm md:text-base"
              >
                <a href="/faq" className="flex items-center justify-center">
                  View all FAQs
                  <span className="ml-1 md:ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}