"use client";

import React, { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/DataTable";
import { getUserColumns } from "@/components/tables/columns/userColumns";
import adminService from "@/services/admin.service";
import { userApi } from "@/api";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import UserViewModal from "@/components/admin/UserViewModal";
import toast from "react-hot-toast";

// Local User interface matching backend
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  type?: 'user' | 'admin';
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  bundles?: any[];
  address?: any;
  created_at: string;
  createdAt?: string;
  updatedAt?: string;
  total_orders?: number;
  total_spent?: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Note: Backend getAllUsers API is not implemented yet, using mock data
      const response = await adminService.users.getAll(1, 100);
      const usersData = response.data.map((u: any) => ({
        ...u,
        role: u.role || u.type || 'user',
        created_at: u.created_at || u.createdAt || new Date().toISOString(),
      }));
      setUsers(usersData);
    } catch (error) {
      toast.error("Failed to load users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    toast.success(`Edit user: ${user.email} (Feature coming soon)`);
    // TODO: Open edit modal
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      setDeleteLoading(true);
      // Using real API for delete
      await userApi.deleteAccount(selectedUser._id);
      toast.success("User deleted successfully");
      loadUsers();
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (user: User, newStatus: User['status']) => {
    try {
      // Using mock service for now, real API not implemented yet
      await adminService.users.update(user._id, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
      loadUsers();
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  };

  const columns = getUserColumns(handleEdit, handleDelete, handleView);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Users Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your platform users and their accounts
          </p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span className="hidden xs:inline">Add User</span>
          <span className="xs:hidden">Add</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold text-foreground">{users.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Inactive</p>
          <p className="text-2xl font-bold text-yellow-600">
            {users.filter((u) => u.status === "inactive").length}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Suspended</p>
          <p className="text-2xl font-bold text-red-600">
            {users.filter((u) => u.status === "suspended").length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-6">
        <DataTable
          columns={columns}
          data={users as any}
          searchKey="email"
          searchPlaceholder="Search by email..."
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.first_name} ${selectedUser?.last_name}? This will permanently remove their account and all associated data.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />

      {/* View User Modal */}
      <UserViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        user={selectedUser as any}
      />
    </div>
  );
}
