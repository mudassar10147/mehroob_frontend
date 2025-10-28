"use client";

import React from "react";
import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewsletter";

export function Footer() {
  return (
    <footer className="footer bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="container py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <FooterBrand />
          </div>

          {/* Links Section */}
          <div className="lg:col-span-2">
            <FooterLinks />
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="/privacy" 
              className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-[var(--transition-fast)]"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-[var(--transition-fast)]"
            >
              Terms of Service
            </a>
            <a 
              href="/cookies" 
              className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-[var(--transition-fast)]"
            >
              Cookie Policy
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-[var(--color-text-primary)]">
            © 2024 MaskBar by Mehroob. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
