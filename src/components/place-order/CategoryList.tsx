"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus, Check, Printer, Grid3x3, List, ChevronRight, Tag, Menu, ShoppingCart, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  setSelectedServicesList,
  setStepByValue,
  setSelectedServicesListFull,
  clearData
} from "@/lib/features/orderSlice";
import { serviceApi } from "@/api";
import { useReactToPrint, UseReactToPrintOptions } from "react-to-print";

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

const CategoryList = ({ state, setState }: any) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  } as UseReactToPrintOptions);
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const selectedServicesList = useSelector((state: any) => state.order.selectedServicesList || []);
  
  // Map title to image
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
    return imageMap[title] || null;
  };

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Fetch categories from API
  useEffect(() => {
    getAllServicesApi();
  }, []);

  // Sync cart state when component mounts
  useEffect(() => {
    if (isMounted) {
      
      // If coming back from checkout/pricing page, ensure cart is preserved
      if (selectedServicesList.length > 0) {
        
        // Clean up the cart data - ensure all items have proper structure
        const cleanedItems = selectedServicesList.map((item: any) => ({
          ...item,
          quantity: item.quantity || 1,
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
          categoryTitle: item.categoryTitle || item.category || 'Unknown Category'
        }));
        
        // Only update if there are changes needed
        const needsUpdate = cleanedItems.some((item: any, index: number) => {
          const original = selectedServicesList[index];
          return item.quantity !== original.quantity || 
                 item.price !== original.price ||
                 item.categoryTitle !== original.categoryTitle;
        });
        
        if (needsUpdate) {
          // dispatch(setSelectedServicesListFull(cleanedItems));
        }
      }
    }
  }, [isMounted, dispatch]);

  const getAllServicesApi = async () => {
    setLoading(true);
    try {
      const response = await serviceApi.getAllServices();
      if (response?.data && Array.isArray(response.data)) {
        const modifiedList = response.data.map((item: any) => ({
          ...item,
          customImageUrl: getImageForTitle(item?.title),
        }));
        setCategories(modifiedList);
        setFilteredCategories(modifiedList);
        if (modifiedList.length > 0) {
          setSelectedCategory(modifiedList[0]);
        }
      }
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      // toast.error(err?.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const searchTerm = value.toLowerCase();
    const filtered = categories.filter(category =>
      category.title.toLowerCase().includes(searchTerm) ||
      category.subcategories?.some((sub: any) =>
        sub.title.toLowerCase().includes(searchTerm) ||
        sub.description?.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredCategories(filtered);
  };

  const handleSubcategoryClick = (subcategory: any, operation = "+") => {
    dispatch(setStepByValue(3));
    
    const serviceData = {
      ...subcategory,
      id: subcategory._id,
      quantity: operation === "+" ? 1 : 0,
      price: parseFloat(subcategory.price),
      categoryTitle: selectedCategory?.title
    };
    
    dispatch(setSelectedServicesList({ 
      data: serviceData, 
      type: operation 
    }));
  };

  // Handle quantity updates directly
  const handleQuantityUpdate = (service: any, newQuantity: number) => {
    
    const serviceData = {
      ...service,
      id: service._id,
      quantity: newQuantity,
      price: parseFloat(service.price),
      categoryTitle: service.categoryTitle || selectedCategory?.title
    };
    
    dispatch(setSelectedServicesList({ 
      data: serviceData, 
      type: newQuantity > 0 ? "+" : "-" 
    }));
  };

  const isServiceSelected = (subcategoryId: string) => {
    return selectedServicesList?.some((service: any) => service._id === subcategoryId);
  };

  const getSelectedServiceQuantity = (subcategoryId: string) => {
    const service = selectedServicesList?.find((service: any) => service._id === subcategoryId);
    return service?.quantity || 0;
  };

  const getTotalPrice = () => {
    return selectedServicesList.reduce((total: number, service: any) => {
      const price = typeof service.price === 'string' ? parseFloat(service.price) : service.price;
      const quantity = service.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const getTotalItemsCount = () => {
    return selectedServicesList.reduce((total: number, service: any) => {
      return total + (service.quantity || 1);
    }, 0);
  };

  // Clear cart completely
  const handleClearCart = () => {
    dispatch(setSelectedServicesListFull([]));
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 md:space-y-8 p-2 sm:p-4 md:p-6"
    >
      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-4 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ShoppingCart className="w-6 h-6" />
          {selectedServicesList.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {getTotalItemsCount()}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      Your Cart ({getTotalItemsCount()})
                    </h3>
                  </div>
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    £{getTotalPrice().toFixed(2)}
                  </div>
                </div>

                {selectedServicesList.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                    <p className="text-neutral-600 dark:text-neutral-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedServicesList.map((service: any, index: number) => (
                      <div
                        key={`${service._id}-${index}`}
                        className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                              {service.title}
                            </h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                              {service.categoryTitle}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityUpdate(service, (service.quantity || 1) - 1)}
                                  disabled={(service.quantity || 1) <= 1}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 disabled:opacity-50"
                                >
                                  <Plus className="w-3 h-3 rotate-45" />
                                </button>
                                <span className="font-medium w-8 text-center">
                                  {service.quantity || 1}
                                </span>
                                <button
                                  onClick={() => handleQuantityUpdate(service, (service.quantity || 1) + 1)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-primary-600 dark:text-primary-400">
                                  £{((typeof service.price === 'string' ? parseFloat(service.price) : service.price) * (service.quantity || 1)).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleQuantityUpdate(service, 0)}
                            className="ml-3 p-1 text-red-500 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedServicesList.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        £{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        dispatch(setStepByValue(4));
                        router.push('/place-order');
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-lg transition-all"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="w-full py-3 mt-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header - Adjusted for mobile */}
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-xs md:text-sm font-medium mb-3 md:mb-4">
          <Grid3x3 className="w-3 h-3 md:w-4 md:h-4 mr-2" />
          STEP 3: CHOOSE SERVICES
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 md:mb-3">
          Choose Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4">
          Select from our professional cleaning and laundry services.
        </p>
      </div>

      {/* Search and Controls - Stacked on mobile */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-neutral-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2.5 md:py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
            />
            {searchValue && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <X className="w-3 h-3 md:w-4 md:h-4 text-neutral-400" />
              </button>
            )}
          </div>
          {searchValue && (
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
              Found {filteredCategories.length} categories
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* View toggle buttons - hidden on small screens, grid only */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-neutral-800 text-neutral-400'}`}
            >
              <Grid3x3 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-neutral-800 text-neutral-400'}`}
            >
              <List className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm"
          >
            <Printer className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Categories Grid/List - Responsive */}
      {categories.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <p className="text-neutral-600 dark:text-neutral-400">No services available at the moment.</p>
        </div>
      ) : (
        <>
          <div className={`${viewMode === "grid" ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'space-y-2 md:space-y-3'} gap-2 md:gap-4`}>
            {filteredCategories.map((category) => (
              <motion.button
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category)}
                className={`
                  flex ${viewMode === "grid" ? 'flex-col items-center' : 'items-center gap-2 md:gap-3'} 
                  p-2 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 border
                  ${selectedCategory?._id === category._id
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-400'
                  }
                  ${viewMode === "grid" ? 'h-full' : ''}
                `}
              >
                {category.customImageUrl && (
                  <div className={`
                    ${viewMode === "grid" ? 'p-1.5 md:p-3 rounded-lg md:rounded-xl mb-1.5 md:mb-3' : 'p-1 md:p-2 rounded-md md:rounded-lg'}
                    transition-colors
                    ${selectedCategory?._id === category._id
                      ? 'bg-white/20'
                      : 'bg-primary-50 dark:bg-primary-900/20'
                    }
                  `}>
                    <Image
                      src={category.customImageUrl}
                      alt={category.title}
                      width={viewMode === "grid" ? 24 : 20}
                      height={viewMode === "grid" ? 24 : 20}
                      className="object-contain md:w-6 md:h-6 lg:w-8 lg:h-8"
                    />
                  </div>
                )}
                <span className={`
                  ${viewMode === "grid" ? 'text-xs md:text-sm font-medium text-center line-clamp-2' : 'font-medium flex-1 text-left text-sm md:text-base'}
                  ${selectedCategory?._id === category._id ? 'text-white' : 'text-neutral-900 dark:text-white'}
                `}>
                  {category.title}
                </span>
                {viewMode === "list" && (
                  <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 ${selectedCategory?._id === category._id ? 'text-white' : 'text-neutral-400'}`} />
                )}
              </motion.button>
            ))}
          </div>

          {/* Selected Category Services - Improved mobile layout */}
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                key={selectedCategory._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 md:mt-12"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-8 gap-3">
                  <div className="flex items-start sm:items-center gap-2 md:gap-4">
                    <div className={`p-1.5 md:p-3 rounded-lg md:rounded-xl ${selectedCategory.customImageUrl ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                      {selectedCategory.customImageUrl && (
                        <Image
                          src={selectedCategory.customImageUrl}
                          alt={selectedCategory.title}
                          width={36}
                          height={36}
                          className="object-contain w-6 h-6 md:w-9 md:h-9"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-1 md:gap-2">
                        {selectedCategory.title}
                        <span className="text-xs md:text-sm font-normal text-primary-600 dark:text-primary-400">
                          ({selectedCategory.subcategories?.length || 0})
                        </span>
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                        Available services in this category
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const allServices = selectedCategory.subcategories?.map((sub: any) => ({
                        ...sub,
                        id: sub._id,
                        quantity: 1,
                        price: parseFloat(sub.price),
                        categoryTitle: selectedCategory.title
                      }));
                      allServices?.forEach((service: any) => {
                        dispatch(setSelectedServicesList({ 
                          data: service, 
                          type: "+" 
                        }));
                      });
                    }}
                    className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    Add All
                  </button>
                </div>

                {selectedCategory.subcategories?.length === 0 ? (
                  <div className="text-center py-8 md:py-12 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl md:rounded-2xl">
                    <p className="text-neutral-600 dark:text-neutral-400">No services available in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
                    {selectedCategory.subcategories?.map((subcategory: any) => {
                      const isSelected = isServiceSelected(subcategory._id);
                      const quantity = getSelectedServiceQuantity(subcategory._id);

                      return (
                        <motion.div
                          key={subcategory._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -2 }}
                          className={`
                            p-3 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300 cursor-pointer
                            ${isSelected
                              ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300'
                            }
                          `}
                          onClick={() => handleSubcategoryClick(subcategory, isSelected ? "-" : "+")}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-2">
                                <h4 className="font-bold text-sm md:text-lg text-neutral-900 dark:text-white truncate">
                                  {subcategory.title}
                                </h4>
                                {isSelected && (
                                  <div className="flex-shrink-0 flex items-center gap-1">
                                    <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30">
                                      <Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">
                                      {quantity}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {subcategory.description && (
                                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-2 line-clamp-2">
                                  {subcategory.description}
                                </p>
                              )}
                              
                              {/* Badges */}
                              <div className="flex flex-wrap gap-1 mt-2">
                                {subcategory.bundleQuantity && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs">
                                    <Tag className="w-2 h-2" />
                                    {subcategory.bundleQuantity}
                                  </span>
                                )}
                                {subcategory.prepaidTotalItems && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs">
                                    <Tag className="w-2 h-2" />
                                    {subcategory.prepaidTotalItems}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-end ml-2 flex-shrink-0">
                              <div className="text-right mb-1 md:mb-2">
                                <span className="text-lg md:text-2xl font-bold text-primary-600 dark:text-primary-400">
                                  £{parseFloat(subcategory.price).toFixed(2)}
                                </span>
                                {subcategory.perItemPrice && (
                                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    £{parseFloat(subcategory.perItemPrice).toFixed(2)} ea
                                  </p>
                                )}
                              </div>
                              <div className={`
                                p-1.5 md:p-3 rounded-lg md:rounded-xl transition-colors
                                ${isSelected
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                  : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                }
                              `}>
                                {isSelected ? (
                                  <div className="flex items-center gap-1 md:gap-2">
                                    <Check className="w-3 h-3 md:w-5 md:h-5" />
                                    <span className="text-xs md:text-sm font-medium hidden sm:inline">Added</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 md:gap-2">
                                    <Plus className="w-3 h-3 md:w-5 md:h-5" />
                                    <span className="text-xs md:text-sm font-medium hidden sm:inline">Add</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Services Summary - Hidden on mobile, shown on desktop */}
          {selectedServicesList?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:block mt-12 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-primary-500/5 via-secondary-600/5 to-primary-500/5 border border-primary-200 dark:border-primary-900/30 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                      <Check className="w-5 h-5 md:w-6 md:h-6" />
                    </span>
                    Your Selected Services ({getTotalItemsCount()} items)
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-2">
                    Review and manage your selected services
                  </p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                    £{getTotalPrice().toFixed(2)}
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Total for {selectedServicesList.length} services
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {selectedServicesList.map((service: any, index: number) => (
                  <motion.div
                    key={`${service._id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700"
                  >
                    <div className="flex-1 mb-3 sm:mb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">
                          {service.title}
                        </h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">
                          {service.categoryTitle || service.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                        <span>£{(typeof service.price === 'string' ? parseFloat(service.price) : service.price).toFixed(2)} × {service.quantity || 1}</span>
                        {service.bundleQuantity && (
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Bundle: {service.bundleQuantity}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityUpdate(service, (service.quantity || 1) - 1);
                          }}
                          disabled={(service.quantity || 1) <= 1}
                          className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg transition-colors ${
                            (service.quantity || 1) > 1 
                              ? 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600' 
                              : 'bg-neutral-50 dark:bg-neutral-800 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4 rotate-45" />
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="w-8 md:w-12 text-center font-bold text-base md:text-lg text-neutral-900 dark:text-white">
                            {service.quantity || 1}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                            items
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityUpdate(service, (service.quantity || 1) + 1);
                          }}
                          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg md:text-xl text-primary-600 dark:text-primary-400">
                          £{((typeof service.price === 'string' ? parseFloat(service.price) : service.price) * (service.quantity || 1)).toFixed(2)}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityUpdate(service, 0);
                          }}
                          className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 md:pt-6 mt-4 md:mt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-base md:text-lg font-medium text-neutral-900 dark:text-white">
                      Ready to proceed?
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      Review your selections before continuing
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClearCart}
                      className="px-4 md:px-6 py-2 md:py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm md:text-base"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        if (selectedServicesList.length > 0) {
                          dispatch(setStepByValue(4));
                          router.push('/place-order');
                        }
                      }}
                      className="px-6 md:px-8 py-2 md:py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 text-sm md:text-base"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Hidden content for printing */}
      <div ref={componentRef} className="hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">Service Price List</h1>
          <p className="text-neutral-600 mb-6">Generated on {new Date().toLocaleDateString()}</p>
          
          {categories.map((category) => (
            <div key={category._id} className="mb-8 page-break">
              <h2 className="text-2xl font-bold mb-4 text-primary-600 border-b pb-2">{category.title}</h2>
              <div className="space-y-3">
                {category.subcategories?.map((sub: any) => (
                  <div key={sub._id} className="flex justify-between items-center py-3 border-b">
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{sub.title}</p>
                      {sub.description && (
                        <p className="text-sm text-gray-600 mt-1">{sub.description}</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        {sub.bundleQuantity && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            Bundle: {sub.bundleQuantity}
                          </span>
                        )}
                        {sub.prepaidTotalItems && (
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                            Prepaid: {sub.prepaidTotalItems}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-xl ml-4">£{parseFloat(sub.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryList;