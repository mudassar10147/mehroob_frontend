"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonText?: string;
}

export function ComingSoon({
  title = "Coming Soon",
  description,
  showBackButton = true,
  backButtonHref = "/",
  backButtonText = "Back to Home",
}: ComingSoonProps) {
  const defaultDescription = (
    <>
      <p className="text-lg text-[var(--color-text-primary)] mb-4">
        You're viewing the basic version of <span className="font-semibold">Mehroob MVP</span> — 
        your gateway to premium skincare.
      </p>
      <p className="text-base text-[var(--color-text-secondary)]">
        We're crafting something beautiful, and exciting new features are on the way! 
        Stay tuned as we continue to enhance your skincare journey.
      </p>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative p-6">
            <Sparkles className="w-12 h-12 text-[var(--color-primary)] animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6 animate-[fadeIn_0.7s_ease-in_0.2s_both]">
          {title}
        </h1>

        {/* Description */}
        <div className="mb-8 text-center space-y-4 animate-[fadeIn_0.7s_ease-in_0.4s_both]">
          {description ? (
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              {description}
            </p>
          ) : (
            defaultDescription
          )}
        </div>

        {/* Info Badge */}
        <div className="mb-10 flex justify-center animate-[fadeIn_0.7s_ease-in_0.6s_both]">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
            <Clock className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              More Features Coming Soon
            </span>
          </div>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <div className="flex justify-center gap-4 animate-[fadeIn_0.7s_ease-in_0.8s_both]">
            <Link href={backButtonHref}>
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 px-6 py-3 border-[var(--color-border)] bg-white hover:bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] transition-all shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
              >
                <ArrowLeft className="w-4 h-4" />
                {backButtonText}
              </Button>
            </Link>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2 opacity-30">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

