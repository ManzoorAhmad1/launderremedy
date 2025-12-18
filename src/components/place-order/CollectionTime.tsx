"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, AlertCircle, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getDeliveryDetails } from "@/redux/features/orderSlice";
import { getTimeListOfDay } from "@/utils/helpers";

const CollectionTime = () => {
  const [collectionTime, setCollectionTime] = useState<any[]>([]);
  
  const dispatch = useDispatch();
  const isCollectionLoading = useSelector((state: any) => state.order.isCollectionLoading);
  const collection = useSelector((state: any) => state.order.collection);
  const collection_day = useSelector((state: any) => state.order.collection_day);

  useEffect(() => {
    if (collection_day.length > 0 && collection.length > 0) {
      setCollectionTime(getTimeListOfDay(collection_day[0], collection));
    }
  }, [collection_day, collection]);

  const collectionInstructions = [
    {
      value: "Collect from me in person",
      label: "Collect from me in person",
      description: "I'll be available to hand over items",
      icon: Truck
    },
    {
      value: "Collect from outside",
      label: "Leave outside for collection",
      description: "Items will be left in a safe place",
      icon: Truck
    },
    {
      value: "Collect from reception/porter",
      label: "Collect from reception/porter",
      description: "Items with building reception",
      icon: Truck
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Collection Day */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-primary-600" />
              Collection Day
            </div>
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onChange={(e) => {
              const selected = { value: e.target.value };
              setCollectionTime(getTimeListOfDay(selected, collection));
              dispatch(getDeliveryDetails(e.target.value));
            }}
            disabled={isCollectionLoading}
          >
            {collection_day.map((day: any, index: number) => (
              <option key={index} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
          {isCollectionLoading && (
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Loading available dates...
            </div>
          )}
        </div>

        {/* Collection Time */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-primary-600" />
              Collection Time
            </div>
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={collectionTime.length === 0 || isCollectionLoading}
          >
            {collectionTime.map((time: any, index: number) => (
              <option key={index} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
          {collectionTime.length === 0 && !isCollectionLoading && (
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Please select a collection day first
            </div>
          )}
        </div>
      </div>

      {/* Driver Instructions */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          How should we collect your items?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {collectionInstructions.map((instruction) => {
            const Icon = instruction.icon;
            
            return (
              <button
                key={instruction.value}
                type="button"
                onClick={() => {
                  // Handle instruction selection
                }}
                className="flex flex-col items-start p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
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

      {/* Collection Notes */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary-500/5 to-accent-blue/5 border border-primary-200 dark:border-primary-900/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
              Collection Guidelines
            </h4>
            <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0" />
                Please have your items ready at the scheduled time
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0" />
                Time slots are 2-hour windows (e.g., 9-11 AM)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0" />
                We'll send a notification when the driver is 15 minutes away
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionTime;