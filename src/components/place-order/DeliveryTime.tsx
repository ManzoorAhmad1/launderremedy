"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { Calendar, Clock, Package, AlertCircle, Home } from "lucide-react";
import { useSelector } from "react-redux";

import { getTimeListOfDay } from "@/utils/helpers";

const DeliveryTime = ({ onDeliveryChange }: { onDeliveryChange: (day: any, time: any, instruction: string) => void }) => {
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [deliveryTimeOptions, setDeliveryTimeOptions] = useState<any[]>([]);
  const [selectedInstruction, setSelectedInstruction] = useState<string>("");
  
  const isDeliveryLoading = useSelector((state: any) => state.order.isDeliveryLoading);
  const delivery = useSelector((state: any) => state.order.delivery);
  const delivery_day = useSelector((state: any) => state.order.delivery_day);

  // Debug log Redux data
  useEffect(() => {
    console.log('DeliveryTime - Redux data:', {
      delivery_day,
      delivery,
      isDeliveryLoading
    });
  }, [delivery_day, delivery, isDeliveryLoading]);

  // Format day options for react-select
  const dayOptions = delivery_day?.map((day: any) => ({
    value: day.value,
    label: day.label,
    original: day
  })) || [];

  // Format time options for react-select
  const timeOptions = deliveryTimeOptions.map((time: any) => ({
    value: time.value,
    label: time.label,
    original: time
  }));

  useEffect(() => {
    console.log('DeliveryTime - useEffect triggered with:', {
      delivery_day_length: delivery_day?.length,
      delivery_length: delivery?.length,
      selectedDay
    });

    if (delivery_day?.length > 0 && delivery?.length > 0 && !selectedDay) {
      const defaultDay = delivery_day[0];
      const dayOption = {
        value: defaultDay.value,
        label: defaultDay.label,
        original: defaultDay
      };
      
      console.log('Setting default delivery day:', dayOption);
      setSelectedDay(dayOption);
      
      const times = getTimeListOfDay(defaultDay, delivery);
      console.log('Generated delivery times for default day:', times);
      setDeliveryTimeOptions(times);
      
      if (times.length > 0) {
        const timeOption = {
          value: times[0].value,
          label: times[0].label,
          original: times[0]
        };
        console.log('Setting default delivery time:', timeOption);
        setSelectedTime(timeOption);
        onDeliveryChange(dayOption, timeOption, "");
      }
    }
  }, [delivery_day, delivery]);

  const handleDayChange = (selectedOption: any) => {
    console.log('Delivery day changed to:', selectedOption);
    setSelectedDay(selectedOption);
    
    const times = getTimeListOfDay(selectedOption.original, delivery);
    console.log('Delivery times for selected day:', times);
    setDeliveryTimeOptions(times);
    
    if (times.length > 0) {
      const timeOption = {
        value: times[0].value,
        label: times[0].label,
        original: times[0]
      };
      console.log('Auto-selecting first delivery time:', timeOption);
      setSelectedTime(timeOption);
      onDeliveryChange(selectedOption, timeOption, selectedInstruction);
    } else {
      console.log('No delivery times available for this day');
      setSelectedTime(null);
      onDeliveryChange(selectedOption, null, selectedInstruction);
    }
  };

  const handleTimeChange = (selectedOption: any) => {
    console.log('Delivery time changed to:', selectedOption);
    setSelectedTime(selectedOption);
    onDeliveryChange(selectedDay, selectedOption, selectedInstruction);
  };

  const handleInstructionChange = (instruction: string) => {
    console.log('Delivery instruction changed to:', instruction);
    setSelectedInstruction(instruction);
    onDeliveryChange(selectedDay, selectedTime, instruction);
  };

  // Custom styles (same as before, just different colors)
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      padding: "8px 4px",
      borderRadius: "12px",
      borderColor: state.isFocused 
        ? "#10b981" 
        : "#e5e7eb",
      boxShadow: state.isFocused 
        ? "0 0 0 3px rgba(16, 185, 129, 0.1)" 
        : "none",
      backgroundColor: "#ffffff",
      "&:hover": {
        borderColor: "#d1d5db"
      },
      minHeight: "52px"
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#10b981"
        : state.isFocused
        ? "#f3f4f6"
        : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#111827",
      padding: "12px 16px",
      "&:active": {
        backgroundColor: "#10b981"
      }
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#6b7280"
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#111827"
    })
  };

  const darkStyles = {
    control: (base: any, state: any) => ({
      ...base,
      padding: "8px 4px",
      borderRadius: "12px",
      borderColor: state.isFocused 
        ? "#10b981" 
        : "#374151",
      backgroundColor: "#1f2937",
      boxShadow: state.isFocused 
        ? "0 0 0 3px rgba(16, 185, 129, 0.2)" 
        : "none",
      "&:hover": {
        borderColor: "#4b5563"
      },
      minHeight: "52px"
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#1f2937",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#10b981"
        : state.isFocused
        ? "#374151"
        : "#1f2937",
      color: state.isSelected ? "#ffffff" : "#f3f4f6",
      padding: "12px 16px",
      "&:active": {
        backgroundColor: "#10b981"
      }
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#9ca3af"
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#f3f4f6"
    })
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Delivery Day */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-accent-green" />
              Delivery Day *
            </div>
          </label>
          <Select
            value={selectedDay}
            onChange={handleDayChange}
            options={dayOptions}
            isLoading={isDeliveryLoading}
            isDisabled={isDeliveryLoading || dayOptions.length === 0}
            placeholder={dayOptions.length === 0 ? "Loading days..." : "Select delivery day"}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? darkStyles : customStyles}
            components={{
              IndicatorSeparator: () => null,
              LoadingIndicator: () => (
                <div className="pr-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-green"></div>
                </div>
              )
            }}
          />
          <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {selectedDay ? `Selected: ${selectedDay.label}` : "Select a day to see available times"}
          </div>
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-accent-green" />
              Delivery Time *
            </div>
          </label>
          <Select
            value={selectedTime}
            onChange={handleTimeChange}
            options={timeOptions}
            isDisabled={timeOptions.length === 0 || isDeliveryLoading}
            placeholder={timeOptions.length === 0 ? "Select day first" : "Select time slot"}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? darkStyles : customStyles}
            components={{
              IndicatorSeparator: () => null,
              NoOptionsMessage: (props) => (
                <div className="py-3 px-4 text-sm text-neutral-500 dark:text-neutral-400 text-center">
                  {selectedDay ? "No time slots available for this day" : "Select a day first"}
                </div>
              )
            }}
          />
          <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {selectedTime ? `Selected: ${selectedTime.label}` : "No time slot selected"}
            {timeOptions.length > 0 && ` (${timeOptions.length} slots available)`}
          </div>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          How should we deliver your items? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
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
          ].map((instruction) => {
            const Icon = instruction.icon;
            const isSelected = selectedInstruction === instruction.value;
            
            return (
              <button
                key={instruction.value}
                type="button"
                onClick={() => handleInstructionChange(instruction.value)}
                className={`
                  flex flex-col items-start p-4 rounded-xl border transition-all duration-200
                  ${isSelected
                    ? 'border-accent-green bg-accent-green/5 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-accent-green dark:hover:border-accent-green'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${
                    isSelected
                      ? 'bg-accent-green/20 text-accent-green'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-left">
                  <span className={`font-medium text-sm ${
                    isSelected
                      ? 'text-accent-green dark:text-accent-green'
                      : 'text-neutral-900 dark:text-white'
                  }`}>
                    {instruction.label}
                  </span>
                  <p className={`text-xs mt-1 ${
                    isSelected
                      ? 'text-accent-green dark:text-accent-green'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}>
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