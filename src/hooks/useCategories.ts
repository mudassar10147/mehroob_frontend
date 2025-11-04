import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { BackendPaginatedResponse } from '@/types/api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory: string | null;
  isActive: boolean;
  isMainCategory: boolean;
  subcategories?: Category[];
  image?: string;
}

/**
 * Custom hook for fetching categories
 */
export function useCategories(options?: {
  isActive?: boolean;
  includeSubcategories?: boolean;
  parentCategory?: string | null;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.categories.getAll({
        isActive: options?.isActive ?? true,
        includeSubcategories: options?.includeSubcategories ?? true,
        parentCategory: options?.parentCategory,
        limit: 100,
      }) as BackendPaginatedResponse<Category>;

      if (response.success && response.data?.categories) {
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError(err.response?.data?.message || 'Failed to fetch categories');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, [options?.isActive, options?.includeSubcategories, options?.parentCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}

/**
 * Custom hook for fetching main categories only
 */
export function useMainCategories(isActive: boolean = true) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMainCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.categories.getMain({
          isActive,
          includeSubcategories: true,
        }) as { success: boolean; data: { categories: Category[]; total: number } };

        if (response.success && response.data?.categories) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (err: any) {
        console.error('Error fetching main categories:', err);
        setError(err.response?.data?.message || 'Failed to fetch categories');
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainCategories();
  }, [isActive]);

  return {
    categories,
    isLoading,
    error,
  };
}

