"use client"

import React from 'react'
import { Truck, Clock, Headphones, Shield, Leaf, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Clock,
    title: "24h Turnaround Time",
    description: "Get your laundry back fresh and clean within 24 hours. No need to plan weeks in advance.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: Truck,
    title: "Free Collection & Delivery",
    description: "We pick up and deliver your laundry right to your doorstep, completely free of charge.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Headphones,
    title: "Dedicated 24/7 Support",
    description: "Our customer support team is available round the clock to assist you with any queries.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "We guarantee the highest quality of cleaning and care for all your garments.",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Process",
    description: "Using biodegradable detergents and efficient water usage to protect our environment.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    icon: RefreshCw,
    title: "Easy Rescheduling",
    description: "Change your pickup or delivery time with just a few clicks. Flexible and convenient.",
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
            Experience the future of laundry services with our premium offerings and exceptional customer care
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