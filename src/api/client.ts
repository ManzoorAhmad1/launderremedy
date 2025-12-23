import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie, clearCookie } from '@/utils/helpers';
import toast from 'react-hot-toast';

// Backend base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://launderremedy-f470d30f2aed.herokuapp.com/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
  withCredentials: false,
});

// Request interceptor - Add auth token to every request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie('user_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // Return the data directly
    return response.data;
  },
  (error: AxiosError<any>) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized - Session expired
      if (status === 401) {
        const token = getCookie('user_token');
        if (token) {
          clearCookie('user_token');
          clearCookie('user');
          toast.error('Session expired. Please login again.');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      // Handle 403 Forbidden - No permission
      if (status === 403) {
        toast.error('You do not have permission to access this resource.');
      }

      // Handle 404 Not Found
      if (status === 404) {
        console.error('Resource not found:', error.config?.url);
        toast.error('Resource not found');
      }

      // Handle 409 Conflict (duplicate data, etc)
      if (status === 409) {
        const message = data?.message || 'Conflict error occurred';
        toast.error(message);
      }

      // Handle 500 Internal Server Error
      if (status >= 500) {
        toast.error('Server error. Please try again later.');
      }

      // Parse backend error message format (Error:statusCode)
      if (typeof data === 'string' && data.includes(':')) {
        const [message, code] = data.split(':');
        return Promise.reject({
          success: false,
          message,
          code: parseInt(code) || status,
        });
      }

      // Return error data
      return Promise.reject({
        success: false,
        message: data?.message || 'An error occurred',
        code: status,
        data: data,
      });
    }

    // Network error - No response from server
    if (error.request) {
      toast.error('Network error. Please check your internet connection.');
      return Promise.reject({
        success: false,
        message: 'Network error. Please check your internet connection.',
        code: 0,
      });
    }

    // Something else happened
    return Promise.reject({
      success: false,
      message: error.message || 'An unexpected error occurred',
      code: 0,
    });
  }
);

export default apiClient;
