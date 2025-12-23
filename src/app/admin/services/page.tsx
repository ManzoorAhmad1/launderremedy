"use client";

import React, { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/DataTable";
import { getServiceColumns } from "@/components/tables/columns/serviceColumns";
import { serviceApi } from "@/api";
import ServiceFormModal from "@/components/admin/ServiceFormModal";
import ServiceViewModal from "@/components/admin/ServiceViewModal";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import toast from "react-hot-toast";

// Local Service interface matching backend and MockService
interface Service {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  perItemPrice: number;
  category: string;
  priceList?: Array<{
    title: string;
    price: number;
    description?: string;
    subCategory?: any[];
  }>;
  subcategories?: any[];
  status?: "active" | "inactive";
  unit?: string;
  total_orders?: number;
  created_at?: string;
  updated_at?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await serviceApi.getAllServices();
      const servicesData = (response.data || []).map(s => ({
        ...s,
        price: s.priceList?.[0]?.price || 0,
        perItemPrice: s.priceList?.[0]?.price || 0,
        category: s.title || 'General',
        description: s.description || '',
      }));
      setServices(servicesData);
    } catch (error) {
      toast.error("Failed to load services");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedService(null);
    setShowCreateModal(true);
  };

  const handleView = (service: Service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const handleCreateSubmit = async (data: Partial<Service>) => {
    try {
      await serviceApi.createService({
        title: data.title!,
        image: data.image || '',
        description: data.description,
        priceList: data.priceList,
        subcategories: data.subcategories,
      });
      toast.success("Service created successfully");
      loadServices();
      setShowCreateModal(false);
    } catch (error) {
      toast.error("Failed to create service");
      console.error(error);
    }
  };

  const handleEditSubmit = async (data: Partial<Service>) => {
    if (!selectedService) return;
    try {
      await serviceApi.updateService(selectedService._id, data);
      toast.success("Service updated successfully");
      loadServices();
      setShowEditModal(false);
    } catch (error) {
      toast.error("Failed to update service");
      console.error(error);
    }
  };

  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedService) return;
    
    try {
      setDeleteLoading(true);
      await serviceApi.deleteService(selectedService._id);
      toast.success("Service deleted successfully");
      loadServices();
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Failed to delete service");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusToggle = async (service: Service) => {
    const newStatus = service.status === "active" ? "inactive" : "active";
    try {
      await serviceApi.updateService(service._id, { status: newStatus } as any);
      toast.success(`Service ${newStatus === "active" ? "activated" : "deactivated"}`);
      loadServices();
    } catch (error) {
      toast.error("Failed to update service status");
      console.error(error);
    }
  };

  const columns = getServiceColumns(handleEdit as any, handleDelete as any, handleView as any);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const activeServices = services.filter((s) => s.status === "active").length;
  const inactiveServices = services.filter((s) => s.status === "inactive").length;
  const totalOrders = services.reduce((sum, s) => sum + (s.total_orders || 0), 0);
  const totalRevenue = services.reduce(
    (sum, s) => {
      const price = s.price || s.perItemPrice || s.priceList?.[0]?.price || 0;
      return sum + price * (s.total_orders || 0);
    },
    0
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Services Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Create, update, and manage your laundry services (Admin Only)
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span className="hidden xs:inline">Create Service</span>
          <span className="xs:hidden">Create</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total Services</p>
          <p className="text-2xl font-bold text-foreground">{services.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600">{activeServices}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-purple-600">
            £{totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg p-3 md:p-4">
        <div className="flex gap-2 md:gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-primary-600 dark:text-primary-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-100">
              Admin Only Access
            </h3>
            <p className="mt-1 text-sm text-primary-700 dark:text-primary-300">
              Only administrators can create, update, or delete services. Changes
              will immediately reflect on the customer-facing frontend.
            </p>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-6">
        <DataTable
          columns={columns}
          data={services as any}
          searchKey="title"
          searchPlaceholder="Search services..."
        />
      </div>

      {/* Create Service Modal */}
      <ServiceFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
        mode="create"
      />

      {/* Edit Service Modal */}
      <ServiceFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        service={selectedService as any}
        mode="edit"
      />

      {/* View Service Modal */}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        description={`Are you sure you want to delete "${selectedService?.title}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
      <ServiceViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        service={selectedService as any}
      />
    </div>
  );
}
