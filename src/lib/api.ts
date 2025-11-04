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
        // Handle network errors (no response received)
        if (error.request && !error.response) {
          // Log detailed error information
          const errorDetails = {
            message: error.message,
            code: error.code,
            name: error.name,
            url: error.config?.url || 'unknown',
            baseURL: error.config?.baseURL || API_CONFIG.BASE_URL,
            fullURL: error.config?.baseURL && error.config?.url 
              ? `${error.config.baseURL}${error.config.url}`
              : `${API_CONFIG.BASE_URL}${error.config?.url || ''}`,
            method: error.config?.method || 'unknown',
            timeout: error.config?.timeout,
            request: error.request ? 'Request object exists' : 'No request object',
            response: error.response ? 'Response exists' : 'No response'
          };
          
          console.error('Network Error Details:', errorDetails);
          
          // Log the full error for debugging
          console.error('Full Axios Error:', error);
          console.error('Error Config:', error.config);
          
          // Check if it's a CORS error (common cause)
          if (error.message.includes('CORS') || error.code === 'ERR_NETWORK') {
            console.error('⚠️ CORS or Network Issue Detected');
            console.error('Backend URL:', API_CONFIG.BASE_URL);
            if (typeof window !== 'undefined') {
              console.error('Make sure your backend allows requests from:', window.location.origin);
            }
          }
          
          // Provide user-friendly error message
          const networkError = new Error(
            'Network Error: Unable to reach the server. Please check your connection or try again later. ' +
            `Backend: ${API_CONFIG.BASE_URL}`
          );
          (networkError as any).isNetworkError = true;
          (networkError as any).originalError = error;
          (networkError as any).details = {
            message: error.message,
            code: error.code,
            url: error.config?.url,
            baseURL: error.config?.baseURL
          };
          return Promise.reject(networkError);
        }

        // Handle server response errors
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
            case 0:
              // CORS or network issue
              console.error('CORS or Network Error - Request blocked');
              break;
          }
        }

        // Handle timeout errors
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          const timeoutError = new Error(
            'Request timeout: The server took too long to respond. Please try again.'
          );
          (timeoutError as any).isTimeoutError = true;
          return Promise.reject(timeoutError);
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

  // Categories endpoints
  categories: {
    getAll: (params?: {
      page?: number;
      limit?: number;
      search?: string;
      isActive?: boolean;
      parentCategory?: string | null;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
      includeSubcategories?: boolean;
    }) => apiClient.get('/categories', { params }),
    getMain: (params?: {
      isActive?: boolean;
      includeSubcategories?: boolean;
    }) => apiClient.get('/categories/main', { params }),
    getById: (id: string) => apiClient.get(`/categories/${id}`),
    getBySlug: (slug: string) => apiClient.get(`/categories/slug/${slug}`),
    getSubcategories: (id: string, params?: { isActive?: boolean }) =>
      apiClient.get(`/categories/${id}/subcategories`, { params }),
    getHierarchy: (params?: { isActive?: boolean }) =>
      apiClient.get('/categories/hierarchy', { params }),
    getStats: () => apiClient.get('/categories/stats'),
  },

  // Newsletter endpoints
  newsletter: {
    subscribe: (data: {
      email: string;
      firstName?: string;
      lastName?: string;
      preferences?: {
        frequency?: 'daily' | 'weekly' | 'monthly';
        categories?: string[];
        notifications?: {
          newPosts?: boolean;
          weeklyDigest?: boolean;
          productUpdates?: boolean;
          companyNews?: boolean;
        };
      };
      source?: string;
      tags?: string[];
    }) => apiClient.post('/newsletter/subscribe', data),
    verify: (token: string) => apiClient.get(`/newsletter/verify/${token}`),
    unsubscribe: (token: string) => apiClient.get(`/newsletter/unsubscribe/${token}`),
    getStatus: (email: string) => apiClient.get(`/newsletter/status/${email}`),
    updatePreferences: (email: string, preferences: {
      frequency?: 'daily' | 'weekly' | 'monthly';
      categories?: string[];
      notifications?: {
        newPosts?: boolean;
        weeklyDigest?: boolean;
        productUpdates?: boolean;
        companyNews?: boolean;
      };
    }) => apiClient.put(`/newsletter/preferences/${email}`, { preferences }),
    resendVerification: (email: string) => 
      apiClient.post('/newsletter/resend-verification', { email }),
  },
};


