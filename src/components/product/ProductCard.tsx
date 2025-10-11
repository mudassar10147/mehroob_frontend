"use client";

import React from "react";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";
import { ProductRating } from "./ProductRating";
import { ProductCategoryBadge } from "./ProductCategoryBadge";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card group bg-white rounded-[var(--border-radius)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 transition-all duration-[var(--transition-medium)] ease-in-out overflow-hidden cursor-pointer">
      {/* Product Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
        />
        
        {/* Category Badge */}
        <ProductCategoryBadge category={product.category} />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        {/* Product Name */}
        <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <ProductRating rating={product.rating} reviews={product.reviews} />

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="price">
            <span className="text-xl font-semibold text-[var(--color-text-primary)]">
              PKR {product.price.toLocaleString()}
            </span>
          </div>
          
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
