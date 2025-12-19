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
  ChevronRight,
  ArrowRight,
  Clock
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setStep, setStepByValue, clearData, setOrderData } from "@/lib//features/orderSlice";
import { setLoader, setUser } from "@/lib/features/userSlice";
import { getSelectionDetails, getDeliveryDetails } from "@/lib/features/orderSlice";
import CollectionDelivery from "@/components/place-order/CollectionDelivery";
import CategoryList from "@/components/place-order/CategoryList";
import ContactInfoForm from "@/components/place-order/ContactInfoForm";
import PaymentForm from "@/components/place-order/PaymentForm";
import OrderInfo from "@/components/place-order/OrderInfo";
import FindAddress from "@/components/place-order/FindAddress";
import orderService from "@/services/order.service";
import toast from "react-hot-toast";
import { CardNumberElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
export default function PlaceOrderPage() {
  const [state, setState] = useState<any>({});
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [counters, setCounters] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  const dispatch = useDispatch();
  const router = useRouter();
  const step = useSelector((state: any) => state.order.step);
  console.log(step,'step')
  const user = useSelector((state: any) => state.user.user);
  const selectedServicesList = useSelector((state: any) => state.order.selectedServicesList);
  const orderDetail = useSelector((state: any) => state.order.orderDetail);

  // Timer effect
  // useEffect(() => {
  //   if (step > 0 && step < 6) {
  //     const timer = setInterval(() => {
  //       setTimeRemaining((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }
  // }, [step]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    dispatch(setStepByValue(1));
    dispatch(clearData());

    // Initialize collection and delivery dates
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    if (currentDate.getDate() === lastDayOfMonth) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      currentDate.setDate(1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const formattedDate = currentDate.toISOString();
    dispatch(getSelectionDetails(new Date().toISOString()) as any);
    dispatch(getDeliveryDetails(formattedDate) as any);
  }, [dispatch]);

  const handleNext = async () => {
    if (step === 5) {
      await handlePaymentAndCreateOrder();
    } else if (step < 6) {
      dispatch(setStep());
      if (state) {
        dispatch(setOrderData(state));
      }
    }
  };

  const handlePaymentAndCreateOrder = async () => {
    try {
      // Validate services selected
      if (!selectedServicesList || selectedServicesList.length === 0) {
        toast.error('Please select at least one service');
        return;
      }

      // Create payment token
      let paymentId = '';
      if (elements && stripe) {
        const cardElement = elements.getElement(CardNumberElement);
        if (cardElement) {
          dispatch(setLoader(true));
          const { token, error } = await stripe.createToken(cardElement);
          if (error) {
            dispatch(setLoader(false));
            toast.error(error.message || 'Payment failed');
            return;
          }
          paymentId = token.id;
        }
      }

      if (!paymentId) {
        toast.error('Please enter valid payment details');
        return;
      }

      // Calculate prices
      let prepaidBundles: any[] = [];
      let orderPrice = 0;
      let serviceFee = 0;

      selectedServicesList.forEach((service: any) => {
        orderPrice += service.price * service.quantity;
      });

      const userBundles = user?.bundles || [];
      if (userBundles.length > 0) {
        userBundles.forEach((bundle: any, i: number) => {
          if (counters[i] > 0) {
            orderPrice += bundle.perItemPrice * counters[i];
            prepaidBundles.push({
              ...bundle,
              purchasedQuantity: counters[i]
            });
          } else {
            prepaidBundles.push({
              ...bundle,
              purchasedQuantity: 0
            });
          }
        });
      } else {
        selectedServicesList.forEach((service: any) => {
          if (service?.prepaidTotalItems > 0) {
            prepaidBundles.push({
              purchasedQuantity: 0,
              prepaidTotalItems: service.prepaidTotalItems,
              remaining: service.prepaidTotalItems,
              perItemPrice: service.perItemPrice,
              id: service._id,
              title: service.title,
              description: service.description,
              orderId: "21"
            });
          }
        });
      }

      const totalPrice = orderPrice < 20 ? 20 : orderPrice;

      // Prepare order data
      const orderData = {
        ...orderDetail,
        totalPrice,
        orderPrice: totalPrice,
        serviceFee,
        payment_id: paymentId,
        bundles: prepaidBundles,
        payment_done: false,
        address: orderDetail?.address,
        frequency: orderDetail?.frequency?.toLowerCase() || 'just once',
        collection_date: orderDetail?.collection_day?.value?.trim(),
        collection_time: orderDetail?.collection_time?.value?.trim(),
        delivery_date: orderDetail?.delivery_day?.value?.trim(),
        delivery_time: orderDetail?.delivery_time?.value?.trim(),
        driver_instructions_collection_time: orderDetail?.driver_instructions_collection_time?.value?.trim() || '',
        driver_instructions_delivery_time: orderDetail?.driver_instructions_delivery_time?.value?.trim() || '',
        phone_number: orderDetail?.phone || '',
        first_name: orderDetail?.first_name || user?.first_name || '',
        last_name: orderDetail?.last_name || user?.last_name || '',
        email: orderDetail?.email || user?.email || '',
        selected_services: selectedServicesList.map((service: any) => ({
          title: service.title,
          price: parseFloat(service.price),
          description: service.description,
          quantity: service.quantity,
          bundleQuantity: service?.bundleQuantity,
          id: service?._id
        })),
      };

      // Create order
      const response = await orderService.createOrder({
        user_id: user._id,
        ...orderData,
      });

      if (response?.success) {
        // Update user bundles if any prepaid items
        const newBundles: any[] = [];
        selectedServicesList.forEach((service: any) => {
          if (service?.prepaidTotalItems > 0) {
            newBundles.push({
              prepaidTotalItems: service.prepaidTotalItems,
              remaining: service.prepaidTotalItems,
              perItemPrice: service.perItemPrice,
              id: service._id,
              title: service.title,
              description: service.description,
              orderId: response?.data?.orderId
            });
          }
        });

        if (newBundles.length > 0 && user?.type !== 'admin') {
          // Update user profile with bundles - backend handles this
        }

        if (response?.updatedUser) {
          dispatch(setUser(response.updatedUser));
        }

        dispatch(setLoader(false));
        dispatch(setStep());
        toast.success('Order placed successfully! 🎉');

        setTimeout(() => {
          router.push("/dashboard");
          dispatch(setStepByValue(1));
        }, 2000);
      }
    } catch (error: any) {
      dispatch(setLoader(false));
      toast.error(error.message || 'Failed to place order');
      console.error('Order creation error:', error);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return state?.address || orderDetail?.address;
      case 2:
        return orderDetail?.collection_day && orderDetail?.delivery_day;
      case 3:
        return selectedServicesList && selectedServicesList.length > 0;
      case 4:
        return orderDetail?.first_name && orderDetail?.last_name && orderDetail?.email && orderDetail?.phone;
      case 5:
        return true; // Payment validation will be in handlePaymentAndCreateOrder
      default:
        return false;
    }
  };
    
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
              className="btn-primary px-8 py-3 rounded-xl text-lg font-semibold inline-flex items-center gap-2"
            >
              View Dashboard
              <ArrowRight className="w-5 h-5" />
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

            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Eco-friendly & Professional
              </div>

              {step > 0 && step < 6 && timeRemaining > 0 && (
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm font-medium border border-amber-200 dark:border-amber-700">
                  <Clock className="w-4 h-4 mr-2 animate-pulse" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                  <span className="ml-1">remaining</span>
                </div>
              )}
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

              {/* Navigation Buttons */}
              {step < 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700"
                >
                  {step > 1 ? (
                    <button
                      onClick={() => dispatch(setStepByValue(step - 1))}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`
                      inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all
                      ${canProceed()
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                      }
                    `}
                  >
                    {step === 5 ? 'Place Order' : 'Continue'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
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
};