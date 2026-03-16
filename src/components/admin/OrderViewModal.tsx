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
  FileText,
  CheckCircle,
  Loader2,
  CreditCard,
  Printer
} from "lucide-react";
import ReceiptModal from "@/components/admin/ReceiptModal";
import { orderApi } from "@/api";
import toast from "react-hot-toast";

function printSingleItem(order: any, service: any, itemIndex: number, totalItems: number) {
  const unitPrice = parseFloat(String(service.price || 0));
  const qty = service.quantity || 1;
  const itemTotal = unitPrice * qty;
  const now = new Date();
  // Format: Sat 13/12/25
  const dayName = now.toLocaleDateString('en-GB', { weekday: 'short' });
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const dateFormatted = `${dayName} ${dateStr}`;
  // Order number — last 4 digits or order_number
  const orderNum = order.order_number || order._id?.slice(-4)?.toUpperCase() || 'N/A';
  // Item counter: e.g. 1/3
  const itemCounter = `${itemIndex + 1}/${totalItems}`;
  // Service name + qty
  const serviceName = service.service_name || service.subcategory || service.title || service.name || 'Service';
  const itemLine = `${serviceName} x ${qty}`;
  // Customer name — last name first like the label photo
  const fullName = order.user_name || `${order.first_name || ''} ${order.last_name || ''}`.trim() || 'N/A';
  const nameParts = fullName.trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
  const nameFormatted = lastName ? `${lastName} ${firstName}` : firstName;
  // Status short code
  const statusMap: Record<string, string> = {
    pending: 'Pending', processing: 'In Progress', completed: 'Done',
    cancelled: 'Cancelled', out_for_delivery: 'Delivery',
  };
  const statusShort = statusMap[order.status] || order.status || 'N/A';

  const w = window.open('', '_blank', 'width=380,height=260');
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><title>Label</title><style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{
      font-family:'Courier New',Courier,monospace;
      background:#f87171;
      color:#000;
      width:340px;
      min-height:120px;
      padding:14px 16px;
      margin:0 auto;
    }
    .row1{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;}
    .order-num{font-size:28px;font-weight:900;letter-spacing:1px;}
    .date{font-size:15px;font-weight:bold;}
    .row2{display:flex;align-items:baseline;gap:10px;margin-bottom:6px;}
    .counter{font-size:18px;font-weight:900;}
    .item{font-size:15px;font-weight:bold;}
    .row3{display:flex;justify-content:space-between;align-items:baseline;}
    .customer{font-size:15px;font-weight:bold;}
    .status{font-size:13px;font-weight:bold;}
    .price{font-size:12px;margin-top:6px;text-align:right;opacity:0.8;}
    @media print{
      body{width:72mm;background:#f87171 !important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    }
  </style></head><body>
    <div class='row1'>
      <span class='order-num'>${orderNum}</span>
      <span class='date'>${dateFormatted}</span>
    </div>
    <div class='row2'>
      <span class='counter'>${itemCounter}</span>
      <span class='item'>${itemLine}</span>
    </div>
    <div class='row3'>
      <span class='customer'>${nameFormatted}</span>
      <span class='status'>St: ${statusShort}</span>
    </div>
    <div class='price'>£${itemTotal.toFixed(2)} ${service.payment_done ? '✓ Paid' : '· Pending'}</div>
  </body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => { w.print(); w.close(); }, 300);
}

interface OrderViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: MockOrder | null;
  onOrderUpdated?: () => void;
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
  onOrderUpdated,
}: OrderViewModalProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const [chargingIndex, setChargingIndex] = useState<number | null>(null);

  const handleChargeItem = async (serviceIndex: number, service: any) => {
    if (!order) return;
    setChargingIndex(serviceIndex);
    try {
      const res: any = await orderApi.chargeOrderItem(order._id, serviceIndex);
      toast.success(res?.message || `Payment charged for ${service.service_name || service.subcategory}`);
      if (res?.data?.allPaid) {
        toast.success('All items charged — order marked complete!');
      }
      if (onOrderUpdated) onOrderUpdated();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to charge item');
    } finally {
      setChargingIndex(null);
    }
  };

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
                (order.payment_status || (order.payment_done ? 'paid' : 'pending')) === "paid"
                  ? "default"
                  : "secondary"
              }
            >
              Payment: {(order.payment_status || (order.payment_done ? 'paid' : 'pending')).toUpperCase()}
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
            <h3 className="text-sm font-semibold text-foreground mb-1">Services</h3>
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
              <CreditCard className="h-3 w-3" /> Click "Charge" to deduct payment for each item individually
            </p>
            <div className="space-y-2">
            {(order?.services?.length ? order.services : (order?.selected_services || [])).map((service: any, index: number) => {
              const allServices = order?.services?.length ? order.services : (order?.selected_services || []);
              const totalItems = allServices.length;
              const unitPrice = parseFloat(String(service.price || 0));
              const qty = service.quantity || 1;
              const itemTotal = unitPrice * qty;
              const isPaid = !!service.payment_done;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Package className="h-5 w-5 text-purple-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {service.service_name || service.subcategory || service.title || service.name || 'Service'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {service.category || service.categoryTitle || ''} &bull; Qty: {qty} &bull; £{unitPrice.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-sm font-bold text-foreground">£{itemTotal.toFixed(2)}</span>
                    {isPaid ? (
                      <Button
                        size="sm"
                        className="h-7 text-xs px-2 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed line-through"
                        disabled
                      >
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Paid
                      </Button>
                    ) : order.status === 'completed' ? (
                      <Button size="sm" className="h-7 text-xs px-2 bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed" disabled>
                        Done
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="h-7 text-xs px-2"
                        disabled={chargingIndex !== null}
                        onClick={() => handleChargeItem(index, service)}
                      >
                        {chargingIndex === index ? (
                          <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Charging...</>
                        ) : (
                          `Charge £${itemTotal.toFixed(2)}`
                        )}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-7 p-0 shrink-0"
                      title="Print label for this item"
                      onClick={() => printSingleItem(order, { ...service, payment_done: isPaid }, index, totalItems)}
                    >
                      <Printer className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Per-item payment summary */}
            {(() => {
              const allServices = order?.services?.length ? order.services : (order?.selected_services || []);
              const paidItems = allServices.filter((s: any) => s.payment_done);
              const paidTotal = paidItems.reduce((sum: number, s: any) => sum + (parseFloat(String(s.price || 0)) * (s.quantity || 1)), 0);
              const remainingTotal = allServices.reduce((sum: number, s: any) => sum + (s.payment_done ? 0 : parseFloat(String(s.price || 0)) * (s.quantity || 1)), 0);
              if (allServices.length === 0) return null;
              return (
                <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Collected so far</span>
                    <span className="font-semibold text-green-600">£{paidTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining to charge</span>
                    <span className="font-semibold text-orange-600">£{remainingTotal.toFixed(2)}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Address & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Collection */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Collection</h3>
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">
                    {order.address?.formatted_address || order.address?.street || order.address?.line1 || 'N/A'}
                  </p>
                </div>
                {(order.collection_date || order.collection_time) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {order.collection_date}{order.collection_time ? ` • ${order.collection_time}` : ''}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Delivery</h3>
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">
                    {order.address?.formatted_address || order.address?.street || order.address?.line1 || 'N/A'}
                  </p>
                </div>
                {(order.delivery_date || order.delivery_time) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {order.delivery_date}{order.delivery_time ? ` • ${order.delivery_time}` : ''}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Payment Summary</h3>
            <div className="space-y-2 p-4 rounded-lg bg-muted/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order Price</span>
                <span className="font-medium">£{(parseFloat(String(order.orderPrice || '0')) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-medium">£{(parseFloat(String(order.serviceFee || '0')) || 0).toFixed(2)}</span>
              </div>
              {parseFloat(String(order.discount || '0')) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Discount {order.isFirstOrder ? '(First Order 25%)' : order.discountPercentage ? `(${order.discountPercentage}%)` : ''}
                  </span>
                  <span className="font-medium text-green-600">−£{(parseFloat(String(order.discount || '0')) || 0).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total Charged</span>
                  <span className="text-xl font-bold text-primary-600">
                    £{(parseFloat(String(order.totalPrice || order.total_amount || '0')) || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              {order.card_last4 && (
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-muted-foreground">Card</span>
                  <span className="font-medium">•••• {order.card_last4}</span>
                </div>
              )}
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
                  {order.createdAt || order.created_at
                    ? new Date((order.createdAt || order.created_at)!).toLocaleString('en-GB')
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium text-foreground">
                  {order.updatedAt || order.updated_at
                    ? new Date((order.updatedAt || order.updated_at)!).toLocaleString('en-GB')
                    : 'N/A'}
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
