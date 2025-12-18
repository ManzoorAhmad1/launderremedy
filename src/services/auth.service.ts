import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authService = {
  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  register: async (userData: any) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if email is taken
  isEmailTaken: async (data: { email: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/check-email`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;