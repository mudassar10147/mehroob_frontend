/**
 * Application-wide constants
 */

// API Configuration
// NOTE: Using local API routes for mock data
// Change back to 'http://localhost:4000/api' when backend is ready
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  TIMEOUT: 30000, // 30 seconds
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'SheetMask Store',
  DESCRIPTION: 'Premium Sheet Masks for Beautiful Skin',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
} as const;

// Product Categories
export const CATEGORIES = {
  HYDRATING: 'hydrating',
  BRIGHTENING: 'brightening',
  ANTI_AGING: 'anti-aging',
  PURIFYING: 'purifying',
  SOOTHING: 'soothing',
} as const;

// Skin Types
export const SKIN_TYPES = {
  DRY: 'dry',
  OILY: 'oily',
  COMBINATION: 'combination',
  SENSITIVE: 'sensitive',
  NORMAL: 'normal',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 36, 48],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'sheetmask_cart',
  USER: 'sheetmask_user',
  WISHLIST: 'sheetmask_wishlist',
  RECENT_SEARCHES: 'sheetmask_recent_searches',
} as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  POSTAL_CODE_REGEX: /^[A-Z0-9\s-]{3,10}$/i,
} as const;

// Image Configuration
export const IMAGE_CONFIG = {
  PRODUCT_SIZES: {
    THUMBNAIL: { width: 150, height: 150 },
    SMALL: { width: 300, height: 300 },
    MEDIUM: { width: 600, height: 600 },
    LARGE: { width: 1200, height: 1200 },
  },
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Product added to cart!',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LOGOUT: 'Logged out successfully!',
} as const;

