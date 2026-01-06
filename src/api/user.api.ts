import apiClient from './client';

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  bundles?: any[];
}

export interface AddAddressPayload {
  formatted_address: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface UpdateFcmTokenPayload {
  id: string;
  token: string;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  type: 'user' | 'admin' | 'subadmin';
  status?: 'active' | 'inactive' | 'suspended';
  bundles?: any[];
  address?: AddAddressPayload;
  fcm_token?: string;
  permissions?: string[]; // For sub-admins
  is_active?: boolean; // For sub-admins
  created_by?: string; // For sub-admins
  createdAt?: string;
  updatedAt?: string;
}

const userApi:any = {
  updateProfile: async (payload: UpdateProfilePayload) => {
    return await apiClient.put('/user/v1/update-profile', payload);
  },

  // Add user address
  addAddress: async (payload: AddAddressPayload) => {
    return await apiClient.post('/user/v1/add-address', payload);
  },

  // Update FCM token for push notifications
  updateFcmToken: async (payload: UpdateFcmTokenPayload) => {
    return await apiClient.post('/user/v1/update-fcm-token', payload);
  },

  // Delete user account
  deleteAccount: async (userId: string) => {
    return await apiClient.delete(`/user/v1/delete-user/${userId}`);
  },

  // Send push notification (admin)
  sendPushNotification: async (payload: {
    user_id: string;
    title: string;
    body: string;
  }) => {
    return await apiClient.post('/user/v1/send-push-notification', payload);
  },

  // Admin: Get all users
  getAllUsers: async (params: {
    page?: number;
    itemPerPage?: number;
    searchText?: string;
    statusFilter?: string;
  } = {}) => {
    const { page = 1, itemPerPage = 10, searchText = '', statusFilter = '' } = params;
    return await apiClient.post('/user/v1/get-all-users', {
      page,
      itemPerPage,
      searchText,
      statusFilter
    });
  },

  // Admin: Update user status
  updateUserStatus: async (userId: string, status: 'active' | 'inactive' | 'suspended') => {
    // TODO: Backend endpoint needed - /user/v1/update-user-status/:id
    return await apiClient.put(`/user/v1/update-user-status/${userId}`, { status });
  },
};

export default userApi;
