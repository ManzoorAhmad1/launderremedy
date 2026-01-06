import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie, clearCookie } from '@/utils/helpers';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add auth token to every request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie('user_token');
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized
      if (status === 401) {
        const token = getCookie('user_token');
        if (token) {
          clearCookie('user_token');
          toast.error('Session expired. Please login again.');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      // Handle 403 Forbidden
      if (status === 403) {
        toast.error('You do not have permission to access this resource.');
      }

      // Handle 404 Not Found
      if (status === 404) {
        console.error('Resource not found:', error.config?.url);
      }

      // Handle 500 Internal Server Error
      if (status >= 500) {
        toast.error('Server error. Please try again later.');
      }

      // Return error data
      return Promise.reject(data);
    }

    // Network error
    if (error.request) {
      toast.error('Network error. Please check your internet connection.');
      return Promise.reject({ message: 'Network error' });
    }

    // Something else happened
    return Promise.reject(error);
  }
);

// API methods
export const Fetch = {
  get: async (url: string, config?: any) => {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  post: async (url: string, data?: any, config?: any) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  put: async (url: string, data?: any, config?: any) => {
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  delete: async (url: string, config?: any) => {
    const response = await apiClient.delete(url, config);
    return response.data;
  },

  patch: async (url: string, data?: any, config?: any) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  },

  upload: async (url: string, formData: FormData) => {
    const response = await apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default apiClient;
