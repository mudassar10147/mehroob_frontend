"use client";

import React from "react";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { CartItemCard } from "./CartItemCard";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, subtotal, updateQuantity, removeItem } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[var(--z-modal-backdrop)] animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[var(--z-modal)] animate-in slide-in-from-right duration-300 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <h2
            id="cart-drawer-title"
            className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-text-primary)]"
          >
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text-primary)]"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-[var(--color-text-primary)] opacity-50" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Your cart is empty
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Add some masks to get started
              </p>
              <Link href="/products" onClick={onClose}>
                <Button className="bg-[var(--color-text-primary)] hover:bg-[var(--color-text-bold)] text-white">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-border)] p-6 space-y-4 bg-[var(--color-surface)]">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
              <span>Subtotal</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>

            {/* Shipping Note */}
            <p className="text-xs text-[var(--color-text-secondary)]">
              Shipping and taxes calculated at checkout
            </p>

            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold text-[var(--color-text-primary)] pt-4 border-t border-[var(--color-border)] mb-4">
              <span className="font-[var(--font-heading)]">Total</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" onClick={onClose} className="block mb-3">
              <Button className="w-full bg-[var(--color-text-primary)] hover:bg-[var(--color-text-bold)] text-white py-6 text-base font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all">
                Proceed to Checkout
              </Button>
            </Link>

            {/* View Cart Link */}
            <Link
              href="/cart"
              onClick={onClose}
              className="block text-center text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] py-2 rounded-md transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

