"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Search,
  Filter,
  Package,
  Clock,
  Check,
  Star,
  Truck,
  Shield,
  Sparkles,
  Tag,
  ChevronDown,
  Grid,
  List,
  ShoppingBag,
  Percent,
  Zap,
  CheckCircle,
  Leaf,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Types
interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory?: string;
  bundle?: {
    quantity: number;
    perItemPrice: number;
  };
  type?: 'dry-clean' | 'wash-iron' | 'pressing' | 'repair' | 'bundle';
  popular?: boolean;
  fastService?: boolean;
  ecoFriendly?: boolean;
}

interface CartItem extends ServiceItem {
  quantity: number;
}

// Local storage key
const CART_STORAGE_KEY = 'launderremedy-cart';

// Categories data
const categories = [
  { id: 'all', label: 'All Services', icon: Grid, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
  { id: 'dryclean', label: 'Dry Cleaning', icon: Package, color: 'bg-gradient-to-r from-primary-600 to-secondary-500' },
  { id: 'dresses', label: 'Dresses & Skirts', icon: ShoppingBag, color: 'bg-gradient-to-r from-accent-pink to-purple-500' },
  { id: 'shirts', label: 'Shirts & Tops', icon: Grid, color: 'bg-gradient-to-r from-accent-teal to-blue-500' },
  { id: 'suits', label: 'Elegant Suits', icon: ShoppingBag, color: 'bg-gradient-to-r from-primary-700 to-primary-800' },
  { id: 'trousers', label: 'Trousers', icon: Grid, color: 'bg-gradient-to-r from-accent-green to-emerald-500' },
  { id: 'pressing', label: 'Pressing', icon: Zap, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
  { id: 'alterations', label: 'Alterations', icon: RotateCcw, color: 'bg-gradient-to-r from-accent-yellow to-amber-500' },
  { id: 'shoes', label: 'Shoe Repair', icon: Shield, color: 'bg-gradient-to-r from-neutral-700 to-neutral-800' },
  { id: 'bundles', label: 'Bundles', icon: Percent, color: 'bg-gradient-to-r from-secondary-600 to-purple-600', badge: 'Save 20%' },
];

export default function PricingPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCart, setShowCart] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCategories, setShowCategories] = useState<boolean>(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Service data
  const services: ServiceItem[] = [
    // Dry Clean Services
    { id: 'dc1', name: 'Blazer Dry Clean', price: 15.99, category: 'dryclean', type: 'dry-clean', popular: true, fastService: true },
    { id: 'dc2', name: 'Jacket Dry Clean', price: 18.99, category: 'dryclean', type: 'dry-clean', description: 'Velvet, sequins, silk & leather' },
    { id: 'dc3', name: 'Designer Jacket', price: 29.99, category: 'dryclean', type: 'dry-clean', popular: true },
    { id: 'dc4', name: 'Overcoat Dry Clean', price: 24.99, category: 'dryclean', type: 'dry-clean', fastService: true },
    { id: 'dc5', name: 'Cardigan Dry Clean', price: 12.99, category: 'dryclean', type: 'dry-clean', ecoFriendly: true },

    // Dresses & Skirts
    { id: 'ds1', name: 'Single Dress', price: 12.00, category: 'dresses', type: 'dry-clean', popular: true, fastService: true },
    { id: 'ds2', name: 'Delicate Dress', price: 15.00, category: 'dresses', type: 'dry-clean' },
    { id: 'ds3', name: 'Evening Dress', price: 20.00, category: 'dresses', type: 'dry-clean', popular: true },
    { id: 'ds4', name: 'Silk Dress', price: 15.00, category: 'dresses', type: 'dry-clean' },
    { id: 'ds5', name: 'Skirt Dry Clean', price: 6.95, category: 'dresses', type: 'dry-clean', fastService: true },

    // Shirts & Tops
    { id: 'st1', name: 'Hung Shirt Service', price: 2.80, category: 'shirts', type: 'wash-iron', fastService: true, ecoFriendly: true },
    { id: 'st2', name: 'Folded Shirt', price: 3.35, category: 'shirts', type: 'wash-iron' },
    { id: 'st3', name: 'Blouse Dry Clean', price: 6.00, category: 'shirts', type: 'dry-clean' },
    { id: 'st4', name: 'Ladies Shirt Care', price: 3.00, category: 'shirts', type: 'wash-iron' },

    // Elegant Suits
    { id: 'es1', name: '2-Piece Suit', price: 19.99, category: 'suits', type: 'dry-clean', popular: true, fastService: true },
    { id: 'es2', name: '3-Piece Suit', price: 24.99, category: 'suits', type: 'dry-clean' },
    { id: 'es3', name: 'Dinner Suit', price: 22.99, category: 'suits', type: 'dry-clean' },
    { id: 'es4', name: 'Tie Dry Clean', price: 4.99, category: 'suits', type: 'dry-clean' },

    // Trousers
    { id: 'tr1', name: 'Single Trouser', price: 3.80, category: 'trousers', type: 'dry-clean', fastService: true },
    { id: 'tr2', name: 'Jeans Dry Clean', price: 6.00, category: 'trousers', type: 'dry-clean', ecoFriendly: true },
    { id: 'tr3', name: 'Shorts', price: 4.75, category: 'trousers', type: 'dry-clean' },

    // Bundles
    { id: 'b1', name: '5x Blouse Bundle', price: 28.75, originalPrice: 30.00, category: 'bundles', type: 'bundle', bundle: { quantity: 5, perItemPrice: 5.75 }, popular: true },
    { id: 'b2', name: '10x Dress Bundle', price: 97.50, originalPrice: 105.00, category: 'bundles', type: 'bundle', bundle: { quantity: 10, perItemPrice: 9.75 } },
    { id: 'b3', name: '5x Suit Bundle', price: 58.50, originalPrice: 62.50, category: 'bundles', type: 'bundle', bundle: { quantity: 5, perItemPrice: 11.70 } },
    { id: 'b4', name: '20x Shirt Bundle', price: 90.00, originalPrice: 95.00, category: 'bundles', type: 'bundle', bundle: { quantity: 20, perItemPrice: 4.50 }, popular: true },

    // Alterations
    { id: 'al1', name: 'Trouser Length', price: 14.50, category: 'alterations', type: 'repair', fastService: true },
    { id: 'al2', name: 'Sew On Button', price: 2.99, category: 'alterations', type: 'repair' },
    { id: 'al3', name: 'Skirt Length', price: 17.00, category: 'alterations', type: 'repair' },

    // Shoe Repair
    { id: 'sr1', name: 'Ladies Half Sole', price: 26.00, category: 'shoes', type: 'repair' },
    { id: 'sr2', name: 'Shoe Cleaning', price: 11.00, category: 'shoes', type: 'repair', fastService: true },
    { id: 'sr3', name: 'Ankle Boots Cleaning', price: 25.00, category: 'shoes', type: 'repair' },
  ];

  // Filter services
  const filteredServices = services.filter(service => {
    if (selectedCategory !== 'all' && service.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        service.name.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Cart operations - FIXED
  const addToCart = (item: ServiceItem) => {
    setAddingToCart(item.id);

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });

    // Reset animation after delay
    setTimeout(() => setAddingToCart(null), 300);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Totals - FIXED
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const discount = cart.reduce((sum, item) =>
    sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0), 0);

  // Format price
  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  // Get service icon
  const getServiceIcon = (type?: string) => {
    switch (type) {
      case 'bundle': return Percent;
      case 'dry-clean': return Package;
      case 'wash-iron': return Sparkles;
      case 'pressing': return Zap;
      case 'repair': return Shield;
      default: return Package;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur border-b border-primary-200 dark:border-primary-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary-900 dark:text-white">Rapid 24-Hour Service</h1>
                  <p className="text-xs text-primary-600 dark:text-primary-400">Premium Laundry & Dry Cleaning</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors group"
              >
                <ShoppingCart className="w-6 h-6 text-primary-700 dark:text-primary-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 md:p-8 text-white mb-6 shadow-lg">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Professional Care for Your Garments</h2>
              <p className="text-primary-100 mb-6 text-sm md:text-base">
                24-hour dry cleaning, laundry, and repair services with free pickup and delivery.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>24-Hour Service</span>
                </div>
                <div className="flex items-center text-sm">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search services (e.g., 'dress', 'suit', 'repair')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 w-full rounded-xl border-primary-200 dark:border-primary-800"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar - Mobile */}
          <div className="lg:hidden mb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  }`}
              >
                All
              </button>
              {categories.slice(1).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-primary-900 dark:text-white">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${selectedCategory === cat.id
                          ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                          }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center mr-3`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{cat.label}</span>
                        </div>
                        {cat.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {cat.badge}
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-primary-900 dark:text-white">
                  {selectedCategory === 'all' ? 'All Services' :
                    categories.find(c => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-primary-600 dark:text-primary-400 text-sm">
                  {filteredServices.length} services available
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredServices.map((service) => {
                const ServiceIcon = getServiceIcon(service.type);
                const isInCart = cart.find(item => item.id === service.id);
                const categoryData = categories.find(c => c.id === service.category);

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-primary-800/70 bg-white dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300">

                      {/* Top Badge */}
                      {service.popular && (
                        <div className="absolute top-3 left-3 z-10">
                          <div className="flex items-center gap-1 bg-gradient-to-r from-secondary-500 to-accent-pink text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                            <Star className="w-3 h-3" />
                            Popular
                          </div>
                        </div>
                      )}

                      {/* Service Icon with Category Color */}
                      <div className="p-5 pb-0">
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${categoryData?.color || 'bg-gradient-to-br from-primary-500 to-secondary-600'
                                }`}
                            >
                              <ServiceIcon className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          <div className="flex flex-col items-end">
                            {service.fastService && (
                              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-primary-400">
                                <Clock className="w-3 h-3" />
                                <span>24H Service</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Service Name - BLACK TEXT */}
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                          {service.name}
                        </h3>

                        {/* Description - DARK GRAY TEXT */}
                        {service.description && (
                          <p className="text-sm text-gray-700 dark:text-primary-400 mb-4">
                            {service.description}
                          </p>
                        )}
                      </div>

                      {/* Bundle Section */}
                      {service.bundle && (
                        <div className="mx-5 mb-4 p-3 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg border border-gray-100 dark:border-primary-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                              {service.bundle.quantity}-Item Bundle
                            </span>
                            <Percent className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-primary-400">
                            <span>{formatPrice(service.bundle.perItemPrice)}/item</span>
                            {service.originalPrice && (
                              <span className="text-red-600 dark:text-red-400 font-medium">
                                Save {Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Price and Action Section */}
                      <div className="px-5 pb-5">
                        <div className="flex items-center justify-between">
                          {/* Price */}
                          <div>
                            <div className="flex items-baseline gap-2">
                              {/* Price in Black for light mode */}
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(service.price)}
                              </span>
                              {service.originalPrice && (
                                <span className="text-sm text-gray-500 dark:text-neutral-400 line-through">
                                  {formatPrice(service.originalPrice)}
                                </span>
                              )}
                            </div>
                            {/* Category label in dark gray */}
                            <p className="text-xs text-gray-600 dark:text-primary-400 mt-1">
                              {categoryData?.label}
                            </p>
                          </div>

                          {/* Add to Cart */}
                          <Button
                            onClick={() => addToCart(service)}
                            size="sm"
                            variant={isInCart ? "secondary" : "default"}
                            className={`rounded-lg font-medium px-4 py-2 transition-all duration-300 ${isInCart
                                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-primary-900 dark:text-white dark:hover:bg-primary-800'
                                : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                              }`}
                            disabled={addingToCart === service.id}
                          >
                            {addingToCart === service.id ? (
                              <RotateCcw className="w-4 h-4 animate-spin" />
                            ) : isInCart ? (
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>Added</span>
                              </div>
                            ) : (
                              'Add'
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Eco Badge at Bottom */}
                      {service.ecoFriendly && (
                        <div className="absolute bottom-0 right-0 m-3">
                          <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs shadow-sm">
                            <Leaf className="w-3 h-3" />
                            Eco-Friendly
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">
                  No services found
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-6">
                  Try a different search or browse all categories
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  variant="outline"
                >
                  View All Services
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Cart Sidebar - FIXED */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-neutral-900 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-primary-200 dark:border-primary-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <div>
                      <h2 className="text-xl font-bold text-primary-900 dark:text-white">Shopping Cart</h2>
                      <p className="text-sm text-primary-600 dark:text-primary-400">
                        {cartCount} {cartCount === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg"
                  >
                    <X className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="w-16 h-16 text-primary-400 mb-4" />
                    <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 mb-6 max-w-xs">
                      Add services to your cart and they'll appear here
                    </p>
                    <Button
                      onClick={() => setShowCart(false)}
                    // variant="accent"
                    >
                      Browse Services
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-200 dark:border-primary-800">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-primary-900 dark:text-white">{item.name}</h4>
                            <p className="text-sm text-primary-600 dark:text-primary-400">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-primary-300 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/30"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-medium w-8 text-center text-primary-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-primary-300 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/30"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-lg text-primary-900 dark:text-white">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <p className="text-xs text-primary-600 dark:text-primary-400">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-primary-200 dark:border-primary-800 p-6 space-y-4">
                  <div className="space-y-3">
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-600 dark:text-primary-400">You Save</span>
                        <span className="font-semibold text-accent-green">-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-600 dark:text-primary-400">Subtotal</span>
                      <span className="font-medium">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-600 dark:text-primary-400">Service Fee</span>
                      <span>{formatPrice(2.50)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-600 dark:text-primary-400">Delivery</span>
                      <span className="font-semibold text-accent-green">FREE</span>
                    </div>
                    <div className="border-t border-primary-200 dark:border-primary-800 pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal + 2.5)}</span>
                      </div>
                      <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                        Including VAT
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        alert(`Order placed successfully!\n\nTotal: ${formatPrice(cartTotal + 2.5)}\nItems: ${cartCount}\n\nThank you for choosing LaunderRemedy!`);
                        clearCart();
                        setShowCart(false);
                      }}
                      // variant="accent"
                      className="w-full h-12 text-lg"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="w-full border-primary-300 dark:border-primary-700"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl z-30 flex items-center gap-2"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="font-medium">{cartCount}</span>
        </motion.button>
      )}

      {/* Footer */}
      <footer className="mt-12 bg-gradient-to-r from-primary-900 to-secondary-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-primary-200 mb-6">Schedule a pickup or visit our location</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-white text-primary-900 hover:bg-primary-100">
                Schedule Pickup
              </Button>
              <Button variant="outline" className="bg-gradient-to-r from-primary-900 to-secondary-800 text-white hover:bg-white hover-text-gradient-to-r">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}