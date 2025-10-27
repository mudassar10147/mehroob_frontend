"use client";

import React from "react";

interface ShopHeaderProps {
  title: string;
  description: string;
  productCount?: number;
}

export function ShopHeader({ title, description, productCount }: ShopHeaderProps) {
  return (
    <section className="shop-header bg-[var(--color-surface)] py-16 md:py-20 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)] opacity-5 rounded-full blur-3xl"
        aria-hidden="true"
      />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Small label */}
          <div className="inline-block mb-4">
            <span className="text-[var(--fs-sm)] tracking-wider uppercase text-[var(--color-primary)] font-medium">
              by Mehroob
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-text-primary)] mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-[var(--fs-md)] md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4">
            {description}
          </p>

          {/* Product Count Badge */}
          {productCount !== undefined && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-[var(--shadow-sm)] mt-4">
              <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
              <span className="text-[var(--fs-sm)] text-[var(--color-text-secondary)]">
                <span className="font-semibold text-[var(--color-text-primary)]">{productCount}</span> masks available
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

