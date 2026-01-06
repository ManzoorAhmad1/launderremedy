"use client"

import React from 'react'
import { Truck, Clock, Headphones, Shield, Leaf, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Clock,
    title: "24-Hour Turnaround",
    description: "Rapid service guaranteed. Receive your freshly cleaned garments within 24 hours of collection, perfect for your busy lifestyle.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: Truck,
    title: "Complimentary Collection & Delivery",
    description: "Enjoy seamless doorstep service at no extra charge. We collect and deliver your laundry at your convenience across London.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Our dedicated support team is always available to assist you. Reach us anytime via phone, email, or live chat.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    icon: Shield,
    title: "Premium Quality Assurance",
    description: "Every garment undergoes meticulous inspection and care. We guarantee exceptional results with our quality-first approach.",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Cleaning",
    description: "Committed to sustainability with biodegradable detergents, efficient water management, and environmentally responsible practices.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    icon: RefreshCw,
    title: "Flexible Scheduling",
    description: "Modify your collection or delivery times effortlessly through our app. Complete flexibility designed around your schedule.",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">Launder Remedy</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover the perfect blend of professional expertise, cutting-edge technology, and personalized service 
            that sets us apart in garment care excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${feature.bgColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 shadow-sm mb-4">
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}