import { Fetch } from '@/utils/fetchWrapper';

const blogService = {
  _PREFIX: '/blog/v1',

  // Get latest blogs for homepage
  async getLatestBlogs(limit: number = 3) {
    try {
      const res = await Fetch.get(`${this._PREFIX}/latest?limit=${limit}`);
      if (res.code === 200) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get latest blogs');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get all blogs with pagination
  async getAllBlogs({
    page = 1,
    itemsPerPage = 10,
    status = '',
    searchText = '',
  }: {
    page?: number;
    itemsPerPage?: number;
    status?: string;
    searchText?: string;
  }) {
    try {
      const res = await Fetch.get(
        `${this._PREFIX}/all?page=${page}&itemsPerPage=${itemsPerPage}&status=${status}&searchText=${searchText}`
      );
      if (res.code === 200) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get blogs');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get single blog by slug
  async getBlogBySlug(slug: string) {
    try {
      const res = await Fetch.get(`${this._PREFIX}/${slug}`);
      if (res.code === 200) {
        return res;
      }
      throw new Error(res.message ?? 'Blog not found');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Create blog (Admin only)
  async createBlog(payload: {
    title: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    tags?: string[];
    meta_description?: string;
    status?: string;
  }) {
    try {
      const res = await Fetch.post(`${this._PREFIX}/create`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to create blog');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Update blog (Admin only)
  async updateBlog(id: string, payload: {
    title?: string;
    content?: string;
    excerpt?: string;
    featured_image?: string;
    tags?: string[];
    meta_description?: string;
    status?: string;
  }) {
    try {
      const res = await Fetch.put(`${this._PREFIX}/update/${id}`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to update blog');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Delete blog (Admin only)
  async deleteBlog(id: string) {
    try {
      const res = await Fetch.delete(`${this._PREFIX}/delete/${id}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to delete blog');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },
};

export default blogService;
