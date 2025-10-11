"use client";

import React from "react";
import Link from "next/link";
import { Droplets, Sparkles, Clock, Target, Leaf, Zap, LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  sparkles: Sparkles,
  clock: Clock,
  target: Target,
  leaf: Leaf,
  zap: Zap,
};

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.iconName] || Droplets;
  
  return (
    <Link href={`/products?category=${category.slug}`}>
      <div className="category-card group bg-white border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-lg)] rounded-[var(--border-radius)] p-6 sm:p-8 transition-all duration-[var(--transition-medium)] ease-in-out cursor-pointer h-full flex flex-col items-center justify-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div 
            className="p-4 rounded-full group-hover:scale-110 transition-all duration-300"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <IconComponent 
              className="h-8 w-8 group-hover:scale-110 transition-transform duration-300"
              style={{ color: category.color }}
            />
          </div>
        </div>

        {/* Category Name */}
        <h3 className="font-[var(--font-heading)] text-base sm:text-lg font-semibold text-[var(--color-text-primary)] text-center group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
