import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Lock, 
  CheckCircle,
  AlertCircle,
  Shield
} from "lucide-react";
import { 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  setElement: (element: any) => void;
  setStripe: (stripe: any) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ setElement, setStripe }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (field: string, event: any) => {
    setElement(elements);
    setStripe(stripe);
    
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#374151",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        "::placeholder": {
          color: "#9ca3af",
        },
        backgroundColor: "transparent",
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Card Number
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <CreditCard className="w-5 h-5 text-neutral-400" />
          </div>
          <div className="pl-10">
            <CardNumberElement
              onChange={(event:any) => handleChange("cardNumber", event)}
              options={cardElementOptions}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Expiry and CVV */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Expiry Date
          </label>
          <CardExpiryElement
            onChange={(event:any) => handleChange("cardExpiry", event)}
            options={cardElementOptions}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            CVV
          </label>
          <div className="relative">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-neutral-400" />
            </div>
            <CardCvcElement
              onChange={(event:any) => handleChange("cardCvc", event)}
              options={cardElementOptions}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-accent-red/10 border border-accent-red/20 text-accent-red"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Security Badge */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary-500/5 to-accent-green/5 border border-primary-200 dark:border-primary-900/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent-green/20">
            <CheckCircle className="w-4 h-4 text-accent-green" />
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-white">
            Secure Payment
          </span>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          256-bit SSL encrypted
        </div>
      </div>

      {/* Payment Cards */}
      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
          Accepted payment methods
        </p>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Visa</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Mastercard</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Amex</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Apple Pay</span>
          </div>
        </div>
      </div>

      {/* Processing Notice */}
      <div className="text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          By continuing, you agree to our Terms of Service and authorize payment for your order.
          Your card will be charged only after collection.
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;