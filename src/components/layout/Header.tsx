'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

/**
 * Main Header Component
 * Displays branding, navigation, and utility icons
 * Responsive: Desktop (full nav) | Mobile (hamburger menu)
 * Shows a floating sticky navbar when scrolling past the main header
 */
export function Header() {
  const { data: session } = useSession();
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
        <div className="flex items-center gap-4">
          
          {/* Search Icon */}
          <Button 
            variant="ghost" 
            size="icon"
            className="!text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </Button>

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
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="!text-[var(--color-text-bold)] hover:!bg-[var(--color-text-secondary)]"
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </Button>
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
    </>
  );
}

