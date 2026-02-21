"use client";

import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { CreditCard, Calendar, Lock, CheckCircle, AlertCircle } from "lucide-react";

const CardForm = ({ setElements, setStripe }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });

  // Set stripe and elements when component mounts
  React.useEffect(() => {
    if (stripe && elements) {
      setStripe(stripe);
      setElements(elements);
    }
  }, [stripe, elements, setStripe, setElements]);

  const handleChange = (field: string, event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }

    setCardComplete(prev => ({
      ...prev,
      [field]: event.complete
    }));
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1f2937",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#9ca3af",
        },
        iconColor: "#6366f1",
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
      complete: {
        color: "#059669",
        iconColor: "#059669",
      }
    },
    placeholder: "1234 1234 1234 1234"
  };

  const expiryOptions = {
    ...cardElementOptions,
    placeholder: "MM / YY"
  };

  const cvcOptions = {
    ...cardElementOptions,
    placeholder: "CVC"
  };

  const allFieldsComplete = cardComplete.cardNumber && cardComplete.cardExpiry && cardComplete.cardCvc;

  return (
    <div className="space-y-5">
      {/* Card Number */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          <CreditCard className="w-4 h-4 text-primary-600" />
          Card Number
        </label>
        <div className={`
          relative rounded-xl border-2 transition-all
          ${error && !cardComplete.cardNumber
            ? 'border-red-400 dark:border-red-600'
            : cardComplete.cardNumber
              ? 'border-accent-green dark:border-accent-green'
              : 'border-neutral-200 dark:border-neutral-700 focus-within:border-primary-500'
          }
          bg-white dark:bg-neutral-900
        `}>
          <div className="p-4">
            <CardNumberElement
              id="cardNumber"
              onChange={(event) => handleChange("cardNumber", event)}
              options={cardElementOptions}
              className="w-full"
            />
          </div>
          {cardComplete.cardNumber && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-accent-green" />
            </div>
          )}
        </div>
      </div>

      {/* Expiry & CVC */}
      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Calendar className="w-4 h-4 text-primary-600" />
            Expiry Date
          </label>
          <div className={`
            relative rounded-xl border-2 transition-all
            ${error && !cardComplete.cardExpiry
              ? 'border-red-400 dark:border-red-600'
              : cardComplete.cardExpiry
                ? 'border-accent-green dark:border-accent-green'
                : 'border-neutral-200 dark:border-neutral-700 focus-within:border-primary-500'
            }
            bg-white dark:bg-neutral-900
          `}>
            <div className="p-4">
              <CardExpiryElement
                id="expiryDate"
                onChange={(event) => handleChange("cardExpiry", event)}
                options={expiryOptions}
                className="w-full"
              />
            </div>
            {cardComplete.cardExpiry && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle className="w-4 h-4 text-accent-green" />
              </div>
            )}
          </div>
        </div>

        {/* CVC */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Lock className="w-4 h-4 text-primary-600" />
            CVV
          </label>
          <div className={`
            relative rounded-xl border-2 transition-all
            ${error && !cardComplete.cardCvc
              ? 'border-red-400 dark:border-red-600'
              : cardComplete.cardCvc
                ? 'border-accent-green dark:border-accent-green'
                : 'border-neutral-200 dark:border-neutral-700 focus-within:border-primary-500'
            }
            bg-white dark:bg-neutral-900
          `}>
            <div className="p-4">
              <CardCvcElement
                id="cvv"
                onChange={(event) => handleChange("cardCvc", event)}
                options={cvcOptions}
                className="w-full"
              />
            </div>
            {cardComplete.cardCvc && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle className="w-4 h-4 text-accent-green" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Success Indicator */}
      {allFieldsComplete && !error && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-accent-green/10 border border-accent-green/30">
          <CheckCircle className="w-5 h-5 text-accent-green" />
          <p className="text-sm font-medium text-accent-green">
            Card details validated successfully!
          </p>
        </div>
      )}

      {/* Accepted Cards */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">We accept:</span>
        <div className="flex items-center gap-2 opacity-60">
          <svg viewBox="0 0 48 16" className="h-5" fill="none">
            <path d="M17.8 0.9L13.9 15.1H10.5L14.4 0.9H17.8ZM31.6 9.8C31.6 11.4 30.3 12.3 28.2 12.3C26.8 12.3 25.8 12 24.9 11.5L25.4 9.1C26.3 9.6 27.1 9.8 28.1 9.8C28.9 9.8 29.4 9.6 29.4 9.1C29.4 8.7 28.9 8.5 27.9 8.2C25.9 7.6 24.8 6.7 24.8 5.2C24.8 3.2 26.7 1.9 29.5 1.9C30.8 1.9 31.8 2.1 32.7 2.5L32.2 4.8C31.4 4.5 30.5 4.3 29.6 4.3C28.8 4.3 28.4 4.5 28.4 4.9C28.4 5.3 29 5.5 30.1 5.9C32.1 6.5 33.2 7.4 33.2 9C33.2 11.1 31.6 12.4 28.2 12.4L31.6 9.8ZM42.5 0.9L39.7 15.1H36.5L33.9 4.8L32.7 11.2L32.5 12.3C32.3 13.5 31.4 14.3 30.2 14.3H30.1L30.4 12.8C30.9 12.7 31.2 12.3 31.3 11.7L34.1 0.9H37.5L39.5 9.1L41.3 0.9H44.5M11.2 0.9L7.8 10.8L7.4 8.9L6.2 3.2C6 2.3 5.3 1.5 4.3 1.2L4.2 0.9H8.9C9.8 0.9 10.5 1.5 10.7 2.4L11.2 0.9Z" fill="#1434CB" />
          </svg>
          <svg viewBox="0 0 48 32" className="h-6" fill="none">
            <circle cx="15" cy="16" r="10" fill="#EB001B" />
            <circle cx="33" cy="16" r="10" fill="#FF5F00" />
            <path d="M24 9C21.5 11 20 14.3 20 16C20 17.7 21.5 21 24 23C26.5 21 28 17.7 28 16C28 14.3 26.5 11 24 9Z" fill="#F79E1B" />
          </svg>
          <svg viewBox="0 0 48 16" className="h-5" fill="none">
            <text x="2" y="12" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">AMEX</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
