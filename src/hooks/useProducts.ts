import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ProductFilters } from '@/types/product';
import { BackendPaginatedResponse } from '@/types/api';
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
    pageSize: 20,
  });

  // Update filters when initialFilters prop changes (using ref to track previous value)
  const prevFiltersRef = useRef<string>('');
  useEffect(() => {
    if (initialFilters) {
      const currentFiltersString = JSON.stringify(initialFilters);
      // Only update if filters actually changed
      if (prevFiltersRef.current !== currentFiltersString) {
        prevFiltersRef.current = currentFiltersString;
        setFilters(initialFilters);
      }
    }
  }, [initialFilters]);

  // Fetch products
  const fetchProducts = useCallback(
    async (page: number = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.products.getAll({
          page,
          limit: pagination.pageSize,
          categoryId: filters.categoryId || filters.category,
          skinType: filters.skinType,
          minPrice: filters.priceMin,
          maxPrice: filters.priceMax,
          search: filters.search,
          inStock: filters.inStock,
          sortBy: filters.sortBy?.split('-')[0],
          sortOrder: filters.sortBy?.split('-')[1] as 'asc' | 'desc',
          isActive: true, // Only show active products
        }) as BackendPaginatedResponse<Product>;

        let filteredProducts = [];
        if (response.success && response.data) {
          filteredProducts = response.data.products;
          
          // If multiple categories selected, filter client-side
          if (filters.categoryIds && filters.categoryIds.length > 1) {
            filteredProducts = filteredProducts.filter((product) =>
              filters.categoryIds!.includes(product.categoryId._id)
            );
          }
          // If single category selected, also filter client-side to ensure it works
          else if (filters.categoryId) {
            filteredProducts = filteredProducts.filter((product) =>
              product.categoryId._id === filters.categoryId
            );
          }
          
          setProducts(filteredProducts);
          setPagination({
            currentPage: response.data.pagination.current,
            totalPages: response.data.pagination.pages,
            // Adjust total count if client-side filtered
            totalCount: (filters.categoryIds && filters.categoryIds.length > 1) || filters.categoryId
              ? filteredProducts.length 
              : response.data.pagination.total,
            pageSize: response.data.pagination.limit,
          });
        }
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || 'Failed to fetch products');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [filters, pagination.pageSize]
  );

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts(1);
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
        const data = await api.products.getById(productId) as Product;
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

