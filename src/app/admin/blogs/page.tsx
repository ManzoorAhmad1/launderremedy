"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import Link from "next/link";
import blogService from "@/services/blog.service";
import toast from "react-hot-toast";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import "./editor-custom.css";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featured_image: "",
    tags: "",
    meta_description: "",
    status: "draft",
    category: "",
  });

  useEffect(() => {
    loadBlogs();
  }, [currentPage, searchText, statusFilter]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllBlogs({
        page: currentPage,
        itemsPerPage: 10,
        searchText,
        status: statusFilter,
      });
      
      setBlogs(response.data.items || []);
      setTotalPages(response.data.lastPage || 1);
    } catch (error: any) {
      console.error("Failed to load blogs:", error);
      toast.error(error.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog: any = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || "",
        featured_image: blog.featured_image || "",
        tags: blog.tags?.join(", ") || "",
        meta_description: blog.meta_description || "",
        status: blog.status,
        category: blog.category || "",
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        featured_image: "",
        tags: "",
        meta_description: "",
        status: "draft",
        category: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBlog(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };

      if (editingBlog) {
        await blogService.updateBlog(editingBlog._id, payload);
        toast.success("Blog updated successfully!");
      } else {
        await blogService.createBlog(payload);
        toast.success("Blog created successfully!");
      }
      
      handleCloseModal();
      loadBlogs();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingBlogId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingBlogId) return;
    
    try {
      await blogService.deleteBlog(deletingBlogId);
      toast.success("Blog deleted successfully!");
      setShowDeleteModal(false);
      setDeletingBlogId(null);
      loadBlogs();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "archived":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Blogs</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your blog posts
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link
            href="/admin/blogs/categories"
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors border border-border"
          >
            <Filter className="w-4 h-4" />
            Categories
          </Link>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Blog
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Blogs Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No blogs found
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-foreground line-clamp-2">
                        {blog.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {blog.author_name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {blog.views || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {formatDate(blog.published_date || blog.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {(blog.slug || blog._id) && (
                          <a
                            href={`/blog/${blog.slug || blog._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-700 p-2"
                            title="View Blog"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenModal(blog)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2"
                          title="Edit Blog"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2"
                        >
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 text-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingBlog ? "Edit Blog" : "Create Blog"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Category</option>
                    <option value="laundry-tips">Laundry Tips</option>
                    <option value="how-to-guides">How-To Guides</option>
                    <option value="news">News & Updates</option>
                    <option value="industry-insights">Industry Insights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use the toolbar to format your content
                  </p>
                </div>

                <ImageUpload
                  value={formData.featured_image}
                  onChange={(url) => setFormData({ ...formData, featured_image: url })}
                  label="Featured Image"
                  helperText="Upload or paste image URL"
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="laundry, tips, guides"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Meta Description (SEO)
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
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
                    {editingBlog ? "Update Blog" : "Create Blog"}
                  </button>
                </div>
              </form>
            </div>
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
                <h3 className="text-lg font-semibold text-foreground">Delete Blog</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-foreground mb-6">
              Are you sure you want to delete this blog? All data will be permanently removed.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingBlogId(null);
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
