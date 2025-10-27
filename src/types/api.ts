/**
 * API related types
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Backend pagination structure
export interface BackendPagination {
  current: number;
  pages: number;
  total: number;
  limit: number;
}

// Backend paginated response structure
export interface BackendPaginatedResponse<T> {
  success: boolean;
  data: {
    products: T[];
    pagination: BackendPagination;
  };
  message?: string;
}

// Frontend pagination (normalized)
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams, SortParams {
  search?: string;
}

