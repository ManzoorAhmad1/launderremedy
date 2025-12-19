import { Fetch } from '@/utils/fetchWrapper';

const authService = {
  _PREFIX: '/user/v1',

  // Register new user
  register: async (payload: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
  }) => {
    try {
      const res = await Fetch.post(`${authService._PREFIX}/sign-up`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Registration failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Login user
  login: async (payload: { email: string; password: string }) => {
    try {
      const res = await Fetch.post(`${authService._PREFIX}/log-in`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Login failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Update profile
  updateProfile: async (payload: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    bundles?: any[];
  }) => {
    try {
      const res = await Fetch.put(`${authService._PREFIX}/update-profile`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Update failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Delete account
  deleteAccount: async (userId: string) => {
    try {
      const res = await Fetch.delete(`${authService._PREFIX}/delete-user/${userId}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Delete failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Logout
  logout: async (userId: string) => {
    try {
      const res = await Fetch.post(`${authService._PREFIX}/log-out/${userId}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Logout failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Check if email is taken
  isEmailTaken: async (payload: { email: string }) => {
    try {
      const res = await Fetch.post(`${authService._PREFIX}/is-email-taken`, payload);
      return res;
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Forgot password
  forgotPassword: async (payload: { email: string }) => {
    try {
      const res = await Fetch.post(`${authService._PREFIX}/forgot-password`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Request failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Reset password
  resetPassword: async (payload: { token: string; password: string }) => {
    try {
      const res = await Fetch.post(`${authService._PREFIX}/reset-password`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Reset failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },
};

export default authService;