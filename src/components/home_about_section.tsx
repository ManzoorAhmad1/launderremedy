"use client"

import React from 'react'
import { Leaf, Droplets, Users, ChevronRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

export default function HomeAboutSection() {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800">
                            <Image
                                src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80"
                                alt="Professional laundry team providing expert garment care services"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                            {/* Image caption */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                                <p className="text-sm font-medium text-center">
                                    Excellence in service since 2015
                                </p>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full blur-xl -z-10" />
                    </motion.div>
                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Section Header */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 text-primary font-medium">
                                <Sparkles className="w-4 h-4" />
                                <span>Who We Are</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Transforming Garment Care
                                <span className="block text-primary mt-2">Through Innovation & Excellence</span>
                            </h2>

                            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                                Launder Remedy combines time-honored craftsmanship with advanced eco-friendly technology 
                                to deliver unparalleled results. Our commitment extends beyond clean clothes—we're dedicated 
                                to environmental stewardship and community enrichment.
                            </p>
                        </div>

                        {/* Key Highlights */}
                        <div className="space-y-5 pt-2">
                            {/* Highlight 1 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Environmental Responsibility</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        Sustainable practices minimizing environmental impact while maximizing cleaning efficiency
                                    </p>
                                </div>
                            </div>

                            {/* Highlight 2 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">State-of-the-Art Technology</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        Advanced equipment and techniques ensuring superior garment care and preservation
                                    </p>
                                </div>
                            </div>

                            {/* Highlight 3 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Certified Professionals</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        Expert team trained in specialized fabric care and customer service excellence
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Link className="group" href="/about-us"   >
                                <p className="flex items-center gap-2 text-white">
                                    Discover Our Story
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </p>
                            </Link>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
                                Learn about our commitment to quality, sustainability, and customer satisfaction
                            </p>
                        </div>
                    </motion.div>


                </div>
            </div>
        </section>
    )
}