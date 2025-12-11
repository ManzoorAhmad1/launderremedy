"use client"

import React, { useState, useRef } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'

const testimonials = [
  {
    id: 1,
    name: "Joe Smith",
    role: "Regular Customer",
    content: "Exceptional service! I've been using their laundry and ironing services for months now, and I'm always impressed by the quality of their work. My clothes come back fresh, clean, and perfectly pressed every time. Highly recommend!",
    rating: 5,
    avatar: "JS",
    color: "bg-blue-100 dark:bg-blue-900/30",
    service: "Laundry & Ironing",
    duration: "6 months"
  },
  {
    id: 2,
    name: "Michael Patel",
    role: "Business Professional",
    content: "I can't say enough good things about this laundry service. They're reliable, efficient, and always go the extra mile to ensure customer satisfaction. Plus, their ironing service leaves my clothes looking like they just came from the store.",
    rating: 5,
    avatar: "MP",
    color: "bg-green-100 dark:bg-green-900/30",
    service: "Premium Service",
    duration: "1 year"
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Working Parent",
    content: "I've tried several laundry services in the past, but none compare to this one. Their attention to detail is unmatched, and they handle my delicate fabrics with care. The convenience of home pickup and delivery is a game-changer.",
    rating: 5,
    avatar: "ST",
    color: "bg-purple-100 dark:bg-purple-900/30",
    service: "Family Plan",
    duration: "8 months"
  },
  {
    id: 4,
    name: "David Chen",
    role: "Frequent Traveler",
    content: "As someone who travels constantly, having a reliable laundry service is essential. They always accommodate my schedule and deliver perfectly cleaned clothes right to my doorstep. Outstanding service!",
    rating: 5,
    avatar: "DC",
    color: "bg-amber-100 dark:bg-amber-900/30",
    service: "Express Service",
    duration: "4 months"
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "Event Planner",
    content: "The team handled a massive load of laundry and dry cleaning for our corporate event flawlessly. Professional, timely, and excellent quality. Will definitely use again for future events.",
    rating: 5,
    avatar: "EW",
    color: "bg-pink-100 dark:bg-pink-900/30",
    service: "Bulk Cleaning",
    duration: "One-time"
  },
  {
    id: 6,
    name: "Robert Garcia",
    role: "Restaurant Owner",
    content: "Professional, reliable, and affordable. Our restaurant linens and uniforms are always perfectly cleaned. They've become an essential part of our business operations.",
    rating: 5,
    avatar: "RG",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    service: "Business Plan",
    duration: "2 years"
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const itemsPerView = typeof window !== 'undefined' ? (window.innerWidth >= 768 ? 3 : 1) : 3

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerView >= testimonials.length ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - itemsPerView : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Star className="w-4 h-4 mr-2 fill-primary" />
            Rated Excellent
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by <span className="text-primary">5,000+</span> Customers
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
        >
          <div className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary">5,000+</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary">99%</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Satisfaction Rate</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Support</div>
          </div>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-[90%] mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-neutral-800 shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-neutral-800 shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Slider */}
          <div className="relative overflow-hidden px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visibleTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    whileHover={{ scale: 1.02 }}
                    className={`${testimonial.color} rounded-2xl p-6 shadow-lg relative overflow-hidden group transition-all duration-300 h-full`}
                  >
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20 group-hover:text-primary/30 transition-colors" />
                    
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center font-bold text-lg mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      ))}
                    </div>
                    
                    <p className="text-neutral-700 dark:text-neutral-300 italic mb-4 line-clamp-5">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <div className="font-medium">{testimonial.service}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            {testimonial.duration} customer
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: testimonials.length - itemsPerView + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-slide indicator */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="inline-flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Scroll for more reviews</span>
            </div>
            <div className="hidden md:block">•</div>
            <div className="hidden md:block">
              Showing {visibleTestimonials.length} of {testimonials.length} reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}