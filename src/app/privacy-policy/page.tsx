"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  AlertCircle,
  Mail,
  Cookie,
  FileText,
  Trash2,
  Globe,
  Bell,
  Server,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      content:
        "We collect information you provide directly to us, including your name, email address, phone number, and delivery address when you register for an account or place an order. We also collect payment information (processed securely by our payment provider), order history, and any communications you send us. Additionally, we automatically collect certain technical data such as your IP address, browser type, device information, and usage patterns through cookies and similar technologies.",
      bullets: [
        "Account registration details (name, email, phone, address)",
        "Order and transaction information",
        "Payment data (tokenised — we never store full card details)",
        "Communications and customer support interactions",
        "Technical data: IP address, browser, device, and session logs",
      ],
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to operate, maintain, and improve our services, process your orders, and communicate with you. Specifically, we use your data to:",
      bullets: [
        "Process and fulfil your laundry, dry cleaning, and alteration orders",
        "Arrange complimentary collection and delivery at your chosen schedule",
        "Send transactional notifications (order confirmations, collection reminders, delivery updates)",
        "Respond to your enquiries and provide customer support",
        "Send promotional communications — only with your explicit consent",
        "Improve our platform, services, and user experience through analytics",
        "Comply with applicable legal and regulatory obligations",
      ],
    },
    {
      icon: UserCheck,
      title: "3. Legal Basis for Processing",
      content:
        "Where the UK General Data Protection Regulation (UK GDPR) applies, we process your personal data on the following legal bases:",
      bullets: [
        "Contract performance — to deliver the services you have requested",
        "Legitimate interests — to operate and improve our business, prevent fraud, and ensure security",
        "Legal obligation — to comply with legal, tax, and regulatory requirements",
        "Consent — for marketing communications and non-essential cookies (you may withdraw consent at any time)",
      ],
    },
    {
      icon: Globe,
      title: "4. Data Sharing & Disclosure",
      content:
        "We do not sell, rent, or trade your personal information to third parties. We may share your data only in the following strictly limited circumstances:",
      bullets: [
        "Service providers — trusted partners who assist with payment processing, logistics, and IT infrastructure, bound by confidentiality agreements",
        "Legal requirements — where disclosure is required by law, court order, or regulatory authority",
        "Business transfers — in the event of a merger, acquisition, or sale of assets, with prior notice to you",
        "Your consent — where you have explicitly authorised us to share your data",
      ],
    },
    {
      icon: Server,
      title: "5. Data Retention",
      content:
        "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. In general:",
      bullets: [
        "Active account data is retained for the duration of your account",
        "Order and transaction records are retained for 7 years to meet HMRC accounting obligations",
        "Marketing preferences are retained until you withdraw consent or request deletion",
        "Technical logs are retained for up to 12 months for security and fraud prevention",
      ],
    },
    {
      icon: Lock,
      title: "6. Data Security",
      content:
        "We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. Our security practices include:",
      bullets: [
        "TLS/SSL encryption for all data transmitted between your device and our servers",
        "Payment data handled exclusively by PCI-DSS compliant payment processors",
        "Strict access controls — staff access to personal data is limited to those with a legitimate business need",
        "Regular security assessments and vulnerability testing",
        "Incident response procedures in the event of a data breach",
      ],
    },
    {
      icon: UserCheck,
      title: "7. Your Rights Under UK GDPR",
      content:
        "As a data subject under UK GDPR, you have the following rights with respect to your personal data. To exercise any of these rights, please contact us at support@launderremedy.com:",
      bullets: [
        "Right of access — request a copy of the personal data we hold about you",
        "Right to rectification — request correction of inaccurate or incomplete data",
        "Right to erasure — request deletion of your data where there is no compelling reason for continued processing",
        "Right to restrict processing — request that we limit how we use your data",
        "Right to data portability — receive your data in a structured, machine-readable format",
        "Right to object — object to processing based on legitimate interests or for direct marketing",
        "Right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk",
      ],
    },
    {
      icon: Cookie,
      title: "8. Cookies & Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences, analyse site traffic, and personalise content. You can manage or disable non-essential cookies at any time through your browser settings or our Cookie Preferences panel. For full details, please refer to our Cookie Policy.",
      bullets: [
        "Essential cookies — required for the platform to function (cannot be disabled)",
        "Analytics cookies — help us understand how visitors use our site (Google Analytics)",
        "Preference cookies — remember your settings and choices",
        "Marketing cookies — used only with your explicit consent",
      ],
    },
    {
      icon: Bell,
      title: "9. Marketing Communications",
      content:
        "We will only send you promotional emails, SMS messages, or push notifications where you have given your explicit consent to receive them. Every marketing communication includes an easy, one-click unsubscribe option. Withdrawing your consent does not affect the processing of your data for any other purpose, and you will continue to receive essential transactional communications related to your orders.",
    },
    {
      icon: Trash2,
      title: "10. Children's Privacy",
      content:
        "Our services are intended for individuals aged 18 and over. We do not knowingly collect personal data from children under the age of 13. If we become aware that we have inadvertently collected personal information from a child, we will take immediate steps to delete that information from our records. If you believe a child has provided us with personal data, please contact us at support@launderremedy.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 md:py-28 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <span className="text-sm font-medium">Legal &amp; Compliance</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              className="text-xl text-primary-100 mb-2"
              variants={fadeInUp}
            >
              Your privacy matters to us — and we take it seriously.
            </motion.p>

            <motion.p
              className="text-sm text-primary-200"
              variants={fadeInUp}
            >
              Last updated: 7 March 2026 &nbsp;|&nbsp; Applies to: Launder Remedy Ltd, London, UK
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Introduction Notice */}
            <motion.div
              className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About This Policy</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This Privacy Policy explains how <strong>Launder Remedy Ltd</strong> ("we", "us", "our")
                    collects, uses, stores, and protects your personal data when you use our website and services.
                    It is drafted in accordance with the <strong>UK General Data Protection Regulation (UK GDPR)</strong>{" "}
                    and the <strong>Data Protection Act 2018</strong>. By using our services, you acknowledge that
                    you have read and understood this policy.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Policy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
                      {section.bullets && (
                        <ul className="space-y-2">
                          {section.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Changes to Policy */}
            <motion.div
              className="mt-8 bg-card border border-border rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-3">11. Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may update this Privacy Policy periodically to reflect changes in our practices, services,
                    or applicable legislation. When we make material changes, we will notify you by:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      "Posting the revised policy on this page with an updated effective date",
                      "Sending an email notification to your registered address for significant changes",
                      "Displaying a prominent notice on our platform",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-sm">
                    Your continued use of our services after any changes constitutes your acceptance of the
                    updated policy. We encourage you to review this page periodically.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              className="mt-8 bg-card border border-border rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-foreground mb-4">12. Contact Our Data Protection Team</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy or the way we
                handle your personal data, please do not hesitate to contact us. We are committed to addressing
                your enquiries promptly and transparently.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:support@launderremedy.com"
                  className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg hover:border-primary-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Email Us</p>
                    <p className="text-sm font-medium text-foreground">support@launderremedy.com</p>
                  </div>
                </a>
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-muted/50 border border-border rounded-lg hover:border-primary-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Regulatory Authority</p>
                    <p className="text-sm font-medium text-foreground">Information Commissioner's Office (ICO)</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Related Documents */}
            <motion.div
              className="mt-8 bg-muted/50 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/terms"
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary-500 transition-colors"
                >
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span className="text-foreground font-medium">Terms of Service</span>
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
