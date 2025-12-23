"use client";

import React, { useState, useEffect } from "react";
import { Save, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { userApi } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      await userApi.changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileData.first_name || !profileData.email) {
      toast.error("Please fill required fields");
      return;
    }

    setSaving(true);
    try {
      await userApi.updateProfile(profileData);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your admin profile and preferences
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Admin Profile Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
              <User className="h-5 w-5 text-primary-700 dark:text-primary-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Admin Profile
              </h2>
              <p className="text-sm text-muted-foreground">
                Update your personal information
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input 
                  value={profileData.first_name}
                  onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Last Name
                </label>
                <Input 
                  value={profileData.last_name}
                  onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone Number
                </label>
                <Input 
                  type="tel"
                  value={profileData.phone_number}
                  onChange={(e) => setProfileData({...profileData, phone_number: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleProfileUpdate} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" />
                {saving ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
              <Lock className="h-5 w-5 text-red-700 dark:text-red-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Change Password
              </h2>
              <p className="text-sm text-muted-foreground">
                Update your password to keep your account secure
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  New Password <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="password"
                  placeholder="Enter new password (min 6 characters)"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handlePasswordChange} disabled={saving} className="gap-2 bg-red-600 hover:bg-red-700">
                <Lock className="h-4 w-4" />
                {saving ? "Updating..." : "Change Password"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
