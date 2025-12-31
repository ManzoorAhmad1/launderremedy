import { Fetch } from '@/utils/fetchWrapper';

const subadminService = {
  _PREFIX: '/subadmin/v1',

  // Create sub-admin
  async createSubAdmin(payload: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    permissions: string[];
  }) {
    try {
      const res = await Fetch.post(`${this._PREFIX}/create`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to create sub-admin');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get all sub-admins
  async getAllSubAdmins() {
    try {
      const res = await Fetch.get(`${this._PREFIX}/all`);
      if (res.code === 200) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get sub-admins');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Update sub-admin
  async updateSubAdmin(id: string, payload: {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    permissions?: string[];
    is_active?: boolean;
    password?: string;
  }) {
    try {
      const res = await Fetch.put(`${this._PREFIX}/update/${id}`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to update sub-admin');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Delete sub-admin
  async deleteSubAdmin(id: string) {
    try {
      const res = await Fetch.delete(`${this._PREFIX}/delete/${id}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to delete sub-admin');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Toggle sub-admin status
  async toggleSubAdminStatus(id: string) {
    try {
      const res = await Fetch.patch(`${this._PREFIX}/toggle-status/${id}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to toggle status');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },
};

export default subadminService;
