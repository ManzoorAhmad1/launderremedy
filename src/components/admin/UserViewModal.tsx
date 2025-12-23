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
import { MockUser } from "@/lib/mockData/users";
import { Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, User as UserIcon } from "lucide-react";

interface UserViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: MockUser | null;
}

export default function UserViewModal({
  isOpen,
  onClose,
  user,
}: UserViewModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {user.first_name} {user.last_name}
          </DialogTitle>
          <DialogDescription>
            Detailed customer information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <Badge
              variant={
                user.status === "active"
                  ? "default"
                  : user.status === "inactive"
                  ? "secondary"
                  : "destructive"
              }
            >
              {user.status}
            </Badge>
            {user.role === "admin" && (
              <Badge variant="default" className="bg-purple-600">
                Admin
              </Badge>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm font-semibold text-foreground">{user.phone_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          {user.address && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Address</h3>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Location</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {user.address.street}<br />
                    {user.address.city}, {user.address.postcode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Customer Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Total Orders</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{user.total_orders}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Total Spent</span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  £{user.total_spent.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Account Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined:</span>
                <span className="font-medium text-foreground">
                  {new Date(user.created_at).toLocaleDateString('en-GB', {
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
                  {new Date(user.updated_at || user.created_at).toLocaleDateString('en-GB', {
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
