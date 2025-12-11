"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Clock, Moon, Zap, ArrowRight, Star, Sparkles, MapPin, CheckCircle } from 'lucide-react'

export default function HeroSection() {
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }))
        }
        updateTime()
        const interval = setInterval(updateTime, 60000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />

            {/* Background Blobs - Responsive sizes */}
            <div className="absolute top-10 left-4 w-48 h-48 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
            <div className="absolute bottom-10 right-4 w-48 h-48 sm:bottom-20 sm:right-10 sm:w-72 sm:h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000" />

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center lg:items-start">
                    {/* Image Section - First column on lg+, second on mobile */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group mt-6 md:mt-8 lg:mt-12">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-300/5 to-primary-700/10" />

                            {/* White Background */}
                            <div className="absolute inset-3 md:inset-4 bg-white/90 dark:bg-neutral-800/90 rounded-xl md:rounded-2xl" />

                            {/* Image Container */}
                            <div className="relative aspect-square md:aspect-[4/5] w-full flex items-center justify-center p-4 md:p-6 lg:p-8">
                                <div className="relative w-full h-full max-w-sm md:max-w-md">
                                    <Image
                                        src="https://www.launderremedy.com/_next/static/media/img01.cfed031c.png"
                                        alt="Professional laundry and dry cleaning services in London - Quick laundry service, dry cleaning, ironing with free pickup and delivery"
                                        fill
                                        className="object-contain object-center"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                        priority
                                        quality={100}
                                        style={{
                                            filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1))'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Decorative Elements - Responsive positioning */}
                            <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-xl md:rounded-2xl rotate-12 animate-float opacity-30" />
                            <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary-300 to-primary-400 rounded-xl md:rounded-2xl -rotate-12 animate-float animation-delay-2000 opacity-30" />

                            {/* Text Overlay - Responsive padding */}
                            <div className="absolute bottom-4 md:bottom-6 left-0 right-12 text-center hidden md:block">
                                <div className="inline-block bg-gradient-to-r from-white to-primary-50 dark:from-neutral-800 dark:to-primary-900/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border border-primary/10 mx-2">
                                    <h3 className="text-sm md:text-lg font-bold text-neutral-800 dark:text-white">Fresh & Clean</h3>
                                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300">Professional laundry service</p>
                                </div>
                            </div>

                            {/* Floating Star Badge - Responsive sizing */}
                            <div className="absolute top-3 right-3 md:top-6 md:right-6">
                                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                                    <Star className="w-4 h-4 md:w-6 md:h-6 text-white fill-white" />
                                </div>
                            </div>
                        </div>

                        {/* Rating Badge - Responsive positioning and sizing */}
                        <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-gradient-to-r from-white to-primary-50 dark:from-neutral-800 dark:to-primary-900/20 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-3 md:p-4 w-48 md:w-64 animate-slide-in-right border border-primary/10 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-1 md:mb-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400 mr-0.5" />
                                    ))}
                                    <span className="ml-1 md:ml-2 text-xs md:text-sm font-semibold text-neutral-700 dark:text-neutral-300">Ranked #1</span>
                                </div>
                                <div className="text-primary font-bold text-base md:text-lg">5.0</div>
                            </div>
                            <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="font-medium">Source of key customers</div>
                                <div className="text-xs mt-0.5 md:mt-1 opacity-75">Dry Cleaning & Laundry Services</div>
                                <Link
                                    href="/reviews"
                                    className="text-primary hover:text-primary-700 text-xs font-medium mt-1 md:mt-2 inline-block"
                                >
                                    Read 5000+ reviews →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Text Content - First on mobile, second on lg+ */}
                    <div className="space-y-6 md:space-y-8 animate-fade-in animation-delay-100 lg:pt-8 order-1 lg:order-2">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-2 md:mb-4 animate-slide-in-left">
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                            #1 Rated Laundry Service in London
                        </div>

                        {/* Heading - Responsive text sizes */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="block text-neutral-900 dark:text-white">
                                Quick & Easy
                            </span>
                            <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                Laundry & Dry Cleaning
                            </span>
                            <span className="block text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mt-1 md:mt-2">
                                Services in London
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                            Say goodbye to laundry day stress. We offer premium laundry, dry cleaning,
                            and ironing services delivered right to your doorstep in 24 hours.
                        </p>

                        {/* Service Areas Section */}
                        <div className="bg-white dark:bg-neutral-800 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 space-y-4 animate-slide-up">
                            {/* Location & Time Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                                    <span className="font-semibold text-sm sm:text-base">
                                        Schedule collection in{' '}
                                        <span className="font-bold text-primary">London City</span>
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-500">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="whitespace-nowrap">Current time: {currentTime}</span>
                                </div>
                            </div>

                            {/* Service Areas Grid - Stack on mobile */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                {/* Price Cards */}
                                <div className="space-y-3">
                                    <div className="p-3 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium text-sm sm:text-base">Servicing BSX</div>
                                            <div className="text-primary font-bold text-sm sm:text-base">$100 - $500</div>
                                        </div>
                                        <div className="flex items-center text-xs sm:text-sm text-neutral-500">
                                            <CheckCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                                            <span>Central London Area</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium text-sm sm:text-base">Servicing BSX</div>
                                            <div className="text-primary font-bold text-sm sm:text-base">$100 - $300</div>
                                        </div>
                                        <div className="flex items-center text-xs sm:text-sm text-neutral-500">
                                            <CheckCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                                            <span>West London Area</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="space-y-3">
                                    <Link href="/place-order?slot=morning" className="block">
                                        <Button
                                            variant="outline"
                                            className="h-14 sm:h-16 justify-between px-3 sm:px-4 hover:bg-primary/5 hover:border-primary group transition-all w-full border-2 text-left"
                                        >
                                            <div className="flex items-center space-x-2 sm:space-x-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm sm:text-base">Morning Slot</div>
                                                    <div className="text-xs sm:text-sm text-neutral-500">12:00 - 15:00</div>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                        </Button>
                                    </Link>

                                    <Link href="/place-order?slot=evening" className="block">
                                        <Button
                                            variant="outline"
                                            className="h-14 sm:h-16 justify-between px-3 sm:px-4 hover:bg-primary/5 hover:border-primary group transition-all w-full border-2 text-left"
                                        >
                                            <div className="flex items-center space-x-2 sm:space-x-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm sm:text-base">Evening Slot</div>
                                                    <div className="text-xs sm:text-sm text-neutral-500">21:00 - 23:00</div>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* CTA Button Section */}
                            <div className="pt-3 md:pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <Link href="/place-order" className="w-full sm:w-auto">
                                        <Button
                                            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transition-all group px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg rounded-xl w-full sm:w-auto"
                                        >
                                            <span className="flex items-center justify-center sm:justify-start">
                                                Schedule Your Pickup
                                                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/place-order#slots"
                                        className="text-primary hover:text-primary-700 font-medium text-xs sm:text-sm transition-colors text-center sm:text-right"
                                    >
                                        See all slots →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid - Responsive grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            <div className="text-center bg-white dark:bg-neutral-800 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">24h</div>
                                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Turnaround</div>
                            </div>
                            <div className="text-center bg-white dark:bg-neutral-800 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">Free</div>
                                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Pickup & Delivery</div>
                            </div>
                            <div className="text-center bg-white dark:bg-neutral-800 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">24/7</div>
                                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Support</div>
                            </div>
                            <div className="text-center bg-white dark:bg-neutral-800 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">5.0★</div>
                                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hide on mobile */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow hidden sm:block">
                <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    )
}