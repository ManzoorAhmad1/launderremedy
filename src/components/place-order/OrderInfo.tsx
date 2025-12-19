import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { 
  Plus,
  Minus,
  MapPin,
  Calendar,
  Package,
  UserCircle,
  CreditCard,
  Leaf,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

import {
  setOrderData,
  setSelectedServicesList,
  setStepByValue,
} from "@/lib/features/orderSlice";
import CheckboxWithTerms from "../ui/acceptTerms";
import { Button } from "../ui/button";

interface OrderInfoProps {
  state: any;
  counters: number[];
  setCounters: (counters: number[]) => void;
  isEdit?: boolean;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ state, counters, setCounters, isEdit = false }) => {
  const dispatch = useDispatch();
  
  const step = useSelector((state: any) => state.order.step);
  const selectedServicesList = useSelector((state: any) => state.order.selectedServicesList);
  const orderDetail = useSelector((state: any) => state.order.orderDetail);
  const user = useSelector((state: any) => state.user.user);
  
  const [isChecked, setIsChecked] = useState(false);

  const getTotalPrice = () => {
    let totalPrice = 0;
    
    selectedServicesList?.forEach((item: any) => {
      totalPrice += item?.price * item?.quantity;
    });
    
    const bundles = isEdit ? state?.bundles : user?.bundles;
    bundles?.forEach((item: any, i: number) => {
      if (counters[i] > 0) {
        totalPrice += item?.perItemPrice * counters[i];
      }
    });
    
    return totalPrice < 20 ? 20 : totalPrice;
  };

  const handleSubcategoryClick = (subcategory: any, type: string) => {
    // Implementation from your original code
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-primary-600" />
          Order Summary
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Review your selections before placing order
        </p>
      </div>

      {/* Timer Alert */}
      {step === 2 && (
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-accent-yellow/10 to-accent-yellow/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-yellow/20 text-accent-yellow">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <time className="font-bold text-neutral-900 dark:text-white">18:30</time>
                <span className="px-2 py-1 rounded-full bg-accent-yellow/20 text-accent-yellow text-xs font-medium">
                  High Demand
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Place order within 30 minutes to secure time slot
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Prepaid Bundles */}
      {step > 4 && (isEdit ? state?.bundles?.length > 0 : user?.bundles?.length > 0) && (
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 bg-accent-yellow/5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-accent-yellow" />
            <h4 className="font-semibold text-neutral-900 dark:text-white">
              {isEdit ? "Order Prepaid Bundles" : "Your Prepaid Bundles"}
            </h4>
          </div>
          
          <div className="space-y-4">
            {(isEdit ? state?.bundles : user?.bundles)?.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700">
                <div className="flex-1">
                  <p className="font-medium text-neutral-900 dark:text-white text-sm">
                    {item?.title}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Remaining: {item?.prepaidTotalItems}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newCounters = [...counters];
                        newCounters[i] = Math.max(0, (newCounters[i] || 0) - 1);
                        setCounters(newCounters);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium text-neutral-900 dark:text-white">
                      {counters[i] || 0}
                    </span>
                    
                    <button
                      onClick={() => {
                        const newCounters = [...counters];
                        const current = newCounters[i] || 0;
                        if (current < item?.prepaidTotalItems) {
                          newCounters[i] = current + 1;
                          setCounters(newCounters);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <span className="font-semibold text-primary-600 dark:text-primary-400 min-w-[60px] text-right">
                    £{(item?.perItemPrice * (counters[i] || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Steps Summary */}
      <div className="p-6 space-y-4">
        {/* Address */}
        {!isEdit && (
          <button
            onClick={() => dispatch(setStepByValue(1))}
            className="w-full text-left p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors border border-neutral-100 dark:border-neutral-700"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${orderDetail?.address ? 'bg-accent-green/20 text-accent-green' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}`}>
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-neutral-900 dark:text-white">
                    Address
                  </h4>
                  {orderDetail?.address && (
                    <CheckCircle className="w-4 h-4 text-accent-green" />
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {orderDetail?.address?.value || orderDetail?.address?.formatted_address || "Select address"}
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Collection & Delivery Times */}
        {!isEdit && (
          <button
            onClick={() => dispatch(setStepByValue(2))}
            className="w-full text-left p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors border border-neutral-100 dark:border-neutral-700"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${orderDetail?.collection_day ? 'bg-accent-green/20 text-accent-green' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}`}>
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-neutral-900 dark:text-white">
                    Collection & Delivery
                  </h4>
                  {orderDetail?.collection_day && (
                    <CheckCircle className="w-4 h-4 text-accent-green" />
                  )}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 space-y-1">
                  <p>
                    📅 {orderDetail?.collection_day?.value} at {orderDetail?.collection_time?.value}
                  </p>
                  <p>
                    📦 {orderDetail?.delivery_day?.value} at {orderDetail?.delivery_time?.value}
                  </p>
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Selected Services */}
        <button
          onClick={() => dispatch(setStepByValue(3))}
          className="w-full text-left p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors border border-neutral-100 dark:border-neutral-700"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${selectedServicesList?.length > 0 ? 'bg-accent-green/20 text-accent-green' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}`}>
              <Package className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-neutral-900 dark:text-white">
                  Selected Services
                </h4>
                {selectedServicesList?.length > 0 && (
                  <CheckCircle className="w-4 h-4 text-accent-green" />
                )}
              </div>
              
              {selectedServicesList?.length > 0 ? (
                <div className="space-y-3 mt-2">
                  {selectedServicesList.map((service: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {service.title}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          £{service.price.toFixed(2)} each
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleSubcategoryClick(service, "-");
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <span className="w-6 text-center text-sm font-medium text-neutral-900 dark:text-white">
                            {service.quantity}
                          </span>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // handleSubcategoryClick(service, "+");
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <span className="font-semibold text-primary-600 dark:text-primary-400 text-sm min-w-[60px] text-right">
                          £{(service.price * service.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  No services selected yet
                </p>
              )}
            </div>
          </div>
        </button>

        {/* Contact Info */}
        {!isEdit && (
          <button
            onClick={() => dispatch(setStepByValue(4))}
            className="w-full text-left p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors border border-neutral-100 dark:border-neutral-700"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${orderDetail?.email ? 'bg-accent-green/20 text-accent-green' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}`}>
                <UserCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-neutral-900 dark:text-white">
                    Contact Information
                  </h4>
                  {orderDetail?.email && (
                    <CheckCircle className="w-4 h-4 text-accent-green" />
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {orderDetail?.email || "Add contact details"}
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Payment */}
        {!isEdit && (
          <button
            onClick={() => dispatch(setStepByValue(5))}
            className="w-full text-left p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors border border-neutral-100 dark:border-neutral-700"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${orderDetail?.payment ? 'bg-accent-green/20 text-accent-green' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-neutral-900 dark:text-white">
                    Payment
                  </h4>
                  {orderDetail?.payment && (
                    <CheckCircle className="w-4 h-4 text-accent-green" />
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {orderDetail?.payment ? "Payment method added" : "Add payment method"}
                </p>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Total Price */}
      {step === 5 && (
        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Order Total</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                £{getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Delivery</span>
              <span className="text-accent-green font-medium">FREE</span>
            </div>
            
            {getTotalPrice() < 20 && (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-600 dark:text-neutral-400">Minimum Order Charge</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  £20.00
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-700">
              <span className="text-lg font-bold text-neutral-900 dark:text-white">Total</span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                £{getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Terms Checkbox */}
      {step > 4 && (
        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
          <CheckboxWithTerms 
            type="terms" 
            handleCheckboxChange={() => setIsChecked(!isChecked)} 
            isChecked={isChecked} 
          />
        </div>
      )}

      {/* Action Button */}
      <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
        <Button
          width="full"
        //   type={step > 5 ? "tertiary" : step > 4 && !isChecked ? "grey" : "primary"}
          disabled={step > 5 || (step > 4 && !isChecked)}
          className="h-12 text-lg font-semibold rounded-xl"
        >
          {isEdit ? "Update Order" : step > 4 ? "Place Order" : "Continue"}
        </Button>
      </div>

      {/* Sustainability Message */}
      <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-primary-500/5 to-accent-green/5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
              The Sustainable Choice
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Each time you use LaunderRemedy you help protect our environment.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderInfo;