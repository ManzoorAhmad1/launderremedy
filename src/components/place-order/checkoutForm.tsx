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

  const handleChange = (field: string, event: any) => {
    if (stripe && elements) {
      setElements(elements);
      setStripe(stripe);
    }
    
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
          <svg className="h-8" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#1434CB"/>
            <path d="M17 16C17 19.866 13.866 23 10 23C6.134 23 3 19.866 3 16C3 12.134 6.134 9 10 9C13.866 9 17 12.134 17 16Z" fill="#EB001B"/>
            <path d="M31 16C31 19.866 27.866 23 24 23C20.134 23 17 19.866 17 16C17 12.134 20.134 9 24 9C27.866 9 31 12.134 31 16Z" fill="#F79E1B"/>
          </svg>
          <svg className="h-8" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#0066B2"/>
            <path d="M21 10H27V22H21V10Z" fill="#FFFFFF"/>
          </svg>
          <svg className="h-8" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#016FD0"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16 10H32V22H16V10Z" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
