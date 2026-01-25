"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Home,
  Package,
  ShoppingCart,
  BookOpen,
  Phone,
  HelpCircle,
  Info,
  Briefcase,
  Settings,
  MapPin,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function SitemapPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const sitemapSections = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { name: "Home", href: "/", icon: Home },
        { name: "About Us", href: "/about-us", icon: Info },
        { name: "How It Works", href: "/how-it-works", icon: Settings },
        { name: "Pricing", href: "/pricing", icon: Package },
        { name: "Place Order", href: "/place-order", icon: ShoppingCart }
      ]
    },
    {
      title: "Services",
      icon: Package,
      links: [
        { name: "Laundry Service", href: "/services/laundry", icon: Package },
        { name: "Dry Cleaning", href: "/services/dry-cleaning", icon: Package },
        { name: "Ironing Service", href: "/services/ironing", icon: Package },
        { name: "Alterations", href: "/services/alterations", icon: Package }
      ]
    },
    {
      title: "Information",
      icon: Info,
      links: [
        { name: "Blog", href: "/blog", icon: BookOpen },
        { name: "FAQ", href: "/faq", icon: HelpCircle },
        { name: "Contact Us", href: "/contact", icon: Phone },
        { name: "Careers", href: "/careers", icon: Briefcase }
      ]
    },
    {
      title: "Legal",
      icon: FileText,
      links: [
        { name: "Terms of Service", href: "/terms", icon: FileText },
        { name: "Privacy Policy", href: "/contact", icon: FileText },
        { name: "Cookie Policy", href: "/cookies", icon: FileText }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
              variants={fadeInUp}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Site Navigation</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Sitemap
            </motion.h1>

            <motion.p
              className="text-xl text-primary-100"
              variants={fadeInUp}
            >
              Find all our pages in one convenient location
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {sitemapSections.map((section, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  </div>

                  <ul className="space-y-3">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-600 transition-colors" />
                          <span className="text-foreground group-hover:text-primary-600 transition-colors">
                            {link.name}
                          </span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="mt-12 bg-muted/50 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-muted-foreground mb-6">
                If you need help finding something specific, please don't hesitate to contact us.
              </p>
              <Link href="/contact">
                <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                  Contact Support
                </button>
              </Link>
            </motion.div>

            {/* SEO Section */}
            <motion.div
              className="mt-8 bg-card border border-border rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">About Launder Remedy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Launder Remedy is London's premier laundry and dry cleaning service, offering convenient 
                collection and delivery of your garments. We provide professional laundry services, expert 
                dry cleaning, precision ironing, and skilled alterations. Our commitment to quality, 
                convenience, and eco-friendly practices makes us the top choice for busy Londoners who 
                demand the best care for their clothes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
