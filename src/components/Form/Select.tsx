"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

interface SelectProps {
  options: Array<{ value: any; label: string; [key: string]: any }>;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  placeholder?: string;
  isSearchable?: boolean;
  isLoading?: boolean;
  name?: string;
  className?: string;
  handleValueOnChange?: (value: any) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Select...',
  isSearchable = false,
  isLoading = false,
  name,
  className = '',
  handleValueOnChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<any>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = isSearchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedLabel = options.find(opt => opt.value === selectedOption)?.label || placeholder;

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  const handleSelect = (option: any) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    setSearchTerm('');
    
    if (onChange) {
      onChange(option.value);
    }
    
    if (handleValueOnChange) {
      handleValueOnChange(option);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={onBlur}
        className={`
          w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 
          bg-white dark:bg-neutral-800 text-left flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          ${isOpen ? 'ring-2 ring-primary-500 border-transparent' : ''}
        `}
      >
        <span className={selectedOption ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}>
          {selectedLabel}
        </span>
        <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 max-h-60 overflow-y-auto">
          {isSearchable && (
            <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-sm text-neutral-500">Loading...</p>
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-neutral-500 text-sm">
              No options found
            </div>
          ) : (
            <ul className="py-1">
              {filteredOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full text-left px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 
                      transition-colors flex items-center justify-between
                      ${selectedOption === option.value ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                    `}
                  >
                    <span className="text-neutral-900 dark:text-white">
                      {option.label}
                    </span>
                    {selectedOption === option.value && (
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;