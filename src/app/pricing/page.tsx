"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Search,
  Package,
  Clock,
  Star,
  Truck,
  Shield,
  Sparkles,
  Grid,
  ShoppingBag,
  Percent,
  Zap,
  CheckCircle,
  Leaf,
  RotateCcw,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedServicesList, setStepByValue } from '@/lib/features/orderSlice';
import orderService from '@/services/order.service';

// Import your images
import img1 from "../../../public/men-shirt-icon.png";
import img2 from "../../../public/mens-suit-icon.png";
import img3 from "../../../public/jeans-pants-icon.png";
import img5 from "../../../public/iron-icon.png";
import img6 from "../../../public/hoodie-jacket-icon.png";
import img7 from "../../../public/girl-dress-icon.png";
import img8 from "../../../public/double-bed-icon.png";
import img9 from "../../../public/clothes-washing-icon.png";
import img10 from "../../../public/alteration.png";
import img11 from "../../../public/boots.png";
import { useRouter } from 'next/navigation';

// Types
interface Subcategory {
  _id: string;
  title: string;
  description: string;
  price: string | number;
  quantity: number;
  prepaidTotalItems?: string;
  perItemPrice?: string;
  bundleQuantity?: number;
}

interface Category {
  _id: string;
  title: string;
  imageUrl: string;
  customImageUrl?: any;
  subcategories: Subcategory[];
}

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
  type?: 'dry-clean' | 'wash-iron' | 'pressing' | 'repair' | 'bundle' | 'laundry' | 'home-textile';
  popular?: boolean;
  fastService?: boolean;
  ecoFriendly?: boolean;
  _id?: string;
  prepaidTotalItems?: string;
  perItemPrice?: string;
  bundleQuantity?: number;
  categoryTitle?: string;
}

interface CartItem extends ServiceItem {
  quantity: number;
}

// Categories data (for UI display)
const categories = [
  { id: 'all', label: 'All Services', icon: Grid, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
  { id: 'Laundry Services', label: 'Laundry Services', icon: Grid, color: 'bg-gradient-to-r from-primary-600 to-secondary-500' },
  { id: 'Shirts and Tops Care', label: 'Shirts & Tops', icon: ShoppingBag, color: 'bg-gradient-to-r from-accent-teal to-blue-500' },
  { id: 'Elegant Suits Care', label: 'Elegant Suits', icon: ShoppingBag, color: 'bg-gradient-to-r from-primary-700 to-primary-800' },
  { id: 'Dresses and Skirts Care', label: 'Dresses & Skirts', icon: ShoppingBag, color: 'bg-gradient-to-r from-accent-pink to-purple-500' },
  { id: 'Trousers Care', label: 'Trousers', icon: Grid, color: 'bg-gradient-to-r from-accent-green to-emerald-500' },
  { id: 'Outdoor Clothing', label: 'Outdoor Wear', icon: Grid, color: 'bg-gradient-to-r from-accent-yellow to-amber-500' },
  { id: 'Home Textile Services', label: 'Home Textiles', icon: Grid, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
  { id: 'Ironing Services', label: 'Ironing', icon: Zap, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
  { id: 'Alterations', label: 'Alterations', icon: RotateCcw, color: 'bg-gradient-to-r from-accent-yellow to-amber-500' },
  { id: 'Shoe Repair', label: 'Shoe Repair', icon: Shield, color: 'bg-gradient-to-r from-neutral-700 to-neutral-800' },
];

const getImageForTitle = (title: string) => {
  const imageMap: Record<string, any> = {
    "Laundry Services": img9,
    "Shirts and Tops Care": img1,
    "Elegant Suits Care": img2,
    "Trousers Care": img3,
    "Outdoor Clothing": img6,
    "Alterations": img10,
    "Shoe Repair": img11,
    "Home Textile Services": img8,
    "Ironing Services": img5,
    "Dresses and Skirts Care": img7,
  };
  return imageMap[title] || img9; // Default image
};

const getServiceType = (title: string, category: string): ServiceItem['type'] => {
  const titleLower = title.toLowerCase();

  if (titleLower.includes('bundle') || titleLower.includes('prepaid')) {
    return 'bundle';
  }

  if (titleLower.includes('dry clean') || titleLower.includes('dryclean')) {
    return 'dry-clean';
  }

  if (titleLower.includes('wash') || titleLower.includes('fold')) {
    return 'wash-iron';
  }

  if (titleLower.includes('iron') || titleLower.includes('pressing')) {
    return 'pressing';
  }

  if (titleLower.includes('repair') || titleLower.includes('alteration') ||
    titleLower.includes('sew') || titleLower.includes('zip')) {
    return 'repair';
  }

  if (category.includes('Home Textile') || category.includes('Laundry')) {
    return category.includes('Laundry') ? 'laundry' : 'home-textile';
  }

  return 'dry-clean'; // Default
};

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCart, setShowCart] = useState<boolean>(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.order.selectedServicesList || []);
  // Load data from API
  useEffect(() => {
    getAllServicesApi();
  }, []);

  const getAllServicesApi = async () => {
    setLoading(true);
    try {
      const response = await orderService.getCategoriesList();

      if (response?.data) {
        const modifiedList = response.data.map((item: Category) => ({
          ...item,
          customImageUrl: getImageForTitle(item.title),
        }));

        setCategoriesList(modifiedList);

        // Transform API data to ServiceItem format
        const transformedServices: ServiceItem[] = [];
        modifiedList.forEach((category: Category) => {
          category.subcategories.forEach((subcategory) => {
            // Determine if this is a popular item
            const isPopular =
              subcategory.title.toLowerCase().includes('bundle') ||
              subcategory.title.toLowerCase().includes('prepaid') ||
              parseFloat(subcategory.price.toString()) < 10;

            // Determine if this is fast service
            const isFastService =
              !subcategory.title.toLowerCase().includes('feather') &&
              !subcategory.title.toLowerCase().includes('72 hours');

            // Determine if eco-friendly
            const isEcoFriendly =
              subcategory.title.toLowerCase().includes('wash') ||
              subcategory.title.toLowerCase().includes('clean') &&
              !subcategory.title.toLowerCase().includes('dry clean');

            const serviceItem: ServiceItem = {
              id: subcategory._id,
              _id: subcategory._id,
              name: subcategory.title,
              description: subcategory.description,
              price: typeof subcategory.price === 'string' ? parseFloat(subcategory.price) : subcategory.price,
              category: category.title,
              categoryTitle: category.title,
              type: getServiceType(subcategory.title, category.title),
              popular: isPopular,
              fastService: isFastService,
              ecoFriendly: isEcoFriendly,
              bundle: subcategory.prepaidTotalItems ? {
                quantity: parseInt(subcategory.prepaidTotalItems),
                perItemPrice: subcategory.perItemPrice ? parseFloat(subcategory.perItemPrice) : 0
              } : undefined,
              prepaidTotalItems: subcategory.prepaidTotalItems,
              perItemPrice: subcategory.perItemPrice,
              bundleQuantity: subcategory.bundleQuantity
            };

            transformedServices.push(serviceItem);
          });
        });

        setServices(transformedServices);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding/removing items from cart using Redux dispatch
  const handleAddToCart = (service: ServiceItem, operation: "+" | "-" = "+") => {
    setAddingToCart(service.id);

    const serviceData = {
      ...service,
      id: service._id || service.id,
      quantity: operation === "+" ? 1 : 0,
      price: service.price,
      categoryTitle: service.category
    };

    dispatch(setSelectedServicesList({
      data: serviceData,
      type: operation
    }));

    // Reset animation after delay
    setTimeout(() => setAddingToCart(null), 300);
  };

  // Check if service is in cart
  const isServiceSelected = (serviceId: string) => {
    return cart?.some((item: any) => item._id === serviceId);
  };

  // Get quantity of service in cart
  const getSelectedServiceQuantity = (serviceId: string) => {
    const service = cart?.find((item: any) => item._id === serviceId);
    return service?.quantity || 0;
  };


  // In PricingPage, update the updateCartQuantity function:
  const updateCartQuantity = (serviceId: string, newQuantity: number) => {
    const service = services.find(s => s._id === serviceId || s.id === serviceId);
    if (service) {

      const serviceData = {
        ...service,
        id: service._id || service.id,
        quantity: newQuantity,
        price: service.price,
        categoryTitle: service.category
      };

      dispatch(setSelectedServicesList({
        data: serviceData,
        type: newQuantity > 0 ? "+" : "-"
      }));
    }
  };

  // And update the removeFromCart function:
  const removeFromCart = (serviceId: string) => {
    const service = services.find(s => s._id === serviceId || s.id === serviceId);
    if (service) {
      const serviceData = {
        ...service,
        id: service._id || service.id,
        quantity: 0,
        price: service.price,
        categoryTitle: service.category
      };

      dispatch(setSelectedServicesList({
        data: serviceData,
        type: "-"
      }));
    }
  };

  // Clear cart
  const clearCart = () => {
    // Remove all items from cart
    cart.forEach((item: any) => {
      const service = services.find(s => s._id === item._id);
      if (service) {
        handleAddToCart(service, "-");
      }
    });
  };

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

  // Totals
  const cartTotal = cart.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0);
  const cartCount = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

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
      case 'laundry': return Grid;
      case 'home-textile': return Grid;
      default: return Package;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="text-center">
          <RotateCcw className="w-8 h-8 mx-auto text-primary-600 animate-spin mb-4" />
          <p className="text-primary-700">Loading services...</p>
        </div>
      </div>
    );
  }

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
                        {cat.id !== 'all' && services.filter(s => s.category === cat.id).length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {services.filter(s => s.category === cat.id).length}
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
                const isSelected = isServiceSelected(service._id || service.id);
                const selectedQuantity = getSelectedServiceQuantity(service._id || service.id);
                const categoryData = categories.find(c => c.id === service.category);

                return (
                  <motion.div
                    key={service._id || service.id}
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
                            {isSelected && (
                              <div className="flex items-center gap-1 mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                  {selectedQuantity} added
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Service Name */}
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                          {service.name}
                        </h3>

                        {/* Description */}
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
                            {service.perItemPrice && service.price && (
                              <span className="text-red-600 dark:text-red-400 font-medium">
                                Save {Math.round(((service.bundle.quantity * service.bundle.perItemPrice - service.price) / (service.bundle.quantity * service.bundle.perItemPrice)) * 100)}%
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
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(service.price)}
                              </span>
                              {service.bundle && service.perItemPrice && (
                                <span className="text-sm text-gray-500 dark:text-neutral-400">
                                  {formatPrice(parseFloat(service.perItemPrice))}/item
                                </span>
                              )}
                            </div>
                            {/* Category label */}
                            <p className="text-xs text-gray-600 dark:text-primary-400 mt-1">
                              {categoryData?.label}
                            </p>
                          </div>

                          {/* Add to Cart */}
                          <Button
                            onClick={() => handleAddToCart(service, isSelected ? "-" : "+")}
                            size="sm"
                            variant={isSelected ? "secondary" : "default"}
                            className={`rounded-lg font-medium px-4 py-2 transition-all duration-300 ${isSelected
                              ? 'bg-green-100 text-green-900 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40'
                              : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white'
                              }`}
                            disabled={addingToCart === service.id}
                          >
                            {addingToCart === service.id ? (
                              <RotateCcw className="w-4 h-4 animate-spin" />
                            ) : isSelected ? (
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
            {filteredServices.length === 0 && !loading && (
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

      {/* Cart Sidebar */}
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
                    >
                      Browse Services
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item: any) => (
                      <div key={item._id} className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-200 dark:border-primary-800">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-primary-900 dark:text-white">{item.title || item.name}</h4>
                            <p className="text-sm text-primary-600 dark:text-primary-400">{item.categoryTitle || item.category}</p>
                          </div>
                          <button
                            type='button'
                            onClick={() => removeFromCart(item._id)}
                            className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateCartQuantity(item._id, (item.quantity || 1) - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-primary-300 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/30"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-medium w-8 text-center text-primary-900 dark:text-white">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item._id, (item.quantity || 1) + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-primary-300 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/30"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-lg text-primary-900 dark:text-white">
                              {formatPrice(item.price * (item.quantity || 1))}
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
                        // dispatch(setStepByValue(4));
                        router.push('/place-order')
                        setShowCart(false);
                      }}
                      className="w-full h-12 text-lg bg-gradient-to-r from-primary-600 to-secondary-600"
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
              <Button variant="outline" className="bg-gradient-to-r from-primary-900 to-secondary-800 text-white hover:bg-white hover:text-primary-900">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}