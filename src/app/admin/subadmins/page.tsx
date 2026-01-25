"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Edit, Trash2, Power, Search, Shield, Key, Users, X } from "lucide-react";
import Select from "react-select";
import subadminService from "@/services/subadmin.service";
import userService from "@/services/user.service";
import toast from "react-hot-toast";

const AVAILABLE_PERMISSIONS = [
  { value: 'users', label: 'Users Management' },
  { value: 'services', label: 'Services Management' },
  { value: 'orders', label: 'Orders Management' },
  { value: 'payments', label: 'Payments Management' },
  { value: 'reports', label: 'Reports & Analytics' },
  { value: 'blogs', label: 'Blog Management' },
  { value: 'settings', label: 'Settings' },
];

export default function AdminSubAdminsPage() {
  const [subAdmins, setSubAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingSubAdminId, setDeletingSubAdminId] = useState<string | null>(null);
  const [editingSubAdmin, setEditingSubAdmin] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<any[]>([]);
  const [userSearchText, setUserSearchText] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    permissions: [] as string[],
    assigned_users: [] as string[],
  });

  useEffect(() => {
    loadSubAdmins();
  }, []);

  useEffect(() => {
    if (showModal) {
      loadUsers("");
    }
  }, [showModal]);

  const loadUsers = async (search: string) => {
    try {
      setLoadingUsers(true);
      const response = await userService.getAllUsers();
      console.log("API Response:", response);
      
      // API returns data.items array
      const allUsersData = response.data?.items || response.data || [];
      console.log("All Users Data:", allUsersData);
      
      const regularUsers = allUsersData.filter((u: any) => u.type === 'user');
      console.log("Regular Users (type='user'):", regularUsers);
      
      setAllUsers(regularUsers);
      
      // Filter and display
      let filteredUsers = regularUsers;
      if (search) {
        filteredUsers = regularUsers.filter((u: any) => 
          u.first_name?.toLowerCase().includes(search.toLowerCase()) ||
          u.last_name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()) ||
          u.address?.street?.toLowerCase().includes(search.toLowerCase()) ||
          u.address?.city?.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Show first 10 users by default
      setDisplayedUsers(filteredUsers.slice(0, 10));
      console.log("Displayed Users:", filteredUsers.slice(0, 10));
    } catch (error: any) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserSearch = useCallback((search: string) => {
    setUserSearchText(search);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search - wait 500ms after user stops typing
    searchTimeoutRef.current = setTimeout(() => {
      if (!search) {
        // No search, show first 10 users
        setDisplayedUsers(allUsers.slice(0, 10));
      } else {
        // Filter users based on search
        const filtered = allUsers.filter((u: any) => 
          u.first_name?.toLowerCase().includes(search.toLowerCase()) ||
          u.last_name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()) ||
          u.address?.street?.toLowerCase().includes(search.toLowerCase()) ||
          u.address?.city?.toLowerCase().includes(search.toLowerCase())
        );
        setDisplayedUsers(filtered.slice(0, 10));
      }
    }, 500);
  }, [allUsers]);

  const loadSubAdmins = async () => {
    try {
      setLoading(true);
      const response = await subadminService.getAllSubAdmins();
      console.log("SubAdmins Response:", response);
      console.log("SubAdmins Data:", response.data);
      setSubAdmins(response.data || []);
    } catch (error: any) {
      console.error("Failed to load sub-admins:", error);
      toast.error(error.message || "Failed to load sub-admins");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (subAdmin: any = null) => {
    if (subAdmin) {
      console.log("Opening modal for SubAdmin:", subAdmin);
      console.log("SubAdmin assigned_users:", subAdmin.assigned_users);
      
      setEditingSubAdmin(subAdmin);
      const assignedUserIds = subAdmin.assigned_users?.map((u: any) => u._id || u) || [];
      console.log("Extracted User IDs:", assignedUserIds);
      
      setFormData({
        email: subAdmin.email,
        password: "",
        first_name: subAdmin.first_name || "",
        last_name: subAdmin.last_name || "",
        phone_number: subAdmin.phone_number || "",
        permissions: subAdmin.permissions || [],
        assigned_users: assignedUserIds,
      });
      
      // Store assigned users in allUsers state so they can be displayed
      if (subAdmin.assigned_users && Array.isArray(subAdmin.assigned_users)) {
        const assignedUsersArray = subAdmin.assigned_users.filter((u: any) => u && u._id);
        console.log("Assigned Users Array:", assignedUsersArray);
        
        setAllUsers((prev) => {
          // Merge existing users with assigned users, avoiding duplicates
          const existingIds = new Set(prev.map((u) => u._id));
          const newUsers = assignedUsersArray.filter((u: any) => !existingIds.has(u._id));
          return [...prev, ...newUsers];
        });
        setDisplayedUsers((prev) => {
          const existingIds = new Set(prev.map((u) => u._id));
          const newUsers = assignedUsersArray.filter((u: any) => !existingIds.has(u._id));
          return [...prev, ...newUsers];
        });
      }
    } else {
      setEditingSubAdmin(null);
      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        permissions: [],
        assigned_users: [],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubAdmin(null);
    setUserSearchText(""); // Clear search text when closing modal
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSubAdmin) {
        const updatePayload: any = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          permissions: formData.permissions,
          assigned_users: formData.assigned_users,
        };
        
        if (formData.password) {
          updatePayload.password = formData.password;
        }
        
        console.log("Update Payload:", updatePayload);
        console.log("Assigned Users IDs:", formData.assigned_users);
        
        await subadminService.updateSubAdmin(editingSubAdmin._id, updatePayload);
        toast.success("Sub-admin updated successfully!");
      } else {
        if (!formData.password) {
          toast.error("Password is required for new sub-admin");
          return;
        }
        
        const createPayload = { ...formData };
        console.log("Create Payload:", createPayload);
        console.log("Assigned Users IDs:", formData.assigned_users);
        
        await subadminService.createSubAdmin(createPayload);
        toast.success("Sub-admin created successfully!");
      }
      
      handleCloseModal();
      loadSubAdmins();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingSubAdminId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingSubAdminId) return;
    
    try {
      await subadminService.deleteSubAdmin(deletingSubAdminId);
      toast.success("Sub-admin deleted successfully!");
      setShowDeleteModal(false);
      setDeletingSubAdminId(null);
      loadSubAdmins();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete sub-admin");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await subadminService.toggleSubAdminStatus(id);
      toast.success("Status updated successfully!");
      loadSubAdmins();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const togglePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const filteredSubAdmins = subAdmins.filter((sa) =>
    sa.email.toLowerCase().includes(searchText.toLowerCase()) ||
    `${sa.first_name} ${sa.last_name}`.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sub-Admins</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage sub-administrators and their permissions
          </p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Sub-Admin
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search sub-admins..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredSubAdmins.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    No sub-admins found
                  </td>
                </tr>
              ) : (
                filteredSubAdmins.map((subAdmin) => (
                  <tr key={subAdmin._id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {subAdmin.first_name} {subAdmin.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{subAdmin.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{subAdmin.phone_number || "N/A"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {console.log("SubAdmin:", subAdmin.email, "Assigned Users:", subAdmin.assigned_users)}
                          {subAdmin.assigned_users?.length || 0} user{subAdmin.assigned_users?.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {subAdmin.permissions?.length > 0 ? (
                          subAdmin.permissions.slice(0, 3).map((perm: string, i: number) => (
                            <span key={i} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                              {perm}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No permissions</span>
                        )}
                        {subAdmin.permissions?.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{subAdmin.permissions.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subAdmin.is_active ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {subAdmin.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleToggleStatus(subAdmin._id)} className={`p-2 ${
                          subAdmin.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800"
                        }`} title={subAdmin.is_active ? "Deactivate" : "Activate"}>
                          <Power className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleOpenModal(subAdmin)} className="text-blue-600 hover:text-blue-800 p-2">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(subAdmin._id)} className="text-red-600 hover:text-red-800 p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}>
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {editingSubAdmin ? "Edit Sub-Admin" : "Add Sub-Admin"}
                </h2>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input type="text" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" autoComplete="off" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input type="text" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" autoComplete="off" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" autoComplete="off" required disabled={!!editingSubAdmin} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input type="tel" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" autoComplete="off" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Password {editingSubAdmin ? "(Leave blank to keep current)" : "*"}
                    </div>
                  </label>
                  <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary" autoComplete="new-password" required={!editingSubAdmin} placeholder={editingSubAdmin ? "Enter new password to change" : ""} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Permissions *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {AVAILABLE_PERMISSIONS.map((perm) => (
                      <label key={perm.value} className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted transition-colors">
                        <input type="checkbox" checked={formData.permissions.includes(perm.value)} onChange={() => togglePermission(perm.value)} className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary" />
                        <span className="text-sm text-foreground">{perm.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Assign Users (Location-based)
                    </div>
                  </label>
                  <Select
                    isMulti
                    options={displayedUsers.map((user) => ({ value: user?._id, label: `${user?.first_name} ${user?.last_name}`, user }))}
                    value={formData.assigned_users.length > 0 ? allUsers.filter((user) => formData.assigned_users.includes(user?._id)).map((user) => ({ value: user?._id, label: `${user?.first_name} ${user?.last_name}`, user })) : []}
                    onChange={(selected) => setFormData({ ...formData, assigned_users: selected ? selected.map((s: any) => s.value) : [] })}
                    onInputChange={(value, action) => {
                      // Only handle user typing, not other actions
                      if (action.action === 'input-change') {
                        handleUserSearch(value);
                      }
                    }}
                    inputValue={userSearchText}
                    filterOption={(option: any, inputValue: string) => {
                      if (!inputValue) return true;
                      const searchLower = inputValue.toLowerCase();
                      const user = option.data?.user || option.user;
                      if (!user) return false;
                      return (
                        user.first_name?.toLowerCase().includes(searchLower) ||
                        user.last_name?.toLowerCase().includes(searchLower) ||
                        user.email?.toLowerCase().includes(searchLower) ||
                        user.address?.street?.toLowerCase().includes(searchLower) ||
                        user.address?.city?.toLowerCase().includes(searchLower)
                      );
                    }}
                    isLoading={loadingUsers}
                    formatOptionLabel={(option: any) => (
                      <div className="py-2 px-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            {option.user?.first_name?.charAt(0)}{option.user?.last_name?.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground text-sm">{option.user?.first_name} {option.user?.last_name}</div>
                            <div className="text-xs text-muted-foreground truncate">{option.user?.email}</div>
                            {option.user?.address && (option.user?.address.street || option.user?.address.city) && (
                              <div className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 mt-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                <span className="truncate">{option.user?.address.street || option.user?.address.city || 'Address available'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Search users by name, email, or location..."
                    noOptionsMessage={() => loadingUsers ? "Loading..." : "No users found"}
                  />
                  <p className="text-xs text-muted-foreground mt-2">Search by name, email, or location.</p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors">
                    {editingSubAdmin ? "Update Sub-Admin" : "Create Sub-Admin"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => { setShowDeleteModal(false); setDeletingSubAdminId(null); }}>
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900"><Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Delete Sub-Admin</h3>
                  <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setShowDeleteModal(false); setDeletingSubAdminId(null); }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <p className="text-foreground mb-6">Are you sure you want to delete this sub-admin?</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => { setShowDeleteModal(false); setDeletingSubAdminId(null); }} className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
