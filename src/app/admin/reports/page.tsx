"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/admin/StatCard";
import adminService from "@/services/admin.service";
import { mockOrders } from "@/lib/mockData/orders";
import { mockServices } from "@/lib/mockData/services";
import toast from "react-hot-toast";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await adminService.dashboard.getStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type: string) => {
    toast.success(`Exporting ${type} report... (Feature coming soon)`);
  };

  // Calculate service popularity
  const serviceStats = mockServices
    .map((service) => ({
      name: service.title,
      orders: service.total_orders,
      revenue: service.price * service.total_orders,
    }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);

  // Calculate monthly revenue (mock data)
  const monthlyRevenue = [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 15200 },
    { month: "Mar", revenue: 18900 },
    { month: "Apr", revenue: 21400 },
    { month: "May", revenue: 23800 },
    { month: "Jun", revenue: 26500 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Business insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("PDF")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("CSV")}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`£${stats?.totalRevenue.toFixed(2) || 0}`}
          icon={DollarSign}
          trend={{ value: 15.3, isPositive: true }}
          iconColor="text-green-700 dark:text-green-300"
          iconBgColor="bg-green-100 dark:bg-green-900/50"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={ShoppingCart}
          trend={{ value: 8.2, isPositive: true }}
          iconColor="text-blue-700 dark:text-blue-300"
          iconBgColor="bg-blue-100 dark:bg-blue-900/50"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          trend={{ value: 12.1, isPositive: true }}
          iconColor="text-purple-700 dark:text-purple-300"
          iconBgColor="bg-purple-100 dark:bg-purple-900/50"
        />
        <StatCard
          title="Active Services"
          value={stats?.activeServices || 0}
          icon={Package}
          iconColor="text-orange-700 dark:text-orange-300"
          iconBgColor="bg-orange-100 dark:bg-orange-900/50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Monthly Revenue</h2>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-4">
            {monthlyRevenue.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  {item.month}
                </div>
                <div className="flex-1">
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-end pr-3 text-white text-sm font-medium"
                      style={{
                        width: `${(item.revenue / 30000) * 100}%`,
                      }}
                    >
                      £{item.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Popularity */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Top Services
            </h2>
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            {serviceStats.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{service.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {service.orders} orders
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  £{service.revenue.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Order Status Distribution
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {stats?.pendingOrders || 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {stats?.processingOrders || 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {stats?.completedOrders || 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-muted-foreground">
              {((stats?.completedOrders / stats?.totalOrders) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Completion Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
