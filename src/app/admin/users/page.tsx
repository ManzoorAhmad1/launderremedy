"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Plus, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/DataTable";
import { getUserColumns } from "@/components/tables/columns/userColumns";
import { userApi } from "@/api";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import UserViewModal from "@/components/admin/UserViewModal";
import AddUserModal from "@/components/admin/AddUserModal";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const itemPerPage = 10;

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1); // Reset to page 1 on new search
      loadUsers(1, searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    loadUsers(page, searchText);
  }, [page]);

  const loadUsers = async (currentPage: number = page, search: string = searchText) => {
    try {
      setLoading(true);
      
      const response = await userApi.getAllUsers({
        page: currentPage,
        itemPerPage,
        searchText: search,
      });
      
      const data = response?.data;
      if (data && data.items) {
        setUsers(data.items);
        setTotalUsers(data.total);
        setTotalPages(data.totalPages);
      } else {
        setUsers([]);
        setTotalUsers(0);
        setTotalPages(1);
      }
    } catch (error) {
      toast.error("Failed to load users");
      console.error(error);
      setUsers([]);
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
        <Button className="gap-2 w-full sm:w-auto" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4" />
          <span className="hidden xs:inline">Add User</span>
          <span className="xs:hidden">Add</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
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
        {/* Search Bar */}
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email or phone..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={users as any}
          searchKey="email"
          searchPlaceholder="Search by email..."
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages} ({totalUsers} total users)
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
              >
                Next
              </Button>
            </div>
          </div>
        )}
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

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => loadUsers()}
      />
    </div>
  );
}
