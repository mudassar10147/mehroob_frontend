"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { bestSellingProducts } from "@/data/mockProducts";

export default function BestSellingProducts() {
  return (
    <section className="best-selling-products py-16 lg:py-24 bg-[var(--color-surface)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-[var(--font-heading)] font-semibold text-[var(--color-text-primary)] mb-4">
            Best Selling Products
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Discover our most loved sheet masks, carefully curated for beautiful, healthy skin. 
            Each mask is dermatologist-tested and loved by thousands of customers.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
