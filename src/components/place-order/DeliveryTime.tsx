"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Package, AlertCircle, Home } from "lucide-react";
import { useSelector } from "react-redux";

import { getTimeListOfDay } from "@/utils/helpers";

const DeliveryTime = () => {
  const [deliveryTime, setDeliveryTime] = useState<any[]>([]);
  
  const isDeliveryLoading = useSelector((state: any) => state.order.isDeliveryLoading);
  const delivery = useSelector((state: any) => state.order.delivery);
  const delivery_day = useSelector((state: any) => state.order.delivery_day);

  useEffect(() => {
    if (delivery_day.length > 0 && delivery.length > 0) {
      setDeliveryTime(getTimeListOfDay(delivery_day[0], delivery));
    }
  }, [delivery_day, delivery]);

  const deliveryInstructions = [
    {
      value: "Deliver to me in person",
      label: "Deliver to me in person",
      description: "I'll be available to receive items",
      icon: Home
    },
    {
      value: "Leave It At Door",
      label: "Leave at door",
      description: "Leave items in a safe place",
      icon: Package
    },
    {
      value: "Deliver to the reception/porter",
      label: "Deliver to reception/porter",
      description: "Leave with building reception",
      icon: Home
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Delivery Day */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-accent-green" />
              Delivery Day
            </div>
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onChange={(e) => {
              const selected = { value: e.target.value };
              setDeliveryTime(getTimeListOfDay(selected, delivery));
            }}
            disabled={isDeliveryLoading}
          >
            {delivery_day.map((day: any, index: number) => (
              <option key={index} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
          {isDeliveryLoading && (
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Loading available dates...
            </div>
          )}
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-accent-green" />
              Delivery Time
            </div>
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={deliveryTime.length === 0 || isDeliveryLoading}
          >
            {deliveryTime.map((time: any, index: number) => (
              <option key={index} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
          {deliveryTime.length === 0 && !isDeliveryLoading && (
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Please select a delivery day first
            </div>
          )}
        </div>
      </div>

      {/* Delivery Instructions */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          How should we deliver your items?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {deliveryInstructions.map((instruction) => {
            const Icon = instruction.icon;
            
            return (
              <button
                key={instruction.value}
                type="button"
                onClick={() => {
                  // Handle instruction selection
                }}
                className="flex flex-col items-start p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-accent-green dark:hover:border-accent-green hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-left">
                  <span className="font-medium text-neutral-900 dark:text-white text-sm">
                    {instruction.label}
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {instruction.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Delivery Notes */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-accent-green/5 to-accent-green/10 border border-accent-green/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
              Delivery Information
            </h4>
            <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 mr-2 flex-shrink-0" />
                All items are professionally packed and ready to use
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 mr-2 flex-shrink-0" />
                Delivery is typically within 24-48 hours after collection
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 mr-2 flex-shrink-0" />
                You'll receive a delivery notification 30 minutes before arrival
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTime;