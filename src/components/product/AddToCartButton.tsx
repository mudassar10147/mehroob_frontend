"use client";

import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/slices/cartSlice";
import type { Product } from "./ProductCard";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent navigation to product page when clicking add to cart
    e.preventDefault();
    e.stopPropagation();
    
    // Add item to cart using Zustand store
    addItem({
      productId: product.id, // Already a string (MongoDB ObjectId)
      productName: product.name,
      productImage: product.image,
      price: product.price,
      quantity: 1,
    });

    // Show success feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="sm"
      disabled={isAdded}
      className={`
        ${isAdded 
          ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90' 
          : 'bg-[var(--color-secondary-1)] hover:bg-[var(--color-secondary-1)]/90'
        }
        ${isAdded ? 'text-white' : 'text-[var(--color-text-bold)]'} 
        transform group-hover:scale-105 transition-all duration-300 ease-out shadow-sm hover:shadow-md
      `}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-1 animate-in zoom-in duration-200" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform duration-300" />
          Add
        </>
      )}
    </Button>
  );
}
