"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  onlyRead?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  onlyRead = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative">
      <input
        name={name}
        type={inputType}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        readOnly={onlyRead}
        className={`
          w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 
          bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white 
          placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 
          focus:border-transparent transition-all duration-200
          ${onlyRead ? 'bg-neutral-50 dark:bg-neutral-900 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      />
      
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;