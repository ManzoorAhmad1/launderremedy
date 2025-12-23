"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Package, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import { getOrderColumns } from "@/components/tables/columns/orderColumns";
import { MockOrder } from "@/lib/mockData/orders";
import adminService from "@/services/admin.service";
import StatCard from "@/components/admin/StatCard";
import OrderViewModal from "@/components/admin/OrderViewModal";
import OrderStatusModal from "@/components/admin/OrderStatusModal";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.orders.getAll(1, 100);
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (order: MockOrder) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleUpdateStatus = (order: MockOrder) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusSubmit = async (newStatus: MockOrder["status"]) => {
    if (!selectedOrder) return;

    try {
      await adminService.orders.updateStatus(selectedOrder._id, newStatus);
      toast.success(`Order status updated to ${newStatus.replace("_", " ")}`);
      loadOrders();
      setShowStatusModal(false);
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    }
  };

  const columns = getOrderColumns(handleView, handleUpdateStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    completed: orders.filter((o) => o.status === "completed").length,
    revenue: orders
      .filter((o) => o.payment_status === "paid")
      .reduce((sum, o) => sum + o.total_amount, 0),
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Orders Management</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Track and manage all customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <StatCard
          title="Total Orders"
          value={stats.total}
          icon={Package}
          iconColor="text-blue-700 dark:text-blue-300"
          iconBgColor="bg-blue-100 dark:bg-blue-900/50"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          iconColor="text-yellow-700 dark:text-yellow-300"
          iconBgColor="bg-yellow-100 dark:bg-yellow-900/50"
        />
        <StatCard
          title="Processing"
          value={stats.processing}
          icon={TrendingUp}
          iconColor="text-indigo-700 dark:text-indigo-300"
          iconBgColor="bg-indigo-100 dark:bg-indigo-900/50"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          iconColor="text-green-700 dark:text-green-300"
          iconBgColor="bg-green-100 dark:bg-green-900/50"
        />
        <StatCard
          title="Revenue"
          value={`£${stats.revenue.toFixed(2)}`}
          icon={Package}
          iconColor="text-purple-700 dark:text-purple-300"
          iconBgColor="bg-purple-100 dark:bg-purple-900/50"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-6">

      {/* Update Status Modal */}
      <OrderStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onSubmit={handleStatusSubmit}
        order={selectedOrder}
      />
        <DataTable
          columns={columns}
          data={orders}
          searchKey="order_number"
          searchPlaceholder="Search by order number..."
        />
      </div>

      {/* View Order Modal */}
      <OrderViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        order={selectedOrder}
      />
    </div>
  );
}
