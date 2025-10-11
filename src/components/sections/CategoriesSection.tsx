"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/category/CategoryCard";
import { sheetMaskCategories } from "@/data/mockCategories";

export default function CategoriesSection() {
  return (
    <section className="categories-section py-16 lg:py-20 bg-[var(--color-background)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-[var(--font-heading)] font-semibold text-[var(--color-text-primary)] mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Discover the perfect sheet mask for your skin concerns. Each category is carefully curated 
            with dermatologist-approved formulas for visible results.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {sheetMaskCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
}
