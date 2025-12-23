"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authApi } from "@/api";
import toast from "react-hot-toast";
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Shield,
  Key,
  Send
} from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
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
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!email) {
      setErrorMessage('Please enter your email address');
      toast.error('Please enter your email address');
      setIsLoading(false);
      return;
    }
    
    try {
      // Call real backend API
      const response:any = await authApi.forgotPassword({ email });

      if (response.success) {
        setSuccessMessage(`Password reset instructions have been sent to ${email}. Please check your inbox.`);
        toast.success('Reset link sent! Check your email.');
        setEmail(''); // Clear email field
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      const errorMsg = error?.message || 'Failed to send reset link. Please try again.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Key className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  LaunderRemedy
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Password Recovery</p>
              </div>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Left Side - Information */}
              <div className="hidden lg:block">
                <div className="h-full rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-blue-400/5 to-secondary-500/10 dark:from-primary-900/20 dark:via-blue-800/10 dark:to-secondary-900/20"></div>
                  
                  <div className="relative h-full p-8">
                    {/* Floating Elements */}
                    <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-primary-400 to-primary-200 dark:from-primary-700 dark:to-primary-500 rounded-2xl rotate-12 opacity-80"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-blue-200 dark:from-blue-700 dark:to-blue-500 rounded-2xl -rotate-12 opacity-80"></div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                          Reset Your <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Password</span>
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                          Enter your email address and we&apos;ll send you a link to reset your password.
                        </p>
                        
                        {/* Security Features */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Secure Process</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Your information is encrypted</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                              <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Instant Delivery</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Reset link sent immediately</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                              <Key className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">One-time Link</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Link expires after 24 hours</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Instructions */}
                        <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-100 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">What happens next?</h4>
                          <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                            <li className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xs">1</div>
                              <span>Check your email for reset link</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xs">2</div>
                              <span>Click the link to reset password</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xs">3</div>
                              <span>Create a new secure password</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Back Button */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                      <Link 
                        href="/login" 
                        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to login</span>
                      </Link>
                    </div>

                    {/* Form Header */}
                    <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Forgot Password?
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            No worries, we&apos;ll help you reset it
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 text-white">
                          <Mail className="w-6 h-6" />
                        </div>
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

                      {/* Instructions */}
                      <div className="mb-8">
                        <p className="text-gray-600 dark:text-gray-400">
                          Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
                        </p>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2 mb-8">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending Reset Link...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Reset Link</span>
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Alternative Options */}
                      <div className="mt-8 space-y-4">
                        <div className="text-center">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Remember your password?{' '}
                            <Link 
                              href="/login" 
                              className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                            >
                              Back to login
                            </Link>
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Don&apos;t have an account?{' '}
                            <Link 
                              href="/signup" 
                              className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                            >
                              Create one now
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          If you don&apos;t receive the email within 5 minutes, check your spam folder.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Alternative Links */}
                  <div className="mt-6 lg:hidden text-center space-y-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Remember your password?{' '}
                        <Link 
                          href="/login" 
                          className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                          Back to login
                        </Link>
                      </p>
                    </div>
                    
                    <div>
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

export default ForgotPasswordPage;