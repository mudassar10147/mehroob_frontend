"use client";

import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search submitted");
  };

  return (
    <section className="hero-section relative min-h-screen overflow-hidden">
      {/* Left Panel - Content Area */}
      <div className="hero-content absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-16 lg:py-24 bg-white">
        {/* Organic Pattern Background */}
        <div className="organic-pattern absolute inset-0 opacity-5 bg-gradient-to-br from-[var(--color-surface)] via-transparent to-[var(--color-secondary)]"></div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-lg">
          {/* Headlines */}
          <div className="hero-headlines mb-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-[var(--font-heading)] font-semibold text-[var(--color-text-primary)] leading-tight">
              Premium Sheet Masks
            </h1>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[var(--font-heading)] font-semibold text-[var(--color-text-primary)] leading-tight mt-2">
              For Beautiful Skin
            </h2>
          </div>

          {/* Description */}
          <div className="hero-description mb-12">
            <p className="text-lg lg:text-xl text-[var(--color-text-primary)] leading-relaxed font-[var(--font-body)]">
              Discover our curated collection of premium sheet masks. Hydrating, brightening, and anti-aging formulas for luminous, healthy skin with just minutes of daily care.
            </p>
          </div>

          {/* Search Bar */}
          <div className="hero-search">
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                type="text"
                placeholder="Search sheet masks..."
                className="flex-1 h-12 text-base border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Product Showcase */}
      <div className="hero-image absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/image_2.jpg"
          alt="Premium sheet masks for beautiful skin"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
        
        {/* Overlay for mobile */}
        <div className="lg:hidden absolute inset-0 bg-black/40"></div>
        
        {/* Border on the image side */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none lg:block hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path 
              d="M98,97 L98,3 L81,3 L25,97 Z" 
              fill="none" 
              stroke="var(--color-background)" 
              strokeWidth="0.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Diagonal Division - 70% top to 30% bottom */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none lg:block hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="diagonal-clip">
              <path d="M0,0 L80,0 L20,100 L0,100 Z" />
            </clipPath>
            <clipPath id="diagonal-border-clip">
              <path d="M0,0 L80,0 L20,100 L0,100 Z" />
            </clipPath>
          </defs>
          <rect width="100" height="100" fill="white" clipPath="url(#diagonal-clip)" />
        </svg>
      </div>
    </section>
  );
}
