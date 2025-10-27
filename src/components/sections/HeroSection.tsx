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
    <section className="hero-section relative h-[90vh] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Panel - Content Area */}
        <div className="flex flex-col justify-center items-center px-6 lg:px-12 xl:px-16 bg-gradient-to-t from-[#D5E4C4] to-[#F2FAEA] h-full">
          <div className="w-full max-w-lg">
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
        <div className="relative h-full overflow-hidden bg-gradient-to-t from-[#D5E4C4] to-[#F2FAEA] flex items-center justify-center pt-20 px-[2.5%] pb-[2.5%]">
          <div className="relative w-[90%] h-[calc(90%-5rem)]">
            <Image
              src="/images/image_2.jpg"
              alt="Premium sheet masks for beautiful skin"
              fill
              className="object-cover rounded-xl"
              priority
              sizes="50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
