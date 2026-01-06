"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, FolderOpen, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  blog_count?: number;
  createdAt: string;
}

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadCategories();
  }, [searchText]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // For now using mock data
      const mockCategories: Category[] = [
        {
          _id: "1",
          name: "Laundry Tips",
          slug: "laundry-tips",
          description: "Tips and tricks for better laundry care",
          blog_count: 5,
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          name: "How-To Guides",
          slug: "how-to-guides",
          description: "Step by step guides",
          blog_count: 3,
          createdAt: new Date().toISOString(),
        },
      ];
      
      const filtered = searchText
        ? mockCategories.filter((cat) =>
            cat.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : mockCategories;
      
      setCategories(filtered);
    } catch (error: any) {
      console.error("Failed to load categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category: Category | null = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Replace with actual API call
      if (editingCategory) {
        toast.success("Category updated successfully!");
      } else {
        toast.success("Category created successfully!");
      }

      handleCloseModal();
      loadCategories();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    try {
      // TODO: Replace with actual API call
      toast.success("Category deleted successfully!");
      setShowDeleteModal(false);
      setDeletingId(null);
      loadCategories();
    } catch (error: any) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blogs
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Blog Categories
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Organize your blogs by categories
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-lg border border-border p-6 animate-pulse"
            >
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))
        ) : categories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg text-muted-foreground">No categories found</p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FolderOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
              </div>

              {category.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {category.blog_count || 0} blogs
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors"
                >
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Delete Category
                </h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-foreground mb-6">
              Are you sure you want to delete this category? Blogs in this
              category will be uncategorized.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
