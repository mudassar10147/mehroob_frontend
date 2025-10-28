"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import type { Product } from "@/types/product";

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Fetch search suggestions
  const { suggestions, isLoading } = useSearchSuggestions(
    searchQuery,
    showSuggestions && searchQuery.length >= 2
  );

  // Update dropdown position on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (showSuggestions && searchContainerRef.current) {
        const rect = searchContainerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      }
    };

    // Update on mount and query change
    updatePosition();

    // Update on scroll and resize
    if (showSuggestions) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showSuggestions, searchQuery]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product: Product) => {
    const clickedQuery = product.name;
    setSearchQuery("");
    setShowSuggestions(false);
    router.push(`/products?search=${encodeURIComponent(clickedQuery)}`);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") {
        handleSearch(e as any);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e as any);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Render dropdown suggestions
  const renderSuggestions = () => {
    if (!showSuggestions || searchQuery.length < 2) return null;

    return (
      <div
        ref={suggestionsRef}
        className="absolute bg-white border-2 border-[var(--color-primary)] rounded-xl shadow-2xl z-[9999] max-h-80 overflow-y-auto"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`
        }}
      >
        {isLoading ? (
          <div className="px-4 py-3 text-sm text-[var(--color-text-secondary)] text-center">
            Searching...
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="py-2">
            {suggestions.map((product, index) => (
              <li key={product._id}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(product)}
                  className={`w-full text-left px-5 py-4 hover:bg-[var(--color-primary)]/15 hover:scale-[1.02] transition-all duration-200 flex items-center gap-4 rounded-lg mx-2 my-1 ${
                    index === selectedIndex
                      ? "bg-[var(--color-primary)]/15 scale-[1.02] shadow-md"
                      : ""
                  }`}
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg border-2 border-[var(--color-primary)]/20"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-[var(--color-text-primary)]">
                      {product.name}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                      {product.brand} • PKR {product.finalPrice.toLocaleString()}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-3 text-sm text-[var(--color-text-secondary)] text-center">
            No products found
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="hero-section relative h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
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
              <div ref={searchContainerRef} className="hero-search relative z-50">
                <form onSubmit={handleSearch} className="relative flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Search sheet masks..."
                      className="w-full h-12 text-base border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 pr-10"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setShowSuggestions(false);
                          searchInputRef.current?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
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

      {/* Search Suggestions Dropdown - Portal rendering */}
      {typeof window !== 'undefined' && ReactDOM.createPortal(
        renderSuggestions(),
        document.body
      )}
    </>
  );
}
