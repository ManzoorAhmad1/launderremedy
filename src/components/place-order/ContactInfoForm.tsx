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
  Star,
  Eye,
  EyeOff,
  Lock,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import authService from "@/services/auth.service";
import { setLoader } from "@/lib/features/userSlice";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordSuggestions, setPasswordSuggestions] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showPasswordTips, setShowPasswordTips] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const isLogin = useSelector((state: any) => state.user.isLogin);
  const isLoading = useSelector((state: any) => state.user.isLoading);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Validate password strength
  const validatePassword = (password: string) => {
    const errors = [];
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;
    else errors.push("At least 8 characters");

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    else errors.push("One lowercase letter");

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    else errors.push("One uppercase letter");

    // Number check
    if (/\d/.test(password)) strength += 1;
    else errors.push("One number");

    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 1;
    else errors.push("One special character");

    setPasswordStrength(strength);
    setPasswordSuggestions(errors);
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prev: any) => ({ 
      ...prev, 
      password: value 
    }));
    
    validatePassword(value);
    
    // Clear confirm password error if passwords match
    if (state.confirm_password === value) {
      setPasswordError("");
    }
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prev: any) => ({ 
      ...prev, 
      confirm_password: value 
    }));
    
    if (state.password !== value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleChange = ({ target: { name, value } }: any) => {
    if (name === "individual") {
      setState((prev: any) => ({ ...prev, [name]: value, company: false }));
    }
    if (name === "company") {
      setState((prev: any) => ({ ...prev, [name]: value, individual: false }));
    }
  };

  // Get password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "text-red-500";
    if (passwordStrength === 3) return "text-yellow-500";
    return "text-green-500";
  };

  // Get password strength text
  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 md:space-y-8 px-3 sm:px-0"
    >
      {/* Header */}
      {type !== "profile" && (
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-xs md:text-sm font-medium mb-3 md:mb-4">
            <User className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
            STEP 4: CONTACT INFORMATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2 md:mb-3">
            How can we <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">contact</span> you?
          </h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-2 sm:px-0">
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
          <div className="mb-6 md:mb-8">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 md:mb-4">
              Are you ordering as an individual or company?
            </label>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: "individual", value: true } })}
                className={`
                  flex items-center justify-between sm:justify-center gap-3 p-3 md:p-4 rounded-lg md:rounded-xl border transition-all duration-300
                  ${state?.individual
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                `}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`
                    p-1.5 md:p-2 rounded-lg
                    ${state?.individual
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                    }
                  `}>
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <span className={`
                      font-semibold block text-sm md:text-base
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
                </div>
                {state?.individual && (
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent-green flex-shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleChange({ target: { name: "company", value: true } })}
                className={`
                  flex items-center justify-between sm:justify-center gap-3 p-3 md:p-4 rounded-lg md:rounded-xl border transition-all duration-300
                  ${state?.company
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                `}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`
                    p-1.5 md:p-2 rounded-lg
                    ${state?.company
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                    }
                  `}>
                    <Building className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <span className={`
                      font-semibold block text-sm md:text-base
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
                </div>
                {state?.company && (
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent-green flex-shrink-0" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4 md:space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                defaultValue={user?.first_name || ""}
                className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                onChange={(e) => setState((prev: any) => ({ 
                  ...prev, 
                  first_name: e.target.value 
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                defaultValue={user?.last_name || ""}
                className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                onChange={(e) => setState((prev: any) => ({ 
                  ...prev, 
                  last_name: e.target.value 
                }))}
              />
            </div>
          </div>

          {/* Company Fields (if selected) */}
          {state?.company && (
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Enter company name"
                  className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                  onChange={(e) => setState((prev: any) => ({ 
                    ...prev, 
                    company_name: e.target.value 
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
                  Tax Number (VAT)
                </label>
                <input
                  type="text"
                  name="tax_number"
                  placeholder="Enter company tax number"
                  className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
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
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
              Phone Number
            </label>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <div className="w-full sm:w-32">
                <div className="px-4 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white text-sm md:text-base">
                  +44 (UK)
                </div>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                defaultValue={user?.phone_number || ""}
                className="flex-1 px-4 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                onChange={(e) => setState((prev: any) => ({ 
                  ...prev, 
                  phone: e.target.value 
                }))}
              />
            </div>
            <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
              We'll use this to contact you about your order
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              defaultValue={user?.email || ""}
              className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
              onChange={(e) => setState((prev: any) => ({ 
                ...prev, 
                email: e.target.value 
              }))}
            />
            <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
              Order confirmations and updates will be sent here
            </p>
          </div>

          {/* Password Fields - Only show if not logged in and not in profile mode */}
          {!isLogin && type !== "profile" && (
            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Password
                  </label>
                  {state.password && (
                    <span className={`text-xs md:text-sm font-medium ${getPasswordStrengthColor()}`}>
                      {getPasswordStrengthText()}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a secure password"
                    className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                    value={state.password || ""}
                    onChange={handlePasswordChange}
                  />
                  <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-neutral-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {state.password && (
                  <div className="mt-2 md:mt-3">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                      <div className="flex-1 h-1.5 md:h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            passwordStrength <= 2 ? 'bg-red-500' : 
                            passwordStrength === 3 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {passwordStrength}/5
                      </span>
                    </div>
                    
                    {/* Password suggestions - Collapsible on mobile */}
                    {passwordSuggestions.length > 0 && (
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setShowPasswordTips(!showPasswordTips)}
                          className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 md:hidden"
                        >
                          <Info className="w-3 h-3" />
                          View password requirements
                          {showPasswordTips ? (
                            <ChevronUp className="w-3 h-3 ml-1" />
                          ) : (
                            <ChevronDown className="w-3 h-3 ml-1" />
                          )}
                        </button>
                        
                        <div className={`${isMobile && !showPasswordTips ? 'hidden' : ''}`}>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Your password should include:
                          </p>
                          <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1 pl-3 md:pl-4 mt-1">
                            {passwordSuggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-1.5 mt-0.5">•</span>
                                <span className="flex-1">{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Re-enter your password"
                    className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 rounded-lg md:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                    value={state.confirm_password || ""}
                    onChange={handleConfirmPasswordChange}
                  />
                  <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-neutral-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1.5 text-xs md:text-sm text-red-500">{passwordError}</p>
                )}
                {state.confirm_password && !passwordError && state.password === state.confirm_password && (
                  <p className="mt-1.5 text-xs md:text-sm text-green-500 flex items-center">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
                    Passwords match
                  </p>
                )}
              </div>
              
              {/* Password requirements summary */}
              <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 md:mb-2">
                  Password Requirements:
                </p>
                <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    At least 8 characters long
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    Contains uppercase and lowercase letters
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    Includes at least one number
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    Contains at least one special character
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Update Button for Profile */}
          {type === "profile" && (
            <div className="pt-4 md:pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                width="full"
                loading={isLoading}
                className="h-10 md:h-12 text-sm md:text-lg font-semibold rounded-lg md:rounded-xl"
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
        <div className="mt-6 md:mt-8 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-r from-accent-blue/5 to-accent-green/5 border border-accent-blue/20">
          <div className="flex items-start gap-2.5 md:gap-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-accent-blue/20 text-accent-blue flex-shrink-0">
              <Shield className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1 text-sm md:text-base">
                Your Privacy Matters
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                We respect your privacy and will only use your contact information for order-related communications. 
                Your data is protected by our privacy policy and will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Account Benefits */}
        {type !== "profile" && !isLogin && (
          <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-600/10 border border-primary-200 dark:border-primary-900/30">
            <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white dark:bg-neutral-800 shadow-sm flex-shrink-0">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base md:text-lg text-neutral-900 dark:text-white mb-2">
                  Create an Account for Better Experience
                </h4>
                <ul className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 space-y-1.5 md:space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-accent-green mr-1.5 mt-0.5 flex-shrink-0" />
                    Save your preferences for faster checkout
                  </li>
                  <li className="flex items-start">
                    <Bell className="w-3 h-3 md:w-4 md:h-4 text-accent-green mr-1.5 mt-0.5 flex-shrink-0" />
                    Track all your orders in one place
                  </li>
                  <li className="flex items-start">
                    <CreditCard className="w-3 h-3 md:w-4 md:h-4 text-accent-green mr-1.5 mt-0.5 flex-shrink-0" />
                    Get exclusive offers and discounts
                  </li>
                  <li className="flex items-start">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-accent-green mr-1.5 mt-0.5 flex-shrink-0" />
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