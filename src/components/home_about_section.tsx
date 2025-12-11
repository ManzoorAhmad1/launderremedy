"use client"

import React from 'react'
import { Leaf, Droplets, Users, ChevronRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from './ui/button'
import homeAboutImage from '../../public/img07.png'
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
                                src={homeAboutImage}
                                alt="Our team providing professional cleaning services"
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
                                    Quality service since 2015
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
                                More Than Just Clean Clothes
                                <span className="block text-primary mt-2">A Commitment to Excellence</span>
                            </h2>

                            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                                We blend traditional cleaning expertise with modern, sustainable practices to deliver
                                exceptional results while caring for our community and environment.
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
                                    <h3 className="font-semibold text-lg mb-1">Sustainable Innovation</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        Eco-friendly processes that reduce environmental impact
                                    </p>
                                </div>
                            </div>

                            {/* Highlight 2 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Advanced Technology</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        State-of-the-art equipment for superior cleaning results
                                    </p>
                                </div>
                            </div>

                            {/* Highlight 3 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Expert Team</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                        Certified professionals dedicated to quality service
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Button size="lg" className="group" asChild>
                                <Link href="/about" className="flex items-center gap-2 text-white">
                                    Learn Our Full Story
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
                                Discover our mission, values, and what makes us different
                            </p>
                        </div>
                    </motion.div>


                </div>
            </div>
        </section>
    )
}