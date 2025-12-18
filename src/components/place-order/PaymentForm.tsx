"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Apple,
  Smartphone,
  BadgeCheck
} from "lucide-react";
import CheckoutForm from "./checkoutForm";


const PaymentForm = ({ setElement, setStripe }:any) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "applepay" | "googlepay">("card");
  const [saveCard, setSaveCard] = useState(false);

  const paymentMethods = [
    {
      id: "card",
      title: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay with Visa, Mastercard, or American Express",
      color: "bg-accent-blue/20 text-accent-blue"
    },
    {
      id: "applepay",
      title: "Apple Pay",
      icon: Apple,
      description: "Fast and secure payment with Apple Pay",
      color: "bg-neutral-900/20 text-neutral-900 dark:bg-neutral-100/20 dark:text-neutral-100"
    },
    {
      id: "googlepay",
      title: "Google Pay",
      icon: Smartphone,
      description: "Quick payment with Google Pay",
      color: "bg-accent-blue/20 text-accent-blue"
    }
  ];

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
          Your payment information is encrypted and secure. Choose your preferred payment method.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        {/* Payment Method Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`
                    flex flex-col items-center p-4 rounded-xl border transition-all duration-300
                    ${isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary'
                      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
                    }
                  `}
                >
                  <div className={`
                    p-3 rounded-lg mb-3 transition-colors
                    ${isSelected ? method.color : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`
                    font-semibold text-sm mb-1 text-center
                    ${isSelected
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-900 dark:text-white'
                    }
                  `}>
                    {method.title}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                    {method.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Form */}
        <div className="mb-8">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            {paymentMethod === "card" ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                      Card Details
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Enter your card information securely
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-accent-green/20 text-accent-green text-xs font-medium">
                      Secure
                    </div>
                  </div>
                </div>

                <CheckoutForm setElement={setElement} setStripe={setStripe} />

                {/* Save Card Option */}
                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`
                      w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors
                      ${saveCard
                        ? 'bg-primary-600 border-primary-600'
                        : 'border-neutral-300 dark:border-neutral-600'
                      }
                    `}>
                      {saveCard && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-neutral-900 dark:text-white">
                        Save this card for future orders
                      </span>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Your card details are encrypted and stored securely
                      </p>
                    </div>
                  </label>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {paymentMethod === "applepay" ? "Apple Pay" : "Google Pay"}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  {paymentMethod === "applepay" 
                    ? "You'll be redirected to Apple Pay to complete your payment securely"
                    : "You'll be redirected to Google Pay to complete your payment securely"}
                </p>
                <button
                  type="button"
                  className="btn-primary px-8 py-3 rounded-xl font-semibold"
                  onClick={() => {
                    // Handle Apple Pay/Google Pay integration
                  }}
                >
                  Continue with {paymentMethod === "applepay" ? "Apple Pay" : "Google Pay"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
            Your Security is Our Priority
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 border border-primary-100 dark:border-primary-900/20"
                >
                  <div className="inline-flex p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Notice */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-accent-yellow/5 to-accent-yellow/10 border border-accent-yellow/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent-yellow/20 text-accent-yellow">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                Payment Processing
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Your card will be authorized immediately but only charged once your order is collected. 
                You'll receive an email confirmation with all payment details.
              </p>
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-600/5 border border-primary-200 dark:border-primary-900/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Order Summary
            </h3>
            <BadgeCheck className="w-5 h-5 text-accent-green" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Order Total</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                £99.99
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Delivery Fee</span>
              <span className="text-accent-green font-medium">FREE</span>
            </div>
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-neutral-900 dark:text-white">
                  Total to Pay
                </span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  £99.99
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentForm;