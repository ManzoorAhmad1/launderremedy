"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { authApi } from "@/api";
import { setCookie } from "@/utils/helpers";
import toast from "react-hot-toast";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Package
} from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Call real backend API
      const response:any = await authApi.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success && response.token) {
        setSuccessMessage('Login successful! Redirecting...');
        
        // Store tokens in cookies
        setCookie('user_token', response.token, formData.rememberMe ? 30 : 1);
        setCookie('refresh_token', response.refreshToken, formData.rememberMe ? 30 : 7);
        
        // Store user data in cookie
        setCookie('user', JSON.stringify(response.user), formData.rememberMe ? 30 : 1);
        
        // Store user in Redux
        dispatch(setUser({ 
          user: response.user, 
          isLogin: true, 
          token: response.token 
        }));

        toast.success('Welcome back!');
        
        // Redirect based on user type
        setTimeout(() => {
          if (response.user.type === 'admin' || response.user.type === 'subadmin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/');
          }
        }, 1000);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMsg = error?.message || error?.response?.data?.message || 'Login failed. Please check your credentials.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-accent-200 dark:bg-accent-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  LaunderRemedy
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Professional Laundry Services</p>
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
              {/* Left Side - Image & Features */}
              <div className="hidden lg:block">
                <div className="h-full rounded-3xl overflow-hidden relative">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-400/5 to-secondary-500/10 dark:from-primary-900/20 dark:via-primary-800/10 dark:to-secondary-900/20"></div>
                  
                  {/* Floating Images/Illustrations */}
                  <div className="relative h-full p-8">
                    <div className="absolute top-8 left-8 w-48 h-48 bg-gradient-to-r from-primary-400 to-primary-200 dark:from-primary-700 dark:to-primary-500 rounded-2xl rotate-12 opacity-80"></div>
                    <div className="absolute bottom-8 right-8 w-48 h-48 bg-gradient-to-r from-secondary-400 to-secondary-200 dark:from-secondary-700 dark:to-secondary-500 rounded-2xl -rotate-12 opacity-80"></div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Hero Text */}
                      <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                          Welcome Back to <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Clean & Fresh</span>
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                          Access your laundry dashboard, track orders, and manage your cleaning preferences.
                        </p>
                        
                        {/* Features List */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                              <Truck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Real-time Tracking</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Track your laundry in real-time</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-900/30">
                              <Shield className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Quality Guaranteed</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">100% satisfaction guarantee</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/30">
                              <Sparkles className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Express Service</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">24-48 hour turnaround</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Text */}
                      <div className="mt-8 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                          Don&apos;t have an account?{' '}
                          <Link 
                            href="/signup" 
                            className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            Create one now
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Form Header */}
                    <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Log In
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Access your laundry dashboard
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                          <Lock className="w-6 h-6" />
                        </div>
                      </div>                      
                      <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">Continue with email</span>
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

                      {/* Email Field */}
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

                      {/* Password Field */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password *
                          </label>
                          <Link 
                            href="/forgot-password"
                            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
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
                            placeholder="Enter your password"
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
                      </div>

                      {/* Remember Me */}
                      <div className="flex items-center mb-8">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          id="rememberMe"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Remember me on this device
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Logging in...</span>
                          </>
                        ) : (
                          <>
                            <span>Log In</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Sign Up Link */}
                      <div className="mt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                          Don&apos;t have an account?{' '}
                          <Link 
                            href="/signup" 
                            className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            Sign up here
                          </Link>
                        </p>
                      </div>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          By logging in, you agree to our{' '}
                          <Link href="/terms" className="underline hover:text-primary-600">Terms</Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="underline hover:text-primary-600">Privacy Policy</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Sign Up Prompt */}
                  <div className="mt-6 lg:hidden text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      New to LaunderRemedy?{' '}
                      <Link 
                        href="/signup" 
                        className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        Create an account
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

export default LoginPage;