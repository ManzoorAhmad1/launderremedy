"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Users, Mail, Phone, MapPin, Package, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import subadminService from "@/services/subadmin.service";

export default function MyUsersPage() {
  const user = useSelector((state: any) => state.user.user);
  const [assignedUsers, setAssignedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadAssignedUsers();
  }, [user?._id]);

  const loadAssignedUsers = async () => {
    try {
      setLoading(true);
      
      if (!user || !user._id) {
        toast.error("User not found");
        return;
      }

      // Fetch the subadmin's profile with populated assigned_users
      const response = await subadminService.getAllSubAdmins();
      const currentSubAdmin = response.data?.find((sa: any) => sa._id === user._id);
      
      if (currentSubAdmin && currentSubAdmin.assigned_users) {
        console.log("Assigned Users:", currentSubAdmin.assigned_users);
        setAssignedUsers(currentSubAdmin.assigned_users);
      } else {
        setAssignedUsers([]);
      }
    } catch (error: any) {
      console.error("Failed to load assigned users:", error);
      toast.error("Failed to load assigned users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = assignedUsers.filter((u) =>
    u.first_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    u.last_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchText.toLowerCase()) ||
    u.address?.street?.toLowerCase().includes(searchText.toLowerCase()) ||
    u.address?.city?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            My Assigned Users
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Users assigned to you for management
          </p>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg">
          <Users className="w-4 h-4" />
          <span className="font-semibold">{filteredUsers.length} Users</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search users by name, email, or location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-4 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Users Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchText ? "No users found" : "No users assigned yet"}
          </h3>
          <p className="text-muted-foreground">
            {searchText ? "Try adjusting your search" : "Please contact admin to assign users to you"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((assignedUser) => (
            <div
              key={assignedUser._id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50"
            >
              {/* User Avatar & Name */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {assignedUser.first_name?.charAt(0)}{assignedUser.last_name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground truncate">
                    {assignedUser.first_name} {assignedUser.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm text-foreground truncate">{assignedUser.email}</p>
                  </div>
                </div>

                {assignedUser.phone_number && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm text-foreground">{assignedUser.phone_number}</p>
                    </div>
                  </div>
                )}

                {assignedUser.address && (assignedUser.address.street || assignedUser.address.city) && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="text-sm text-foreground">
                        {assignedUser.address.street && `${assignedUser.address.street}, `}
                        {assignedUser.address.city}
                        {assignedUser.address.postcode && ` ${assignedUser.address.postcode}`}
                      </p>
                    </div>
                  </div>
                )}

                {assignedUser.createdAt && (
                  <div className="flex items-start gap-3 pt-3 border-t border-border">
                    <Calendar className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Member Since</p>
                      <p className="text-sm text-foreground">
                        {new Date(assignedUser.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                View Orders
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
