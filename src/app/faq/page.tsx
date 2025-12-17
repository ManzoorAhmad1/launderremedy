// app/faq/page.tsx - UPDATED with full-width mobile app section
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown,
  HelpCircle,
  Mail,
  Clock,
  Shield,
  Sparkles,
  Truck,
  Star,
  Download,
  Globe,
  Smartphone,
  User,
  CreditCard,
  Flower,
  ShieldCheck,
  Package
} from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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

  const faqCategories = [
    {
      id: 1,
      title: "Service Information",
      icon: HelpCircle,
      color: "text-accent-blue",
      bg: "bg-accent-blue/10 dark:bg-accent-blue/20"
    },
    {
      id: 2,
      title: "Order & Delivery",
      icon: Truck,
      color: "text-accent-green",
      bg: "bg-accent-green/10 dark:bg-accent-green/20"
    },
    {
      id: 3,
      title: "Payment & Pricing",
      icon: CreditCard,
      color: "text-accent-yellow",
      bg: "bg-accent-yellow/10 dark:bg-accent-yellow/20"
    },
    {
      id: 4,
      title: "Special Care",
      icon: Flower,
      color: "text-accent-red",
      bg: "bg-accent-red/10 dark:bg-accent-red/20"
    }
  ];

  const faqs = [
    {
      id: 1,
      category: "Service Information",
      question: "How Does Launder Remedy Operate?",
      answer: "LaunderRemedy provides a seamless laundry experience through a simple three-step process: Schedule a pickup via our app or website, we collect your items from your doorstep, professionally clean them at our eco-friendly facilities, and deliver them back fresh and ready to wear within 24-48 hours. Our process combines traditional care with modern technology for exceptional results."
    },
    {
      id: 2,
      category: "Service Information",
      question: "What Kind Of Services Does Launder Remedy Offer?",
      answer: `We offer four specialized services:

1. Premium Laundry Service: Your clothes are machine washed at optimal 30°C, gently tumble dried at medium temperature, and neatly folded for storage.

2. Professional Dry Cleaning & Ironing: Each garment receives individual attention with eco-friendly dry cleaning methods or specialized washing, followed by expert ironing and presentation on hangers.

3. Expert Ironing Only: For pre-washed clothes, our skilled team provides professional ironing services. For heavily creased items, we recommend our Dry Cleaning service for superior results.

4. Luxury Bedding Care: Duvets, pillows, and large blankets receive special 72-hour processing with individual pricing based on size and material requirements.

Note: Service availability varies by location. Check your area's specific offerings on our website.`
    },
    {
      id: 3,
      category: "Service Information",
      question: "How Long Does It Take For My Items To Be Ready?",
      answer: "Standard laundry and dry cleaning services feature 24-hour turnaround for regular items. Premium bedding and special care items require 72 hours for optimal results. Express 12-hour service is available in select areas for urgent needs. Delivery timelines begin once we receive your items at our facility."
    },
    {
      id: 4,
      category: "Service Information",
      question: "Where Do You Process My Clothing?",
      answer: "All items are processed at our state-of-the-art eco-friendly facilities equipped with modern cleaning technology. We maintain multiple local processing centers across London to ensure quick turnaround times. Each facility follows strict quality control protocols and sustainable practices for environmental responsibility."
    },
    {
      id: 5,
      category: "Special Care",
      question: "I Have Allergies To Specific Detergents. What Choices Do I Have?",
      answer: "We offer multiple hypoallergenic options including fragrance-free, dye-free, and sensitive skin formulations. Our premium organic detergent line uses plant-based ingredients. During scheduling, specify your allergy requirements, and our team will select the appropriate solution. We maintain detailed records of your preferences for future orders."
    },
    {
      id: 6,
      category: "Special Care",
      question: "Can I Provide My Own Detergent For The Cleaning Process?",
      answer: "Yes, we accommodate personal detergent preferences. During collection, provide your preferred detergent with clear usage instructions. Our team will follow your specifications precisely. Note that results may vary with non-professional detergents, and we cannot guarantee outcomes with unfamiliar products."
    },
    {
      id: 7,
      category: "Payment & Pricing",
      question: "How Can I Make Payments For Your Services?",
      answer: "We accept all major credit/debit cards, Apple Pay, Google Pay, and PayPal through our secure payment portal. Corporate accounts can arrange invoicing. Pricing is transparent with no hidden fees – you'll see the exact cost before confirming your order. Subscription plans offer discounted rates for regular customers."
    },
    {
      id: 8,
      category: "Special Care",
      question: "Do You Handle The Cleaning Of Wedding Dresses?",
      answer: "Yes, we specialize in delicate garment care including wedding dresses. Our bridal service includes specialized cleaning, preservation packaging, and storage consultation. Each wedding dress receives individual attention from our expert team. Schedule a consultation for custom pricing and timeline recommendations for your special garment."
    }
  ];

  const popularQuestions = [
    {
      icon: Clock,
      question: "What are your operating hours?",
      answer: "We operate 24/7 for collections and deliveries. Facility processing occurs Monday-Saturday."
    },
    {
      icon: Shield,
      question: "Is my clothing insured?",
      answer: "Yes, all items are covered by our comprehensive protection policy during the entire process."
    },
    {
      icon: User,
      question: "Can I modify my order after pickup?",
      answer: "Order modifications are possible within 2 hours of collection through our app or customer support."
    }
  ];

  const appStores = [
    {
      name: "App Store",
      icon: "􀄨",
      description: "Download on the",
      action: "App Store",
      color: "bg-white text-primary-600 hover:bg-neutral-100 dark:bg-white dark:text-primary-600 dark:hover:bg-neutral-100",
      iconColor: "text-primary-600"
    },
    {
      name: "Google Play",
      icon: "▶",
      description: "Get it on",
      action: "Google Play",
      color: "bg-neutral-900 text-white hover:bg-black dark:bg-neutral-900 dark:text-white dark:hover:bg-black",
      iconColor: "text-white"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-purple opacity-5 dark:opacity-10"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-float"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4 mr-2" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-neutral-900 dark:text-white">DO YOU HAVE </span>
              <span className="text-gradient">QUESTIONS?</span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
              Find quick answers to common questions about our laundry and dry cleaning services.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Trusted by 50,000+ customers</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.9/5 Customer Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {faqCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 rounded-xl bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-all border border-neutral-200 dark:border-neutral-700 cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-lg ${category.bg} mb-3`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  {category.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-neutral-200 dark:border-neutral-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 mt-1">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        Q{faq.id}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                        {faq.question}
                      </h3>
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-accent-blue/10 dark:bg-accent-blue/20 text-xs text-accent-blue dark:text-accent-blue">
                        {faq.category}
                      </div>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                        <div className="pl-12">
                          <div className="prose prose-neutral dark:prose-invert max-w-none">
                            {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-neutral-600 dark:text-neutral-300 mb-4 last:mb-0">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Popular Questions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
              Quick Answers to Popular Questions
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {popularQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-900/30"
                >
                  <div className="inline-flex p-3 rounded-lg bg-white dark:bg-neutral-800 mb-4">
                    <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Center CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">
                Still Need Help?
              </h3>
              <p className="opacity-90 mb-6">
                Visit our comprehensive help center for detailed guides, tutorials, and additional resources.
              </p>
              <button className="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors group">
                Visit our help center
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Download Section - FULL WIDTH like About page */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Download our mobile app
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl">
                Available on the App Store and Google Play. Manage orders, track deliveries, and get exclusive offers.
              </p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {appStores.map((store) => (
                <motion.button
                  key={store.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${store.color} px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors group`}
                >
                  <div className={`text-2xl ${store.iconColor}`}>{store.icon}</div>
                  <div className="text-left">
                    <div className="text-xs">{store.description}</div>
                    <div className="text-lg">{store.action}</div>
                  </div>
                  <Download className={`w-5 h-5 ${store.iconColor} group-hover:translate-y-1 transition-transform`} />
                </motion.button>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <p className="text-sm opacity-90">
                Follow us on social media for cleaning tips and exclusive promotions
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;