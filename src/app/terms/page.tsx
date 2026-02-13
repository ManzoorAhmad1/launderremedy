"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  AlertCircle,
  CheckCircle,
  Mail,
  Cookie,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Launder Remedy website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      icon: UserCheck,
      title: "2. Service Description",
      content: "Launder Remedy provides laundry, dry cleaning, ironing, and alteration services in London. We collect, clean, and deliver your items according to the schedule you choose. Service availability may vary by location."
    },
    {
      icon: Shield,
      title: "3. User Responsibilities",
      content: "You are responsible for providing accurate pickup and delivery information, ensuring items are suitable for cleaning, and removing all valuables from pockets. You must be available during scheduled collection and delivery times."
    },
    {
      icon: Lock,
      title: "4. Payment Terms",
      content: "Payment is required at the time of order placement. We accept major credit cards and debit cards through our secure payment processor. Prices are subject to change but will be confirmed before you complete your order."
    },
    {
      icon: Database,
      title: "6. Liability",
      content: "While we take utmost care of your items, Launder Remedy is not liable for damage to items that are not suitable for our cleaning processes, pre-existing damage, or items valued over £100 unless specifically declared. Maximum liability is limited to 2x the cleaning charge."
    },
    {
      icon: Eye,
      title: "7. Privacy",
      content: "We are committed to protecting your privacy. Personal information collected is used solely for service delivery and is never shared with third parties except as required for payment processing. See our Privacy Policy for details."
    },
    {
      icon: CheckCircle,
      title: "8. Quality Guarantee",
      content: "We guarantee the quality of our work. If you're not satisfied with the cleaning results, contact us within 48 hours of delivery and we will re-clean the item free of charge."
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
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Legal Information</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Terms of Service
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

      {/* Content Section */}
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
                  <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
                  <p className="text-muted-foreground text-sm">
                    Please read these terms carefully before using our services. By using Launder Remedy, 
                    you agree to be bound by these terms and conditions.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Terms */}
            <motion.div
              className="mt-12 bg-card border border-border rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">9. General Provisions</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Modifications</h3>
                  <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Governing Law</h3>
                  <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Contact</h3>
                  <p>For questions about these terms, please contact us at:</p>
                  <div className="mt-3 flex items-center gap-2 text-primary-600">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:support@launderremedy.com" className="hover:underline">
                      support@launderremedy.com
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Severability</h3>
                  <p>If any provision of these terms is found to be unenforceable, the remaining provisions will continue to be valid and enforceable.</p>
                </div>
              </div>
            </motion.div>

            {/* Related Links */}
            <motion.div
              className="mt-12 bg-muted/50 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/contact" 
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary-500 transition-colors"
                >
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span className="text-foreground font-medium">Privacy Policy</span>
                </Link>
                <Link 
                  href="/cookies" 
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary-500 transition-colors"
                >
                  <Cookie className="w-5 h-5 text-primary-600" />
                  <span className="text-foreground font-medium">Cookie Policy</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
