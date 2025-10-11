"use client";

import React from "react";

export function FooterBrand() {
  return (
    <div className="footer-brand">
      {/* Brand Logo and Tagline */}
      <div className="mb-6">
        <h3 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
          MaskBar
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          by Mehroob
        </p>
      </div>

      {/* Brand Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm mb-6">
        Pakistan's premier destination for premium sheet masks. Discover dermatologist-approved 
        formulas for beautiful, healthy skin with our curated collection.
      </p>

      {/* Contact Info */}
      <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
        <p>📧 hello@maskbar.pk</p>
        <p>📞 +92 300 123 4567</p>
        <p>📍 Karachi, Pakistan</p>
      </div>
    </div>
  );
}
