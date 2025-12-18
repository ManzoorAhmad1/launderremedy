"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

interface PlacesAutoCompleteProps {
  placeholder?: string;
  search?: string;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  restrictions?: {
    country: string;
  };
}

const PlacesAutoComplete: React.FC<PlacesAutoCompleteProps> = ({
  placeholder = 'Enter address...',
  search,
  value,
  onChange,
  className = '',
  restrictions = { country: 'uk' },
}) => {
  const [inputValue, setInputValue] = useState(search || '');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search) {
      setInputValue(search);
    }
  }, [search]);

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    }

    autocompleteRef.current = new window.google.maps.places.AutocompleteService();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = (input: string) => {
    if (!autocompleteRef.current) return;

    setIsLoading(true);
    
    const request = {
      input,
      componentRestrictions: restrictions,
      types: ['address'],
    };

    autocompleteRef.current.getPlacePredictions(
      request,
      (predictions: any[], status: string) => {
        setIsLoading(false);
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    );
  };

  const handleSelect = (place: any) => {
    setInputValue(place.description);
    setShowSuggestions(false);
    
    if (onChange) {
      onChange({
        value: place.description,
        place_id: place.place_id,
      });
    }
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleClear = () => {
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (onChange) {
      onChange(null);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`
            pl-10 pr-10 py-3 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 
            bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white 
            placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 
            focus:border-transparent ${className}
          `}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
              ✕
            </span>
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 max-h-60 overflow-y-auto">
          <ul className="py-1">
            {suggestions.map((place) => (
              <li key={place.place_id}>
                <button
                  type="button"
                  onClick={() => handleSelect(place)}
                  className="w-full text-left px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors flex items-start gap-2"
                >
                  <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-white">
                      {place.structured_formatting.main_text}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {place.structured_formatting.secondary_text}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
              Loading suggestions...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesAutoComplete;