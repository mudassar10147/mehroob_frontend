/**
 * Product related types
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  stock: number;
  images: string[];
  category: ProductCategory;
  skinTypes: SkinType[];
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory =
  | 'hydrating'
  | 'brightening'
  | 'anti-aging'
  | 'purifying'
  | 'soothing';

export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal';

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  attributes: Record<string, string>; // e.g., { size: "single", pack: "1 mask" }
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  skinType?: SkinType;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'popular';
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

