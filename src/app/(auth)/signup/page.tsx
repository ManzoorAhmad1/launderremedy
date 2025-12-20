"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Calendar,
  Star
} from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength += 25;
    if (/[A-Z]/.test(formData.password)) strength += 25;
    if (/[0-9]/.test(formData.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (!formData.acceptTerms) {
      setErrorMessage('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }
    
    if (passwordStrength < 75) {
      setErrorMessage('Please use a stronger password');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Account created successfully! Redirecting to login...');
      // In real app: router.push('/login');
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 -left-20 w-96 h-96 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  LaunderRemedy
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join our cleaning community</p>
              </div>
            </Link>
          </div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Left Side - Features */}
              <div className="hidden lg:block">
                <div className="h-full rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-400/5 to-secondary-500/10 dark:from-primary-900/20 dark:via-accent-800/10 dark:to-secondary-900/20"></div>
                  
                  <div className="relative h-full p-8">
                    {/* Floating Elements */}
                    <div className="absolute top-12 right-12 w-32 h-32 bg-gradient-to-r from-primary-400 to-primary-200 dark:from-primary-700 dark:to-primary-500 rounded-2xl rotate-45 opacity-80"></div>
                    <div className="absolute bottom-12 left-12 w-32 h-32 bg-gradient-to-r from-accent-400 to-accent-200 dark:from-accent-700 dark:to-accent-500 rounded-2xl -rotate-45 opacity-80"></div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Hero Content */}
                      <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                          Join Thousands of <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Happy Customers</span>
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                          Experience hassle-free laundry services with premium quality and express delivery.
                        </p>
                        
                        {/* Benefits */}
                        <div className="space-y-6">
                          <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Free First Pickup</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Get your first collection for free</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Premium Membership</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Priority service & discounts</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Quality Assurance</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">100% satisfaction guaranteed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">10K+</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
                        </div>
                        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                          <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">24h</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Express Service</div>
                        </div>
                        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                          <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">99%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Signup Form */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Form Header */}
                    <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Create Account
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Start your journey with us
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
                          <User className="w-6 h-6" />
                        </div>
                      </div>
                      
                      <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">Sign up with email</span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="p-8">
                      {/* Messages */}
                      {successMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <p className="text-green-700 dark:text-green-300">{successMessage}</p>
                          </div>
                        </motion.div>
                      )}
                      
                      {errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        >
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <p className="text-red-700 dark:text-red-300">{errorMessage}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Full Name */}
                      <div className="space-y-2 mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2 mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2 mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-2 mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="Create a strong password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                        
                        {/* Password Strength */}
                        {formData.password && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">Password strength</span>
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Fair' : 'Strong'}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${passwordStrength}%` }}
                                className={`h-full ${getStrengthColor()}`}
                              />
                            </div>
                            <ul className="mt-2 grid grid-cols-2 gap-1">
                              <li className="flex items-center gap-1 text-xs">
                                {formData.password.length >= 8 ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                                )}
                                <span className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                                  At least 8 characters
                                </span>
                              </li>
                              <li className="flex items-center gap-1 text-xs">
                                {/[A-Z]/.test(formData.password) ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                                )}
                                <span className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                                  Uppercase letter
                                </span>
                              </li>
                              <li className="flex items-center gap-1 text-xs">
                                {/[0-9]/.test(formData.password) ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                                )}
                                <span className={/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                                  Number
                                </span>
                              </li>
                              <li className="flex items-center gap-1 text-xs">
                                {/[^A-Za-z0-9]/.test(formData.password) ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                                )}
                                <span className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                                  Special character
                                </span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2 mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                        
                        {/* Password Match Indicator */}
                        {formData.password && formData.confirmPassword && (
                          <div className="mt-2">
                            {formData.password === formData.confirmPassword ? (
                              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs">Passwords match</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-xs">Passwords do not match</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Terms Checkbox */}
                      <div className="flex items-start mb-8">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 mt-1"
                          id="acceptTerms"
                        />
                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          I agree to the{' '}
                          <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Account</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Login Link */}
                      <div className="mt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                          Already have an account?{' '}
                          <Link 
                            href="/login" 
                            className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            Log in here
                          </Link>
                        </p>
                      </div>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          By signing up, you&apos;ll receive our newsletter and service updates
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Login Prompt */}
                  <div className="mt-6 lg:hidden text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Already have an account?{' '}
                      <Link 
                        href="/login" 
                        className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;