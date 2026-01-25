"use client";

import { motion } from "framer-motion";
import {
  Shirt,
  Sparkles,
  Clock,
  Shield,
  Leaf,
  Truck,
  CheckCircle,
  ArrowRight,
  Package,
  DollarSign,
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

export default function LaundryServicePage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await orderService.getCategoriesList();
      if (response?.data) {
        const laundryServices: ServiceItem[] = [];
        response.data.forEach((category: any) => {
          if (category.title === "Laundry Services") {
            category.subcategories.forEach((subcategory: any) => {
              laundryServices.push({
                _id: subcategory._id,
                name: subcategory.title,
                description: subcategory.description,
                price: typeof subcategory.price === 'string' ? parseFloat(subcategory.price) : subcategory.price,
                category: category.title,
                type: subcategory.type || 'laundry',
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
        setServices(laundryServices.sort((a, b) => a.price - b.price));
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
      icon: Clock,
      title: "Fast 24hr Service",
      description: "Get your laundry cleaned and returned within 24 hours",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      description: "We use environmentally safe detergents and methods",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Shield,
      title: "Care Guarantee",
      description: "100% satisfaction guaranteed or your money back",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Truck,
      title: "Free Collection & Delivery",
      description: "We pick up and deliver at your convenience",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Book Online",
      description: "Choose your service and schedule a pickup time that suits you"
    },
    {
      step: "02",
      title: "We Collect",
      description: "Our driver picks up your laundry from your doorstep"
    },
    {
      step: "03",
      title: "We Clean",
      description: "Professional washing, drying, and folding with care"
    },
    {
      step: "04",
      title: "We Deliver",
      description: "Fresh, clean laundry delivered back to your door"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-800/50 to-transparent"></div>
        
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
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Premium Laundry Service</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Professional Laundry Service in London
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Fresh, clean clothes delivered to your door. Book online in under 60 seconds.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Link href="/place-order">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                  Book Now
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
              Why Choose Our Laundry Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional care for your clothes with unmatched convenience
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

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Laundry Services & Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for all your laundry needs
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <RotateCcw className="w-8 h-8 mx-auto text-primary-600 animate-spin mb-4" />
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary-500 transition-all hover:shadow-xl relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white text-xs font-bold px-3 py-1 rounded-full\">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4\">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{service.name}</h3>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4\">
                    <span className="text-3xl font-bold text-primary-600">
                      £{service.price.toFixed(2)}
                    </span>
                    {service.perItemPrice && (
                      <span className="text-sm text-muted-foreground">
                        (£{service.perItemPrice}/item)
                      </span>
                    )}
                  </div>

                  {service.prepaidTotalItems && (
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 mb-4\">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-primary-600" />
                        <span className="font-medium text-primary-700 dark:text-primary-400">
                          Bundle: {service.prepaidTotalItems} items
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4\">
                    {service.fastService && (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        24H Service
                      </span>
                    )}
                    {service.ecoFriendly && (
                      <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full">
                        <Leaf className="w-3 h-3" />
                        Eco-Friendly
                      </span>
                    )}
                  </div>

                  <Link href="/place-order">
                    <Button className="w-full" size="lg">
                      Book Now
                    </Button>
                  </Link>
                </motion.div>
              ))}
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and convenient
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full text-white text-2xl font-bold mb-6">
                  {step.step}
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-200 top-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
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
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of satisfied customers enjoying fresh, clean laundry delivered to their door.
            </p>
            <Link href="/place-order">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                Book Your First Order
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
