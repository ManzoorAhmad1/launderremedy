"use client";

import { motion } from "framer-motion";
import { 
  Package, 
  Gift, 
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Percent,
  Clock,
  Users
} from "lucide-react";
import { useSelector } from "react-redux";

interface PrepaidBundle {
  id: string;
  title: string;
  description: string;
  perItemPrice: number;
  prepaidTotalItems: number;
  purchasedQuantity?: number;
  remaining?: number;
}

const PrepaidBalance = () => {
  const user = useSelector((state: any) => state.user.user);
  const bundles: PrepaidBundle[] = user?.bundles || [];

  const getSavingsPercentage = (bundle: PrepaidBundle) => {
    // Calculate savings percentage based on regular price
    return Math.floor(Math.random() * 20) + 10; // Random 10-30% for demo
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-4">
          <Gift className="w-4 h-4 mr-2" />
          PREPAID BUNDLES & CREDITS
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
          Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Prepaid</span> Balance
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Manage your prepaid bundles and track remaining balances. Use them for future orders and save more.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Bundles */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-500/5 border border-primary-200 dark:border-primary-900/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
              <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {bundles.length}
            </span>
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
            Active Bundles
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Total prepaid bundles available
          </p>
        </div>

        {/* Total Items */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-green/10 to-accent-green/5 border border-accent-green/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-accent-green/20">
              <TrendingUp className="w-6 h-6 text-accent-green" />
            </div>
            <span className="text-2xl font-bold text-accent-green">
              {bundles.reduce((total, bundle) => total + (bundle.remaining || bundle.prepaidTotalItems), 0)}
            </span>
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
            Remaining Items
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Total items available across all bundles
          </p>
        </div>

        {/* Total Value */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border border-accent-blue/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-accent-blue/20">
              <CreditCard className="w-6 h-6 text-accent-blue" />
            </div>
            <span className="text-2xl font-bold text-accent-blue">
              £{bundles.reduce((total, bundle) => {
                const remaining = bundle.remaining || bundle.prepaidTotalItems;
                return total + (remaining * bundle.perItemPrice);
              }, 0).toFixed(2)}
            </span>
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
            Total Value
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Remaining credit value
          </p>
        </div>
      </div>

      {/* Bundles List */}
      {bundles.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Your Bundles
            </h3>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {bundles.length} active bundle{bundles.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="grid gap-4">
            {bundles.map((bundle, index) => {
              const remaining = bundle.remaining || bundle.prepaidTotalItems;
              const used = bundle.prepaidTotalItems - remaining;
              const progressPercentage = (used / bundle.prepaidTotalItems) * 100;
              const savings = getSavingsPercentage(bundle);

              return (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg text-neutral-900 dark:text-white">
                            {bundle.title}
                          </h4>
                          <div className="px-2 py-1 rounded-full bg-accent-green/20 text-accent-green text-xs font-medium">
                            Save {savings}%
                          </div>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                          {bundle.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-neutral-600 dark:text-neutral-400">
                              {remaining} items remaining
                            </span>
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {used} of {bundle.prepaidTotalItems} used
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary-500 to-accent-green rounded-full transition-all duration-500"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {remaining}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                              Remaining
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                              £{bundle.perItemPrice.toFixed(2)}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                              Per Item
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent-green">
                              £{(remaining * bundle.perItemPrice).toFixed(2)}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                              Total Value
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar className="w-4 h-4" />
                          <span>Expires in 6 months</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm font-medium">
                            Use Now
                          </button>
                          <button className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
            <Gift className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
            No Prepaid Bundles Yet
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-6">
            You don't have any prepaid bundles. Purchase bundles to save on future orders and enjoy exclusive benefits.
          </p>
          <button className="btn-primary px-6 py-3 rounded-xl font-semibold">
            Browse Bundles
          </button>
        </div>
      )}

      {/* Benefits Section */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-600/10 border border-primary-200 dark:border-primary-900/30">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
            Benefits of Prepaid Bundles
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Save money and enjoy exclusive perks with our prepaid bundle system
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="inline-flex p-3 rounded-xl bg-accent-green/20 text-accent-green mb-4">
              <Percent className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
              Save Up to 30%
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Significant discounts compared to regular pricing
            </p>
          </div>

          <div className="text-center p-4">
            <div className="inline-flex p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
              Priority Service
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Faster processing and priority time slots
            </p>
          </div>

          <div className="text-center p-4">
            <div className="inline-flex p-3 rounded-xl bg-accent-blue/20 text-accent-blue mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
              Flexible Usage
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Use anytime within 12 months, no expiration pressure
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-600 text-white max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <Gift className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Ready to Save More?
          </h3>
          <p className="opacity-90 mb-6 max-w-md">
            Purchase new prepaid bundles and enjoy exclusive discounts on your laundry services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-xl font-semibold transition-colors">
              View All Bundles
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors border border-white/30">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrepaidBalance;