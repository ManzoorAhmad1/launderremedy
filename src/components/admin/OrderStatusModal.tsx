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
import { Package, Truck, CheckCircle, Clock, XCircle, Loader2, CreditCard } from "lucide-react";
import { orderApi } from "@/api";
import toast from "react-hot-toast";

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: MockOrder["status"]) => Promise<void>;
  order: MockOrder | null;
  onOrderUpdated?: () => void;
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
  onOrderUpdated,
}: OrderStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<MockOrder["status"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [chargingIndex, setChargingIndex] = useState<number | null>(null);
  const [localServices, setLocalServices] = useState<any[]>([]);

  React.useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
      const svcs = order.services?.length ? order.services : (order.selected_services || []);
      setLocalServices(svcs.map((s: any) => ({ ...s })));
    }
  }, [order]);

  const handleChargeItem = async (serviceIndex: number, service: any) => {
    if (!order) return;
    setChargingIndex(serviceIndex);
    try {
      const res: any = await orderApi.chargeOrderItem(order._id, serviceIndex);
      toast.success(res?.message || `Payment charged for ${service.service_name || service.subcategory}`);
      // Mark item paid locally so UI updates immediately
      setLocalServices(prev => prev.map((s, i) => i === serviceIndex ? { ...s, payment_done: true } : s));
      if (res?.data?.allPaid) {
        toast.success('All items charged — order marked complete!');
        onOrderUpdated?.();
        onClose();
      } else {
        onOrderUpdated?.();
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to charge item');
    } finally {
      setChargingIndex(null);
    }
  };

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

  const showItemCharging = selectedStatus === 'completed' && order.status !== 'completed';

  // Compute totals for the summary strip
  const paidTotal = localServices.reduce((sum, s) => s.payment_done ? sum + parseFloat(String(s.price || 0)) * (s.quantity || 1) : sum, 0);
  const remainingTotal = localServices.reduce((sum, s) => !s.payment_done ? sum + parseFloat(String(s.price || 0)) * (s.quantity || 1) : sum, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Order #{order.order_number} - {order.user_name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          {/* Current Status */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Current Status</p>
            <Badge variant="default" className="text-sm">
              {order.status.replace(/_/g, " ").toUpperCase()}
            </Badge>
          </div>

          {/* Locked when already completed */}
          {order.status === 'completed' ? (
            <div className="p-5 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-center">
              <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-green-700 dark:text-green-400 text-base">Order Completed &amp; Payment Charged</p>
              <p className="text-sm text-green-600 dark:text-green-500 mt-2">
                This order has been completed and the payment has been processed.
              </p>
            </div>
          ) : (
            <>
              {/* Status Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Select New Status</label>
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
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${selectedStatus === option.value ? "bg-primary-100 dark:bg-primary-900" : "bg-muted"}`}>
                          <Icon className={`h-5 w-5 ${selectedStatus === option.value ? "text-primary-600" : option.color}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`font-semibold ${selectedStatus === option.value ? "text-primary-600" : "text-foreground"}`}>
                            {option.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {option.value === "pending" && "Order placed, awaiting collection"}
                            {option.value === "processing" && "Order is being processed"}
                            {option.value === "out_for_delivery" && "Order is on the way"}
                            {option.value === "completed" && "Charge items individually or all at once"}
                            {option.value === "cancelled" && "Order has been cancelled"}
                          </p>
                        </div>
                        {selectedStatus === option.value && <CheckCircle className="h-5 w-5 text-primary-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Per-item charging panel — only shown when Completed is selected */}
              {showItemCharging && (
                <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="h-4 w-4 text-green-700 dark:text-green-400" />
                    <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                      Charge Items
                    </p>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-400 -mt-1">
                    Charge one-by-one, or click <strong>"Complete All"</strong> to charge the remaining balance in one go.
                  </p>

                  {/* Service rows */}
                  <div className="space-y-2">
                    {localServices.map((service: any, index: number) => {
                      const unitPrice = parseFloat(String(service.price || 0));
                      const qty = service.quantity || 1;
                      const itemTotal = unitPrice * qty;
                      const isPaid = !!service.payment_done;
                      return (
                        <div key={index} className="flex items-center justify-between bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 gap-2 border border-green-100 dark:border-green-900">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Package className="h-4 w-4 text-purple-500 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {service.service_name || service.subcategory || service.name || 'Service'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {qty} × £{unitPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-bold">£{itemTotal.toFixed(2)}</span>
                            {isPaid ? (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs h-7 px-2">
                                <CheckCircle className="h-3 w-3 mr-1" /> Paid
                              </Badge>
                            ) : (
                              <Button
                                type="button"
                                size="sm"
                                className="h-7 text-xs px-2"
                                disabled={chargingIndex !== null}
                                onClick={() => handleChargeItem(index, service)}
                              >
                                {chargingIndex === index
                                  ? <><Loader2 className="h-3 w-3 mr-1 animate-spin" />Charging...</>
                                  : `Charge £${itemTotal.toFixed(2)}`}
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Totals strip */}
                  {localServices.length > 0 && (
                    <div className="flex justify-between text-xs pt-1 border-t border-green-200 dark:border-green-800">
                      <span className="text-green-700 dark:text-green-400">Collected: <strong>£{paidTotal.toFixed(2)}</strong></span>
                      <span className="text-orange-600 dark:text-orange-400">Remaining: <strong>£{remainingTotal.toFixed(2)}</strong></span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Order Summary */}
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Customer</p>
                <p className="font-medium text-foreground">{order?.user_name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total</p>
                <p className="font-medium text-foreground">£{(parseFloat(String(order?.total_amount || 0)) || 0).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Services</p>
                <p className="font-medium text-foreground">{localServices.length} items</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment</p>
                <Badge
                  variant={order.payment_status === "paid" ? "default" : order.payment_status === "pending" ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {order?.payment_status?.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading || chargingIndex !== null}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || chargingIndex !== null || !selectedStatus || selectedStatus === order.status || order.status === 'completed'}
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Updating...</>
              ) : selectedStatus === 'completed' ? (
                remainingTotal > 0 ? `Complete All & Charge £${remainingTotal.toFixed(2)}` : 'Mark Complete'
              ) : (
                'Update Status'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
