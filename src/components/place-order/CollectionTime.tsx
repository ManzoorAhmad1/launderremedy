"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { Calendar, Clock, AlertCircle, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeListOfDay } from "@/utils/helpers";


const CollectionTime = ({ onCollectionChange }: { onCollectionChange: (day: any, time: any, instruction: string) => void }) => {
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [collectionTimeOptions, setCollectionTimeOptions] = useState<any[]>([]);
  const [selectedInstruction, setSelectedInstruction] = useState<string>("");
  
  const dispatch = useDispatch();
  const isCollectionLoading = useSelector((state: any) => state.order.isCollectionLoading);
  const collection = useSelector((state: any) => state.order.collection);
  const collection_day = useSelector((state: any) => state.order.collection_day);

  // Debug log Redux data
  useEffect(() => {
    console.log('CollectionTime - Redux data:', {
      collection_day,
      collection,
      isCollectionLoading
    });
  }, [collection_day, collection, isCollectionLoading]);

  // Format day options for react-select
  const dayOptions = collection_day?.map((day: any) => ({
    value: day.value,
    label: day.label,
    original: day
  })) || [];

  // Format time options for react-select
  const timeOptions = collectionTimeOptions.map((time: any) => ({
    value: time.value,
    label: time.label,
    original: time
  }));

  useEffect(() => {
    console.log('CollectionTime - useEffect triggered with:', {
      collection_day_length: collection_day?.length,
      collection_length: collection?.length,
      selectedDay
    });

    if (collection_day?.length > 0 && collection?.length > 0 && !selectedDay) {
      const defaultDay = collection_day[0];
      const dayOption = {
        value: defaultDay.value,
        label: defaultDay.label,
        original: defaultDay
      };
      
      console.log('Setting default day:', dayOption);
      setSelectedDay(dayOption);
      
      const times = getTimeListOfDay(defaultDay, collection);
      console.log('Generated times for default day:', times);
      setCollectionTimeOptions(times);
      
      if (times.length > 0) {
        const timeOption = {
          value: times[0].value,
          label: times[0].label,
          original: times[0]
        };
        console.log('Setting default time:', timeOption);
        setSelectedTime(timeOption);
        onCollectionChange(dayOption, timeOption, "");
      }
    }
  }, [collection_day, collection]);

  const handleDayChange = (selectedOption: any) => {
    console.log('Day changed to:', selectedOption);
    setSelectedDay(selectedOption);
    
    const times = getTimeListOfDay(selectedOption.original, collection);
    console.log('Times for selected day:', times);
    setCollectionTimeOptions(times);
    
    if (times.length > 0) {
      const timeOption = {
        value: times[0].value,
        label: times[0].label,
        original: times[0]
      };
      console.log('Auto-selecting first time:', timeOption);
      setSelectedTime(timeOption);
      onCollectionChange(selectedOption, timeOption, selectedInstruction);
    } else {
      console.log('No times available for this day');
      setSelectedTime(null);
      onCollectionChange(selectedOption, null, selectedInstruction);
    }
  };

  const handleTimeChange = (selectedOption: any) => {
    console.log('Time changed to:', selectedOption);
    setSelectedTime(selectedOption);
    onCollectionChange(selectedDay, selectedOption, selectedInstruction);
  };

  const handleInstructionChange = (instruction: string) => {
    console.log('Instruction changed to:', instruction);
    setSelectedInstruction(instruction);
    onCollectionChange(selectedDay, selectedTime, instruction);
  };

  // Custom styles for react-select
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      padding: "8px 4px",
      borderRadius: "12px",
      borderColor: state.isFocused 
        ? "#8b5cf6" 
        : "#e5e7eb",
      boxShadow: state.isFocused 
        ? "0 0 0 3px rgba(139, 92, 246, 0.1)" 
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
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      marginTop: 0
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#8b5cf6"
        : state.isFocused
        ? "#f3f4f6"
        : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#111827",
      padding: "12px 16px",
      "&:active": {
        backgroundColor: "#8b5cf6"
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

  // Dark mode styles
  const darkStyles = {
    control: (base: any, state: any) => ({
      ...base,
      padding: "8px 4px",
      borderRadius: "12px",
      borderColor: state.isFocused 
        ? "#8b5cf6" 
        : "#374151",
      backgroundColor: "#1f2937",
      boxShadow: state.isFocused 
        ? "0 0 0 3px rgba(139, 92, 246, 0.2)" 
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
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      marginTop: 0
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#8b5cf6"
        : state.isFocused
        ? "#374151"
        : "#1f2937",
      color: state.isSelected ? "#ffffff" : "#f3f4f6",
      padding: "12px 16px",
      "&:active": {
        backgroundColor: "#8b5cf6"
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
        {/* Collection Day with react-select */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-primary-600" />
              Collection Day *
            </div>
          </label>
          <Select
            value={selectedDay}
            onChange={handleDayChange}
            options={dayOptions}
            isLoading={isCollectionLoading}
            isDisabled={isCollectionLoading}
            placeholder={isCollectionLoading ? "Loading available days..." : (dayOptions.length === 0 ? "No days available" : "Select collection day")}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? darkStyles : customStyles}
            components={{
              IndicatorSeparator: () => null,
              LoadingIndicator: () => (
                <div className="pr-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                </div>
              )
            }}
          />
          <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {selectedDay ? `Selected: ${selectedDay.label}` : "Select a day to see available times"}
          </div>
        </div>

        {/* Collection Time with react-select */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-primary-600" />
              Collection Time *
            </div>
          </label>
          <Select
            value={selectedTime}
            onChange={handleTimeChange}
            options={timeOptions}
            isDisabled={timeOptions.length === 0 || isCollectionLoading}
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

      {/* Rest of the component remains the same... */}
      {/* Driver Instructions */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          How should we collect your items? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
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
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${
                    isSelected
                      ? 'bg-primary-100 dark:bg-primary-900/30'
                      : 'bg-neutral-100 dark:bg-neutral-700'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      isSelected
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-400 dark:text-neutral-500'
                    }`} />
                  </div>
                </div>
                <div className="text-left">
                  <span className={`font-medium text-sm ${
                    isSelected
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-900 dark:text-white'
                  }`}>
                    {instruction.label}
                  </span>
                  <p className={`text-xs mt-1 ${
                    isSelected
                      ? 'text-primary-500 dark:text-primary-300'
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
                Time slots are 3-hour windows (e.g., 8-11 AM)
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