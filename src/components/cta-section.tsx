"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sparkles, CheckCircle, ArrowRight, Shield, Leaf, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

import img05 from '../../public/img05.png'

export default function CTASection() {
  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "100% satisfaction on every order"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainable cleaning process"
    },
    {
      icon: Clock,
      title: "24-Hour Service",
      description: "Fast turnaround guaranteed"
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="font-medium">Transform Your Laundry Routine</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
              Ready for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                Laundry-Free
              </span>{' '}
              Living?
            </h2>

            {/* Description */}
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Join thousands of satisfied customers who have transformed their laundry routine. 
              Book your first pickup today and experience the difference.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">Zero Emission Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">Efficient Water Use</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">24/7 Customer Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/place-order">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  Schedule Your Pickup
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/how-it-works">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-xl"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{feature.title}</div>
                    <div className="text-xs text-neutral-500">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-sm text-neutral-500 pt-4">
              No commitment • Free first pickup • Cancel anytime
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-800 dark:to-neutral-700 rounded-3xl p-8 shadow-2xl">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                <Image
                  src={img05}
                  alt="Happy customer enjoying laundry-free living with Launder Remedy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Text Card */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Fresh & Clean</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Your clothes, professionally handled and delivered to your doorstep
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div>
                    <div className="text-sm text-neutral-500">Trusted by</div>
                    <div className="text-xl font-bold text-primary">5000+ Customers</div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-primary rounded-full mx-0.5" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">5.0</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-2xl rotate-12 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-2xl -rotate-12 animate-float animation-delay-1000" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}