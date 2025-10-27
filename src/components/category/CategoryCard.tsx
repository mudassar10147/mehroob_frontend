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
      <div className="category-card group bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] rounded-xl p-6 transition-all duration-[var(--transition-medium)] ease-in-out cursor-pointer h-full flex flex-col items-center justify-center hover:-translate-y-1 min-h-[140px]">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div 
            className="p-3 rounded-lg transition-all duration-[var(--transition-medium)] group-hover:scale-110"
            style={{ backgroundColor: category.color + '15' }}
          >
            <IconComponent 
              className="h-7 w-7 transition-all duration-[var(--transition-medium)]"
              style={{ color: category.color }}
            />
          </div>
        </div>

        {/* Category Name */}
        <h3 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-primary)] text-center group-hover:text-[var(--color-primary)] transition-colors duration-[var(--transition-medium)]">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
