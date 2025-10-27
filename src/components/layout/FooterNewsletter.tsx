"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

export function FooterNewsletter() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription submitted");
  };

  return (
    <div className="footer-newsletter">
      <h4 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-bold)] mb-4">
        Stay Updated
      </h4>
      <p className="text-sm text-[var(--color-text-primary)] mb-6 max-w-sm">
        Get the latest skincare tips, new product launches, and exclusive offers 
        delivered to your inbox.
      </p>
      
      <form onSubmit={handleNewsletterSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border-[var(--color-border)] focus:border-[var(--color-primary)]"
            required
          />
          <Button 
            type="submit" 
            size="sm" 
            className="bg-[var(--color-secondary-1)] hover:bg-[var(--color-primary)] text-[var(--color-text-bold)] hover:text-white transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-[#8B8B8B]">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
