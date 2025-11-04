"use client";

import React, { useEffect } from "react";
import { useMainCategories } from "@/hooks/useCategories";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const { categories: fetchedCategories, isLoading: categoriesLoading } = useMainCategories(true);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 5000]);
  // Temporary price range for inputs (only applied on button click)
  const [tempPriceRange, setTempPriceRange] = React.useState<[string, string]>(['0', '5000']);

  // Build category options from fetched data - Only subcategories (not parent categories)
  const categoryOptions: FilterOption[] = React.useMemo(() => {
    // Add "All Masks" option
    const options: FilterOption[] = [{ label: "All Masks", value: "all" }];
    
    // Only add subcategories (categories with parentCategory !== null)
    fetchedCategories.forEach((category) => {
      // Skip main categories - only add their subcategories
      if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach((subcategory) => {
          // Only add if it's actually a subcategory (has parent)
          if (subcategory.parentCategory !== null) {
            options.push({
              label: subcategory.name,
              value: subcategory._id,
            });
          }
        });
      }
    });
    
    return options;
  }, [fetchedCategories]);

  const handleCategoryToggle = (value: string) => {
    let newCategories: string[];
    if (value === "all") {
      newCategories = [];
    } else {
      newCategories = selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value];
    }
    setSelectedCategories(newCategories);
    // Trigger filter change immediately when category changes
    onFilterChange?.({
      categories: newCategories,
      priceRange,
      sortBy: "featured",
    });
  };

  const handleTempPriceInputChange = (min: string, max: string) => {
    // Allow empty values while typing
    setTempPriceRange([min, max]);
  };

  const handlePriceInputBlur = (type: 'min' | 'max') => {
    // When field loses focus, if empty, set to default value
    if (type === 'min') {
      const minValue = tempPriceRange[0] === '' ? '0' : tempPriceRange[0];
      setTempPriceRange([minValue, tempPriceRange[1]]);
    } else {
      const maxValue = tempPriceRange[1] === '' ? '5000' : tempPriceRange[1];
      setTempPriceRange([tempPriceRange[0], maxValue]);
    }
  };

  const handleApplyFilters = () => {
    // Convert temp price range to numbers and apply
    const minPrice = Number(tempPriceRange[0]) || 0;
    const maxPrice = Number(tempPriceRange[1]) || 5000;
    const newPriceRange: [number, number] = [minPrice, maxPrice];
    
    setPriceRange(newPriceRange);
    // Trigger filter change with applied filters
    onFilterChange?.({
      categories: selectedCategories,
      priceRange: newPriceRange,
      sortBy: "featured",
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setTempPriceRange(['0', '5000']);
    // Trigger filter change with cleared filters
    onFilterChange?.({
      categories: [],
      priceRange: [0, 5000],
      sortBy: "featured",
    });
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <aside className="product-filters bg-white rounded-[var(--border-radius)] p-6 shadow-[var(--shadow-sm)] sticky top-24">
      {/* Header */}
      <div className="filter-header flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-border)]">
        <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)]">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-[var(--fs-sm)] text-[var(--color-primary)] hover:underline transition-all"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-section mb-8">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-[var(--fs-base)]">
          Category
        </h4>
        {categoriesLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {categoryOptions.map((category) => (
            <label
              key={category.value}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    category.value === "all"
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(category.value)
                  }
                  onChange={() => handleCategoryToggle(category.value)}
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                  {category.label}
                </span>
              </div>
              {category.count !== undefined && (
                <span className="text-[var(--fs-sm)] text-[var(--color-text-secondary)]">
                  ({category.count})
                </span>
              )}
            </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="filter-section mb-8">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-[var(--fs-base)]">
          Price Range
        </h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-[var(--fs-sm)] text-[var(--color-text-secondary)] mb-1 block">
                Min
              </label>
              <input
                type="number"
                value={tempPriceRange[0]}
                onChange={(e) => handleTempPriceInputChange(e.target.value, tempPriceRange[1])}
                onBlur={() => handlePriceInputBlur('min')}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                placeholder="0"
                min="0"
              />
            </div>
            <span className="text-[var(--color-text-secondary)] mt-6">-</span>
            <div className="flex-1">
              <label className="text-[var(--fs-sm)] text-[var(--color-text-secondary)] mb-1 block">
                Max
              </label>
              <input
                type="number"
                value={tempPriceRange[1]}
                onChange={(e) => handleTempPriceInputChange(tempPriceRange[0], e.target.value)}
                onBlur={() => handlePriceInputBlur('max')}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                placeholder="5000"
                min="0"
              />
            </div>
          </div>
          <div className="text-center">
            <span className="text-[var(--fs-sm)] text-[var(--color-text-secondary)]">
              PKR {Number(tempPriceRange[0] || 0).toLocaleString()} - PKR {Number(tempPriceRange[1] || 5000).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-[var(--color-text-primary)] hover:bg-[var(--color-text-bold)] text-white py-3 rounded-lg font-medium transition-all shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
      >
        Apply Filters
      </button>
    </aside>
  );
}

