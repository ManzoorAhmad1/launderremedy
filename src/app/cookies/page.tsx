"use client";

import { motion } from "framer-motion";
import {
  Cookie,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Eye,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookiesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const cookieTypes = [
    {
      icon: CheckCircle,
      title: "Strictly Necessary Cookies",
      description: "These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas.",
      examples: ["Session cookies", "Authentication tokens", "Security cookies"],
      required: true,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: ["Language preferences", "Theme selection", "Location data"],
      required: false,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: ["Google Analytics", "Page views", "User behavior tracking"],
      required: false,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Eye,
      title: "Marketing Cookies",
      description: "These cookies track your browsing habits to show you relevant advertising and measure the effectiveness of our campaigns.",
      examples: ["Social media cookies", "Advertising pixels", "Retargeting cookies"],
      required: false,
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-900/20"
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
              <Cookie className="w-5 h-5" />
              <span className="text-sm font-medium">Cookie Information</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Cookie Policy
            </motion.h1>

            <motion.p
              className="text-xl text-primary-100 mb-4"
              variants={fadeInUp}
            >
              Last updated: January 25, 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What are Cookies?</h3>
                  <p className="text-muted-foreground text-sm">
                    Cookies are small text files that are placed on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and 
                    understanding how you use our site.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Launder Remedy uses cookies to enhance your browsing experience, analyze site traffic, 
                and provide personalized content. We use both first-party cookies (set by us) and 
                third-party cookies (set by our partners and service providers).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You can control and manage cookies in your browser settings. However, please note that 
                disabling certain cookies may affect the functionality of our website.
              </p>
            </motion.div>

            {/* Cookie Types */}
            <div className="space-y-8 mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Types of Cookies We Use</h2>
              
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${type.bg} flex items-center justify-center flex-shrink-0`}>
                      <type.icon className={`w-6 h-6 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-foreground">{type.title}</h3>
                        {type.required ? (
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                            Required
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">Examples:</h4>
                        <ul className="space-y-1">
                          {type.examples.map((example, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Managing Cookies */}
            <motion.div
              className="bg-card border border-border rounded-xl p-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Browser Settings</h3>
                  <p>Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. Generally, you can find these settings in your browser's "options" or "preferences" menu.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Third-Party Tools</h3>
                  <p>You can opt out of third-party cookies using tools like:</p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Your Online Choices (youronlinechoices.com)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Network Advertising Initiative (networkadvertising.org)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Google Analytics Opt-out (tools.google.com/dlpage/gaoptout)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Impact of Disabling Cookies</h3>
                  <p>Please note that disabling cookies may affect your ability to use certain features of our website. Some functionality may not work properly without cookies enabled.</p>
                </div>
              </div>
            </motion.div>

            {/* Contact & Links */}
            <motion.div
              className="bg-muted/50 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Questions or Concerns?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about our use of cookies, please contact us at{" "}
                <a href="mailto:support@launderremedy.com" className="text-primary-600 hover:underline">
                  support@launderremedy.com
                </a>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/terms">
                  <Button variant="outline">Terms of Service</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Privacy Policy</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
