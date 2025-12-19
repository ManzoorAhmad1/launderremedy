import { Fetch } from '@/utils/fetchWrapper';
import authService from './auth.service';

const userService = {
  _PREFIX: '/user/v1',

  // Update user profile (uses auth service)
  updateProfile: async (userData: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    bundles?: any[];
  }) => {
    return await authService.updateProfile(userData);
  },

  // Get user profile
  getProfile: async (userId: string) => {
    try {
      const res = await Fetch.get(`${userService._PREFIX}/get-user/${userId}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get profile');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get user bundles
  getUserBundles: async (userId: string) => {
    try {
      const res = await Fetch.get(`${userService._PREFIX}/get-bundles/${userId}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get bundles');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Delete account (uses auth service)
  deleteAccount: async (userId: string) => {
    return await authService.deleteAccount(userId);
  },
};

export default userService;