"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { CartItemCard } from "@/components/cart/CartItemCard";

export default function CartPage() {
  const { items, subtotal, tax, shipping, total, updateQuantity, removeItem, clearCart } = useCartStore();

  return (
    <div className="cart-page min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[var(--color-surface)] py-12 md:py-16 pt-24 md:pt-28">
        <div className="container">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)]">
            Shopping Cart
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          {items.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-[var(--color-text-primary)] opacity-50" />
              </div>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                Your cart is empty
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8">
                Looks like you haven&apos;t added anything to your cart yet. Explore our collection of premium sheet masks.
              </p>
              <Link href="/products">
                <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white px-8 py-6">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            // Cart with Items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Clear Cart Button */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--color-border)]">
                  <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)]">
                    Cart Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-red-500 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                      variant="full"
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-[var(--color-surface)] rounded-lg p-6 sticky top-24">
                  <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {/* Subtotal */}
                    <div className="flex justify-between text-[var(--color-text-secondary)]">
                      <span>Subtotal</span>
                      <span>PKR {subtotal.toLocaleString()}</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-[var(--color-text-secondary)]">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium">FREE</span>
                        ) : (
                          `PKR ${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between text-[var(--color-text-secondary)]">
                      <span>Tax (GST)</span>
                      <span>PKR {tax.toLocaleString()}</span>
                    </div>

                    {/* Free Shipping Progress */}
                    {shipping > 0 && (
                      <div className="pt-3 border-t border-[var(--color-border)]">
                        <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                          Add PKR {(5000 - subtotal).toLocaleString()} more for FREE shipping
                        </p>
                        <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[var(--color-primary)] h-full transition-all duration-300"
                            style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-xl font-semibold text-[var(--color-text-primary)] py-4 border-t border-[var(--color-border)] mb-6">
                    <span className="font-[var(--font-heading)]">Total</span>
                    <span>PKR {total.toLocaleString()}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button className="w-full bg-[var(--color-text-primary)] hover:bg-[var(--color-text-bold)] text-white py-6 text-base font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all mb-3">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Continue Shopping Link */}
                  <Link
                    href="/products"
                    className="block text-center text-sm text-[var(--color-text-primary)] hover:underline transition-colors"
                  >
                    Continue Shopping
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-8 pt-6 border-t border-[var(--color-border)] space-y-3">
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Free Shipping on Orders Over PKR 5,000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Easy Returns Within 7 Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

