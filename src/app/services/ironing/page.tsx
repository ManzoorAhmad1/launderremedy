"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Sparkles,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Shirt,
  Package,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import orderService from "@/services/order.service";

interface ServiceItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  type: string;
  popular?: boolean;
  fastService?: boolean;
  ecoFriendly?: boolean;
  bundleQuantity?: number;
  prepaidTotalItems?: string;
  perItemPrice?: string;
}

export default function IroningServicePage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await orderService.getCategoriesList();
      if (response?.data) {
        const ironingServices: ServiceItem[] = [];
        response.data.forEach((category: any) => {
          if (category.title === "Ironing Services") {
            category.subcategories.forEach((subcategory: any) => {
              ironingServices.push({
                _id: subcategory._id,
                name: subcategory.title,
                description: subcategory.description,
                price: typeof subcategory.price === 'string' ? parseFloat(subcategory.price) : subcategory.price,
                category: category.title,
                type: subcategory.type || 'pressing',
                popular: subcategory.popular,
                fastService: subcategory.fastService,
                ecoFriendly: subcategory.ecoFriendly,
                bundleQuantity: subcategory.bundleQuantity,
                prepaidTotalItems: subcategory.prepaidTotalItems,
                perItemPrice: subcategory.perItemPrice
              });
            });
          }
        });
        setServices(ironingServices.sort((a, b) => a.price - b.price));
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: Zap,
      title: "Fast Service",
      description: "Same-day and next-day ironing available",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      image: "/website imagesv/1724417885ironing-services-abu-dhabi.webp"
    },
    {
      icon: Shield,
      title: "Expert Care",
      description: "Professional ironing for all fabric types",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      image: "/website imagesv/wool-garment-care-strategies-different-fabrics-pressing.webp"
    },
    {
      icon: Shirt,
      title: "Perfect Finish",
      description: "Crisp, wrinkle-free clothes every time",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20",
      image: "/website imagesv/unrecognizable-man-ironing-shirts-laundry-home.webp"
    },
    {
      icon: Package,
      title: "Great Value",
      description: "Competitive pricing for bulk orders",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      image: "/website imagesv/hanging_up_a_tapered_fit_shirt_1024x1024.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />

        {/* Background Blobs */}
        <div className="absolute top-10 left-4 w-48 h-48 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute bottom-10 right-4 w-48 h-48 sm:bottom-20 sm:right-10 sm:w-72 sm:h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content Section */}
            <motion.div
              className="order-1 lg:order-1"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 backdrop-blur-sm rounded-full mb-6"
                variants={fadeInUp}
              >
                <Zap className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Professional Ironing</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
                variants={fadeInUp}
              >
                Expert Ironing & Pressing Service
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl"
                variants={fadeInUp}
              >
                Perfectly pressed clothes delivered to your door. Same-day service available.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <Link href="/place-order">
                  <Button size="lg" className="bg-primary-600 text-white hover:bg-primary-700 px-8 py-6 text-lg">
                    Book Ironing Service
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-6 text-lg">
                    View Pricing
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Features */}
              <motion.div 
                className="grid grid-cols-2 gap-4 mt-8"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Same-day available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Expert pressing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Free pickup & delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Wrinkle-free guarantee</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div 
              className="relative order-2 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-primary-300/5 to-primary-700/10" />

                {/* White Background */}
                <div className="absolute inset-3 md:inset-4 bg-white/90 dark:bg-neutral-800/90 rounded-xl md:rounded-2xl" />

                {/* Image Container */}
                <div className="relative aspect-square md:aspect-[4/5] w-full">
                  <div className="relative w-full h-full">
                    <Image
                      src="/website imagesv/1724417885ironing-services-abu-dhabi.webp"
                      alt="Professional ironing and pressing services - Expert garment care"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      priority
                      quality={100}
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-xl md:rounded-2xl rotate-12 animate-float opacity-30" />
                <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary-300 to-primary-400 rounded-xl md:rounded-2xl -rotate-12 animate-float animation-delay-2000 opacity-30" />

                {/* Text Overlay */}
                <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center hidden md:block">
                  <div className="inline-block bg-gradient-to-r from-white to-yellow-50 dark:from-neutral-800 dark:to-yellow-900/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border border-yellow-200/30">
                    <h3 className="text-sm md:text-lg font-bold text-neutral-800 dark:text-white">Crisp & Perfect</h3>
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300">Professional pressing experts</p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute top-3 right-3 md:top-6 md:right-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                    <Zap className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Service Badge */}
              <motion.div 
                className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-gradient-to-r from-white to-yellow-50 dark:from-neutral-800 dark:to-yellow-900/20 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-3 md:p-4 w-48 md:w-64 border border-yellow-200/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span className="text-xs md:text-sm font-semibold text-foreground">Fast Turnaround</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div className="font-medium">Same-day & next-day</div>
                  <div className="text-xs mt-1 opacity-75">Premium ironing service</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Ironing Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional pressing for a perfect finish every time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-primary-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Icon badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`p-3 rounded-lg ${feature.bg} backdrop-blur-sm border border-white/20`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ironing Services & Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional pressing at competitive prices
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <RotateCcw className="w-8 h-8 mx-auto text-primary-600 animate-spin mb-4" />
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((item, index) => (
                  <motion.div
                    key={item._id}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary-500 transition-all hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      <span className="text-primary-600 font-bold text-lg whitespace-nowrap">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>
                    {item.fastService && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                        <Clock className="w-3 h-3" />
                        <span>Fast Service</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {services.length > 0 && (
                <motion.div
                  className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <Package className="w-8 h-8 mx-auto text-primary-600 mb-3" />
                    <p className="text-foreground font-medium">
                      <strong>Bulk Discount:</strong> Order 20+ items and get 10% off your entire order
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Perfect for hotels, restaurants, and businesses
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Book Online", desc: "Choose ironing service and schedule pickup" },
              { step: "2", title: "We Collect", desc: "We pick up your clothes from your location" },
              { step: "3", title: "We Press", desc: "Professional ironing with care and precision" },
              { step: "4", title: "We Deliver", desc: "Fresh, crisp clothes delivered back to you" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Perfectly Pressed Clothes?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Book our professional ironing service today and enjoy crisp, wrinkle-free clothes.
            </p>
            <Link href="/place-order">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                Schedule Pickup Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
