"use client"

import React, { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import Link from 'next/link'

const testimonials = [
  {
    id: 1,
    name: "Joe Smith",
    role: "Regular Customer",
    content: "Outstanding service quality! I've relied on their professional laundry and ironing services for several months, and the consistently exceptional results never fail to impress. Every garment returns immaculately fresh and perfectly pressed. I wholeheartedly recommend their services.",
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
    content: "This laundry service exemplifies excellence in every aspect. Their reliability, efficiency, and dedication to customer satisfaction are unmatched. The ironing service delivers retail-quality presentation that keeps my professional wardrobe impeccable.",
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
    content: "After extensive research, I've found the perfect laundry partner. Their meticulous attention to detail and gentle handling of delicate fabrics demonstrate true expertise. The convenient home collection and delivery service is transformative for busy families.",
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
    content: "For someone with a demanding travel schedule, finding a dependable laundry service is essential. They consistently accommodate my unpredictable timetable and deliver impeccably cleaned garments directly to my door. Truly exceptional service.",
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
    content: "Their team expertly managed substantial volumes of laundry and dry cleaning for our corporate event with remarkable professionalism. Timely execution, superior quality, and outstanding results. They'll be our first choice for all future events.",
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
    content: "Professional, dependable, and competitively priced. Our restaurant linens and staff uniforms receive consistently excellent care. This service has become an indispensable component of our daily operations and business success.",
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
  const [itemsPerView, setItemsPerView] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size and set items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      if (width >= 1024) {
        setItemsPerView(3) // Desktop: 3 items
      } else if (width >= 768) {
        setItemsPerView(2) // Tablet: 2 items
      } else {
        setItemsPerView(1) // Mobile: 1 item
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView)
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView)
      return prevIndex === 0 ? maxIndex : prevIndex - 1
    })
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  // Calculate total dots based on items per view
  const totalDots = Math.max(0, testimonials.length - itemsPerView + 1)

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-sm sm:text-base mb-3 sm:mb-4">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 fill-primary" />
            Rated Excellent
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Loved by <span className="text-primary">5,000+</span> Customers
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-2 sm:px-0">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-3xl mx-auto"
        >
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-neutral-800 rounded-lg sm:rounded-xl shadow-sm">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">4.9/5</div>
            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Average Rating</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-neutral-800 rounded-lg sm:rounded-xl shadow-sm">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">5,000+</div>
            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Happy Customers</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-neutral-800 rounded-lg sm:rounded-xl shadow-sm">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">99%</div>
            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Satisfaction Rate</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-neutral-800 rounded-lg sm:rounded-xl shadow-sm">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Support</div>
          </div>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-[90%] sm:max-w-[95%] lg:max-w-[90%] mx-auto">
          {/* Navigation Buttons - Adjusted for mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-neutral-800 shadow-lg sm:shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-neutral-800 shadow-lg sm:shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Slider */}
          <div className="relative overflow-hidden px-1 sm:px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {visibleTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    className={`${testimonial.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg relative overflow-hidden group transition-all duration-300 h-full`}
                  >
                    <Quote className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 text-primary/20 group-hover:text-primary/30 transition-colors" />

                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center font-bold text-base sm:text-lg mr-3 sm:mr-4 flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 mr-0.5 sm:mr-1"
                        />
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 italic mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-5">
                      "{testimonial.content}"
                    </p>

                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex justify-between items-center">
                        <div className="text-xs sm:text-sm min-w-0">
                          <div className="font-medium truncate">{testimonial.service}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            {testimonial.duration} customer
                          </div>
                        </div>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Navigation */}
        {totalDots > 1 && (
          <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2 overflow-x-auto py-2">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 rounded-full transition-all ${index === currentIndex
                    ? 'bg-primary w-6 sm:w-8 h-2 sm:h-2'
                    : 'bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 w-2 h-2 sm:w-2 sm:h-2'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-slide indicator */}
        <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
              <span>Swipe for more reviews</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="text-center sm:text-left">
              Showing {visibleTestimonials.length} of {testimonials.length} reviews
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        {isMobile && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 text-xs text-neutral-500 animate-pulse">
              <span>← Swipe →</span>
            </div>
          </div>
        )}

        {/* View All Button for Mobile */}
        <div className="mt-6 sm:mt-8 text-center lg:hidden" >
          <Link
            className="border-primary text-primary hover:bg-primary/10 text-sm sm:text-base"
            href="/testimonials"
          >
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  )
}