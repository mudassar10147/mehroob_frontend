/**
 * Products Store Slice (Zustand)
 * Manages product state and filters
 */

import { create } from 'zustand';
import { Product, ProductFilters } from '@/types/product';

interface ProductsState {
  products: Product[];
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialFilters: ProductFilters = {
  category: undefined,
  skinType: undefined,
  priceMin: undefined,
  priceMax: undefined,
  inStock: undefined,
  search: undefined,
  sortBy: undefined,
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  filters: initialFilters,
  isLoading: false,
  error: null,

  setProducts: (products) =>
    set({ products, error: null }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () =>
    set({ filters: initialFilters }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  setError: (error) =>
    set({ error, isLoading: false }),
}));

