"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MockOrder } from "@/lib/mockData/orders";
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: MockOrder["status"]) => Promise<void>;
  order: MockOrder | null;
}

const statusOptions: { value: MockOrder["status"]; label: string; icon: any; color: string }[] = [
  { value: "pending", label: "Pending", icon: Clock, color: "text-yellow-600" },
  { value: "processing", label: "Processing", icon: Package, color: "text-blue-600" },
  { value: "out_for_delivery", label: "Out for Delivery", icon: Truck, color: "text-purple-600" },
  { value: "completed", label: "Completed", icon: CheckCircle, color: "text-green-600" },
  { value: "cancelled", label: "Cancelled", icon: XCircle, color: "text-red-600" },
];

export default function OrderStatusModal({
  isOpen,
  onClose,
  onSubmit,
  order,
}: OrderStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<MockOrder["status"] | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStatus) return;

    try {
      setLoading(true);
      await onSubmit(selectedStatus);
      onClose();
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Order #{order.order_number} - {order.user_name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          {/* Current Status */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Current Status</p>
            <Badge variant="default" className="text-sm">
              {order.status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>

          {/* Status Options */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Select New Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedStatus(option.value)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      selectedStatus === option.value
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-950/30"
                        : "border-border bg-card hover:border-primary-300 hover:bg-muted/50"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        selectedStatus === option.value
                          ? "bg-primary-100 dark:bg-primary-900"
                          : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          selectedStatus === option.value
                            ? "text-primary-600"
                            : option.color
                        }`}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p
                        className={`font-semibold ${
                          selectedStatus === option.value
                            ? "text-primary-600"
                            : "text-foreground"
                        }`}
                      >
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.value === "pending" && "Order placed, awaiting collection"}
                        {option.value === "processing" && "Order is being processed"}
                        {option.value === "out_for_delivery" && "Order is on the way"}
                        {option.value === "completed" && "Order delivered successfully"}
                        {option.value === "cancelled" && "Order has been cancelled"}
                      </p>
                    </div>
                    {selectedStatus === option.value && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Details Summary */}
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Customer</p>
                <p className="font-medium text-foreground">{order.user_name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium text-foreground">£{order.total_amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Services</p>
                <p className="font-medium text-foreground">{order.services.length} items</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment</p>
                <Badge
                  variant={
                    order.payment_status === "paid"
                      ? "default"
                      : order.payment_status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                  className="text-xs"
                >
                  {order.payment_status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !selectedStatus || selectedStatus === order.status}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
