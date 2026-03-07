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

function printSingleItem(order: any, service: any) {
  const unitPrice = parseFloat(String(service.price || 0));
  const qty = service.quantity || 1;
  const itemTotal = unitPrice * qty;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
  const w = window.open('', '_blank', 'width=340,height=600');
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><title>Receipt</title><style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Courier New',Courier,monospace;font-size:13px;color:#000;background:#fff;width:300px;margin:0 auto;padding:10px;}
    .center{text-align:center;}
    .bold{font-weight:bold;}
    .line{border-top:1px dashed #000;margin:6px 0;}
    .row{display:flex;justify-content:space-between;margin:3px 0;}
    .small{font-size:11px;}
    @media print{body{width:72mm;}}
  </style></head><body>
    <div class='center bold' style='font-size:16px;margin-bottom:4px;'>Launder Remedy</div>
    <div class='center small'>Laundry &amp; Dry Cleaning</div>
    <div class='center small'>support@launderremedy.com</div>
    <div class='line'></div>
    <div class='center small'>Order #${order.order_number || order._id?.slice(-6)?.toUpperCase() || 'N/A'}</div>
    <div class='center small'>${dateStr} ${timeStr}</div>
    <div class='line'></div>
    <div class='bold small'>Customer:</div>
    <div class='small'>${order.user_name || ((order.first_name || '') + ' ' + (order.last_name || '')).trim() || 'N/A'}</div>
    ${order.phone_number ? `<div class='small'>${order.phone_number}</div>` : ''}
    <div class='line'></div>
    <div class='bold small'>Item:</div>
    <div style='margin:4px 0;'>
      <div class='bold'>${service.service_name || service.subcategory || service.name || 'Service'}</div>
      <div class='row small'><span>Qty x Price</span><span>${qty} x £${unitPrice.toFixed(2)}</span></div>
      <div class='row bold'><span>Item Total</span><span>£${itemTotal.toFixed(2)}</span></div>
    </div>
    <div class='line'></div>
    <div class='row small'><span>Payment</span><span>${service.payment_done ? 'PAID' : 'PENDING'}</span></div>
    ${order.card_last4 ? `<div class='row small'><span>Card</span><span>**** ${order.card_last4}</span></div>` : ''}
    <div class='line'></div>
    <div class='center small' style='margin-top:8px;'>Thank you for choosing</div>
    <div class='center small bold'>Launder Remedy!</div>
    <div class='center small' style='margin-top:4px;'>launderremedy.com</div>
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
                      title="Print receipt for this item"
                      onClick={() => printSingleItem(order, { ...service, payment_done: isPaid })}
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
