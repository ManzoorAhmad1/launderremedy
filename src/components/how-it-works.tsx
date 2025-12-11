"use client"

import React, { useState } from 'react'
import { Calendar, Package, Sparkles, Truck, CheckCircle, Clock, Shield, Star } from 'lucide-react'
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Simple & Efficient
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-primary">Launder Remedy</span> Works
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Experience hassle-free laundry service in just four simple steps
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps Visualization */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-purple-500 to-amber-500 hidden lg:block" />

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start space-x-4 group cursor-pointer" 
                       onClick={() => setActiveStep(index)}>
                    {/* Step Number */}
                    <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${step.color} 
                      flex items-center justify-center text-white font-bold text-lg shadow-lg
                      group-hover:scale-110 transition-transform`}>
                      {step.step}
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 p-6 rounded-2xl transition-all duration-300 ${
                      activeStep === index 
                        ? 'bg-white dark:bg-neutral-800 shadow-xl border-2 border-primary/20' 
                        : 'bg-white/50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800'
                    }`}>
                      <div className="flex items-center mb-3">
                        <step.icon className={`w-6 h-6 mr-3 ${step.color.replace('bg-', 'text-')}`} />
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
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
                            <ul className="space-y-2 pl-4">
                              {step.details.map((detail, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center text-sm text-neutral-700 dark:text-neutral-300"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
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

          {/* Right Column - Visual & Benefits */}
          <div className="space-y-8">
            {/* Video/Animation Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-500 to-primary-700"
            >
              <div className="aspect-video flex items-center justify-center">
                {!isVideoPlaying ? (
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">👕✨</div>
                    <h3 className="text-2xl font-bold text-white mb-2">See Our Process</h3>
                    <p className="text-primary-100 mb-6">Watch how we transform your laundry</p>
                    <Button
                      onClick={() => setIsVideoPlaying(true)}
                      className="bg-white text-primary-700 hover:bg-primary-50"
                    >
                      Play Video
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-4">🎬</div>
                      <p className="text-lg">Video playing...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Animated Elements */}
              <div className="absolute top-4 right-4 animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div className="absolute bottom-4 left-4 animate-pulse animation-delay-1000">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
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
                  <div key={index} className="border-b border-neutral-200 dark:border-neutral-700 pb-4 last:border-0">
                    <h4 className="font-medium mb-1">{faq.q}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              <Button
                variant="link"
                className="w-full mt-4 text-primary"
                asChild
              >
                <a href="/faq">View all FAQs →</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}