// app/contact/page.tsx - UPDATED with black/purple/white dark theme
"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  Download,
  CheckCircle,
  ArrowRight,
  Shield,
  Globe,
  Smartphone,
  Users
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setSubmitted(true);
    reset();
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "launderremedy@gmail.com",
      description: "We'll respond within 2 hours",
      color: "text-accent-blue",
      bg: "bg-accent-blue/10 dark:bg-accent-blue/20"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+44 7442 716396",
      description: "Mon-Fri, 8am-6pm GMT",
      color: "text-accent-green",
      bg: "bg-accent-green/10 dark:bg-accent-green/20"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      value: "Chat Now",
      description: "Available 24/7",
      color: "text-accent-yellow",
      bg: "bg-accent-yellow/10 dark:bg-accent-yellow/20"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      value: "London, UK",
      description: "Multiple locations nationwide",
      color: "text-accent-red",
      bg: "bg-accent-red/10 dark:bg-accent-red/20"
    },
  ];

  const departments = [
    {
      name: "Customer Support",
      email: "support@launderremedy.com",
      description: "General inquiries & assistance"
    },
    {
      name: "Business Inquiries",
      email: "partnerships@launderremedy.com",
      description: "Corporate & partnership requests"
    },
    {
      name: "Technical Support",
      email: "tech@launderremedy.com",
      description: "App & technical issues"
    },
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-neutral-900 dark:text-white">Contact </span>
              <span className="text-gradient">Us</span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
              Get in touch with our team. We're here to help you with any questions about our laundry services.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response within 2 hours</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-primary-lg p-6 md:p-8 border border-neutral-200 dark:border-neutral-700">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    Send us a message
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 rounded-full bg-accent-green/10 dark:bg-accent-green/20 mb-6">
                      <CheckCircle className="w-16 h-16 text-accent-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Thank you for contacting us. We'll respond to your inquiry within 2 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline-primary px-6 py-3 rounded-lg"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.name 
                              ? 'border-accent-red focus:ring-accent-red' 
                              : 'border-neutral-300 dark:border-neutral-700 focus:ring-primary-500'
                          } focus:ring-2 focus:outline-none transition-colors bg-white dark:bg-neutral-900`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-accent-red">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email 
                              ? 'border-accent-red focus:ring-accent-red' 
                              : 'border-neutral-300 dark:border-neutral-700 focus:ring-primary-500'
                          } focus:ring-2 focus:outline-none transition-colors bg-white dark:bg-neutral-900`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-accent-red">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors bg-white dark:bg-neutral-900"
                        placeholder="+44 1234 567890"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Subject *
                      </label>
                      <input
                        {...register("subject")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.subject 
                            ? 'border-accent-red focus:ring-accent-red' 
                            : 'border-neutral-300 dark:border-neutral-700 focus:ring-primary-500'
                        } focus:ring-2 focus:outline-none transition-colors bg-white dark:bg-neutral-900`}
                        placeholder="How can we help you?"
                      />
                      {errors.subject && (
                        <p className="mt-2 text-sm text-accent-red">{errors.subject.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.message 
                            ? 'border-accent-red focus:ring-accent-red' 
                            : 'border-neutral-300 dark:border-neutral-700 focus:ring-primary-500'
                        } focus:ring-2 focus:outline-none transition-colors bg-white dark:bg-neutral-900`}
                        placeholder="Tell us about your inquiry..."
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-accent-red">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Shield className="w-4 h-4 flex-shrink-0" />
                        <span>Your data is protected and secure</span>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary px-8 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="space-y-8">
                {/* Contact Cards */}
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-all border border-neutral-200 dark:border-neutral-700"
                    >
                      <div className={`inline-flex p-3 rounded-lg ${info.bg} mb-4 border border-neutral-200 dark:border-neutral-700`}>
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      <p className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {info.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Departments */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-900/30">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                    Contact Specific Departments
                  </h3>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <motion.div
                        key={dept.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-800 transition-colors border border-neutral-200 dark:border-neutral-700"
                      >
                        <div>
                          <h4 className="font-medium text-neutral-900 dark:text-white">
                            {dept.name}
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {dept.description}
                          </p>
                        </div>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1"
                        >
                          Email
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* App Download */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-white/10">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Download our mobile app
                      </h3>
                      <p className="opacity-90">
                        Available on the App Store and Google Play
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    {appStores.map((store) => (
                      <motion.button
                        key={store.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${store.color} px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors border border-white/20 dark:border-white/10`}
                      >
                        <div className={`text-2xl ${store.iconColor}`}>{store.icon}</div>
                        <div className="text-left">
                          <div className="text-xs">{store.description}</div>
                          <div className="text-lg">{store.action}</div>
                        </div>
                        <Download className={`w-5 h-5 ${store.iconColor}`} />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;