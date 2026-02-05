import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles, Music } from 'lucide-react'
import PaymentMethods from './PaymentMethods'

const footerLinks = {
    services: [
        { name: "Laundry Service", href: "/services/laundry" },
        { name: "Dry Cleaning", href: "/services/dry-cleaning" },
        { name: "Ironing Service", href: "/services/ironing" },
        { name: "Alterations", href: "/services/alterations" },
    ],
    company: [
        { name: "About Us", href: "/about-us" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "Careers", href: "/careers" },
    ],
    support: [
        { name: "FAQ", href: "/faq" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/contact" },
        { name: "Terms of Service", href: "/terms" },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center space-x-3 mb-6">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-white">Launder Remedy</span>
                                <span className="text-sm text-neutral-400">Premium Care, Delivered Fresh</span>
                            </div>
                        </Link>
                        <p className="text-neutral-400 mb-8 max-w-md text-sm lg:text-base leading-relaxed">
                            Revolutionizing laundry and dry cleaning services in London with
                            premium quality, convenience, and sustainability at our core.
                        </p>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/19JyZLYC47/?mibextid=wwXIfr" },
                                { Icon: Music, label: "TikTok", href: "https://www.tiktok.com/@laundetarrc?_r=1&_t=ZN-93f9HN1QJuQ" },
                                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/launderremedyltd?igsh=ZTE0M3JsamswdHZz&utm_source=qr" },
                                { Icon: Linkedin, label: "LinkedIn", href: "#" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-all duration-300 hover:scale-105"
                                    aria-label={social.label}
                                >
                                    <social.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="mt-4 sm:mt-0">
                            <h3 className="text-lg font-semibold mb-5 capitalize text-white">
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm sm:text-base flex items-center group"
                                        >
                                            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider & Contact Section */}
                <div className="border-t border-neutral-800 mt-10 pt-8 lg:pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Info */}
                        <div className="space-y-5">
                            <h4 className="text-lg font-semibold text-white mb-2">Contact Info</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-neutral-400 text-sm">Phone Number</p>
                                        <a href="tel:+447442716396" className="text-white hover:text-primary-400 transition-colors">
                                            +44 7442 716396
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-neutral-400 text-sm">Email Address</p>
                                        <a href="mailto:support@launderremedy.com" className="text-white hover:text-primary-400 transition-colors">
                                            support@launderremedy.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mt-1">
                                        <MapPin className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-neutral-400 text-sm">Location</p>
                                        <span className="text-white">
                                            123 Laundry Street,<br />London EC1A 1BB,<br />United Kingdom
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
                            <p className="text-neutral-400 mb-4 text-sm sm:text-base">
                                Subscribe to our newsletter for updates on new services and special offers
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 min-w-0">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                                        aria-label="Email address for newsletter"
                                    />
                                </div>
                                <button
                                    className="px-6 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 rounded-lg sm:rounded-r-lg font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
                                >
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-3">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-800 mt-8 pt-8">
                    {/* Payment Methods */}
                    <div className="mb-8">
                        <PaymentMethods />
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-neutral-500 text-sm sm:text-base text-center md:text-left">
                            © {new Date().getFullYear()} Launder Remedy. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            <Link
                                href="/contact"
                                className="text-sm text-neutral-500 hover:text-white transition-colors whitespace-nowrap"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-neutral-500 hover:text-white transition-colors whitespace-nowrap"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-sm text-neutral-500 hover:text-white transition-colors whitespace-nowrap"
                            >
                                Cookie Policy
                            </Link>
                            <Link
                                href="/sitemap"
                                className="text-sm text-neutral-500 hover:text-white transition-colors whitespace-nowrap"
                            >
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}