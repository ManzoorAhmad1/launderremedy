"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Heart,
  TrendingUp,
  Award,
  Target,
  Coffee,
  Sparkles,
  CheckCircle,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Industry-leading compensation packages"
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive health insurance coverage"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear progression paths and training opportunities"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work-life balance with flexible scheduling"
    },
    {
      icon: Coffee,
      title: "Great Culture",
      description: "Friendly, supportive team environment"
    },
    {
      icon: Award,
      title: "Employee Recognition",
      description: "Regular rewards and recognition programs"
    }
  ];

  const positions = [
    {
      title: "Laundry Operative",
      location: "London, UK",
      type: "Full-time",
      description: "Join our production team and help deliver exceptional laundry services to our customers.",
      requirements: [
        "Previous laundry or hospitality experience preferred",
        "Attention to detail",
        "Ability to work in a fast-paced environment",
        "Team player with good communication skills"
      ]
    },
    {
      title: "Delivery Driver",
      location: "London, UK",
      type: "Full-time",
      description: "Be the face of our company, collecting and delivering laundry across London.",
      requirements: [
        "Valid UK driving license",
        "Clean driving record",
        "Excellent customer service skills",
        "Knowledge of London areas"
      ]
    },
    {
      title: "Customer Service Representative",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      description: "Help our customers with their queries and ensure exceptional service delivery.",
      requirements: [
        "Excellent communication skills",
        "Previous customer service experience",
        "Problem-solving abilities",
        "Proficiency with computer systems"
      ]
    },
    {
      title: "Operations Manager",
      location: "London, UK",
      type: "Full-time",
      description: "Lead our operations team and ensure efficient service delivery across all locations.",
      requirements: [
        "5+ years experience in operations management",
        "Leadership and team management skills",
        "Process improvement expertise",
        "Strong analytical abilities"
      ]
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do"
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "We work together to achieve common goals"
    },
    {
      icon: Heart,
      title: "Care",
      description: "We care about our customers, team, and community"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We continuously improve and embrace new ideas"
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
              <Briefcase className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Join Our Team</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Build Your Career with Launder Remedy
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Join a dynamic team revolutionizing the laundry industry in London.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                View Open Positions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job - we offer a career with great benefits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide us every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary-500 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <value.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your perfect role with us
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button>Apply Now</Button>
                  </Link>
                </div>
                
                <p className="text-muted-foreground mb-4">{position.description}</p>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {position.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Don't see a suitable position? Send us your CV and we'll keep you in mind for future opportunities.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-6 text-lg">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
