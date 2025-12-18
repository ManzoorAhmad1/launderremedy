"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  ShoppingBag,
  User,
  CreditCard,
  CheckCircle,
  Truck,
  Package,
  Sparkles,
  ChevronRight
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setStep, setStepByValue, clearData } from "@/redux/features/orderSlice";
import CollectionDelivery from "@/components/place-order/CollectionDelivery";
import CategoryList from "@/components/place-order/CategoryList";
import ContactInfoForm from "@/components/place-order/ContactInfoForm";
import PaymentForm from "@/components/place-order/PaymentForm";
import OrderInfo from "@/components/place-order/OrderInfo";
import FindAddress from "@/components/place-order/FindAddress";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const steps = [
  { id: 1, title: "Address", icon: MapPin },
  { id: 2, title: "Schedule", icon: Calendar },
  { id: 3, title: "Services", icon: ShoppingBag },
  { id: 4, title: "Contact", icon: User },
  { id: 5, title: "Payment", icon: CreditCard },
  { id: 6, title: "Complete", icon: CheckCircle },
];

export default function PlaceOrderPage() {
  const [state, setState] = useState({});
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [counters, setCounters] = useState<number[]>([]);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const step = useSelector((state: any) => state.order.step);
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    dispatch(setStepByValue(1));
    dispatch(clearData());
  }, [dispatch]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <FindAddress state={state} setState={setState} />;
      case 2:
        return <CollectionDelivery state={state} setState={setState} />;
      case 3:
        return <CategoryList state={state} setState={setState} />;
      case 4:
        return <ContactInfoForm state={state} setState={setState} />;
      case 5:
        return (
          <Elements stripe={stripePromise}>
            <PaymentForm setElements={setElements} setStripe={setStripe} />
          </Elements>
        );
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-green/20 text-accent-green mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              Thank you for your order. We'll contact you shortly with updates and tracking information.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-primary px-8 py-3 rounded-xl text-lg font-semibold"
            >
              View Dashboard
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 group transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2">
                Place Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Order</span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Simple steps to get your laundry done professionally
              </p>
            </div>
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Eco-friendly & Professional
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 z-0">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-600 transition-all duration-500"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            
            <div className="relative flex justify-between z-10">
              {steps.map((stepItem, index) => {
                const isActive = step === stepItem.id;
                const isCompleted = step > stepItem.id;
                const Icon = stepItem.icon;
                
                return (
                  <motion.div
                    key={stepItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-accent-green text-white shadow-md' 
                        : isActive
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-white dark:bg-neutral-800 text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`
                      text-sm font-medium transition-colors
                      ${isCompleted || isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-500 dark:text-neutral-400'
                      }
                    `}>
                      {stepItem.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Order Summary */}
            <div className="lg:hidden mt-8">
              <OrderInfo
                state={state}
                counters={counters}
                setCounters={setCounters}
              />
            </div>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 hidden lg:block"
          >
            <OrderInfo
              state={state}
              counters={counters}
              setCounters={setCounters}
            />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        {step < 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-600/5 border border-primary-200 dark:border-primary-900/30">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                  <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">
                    Free Collection & Delivery
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Professional service at your doorstep
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-accent-green" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  Minimum order: <span className="font-semibold">£20</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}