"use client";

import React from "react";
import { CreditCard } from "lucide-react";

export default function PaymentMethods() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CreditCard className="w-4 h-4" />
        <span className="font-medium">Accepted payment methods:</span>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Visa */}
        <div className="h-8 flex items-center bg-white rounded px-3 py-1 shadow-sm">
          <svg viewBox="0 0 48 16" className="h-5" fill="none">
            <path d="M17.8 0.9L13.9 15.1H10.5L14.4 0.9H17.8ZM31.6 9.8C31.6 11.4 30.3 12.3 28.2 12.3C26.8 12.3 25.8 12 24.9 11.5L25.4 9.1C26.3 9.6 27.1 9.8 28.1 9.8C28.9 9.8 29.4 9.6 29.4 9.1C29.4 8.7 28.9 8.5 27.9 8.2C25.9 7.6 24.8 6.7 24.8 5.2C24.8 3.2 26.7 1.9 29.5 1.9C30.8 1.9 31.8 2.1 32.7 2.5L32.2 4.8C31.4 4.5 30.5 4.3 29.6 4.3C28.8 4.3 28.4 4.5 28.4 4.9C28.4 5.3 29 5.5 30.1 5.9C32.1 6.5 33.2 7.4 33.2 9C33.2 11.1 31.6 12.4 28.2 12.4L31.6 9.8ZM42.5 0.9L39.7 15.1H36.5L33.9 4.8L32.7 11.2L32.5 12.3C32.3 13.5 31.4 14.3 30.2 14.3H30.1L30.4 12.8C30.9 12.7 31.2 12.3 31.3 11.7L34.1 0.9H37.5L39.5 9.1L41.3 0.9H44.5M11.2 0.9L7.8 10.8L7.4 8.9L6.2 3.2C6 2.3 5.3 1.5 4.3 1.2L4.2 0.9H8.9C9.8 0.9 10.5 1.5 10.7 2.4L11.2 0.9Z" fill="#1434CB"/>
          </svg>
        </div>

        {/* Mastercard */}
        <div className="h-8 flex items-center bg-white rounded px-3 py-1 shadow-sm">
          <svg viewBox="0 0 48 32" className="h-6" fill="none">
            <circle cx="15" cy="16" r="10" fill="#EB001B"/>
            <circle cx="33" cy="16" r="10" fill="#FF5F00"/>
            <path d="M24 9C21.5 11 20 14.3 20 16C20 17.7 21.5 21 24 23C26.5 21 28 17.7 28 16C28 14.3 26.5 11 24 9Z" fill="#F79E1B"/>
          </svg>
        </div>

        {/* American Express */}
        <div className="h-8 flex items-center bg-[#006FCF] rounded px-3 py-1 shadow-sm">
          <svg viewBox="0 0 48 16" className="h-5" fill="none">
            <text x="2" y="12" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">AMEX</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
