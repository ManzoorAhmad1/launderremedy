"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  Package,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Clock,
  Home,
  MapPin,
  Calendar,
  User,
  CreditCard,
  Menu,
  X,
  Phone,
  Mail,
  Shield
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setStep, setStepByValue, clearData, setOrderData, setSelectedServicesListFull } from "@/lib/features/orderSlice";
import { setLoader, setUser } from "@/lib/features/userSlice";
import { getSelectionDetails, getDeliveryDetails } from "@/lib/features/orderSlice";
import CollectionDelivery from "@/components/place-order/CollectionDelivery";
import CategoryList from "@/components/place-order/CategoryList";
import ContactInfoForm from "@/components/place-order/ContactInfoForm";
import PaymentForm from "@/components/place-order/PaymentForm";
import OrderInfo from "@/components/place-order/OrderInfo";
import FindAddress from "@/components/place-order/FindAddress";
import CheckboxWithTerms from "@/components/ui/acceptTerms";
import { orderApi, paymentApi } from "@/api";
import { getCookie } from "@/utils/helpers";
import toast from "react-hot-toast";
import { CardNumberElement } from "@stripe/react-stripe-js";

// Lazily resolve Stripe publishable key from env or backend config
let initialStripePromise: any = null;
const envKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (envKey && !envKey.includes('REPLACE_ME')) {
  initialStripePromise = loadStripe(envKey);
}

export default function PlaceOrderPage() {
  const [state, setState] = useState<any>({});
  const [stripePromise, setStripePromise] = useState<any>(initialStripePromise);
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [counters, setCounters] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileStepper, setShowMobileStepper] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [mobileTermsChecked, setMobileTermsChecked] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const step = useSelector((state: any) => state.order.step);
  const user = useSelector((state: any) => state.user.user);
  const selectedServicesList = useSelector((state: any) => state.order.selectedServicesList);
  const orderDetail = useSelector((state: any) => state.order.orderDetail);

  const CART_STORAGE_KEY = 'launderremedy-cart';

  // Check device type
  useEffect(() => {
    // Resolve Stripe key if not provided via env
    (async () => {
      try {
        if (!stripePromise) {
          const cfg:any = await paymentApi.getStripeConfig();
          const pk = (cfg && (cfg.publishableKey || cfg.data?.publishableKey)) as string | undefined;
          if (pk) {
            const sp = await loadStripe(pk);
            setStripePromise(sp);
          } else {
            toast.error("Stripe is not configured. Please add a publishable key.");
          }
        }
      } catch (err) {
        toast.error("Unable to load Stripe configuration.");
      }
    })();
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Countdown timer
  useEffect(() => {
    if (step > 0 && step < 6 && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeRemaining]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        // setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Try to restore order progress from localStorage
    const savedOrderData = localStorage.getItem('order_in_progress');
    if (savedOrderData) {
      try {
        const parsedData = JSON.parse(savedOrderData);
        
        // Restore order details if present
        if (parsedData.orderDetail && Object.keys(parsedData.orderDetail).length > 0) {
          dispatch(setOrderData(parsedData.orderDetail));
          setState(parsedData.orderDetail);
        }
        
        // Restore selected services if present
        if (parsedData.selectedServicesList && parsedData.selectedServicesList.length > 0) {
          dispatch(setSelectedServicesListFull(parsedData.selectedServicesList));
        }
        
        // Restore step if greater than 1
        if (parsedData.step && parsedData.step > 1) {
          dispatch(setStepByValue(parsedData.step));
        } else {
          dispatch(setStepByValue(1));
        }
      } catch (error) {
        console.error('Failed to load saved order:', error);
        dispatch(setStepByValue(1));
      }
    } else {
      dispatch(setStepByValue(1));
    }

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
    
    // Dispatch API calls to fetch collection and delivery slots
    Promise.all([
      dispatch(getSelectionDetails(new Date().toISOString()) as any),
      dispatch(getDeliveryDetails(formattedDate) as any)
    ]).then(() => {
      console.log('Collection and delivery data loaded');
    }).catch((error) => {
      console.error('Error loading collection/delivery data:', error);
    });
  }, [dispatch]);

  // Save order progress to localStorage whenever critical data changes
  useEffect(() => {
    if (step > 0 && step < 6) {
      const orderProgress = {
        step,
        orderDetail: state || orderDetail,
        selectedServicesList,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('order_in_progress', JSON.stringify(orderProgress));
    }
  }, [step, state, orderDetail, selectedServicesList]);

  const handleNext = async () => {
    // Validate current step before proceeding
    if (!canProceed()) {
      if (step === 3) {
        toast.error('Please select at least one service to continue', {
          duration: 3000,
          icon: '📦',
        });
      } else if (step === 5) {
        toast.error('Please enter valid payment details', {
          duration: 3000,
          icon: '💳',
        });
      }
      return;
    }

    // Check if user is logged in before proceeding to payment
    if (step === 4) {
      const token = getCookie('user_token');
      if (!token || !user || !user._id) {
        toast.error('Please login or signup to continue', {
          duration: 4000,
          icon: '🔐',
        });
        // Save current order data to localStorage
        localStorage.setItem('pending_order', JSON.stringify({
          orderDetail,
          selectedServicesList,
          step: 4
        }));
        return;
      }
    }
    
    if (step === 5) {
      await handlePaymentAndCreateOrder();
    } else if (step < 6) {
      dispatch(setStep());
      if (state) {
        dispatch(setOrderData(state));
      }
      
      // Smooth scroll to top of content area
      setTimeout(() => {
        const contentElement = document.querySelector('.place-order-content');
        if (contentElement) {
          contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handlePaymentAndCreateOrder = async () => {
    try {
      // Recheck user login
      if (!user || !user._id) {
        toast.error('Please login to complete your order');
        return;
      }

      // Validate services selected
      if (!selectedServicesList || selectedServicesList.length === 0) {
        toast.error('Please select at least one service');
        dispatch(setStepByValue(3)); // Go back to services step
        return;
      }

      // Validate at least one service has quantity > 0
      const hasValidQuantity = selectedServicesList.some((service: any) => 
        service.quantity && service.quantity > 0
      );
      if (!hasValidQuantity) {
        toast.error('Please add quantity to at least one service');
        dispatch(setStepByValue(3)); // Go back to services step
        return;
      }

      // Create SetupIntent for saving card (Auth now, Charge later)
      let paymentMethodId = '';
      let setupIntentResponse: any = null;

      if (elements && stripe) {
        dispatch(setLoader(true));
        
        // 1. Get SetupIntent Secret from Backend
        try {
          setupIntentResponse = await paymentApi.createSetupIntent();
        } catch (error) {
           console.error('Setup Intent Error:', error);
           dispatch(setLoader(false));
           toast.error('Failed to initialize payment setup');
           return;
        }

        if (setupIntentResponse?.success && setupIntentResponse?.client_secret) {
          const cardElement = elements.getElement(CardNumberElement);
          if (!cardElement) {
             dispatch(setLoader(false));
             return;
          }
          
          // 2. Confirm Card Setup with Stripe (Frontend side)
          // Construct billing details with fallbacks
          const firstName = orderDetail?.first_name || user?.first_name || state?.first_name || '';
          const lastName = orderDetail?.last_name || user?.last_name || state?.last_name || '';
          const email = orderDetail?.email || user?.email || state?.email || '';
          const fullName = (firstName && lastName) ? `${firstName} ${lastName}` : (user?.name || 'Valued Customer');

          const { setupIntent, error } = await stripe.confirmCardSetup(
            setupIntentResponse.client_secret,
            {
              payment_method: {
                card: cardElement,
                billing_details: {
                  name: fullName,
                  email: email
                }
              }
            }
          );
          
          if (error) {
            dispatch(setLoader(false));
            toast.error(error.message || 'Card setup failed');
            return;
          }
          
          paymentMethodId = setupIntent.payment_method as string;
        }
      }

      if (!paymentMethodId) {
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
              orderId: "pending"
            });
          }
        });
      }

      const totalPrice = orderPrice < 20 ? 20 : orderPrice;

      // Check if user is eligible for first-time 25% discount
      const isFirstTimeUser = !user?.first_order_discount_used;
      const discountPercentage = isFirstTimeUser ? 25 : 0;
      const discountAmount = isFirstTimeUser ? (totalPrice * 0.25) : 0;
      const finalTotalPrice = isFirstTimeUser ? (totalPrice - discountAmount) : totalPrice;

      // Prepare order data
      const orderData = {
        ...orderDetail,
        totalPrice: finalTotalPrice.toFixed(2),
        orderPrice: totalPrice.toFixed(2),
        discount: discountAmount.toFixed(2),
        discountPercentage,
        isFirstOrder: isFirstTimeUser,
        serviceFee,
        bundles: prepaidBundles,
        payment_done: false,
        payment_method_id: paymentMethodId,
        stripe_customer_id: setupIntentResponse?.customer_id || null,
        address: orderDetail?.address,
        postcode: orderDetail?.address?.postal_code || orderDetail?.postcode || '',
        frequency: orderDetail?.frequency?.toLowerCase() || 'just once',
        collection_date: orderDetail?.collection_day?.timestamp || orderDetail?.collection_day?.value?.trim(),
        collection_time: orderDetail?.collection_time?.start || orderDetail?.collection_time?.value?.trim(),
        delivery_date: orderDetail?.delivery_day?.timestamp || orderDetail?.delivery_day?.value?.trim(),
        delivery_time: orderDetail?.delivery_time?.start || orderDetail?.delivery_time?.value?.trim(),
        driver_instructions_collection_time: orderDetail?.driver_instructions_collection_time || '',
        driver_instructions_delivery_time: orderDetail?.driver_instructions_delivery_time || '',
        phone_number: orderDetail?.phone || user?.phone_number || '',
        first_name: orderDetail?.first_name || user?.first_name || '',
        last_name: orderDetail?.last_name || user?.last_name || '',
        email: orderDetail?.email || user?.email || '',
        selected_services: selectedServicesList.map((service: any) => ({
          category: service.categoryTitle || service.category || 'Unknown',
          subcategory: service.title || service.name,
          quantity: service.quantity || 1,
          price: parseFloat(service.price),
        })),
      };

      // Create order using real API
      const response:any = await orderApi.createOrder(orderData);

      if (response?.success && response?.data) {
        const orderId = response.data._id || response.data.orderId;
        
        // Card is already saved via SetupIntent above.
        // Payment will be processed by Admin later using the saved payment_method_id.
        // No immediate charge here.

        // Update user in Redux if backend sent updated user
        if (response?.updatedUser) {
          dispatch(setUser({ 
            user: response.updatedUser, 
            isLogin: true, 
            token: getCookie('user_token') || '' 
          }));
        }

        dispatch(setLoader(false));
        dispatch(setStep());
        toast.success('Order placed successfully! 🎉', {
          duration: 4000,
        });

        // Clear all order data from localStorage
        localStorage.removeItem('pending_order');
        localStorage.removeItem('order_in_progress');

        setTimeout(() => {
          router.push("/");
          dispatch(setStepByValue(1));
          dispatch(clearData());
        }, 2000);
      }
    } catch (error: any) {
      dispatch(setLoader(false));
      const errorMsg = error?.message || 'Failed to place order';
      toast.error(errorMsg);
      console.error('Order creation error:', error);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return state?.address || orderDetail?.address;
      case 2:
        return state?.collection_day && state?.delivery_day;
      case 3:
        // Ensure at least one service is selected with quantity > 0
        if (!selectedServicesList || selectedServicesList.length === 0) {
          return false;
        }
        // Check if at least one service has quantity greater than 0
        const hasValidService = selectedServicesList.some((service: any) => 
          service.quantity && service.quantity > 0
        );
        return hasValidService;
      case 4:
        return state?.first_name && state?.last_name && state?.email && state?.phone;
      case 5:
        // Basic validation for payment step
        if (isMobile && !mobileTermsChecked) return false;
        return elements !== null && stripe !== null;
      default:
        return false;
    }
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <MapPin className="w-4 h-4 md:w-5 md:h-5" />;
      case 2: return <Calendar className="w-4 h-4 md:w-5 md:h-5" />;
      case 3: return <Package className="w-4 h-4 md:w-5 md:h-5" />;
      case 4: return <User className="w-4 h-4 md:w-5 md:h-5" />;
      case 5: return <CreditCard className="w-4 h-4 md:w-5 md:h-5" />;
      default: return <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return "Address";
      case 2: return "Collection & Delivery";
      case 3: return "Services";
      case 4: return "Contact Info";
      case 5: return "Payment";
      default: return "Complete";
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
        // If user is logged in, auto-skip to payment
        if (user && user._id) {
          dispatch(setStepByValue(5));
          return null;
        }
        return <ContactInfoForm state={state} setState={setState} />;
      case 5:
        return stripePromise ? (
          <Elements stripe={stripePromise}>
            <PaymentForm setElements={setElements} setStripe={setStripe} />
          </Elements>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <h3 className="text-xl font-semibold">Payment temporarily unavailable</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Stripe configuration missing. Please try again later.</p>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 md:py-8 lg:py-16 px-4"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-accent-green/20 text-accent-green mb-4 lg:mb-6">
              <CheckCircle className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-3 lg:mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6 lg:mb-8 max-w-md mx-auto px-2">
              Thank you for your order. We'll contact you shortly with updates and tracking information.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 inline-flex items-center gap-2 text-sm md:text-base"
            >
              View Dashboard
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Mobile Stepper Button */}
        {(isMobile || isTablet) && step < 6 && (
          <button
            onClick={() => setShowMobileStepper(!showMobileStepper)}
            className="fixed top-16 md:top-20 right-3 md:right-4 z-50 p-2 md:p-3 rounded-full bg-primary-600 text-white shadow-lg lg:hidden"
          >
            {showMobileStepper ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
          </button>
        )}

        {/* Mobile Order Summary Toggle Button */}
        {isMobile && step < 6 && (
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="fixed top-16 left-3 z-50 p-2 rounded-full bg-secondary-600 text-white shadow-lg lg:hidden"
          >
            <Package className="w-4 h-4" />
          </button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-6 lg:mb-8"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 group transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {(isMobile || isTablet) && step < 6 && (
              <div className="text-right">
                <div className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium border border-amber-200 dark:border-amber-700">
                  <Clock className="w-3 h-3 mr-1 animate-pulse" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3 lg:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 dark:text-white mb-1 md:mb-2">
                Place Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Order</span>
              </h1>
              <p className="text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 max-w-lg">
                Simple steps to get your laundry done professionally
              </p>
            </div>

            <div className="flex flex-col gap-2 md:gap-3 mt-2 md:mt-0">
              {!isMobile && (
                <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 lg:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-xs md:text-sm font-medium">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  <span className="hidden sm:inline">Eco-friendly & Professional</span>
                  <span className="sm:hidden">Eco-friendly</span>
                </div>
              )}

              {!isMobile && step > 0 && step < 6 && timeRemaining > 0 && (
                <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 lg:py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs md:text-sm font-medium border border-amber-200 dark:border-amber-700">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 animate-pulse" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                  <span className="ml-1 hidden md:inline">remaining</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Mobile Stepper Overlay */}
        {(isMobile || isTablet) && showMobileStepper && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 md:top-20 bg-white dark:bg-neutral-800 shadow-xl z-40 lg:hidden"
          >
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base md:text-lg text-neutral-900 dark:text-white">Order Steps</h3>
                <button
                  onClick={() => setShowMobileStepper(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                {[1, 2, 3, 4, 5].map((stepNum) => (
                  <button
                    key={stepNum}
                    onClick={() => {
                      dispatch(setStepByValue(stepNum));
                      setShowMobileStepper(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      step === stepNum
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400'
                        : step > stepNum
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-neutral-50 dark:bg-neutral-900/20 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step === stepNum
                        ? 'bg-primary-600 text-white'
                        : step > stepNum
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                    }`}>
                      {step > stepNum ? <CheckCircle className="w-4 h-4" /> : getStepIcon(stepNum)}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-medium text-sm">Step {stepNum}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{getStepTitle(stepNum)}</div>
                    </div>
                    {stepNum === step && (
                      <ChevronRight className="w-4 h-4 ml-2 text-primary-600 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Form Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${isTablet ? 'col-span-2' : 'lg:col-span-2'} place-order-content`}
          >
            {/* Mobile Step Indicator */}
            {(isMobile || isTablet) && step < 6 && (
              <div className="mb-3 md:mb-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-3 md:p-4 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                      canProceed() 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                    }`}>
                      {getStepIcon(step)}
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">Step {step} of 5</div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">{getStepTitle(step)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMobileStepper(true)}
                    className="text-primary-600 text-xs md:text-sm font-medium px-2 py-1 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  >
                    View all
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-neutral-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700">
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
                  className="flex items-center justify-between mt-6 md:mt-8 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-700"
                >
                  {step > 1 ? (
                    <button
                      onClick={() => dispatch(setStepByValue(step - 1))}
                      className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3 rounded-lg md:rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm md:text-base"
                    >
                      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden xs:inline">Back</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {/* Hide Continue/Place Order on desktop step 5 — sidebar button handles it */}
                  {(step < 5 || isMobile || isTablet) && (
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`
                        inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap
                        ${canProceed()
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {step === 5 ? 'Place Order' : 'Continue'}
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Mobile/Tablet Order Summary */}
            {(isMobile || isTablet) && step < 6 && (
              <AnimatePresence>
                {(showOrderSummary || isTablet) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`mt-4 md:mt-6 ${isMobile ? 'fixed inset-x-4 bottom-20 z-40' : ''}`}
                  >
                    {isMobile && (
                      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 max-h-[60vh] overflow-y-auto">
                        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Order Summary</h3>
                            <button
                              onClick={() => setShowOrderSummary(false)}
                              className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <OrderInfo
                            state={state}
                            counters={counters}
                            setCounters={setCounters}
                          />
                        </div>
                      </div>
                    )}
                    {isTablet && (
                      <OrderInfo
                        state={state}
                        counters={counters}
                        setCounters={setCounters}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>

          {/* Right Column - Order Summary (Desktop) */}
          {!isMobile && !isTablet && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <OrderInfo
                state={state}
                counters={counters}
                setCounters={setCounters}
                onPlaceOrder={handleNext}
              />
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        {step < 6 && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 md:mt-8 lg:mt-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-5 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-600/5 border border-primary-200 dark:border-primary-900/30">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-0">
                <div className="p-2 md:p-2.5 lg:p-3 rounded-lg lg:rounded-xl bg-primary-100 dark:bg-primary-900/30">
                  <Truck className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">
                    Free Collection & Delivery
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                    Professional service at your doorstep
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Package className="w-3 h-3 md:w-4 md:h-4 text-accent-green" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  Minimum order: <span className="font-semibold">£20</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile Bottom Bar */}
        {isMobile && step < 6 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 shadow-2xl z-50">
            {/* Terms checkbox — only at payment step */}
            {step === 5 && (
              <div className="px-4 pt-3 pb-1">
                <CheckboxWithTerms
                  type="terms"
                  handleCheckboxChange={() => setMobileTermsChecked(!mobileTermsChecked)}
                  isChecked={mobileTermsChecked}
                />
              </div>
            )}
            {/* Price row */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Order Total</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-primary-600 dark:text-primary-400">
                  £{(selectedServicesList && selectedServicesList.length > 0
                    ? selectedServicesList.reduce((total: number, service: any) => {
                        const price = typeof service.price === 'string' ? parseFloat(service.price) : service.price;
                        const quantity = service.quantity || 0;
                        return total + (price * quantity);
                      }, 0)
                    : 0
                  ).toFixed(2)}
                </span>
                <button
                  onClick={() => setShowOrderSummary(true)}
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                >
                  <Package className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Action row */}
            <div className="flex items-center gap-2 px-4 py-3">
              {step > 1 && (
                <button
                  onClick={() => dispatch(setStepByValue(step - 1))}
                  className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium text-sm shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`
                  flex-1 py-2.5 rounded-xl font-semibold transition-all text-sm
                  ${canProceed()
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                  }
                `}
              >
                {step === 5 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </div>
        )}

        {/* Tablet Contact Info */}
        {isTablet && step < 6 && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-900/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <Phone className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Need Help?</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Call us: +44 123 456 7890</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Secure Payment</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">SSL encrypted & secure</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}