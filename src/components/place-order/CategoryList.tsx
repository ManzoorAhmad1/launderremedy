"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus, Check, Printer, Grid3x3, List, ChevronRight, Tag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedServicesList,
  setStepByValue,
} from "@/lib/features/orderSlice";
import orderService from "@/services/order.service";
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

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const selectedServicesList = useSelector((state: any) => state.order.selectedServicesList);

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

  // Fetch categories from API
  useEffect(() => {
    getAllServicesApi();
  }, []);

  const getAllServicesApi = async () => {
    setLoading(true);
    try {
      const response = await orderService.getCategoriesList();
      if (response?.data) {
        const modifiedList = response.data.map((item: any) => ({
          ...item,
          customImageUrl: getImageForTitle(item?.title),
        }));
        setCategories(modifiedList);
        setFilteredCategories(modifiedList);
        setSelectedCategory(modifiedList[0]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
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

  const isServiceSelected = (subcategoryId: string) => {
    return selectedServicesList?.some((service: any) => service._id === subcategoryId);
  };

  const getSelectedServiceQuantity = (subcategoryId: string) => {
    const service = selectedServicesList?.find((service: any) => service._id === subcategoryId);
    return service?.quantity || 0;
  };

  const getTotalPrice = () => {
    return selectedServicesList.reduce((total: number, service: any) => {
      return total + (service.price * service.quantity);
    }, 0);
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
      className="space-y-8 p-4 md:p-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-4">
          <Grid3x3 className="w-4 h-4 mr-2" />
          STEP 3: CHOOSE SERVICES
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
          Choose Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Select from our professional cleaning and laundry services. Click on a category to view available services.
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search services by name or description..."
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchValue && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            )}
          </div>
          {searchValue && (
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Found {filteredCategories.length} categories matching "{searchValue}"
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${viewMode === "grid" ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-neutral-800 text-neutral-400'}`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${viewMode === "list" ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-neutral-800 text-neutral-400'}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">No services available at the moment.</p>
        </div>
      ) : (
        <>
          <div className={`${viewMode === "grid" ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5' : 'space-y-3'} gap-4`}>
            {filteredCategories.map((category) => (
              <motion.button
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`
                  flex ${viewMode === "grid" ? 'flex-col items-center' : 'items-center gap-3'} 
                  p-4 rounded-2xl transition-all duration-300 border-2
                  ${selectedCategory?._id === category._id
                    ? 'border-primary-600 bg-primary-600 shadow-primary-lg text-white'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md hover:border-primary-400'
                  }
                `}
              >
                {category.customImageUrl && (
                  <div className={`
                    ${viewMode === "grid" ? 'p-3 rounded-xl mb-3' : 'p-2 rounded-lg'}
                    transition-colors
                    ${selectedCategory?._id === category._id
                      ? 'bg-white/20'
                      : 'bg-primary-50 dark:bg-primary-900/20'
                    }
                  `}>
                    <Image
                      src={category.customImageUrl}
                      alt={category.title}
                      width={viewMode === "grid" ? 40 : 32}
                      height={viewMode === "grid" ? 40 : 32}
                      className="object-contain"
                    />
                  </div>
                )}
                <span className={`
                  ${viewMode === "grid" ? 'text-sm font-medium text-center line-clamp-2' : 'font-medium flex-1 text-left'}
                  ${selectedCategory?._id === category._id ? 'text-white' : 'text-neutral-900 dark:text-white'}
                `}>
                  {category.title}
                </span>
                {viewMode === "list" && (
                  <ChevronRight className={`w-4 h-4 ${selectedCategory?._id === category._id ? 'text-white' : 'text-neutral-400'}`} />
                )}
              </motion.button>
            ))}
          </div>

          {/* Selected Category Services */}
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                key={selectedCategory._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-12"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${selectedCategory.customImageUrl ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                      {selectedCategory.customImageUrl && (
                        <Image
                          src={selectedCategory.customImageUrl}
                          alt={selectedCategory.title}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        {selectedCategory.title}
                        <span className="text-sm font-normal text-primary-600 dark:text-primary-400">
                          ({selectedCategory.subcategories?.length || 0} services)
                        </span>
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                        Browse and select from available services in this category
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                      className="px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm font-medium"
                    >
                      Add All
                    </button>
                  </div>
                </div>

                {selectedCategory.subcategories?.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl">
                    <p className="text-neutral-600 dark:text-neutral-400">No services available in this category.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedCategory.subcategories?.map((subcategory: any) => {
                      const isSelected = isServiceSelected(subcategory._id);
                      const quantity = getSelectedServiceQuantity(subcategory._id);

                      return (
                        <motion.div
                          key={subcategory._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -5 }}
                          className={`
                            p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                            ${isSelected
                              ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-xl hover:border-primary-300'
                            }
                          `}
                          onClick={() => handleSubcategoryClick(subcategory)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h4 className="font-bold text-lg text-neutral-900 dark:text-white">
                                  {subcategory.title}
                                </h4>
                                {isSelected && (
                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                                      <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                      {quantity} selected
                                    </span>
                                  </div>
                                )}
                              </div>
                              {subcategory.description && (
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                                  {subcategory.description}
                                </p>
                              )}
                              
                              {/* Badges */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {subcategory.bundleQuantity && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium">
                                    <Tag className="w-3 h-3" />
                                    Bundle: {subcategory.bundleQuantity} items
                                  </span>
                                )}
                                {subcategory.prepaidTotalItems && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium">
                                    <Tag className="w-3 h-3" />
                                    Prepaid: {subcategory.prepaidTotalItems}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-end ml-4">
                              <div className="text-right mb-2">
                                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                  £{parseFloat(subcategory.price).toFixed(2)}
                                </span>
                                {subcategory.perItemPrice && (
                                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                    £{parseFloat(subcategory.perItemPrice).toFixed(2)} per item
                                  </p>
                                )}
                              </div>
                              <div className={`
                                p-3 rounded-xl transition-colors
                                ${isSelected
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                  : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                                }
                              `}>
                                {isSelected ? (
                                  <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5" />
                                    <span className="text-sm font-medium">Added</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    <span className="text-sm font-medium">Add</span>
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

          {/* Selected Services Summary */}
          {selectedServicesList?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary-500/5 via-secondary-600/5 to-primary-500/5 border border-primary-200 dark:border-primary-900/30 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                      <Check className="w-6 h-6" />
                    </span>
                    Your Selected Services
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                    Review and manage your selected services
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    £{getTotalPrice().toFixed(2)}
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Total for {selectedServicesList.length} items
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {selectedServicesList.map((service: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {service.title}
                        </h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">
                          {service.categoryTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                        <span>£{service.price.toFixed(2)} × {service.quantity}</span>
                        {service.bundleQuantity && (
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Bundle: {service.bundleQuantity}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (service.quantity > 1) {
                              handleSubcategoryClick(service, "-");
                            }
                          }}
                          disabled={service.quantity <= 1}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                            service.quantity > 1 
                              ? 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600' 
                              : 'bg-neutral-50 dark:bg-neutral-800 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="w-12 text-center font-bold text-lg text-neutral-900 dark:text-white">
                            {service.quantity}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            items
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubcategoryClick(service, "+");
                          }}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-primary-600 dark:text-primary-400">
                          £{(service.price * service.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubcategoryClick(service, "-");
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

              <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-neutral-900 dark:text-white">
                      Ready to proceed?
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      Review your selections before continuing
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(setStepByValue(4))}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Proceed to Checkout
                  </button>
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