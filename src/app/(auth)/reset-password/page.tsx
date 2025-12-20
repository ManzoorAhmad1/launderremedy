"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
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
    
    if (passwordStrength < 75) {
      setErrorMessage('Please use a stronger password');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Password reset successfully! Redirecting to login...');
      
      // Redirect after success
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-green-200 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-primary-600 to-green-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <KeyRound className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-green-600 bg-clip-text text-transparent">
                  LaunderRemedy
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create New Password</p>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-green-400/5 to-blue-500/10 dark:from-primary-900/20 dark:via-green-800/10 dark:to-blue-900/20"></div>
                  
                  <div className="relative h-full p-8">
                    {/* Floating Elements */}
                    <div className="absolute top-12 right-12 w-36 h-36 bg-gradient-to-r from-primary-400 to-primary-200 dark:from-primary-700 dark:to-primary-500 rounded-2xl rotate-45 opacity-80"></div>
                    <div className="absolute bottom-12 left-12 w-36 h-36 bg-gradient-to-r from-green-400 to-green-200 dark:from-green-700 dark:to-green-500 rounded-2xl -rotate-45 opacity-80"></div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                          Create a <span className="bg-gradient-to-r from-primary-600 to-green-600 bg-clip-text text-transparent">Strong Password</span>
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                          Your new password must be different from previously used passwords.
                        </p>
                        
                        {/* Security Guidelines */}
                        <div className="space-y-6">
                          <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Password Requirements</h4>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                  {formData.password.length >= 8 ? (
                                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                  )}
                                </div>
                                <span className={`text-sm ${formData.password.length >= 8 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                  At least 8 characters long
                                </span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                  {/[A-Z]/.test(formData.password) ? (
                                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                  )}
                                </div>
                                <span className={`text-sm ${/[A-Z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                  At least one uppercase letter
                                </span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                  {/[0-9]/.test(formData.password) ? (
                                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                  )}
                                </div>
                                <span className={`text-sm ${/[0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                  At least one number
                                </span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                  {/[^A-Za-z0-9]/.test(formData.password) ? (
                                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                  )}
                                </div>
                                <span className={`text-sm ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                  At least one special character
                                </span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-100 dark:border-blue-800">
                            <div className="flex items-center gap-3 mb-2">
                              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <h4 className="font-semibold text-blue-900 dark:text-blue-300">Security Tips</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                              <li className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Don&apos;t reuse passwords from other sites</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Consider using a password manager</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Change your password regularly</span>
                              </li>
                            </ul>
                          </div>
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
                    <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Reset Password
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Create a new secure password
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-green-500 text-white">
                          <Lock className="w-6 h-6" />
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

                      {/* Password Field */}
                      <div className="space-y-2 mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          New Password *
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
                            placeholder="Enter new password"
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
                          </div>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2 mb-8">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Confirm New Password *
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
                            placeholder="Confirm new password"
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

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-green-600 hover:from-primary-700 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Resetting Password...</span>
                          </>
                        ) : (
                          <>
                            <span>Reset Password</span>
                            <KeyRound className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Alternative Options */}
                      <div className="mt-8 text-center">
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
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Ensure your new password is strong and unique
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Alternative Links */}
                  <div className="mt-6 lg:hidden text-center">
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
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;