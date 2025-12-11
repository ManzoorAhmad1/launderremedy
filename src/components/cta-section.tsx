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
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-neutral-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-sm sm:text-base">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
              <span className="font-medium">Transform Your Laundry Routine</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
              Ready for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                Laundry-Free
              </span>{' '}
              Living?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Join thousands of satisfied customers who have transformed their laundry routine. 
              Book your first pickup today and experience the difference.
            </p>

            {/* Features */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">Zero Emission Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">Efficient Water Use</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">24/7 Customer Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link href="/place-order" className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary-700 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto text-sm sm:text-base"
                >
                  Schedule Your Pickup
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 px-6 sm:px-8 py-5 sm:py-6 rounded-xl w-full sm:w-auto text-sm sm:text-base"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 sm:pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 bg-neutral-50 dark:bg-neutral-800 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium truncate">{feature.title}</div>
                      <div className="text-xs text-neutral-500 truncate">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs sm:text-sm text-neutral-500 pt-3 sm:pt-4">
              No commitment • Free first pickup • Cancel anytime
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="relative order-1 lg:order-2 mb-6 sm:mb-8 lg:mb-0"
          >
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6">
                <Image
                  src={img05}
                  alt="Happy customer enjoying laundry-free living with Launder Remedy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Text Card */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-1 sm:mb-2">
                  Fresh & Clean
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-3 sm:mb-4">
                  Your clothes, professionally handled and delivered to your doorstep
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 sm:pt-4 border-t border-neutral-200 dark:border-neutral-700 gap-2 sm:gap-0">
                  <div>
                    <div className="text-xs sm:text-sm text-neutral-500">Trusted by</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">5000+ Customers</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mx-0.5"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">5.0</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary/10 rounded-lg sm:rounded-xl md:rounded-2xl rotate-12 animate-float" />
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-lg sm:rounded-xl md:rounded-2xl -rotate-12 animate-float animation-delay-1000" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}