"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MockPayment } from "@/lib/mockData/payments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

export const getPaymentColumns = (
  onView: (payment: MockPayment) => void
): ColumnDef<MockPayment>[] => [
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
    cell: ({ row }) => {
      const txnId = row.getValue("transaction_id") as string;
      return <span className="font-mono text-sm font-medium">{txnId}</span>;
    },
  },
  {
    accessorKey: "order_number",
    header: "Order",
    cell: ({ row }) => {
      const orderNumber = row.getValue("order_number") as string;
      return <span className="font-medium">{orderNumber}</span>;
    },
  },
  {
    accessorKey: "user_name",
    header: "Customer",
    cell: ({ row }) => {
      const name = row.getValue("user_name") as string;
      const email = row.original.user_email;
      return (
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: "Method",
    cell: ({ row }) => {
      const method = row.getValue("payment_method") as string;
      const cardBrand = row.original.card_brand;
      const cardLast4 = row.original.card_last4;
      
      if (method === "card" && cardBrand && cardLast4) {
        return (
          <div className="text-sm">
            <div className="font-medium">{cardBrand}</div>
            <div className="text-muted-foreground">•••• {cardLast4}</div>
          </div>
        );
      }
      return <span className="capitalize">{method.replace("_", " ")}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const currency = row.original.currency;
      return (
        <span className="font-semibold text-base">
          £{amount.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("payment_status") as string;
      return (
        <Badge
          variant={
            status === "success"
              ? "success"
              : status === "pending"
              ? "warning"
              : status === "failed"
              ? "destructive"
              : "secondary"
          }
        >
          {status.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(payment)}
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
            title="Download Receipt"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
