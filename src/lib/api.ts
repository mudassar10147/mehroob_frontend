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
      withCredentials: false,
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
                // Don't redirect for public endpoints
                if (!error.config?.url?.includes('/products')) {
                  window.location.href = '/login';
                }
              }
              break;
            case 403:
              console.error('Access forbidden');
              break;
            case 404:
              console.error('Resource not found');
              break;
            case 500:
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
      categoryId?: string;
      brandId?: string;
      minPrice?: number;
      maxPrice?: number;
      skinType?: string;
      search?: string;
      isActive?: boolean;
      isFeatured?: boolean;
      isNewArrival?: boolean;
      isBestSeller?: boolean;
      inStock?: boolean;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }) => apiClient.get('/products', { params }),
    getById: (id: string) => apiClient.get(`/products/${id}`),
    getBySlug: (slug: string) => apiClient.get(`/products/slug/${slug}`),
    getFeatured: (limit?: number) => apiClient.get('/products/featured', { params: { limit } }),
    getNewArrivals: (limit?: number) => apiClient.get('/products/new', { params: { limit } }),
    getBestSellers: (limit?: number) => apiClient.get('/products/bestsellers', { params: { limit } }),
    getByBrand: (brandId: string, params?: { page?: number; limit?: number }) => 
      apiClient.get(`/products/brand/${brandId}`, { params }),
    getByCategory: (categoryId: string, params?: { page?: number; limit?: number }) => 
      apiClient.get(`/products/category/${categoryId}`, { params }),
    getStats: () => apiClient.get('/products/stats'),
    create: (data: any) => apiClient.post('/products', data),
    update: (id: string, data: any) => apiClient.put(`/products/${id}`, data),
    delete: (id: string) => apiClient.delete(`/products/${id}`),
    updateStock: (id: string, stock: number) => 
      apiClient.put(`/products/${id}/stock`, { stock }),
  },

  // Orders endpoints
  orders: {
    create: (data: any) => apiClient.post('/orders', data),
    getMyOrders: (params?: { page?: number; limit?: number }) =>
      apiClient.get('/orders/my-orders', { params }),
    getById: (id: string) => apiClient.get(`/orders/${id}`),
    cancel: (id: string) => apiClient.put(`/orders/${id}/cancel`),
    track: (data: { orderNumber: string; email?: string; phone?: string }) => 
      apiClient.post('/orders/track', data),
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

