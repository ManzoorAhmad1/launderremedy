"use client";

import { useEffect, useCallback } from "react";
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
  Shield
} from "lucide-react";
import { useSelector } from "react-redux";
import CollectionTime from "./CollectionTime";
import DeliveryTime from "./DeliveryTime";


interface CollectionDeliveryProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const CollectionDelivery: React.FC<CollectionDeliveryProps> = ({ state, setState }) => {
  const collection = useSelector((state: any) => state.order.collection);
  const collection_day = useSelector((state: any) => state.order.collection_day);
  const delivery = useSelector((state: any) => state.order.delivery);
  const delivery_day = useSelector((state: any) => state.order.delivery_day);

  const handleChangeFrequency = useCallback(
    (value: string) => {
      setState((prev: any) => ({ ...prev, frequency: value }));
    },
    [setState]
  );

  useEffect(() => {
    // Initialize form values as in original code
  }, [collection_day, collection, delivery_day, delivery]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
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
        {/* Timer Alert */}
        <div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-accent-yellow/10 to-accent-yellow/5 border border-accent-yellow/20">
            <div className="p-2 rounded-lg bg-accent-yellow/20 text-accent-yellow">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <time className="text-lg font-bold text-neutral-900 dark:text-white">
                  18:30
                </time>
                <span className="px-2 py-1 rounded-full bg-accent-yellow/20 text-accent-yellow text-xs font-medium">
                  High Demand
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                There is high demand in your area, so please place your order within 30 minutes to secure your preferred time slot.
              </p>
            </div>
          </div>
        </div>

        {/* Collection Time */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                <Truck className="w-5 h-5" />
              </div>
              Collection Time
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              When would you like us to collect your items?
            </p>
          </div>
          <CollectionTime />
        </div>

        {/* Delivery Time */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green">
                <Package className="w-5 h-5" />
              </div>
              Delivery Time
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              When should we deliver your cleaned items back?
            </p>
          </div>
          <DeliveryTime />
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Special Instructions for Driver
          </label>
          <textarea
            name="special_instructions"
            placeholder="Add any special instructions for the driver (e.g., leave with neighbor, call before arrival, etc.)"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            onChange={(e) => setState((prev: any) => ({ 
              ...prev, 
              special_instructions: e.target.value 
            }))}
          />
        </div>

        {/* Frequency Selection */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              Service Frequency
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              How often would you like this service?
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {frequencyOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = state?.frequency === option.value;
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChangeFrequency(option.value)}
                  className={`
                    flex flex-col items-center p-4 rounded-xl border transition-all duration-300
                    ${isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary'
                      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
                    }
                  `}
                >
                  <div className={`
                    p-3 rounded-lg mb-3 transition-colors
                    ${isSelected ? option.color : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`
                    font-semibold text-sm mb-1
                    ${isSelected
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-900 dark:text-white'
                    }
                  `}>
                    {option.label}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Frequency Notice */}
        <div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary-500/5 to-accent-green/5 border border-primary-200 dark:border-primary-900/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <Info className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                  {!state?.frequency || state?.frequency === "Just Once" ? (
                    "Single Order Booking"
                  ) : (
                    `Regular Service Schedule`
                  )}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {!state?.frequency || state?.frequency === "Just Once" ? (
                    "You're booking a single order. We'll send you a weekly email reminder to help you stay on track with your laundry needs."
                  ) : (
                    `We'll collect your bags every ${
                      state?.frequency === "Weekly"
                        ? "Saturday"
                        : state?.frequency === "Every two weeks"
                        ? "second Saturday"
                        : "fourth Saturday"
                    } 12:00 - 15:00. You can pause or cancel anytime with no commitment.`
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-accent-red/5 to-accent-yellow/5 border border-accent-red/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent-red/20 text-accent-red">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Important Notes
              </h4>
              <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 mr-2 flex-shrink-0" />
                  All time slots are subject to availability in your area
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-yellow mt-1.5 mr-2 flex-shrink-0" />
                  Same-day service is not available for orders placed after 10 AM
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 mr-2 flex-shrink-0" />
                  Regular customers get priority booking for preferred time slots
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Guarantee */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-600/10 border border-primary-200 dark:border-primary-900/30">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-sm">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Service Guarantee
              </h4>
              <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
                <li className="flex items-center">
                  <Bell className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                  Real-time notifications for collection and delivery
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                  Quality guarantee on all cleaning services
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                  24-48 hour turnaround for most items
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionDelivery;