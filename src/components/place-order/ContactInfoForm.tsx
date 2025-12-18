"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Shield,
  Briefcase,
  CheckCircle,
  Bell,
  CreditCard,
  Star
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import authService from "@/services/auth.service";
import { setLoader } from "@/redux/features/userSlice";
import { Button } from "../ui/button";

interface ContactInfoFormProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  type?: string;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ 
  state, 
  setState, 
  type = "" 
}) => {
  const [timeOut, setTimeOut] = useState<NodeJS.Timeout>();
  
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const isLogin = useSelector((state: any) => state.user.isLogin);
  const isLoading = useSelector((state: any) => state.user.isLoading);

  useEffect(() => {
    dispatch(setLoader(false));
    
    if (user) {
      setState((prev: any) => ({
        ...prev,
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone_number || "",
      }));
    }

    const checkEmail = async () => {
      if (type !== "profile" && state?.email && !isLogin) {
        try {
          const response = await authService.isEmailTaken({ email: state?.email });
          // Handle response as in original code
        } catch (error) {
          console.error("Email check failed:", error);
        }
      }
    };

    const timeout = setTimeout(checkEmail, 1000);
    setTimeOut(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [state?.email, type, isLogin, user, dispatch, setState]);

  const handleChange = ({ target: { name, value } }: any) => {
    if (name === "individual") {
      setState((prev: any) => ({ ...prev, [name]: value, company: false }));
    }
    if (name === "company") {
      setState((prev: any) => ({ ...prev, [name]: value, individual: false }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      {type !== "profile" && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-4">
            <User className="w-4 h-4 mr-2" />
            STEP 4: CONTACT INFORMATION
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
            How can we <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">contact</span> you?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We need your contact information to keep you updated about your order and delivery.
          </p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        {/* Customer Type Selection */}
        {type !== "profile" && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
              Are you ordering as an individual or company?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: "individual", value: true } })}
                className={`
                  flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300
                  ${state?.individual
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg
                  ${state?.individual
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                  }
                `}>
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className={`
                    font-semibold block
                    ${state?.individual
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-900 dark:text-white'
                    }
                  `}>
                    Individual
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Personal use
                  </span>
                </div>
                {state?.individual && (
                  <CheckCircle className="w-5 h-5 text-accent-green" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleChange({ target: { name: "company", value: true } })}
                className={`
                  flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300
                  ${state?.company
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg
                  ${state?.company
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                  }
                `}>
                  <Building className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className={`
                    font-semibold block
                    ${state?.company
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-900 dark:text-white'
                    }
                  `}>
                    Company
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Business account
                  </span>
                </div>
                {state?.company && (
                  <CheckCircle className="w-5 h-5 text-accent-green" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                defaultValue={user?.first_name || ""}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onChange={(e) => setState((prev: any) => ({ 
                  ...prev, 
                  first_name: e.target.value 
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                defaultValue={user?.last_name || ""}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onChange={(e) => setState((prev: any) => ({ 
                  ...prev, 
                  last_name: e.target.value 
                }))}
              />
            </div>
          </div>

          {/* Company Fields (if selected) */}
          {state?.company && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Enter company name"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={(e) => setState((prev: any) => ({ 
                    ...prev, 
                    company_name: e.target.value 
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Tax Number (VAT)
                </label>
                <input
                  type="text"
                  name="tax_number"
                  placeholder="Enter company tax number"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={(e) => setState((prev: any) => ({ 
                    ...prev, 
                    tax_number: e.target.value 
                  }))}
                />
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Phone Number
            </label>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-32">
                <div className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white">
                  +44 (UK)
                </div>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                defaultValue={user?.phone_number || ""}
                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onChange={(e) => setState((prev: any) => ({ 
                  ...prev, 
                  phone: e.target.value 
                }))}
              />
            </div>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              We'll use this to contact you about your order
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              defaultValue={user?.email || ""}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onChange={(e) => setState((prev: any) => ({ 
                ...prev, 
                email: e.target.value 
              }))}
            />
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Order confirmations and updates will be sent here
            </p>
          </div>

          {/* Update Button for Profile */}
          {type === "profile" && (
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                width="full"
                // type="primary"
                loading={isLoading}
                className="h-12 text-lg font-semibold rounded-xl"
                onClick={() => {
                  // Handle profile update logic here
                }}
              >
                Update Profile
              </Button>
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-accent-blue/5 to-accent-green/5 border border-accent-blue/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent-blue/20 text-accent-blue">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                Your Privacy Matters
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                We respect your privacy and will only use your contact information for order-related communications. 
                Your data is protected by our privacy policy and will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Account Benefits */}
        {type !== "profile" && !isLogin && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-600/10 border border-primary-200 dark:border-primary-900/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-sm">
                <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                  Create an Account for Better Experience
                </h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                    Save your preferences for faster checkout
                  </li>
                  <li className="flex items-center">
                    <Bell className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                    Track all your orders in one place
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                    Get exclusive offers and discounts
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                    Manage prepaid bundles easily
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContactInfoForm;