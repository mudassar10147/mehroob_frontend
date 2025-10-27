"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { bestSellingProducts } from "@/data/mockProducts";

export default function BestSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response: any = await api.products.getBestSellers(8); // Get top 8 products
        
        if (response.success && response.data) {
          setProducts(response.data.products);
        }
      } catch (err: any) {
        console.error('Error fetching best sellers:', err);
        // Fallback to mock data when backend is unavailable
        console.log('Using mock data as fallback');
        
        // Transform mock data to match BackendProduct type
        const transformedProducts = bestSellingProducts.slice(0, 8).map((mock) => ({
          _id: String(mock.id),
          slug: mock.name.toLowerCase().replace(/\s+/g, '-'),
          name: mock.name,
          price: mock.price,
          finalPrice: mock.price,
          sku: `SKU-${mock.id}`,
          brand: mock.category,
          brandId: {
            _id: `brand-${mock.id}`,
            name: mock.category,
            slug: mock.category.toLowerCase()
          },
          category: mock.category,
          categoryId: {
            _id: `cat-${mock.id}`,
            name: mock.category,
            slug: mock.category.toLowerCase()
          },
          images: [mock.image],
          thumbnail: mock.image,
          shortDescription: mock.description,
          stock: 100,
          inStock: true,
          isActive: true,
          isFeatured: false,
          isNewArrival: false,
          isBestSeller: true,
          sold: 0,
          averageRating: mock.rating,
          totalReviews: mock.reviews,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        
        setProducts(transformedProducts);
        setError(null); // Don't show error when using mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="best-selling-products py-16 lg:py-24 bg-[var(--color-surface)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-[var(--font-heading)] font-semibold text-[var(--color-text-primary)] mb-4">
            Best Selling Products
          </h2>
          <p className="text-lg text-[var(--color-text-primary)] max-w-2xl mx-auto">
            Discover our most loved sheet masks, carefully curated for beautiful, healthy skin. 
            Each mask is dermatologist-tested and loved by thousands of customers.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-secondary)] mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-[var(--color-primary)] text-[var(--color-primary)]"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-secondary)]">No best selling products available at the moment.</p>
          </div>
        )}

        {/* View All Button */}
        {!isLoading && !error && products.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--color-secondary-1)] text-[var(--color-text-bold)] hover:bg-[var(--color-secondary-1)] hover:text-[var(--color-text-bold)]"
              >
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
