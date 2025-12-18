"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Plus, Check, Printer, Grid3x3, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedServicesList,
  setStepByValue,
} from "@/redux/features/orderSlice";
import orderService from "@/services/order.service";
import { useReactToPrint } from "react-to-print";

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
  const handlePrint:any = useReactToPrint({
    content: () => componentRef.current,
  });

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const dispatch = useDispatch();
  const selectedServicesList = useSelector((state: any) => state.order.selectedServicesList);

  const getImageForTitle = (title: string) => {
    switch (title) {
      case "Laundry Services": return img9;
      case "Shirts and Tops Care": return img1;
      case "Elegant Suits Care": return img2;
      case "Trousers Care": return img3;
      case "Outdoor Clothing": return img6;
      case "Alterations": return img10;
      case "Shoe Repair": return img11;
      case "Home Textile Services": return img8;
      case "Ironing Services": return img5;
      case "Dresses and Skirts Care": return img7;
      default: return null;
    }
  };

  useEffect(() => {
    getAllServicesApi();
  }, []);

  const getAllServicesApi = async () => {
    orderService
      .getCategoriesList()
      .then((res) => {
        const modifiedList = res?.data?.map((item: any) => ({
          ...item,
          imageUrl: getImageForTitle(item?.title),
        }));
        setCategories(modifiedList);
        setFilteredCategories(modifiedList);
        setSelectedCategory(modifiedList[0]);
      })
      .catch((err) => {
        console.log(err);
      });
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
        sub.title.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredCategories(filtered);
  };

  const handleSubcategoryClick = (subcategory: any) => {
    dispatch(setStepByValue(3));
    dispatch(setSelectedServicesList({ data: subcategory, type: "+" }));
  };

  const isServiceSelected = (subcategoryId: string) => {
    return selectedServicesList?.some((service: any) => service.id === subcategoryId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
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
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search services by name..."
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

        {/* View Controls */}
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
      <div className={`${viewMode === "grid" ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5' : 'space-y-3'} gap-4`}>
        {filteredCategories.map((category) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`
              flex ${viewMode === "grid" ? 'flex-col items-center' : 'items-center gap-3'} 
              p-4 rounded-2xl transition-all duration-300
              ${selectedCategory?.id === category.id
                ? 'bg-primary-600 shadow-primary-lg text-white'
                : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-md'
              }
            `}
          >
            {category.imageUrl && (
              <div className={`
                ${viewMode === "grid" ? 'p-3 rounded-xl mb-3' : 'p-2 rounded-lg'}
                transition-colors
                ${selectedCategory?.id === category.id
                  ? 'bg-white/20'
                  : 'bg-primary-50 dark:bg-primary-900/20'
                }
              `}>
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  width={viewMode === "grid" ? 40 : 32}
                  height={viewMode === "grid" ? 40 : 32}
                  className="object-contain"
                />
              </div>
            )}
            <span className={`
              ${viewMode === "grid" ? 'text-sm font-medium text-center line-clamp-2' : 'font-medium flex-1 text-left'}
              ${selectedCategory?.id === category.id ? 'text-white' : 'text-neutral-900 dark:text-white'}
            `}>
              {category.title}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Selected Category Services */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {selectedCategory.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Select services from this category
                </p>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm">
                {selectedCategory.subcategories?.length} services available
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {selectedCategory.subcategories?.map((subcategory: any) => {
                const isSelected = isServiceSelected(subcategory.id);
                
                return (
                  <motion.div
                    key={subcategory.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className={`
                      p-4 rounded-xl border transition-all duration-300 cursor-pointer
                      ${isSelected
                        ? 'border-accent-green bg-accent-green/5'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md'
                      }
                    `}
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {subcategory.title}
                          </h4>
                          {isSelected && (
                            <div className="p-1 rounded-full bg-accent-green/20">
                              <Check className="w-3 h-3 text-accent-green" />
                            </div>
                          )}
                        </div>
                        {subcategory.description && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          £{parseFloat(subcategory.price).toFixed(2)}
                        </span>
                        <div className={`
                          p-2 rounded-lg transition-colors
                          ${isSelected
                            ? 'bg-accent-green/20 text-accent-green'
                            : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          }
                        `}>
                          {isSelected ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {subcategory.bundleQuantity && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm">
                        Bundle of {subcategory.bundleQuantity}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Services Summary */}
      {selectedServicesList?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-600/5 border border-primary-200 dark:border-primary-900/30"
        >
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Your Selected Services
          </h3>
          <div className="space-y-3">
            {selectedServicesList.map((service: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700"
              >
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {service.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      £{service.price.toFixed(2)} × {service.quantity}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                      {service.bundleQuantity ? `Bundle: ${service.bundleQuantity}` : 'Individual'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSubcategoryClick(service, "-")}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                    <span className="w-8 text-center font-medium text-neutral-900 dark:text-white">
                      {service.quantity}
                    </span>
                    <button
                      onClick={() => handleSubcategoryClick(service, "+")}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                    £{(service.price * service.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-neutral-900 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  £{selectedServicesList.reduce((total: number, service: any) => 
                    total + (service.price * service.quantity), 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hidden content for printing */}
      <div ref={componentRef as any} className="hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Service Price List</h1>
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
              <div className="space-y-4">
                {category.subcategories?.map((sub: any) => (
                  <div key={sub.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{sub.title}</p>
                      {sub.description && (
                        <p className="text-sm text-gray-600">{sub.description}</p>
                      )}
                    </div>
                    <span className="font-bold">£{parseFloat(sub.price).toFixed(2)}</span>
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