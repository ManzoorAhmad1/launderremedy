"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function ReceiptModal({ isOpen, onClose, order }: ReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const handlePrint = () => {
    const content = receiptRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - Order #${order.orderId || order._id?.slice(-6)}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; font-size: 13px; color: #111; background: #fff; }
            .receipt { max-width: 600px; margin: 20px auto; padding: 30px; border: 1px solid #ddd; }
            .header { text-align: center; border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 16px; }
            .header h1 { font-size: 22px; font-weight: 700; color: #41154c; }
            .header p { font-size: 12px; color: #555; margin-top: 4px; }
            .order-number { background: #f3f4f6; padding: 8px 14px; border-radius: 6px; text-align: center; margin-bottom: 16px; font-size: 16px; font-weight: 700; letter-spacing: 1px; }
            .section { margin-bottom: 18px; }
            .section-title { font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 10px; }
            .row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
            .row .label { color: #555; }
            .row .value { font-weight: 600; }
            table { width: 100%; border-collapse: collapse; }
            th { text-align: left; font-size: 11px; text-transform: uppercase; color: #6b7280; padding: 6px 0; border-bottom: 1px solid #e5e7eb; }
            td { padding: 8px 0; font-size: 13px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
            .total-section { border-top: 2px solid #111; margin-top: 10px; padding-top: 10px; }
            .total-row { display: flex; justify-content: space-between; padding: 4px 0; }
            .grand-total { font-size: 16px; font-weight: 700; color: #41154c; }
            .footer { text-align: center; margin-top: 20px; padding-top: 14px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #888; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
            .badge-paid { background: #d1fae5; color: #059669; }
            .badge-pending { background: #fef3c7; color: #d97706; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 300);
  };

  const services = order.selected_services || [];
  const subtotal = parseFloat(order.orderPrice || 0);
  const serviceFee = parseFloat(order.serviceFee || 0);
  const discount = parseFloat(order.discount || 0);
  const total = parseFloat(order.totalPrice || 0);
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Receipt</DialogTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" /> Print / Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Receipt content */}
        <div ref={receiptRef}>
          <div className="receipt" style={{ maxWidth: 580, margin: "0 auto", padding: 24, border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff", color: "#111" }}>
            {/* Header */}
            <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#41154c" }}>Launder Remedy</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Laundry & Dry Cleaning Services • London</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>support@launderremedy.com • +44 7442 763306</div>
            </div>

            {/* Order number */}
            <div style={{ background: "#f3f4f6", padding: "8px 14px", borderRadius: 6, textAlign: "center", marginBottom: 16, fontSize: 15, fontWeight: 700, letterSpacing: 1 }}>
              ORDER #{order.orderId || order._id?.slice(-6)?.toUpperCase()}
            </div>

            {/* Date & status */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "#6b7280", borderBottom: "1px solid #e5e7eb", paddingBottom: 4, marginBottom: 10 }}>Order Info</div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Date</span><span style={{ fontWeight: 600 }}>{orderDate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Payment Status</span>
                <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700, background: order.payment_done ? "#d1fae5" : "#fef3c7", color: order.payment_done ? "#059669" : "#d97706" }}>
                  {order.payment_done ? "PAID" : "PENDING"}
                </span>
              </div>
              {order.card_last4 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                  <span style={{ color: "#555" }}>Card</span><span style={{ fontWeight: 600 }}>•••• {order.card_last4}</span>
                </div>
              )}
            </div>

            {/* Customer info */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "#6b7280", borderBottom: "1px solid #e5e7eb", paddingBottom: 4, marginBottom: 10 }}>Customer</div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Name</span><span style={{ fontWeight: 600 }}>{order.first_name} {order.last_name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Phone</span><span style={{ fontWeight: 600 }}>{order.phone_number}</span>
              </div>
              {order.address?.formatted_address && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                  <span style={{ color: "#555" }}>Address</span><span style={{ fontWeight: 600, textAlign: "right", maxWidth: 280 }}>{order.address.formatted_address}</span>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "#6b7280", borderBottom: "1px solid #e5e7eb", paddingBottom: 4, marginBottom: 10 }}>Schedule</div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Collection</span><span style={{ fontWeight: 600 }}>{order.collection_date} at {order.collection_time}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Delivery</span><span style={{ fontWeight: 600 }}>{order.delivery_date} at {order.delivery_time}</span>
              </div>
            </div>

            {/* Services */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "#6b7280", borderBottom: "1px solid #e5e7eb", paddingBottom: 4, marginBottom: 10 }}>Services</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", fontSize: 11, color: "#6b7280", padding: "4px 0", fontWeight: 600 }}>Item</th>
                    <th style={{ textAlign: "center", fontSize: 11, color: "#6b7280", padding: "4px 0", fontWeight: 600 }}>Qty</th>
                    <th style={{ textAlign: "right", fontSize: 11, color: "#6b7280", padding: "4px 0", fontWeight: 600 }}>Price</th>
                    <th style={{ textAlign: "right", fontSize: 11, color: "#6b7280", padding: "4px 0", fontWeight: 600 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length > 0 ? services.map((svc: any, i: number) => {
                    const qty = svc.quantity || 1;
                    const price = parseFloat(svc.price || 0);
                    const lineTotal = qty * price;
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "7px 0", fontSize: 13 }}>
                          <div style={{ fontWeight: 600 }}>{svc.title || svc.subcategory || svc.name || "Service"}</div>
                          {svc.categoryTitle && <div style={{ fontSize: 11, color: "#6b7280" }}>{svc.categoryTitle}</div>}
                        </td>
                        <td style={{ textAlign: "center", padding: "7px 0", fontSize: 13 }}>{qty}</td>
                        <td style={{ textAlign: "right", padding: "7px 0", fontSize: 13 }}>£{price.toFixed(2)}</td>
                        <td style={{ textAlign: "right", padding: "7px 0", fontSize: 13, fontWeight: 600 }}>£{lineTotal.toFixed(2)}</td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan={4} style={{ padding: "10px 0", color: "#6b7280", fontSize: 13 }}>No services listed</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div style={{ borderTop: "2px solid #111", paddingTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 13 }}>
                <span style={{ color: "#555" }}>Service Fee</span><span>£{serviceFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 13, color: "#059669" }}>
                  <span>Discount ({order.discountPercentage || 0}%)</span><span>-£{discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 17, fontWeight: 700, borderTop: "1px solid #e5e7eb", marginTop: 6, color: "#41154c" }}>
                <span>TOTAL</span><span>£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: 20, paddingTop: 14, borderTop: "1px solid #e5e7eb", fontSize: 11, color: "#888" }}>
              <p>Thank you for choosing Launder Remedy!</p>
              <p style={{ marginTop: 4 }}>www.launderremedy.com</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
