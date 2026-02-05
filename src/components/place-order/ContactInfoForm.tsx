"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  UserPlus,
  Loader2
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import authService from "@/services/auth.service";
import { setLoader, setUser } from "@/lib/features/userSlice";
import { Button } from "../ui/button";
import { setCookie } from "@/utils/helpers";

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
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'email' | 'login' | 'signup'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const isLogin = useSelector((state: any) => state.user.isLogin);

  // If user is already logged in and this is not profile page, just show their info
  useEffect(() => {
    if (isLogin && user && type !== "profile") {
      setState((prev: any) => ({
        ...prev,
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone_number || "",
      }));
    }
  }, [user, isLogin, type, setState]);

  // Check if email exists when user types
  useEffect(() => {
    const checkEmail = async () => {
      if (type !== "profile" && state?.email && !isLogin && authMode === 'email') {
        setCheckingEmail(true);
        try {
          const response = await authService.isEmailTaken({ email: state?.email });
          if (response?.data?.exists) {
            setEmailExists(true);
            setAuthMode('login');
            toast.success('Email found! Please enter your password to login.', {
              icon: '🔐',
              duration: 3000,
            });
          } else {
            setEmailExists(false);
            setAuthMode('signup');
          }
        } catch (error) {
          console.error("Email check failed:", error);
        } finally {
          setCheckingEmail(false);
        }
      }
    };

    const timeout = setTimeout(checkEmail, 1000);
    return () => clearTimeout(timeout);
  }, [state?.email, type, isLogin, authMode]);

  const handleLogin = async () => {
    if (!state?.email || !state?.password) {
      toast.error('Please enter email and password');
      return;
    }

    setIsSubmitting(true);
    dispatch(setLoader(true));

    try {
      const response = await authService.login({
        email: state.email,
        password: state.password
      });

      if (response.success) {
        const userData = response.data.user;
        const token = response.data.token;

        // Save token
        setCookie('user_token', token, 30);

        // Update Redux store with user, token, and isLogin flag
        dispatch(setUser({ user: userData, token, isLogin: true }));

        // Update form state
        setState((prev: any) => ({
          ...prev,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone_number,
        }));

        toast.success('Logged in successfully!', {
          icon: '✅',
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
      dispatch(setLoader(false));
    }
  };

  const handleSignup = async () => {
    if (!state?.email || !state?.password || !state?.first_name || !state?.last_name || !state?.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    dispatch(setLoader(true));

    try {
      const response = await authService.register({
        email: state.email,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
        phone_number: state.phone,
      });

      if (response.success) {
        const userData = response.data.user;
        const token = response.data.token;

        // Save token
        setCookie('user_token', token, 30);

        // Update Redux store with user, token, and isLogin flag
        dispatch(setUser({ user: userData, token, isLogin: true }));

        toast.success('Account created successfully!', {
          icon: '🎉',
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
      dispatch(setLoader(false));
    }
  };

  // If user is logged in, show simple info display
  if (isLogin && type !== "profile") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 md:space-y-8 px-3 sm:px-0"
      >
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs md:text-sm font-medium mb-3 md:mb-4">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
            LOGGED IN
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2 md:mb-3">
            Welcome back, <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">{user?.first_name}!</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Your contact information is already saved.
          </p>
        </div>

        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Name:</span>
              <span className="font-semibold">{user?.first_name} {user?.last_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Email:</span>
              <span className="font-semibold">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Phone:</span>
              <span className="font-semibold">{user?.phone_number}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

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
            {authMode === 'login' ? 'Welcome back!' : authMode === 'signup' ? 'Create your account' : 'Enter your email'}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-2 sm:px-0">
            {authMode === 'login' 
              ? 'Please enter your password to continue.' 
              : authMode === 'signup'
              ? 'Create an account to place your order.'
              : 'We need your email to get started.'}
          </p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        {/* Email Field - Always shown if not logged in */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={state.email || ""}
              onChange={(e) => {
                setState((prev: any) => ({ ...prev, email: e.target.value }));
                setAuthMode('email');
                setEmailExists(null);
              }}
              disabled={authMode !== 'email' || checkingEmail}
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            {checkingEmail && (
              <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500 animate-spin" />
            )}
          </div>
          {authMode === 'login' && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Email found! Please login.
            </p>
          )}
          {authMode === 'signup' && (
            <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              New email! Let's create your account.
            </p>
          )}
        </div>

        {/* Login Mode - Just password */}
        {authMode === 'login' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={state.password || ""}
                  onChange={(e) => setState((prev: any) => ({ ...prev, password: e.target.value }))}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isSubmitting || !state.password}
              className="w-full h-12 text-lg font-semibold rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Login & Continue
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Signup Mode - Full form */}
        {authMode === 'signup' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {/* Customer Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Are you ordering as an individual or company?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setState((prev: any) => ({ ...prev, individual: true, company: false }))}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    state?.individual
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-semibold">Individual</span>
                  {state?.individual && <CheckCircle className="w-5 h-5 text-green-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => setState((prev: any) => ({ ...prev, company: true, individual: false }))}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    state?.company
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="font-semibold">Company</span>
                  {state?.company && <CheckCircle className="w-5 h-5 text-green-500" />}
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={state.first_name || ""}
                  onChange={(e) => setState((prev: any) => ({ ...prev, first_name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={state.last_name || ""}
                  onChange={(e) => setState((prev: any) => ({ ...prev, last_name: e.target.value }))}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={state.phone || ""}
                  onChange={(e) => setState((prev: any) => ({ ...prev, phone: e.target.value }))}
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={state.password || ""}
                  onChange={(e) => setState((prev: any) => ({ ...prev, password: e.target.value }))}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Password must be at least 8 characters with uppercase, lowercase, number and special character
              </p>
            </div>

            <Button
              onClick={handleSignup}
              disabled={isSubmitting || !state.first_name || !state.last_name || !state.phone || !state.password}
              className="w-full h-12 text-lg font-semibold rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account & Continue
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Privacy Notice */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                Your Privacy Matters
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                We respect your privacy and will only use your contact information for order-related communications.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfoForm;
