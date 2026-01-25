"use client";

import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  Clock,
  Shield,
  Leaf,
  Truck,
  CheckCircle,
  ArrowRight,
  Shirt,
  DollarSign,
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

export default function DryCleaningPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await orderService.getCategoriesList();
      if (response?.data) {
        const dryCleanServices: ServiceItem[] = [];
        response.data.forEach((category: any) => {
          // Include all categories with dry-clean type services
          if (category.subcategories) {
            category.subcategories.forEach((subcategory: any) => {
              const serviceType = subcategory.type || '';
              // Filter for dry cleaning related services
              if (serviceType === 'dry-clean' || 
                  category.title.toLowerCase().includes('suit') ||
                  category.title.toLowerCase().includes('dress') ||
                  category.title.toLowerCase().includes('trouser') ||
                  category.title.toLowerCase().includes('outdoor')) {
                dryCleanServices.push({
                  _id: subcategory._id,
                  name: subcategory.title,
                  description: subcategory.description,
                  price: typeof subcategory.price === 'string' ? parseFloat(subcategory.price) : subcategory.price,
                  category: category.title,
                  type: serviceType,
                  popular: subcategory.popular,
                  fastService: subcategory.fastService,
                  ecoFriendly: subcategory.ecoFriendly,
                  bundleQuantity: subcategory.bundleQuantity,
                  prepaidTotalItems: subcategory.prepaidTotalItems,
                  perItemPrice: subcategory.perItemPrice
                });
              }
            });
          }
        });
        setServices(dryCleanServices.sort((a, b) => a.price - b.price));
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
      icon: Award,
      title: "Premium Quality",
      description: "Professional dry cleaning using the latest technology",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Green dry cleaning with biodegradable solvents",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Shield,
      title: "Fabric Care",
      description: "Expert handling of delicate and luxury fabrics",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "24-48 hour turnaround available",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20"
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
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Premium Dry Cleaning</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Expert Dry Cleaning Services
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Professional care for your finest garments. Eco-friendly and affordable.
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
                  View All Prices
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
              Why Choose Our Dry Cleaning?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert care using the latest eco-friendly technology
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
              Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quality dry cleaning at competitive prices
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <RotateCcw className="w-8 h-8 mx-auto text-primary-600 animate-spin mb-4" />
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
                {Object.entries(groupedServices).map(([category, categoryServices], categoryIndex) => (
                  <motion.div
                    key={category}
                    className="bg-card border border-border rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {categoryServices.slice(0, 5).map((item) => (
                        <li key={item._id} className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <span className="text-foreground font-medium text-sm">{item.name}</span>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-primary-600 font-bold whitespace-nowrap">
                              £{item.price.toFixed(2)}
                            </span>
                            {item.perItemPrice && (
                              <p className="text-xs text-muted-foreground">
                                £{item.perItemPrice}/item
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    {categoryServices.length > 5 && (
                      <p className="text-sm text-muted-foreground mt-4 text-center">
                        +{categoryServices.length - 5} more services
                      </p>
                    )}
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
            <Link href="/pricing">
              <Button size="lg">
                View Complete Price List
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
              Ready for Professional Dry Cleaning?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Book now and experience the finest dry cleaning service in London.
            </p>
            <Link href="/place-order">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                Schedule Pickup
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
