"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Truck,
  Headphones,
  Shield,
  Leaf,
  Sparkles,
  Users,
  Award,
  Download,
  Star,
  ArrowRight,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import Image from 'next/image';

const AboutPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const testimonials = [
    { id: 1, logo: "FINANCIAL TIMES", text: "Best Innovation Award 2024" },
    { id: 2, logo: "Forbes", text: "30 Under 30 - Retail Category" },
  ];

  const features = [
    {
      icon: Clock,
      title: "24h turnaround time",
      description: "Get your clothes back within 24 hours",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20",
      image: "/img17.png"
    },
    {
      icon: Truck,
      title: "Free collection & delivery",
      description: "We pick up and deliver at your doorstep",
      color: "text-secondary-600",
      bg: "bg-secondary-50 dark:bg-secondary-900/20",
      image: "/img18.png"
    },
    {
      icon: Headphones,
      title: "Dedicated 24/7 support",
      description: "Round-the-clock customer service",
      color: "text-accent-yellow",
      bg: "bg-accent-yellow/10 dark:bg-accent-yellow/20",
      image: "/img19.png"
    },
  ];

  const values = [
    { icon: Shield, title: "Quality", description: "Never compromise on quality", image: "/img20.png" },
    { icon: Leaf, title: "Eco-friendly", description: "Sustainable cleaning solutions", image: "/img17.png" },
    { icon: Sparkles, title: "Innovation", description: "Constantly improving our process", image: "/img11.jpg" },
    { icon: Users, title: "Community", description: "Supporting local businesses", image: "/img15.png" },
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "99.8%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Service Availability" },
    { value: "100%", label: "Eco-Friendly" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-purple opacity-5 dark:opacity-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30 animate-float animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <span className="text-sm font-semibold px-4 py-2 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200">
                SINCE 2018
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="block text-neutral-900 dark:text-white">
                Reinventing the
              </span>
              <span className="text-gradient block">
                future of laundry
              </span>
              <span className="text-neutral-900 dark:text-white">
                and dry cleaning
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8"
            >
              Making sure that your most comfortable clothes are safe, clean, and cared for with premium laundry solutions delivered to your door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 group">
                BOOK TODAY
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline-primary px-8 py-4 rounded-full text-lg font-semibold">
                LEARN MORE
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Logos */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-8 bg-white dark:bg-neutral-800 border-y border-neutral-200 dark:border-neutral-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                className="flex items-center justify-center gap-6 p-6 rounded-xl bg-neutral-50 dark:bg-neutral-700/30 hover:shadow-lg transition-shadow border border-neutral-200 dark:border-neutral-700"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {testimonial.logo}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {testimonial.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Who We Are */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-neutral-900 dark:text-white">Who </span>
                <span className="text-gradient">we are</span>
              </h2>

              <div className="space-y-4 text-neutral-600 dark:text-neutral-300">
                <p className="text-lg">
                  Founded in 2018 in Launder, our team of technical pioneers has been revolutionizing laundry and dry cleaning for modern lifestyles.
                </p>
                <p>
                  We combine cutting-edge technology with traditional care techniques to deliver exceptional results. Our eco-friendly approach ensures your clothes receive the best treatment while minimizing environmental impact.
                </p>
                <p>
                  With strategically located facilities across the county, we provide fast, reliable service backed by transparent pricing and quality guarantees.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-all border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-primary-lg border border-neutral-200 dark:border-neutral-700">
                {/* Image with overlay */}
                <div className="relative w-full h-full">
                  <Image
                    src="/img16.jpg"
                    alt="Launder Remedy professional team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-700/40 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-end p-8">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        LAUNDER REMEDY
                      </div>
                      <div className="text-xl md:text-2xl font-light text-white opacity-90">
                        Premium Laundry Care
                      </div>
                      <div className="mt-6 flex items-center justify-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-white text-sm md:text-base">5.0 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">How Launder</span>
              <span className="text-neutral-900 dark:text-white"> Remedy Works</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Simple, efficient, and reliable laundry service at your fingertips
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 border ${hoveredCard === index
                    ? 'shadow-primary-lg bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 border-primary-200 dark:border-primary-900/50'
                    : 'shadow-sm bg-white dark:bg-neutral-700/30 border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`p-3 rounded-xl ${feature.bg} backdrop-blur-sm border border-white/20`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-900/30"
          >
            <p className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              BOOK TODAY, WEAR HAPPINESS EVERYDAY.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              Schedule your pickup — We handle the rest!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-neutral-900 dark:text-white">Quality </span>
                <span className="text-gradient">without compromise</span>
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-neutral-600 dark:text-neutral-300">
                  We partner with local businesses and suppliers to deliver premium products that ensure your clothes receive the care they deserve.
                </p>
                <p className="text-neutral-600 dark:text-neutral-300">
                  We never compromise when it comes to quality and service. Our focus on attention to detail and care ensures exceptional results through every step of our modern cleaning process.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow"
                  >
                    {/* Value icon with image background */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={value.image}
                        alt={value.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <div className="absolute inset-0 bg-primary-900/40 flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        {value.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-primary-lg border border-neutral-200 dark:border-neutral-700">
                <div className="relative w-full h-full">
                  <Image
                    src="/img11.jpg"
                    alt="Premium laundry care process"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />

                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-700/50 to-transparent flex items-end">
                    <div className="p-6 md:p-8 w-full">
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Premium Care
                      </div>
                      <div className="text-xl md:text-2xl text-white/90">
                        For Your Favorite Clothes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center mb-8">
                <div className="p-4 rounded-2xl bg-white/10 mb-6">
                  <Smartphone className="w-12 h-12" />
                </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get the App
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Download our mobile app for easier booking, tracking, and exclusive offers
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button className="bg-white text-primary-600 hover:bg-neutral-100 dark:bg-white dark:text-primary-600 dark:hover:bg-neutral-100 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors group border border-white/20">
                <div className="text-2xl">􀄨</div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg">App Store</div>
                </div>
                <Download className="w-5 h-5 text-primary-600 group-hover:translate-y-1 transition-transform" />
              </button>

              <button className="bg-neutral-900 hover:bg-black dark:bg-neutral-900 dark:hover:bg-black text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors group border border-neutral-800">
                <div className="text-2xl">▶</div>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg">Google Play</div>
                </div>
                <Download className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <p className="text-sm opacity-90">
                Promoted by: Launder Remedy • Download our mobile app • Follow us
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;