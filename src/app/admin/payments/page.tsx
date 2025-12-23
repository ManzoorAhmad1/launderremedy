"use client";

import React, { useEffect, useState } from "react";
import { Loader2, DollarSign, CheckCircle, Clock, XCircle } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import { getPaymentColumns } from "@/components/tables/columns/paymentColumns";
import { MockPayment } from "@/lib/mockData/payments";
import adminService from "@/services/admin.service";
import StatCard from "@/components/admin/StatCard";import PaymentViewModal from "@/components/admin/PaymentViewModal";import toast from "react-hot-toast";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<MockPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<MockPayment | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const response = await adminService.payments.getAll(1, 100);
      setPayments(response.data);
    } catch (error) {
      toast.error("Failed to load payments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (payment: MockPayment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  const columns = getPaymentColumns(handleView);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const stats = {
    total: payments.length,
    totalRevenue: payments
      .filter((p) => p.payment_status === "success")
      .reduce((sum, p) => sum + p.amount, 0),
    success: payments.filter((p) => p.payment_status === "success").length,
    pending: payments.filter((p) => p.payment_status === "pending").length,
    failed: payments.filter((p) => p.payment_status === "failed").length,
    refunded: payments.filter((p) => p.payment_status === "refunded").length,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Payments & Transactions</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Monitor all payment transactions and revenue
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <StatCard
          title="Total Revenue"
          value={`£${stats.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          description="Successful payments"
          trend={{ value: 12.5, isPositive: true }}
          iconColor="text-green-700 dark:text-green-300"
          iconBgColor="bg-green-100 dark:bg-green-900/50"
        />
        <StatCard
          title="Successful"
          value={stats.success}
          icon={CheckCircle}
          iconColor="text-emerald-700 dark:text-emerald-300"
          iconBgColor="bg-emerald-100 dark:bg-emerald-900/50"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          iconColor="text-yellow-700 dark:text-yellow-300"
          iconBgColor="bg-yellow-100 dark:bg-yellow-900/50"
        />
        <StatCard
          title="Failed"
          value={stats.failed}
          icon={XCircle}
          iconColor="text-red-700 dark:text-red-300"
          iconBgColor="bg-red-100 dark:bg-red-900/50"
        />
        <StatCard
          title="Refunded"
          value={stats.refunded}
          icon={DollarSign}
          iconColor="text-orange-700 dark:text-orange-300"
          iconBgColor="bg-orange-100 dark:bg-orange-900/50"
        />
      </div>

      {/* Payments Table */}
      <div className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-6">
        <div className="mb-3 md:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Transaction History</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            View and manage all payment transactions
          </p>
        </div>
        <DataTable
          columns={columns}
          data={payments}
          searchKey="transaction_id"
          searchPlaceholder="Search by transaction ID, order, or customer..."
        />
      </div>

      {/* View Payment Modal */}
      <PaymentViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        payment={selectedPayment}
      />
    </div>
  );
}
