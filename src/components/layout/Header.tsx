'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import type { Product } from '@/types/product';

/**
 * Main Header Component
 * Displays branding, navigation, and utility icons
 * Responsive: Desktop (full nav) | Mobile (hamburger menu)
 * Shows a floating sticky navbar when scrolling past the main header
 */
export function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchContainerRefMain = useRef<HTMLDivElement>(null);
  const searchContainerRefSticky = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  
  // Fetch search suggestions
  const { suggestions, isLoading } = useSearchSuggestions(
    searchQuery,
    showSuggestions && searchQuery.length >= 2
  );
  
  // Get site name from environment variables
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'MaskBar';
  const siteTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'by Mehroob';
  
  // Calculate total cart items
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll to show floating navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update dropdown position on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (showSuggestions && isSearchOpen) {
        // Use the appropriate container ref based on scroll state
        const activeContainer = isScrolled 
          ? searchContainerRefSticky.current 
          : searchContainerRefMain.current;
        
        if (activeContainer) {
          const rect = activeContainer.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX,
            width: rect.width
          });
        }
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
  }, [showSuggestions, searchQuery, isSearchOpen, isScrolled]);

  // Focus input when search opens or when switching between headers
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      // Small delay to ensure the input is mounted
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen, isScrolled]);

  // Handle search button click
  const handleSearchButtonClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product: Product) => {
    const clickedQuery = product.name;
    setSearchQuery("");
    setShowSuggestions(false);
    setIsSearchOpen(false);
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
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  // Close suggestions and search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideSearch = 
        searchInputRef.current?.contains(target) ||
        searchButtonRef.current?.contains(target) ||
        suggestionsRef.current?.contains(target);
      
      if (!isClickInsideSearch && isSearchOpen) {
        setShowSuggestions(false);
        setIsSearchOpen(false);
      } else if (!isClickInsideSearch && suggestionsRef.current) {
        // Only close suggestions if clicking outside
        setShowSuggestions(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Render dropdown suggestions
  const renderSuggestions = () => {
    if (!showSuggestions || searchQuery.length < 2 || !isSearchOpen) return null;

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
      {/* Main Header */}
      <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        
        {/* Left: Branding */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <div className="h-12 sm:h-14 flex items-center">
            <img 
              src="/mehroob_logo.svg" 
              alt={`${siteName} - ${siteTagline}`}
              className="h-full w-auto"
              style={{ maxWidth: '220px' }}
            />
          </div>
        </Link>

        {/* Center: Navigation (Desktop Only) */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link 
            href="/" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            Home
          </Link>
          
          {/* Shop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]">
              Shop ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48 z-[var(--z-popover)]">
              <DropdownMenuItem asChild>
                <Link href="/products?category=hydrating">Hydrating Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=brightening">Brightening Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=anti-aging">Anti-Aging</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=purifying">Purifying Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=soothing">Soothing Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/products">All Sheet Masks</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            href="/products?filter=best-sellers" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            Best Sellers
          </Link>

          <Link 
            href="/track-order" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            Track Order
          </Link>
          
          <Link 
            href="/products?filter=new" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            New Arrivals
          </Link>
          
          <Link 
            href="/about" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            About
          </Link>
        </nav>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-4 relative">
          
          {/* Search Icon */}
          <div className="relative">
            <Button 
              ref={searchButtonRef}
              variant="ghost" 
              size="icon"
              onClick={handleSearchButtonClick}
              className="!text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </Button>
            
            {/* Search Input - Appears below button */}
            {isSearchOpen && !isScrolled && (
              <div 
                ref={searchContainerRefMain}
                className="absolute top-full right-0 mt-2 w-80 z-50"
              >
                <form onSubmit={handleSearch} className="relative flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Search sheet masks..."
                      className="w-full h-10 text-sm border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 pr-8"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setShowSuggestions(false);
                          searchInputRef.current?.focus();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="h-10 px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Cart Icon with Badge */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className="relative !text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
            aria-label={`Cart with ${cartItemCount} items`}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-[var(--color-text-bold)] animate-in zoom-in duration-200">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* Account/User Icon with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="!text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
                aria-label="Account menu"
              >
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 z-[var(--z-popover)]">
              {session ? (
                <>
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {session.user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {session.user?.role === 'ADMIN' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="text-red-600"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Create Account</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu (Hamburger) */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="!text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
                aria-label="Open menu"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <div className="mb-4">
                  <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-text-primary)]">
                    {siteName}
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {siteTagline}
                  </p>
                </div>

                <Link 
                  href="/" 
                  className="rounded-md px-3 py-2 text-base font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                >
                  Home
                </Link>

                <div>
                  <p className="mb-2 px-3 text-sm font-semibold text-[var(--color-text-secondary)]">
                    Shop by Category
                  </p>
                  <div className="ml-2 flex flex-col gap-1">
                    <Link href="/products?category=hydrating" className="rounded-md px-3 py-2 text-sm transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                      Hydrating Masks
                    </Link>
                    <Link href="/products?category=brightening" className="rounded-md px-3 py-2 text-sm transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                      Brightening Masks
                    </Link>
                    <Link href="/products?category=anti-aging" className="rounded-md px-3 py-2 text-sm transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                      Anti-Aging
                    </Link>
                    <Link href="/products?category=purifying" className="rounded-md px-3 py-2 text-sm transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                      Purifying Masks
                    </Link>
                    <Link href="/products?category=soothing" className="rounded-md px-3 py-2 text-sm transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                      Soothing Masks
                    </Link>
                    <Link href="/products" className="rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
                      All Sheet Masks
                    </Link>
                  </div>
                </div>

                <Link 
                  href="/products?filter=best-sellers" 
                  className="rounded-md px-3 py-2 text-base font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                >
                  Best Sellers
                </Link>

                <Link 
                  href="/products?filter=new" 
                  className="rounded-md px-3 py-2 text-base font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                >
                  New Arrivals
                </Link>

                <Link 
                  href="/track-order" 
                  className="rounded-md px-3 py-2 text-base font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                >
                  Track Order
                </Link>

                <Link 
                  href="/about" 
                  className="rounded-md px-3 py-2 text-base font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>

    <header className={`fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-[var(--shadow-sm)] transform transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Left: Branding */}
        <Link href="/" className="flex items-center">
          <div className="h-10 flex items-center">
            <img src="/mehroob_logo.svg" alt={`${siteName} - ${siteTagline}`} className="h-full w-auto" style={{ maxWidth: '200px' }} />
          </div>
        </Link>

        {/* Center: Navigation (Desktop Only) */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link 
            href="/" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]">
              Shop ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48 z-[var(--z-popover)]">
              <DropdownMenuItem asChild>
                <Link href="/products?category=hydrating">Hydrating Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=brightening">Brightening Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=anti-aging">Anti-Aging</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=purifying">Purifying Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products?category=soothing">Soothing Masks</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/products">All Sheet Masks</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            href="/products?filter=best-sellers" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            Best Sellers
          </Link>
          <Link 
            href="/track-order" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            Track Order
          </Link>
          <Link 
            href="/products?filter=new" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            New Arrivals
          </Link>
          <Link 
            href="/about" 
            className="rounded-md px-4 py-2 text-base font-medium text-[var(--color-text-bold)] transition-all hover:bg-[var(--color-text-secondary)]"
          >
            About
          </Link>
        </nav>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <Button 
              ref={searchButtonRef}
              variant="ghost" 
              size="icon"
              onClick={handleSearchButtonClick}
              className="!text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </Button>
            
            {/* Search Input - Appears below button */}
            {isSearchOpen && isScrolled && (
              <div 
                ref={searchContainerRefSticky}
                className="absolute top-full right-0 mt-2 w-80 z-50"
              >
                <form onSubmit={handleSearch} className="relative flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Search sheet masks..."
                      className="w-full h-10 text-sm border-[var(--color-border)] bg-white focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 pr-8"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setShowSuggestions(false);
                          searchInputRef.current?.focus();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="h-10 px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className="relative !text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
            aria-label={`Cart with ${cartItemCount} items`}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-[var(--color-text-bold)]">
                {cartItemCount}
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="!text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
                aria-label="Account menu"
              >
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 z-[var(--z-popover)]">
              {session ? (
                <>
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{session.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {session.user?.role === 'ADMIN' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Create Account</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>

      {/* Search Suggestions Dropdown - Portal rendering */}
      {typeof window !== 'undefined' && ReactDOM.createPortal(
        renderSuggestions(),
        document.body
      )}
    </>
  );
}

