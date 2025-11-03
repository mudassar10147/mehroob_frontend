import { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ProductFilters } from '@/types/product';
import { BackendPaginatedResponse } from '@/types/api';
import { api } from '@/lib/api';

/**
 * Deep comparison helper
 */
function areFiltersEqual(filters1?: ProductFilters, filters2?: ProductFilters): boolean {
  if (!filters1 && !filters2) return true;
  if (!filters1 || !filters2) return false;
  return (
    filters1.category === filters2.category &&
    filters1.skinType === filters2.skinType &&
    filters1.priceMin === filters2.priceMin &&
    filters1.priceMax === filters2.priceMax &&
    filters1.search === filters2.search &&
    filters1.inStock === filters2.inStock &&
    filters1.sortBy === filters2.sortBy
  );
}

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

  // Use ref to track previous filters for comparison
  const prevFiltersRef = useRef<ProductFilters | undefined>(initialFilters);

  // Update filters when initialFilters change (from parent component)
  // Only update if filters actually changed
  useEffect(() => {
    if (!areFiltersEqual(initialFilters, prevFiltersRef.current)) {
      if (initialFilters) {
        setFilters(initialFilters);
      }
      prevFiltersRef.current = initialFilters;
    }
  }, [initialFilters]);

  // Fetch products
  const fetchProducts = useCallback(
    async (page: number = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        // Build API params
        const apiParams: any = {
          page,
          limit: pagination.pageSize,
          isActive: true, // Only show active products
        };

        // Add filters if provided
        if (filters.category) {
          // Note: API expects categoryId (ObjectId string) but we're passing category slug
          // Backend may need to handle slug-to-ID conversion, or we need to fetch category IDs first
          // For MVP, we'll pass the slug and backend should handle it
          // TODO: Fetch category IDs from backend if needed
          apiParams.categoryId = filters.category;
        }
        if (filters.skinType) apiParams.skinType = filters.skinType;
        if (filters.priceMin) apiParams.minPrice = filters.priceMin;
        if (filters.priceMax) apiParams.maxPrice = filters.priceMax;
        if (filters.search) apiParams.search = filters.search;
        if (filters.inStock !== undefined) apiParams.inStock = filters.inStock;
        if (filters.sortBy) {
          apiParams.sortBy = filters.sortBy.split('-')[0];
          apiParams.sortOrder = filters.sortBy.split('-')[1] as 'asc' | 'desc';
        }

        const response = await api.products.getAll(apiParams) as BackendPaginatedResponse<Product>;

        if (response.success && response.data) {
          setProducts(response.data.products);
          setPagination({
            currentPage: response.data.pagination.current,
            totalPages: response.data.pagination.pages,
            totalCount: response.data.pagination.total,
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

