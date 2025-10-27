"use client";

import React from "react";

interface ProductCategoryBadgeProps {
  category: string;
}

export function ProductCategoryBadge({ category }: ProductCategoryBadgeProps) {
  return (
    <div className="absolute top-3 left-3">
      <span className="bg-[var(--color-secondary-1)] text-[var(--color-text-bold)] text-xs px-2 py-1 rounded-full font-medium group-hover:bg-[var(--color-secondary-1)]/90 transition-colors duration-300">
        {category}
      </span>
    </div>
  );
}
