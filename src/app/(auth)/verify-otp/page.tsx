"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/api";
import toast from "react-hot-toast";
import { Mail, ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // take last char only
    setOtp(newOtp);
    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const newOtp = Array(6).fill("");
    for (let i = 0; i < text.length; i++) newOtp[i] = text[i];
    setOtp(newOtp);
    inputRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Please enter the 6-digit code from your email");
      return;
    }
    // Redirect to reset-password with the code as the token
    router.push(`/reset-password?token=${code}`);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setIsResending(true);
    try {
      const response: any = await authApi.forgotPassword({ email });
      if (response.success) {
        toast.success("New code sent! Check your email.");
        setOtp(Array(6).fill(""));
        setCountdown(60);
        setCanResend(false);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(Math.min(b.length, 4)) + c)
    : "your email";

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Forgot Password
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#41154c] to-[#7b2fa0] px-8 py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
              <p className="text-purple-200 text-sm mt-2">
                We sent a 6-digit code to
              </p>
              <p className="text-white font-semibold text-sm mt-1">{maskedEmail}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerify} className="px-8 py-8 space-y-6">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enter the verification code below to reset your password
                </p>
              </div>

              {/* OTP Boxes */}
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-bold border-2 rounded-xl
                      border-gray-300 dark:border-gray-600
                      bg-gray-50 dark:bg-gray-700
                      text-gray-900 dark:text-white
                      focus:border-[#7b2fa0] focus:ring-2 focus:ring-[#7b2fa0]/20 focus:outline-none
                      transition-all duration-200"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading || otp.join("").length < 6}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white text-base
                  bg-gradient-to-r from-[#41154c] to-[#7b2fa0]
                  hover:from-[#4e1a5c] hover:to-[#8c35b3]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </button>

              {/* Resend */}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Didn&apos;t receive the code?{" "}
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      className="inline-flex items-center gap-1 text-[#7b2fa0] font-semibold hover:underline disabled:opacity-50"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Resend Code"
                      )}
                    </button>
                  ) : (
                    <span className="text-gray-400">
                      Resend in{" "}
                      <span className="font-semibold text-[#7b2fa0]">{countdown}s</span>
                    </span>
                  )}
                </p>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 text-center">
                <Link
                  href="/login"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#7b2fa0] transition-colors"
                >
                  Remember your password?{" "}
                  <span className="font-semibold text-[#7b2fa0]">Back to login</span>
                </Link>
              </div>
            </form>
          </motion.div>

          {/* Security note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6"
          >
            <Mail className="inline w-3 h-3 mr-1" />
            The code expires in 2 hours. Check your spam folder if you don&apos;t see it.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const VerifyOtpPage = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>}>
    <VerifyOtpForm />
  </Suspense>
);

export default VerifyOtpPage;
