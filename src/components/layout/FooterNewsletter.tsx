"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function FooterNewsletter() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription submitted");
  };

  return (
    <div className="footer-newsletter">
      <h4 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-primary)] mb-4">
        Stay Updated
      </h4>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-sm">
        Get the latest skincare tips, new product launches, and exclusive offers 
        delivered to your inbox.
      </p>
      
      <form onSubmit={handleNewsletterSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
            required
          />
          <Button type="submit" size="sm" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
