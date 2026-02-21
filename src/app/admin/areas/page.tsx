"use client";

import React, { useEffect, useState } from "react";
import areaService from "@/services/area.service";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

interface Area {
  _id: string;
  name: string;
  city: string;
  postcode_prefix?: string;
  description?: string;
  is_active: boolean;
}

const emptyForm = {
  name: "",
  city: "",
  postcode_prefix: "",
  description: "",
  is_active: true,
};

export default function AdminAreasPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editArea, setEditArea] = useState<Area | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await areaService.getAllAreas();
      setAreas(res.data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load areas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditArea(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (area: Area) => {
    setEditArea(area);
    setForm({
      name: area.name,
      city: area.city,
      postcode_prefix: area.postcode_prefix || "",
      description: area.description || "",
      is_active: area.is_active,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.city.trim()) {
      toast.error("Name and city are required");
      return;
    }
    try {
      setSaving(true);
      if (editArea) {
        await areaService.updateArea(editArea._id, form);
        toast.success("Area updated successfully");
      } else {
        await areaService.createArea(form);
        toast.success("Area created successfully");
      }
      setShowModal(false);
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to save area");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteId(id);
      await areaService.deleteArea(id);
      toast.success("Area deleted");
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete area");
    } finally {
      setDeleteId(null);
    }
  };

  const toggleActive = async (area: Area) => {
    try {
      await areaService.updateArea(area._id, { is_active: !area.is_active });
      toast.success(`Area ${area.is_active ? "deactivated" : "activated"}`);
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle area");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-7 w-7 text-primary-600" /> Service Areas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the areas where services are provided
          </p>
        </div>
        <Button onClick={openCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Area
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        ) : areas.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No service areas found</p>
            <p className="text-sm mt-1">Click &quot;Add Area&quot; to create one</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Area Name</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">City</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Postcode</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Description</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Active</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {areas.map((area) => (
                <tr key={area._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{area.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{area.city}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell font-mono text-xs">
                    {area.postcode_prefix || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                    {area.description || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleActive(area)} className="inline-flex items-center">
                      {area.is_active
                        ? <ToggleRight className="h-5 w-5 text-green-500" />
                        : <ToggleLeft className="h-5 w-5 text-gray-400" />
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(area)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => handleDelete(area._id)}
                        disabled={deleteId === area._id}
                      >
                        {deleteId === area._id
                          ? <Loader2 className="h-4 w-4 animate-spin" />
                          : <Trash2 className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{editArea ? "Edit Area" : "Add New Area"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Area Name <span className="text-red-500">*</span></Label>
              <Input
                placeholder="e.g. Mayfair"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>City <span className="text-red-500">*</span></Label>
              <Input
                placeholder="e.g. London"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Postcode Prefix</Label>
              <Input
                placeholder="e.g. W1, SW1A"
                value={form.postcode_prefix}
                onChange={(e) => setForm({ ...form, postcode_prefix: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Input
                placeholder="Short description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.is_active}
                onCheckedChange={(v: boolean) => setForm({ ...form, is_active: v })}
              />
              <Label>Active (visible on website)</Label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              {editArea ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
