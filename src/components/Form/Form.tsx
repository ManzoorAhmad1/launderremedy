"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, value: any) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (values: Record<string, any>) => void;
  onTouched?: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  className?: string;
}

export const useForm = () => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldValue = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const setFieldError = (name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  };

  const validateField = (name: string, value: any) => {
    // Basic validation logic
    if (!value && name === 'email') {
      setFieldError(name, 'Email is required');
    } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldError(name, 'Invalid email format');
    } else {
      setFieldError(name, '');
    }
  };

  return {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
  };
};

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  onTouched,
  initialValues = {},
  className = '',
}) => {
  const form = useForm();

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        form.setFieldValue(key, value);
      });
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.entries(form.values).forEach(([name, value]) => {
      form.validateField(name, value);
    });

    // Check if there are any errors
    const hasErrors = Object.values(form.errors).some(error => error !== '');
    
    if (!hasErrors && onSubmit) {
      onSubmit(form.values);
    }
  };

  useEffect(() => {
    if (onTouched && Object.keys(form.touched).length > 0) {
      onTouched(form.values);
    }
  }, [form.values, form.touched, onTouched]);

  return (
    <FormContext.Provider value={form}>
      <form onSubmit={handleSubmit} className={className} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form');
  }
  return context;
};

interface FormItemProps {
  children: React.ReactNode;
  name?: string;
  label?: string;
  rules?: Array<{
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    email?: boolean;
    phone?: boolean;
  }>;
  className?: string;
}

export const FormItem: React.FC<FormItemProps> = ({
  children,
  name,
  label,
  rules = [],
  className = '',
}) => {
  const form = useFormContext();
  const error = name ? form.errors[name] : '';
  const isTouched = name ? form.touched[name] : false;

  const child = React.cloneElement(children as React.ReactElement, {
    name,
    value: name ? form.values[name] : undefined,
    onChange: (value: any) => {
      if (name) {
        form.setFieldValue(name, value);
        form.validateField(name, value);
      }
    },
    onBlur: () => {
      if (name) {
        form.setFieldTouched(name, true);
      }
    },
  } as any);

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {rules.some(rule => rule.required) && (
            <span className="text-accent-red ml-1">*</span>
          )}
        </label>
      )}
      {child}
      {isTouched && error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-accent-red"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default Form;