/**
 * Product related types
 */

// Backend Brand reference
export interface BrandReference {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
}

// Backend Category reference
export interface CategoryReference {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  parent?: string;
}

// Main Product interface matching backend schema
export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string; // Brand name string
  brandId: BrandReference;
  category: string; // Category name string
  categoryId: CategoryReference;
  type?: string;
  
  // Media
  images: string[];
  thumbnail?: string;
  video?: string;
  
  // Descriptions
  shortDescription?: string;
  description?: string;
  longDescription?: string;
  
  // Product Details
  ingredients?: string[];
  howToUse?: string;
  skinType?: SkinType[];
  benefits?: string[];
  countryOfOrigin?: string;
  
  // Pricing
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  finalPrice: number;
  calculatedDiscountPercent?: number;
  
  // Stock & Status
  stock: number;
  inStock: boolean;
  isActive: boolean;
  
  // Features
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  
  // Stats
  sold: number;
  averageRating: number;
  totalReviews: number;
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string[];
  
  // Tags
  tags?: string[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export type ProductCategory =
  | 'hydrating'
  | 'brightening'
  | 'anti-aging'
  | 'purifying'
  | 'soothing';

export type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'Normal' | 'All';

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
  categoryId?: string; // Single category ID for API filtering
  categoryIds?: string[]; // Multiple category IDs for client-side filtering
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

