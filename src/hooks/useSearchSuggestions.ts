import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import { api } from '@/lib/api';
import { BackendPaginatedResponse } from '@/types/api';

/**
 * Custom hook for fetching search suggestions
 * Returns max 5 product suggestions based on search query
 */
export function useSearchSuggestions(query: string, enabled: boolean = true) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    // Don't fetch if query is too short or disabled
    if (!enabled || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.products.getAll({
        search: query,
        limit: 5, // Max 5 suggestions
        isActive: true,
        inStock: true,
      }) as BackendPaginatedResponse<Product>;

      if (response.success && response.data?.products) {
        setSuggestions(response.data.products);
      } else {
        setSuggestions([]);
      }
    } catch (err: any) {
      console.error('Error fetching search suggestions:', err);
      setError('Failed to load suggestions');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, enabled]);

  useEffect(() => {
    // Debounce the API call
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchSuggestions]);

  return {
    suggestions,
    isLoading,
    error,
    clearSuggestions: () => setSuggestions([]),
  };
}

