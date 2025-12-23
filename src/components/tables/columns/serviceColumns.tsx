"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MockService } from "@/lib/mockData/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, ChevronRight } from "lucide-react";

export const getServiceColumns = (
  onEdit: (service: MockService) => void,
  onDelete: (service: MockService) => void,
  onView: (service: MockService) => void
): ColumnDef<MockService>[] => [
  {
    accessorKey: "title",
    header: "Service Name",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const service = row.original;
      return (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-primary-600 transition-colors group"
          onClick={() => onView(service)}
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary-600" />
          <span className="font-medium">{title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return (
        <Badge variant="outline" className="font-normal">
          {category}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <span className="font-medium">£{price.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "perItemPrice",
    header: "Per Item",
    cell: ({ row }) => {
      const price = row.getValue("perItemPrice") as number;
      return <span className="text-muted-foreground">£{price.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "total_orders",
    header: "Orders",
    cell: ({ row }) => {
      const orders = row.getValue("total_orders") as number;
      return <span className="font-medium">{orders}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));
      return <span className="text-sm text-muted-foreground">{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const service = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(service)}
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(service)}
            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
            title="Edit Service"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(service)}
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            title="Delete Service"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
