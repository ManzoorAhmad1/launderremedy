"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Shield, 
  Clock, 
  Leaf,
  Star,
  Truck,
  Award,
  Heart,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categoryData } from '@/utils/categoryData';

// Layout components for different categories
const LaundryServicesLayout = ({ category }: { category: typeof categoryData['laundry-services'] }) => (
  <div className="min-h-screen bg-white dark:bg-neutral-900">
    {/* Full-width Hero with Overlay Text */}
    <section className="relative h-[70vh] overflow-hidden">
      <Image src={category.heroImage} alt={category.title} fill className="object-cover brightness-75" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Most Popular Service
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{category.title}</h1>
            <p className="text-xl text-white/90 mb-8">{category.description}</p>
            <div className="flex gap-4">
              <Link href="/place-order"><Button size="lg" className="bg-primary hover:bg-primary-700 text-white">Book Now <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
              <Link href="/pricing"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">View Pricing</Button></Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Grid Layout for Sections */}
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-700 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{section.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">{section.description}</p>
              <div className="space-y-2">
                {section.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ShirtsAndTopsLayout = ({ category }: { category: typeof categoryData['shirts-and-tops'] }) => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950">
    {/* Split Hero */}
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              Professional Shirt Care
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">{category.title}</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">{category.description}</p>
            <Link href="/place-order"><Button size="lg" className="bg-primary hover:bg-primary-700 text-white">Schedule Service <ArrowRight className="ml-2" /></Button></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={category.heroImage} alt={category.title} fill className="object-cover" priority />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Alternating Sections */}
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl space-y-32">
        {category.sections.map((section, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
            <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
              </div>
            </div>
            <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm mb-4">
                Step {idx + 1}
              </div>
              <h2 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">{section.title}</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">{section.description}</p>
              <div className="space-y-3">
                {section.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const ElegantSuitsLayout = ({ category }: { category: typeof categoryData['elegant-suits'] }) => (
  <div className="min-h-screen bg-neutral-900 text-white">
    {/* Luxury Dark Hero */}
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={category.heroImage} alt={category.title} fill className="object-cover opacity-20" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-900" />
      <div className="relative container mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/20 text-primary-300 text-sm font-medium mb-6 border border-primary/30">
            <Award className="w-4 h-4 mr-2" />
            Luxury Service
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">{category.title}</h1>
          <p className="text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto">{category.description}</p>
          <Link href="/place-order"><Button size="lg" className="bg-primary hover:bg-primary-700 text-white px-10 py-7 text-lg">Reserve Your Service <ArrowRight className="ml-2" /></Button></Link>
        </motion.div>
      </div>
    </section>

    {/* Premium Card Grid */}
    <section className="py-20 px-4 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={section.image} alt={section.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{section.title}</h3>
                </div>
              </div>
              <p className="text-neutral-400 mb-6">{section.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {section.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const DressesAndSkirtsLayout = ({ category }: { category: typeof categoryData['dresses-and-skirts'] }) => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100/30 to-white dark:from-neutral-900 dark:via-primary-950/20 dark:to-neutral-800">
    {/* Elegant Hero with Curved Design */}
    <section className="relative pt-24 pb-32 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Delicate Care Specialists
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">{category.title}</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">{category.description}</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-16">
          <Image src={category.heroImage} alt={category.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>

    {/* Masonry-style Grid */}
    <section className="py-20 px-4 bg-white dark:bg-neutral-800">
      <div className="container mx-auto max-w-7xl">
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="break-inside-avoid bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-700 dark:to-primary-900/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-900/50 flex items-center justify-center">
                  <span className="text-primary-700 dark:text-primary-300 font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{section.title}</h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">{section.description}</p>
              <div className="space-y-2">
                {section.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-pink-500 flex-shrink-0 mt-1" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const TrousersLayout = ({ category }: { category: typeof categoryData['trousers'] }) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-900">
    {/* Minimalist Hero */}
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-neutral-900 dark:text-white tracking-tight">{category.title}</h1>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">{category.description}</p>
          <Link href="/place-order"><Button size="lg" className="bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-10 py-7 text-lg rounded-full">Get Started <ArrowRight className="ml-2" /></Button></Link>
        </motion.div>
      </div>
    </section>

    {/* Full-Width Image Banner */}
    <section className="mb-20">
      <div className="relative h-[500px] w-full">
        <Image src={category.heroImage} alt={category.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>

    {/* Timeline-style Layout */}
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {category.sections.map((section, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-20 last:mb-0">
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center text-2xl font-bold">
                  {idx + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-xl">
                  <Image src={section.image} alt={section.title} fill className="object-cover" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">{section.title}</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">{section.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {section.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 bg-slate-100 dark:bg-neutral-800 p-3 rounded-lg">
                      <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const OutdoorClothingLayout = ({ category }: { category: typeof categoryData['outdoor-clothing'] }) => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100/30 to-primary-200/20 dark:from-neutral-900 dark:via-primary-950/20 dark:to-neutral-800">
    {/* Adventure-style Hero */}
    <section className="relative h-screen">
      <Image src={category.heroImage} alt={category.title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Leaf className="w-4 h-4 mr-2" />
              Technical Fabric Specialists
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">{category.title}</h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-10">{category.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/place-order"><Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 text-lg">Book Service <ArrowRight className="ml-2" /></Button></Link>
              <Link href="/pricing"><Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg">Learn More</Button></Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Card Carousel Style */}
    <section className="py-20 px-4 bg-white dark:bg-neutral-900">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group cursor-pointer">
              <div className="relative h-80 rounded-3xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-shadow">
                <Image src={section.image} alt={section.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">{section.description}</p>
              <div className="space-y-2">
                {section.features.slice(0, 2).map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const HomeTextilesLayout = ({ category }: { category: typeof categoryData['home-textiles'] }) => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100/50 to-white dark:from-neutral-950 dark:via-primary-950/20 dark:to-neutral-900">
    {/* Warm & Cozy Hero */}
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Home Comfort Care
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-neutral-900 dark:text-white">{category.title}</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">{category.description}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <Image src={category.heroImage} alt={category.title} fill className="object-cover" priority />
        </motion.div>
      </div>
    </section>

    {/* Bento Box Grid */}
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-6">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`${idx === 0 ? 'md:col-span-2' : ''} bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow`}>
              <div className={`grid ${idx === 0 ? 'md:grid-cols-2' : ''} gap-6`}>
                <div className="relative h-64">
                  <Image src={section.image} alt={section.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">{section.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6">{section.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {section.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const IroningLayout = ({ category }: { category: typeof categoryData['ironing'] }) => (
  <div className="min-h-screen bg-white dark:bg-neutral-900">
    {/* Clean Modern Hero */}
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Express Service
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">{category.title}</h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">{category.description}</p>
              <Link href="/place-order"><Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">Book Now <ArrowRight className="ml-2" /></Button></Link>
            </motion.div>
          </div>
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={category.heroImage} alt={category.title} fill className="object-cover" priority />
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* Horizontal Scroll Cards */}
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-neutral-900 dark:text-white">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <span className="text-purple-700 dark:text-purple-300 font-bold text-xl">{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">{section.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{section.description}</p>
              <div className="space-y-2">
                {section.features.slice(0, 2).map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const AlterationsLayout = ({ category }: { category: typeof categoryData['alterations'] }) => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100/30 to-white dark:from-neutral-950 dark:via-primary-950/20 dark:to-neutral-900">
    {/* Split-screen Hero */}
    <section className="min-h-screen grid lg:grid-cols-2">
      <div className="relative">
        <Image src={category.heroImage} alt={category.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-900/50" />
      </div>
      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-6">
            <RotateCcw className="w-4 h-4 mr-2" />
            Expert Tailoring
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">{category.title}</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">{category.description}</p>
          <Link href="/place-order"><Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 py-7">Get a Quote <ArrowRight className="ml-2" /></Button></Link>
        </motion.div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-20 px-4 bg-white dark:bg-neutral-900">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-neutral-900 dark:text-white">Our Alteration Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative bg-gradient-to-br from-red-50 to-rose-50 dark:from-neutral-800 dark:to-red-900/20 rounded-3xl p-8 overflow-hidden hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 dark:bg-red-900/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                  <Image src={section.image} alt={section.title} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">{section.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">{section.description}</p>
                <div className="space-y-3">
                  {section.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 bg-white dark:bg-neutral-700 p-3 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ShoeRepairLayout = ({ category }: { category: typeof categoryData['shoe-repair'] }) => (
  <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
    {/* Industrial/Workshop Hero */}
    <section className="relative pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-800 dark:bg-neutral-700 text-white text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Master Cobbler Services
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-neutral-900 dark:text-white">{category.title}</h1>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">{category.description}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <Image src={category.heroImage} alt={category.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" priority />
        </motion.div>
      </div>
    </section>

    {/* Workshop-style Grid */}
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {category.sections.map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-72">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-neutral-900">{idx + 1}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">{section.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">{section.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {section.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 border border-neutral-200 dark:border-neutral-700 p-3 rounded-lg">
                      <Shield className="w-4 h-4 text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-1" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 px-4 bg-neutral-900 dark:bg-black">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Restore Your Favorite Footwear</h2>
        <p className="text-xl text-neutral-300 mb-8">Expert craftsmanship meets modern techniques</p>
        <Link href="/place-order"><Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 px-10 py-7">Book Repair Service <ArrowRight className="ml-2" /></Button></Link>
      </div>
    </section>
  </div>
);

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categoryData[slug];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/pricing">
            <Button>View All Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Route to different layouts based on category
  switch (slug) {
    case 'laundry-services':
      return <LaundryServicesLayout category={category as any} />;
    case 'shirts-and-tops':
      return <ShirtsAndTopsLayout category={category as any} />;
    case 'elegant-suits':
      return <ElegantSuitsLayout category={category as any} />;
    case 'dresses-and-skirts':
      return <DressesAndSkirtsLayout category={category as any} />;
    case 'trousers':
      return <TrousersLayout category={category as any} />;
    case 'outdoor-clothing':
      return <OutdoorClothingLayout category={category as any} />;
    case 'home-textiles':
      return <HomeTextilesLayout category={category as any} />;
    case 'ironing':
      return <IroningLayout category={category as any} />;
    case 'alterations':
      return <AlterationsLayout category={category as any} />;
    case 'shoe-repair':
      return <ShoeRepairLayout category={category as any} />;
    default:
      return <LaundryServicesLayout category={category as any} />;
  }
}
