"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MockOrder } from "@/lib/mockData/orders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "success" | "warning" => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
    case "out_for_delivery":
      return "default";
    case "pending":
      return "warning";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export const getOrderColumns = (
  onView: (order: MockOrder) => void,
  onUpdateStatus: (order: MockOrder) => void
): ColumnDef<MockOrder>[] => [
  {
    accessorKey: "order_number",
    header: "Order #",
    cell: ({ row }) => {
      const orderNumber = row.getValue("order_number") as string;
      return <span className="font-mono font-medium text-sm">{orderNumber}</span>;
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
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => {
      const services = row.getValue("services") as MockOrder['services'];
      const count = services.length;
      const firstService = services[0]?.service_name;
      return (
        <div className="text-sm">
          <span className="font-medium">{firstService}</span>
          {count > 1 && (
            <span className="text-muted-foreground ml-1">+{count - 1} more</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={getStatusVariant(status)}>
          {status.replace("_", " ").toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.getValue("payment_status") as string;
      return (
        <Badge
          variant={
            status === "paid"
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
    accessorKey: "total_amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("total_amount") as number;
      return <span className="font-semibold">£{amount.toFixed(2)}</span>;
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
      const order = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(order)}
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateStatus(order)}
            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
            title="Update Status"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
