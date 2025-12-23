"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MockService } from "@/lib/mockData/services";
import { Calendar, DollarSign, Package, Clock, Tag } from "lucide-react";

interface ServiceViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: MockService | null;
}

export default function ServiceViewModal({
  isOpen,
  onClose,
  service,
}: ServiceViewModalProps) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service.title}</DialogTitle>
          <DialogDescription>
            Detailed information about this service
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <Badge variant={service.status === "active" ? "default" : "secondary"}>
              {service.status}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Tag className="h-5 w-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Category</p>
                <p className="text-sm font-semibold text-foreground">{service.category}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Price</p>
                <p className="text-sm font-semibold text-foreground">£{service.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Per Item Price */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Package className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Per Item Price</p>
                <p className="text-sm font-semibold text-foreground">£{service.perItemPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Turnaround Time */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Turnaround Time</p>
                <p className="text-sm font-semibold text-foreground">{service.turnaround_time}</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <span className="text-sm text-muted-foreground">Total Orders</span>
                <span className="text-lg font-bold text-blue-600">{service.total_orders}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <span className="text-lg font-bold text-green-600">
                  £{(service.price * service.total_orders).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Timeline</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium text-foreground">
                  {new Date(service.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium text-foreground">
                  {new Date(service.updated_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
