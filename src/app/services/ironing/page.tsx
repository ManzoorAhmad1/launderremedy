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
      bg: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Shield,
      title: "Expert Care",
      description: "Professional ironing for all fabric types",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Shirt,
      title: "Perfect Finish",
      description: "Crisp, wrinkle-free clothes every time",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: Package,
      title: "Great Value",
      description: "Competitive pricing for bulk orders",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
              variants={fadeInUp}
            >
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Professional Ironing</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Expert Ironing & Pressing Service
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Perfectly pressed clothes delivered to your door. Same-day service available.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Link href="/place-order">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                  Book Ironing Service
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
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
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
