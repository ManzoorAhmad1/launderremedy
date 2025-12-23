"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Package, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { DataTable } from "@/components/tables/DataTable";
import { getOrderColumns } from "@/components/tables/columns/orderColumns";
import { orderApi } from "@/api";
import StatCard from "@/components/admin/StatCard";
import OrderViewModal from "@/components/admin/OrderViewModal";
import OrderStatusModal from "@/components/admin/OrderStatusModal";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  orderId: string | number;
  order_number: string;
  user_id?: string;
  user_name?: string;
  user_email?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: "pending" | "collected" | "processing" | "out_for_delivery" | "completed" | "delivered" | "cancelled";
  totalPrice: number;
  total_amount?: number;
  payment_status?: string;
  payment_done: boolean;
  selected_services: any[];
  services?: any[];
  items?: any[];
  collection_date: string;
  collection_time?: string;
  collection?: any;
  delivery_date: string;
  delivery_time?: string;
  delivery?: any;
  created_at?: string;
  createdAt: string;
  updated_at?: string;
  [key: string]: any;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    loadOrders();
  }, [page, searchText, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getAllOrders({
        page,
        itemPerPage: pageSize,
        searchText,
        status: statusFilter,
      });
      
      if (response?.data?.items) {
        const ordersData = response.data.items.map((o: any) => ({
          ...o,
          order_number: o.orderId || o.order_number || o._id?.slice(-6) || 'N/A',
        }));
        setOrders(ordersData);
      } else if (Array.isArray(response?.data)) {
        const ordersData = response.data.map((o: any) => ({
          ...o,
          order_number: o.orderId || o.order_number || o._id?.slice(-6) || 'N/A',
        }));
        setOrders(ordersData);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusSubmit = async (newStatus: "pending" | "collected" | "processing" | "out_for_delivery" | "completed" | "cancelled") => {
    if (!selectedOrder) return;

    try {
      if (newStatus === "cancelled") {
        await orderApi.cancelOrder(selectedOrder._id);
      } else if (newStatus === "completed") {
        await orderApi.completeOrder(selectedOrder._id);
      } else {
        // For other status updates, use the update endpoint
        await orderApi.updateOrder({
          order_id: selectedOrder._id,
          status: newStatus,
        });
      }
      
      toast.success(`Order status updated to ${newStatus}`);
      loadOrders();
      setShowStatusModal(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update order status");
      console.error(error);
    }
  };

  const columns = getOrderColumns(handleView as any, handleUpdateStatus as any);

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
      .filter((o) => o.payment_done === true)
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0),
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
        <DataTable
          columns={columns}
          data={orders as any}
          searchKey="orderId"
          searchPlaceholder="Search by order ID or customer name..."
        />
      </div>

      {/* View Order Modal */}
      <OrderViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        order={selectedOrder as any}
      />

      {/* Update Status Modal */}
      <OrderStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onSubmit={handleStatusSubmit as any}
        order={selectedOrder as any}
      />
    </div>
  );
}
