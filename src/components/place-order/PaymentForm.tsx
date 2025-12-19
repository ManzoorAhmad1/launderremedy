"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle
} from "lucide-react";
import CheckoutForm from "./checkoutForm";


const PaymentForm = ({ setElements, setStripe }:any) => {
  const [saveCard, setSaveCard] = useState(false);

  const securityFeatures = [
    {
      icon: Lock,
      title: "256-bit Encryption",
      description: "Military-grade security for all transactions"
    },
    {
      icon: Shield,
      title: "PCI DSS Compliant",
      description: "We meet the highest security standards"
    },
    {
      icon: CheckCircle,
      title: "Secure Processing",
      description: "Your payment details are never stored"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-4">
          <CreditCard className="w-4 h-4 mr-2" />
          STEP 5: PAYMENT DETAILS
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
          Secure <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Payment</span>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Your payment information is encrypted and secure.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        {/* Card Details Section */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                Card Details
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Enter your card information securely
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/20 text-accent-green text-xs font-medium">
              <Lock className="w-3 h-3" />
              Secure
            </div>
          </div>

          <CheckoutForm setElements={setElements} setStripe={setStripe} />

          {/* Save Card Option */}
          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded border flex items-center justify-center mr-3 transition-all flex-shrink-0
                ${saveCard
                  ? 'bg-primary-600 border-primary-600 shadow-sm'
                  : 'border-neutral-300 dark:border-neutral-600 group-hover:border-primary-400'
                }
              `}>
                {saveCard && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </div>
              <div>
                <span className="font-medium text-neutral-900 dark:text-white block">
                  Save this card for future orders
                </span>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Your card details are encrypted and stored securely
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 text-center">
            Your Security is Our Priority
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="p-5 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 border border-primary-100 dark:border-primary-900/20 text-center"
                >
                  <div className="inline-flex p-3 rounded-lg bg-white dark:bg-neutral-800 shadow-sm text-primary-600 dark:text-primary-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentForm;