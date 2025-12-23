"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MockPayment } from "@/lib/mockData/payments";
import { 
  Calendar, 
  DollarSign, 
  CreditCard, 
  User as UserIcon,
  Mail,
  Package,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface PaymentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: MockPayment | null;
}

export default function PaymentViewModal({
  isOpen,
  onClose,
  payment,
}: PaymentViewModalProps) {
  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment Details</DialogTitle>
          <DialogDescription>
            Transaction ID: {payment.transaction_id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <Badge
              variant={
                payment.payment_status === "success"
                  ? "default"
                  : payment.payment_status === "pending"
                  ? "secondary"
                  : "destructive"
              }
              className="text-base py-1 px-3"
            >
              {payment.payment_status === "success" && <CheckCircle className="h-4 w-4 mr-1" />}
              {payment.payment_status === "failed" && <XCircle className="h-4 w-4 mr-1" />}
              {payment.payment_status === "pending" && <Clock className="h-4 w-4 mr-1" />}
              {payment.payment_status.toUpperCase()}
            </Badge>
          </div>

          {/* Amount Card */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 border border-primary-200 dark:border-primary-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="text-4xl font-bold text-primary-600 dark:text-primary-300">
                  {payment.currency === "gbp" ? "£" : "$"}{payment.amount.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-16 w-16 text-primary-300 dark:text-primary-700" />
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <UserIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Name</p>
                  <p className="text-sm font-semibold text-foreground">{payment.user_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold text-foreground">{payment.user_email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Payment Method</h3>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <CreditCard className="h-6 w-6 text-purple-600" />
              <div className="flex-1">
                {payment.payment_method === "card" && payment.card_brand ? (
                  <>
                    <p className="text-sm font-semibold text-foreground capitalize">
                      {payment.card_brand}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      •••• •••• •••• {payment.card_last4}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-semibold text-foreground capitalize">
                    {payment.payment_method.replace("_", " ")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Order Information</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Package className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Order Number</p>
                <p className="text-sm font-mono font-semibold text-foreground">{payment.order_number}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Transaction Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono font-medium">{payment.transaction_id}</span>
              </div>
              {payment.stripe_payment_id && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stripe Payment ID</span>
                  <span className="font-mono text-xs">{payment.stripe_payment_id}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency</span>
                <span className="font-medium uppercase">{payment.currency}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Timeline</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium text-foreground">
                  {new Date(payment.created_at).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium text-foreground">
                  {new Date(payment.updated_at).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Failure Message */}
          {payment.payment_status === "failed" && payment.failure_message && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <p className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">
                Failure Reason
              </p>
              <p className="text-sm text-red-700 dark:text-red-400">
                {payment.failure_message}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
