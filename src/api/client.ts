import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie, clearCookie, setCookie } from '@/utils/helpers';
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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor - Add auth token to every request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Debug logging
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
    });

    const token = getCookie('user_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Interceptor Error:', error);
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
    // Log detailed error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response) {
      const { status, data } = error.response;
      
      // Extract error message from various backend response formats
      let errorMessage = 'An error occurred';
      
      // Backend format: { success: false, message: "...", code: 400 }
      if (data?.message) {
        errorMessage = data.message;
      }
      // Backend format: "Error message:statusCode"
      else if (typeof data === 'string' && data.includes(':')) {
        const [message] = data.split(':');
        errorMessage = message;
      }
      // Plain string response
      else if (typeof data === 'string') {
        errorMessage = data;
      }

      // Handle 401 Unauthorized - Session expired
      if (status === 401) {
        const token = getCookie('user_token');
        const refreshToken = getCookie('refresh_token');
        
        if (token && refreshToken && !isRefreshing) {
          isRefreshing = true;
          
          // Try to refresh the token
          return axios.post(`${BASE_URL}/user/v1/refresh-token`, { refreshToken })
            .then((response: any) => {
              const newToken = response.data.token;
              setCookie('user_token', newToken, 7);
              isRefreshing = false;
              processQueue(null, newToken);
              
              // Retry the original request
              if (error.config && error.config.headers) {
                error.config.headers.Authorization = `Bearer ${newToken}`;
              }
              return apiClient(error.config!);
            })
            .catch((refreshError) => {
              processQueue(refreshError, null);
              isRefreshing = false;
              
              // Refresh token failed, logout user
              clearCookie('user_token');
              clearCookie('refresh_token');
              clearCookie('user');
              toast.error('Session expired. Please login again.');
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
              return Promise.reject(refreshError);
            });
        } else if (isRefreshing) {
          // Queue the request while token is being refreshed
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            if (error.config && error.config.headers) {
              error.config.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(error.config!);
          }).catch(err => {
            return Promise.reject(err);
          });
        } else {
          clearCookie('user_token');
          clearCookie('refresh_token');
          clearCookie('user');
          toast.error('Session expired. Please login again.');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      // Handle 403 Forbidden - No permission
      else if (status === 403) {
        toast.error(errorMessage || 'You do not have permission to access this resource.');
      }

      // Handle 404 Not Found
      else if (status === 404) {
        console.error('404 Not Found:', {
          url: error.config?.url,
          baseURL: error.config?.baseURL,
          fullURL: `${error.config?.baseURL}${error.config?.url}`,
        });
        toast.error(errorMessage || `Resource not found: ${error.config?.url || 'Unknown URL'}`);
      }

      // Handle 409 Conflict (duplicate data, etc)
      else if (status === 409) {
        toast.error(errorMessage || 'Conflict error occurred');
      }

      // Handle 400 Bad Request
      else if (status === 400) {
        toast.error(errorMessage || 'Invalid request data');
      }

      // Handle 422 Unprocessable Entity
      else if (status === 422) {
        toast.error(errorMessage || 'Validation error');
      }

      // Handle 500+ Server Errors
      else if (status >= 500) {
        toast.error(errorMessage || 'Server error. Please try again later.');
      }

      // Any other status code
      else {
        toast.error(errorMessage);
      }

      // Return structured error
      return Promise.reject({
        success: false,
        message: errorMessage,
        code: status,
        data: data,
      });
    }

    // Network error - No response from server
    if (error.request) {
      console.error('Network Error:', {
        baseURL: error.config?.baseURL,
        url: error.config?.url,
        message: error.message,
      });
      toast.error('Cannot connect to server. Please check if the backend is running.');
      return Promise.reject({
        success: false,
        message: 'Cannot connect to server. Please check if the backend is running.',
        code: 0,
      });
    }

    // Something else happened
    console.error('Unexpected Error:', error.message);
    toast.error(error.message || 'An unexpected error occurred');
    return Promise.reject({
      success: false,
      message: error.message || 'An unexpected error occurred',
      code: 0,
    });
  }
);

export default apiClient;
