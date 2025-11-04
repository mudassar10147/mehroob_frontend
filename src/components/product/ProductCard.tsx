"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
import { ProductRating } from "./ProductRating";
import { ProductCategoryBadge } from "./ProductCategoryBadge";
import { Product as BackendProduct } from "@/types/product";

// Legacy Product interface for AddToCartButton compatibility
export interface Product {
  id: string; // Changed to string to support MongoDB ObjectId
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: BackendProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use thumbnail or first image, fallback to existing placeholder
  const imageUrl = product.thumbnail || product.images?.[0] || '/images/image_2.jpg';
  const discountedPrice = product.discountPrice || product.finalPrice;
  const hasDiscount = discountedPrice < product.price;

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="product-card group bg-white rounded-[var(--border-radius)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 transition-all duration-[var(--transition-medium)] ease-in-out overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Product Image */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 items-end">
            {product.isNewArrival && (
              <span className="bg-[var(--color-secondary-1)] text-[var(--color-text-bold)] text-xs font-semibold px-2 py-1 rounded">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-[var(--color-secondary-1)] text-[var(--color-text-bold)] text-xs font-semibold px-2 py-1 rounded">
                Best Seller
              </span>
            )}
            {hasDiscount && product.discountPercent && (
              <span className="bg-[var(--color-secondary-1)] text-[var(--color-text-bold)] text-xs font-semibold px-2 py-1 rounded">
                -{product.discountPercent}%
              </span>
            )}
          </div>
          
          {/* Category Badge */}
          {(product.categoryId?.name || product.category) && (
            <ProductCategoryBadge category={product.categoryId?.name || product.category} />
          )}
          
          {/* Out of Stock Overlay */}
          {product.inStock === false && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          {/* Brand */}
          {(product.brandId?.name || product.brand) && (
            <p className="text-xs text-[#8B8B8B] mb-1 uppercase tracking-wide">
              {product.brandId?.name || product.brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-bold)] mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          {product.shortDescription && (
            <p className="text-sm text-[#8B8B8B] mb-3 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Rating */}
          <div className="mb-3">
            <ProductRating rating={product.averageRating || 0} reviews={product.totalReviews || 0} />
          </div>

          {/* Price and Add to Cart */}
          <div className="mt-auto flex items-center justify-between">
            <div className="price flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-sm text-[#8B8B8B] line-through">
                    PKR {product.price.toLocaleString()}
                  </span>
                  <span className="text-xl font-semibold text-black">
                    PKR {discountedPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold text-black">
                  PKR {product.price.toLocaleString()}
                </span>
              )}
            </div>
            
            <AddToCartButton 
              product={{
                id: product._id,
                name: product.name,
                price: discountedPrice,
                image: imageUrl,
                category: product.categoryId?.name || product.category,
                description: product.description || product.shortDescription || '',
                rating: product.averageRating || 0,
                reviews: product.totalReviews || 0,
              }} 
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Product interface is already exported above for AddToCartButton compatibility
