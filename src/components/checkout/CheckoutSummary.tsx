"use client";

import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/slices/cartSlice";
import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";

export function CheckoutSummary() {
  const { items, subtotal, tax, shipping, total } = useCartStore();

  return (
    <div className="bg-[var(--color-surface)] rounded-lg p-6 sticky top-24">
      {/* Title */}
      <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">
        Order Summary
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            {/* Product Image */}
            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-2 mb-1">
                {item.productName}
              </h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  Qty: {item.quantity}
                </span>
                <span className="font-semibold text-[var(--color-text-primary)]">
                  PKR {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 py-4 border-t border-[var(--color-border)]">
        {/* Subtotal */}
        <div className="flex justify-between text-[var(--color-text-secondary)]">
          <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
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

        {/* Tax - Hidden if 0 */}
        {tax > 0 && (
          <div className="flex justify-between text-[var(--color-text-secondary)]">
            <span>Tax</span>
            <span>PKR {tax.toLocaleString()}</span>
          </div>
        )}

        {/* Free Shipping Message */}
        {shipping === 0 && subtotal >= 3000 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You&apos;ve unlocked free shipping!
            </p>
          </div>
        )}
        
        {/* Almost Free Shipping Message */}
        {shipping > 0 && subtotal < 3000 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              Add PKR {(3000 - subtotal).toLocaleString()} more for free shipping!
            </p>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between text-xl font-semibold text-[var(--color-text-primary)] py-4 border-t border-[var(--color-border)] mb-6">
        <span className="font-[var(--font-heading)]">Total</span>
        <span>PKR {total.toLocaleString()}</span>
      </div>

      {/* Trust Badges */}
      <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Secure Payment
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Your information is protected
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Fast Delivery
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Delivered within 3-5 business days
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RefreshCcw className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Easy Returns
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              7-day return policy
            </p>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-800 font-medium mb-1">
            💵 Cash on Delivery
          </p>
          <p className="text-xs text-blue-700">
            Pay with cash when your order arrives at your doorstep
          </p>
        </div>
      </div>
    </div>
  );
}

