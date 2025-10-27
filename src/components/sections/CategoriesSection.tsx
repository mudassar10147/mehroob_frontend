"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/category/CategoryCard";
import { sheetMaskCategories } from "@/data/mockCategories";

export default function CategoriesSection() {
  return (
    <section className="categories-section py-20 lg:py-28 bg-gradient-to-b from-[var(--color-primary-light)] to-[var(--color-background)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text-bold)] mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-[var(--color-text-primary)] max-w-3xl mx-auto leading-relaxed">
            Explore our premium collection, each category crafted for your unique skincare journey
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sheetMaskCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary-2)] text-[var(--color-text-bold)] px-12 py-6 text-lg font-semibold transition-all duration-[var(--transition-medium)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
