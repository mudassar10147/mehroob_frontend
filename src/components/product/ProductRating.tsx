"use client";

import React from "react";

interface ProductRatingProps {
  rating: number;
  reviews: number;
}

export function ProductRating({ rating, reviews }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xs ${
              i < Math.floor(rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-[var(--color-text-secondary)]">
        {rating} ({reviews} reviews)
      </span>
    </div>
  );
}
