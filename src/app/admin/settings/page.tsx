"use client";

import React, { useState } from "react";
import { Save, Bell, Clock, MapPin, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Settings saved successfully");
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your admin panel and system preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
              <Shield className="h-5 w-5 text-primary-700 dark:text-primary-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                General Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Basic configuration for your platform
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Business Name
                </label>
                <Input defaultValue="Launder Remedy" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Support Email
                </label>
                <Input defaultValue="support@launderremedy.com" type="email" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone Number
                </label>
                <Input defaultValue="+44 7700 900100" type="tel" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Currency
                </label>
                <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm">
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Time Slot Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <Clock className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Time Slot Configuration
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage collection and delivery time slots
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Collection Start Time
                </label>
                <Input type="time" defaultValue="08:00" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Collection End Time
                </label>
                <Input type="time" defaultValue="20:00" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Delivery Start Time
                </label>
                <Input type="time" defaultValue="09:00" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Delivery End Time
                </label>
                <Input type="time" defaultValue="21:00" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Slot Duration (minutes)
              </label>
              <Input type="number" defaultValue="120" min="30" step="30" />
            </div>
          </div>
        </div>

        {/* Service Area Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50">
              <MapPin className="h-5 w-5 text-green-700 dark:text-green-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Service Area
              </h2>
              <p className="text-sm text-muted-foreground">
                Define your service coverage area
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Primary Location
              </label>
              <Input defaultValue="London, UK" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Service Radius (km)
              </label>
              <Input type="number" defaultValue="15" min="1" />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
              <CreditCard className="h-5 w-5 text-purple-700 dark:text-purple-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Payment Configuration
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage payment methods and processing
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Stripe Publishable Key
              </label>
              <Input
                type="password"
                defaultValue="pk_test_••••••••••••••••"
                placeholder="pk_test_..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Minimum Order Amount (£)
              </label>
              <Input type="number" defaultValue="10.00" min="0" step="0.01" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="enableCash" defaultChecked className="rounded" />
              <label htmlFor="enableCash" className="text-sm font-medium text-foreground">
                Enable cash payment option
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50">
              <Bell className="h-5 w-5 text-orange-700 dark:text-orange-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Notifications
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure notification preferences
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="emailOrders" defaultChecked className="rounded" />
              <label htmlFor="emailOrders" className="text-sm font-medium text-foreground">
                Email notifications for new orders
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="emailPayments" defaultChecked className="rounded" />
              <label htmlFor="emailPayments" className="text-sm font-medium text-foreground">
                Email notifications for payments
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="emailUsers" defaultChecked className="rounded" />
              <label htmlFor="emailUsers" className="text-sm font-medium text-foreground">
                Email notifications for new user registrations
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
