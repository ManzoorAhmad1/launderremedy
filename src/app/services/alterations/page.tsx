"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Ruler,
  Award,
  RotateCcw,
  Package
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

export default function AlterationsPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await orderService.getCategoriesList();
      if (response?.data) {
        const alterationServices: ServiceItem[] = [];
        response.data.forEach((category: any) => {
          if (category.title === "Alterations" || category.title === "Shoe Repair") {
            category.subcategories.forEach((subcategory: any) => {
              alterationServices.push({
                _id: subcategory._id,
                name: subcategory.title,
                description: subcategory.description,
                price: typeof subcategory.price === 'string' ? parseFloat(subcategory.price) : subcategory.price,
                category: category.title,
                type: subcategory.type || 'repair',
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
        setServices(alterationServices.sort((a, b) => a.price - b.price));
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
      icon: Scissors,
      title: "Expert Tailoring",
      description: "Skilled tailors with years of experience",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Most alterations completed within 3-5 days",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Award,
      title: "Perfect Fit",
      description: "Precision alterations for the perfect fit",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Shield,
      title: "Satisfaction Guaranteed",
      description: "We'll make it right until you're happy",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20"
    }
  ];

  // Group services by category for better organization
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceItem[]>);

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
              <Scissors className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Professional Alterations</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Expert Clothing Alterations & Repairs
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Professional tailoring services for the perfect fit. All garment types welcome.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Link href="/place-order">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                  Book Alteration Service
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Contact Us
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
              Why Choose Our Alterations Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert tailoring for the perfect fit every time
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

      {/* Services & Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Alterations & Repairs Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional tailoring and repair services
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <RotateCcw className="w-8 h-8 mx-auto text-primary-600 animate-spin mb-4" />
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {Object.entries(groupedServices).map(([category, categoryServices], categoryIndex) => (
                  <motion.div
                    key={category}
                    className="bg-card border border-border rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border flex items-center gap-2">
                      <Scissors className="w-6 h-6 text-primary-600" />
                      {category}
                    </h3>
                    <ul className="space-y-4">
                      {categoryServices.map((item) => (
                        <li key={item._id} className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <span className="text-foreground font-medium">{item.name}</span>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            )}
                          </div>
                          <span className="text-primary-600 font-bold text-lg whitespace-nowrap">
                            {item.price > 0 ? `£${item.price.toFixed(2)}` : 'POA'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {services.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No services available at the moment.</p>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Don't see what you need? Contact us for a custom quote.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Request Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
              Ready for the Perfect Fit?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Let our expert tailors transform your garments for a flawless fit.
            </p>
            <Link href="/place-order">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                Book Alteration Service
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
