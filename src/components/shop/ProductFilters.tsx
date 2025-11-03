"use client";

import React from "react";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ProductFiltersProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
}

const categories: FilterOption[] = [
  { label: "All Masks", value: "all", count: 12 },
  { label: "Hydrating", value: "hydrating", count: 3 },
  { label: "Brightening", value: "brightening", count: 3 },
  { label: "Anti-Aging", value: "anti-aging", count: 3 },
  { label: "Soothing", value: "soothing", count: 3 },
];

export function ProductFilters({ filters: externalFilters, onFilterChange }: ProductFiltersProps) {
  // Use external filters if provided, otherwise use internal state
  const [internalFilters, setInternalFilters] = React.useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    sortBy: "featured",
  });

  const filters = externalFilters || internalFilters;
  const selectedCategories = filters.categories;
  const priceRange = filters.priceRange;

  // Update internal state when external filters change
  React.useEffect(() => {
    if (externalFilters) {
      setInternalFilters(externalFilters);
    }
  }, [externalFilters]);

  const handleCategoryToggle = (value: string) => {
    let newCategories: string[];
    if (value === "all") {
      newCategories = [];
    } else {
      newCategories = selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value];
    }

    const updatedFilters: FilterState = {
      ...filters,
      categories: newCategories,
    };

    if (!externalFilters) {
      setInternalFilters(updatedFilters);
    }
    onFilterChange?.(updatedFilters);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const updatedFilters: FilterState = {
      ...filters,
      priceRange: [min, max],
    };

    if (!externalFilters) {
      setInternalFilters(updatedFilters);
    }
    onFilterChange?.(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 5000],
      sortBy: "featured",
    };

    if (!externalFilters) {
      setInternalFilters(clearedFilters);
    }
    onFilterChange?.(clearedFilters);
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
        <div className="space-y-3">
          {categories.map((category) => (
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
                value={priceRange[0]}
                onChange={(e) => {
                  const min = Math.max(0, Number(e.target.value));
                  handlePriceRangeChange(min, priceRange[1]);
                }}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-text-primary)]"
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
                value={priceRange[1]}
                onChange={(e) => {
                  const max = Math.max(priceRange[0], Number(e.target.value));
                  handlePriceRangeChange(priceRange[0], max);
                }}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-text-primary)]"
                placeholder="5000"
                min={priceRange[0]}
              />
            </div>
          </div>
          <div className="text-center">
            <span className="text-[var(--fs-sm)] text-[var(--color-text-secondary)]">
              PKR {priceRange[0].toLocaleString()} - PKR {priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Apply Button - Now just triggers immediate apply */}
      <button
        onClick={() => {
          // Filters are already applied via onChange handlers, but this ensures they're applied
          onFilterChange?.(filters);
        }}
        className="w-full bg-[var(--color-text-primary)] hover:bg-[var(--color-text-bold)] text-white py-3 rounded-lg font-medium transition-all shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
      >
        Apply Filters
      </button>
    </aside>
  );
}

