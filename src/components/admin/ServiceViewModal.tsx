"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MockService } from "@/lib/mockData/services";
import { Calendar, DollarSign, Package, Clock, Tag, Edit2, Save, X, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { serviceApi } from "@/api";

interface ServiceViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: MockService | null;
  onUpdate?: () => void;
}

export default function ServiceViewModal({
  isOpen,
  onClose,
  service,
  onUpdate,
}: ServiceViewModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubcategories, setEditedSubcategories] = useState<any[]>([]);

  useEffect(() => {
    if (service) {
      setEditedTitle(service.title || "");
      setEditedSubcategories(service.subcategories || []);
    }
  }, [service]);

  if (!service) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await serviceApi.updateService(service._id, {
        title: editedTitle,
        subcategories: editedSubcategories,
      });
      toast.success("Service updated successfully");
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(service.title);
    setEditedSubcategories(service.subcategories || []);
    setIsEditing(false);
  };

  const updateSubcategory = (index: number, field: string, value: any) => {
    const updated = [...editedSubcategories];
    updated[index] = { ...updated[index], [field]: value };
    setEditedSubcategories(updated);
  };

  const deleteSubcategory = (index: number) => {
    const updated = editedSubcategories.filter((_, i) => i !== index);
    setEditedSubcategories(updated);
  };

  const addSubcategory = () => {
    setEditedSubcategories([
      ...editedSubcategories,
      {
        title: "",
        description: "",
        price: "0",
        quantity: 0,
        _id: `temp_${Date.now()}`,
      },
    ]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-bold"
                  placeholder="Service Title"
                />
              ) : (
                <DialogTitle className="text-2xl">{service.title}</DialogTitle>
              )}
              <DialogDescription>
                {isEditing ? "Edit service details" : "Detailed information about this service"}
              </DialogDescription>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <Badge variant={service.status === "active" ? "default" : "secondary"}>
              {service.status}
            </Badge>
          </div>

          {/* Subcategories Section */}
          {(service.subcategories && service.subcategories.length > 0) && (
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Subcategories ({editedSubcategories.length})
                </h3>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addSubcategory}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                )}
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {editedSubcategories.map((sub: any, index: number) => (
                  <div
                    key={sub._id || index}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 space-y-2">
                            <Input
                              value={sub.title || ""}
                              onChange={(e) => updateSubcategory(index, "title", e.target.value)}
                              placeholder="Item name"
                              className="font-medium"
                            />
                            <Input
                              value={sub.description || ""}
                              onChange={(e) => updateSubcategory(index, "description", e.target.value)}
                              placeholder="Description"
                              className="text-sm"
                            />
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={sub.price || ""}
                                onChange={(e) => updateSubcategory(index, "price", e.target.value)}
                                placeholder="Price"
                                className="w-32"
                              />
                              {sub.bundleQuantity && (
                                <Input
                                  type="number"
                                  value={sub.bundleQuantity || ""}
                                  onChange={(e) => updateSubcategory(index, "bundleQuantity", e.target.value)}
                                  placeholder="Bundle Qty"
                                  className="w-32"
                                />
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSubcategory(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{sub.title}</h4>
                            {sub.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {sub.description}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">
                              £{Number(sub.price || 0).toFixed(2)}
                            </p>
                            {sub.bundleQuantity && (
                              <p className="text-xs text-muted-foreground">
                                Bundle: {sub.bundleQuantity}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statistics */}
          {!isEditing && (
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <span className="text-sm text-muted-foreground">Total Orders</span>
                  <span className="text-lg font-bold text-blue-600">{service.total_orders || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="text-lg font-bold text-green-600">
                    £{((service.price || 0) * (service.total_orders || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {isEditing && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
