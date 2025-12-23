"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { orderApi, serviceApi } from "@/api";
import toast from "react-hot-toast";

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeServices: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders count by status
      const ordersCountResponse = await orderApi.getOrdersCount();
      
      // Fetch services to get active count
      const servicesResponse = await serviceApi.getAllServices();
      
      // Fetch recent orders
      const recentOrdersResponse = await orderApi.getAllOrders({
        page: 1,
        itemPerPage: 5,
      });

      // Calculate stats from orders count
      const ordersData = ordersCountResponse?.data || [];
      const statsData: DashboardStats = {
        totalUsers: 0, // Would need separate users API endpoint
        totalOrders: ordersData.reduce((sum: number, item: any) => sum + item.count, 0),
        totalRevenue: 0, // Would need separate revenue calculation
        activeServices: servicesResponse?.data?.length || 0,
        pendingOrders: ordersData.find((item: any) => item.status === 'pending')?.count || 0,
        processingOrders: ordersData.find((item: any) => item.status === 'processing')?.count || 0,
        completedOrders: ordersData.find((item: any) => item.status === 'completed')?.count || 0,
        deliveredOrders: ordersData.find((item: any) => item.status === 'delivered')?.count || 0,
        cancelledOrders: ordersData.find((item: any) => item.status === 'cancelled')?.count || 0,
      };

      setStats(statsData);
      setRecentOrders(recentOrdersResponse?.data?.items || []);
    } catch (error: any) {
      console.error("Failed to load dashboard data:", error);
      toast.error(error?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Overview of your laundry service platform
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          description="Registered customers"
          trend={{ value: 12, isPositive: true }}
          iconColor="text-blue-700 dark:text-blue-300"
          iconBgColor="bg-blue-100 dark:bg-blue-900/50"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={ShoppingCart}
          description="All time orders"
          trend={{ value: 8, isPositive: true }}
          iconColor="text-green-700 dark:text-green-300"
          iconBgColor="bg-green-100 dark:bg-green-900/50"
        />
        <StatCard
          title="Total Revenue"
          value={`£${stats?.totalRevenue.toFixed(2) || 0}`}
          icon={DollarSign}
          description="Total earnings"
          trend={{ value: 15, isPositive: true }}
          iconColor="text-purple-700 dark:text-purple-300"
          iconBgColor="bg-purple-100 dark:bg-purple-900/50"
        />
        <StatCard
          title="Active Services"
          value={stats?.activeServices || 0}
          icon={Package}
          description="Available services"
          iconColor="text-orange-700 dark:text-orange-300"
          iconBgColor="bg-orange-100 dark:bg-orange-900/50"
        />
      </div>

      {/* Recent Orders Section */}
      <div className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Recent Orders</h2>
          <a
            href="/admin/orders"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View all →
          </a>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No recent orders found
          </div>
        ) : (
          <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-3 sm:px-4">
                      Order
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-3 sm:px-4 hidden sm:table-cell">
                      Customer
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-3 sm:px-4">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-3 sm:px-4">
                      Amount
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-3 sm:px-4 hidden md:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-3 sm:px-4">
                        <div className="text-xs sm:text-sm font-medium text-foreground">
                          #{order.orderId || order._id?.slice(-6)}
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden mt-0.5">
                          {order.first_name} {order.last_name}
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden sm:table-cell">
                        {order.first_name} {order.last_name}
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <span
                          className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] xs:text-xs font-medium whitespace-nowrap
                            ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                                : order.status === "cancelled"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                                : order.status === "delivered"
                                ? "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300"
                            }
                          `}
                        >
                          {order.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                        £{(order.totalPrice || 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                        {new Date(order.createdAt || order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
