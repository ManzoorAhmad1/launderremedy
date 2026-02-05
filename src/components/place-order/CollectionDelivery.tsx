"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Calendar, 
  Truck, 
  Package, 
  RefreshCw,
  Info,
  AlertCircle,
  Bell,
  Shield,
  ChevronRight
} from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CollectionTime from "./CollectionTime";
import DeliveryTime from "./DeliveryTime";

interface CollectionDeliveryProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

// Define types for form state
interface FormState {
  collectionDay: any;
  collectionTime: any;
  collectionInstruction: string;
  deliveryDay: any;
  deliveryTime: any;
  deliveryInstruction: string;
  frequency: string;
  specialInstructions: string;
}

const CollectionDelivery: React.FC<CollectionDeliveryProps> = ({ state, setState }) => {
  const [formState, setFormState] = useState<FormState>({
    collectionDay: null,
    collectionTime: null,
    collectionInstruction: "",
    deliveryDay: null,
    deliveryTime: null,
    deliveryInstruction: "",
    frequency: "Just Once",
    specialInstructions: ""
  });

  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const [isFormValid, setIsFormValid] = useState(false);

  // Get Redux state
  const collection = useSelector((state: any) => state.order.collection);
  const collection_day = useSelector((state: any) => state.order.collection_day);
  const delivery = useSelector((state: any) => state.order.delivery);
  const delivery_day = useSelector((state: any) => state.order.delivery_day);
  const isCollectionLoading = useSelector((state: any) => state.order.isCollectionLoading);
  const isDeliveryLoading = useSelector((state: any) => state.order.isDeliveryLoading);

  // Restore saved collection/delivery data from localStorage on mount
  useEffect(() => {
    const savedOrderData = localStorage.getItem('order_in_progress');
    if (savedOrderData) {
      try {
        const parsedData = JSON.parse(savedOrderData);
        if (parsedData.orderDetail) {
          // Restore collection/delivery selections if they exist
          if (parsedData.orderDetail.collection_day) {
            setFormState(prev => ({
              ...prev,
              collectionDay: { label: parsedData.orderDetail.collection_day, value: parsedData.orderDetail.collection_day, original: parsedData.orderDetail.collection_day },
              collectionTime: parsedData.orderDetail.collection_time ? { label: parsedData.orderDetail.collection_time, value: parsedData.orderDetail.collection_time, original: parsedData.orderDetail.collection_time } : null,
              collectionInstruction: parsedData.orderDetail.collection_instruction || ""
            }));
          }
          if (parsedData.orderDetail.delivery_day) {
            setFormState(prev => ({
              ...prev,
              deliveryDay: { label: parsedData.orderDetail.delivery_day, value: parsedData.orderDetail.delivery_day, original: parsedData.orderDetail.delivery_day },
              deliveryTime: parsedData.orderDetail.delivery_time ? { label: parsedData.orderDetail.delivery_time, value: parsedData.orderDetail.delivery_time, original: parsedData.orderDetail.delivery_time } : null,
              deliveryInstruction: parsedData.orderDetail.delivery_instruction || ""
            }));
          }
          if (parsedData.orderDetail.frequency) {
            setFormState(prev => ({ ...prev, frequency: parsedData.orderDetail.frequency }));
          }
        }
      } catch (error) {
        console.error('Failed to restore collection/delivery data:', error);
      }
    }
  }, []);

  // Handle timer countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Validate form whenever form state changes
  useEffect(() => {
    // Check if collection and delivery dates are same
    if (formState.collectionDay && formState.deliveryDay) {
      const collectionDate = formState.collectionDay.timestamp || formState.collectionDay.value;
      const deliveryDate = formState.deliveryDay.timestamp || formState.deliveryDay.value;
      
      if (collectionDate === deliveryDate) {
        toast.error('Collection and delivery dates cannot be the same', {
          duration: 3000,
          icon: '📅',
        });
        // Reset delivery date
        setFormState(prev => ({
          ...prev,
          deliveryDay: null,
          deliveryTime: null
        }));
        return;
      }
      
      // Check if delivery date is before collection date
      const collectionDateObj = new Date(collectionDate);
      const deliveryDateObj = new Date(deliveryDate);
      
      if (deliveryDateObj < collectionDateObj) {
        toast.error('Delivery date cannot be earlier than collection date', {
          duration: 3000,
          icon: '⚠️',
        });
        // Reset delivery date
        setFormState(prev => ({
          ...prev,
          deliveryDay: null,
          deliveryTime: null
        }));
        return;
      }
    }

    const isValid = 
      formState.collectionDay !== null &&
      formState.collectionTime !== null &&
      formState.collectionInstruction !== "" &&
      formState.deliveryDay !== null &&
      formState.deliveryTime !== null &&
      formState.deliveryInstruction !== "" &&
      formState.frequency !== "";

    setIsFormValid(isValid);

    // Update parent state
    setState({
      ...state,
      collection_day: formState.collectionDay?.original,
      collection_time: formState.collectionTime?.original,
      collection_instruction: formState.collectionInstruction,
      delivery_day: formState.deliveryDay?.original,
      delivery_time: formState.deliveryTime?.original,
      delivery_instruction: formState.deliveryInstruction,
      frequency: formState.frequency,
      special_instructions: formState.specialInstructions
    });
  }, [formState, setState]);

  const handleChangeFrequency = useCallback(
    (value: string) => {
      setFormState(prev => ({ ...prev, frequency: value }));
    },
    []
  );

  const handleCollectionChange = useCallback((day: any, time: any, instruction: string) => {
    setFormState(prev => ({
      ...prev,
      collectionDay: day,
      collectionTime: time,
      collectionInstruction: instruction
    }));
  }, []);

  const handleDeliveryChange = useCallback((day: any, time: any, instruction: string) => {
    // Validate if collection date is selected
    if (!formState.collectionDay) {
      toast.error('Please select collection date first', {
        duration: 2500,
        icon: '📅',
      });
      return;
    }

    // Check if dates are same
    const collectionDate = formState.collectionDay.timestamp || formState.collectionDay.value;
    const deliveryDate = day?.timestamp || day?.value;
    
    if (collectionDate === deliveryDate) {
      toast.error('Collection and delivery dates cannot be the same', {
        duration: 3000,
        icon: '📅',
      });
      return;
    }
    
    // Check if delivery date is before collection date
    const collectionDateObj = new Date(collectionDate);
    const deliveryDateObj = new Date(deliveryDate);
    
    if (deliveryDateObj < collectionDateObj) {
      toast.error('Delivery date cannot be earlier than collection date', {
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }

    setFormState(prev => ({
      ...prev,
      deliveryDay: day,
      deliveryTime: time,
      deliveryInstruction: instruction
    }));
  }, [formState.collectionDay]);

  const handleSpecialInstructionsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, specialInstructions: e.target.value }));
  }, []);

  const frequencyOptions = [
    {
      value: "Just Once",
      label: "Just Once",
      description: "One-time service",
      color: "bg-accent-blue/20 text-accent-blue",
      icon: Package
    },
    {
      value: "Weekly",
      label: "Weekly",
      description: "Every week",
      color: "bg-accent-green/20 text-accent-green",
      icon: RefreshCw
    },
    {
      value: "Every two weeks",
      label: "Every 2 Weeks",
      description: "Bi-weekly service",
      color: "bg-accent-yellow/20 text-accent-yellow",
      icon: Calendar
    },
    {
      value: "Every four weeks",
      label: "Every 4 Weeks",
      description: "Monthly service",
      color: "bg-accent-red/20 text-accent-red",
      icon: Calendar
    }
  ];

  // Summary card component
  const SummaryCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{title}</p>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">{value || "Not selected"}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 md:space-y-8 px-4 sm:px-0"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          STEP 2: SCHEDULE COLLECTION & DELIVERY
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
          When works <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">best</span> for you?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Choose your preferred collection and delivery times. We'll work around your schedule.
        </p>
      </div>

      <div className="space-y-8">
        {/* Timer Alert with Progress Bar */}
        <div className="overflow-hidden rounded-xl border border-accent-yellow/20 bg-gradient-to-r from-accent-yellow/10 to-accent-yellow/5">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-yellow/20 text-accent-yellow">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <time className="text-lg font-bold text-neutral-900 dark:text-white">
                    {formatTime(timer)}
                  </time>
                  <span className="px-2 py-1 rounded-full bg-accent-yellow/20 text-accent-yellow text-xs font-medium">
                    High Demand
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Secure your preferred time slot within {formatTime(timer)}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-accent-yellow" />
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-accent-yellow/20">
            <div 
              className="h-full bg-accent-yellow transition-all duration-1000 ease-linear"
              style={{ width: `${((1800 - timer) / 1800) * 100}%` }}
            />
          </div>
        </div>

        {/* Collection Time */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/20">
                  <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Collection Time
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    When would you like us to collect your items?
                  </p>
                </div>
              </div>
            </div>
            <CollectionTime
              onCollectionChange={handleCollectionChange}
            />
          </div>
        </div>

        {/* Delivery Time */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-accent-green/20">
                  <Package className="w-6 h-6 text-accent-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Delivery Time
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    When should we deliver your cleaned items back?
                  </p>
                </div>
              </div>
            </div>
            <DeliveryTime
              onDeliveryChange={handleDeliveryChange}
            />
          </div>
        </div>

        {/* Summary Section */}
        {(formState.collectionDay || formState.deliveryDay) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-green/10 dark:from-primary-900/20 dark:to-accent-green/5 border border-primary-200 dark:border-primary-800"
          >
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Your Schedule Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <SummaryCard
                title="Collection Day"
                value={typeof formState.collectionDay === 'string' ? formState.collectionDay : formState.collectionDay?.label || formState.collectionDay?.value || ""}
                icon={Calendar}
                color="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              />
              <SummaryCard
                title="Collection Time"
                value={typeof formState.collectionTime === 'string' ? formState.collectionTime : formState.collectionTime?.label || formState.collectionTime?.value || ""}
                icon={Clock}
                color="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              />
              <SummaryCard
                title="Delivery Day"
                value={typeof formState.deliveryDay === 'string' ? formState.deliveryDay : formState.deliveryDay?.label || formState.deliveryDay?.value || ""}
                icon={Calendar}
                color="bg-accent-green/20 text-accent-green"
              />
              <SummaryCard
                title="Delivery Time"
                value={typeof formState.deliveryTime === 'string' ? formState.deliveryTime : formState.deliveryTime?.label || formState.deliveryTime?.value || ""}
                icon={Clock}
                color="bg-accent-green/20 text-accent-green"
              />
            </div>
          </motion.div>
        )}

        {/* Special Instructions */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="p-6">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
              Special Instructions for Driver
              <span className="text-neutral-400 dark:text-neutral-500 text-sm font-normal ml-1">(Optional)</span>
            </label>
            <textarea
              value={formState.specialInstructions}
              onChange={handleSpecialInstructionsChange}
              placeholder="Add any special instructions for the driver (e.g., leave with neighbor, call before arrival, specific access codes, etc.)"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Maximum 500 characters
              </p>
              <span className={`text-xs ${formState.specialInstructions.length > 500 ? 'text-red-500' : 'text-neutral-500'}`}>
                {formState.specialInstructions.length}/500
              </span>
            </div>
          </div>
        </div>

        {/* Frequency Selection */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Service Frequency
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                How often would you like this service?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {frequencyOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = formState.frequency === option.value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChangeFrequency(option.value)}
                    className={`
                      flex flex-col items-center p-5 rounded-xl border-2 transition-all duration-300
                      ${isSelected
                        ? `border-primary-500 bg-gradient-to-b from-white to-primary-50 dark:from-neutral-800 dark:to-primary-900/20 shadow-lg scale-[1.02]`
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
                      }
                    `}
                  >
                    <div className={`
                      p-3 rounded-xl mb-4 transition-all duration-300
                      ${isSelected 
                        ? `${option.color} scale-110` 
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                      }
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`
                      font-bold text-base mb-2 text-center
                      ${isSelected
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-900 dark:text-white'
                      }
                    `}>
                      {option.label}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                      {option.description}
                    </span>
                    {isSelected && (
                      <div className="mt-4 px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-medium">
                        Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Frequency Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-green/10 border border-primary-200 dark:border-primary-900/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                <Info className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                  {!formState.frequency || formState.frequency === "Just Once" 
                    ? "Single Order Booking" 
                    : "Regular Service Schedule"}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {!formState.frequency || formState.frequency === "Just Once" ? (
                    "You're booking a single order. We'll send you a weekly email reminder to help you stay on track with your laundry needs."
                  ) : formState.frequency === "Weekly" ? (
                    "We'll collect your bags every Saturday between 12:00 - 15:00. You'll receive notifications 24 hours before each collection."
                  ) : formState.frequency === "Every two weeks" ? (
                    "We'll collect your bags every second Saturday between 12:00 - 15:00. You can pause or skip weeks with no penalty."
                  ) : (
                    "We'll collect your bags every fourth Saturday between 12:00 - 15:00. Perfect for maintaining a regular schedule with maximum flexibility."
                  )}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400">
                  <Info className="w-4 h-4" />
                  <span>You can pause or cancel anytime with no commitment</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-accent-red/5 to-accent-yellow/5 border border-accent-red/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent-red/20">
              <AlertCircle className="w-6 h-6 text-accent-red" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-4">
                Important Notes
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-red mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      All time slots are subject to availability in your area
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-red mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Bookings require a 2-hour advance notice
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-yellow mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Same-day service not available after 10 AM
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-yellow mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Weekend slots fill up quickly
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-green mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Regular customers get priority booking
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-green mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      Free rescheduling up to 6 hours before
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-secondary-600/10 border border-primary-200 dark:border-primary-900/30"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg">
              <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h4 className="font-bold text-xl text-neutral-900 dark:text-white">
                  Service Guarantee
                </h4>
                <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-bold">
                  100% SATISFACTION
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent-green/20">
                    <Bell className="w-5 h-5 text-accent-green" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white text-sm">
                      Real-time Tracking
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Live updates on driver location
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white text-sm">
                      Quality Guarantee
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      100% satisfaction or money back
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent-blue/20">
                    <Clock className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white text-sm">
                      Fast Turnaround
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      24-48 hour service guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Validation Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-xl border ${
            isFormValid
              ? 'border-accent-green/20 bg-accent-green/5'
              : 'border-accent-yellow/20 bg-accent-yellow/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isFormValid
                  ? 'bg-accent-green/20 text-accent-green'
                  : 'bg-accent-yellow/20 text-accent-yellow'
              }`}>
                {isFormValid ? (
                  <Shield className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white">
                  {isFormValid ? 'All Required Information Provided' : 'Complete All Required Fields'}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {isFormValid
                    ? 'You can proceed to the next step'
                    : 'Please complete all fields marked with * to continue'}
                </p>
              </div>
            </div>
            {isFormValid && (
              <button
                type="button"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                onClick={() => {/* Handle next step */}}
              >
                Continue to Payment
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CollectionDelivery;