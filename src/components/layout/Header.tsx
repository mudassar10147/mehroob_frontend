'use client';

import Link from 'next/link';
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

/**
 * Main Header Component
 * Displays branding, navigation, and utility icons
 * Responsive: Desktop (full nav) | Mobile (hamburger menu)
 */
export function Header() {
  const { data: session } = useSession();
  const { items } = useCartStore();
  
  // Get site name from environment variables
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'MaskBar';
  const siteTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'by Mehroob';
  
  // Calculate total cart items
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] w-full border-b border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-sm)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left: Branding */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex flex-col">
            <span className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)]">
              {siteName}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {siteTagline}
            </span>
          </div>
        </Link>

        {/* Center: Navigation (Desktop Only) */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link 
            href="/" 
            className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
          >
            Home
          </Link>
          
          {/* Shop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]">
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
            className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
          >
            Best Sellers
          </Link>
          
          <Link 
            href="/products?filter=new" 
            className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
          >
            New Arrivals
          </Link>
          
          <Link 
            href="/about" 
            className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
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
            className="text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart Icon with Badge */}
          <Link href="/cart">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
              aria-label={`Cart with ${cartItemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Account/User Icon with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                aria-label="Account menu"
              >
                <User className="h-5 w-5" />
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
                className="text-[var(--color-text-primary)]"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
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
    </header>
  );
}

