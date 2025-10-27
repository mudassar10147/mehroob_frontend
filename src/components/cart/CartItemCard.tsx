"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/order";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  variant?: "compact" | "full";
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  variant = "full",
}: CartItemCardProps) {
  if (variant === "compact") {
    return (
      <div className="flex gap-4 p-4 bg-[var(--color-surface)] rounded-lg hover:shadow-[var(--shadow-sm)] transition-shadow">
        {/* Product Image */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[var(--color-text-primary)] mb-1 line-clamp-2">
            {item.productName}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            PKR {item.price.toLocaleString()}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-md border border-[var(--color-border)] hover:bg-white transition-colors flex items-center justify-center"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center font-medium text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-md border border-[var(--color-border)] hover:bg-white transition-colors flex items-center justify-center"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Remove Button & Price */}
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 rounded hover:bg-white transition-colors text-[var(--color-text-secondary)] hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <p className="font-semibold text-[var(--color-text-primary)]">
            PKR {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className="flex gap-4 p-6 bg-[var(--color-surface)] rounded-lg hover:shadow-[var(--shadow-sm)] transition-shadow">
      {/* Product Image */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-white">
        <Image
          src={item.productImage}
          alt={item.productName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 96px, 128px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex-1">
            <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-1">
              {item.productName}
            </h3>
            {item.variantName && (
              <p className="text-sm text-[var(--color-text-secondary)]">
                {item.variantName}
              </p>
            )}
          </div>

          {/* Remove Button (Desktop) */}
          <button
            onClick={() => onRemove(item.id)}
            className="hidden sm:flex p-2 rounded-lg hover:bg-white transition-colors text-[var(--color-text-secondary)] hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-secondary)]">Qty:</span>
            <div className="flex items-center gap-2 bg-white rounded-lg border border-[var(--color-border)] p-1">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-md hover:bg-[var(--color-surface)] transition-colors flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-md hover:bg-[var(--color-surface)] transition-colors flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-right">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                PKR {item.price.toLocaleString()} each
              </p>
              <p className="font-semibold text-lg text-[var(--color-text-primary)]">
                PKR {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>

            {/* Remove Button (Mobile) */}
            <button
              onClick={() => onRemove(item.id)}
              className="sm:hidden p-2 rounded-lg hover:bg-white transition-colors text-[var(--color-text-secondary)] hover:text-red-500"
              aria-label="Remove item"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

