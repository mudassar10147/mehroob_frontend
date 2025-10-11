"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "./ProductCard";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality with Zustand store
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="sm"
      className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white transform group-hover:scale-105 transition-all duration-300 ease-out shadow-sm hover:shadow-md"
    >
      <ShoppingCart className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform duration-300" />
      Add
    </Button>
  );
}
