import apiClient from './client';

export interface SignUpPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  address?: any;
}

export interface LoginPayload {
  email: string;
  password: string;
  fcm_token?: string;
}

export interface LoginResponse {
  success: boolean;
  code: number;
  message: string;
  token: string;
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    type: 'user' | 'admin';
    bundles?: any[];
    stripe_customer_id?: string;
    fcm_token?: string;
  };
  orderLength: number;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

const authApi = {
  // Sign up new user
  signUp: async (payload: SignUpPayload) => {
    return await apiClient.post('/user/v1/sign-up', payload);
  },

  // Login user
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    return await apiClient.post('/user/v1/log-in', payload);
  },

  // Logout user
  logout: async (userId: string) => {
    return await apiClient.post(`/user/v1/log-out/${userId}`);
  },

  // Check if email is taken
  isEmailTaken: async (email: string) => {
    return await apiClient.post('/user/v1/is-email-taken', { email });
  },

  // Check if phone is taken
  isPhoneTaken: async (phone: string) => {
    return await apiClient.post('/user/v1/is-phone-taken', { phone });
  },

  // Forgot password
  forgotPassword: async (payload: ForgotPasswordPayload) => {
    return await apiClient.post('/user/v1/forgot-password', payload);
  },

  // Reset password
  resetPassword: async (payload: ResetPasswordPayload) => {
    return await apiClient.post(`/user/v1/reset-password?token=${payload.token}`, {
      newPassword: payload.newPassword,
    });
  },
};

export default authApi;
