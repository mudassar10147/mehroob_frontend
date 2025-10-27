"use client";

import React, { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ProductFilters, FilterState } from "@/components/shop/ProductFilters";
import { useProducts } from "@/hooks/useProducts";
import { ProductFilters as ProductFiltersType } from "@/types/product";

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    sortBy: "featured",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Convert FilterState to ProductFiltersType
  const apiFilters: ProductFiltersType = {
    priceMin: filters.priceRange[0],
    priceMax: filters.priceRange[1],
    sortBy: sortBy === "featured" ? undefined : 
            sortBy === "price-low" ? "price-asc" : 
            sortBy === "price-high" ? "price-desc" : 
            sortBy === "newest" ? "newest" : undefined,
  };

  // Fetch products from API
  const { products, isLoading, error, pagination } = useProducts(apiFilters);

  return (
    <div className="products-page">
      {/* Page Header */}
      <ShopHeader
        title="Shop All Masks"
        description="Discover our curated collection of premium sheet masks. Each mask is carefully selected to bring you the best in skincare."
        productCount={pagination.totalCount}
      />

      {/* Products Section */}
      <section className="products-section py-12 md:py-16 bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters {filters.categories.length > 0 && `(${filters.categories.length})`}
              </button>

              {/* Mobile Filters Overlay */}
              {showFilters && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
                  <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                    <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between sticky top-0 bg-white z-10">
                      <h3 className="font-[var(--font-heading)] text-xl font-semibold">
                        Filters
                      </h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <ProductFilters
                        onFilterChange={(newFilters) => {
                          setFilters(newFilters);
                          setShowFilters(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sidebar Filter */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <ProductFilters onFilterChange={setFilters} />
            </div>

            {/* Products Area */}
            <div className="flex-1">
              {/* Filter Bar */}
              <div className="filter-bar mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[var(--color-border)]">
                <div className="results-count">
                  <p className="text-[var(--color-text-secondary)]">
                    Showing{" "}
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {products.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {pagination.totalCount}
                    </span>{" "}
                    products
                  </p>
                </div>

                <div className="sort-options flex items-center gap-2">
                  <label className="text-[var(--fs-sm)] text-[var(--color-text-secondary)]">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-primary)]"></div>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                      Error Loading Products
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                      {error}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:opacity-90 transition-all"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {!isLoading && !error && (
                <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}

              {/* Empty State - Show when no products */}
              {!isLoading && !error && products.length === 0 && (
                <div className="empty-state text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-[var(--color-text-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                      No products found
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                      Try adjusting your filters to see more results
                    </p>
                    <button
                      onClick={() => {
                        setFilters({ categories: [], priceRange: [0, 5000], sortBy: "featured" });
                        setSortBy("featured");
                      }}
                      className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:opacity-90 transition-all"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

