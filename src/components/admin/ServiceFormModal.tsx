"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MockService } from "@/lib/mockData/services";
import toast from "react-hot-toast";

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<MockService>) => Promise<void>;
  service?: MockService | null;
  mode: "create" | "edit";
}

export default function ServiceFormModal({
  isOpen,
  onClose,
  onSubmit,
  service,
  mode,
}: ServiceFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    turnaround_time: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    if (service && mode === "edit") {
      setFormData({
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        turnaround_time: service.turnaround_time || "",
        status: service.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        price: 0,
        turnaround_time: "",
        status: "active",
      });
    }
  }, [service, mode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Service title is required");
      return;
    }
    
    if (!formData.category.trim()) {
      toast.error("Category is required");
      return;
    }
    
    if (formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Service" : "Edit Service"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new laundry service. Fill in all the required information."
              : "Update the service information below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Service Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Wash & Fold"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Describe the service..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Washing">Washing</option>
              <option value="Dry Cleaning">Dry Cleaning</option>
              <option value="Ironing">Ironing</option>
              <option value="Alterations">Alterations</option>
              <option value="Specialized">Specialized</option>
            </select>
          </div>

          {/* Price and Turnaround Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Price (£) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) })
                }
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0.00"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Turnaround Time
              </label>
              <input
                type="text"
                value={formData.turnaround_time}
                onChange={(e) =>
                  setFormData({ ...formData, turnaround_time: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 24 hours"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "create" ? "Create Service" : "Update Service"}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
