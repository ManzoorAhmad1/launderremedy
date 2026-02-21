"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MockOrder } from "@/lib/mockData/orders"; 
import { 
  Calendar, 
  DollarSign, 
  Package, 
  MapPin, 
  User as UserIcon,
  Mail,
  Phone,
  Clock,
  Truck,
  FileText
} from "lucide-react";
import ReceiptModal from "@/components/admin/ReceiptModal";

interface OrderViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: MockOrder | null;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "processing":
    case "out_for_delivery":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export default function OrderViewModal({
  isOpen,
  onClose,
  order,
}: OrderViewModalProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  if (!order) return null;

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-2">
            <div>
              <DialogTitle className="text-2xl">Order #{order.order_number}</DialogTitle>
              <DialogDescription>
                Complete order details and customer information
              </DialogDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 mt-1"
              onClick={() => setShowReceipt(true)}
            >
              <FileText className="h-4 w-4 mr-1" /> Receipt
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={getStatusVariant(order.status)}>
              {order.status.replace("_", " ").toUpperCase()}
            </Badge>
            <Badge
              variant={
                order.payment_status === "paid"
                  ? "default"
                  : order.payment_status === "pending"
                  ? "secondary"
                  : "destructive"
              }
            >
              Payment: {order.payment_status.toUpperCase()}
            </Badge>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <UserIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Name</p>
                  <p className="text-sm font-semibold text-foreground">{order.user_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold text-foreground">{order.user_email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm font-semibold text-foreground">{order.phone_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Services</h3>
            <div className="space-y-2">
              {order.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{service.service_name}</p>
                      <p className="text-xs text-muted-foreground">Quantity: {service.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    £{Number(service.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          {order.collection_address && order.delivery_address && (
            <div className="grid grid-cols-2 gap-4">
              {/* Collection Address */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Collection Address</h3>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                    <div className="text-sm text-foreground">
                      {order.collection_address.street}<br />
                      {order.collection_address.city}, {order.collection_address.postcode}
                    </div>
                  </div>
                  {order.collection_time && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(order.collection_time).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Delivery Address</h3>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-2">
                    <Truck className="h-4 w-4 text-green-600 mt-1" />
                    <div className="text-sm text-foreground">
                      {order.delivery_address.street}<br />
                      {order.delivery_address.city}, {order.delivery_address.postcode}
                    </div>
                  </div>
                  {order.delivery_time && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(order.delivery_time).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Payment Summary</h3>
            <div className="space-y-2 p-4 rounded-lg bg-muted/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">£{(order.total_amount - (order.delivery_fee || 0)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">£{(order.delivery_fee || 0).toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="text-xl font-bold text-primary-600">
                    £{order.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {order.special_instructions && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Special Instructions</h3>
              <p className="text-sm text-muted-foreground p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                {order.special_instructions}
              </p>
            </div>
          )}

          {/* Timeline */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Order Timeline</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium text-foreground">
                  {new Date(order.created_at).toLocaleString('en-GB')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium text-foreground">
                  {new Date(order.updated_at).toLocaleString('en-GB')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <ReceiptModal
      isOpen={showReceipt}
      onClose={() => setShowReceipt(false)}
      order={order}
    />
    </>
  );
}
