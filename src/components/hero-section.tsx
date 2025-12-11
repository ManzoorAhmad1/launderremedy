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
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-20 md:pb-24">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />

            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000" />

            <div className="container relative mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section - Now first column */}
                    <div className="relative animate-fade-in">
                        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group mt-8 lg:mt-12">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-300/5 to-primary-700/10" />
                            
                            {/* White Background */}
                            <div className="absolute inset-4 bg-white/90 dark:bg-neutral-800/90 rounded-2xl" />
                            
                            {/* Your Image */}
                            <div className="relative aspect-square md:aspect-[4/5] w-full flex items-center justify-center p-6 md:p-8">
                                <div className="relative w-full h-full max-w-md">
                                    <Image
                                        src="https://www.launderremedy.com/_next/static/media/img01.cfed031c.png"
                                        alt="Professional laundry and dry cleaning services in London - Quick laundry service, dry cleaning, ironing with free pickup and delivery"
                                        fill
                                        className="object-contain object-center"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                        quality={100}
                                        style={{
                                            filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1))'
                                        }}
                                    />
                                </div>
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl rotate-12 animate-float opacity-30" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary-300 to-primary-400 rounded-2xl -rotate-12 animate-float animation-delay-2000 opacity-30" />
                            
                            {/* Text Overlay */}
                            <div className="absolute bottom-8 left-0 right-0 text-center">
                                <div className="inline-block bg-gradient-to-r from-white to-primary-50 dark:from-neutral-800 dark:to-primary-900/20 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-primary/10">
                                    <h3 className="text-lg font-bold text-neutral-800 dark:text-white">Fresh & Clean</h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-300">Professional laundry service</p>
                                </div>
                            </div>
                            
                            {/* Floating Star Badge */}
                            <div className="absolute top-6 right-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                                    <Star className="w-6 h-6 text-white fill-white" />
                                </div>
                            </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-white to-primary-50 dark:from-neutral-800 dark:to-primary-900/20 rounded-2xl shadow-xl p-4 w-64 animate-slide-in-right border border-primary/10 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-0.5" />
                                    ))}
                                    <span className="ml-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Ranked #1</span>
                                </div>
                                <div className="text-primary font-bold text-lg">5.0</div>
                            </div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="font-medium">Source of key customers</div>
                                <div className="text-xs mt-1">Dry Cleaning & Laundry Services</div>
                                <Link 
                                    href="/reviews"
                                    className="text-primary hover:text-primary-700 text-xs font-medium mt-2 inline-block"
                                >
                                    Read 5000+ reviews →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Text Content - Now second column */}
                    <div className="space-y-8 animate-fade-in animation-delay-100 lg:pt-8">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-slide-in-left">
                            <Sparkles className="w-4 h-4 mr-2" />
                            #1 Rated Laundry Service in London
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="block text-neutral-900 dark:text-white">
                                Quick & Easy
                            </span>
                            <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                Laundry & Dry Cleaning
                            </span>
                            <span className="block text-neutral-600 dark:text-neutral-300 mt-2">
                                Services in London
                            </span>
                        </h1>

                        <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl">
                            Say goodbye to laundry day stress. We offer premium laundry, dry cleaning,
                            and ironing services delivered right to your doorstep in 24 hours.
                        </p>

                        {/* Service Areas Section */}
                        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 space-y-4 animate-slide-up">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span className="font-semibold">Schedule collection in</span>
                                    <span className="font-bold text-primary">London City</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-neutral-500">
                                    <Clock className="w-4 h-4" />
                                    <span>Current time: {currentTime}</span>
                                </div>
                            </div>

                            {/* Service Areas Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-3">
                                    <div className="p-3 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">Servicing BSX</div>
                                            <div className="text-primary font-bold">$100 - $500</div>
                                        </div>
                                        <div className="flex items-center text-sm text-neutral-500">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Central London Area
                                        </div>
                                    </div>
                                    <div className="p-3 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">Servicing BSX</div>
                                            <div className="text-primary font-bold">$100 - $300</div>
                                        </div>
                                        <div className="flex items-center text-sm text-neutral-500">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            West London Area
                                        </div>
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="space-y-3">
                                    <Link href="/place-order?slot=morning">
                                        <Button
                                            variant="outline"
                                            className="h-16 justify-between px-4 hover:bg-primary/5 hover:border-primary group transition-all w-full border-2"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Zap className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold">Morning Slot</div>
                                                    <div className="text-sm text-neutral-500">12:00 - 15:00</div>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>

                                    <Link href="/place-order?slot=evening">
                                        <Button
                                            variant="outline"
                                            className="h-16 justify-between px-4 hover:bg-primary/5 hover:border-primary group transition-all w-full border-2"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Moon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-semibold">Evening Slot</div>
                                                    <div className="text-sm text-neutral-500">21:00 - 23:00</div>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <div className="flex items-center justify-between">
                                    <Link href="/place-order">
                                        <Button 
                                            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transition-all group px-8 py-6 text-lg rounded-xl"
                                        >
                                            <span className="flex items-center">
                                                Schedule Your Pickup
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/place-order#slots"
                                        className="text-primary hover:text-primary-700 font-medium text-sm transition-colors"
                                    >
                                        See all slots →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="text-center bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-2xl md:text-3xl font-bold text-primary">24h</div>
                                <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Turnaround</div>
                            </div>
                            <div className="text-center bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-2xl md:text-3xl font-bold text-primary">Free</div>
                                <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Pickup & Delivery</div>
                            </div>
                            <div className="text-center bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                                <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Support</div>
                            </div>
                            <div className="text-center bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-2xl md:text-3xl font-bold text-primary">5.0★</div>
                                <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
                <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    )
}