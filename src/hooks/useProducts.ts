import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFilters } from '@/types/product';
import { PaginatedResponse } from '@/types/api';
import { api } from '@/lib/api';

/**
 * Custom hook for fetching and managing products
 */
export function useProducts(initialFilters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    pageSize: 12,
  });

  // Fetch products
  const fetchProducts = useCallback(
    async (page: number = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const response: PaginatedResponse<Product> = await api.products.getAll(
          {
            page,
            limit: pagination.pageSize,
            category: filters.category,
            search: filters.search,
          }
        );

        setProducts(response.data);
        setPagination(response.meta);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    },
    [filters, pagination.pageSize]
  );

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Go to specific page
  const goToPage = useCallback(
    (page: number) => {
      fetchProducts(page);
    },
    [fetchProducts]
  );

  // Refetch products
  const refetch = useCallback(() => {
    fetchProducts(pagination.currentPage);
  }, [fetchProducts, pagination.currentPage]);

  return {
    products,
    isLoading,
    error,
    filters,
    pagination,
    updateFilters,
    resetFilters,
    goToPage,
    refetch,
  };
}

/**
 * Custom hook for fetching a single product
 */
export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await api.products.getById(productId);
        setProduct(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, isLoading, error };
}

