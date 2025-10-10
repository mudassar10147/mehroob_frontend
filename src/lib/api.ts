import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from './constants';

/**
 * API Client Configuration
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config) => {
        // Get token from localStorage or session storage
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Handle specific status codes
          switch (error.response.status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
              }
              break;
            case 403:
              // Forbidden
              console.error('Access forbidden');
              break;
            case 404:
              // Not found
              console.error('Resource not found');
              break;
            case 500:
              // Server error
              console.error('Server error');
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

/**
 * API Endpoints
 */
export const api = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) =>
      apiClient.post('/auth/login', data),
    register: (data: { name: string; email: string; password: string }) =>
      apiClient.post('/auth/register', data),
    logout: () => apiClient.post('/auth/logout'),
    me: () => apiClient.get('/auth/me'),
    refreshToken: () => apiClient.post('/auth/refresh'),
  },

  // Products endpoints
  products: {
    getAll: (params?: {
      page?: number;
      limit?: number;
      category?: string;
      search?: string;
    }) => apiClient.get('/products', { params }),
    getById: (id: string) => apiClient.get(`/products/${id}`),
    create: (data: any) => apiClient.post('/products', data),
    update: (id: string, data: any) => apiClient.put(`/products/${id}`, data),
    delete: (id: string) => apiClient.delete(`/products/${id}`),
  },

  // Orders endpoints
  orders: {
    getAll: (params?: { page?: number; limit?: number }) =>
      apiClient.get('/orders', { params }),
    getById: (id: string) => apiClient.get(`/orders/${id}`),
    create: (data: any) => apiClient.post('/orders', data),
    updateStatus: (id: string, status: string) =>
      apiClient.patch(`/orders/${id}/status`, { status }),
  },

  // Cart endpoints (if backend manages cart)
  cart: {
    get: () => apiClient.get('/cart'),
    add: (productId: string, quantity: number) =>
      apiClient.post('/cart/items', { productId, quantity }),
    update: (itemId: string, quantity: number) =>
      apiClient.put(`/cart/items/${itemId}`, { quantity }),
    remove: (itemId: string) => apiClient.delete(`/cart/items/${itemId}`),
    clear: () => apiClient.delete('/cart'),
  },

  // User endpoints
  user: {
    getProfile: () => apiClient.get('/user/profile'),
    updateProfile: (data: any) => apiClient.put('/user/profile', data),
    changePassword: (data: {
      currentPassword: string;
      newPassword: string;
    }) => apiClient.post('/user/change-password', data),
  },
};

