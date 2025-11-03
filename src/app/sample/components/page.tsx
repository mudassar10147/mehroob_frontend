import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import BestSellingProducts from '@/components/sections/BestSellingProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryCard } from '@/components/category/CategoryCard';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { ProductCategoryBadge } from '@/components/product/ProductCategoryBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { sheetMaskCategories } from '@/data/mockCategories';
import { bestSellingProducts } from '@/data/mockProducts';

export const metadata: Metadata = {
  title: 'Component Showcase | SheetMask',
  description: 'Component library and usage guide',
};

export default function ComponentShowcasePage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-[var(--z-sticky)]">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            Component Showcase
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            A living style guide for SheetMask UI components
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Navigation */}
        <nav className="mb-12 p-6 bg-white rounded-[var(--border-radius)] shadow-[var(--shadow-sm)]">
          <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-[var(--transition-fast)]"
              >
                {category.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Component Sections */}
        <div className="space-y-16">
          {/* Hero Section */}
          <ComponentSection
            id="hero"
            title="Hero Section"
            description="Main hero section with split layout, headlines, search, and product showcase"
          >
            <div className="space-y-8">
              <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] overflow-hidden">
                <HeroSection />
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Split layout (50/50) with angular border</li>
                  <li>✅ Premium typography with serif headlines</li>
                  <li>✅ Product search functionality</li>
                  <li>✅ Organic pattern background overlay</li>
                  <li>✅ Responsive mobile layout</li>
                  <li>✅ MaskBar.pk brand messaging</li>
                  <li>✅ Uses global CSS variables</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-3">Usage:</h4>
                <pre className="bg-gray-100 p-4 rounded">
{`import HeroSection from '@/components/sections/HeroSection';

// In your page
<HeroSection />`}
                </pre>

                <h4 className="text-lg font-semibold mt-6 mb-3">Design Elements:</h4>
                <ul className="space-y-2">
                  <li>• Left Panel: Headlines, description, search bar</li>
                  <li>• Right Panel: Product showcase with lifestyle imagery</li>
                  <li>• Mobile: Stacked layout with overlay</li>
                  <li>• Typography: Playfair Display (headings) + Inter (body)</li>
                </ul>
              </div>
            </div>
          </ComponentSection>

          {/* Header Section */}
          <ComponentSection
            id="header"
            title="Header Component"
            description="Main navigation header with branding, menu, search, cart, and account"
          >
            <div className="space-y-8">
              <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] overflow-hidden">
                <Header />
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Responsive design (Desktop + Mobile)</li>
                  <li>✅ Brand name from environment variables</li>
                  <li>✅ Shop dropdown with categories</li>
                  <li>✅ Cart with item count badge</li>
                  <li>✅ Account dropdown (different for logged in/out)</li>
                  <li>✅ Mobile hamburger menu</li>
                  <li>✅ Search functionality ready</li>
                  <li>✅ Uses global CSS variables</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-3">Usage:</h4>
                <pre className="bg-gray-100 p-4 rounded">
{`import { Header } from '@/components/layout/Header';

// In your layout
<Header />`}
                </pre>

                <h4 className="text-lg font-semibold mt-6 mb-3">Environment Variables:</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm">
{`NEXT_PUBLIC_SITE_NAME="MaskBar"
NEXT_PUBLIC_SITE_TAGLINE="by Mehroob"
NEXT_PUBLIC_SITE_FULL_NAME="MaskBar by Mehroob"`}
                </pre>
              </div>
            </div>
          </ComponentSection>

          {/* Categories Section */}
          <ComponentSection
            id="categories"
            title="Categories Section"
            description="Product category navigation with grid layout and visual cards"
          >
            <div className="space-y-8">
              <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] overflow-hidden">
                <CategoriesSection />
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Responsive grid layout (6 columns desktop, 2 mobile)</li>
                  <li>✅ Category cards with icons and product counts</li>
                  <li>✅ Uses Shadcn Card and Badge components</li>
                  <li>✅ Hover effects and smooth transitions</li>
                  <li>✅ Color-coded category icons</li>
                  <li>✅ Product count badges</li>
                  <li>✅ Uses global CSS variables</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-3">Usage:</h4>
                <pre className="bg-gray-100 p-4 rounded">
{`import CategoriesSection from '@/components/sections/CategoriesSection';

// In your page
<CategoriesSection />`}
                </pre>

                <h4 className="text-lg font-semibold mt-6 mb-3">Component Structure:</h4>
                <ul className="space-y-2">
                  <li>• CategoriesSection: Main section container</li>
                  <li>• CategoryCard: Individual category display</li>
                  <li>• Mock data: 6 sheet mask categories</li>
                  <li>• Responsive: Grid adapts to screen size</li>
                </ul>
              </div>
            </div>
          </ComponentSection>

          {/* Best Selling Products Section */}
          <ComponentSection
            id="bestselling"
            title="Best Selling Products"
            description="Product catalog with grid layout, ratings, and add to cart functionality"
          >
            <div className="space-y-8">
              <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] overflow-hidden">
                <BestSellingProducts />
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Responsive grid layout (4 columns desktop, 2 mobile)</li>
                  <li>✅ Product cards with image, name, price, rating</li>
                  <li>✅ Category badges and star ratings</li>
                  <li>✅ Add to cart functionality</li>
                  <li>✅ Hover effects and smooth transitions</li>
                  <li>✅ Mock data for 4 sheet mask products</li>
                  <li>✅ Uses global CSS variables</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-3">Usage:</h4>
                <pre className="bg-gray-100 p-4 rounded">
{`import BestSellingProducts from '@/components/sections/BestSellingProducts';

// In your page
<BestSellingProducts />`}
                </pre>

                <h4 className="text-lg font-semibold mt-6 mb-3">Component Structure:</h4>
                <ul className="space-y-2">
                  <li>• BestSellingProducts: Main section container</li>
                  <li>• ProductCard: Individual product display</li>
                  <li>• Mock data: 4 sheet mask products</li>
                  <li>• Responsive: Grid adapts to screen size</li>
                </ul>
              </div>
            </div>
          </ComponentSection>

          {/* Footer Section */}
          <ComponentSection
            id="footer"
            title="Footer Component"
            description="Complete footer with brand info, navigation links, newsletter signup, and legal links"
          >
            <div className="space-y-8">
              <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] overflow-hidden">
                <Footer />
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Component-based structure (Footer, FooterBrand, FooterLinks, FooterNewsletter)</li>
                  <li>✅ Uses Shadcn Separator component</li>
                  <li>✅ Newsletter signup with email validation</li>
                  <li>✅ Organized link groups (Shop, Support, Company)</li>
                  <li>✅ Brand information and contact details</li>
                  <li>✅ Legal links and copyright</li>
                  <li>✅ Responsive grid layout</li>
                  <li>✅ Uses global CSS variables</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-3">Usage:</h4>
                <pre className="bg-gray-100 p-4 rounded">
{`import { Footer } from '@/components/layout/Footer';

// In your layout
<Footer />`}
                </pre>

                <h4 className="text-lg font-semibold mt-6 mb-3">Component Structure:</h4>
                <ul className="space-y-2">
                  <li>• Footer: Main footer container</li>
                  <li>• FooterBrand: Brand logo, description, contact</li>
                  <li>• FooterLinks: Navigation links grouped by category</li>
                  <li>• FooterNewsletter: Email subscription form</li>
                </ul>
              </div>
            </div>
          </ComponentSection>

          {/* ProductCard Component */}
          <ComponentSection
            id="productcard"
            title="ProductCard Component"
            description="Individual product card with image, details, rating, and add to cart button"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bestSellingProducts.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product as any} />
                ))}
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Product image with hover scale effect</li>
                  <li>✅ Category badge with color coding</li>
                  <li>✅ Star rating display</li>
                  <li>✅ Add to cart button with animations</li>
                  <li>✅ Responsive design</li>
                  <li>✅ Hover effects and transitions</li>
                </ul>
              </div>
            </div>
          </ComponentSection>

          {/* CategoryCard Component */}
          <ComponentSection
            id="categorycard"
            title="CategoryCard Component"
            description="Individual category card with icon and hover effects"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sheetMaskCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Lucide React icons with color coding</li>
                  <li>✅ Hover scale and color effects</li>
                  <li>✅ Consistent card sizing</li>
                  <li>✅ Subtle shadows for depth</li>
                  <li>✅ Responsive grid layout</li>
                </ul>
              </div>
            </div>
          </ComponentSection>

          {/* Buttons Section */}
          <ComponentSection
            id="buttons"
            title="Button Components"
            description="Shadcn Button component with various variants and sizes"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="default">Default Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Sizes:</h4>
                <div className="flex gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Add to Cart Button:</h4>
                <div className="flex gap-4">
                  <AddToCartButton product={bestSellingProducts[0]} />
                </div>
              </div>
            </div>
          </ComponentSection>

          {/* Links Section */}
          <ComponentSection
            id="links"
            title="Link Components"
            description="Navigation links and text links"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Navigation Links:</h4>
                <div className="flex gap-6">
                  <a href="#" className="text-[var(--color-primary)] hover:underline">Home</a>
                  <a href="#" className="text-[var(--color-primary)] hover:underline">Products</a>
                  <a href="#" className="text-[var(--color-primary)] hover:underline">About</a>
                  <a href="#" className="text-[var(--color-primary)] hover:underline">Contact</a>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Footer Links:</h4>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <h5 className="font-semibold mb-2">Shop</h5>
                    <ul className="space-y-1">
                      <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">All Products</a></li>
                      <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">Categories</a></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Support</h5>
                    <ul className="space-y-1">
                      <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">Contact</a></li>
                      <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">FAQ</a></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Company</h5>
                    <ul className="space-y-1">
                      <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">About</a></li>
                      <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">Careers</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ComponentSection>

          {/* Cards Section */}
          <ComponentSection
            id="cards"
            title="Card Components"
            description="Shadcn Card components and custom card variants"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      This is a basic card component with header and content.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-32 bg-[var(--color-surface)] rounded-md"></div>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Product description and details.
                      </p>
                      <Button size="sm" className="w-full">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-3">
                      <div className="text-3xl">💧</div>
                      <p className="text-sm font-semibold">Hydrating Masks</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ComponentSection>

          {/* Inputs Section */}
          <ComponentSection
            id="inputs"
            title="Form Inputs"
            description="Shadcn Input component and form elements"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Basic Inputs:</h4>
                  <Input placeholder="Enter your email" type="email" />
                  <Input placeholder="Search products..." />
                  <Input placeholder="Enter quantity" type="number" />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Input with Labels:</h4>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input placeholder="your@email.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input placeholder="Enter password" type="password" />
                  </div>
                </div>
              </div>
            </div>
          </ComponentSection>

          {/* Badges Section */}
          <ComponentSection
            id="badges"
            title="Badge Components"
            description="Shadcn Badge component and product category badges"
          >
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Shadcn Badge Variants:</h4>
                  <div className="flex gap-4 flex-wrap">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Product Category Badges:</h4>
                  <div className="flex gap-4 flex-wrap">
                    <ProductCategoryBadge category="Hydrating" />
                    <ProductCategoryBadge category="Brightening" />
                    <ProductCategoryBadge category="Anti-Aging" />
                    <ProductCategoryBadge category="Acne Control" />
                  </div>
                </div>
              </div>
            </div>
          </ComponentSection>

          {/* Modals Section */}
          <ComponentSection
            id="modals"
            title="Modals & Dialogs"
            description="Modal windows and dialog components"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Modal components will be displayed here
            </div>
          </ComponentSection>

          {/* Alerts Section */}
          <ComponentSection
            id="alerts"
            title="Alerts & Notifications"
            description="Alert messages and notification components"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Alert components will be displayed here
            </div>
          </ComponentSection>

          {/* Loading Section */}
          <ComponentSection
            id="loading"
            title="Loading States"
            description="Spinners, skeletons, and loading indicators"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Loading components will be displayed here
            </div>
          </ComponentSection>

          {/* Typography Section */}
          <ComponentSection
            id="typography"
            title="Typography"
            description="Headings, paragraphs, and text styles"
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-[var(--fs-2xl)] mb-2">Heading 1 - Playfair Display</h1>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  Font size: 3rem (48px)
                </p>
              </div>
              <div>
                <h2 className="text-[var(--fs-xl)] mb-2">Heading 2 - Playfair Display</h2>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  Font size: 2rem (32px)
                </p>
              </div>
              <div>
                <h3 className="text-[var(--fs-lg)] mb-2">Heading 3 - Playfair Display</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  Font size: 1.5rem (24px)
                </p>
              </div>
              <div>
                <p className="text-[var(--fs-base)] mb-2">
                  Body text - Inter. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  Font size: 1rem (16px)
                </p>
              </div>
            </div>
          </ComponentSection>

          {/* Coming Soon Section */}
          <ComponentSection
            id="comingsoon"
            title="Coming Soon"
            description="Beautiful coming soon page component for features under development"
          >
            <div className="space-y-8">
              <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] overflow-hidden bg-white">
                <ComingSoon />
              </div>
              
              <div className="prose prose-sm max-w-none">
                <h4 className="text-lg font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li>✅ Minimalist, elegant design aligned with brand</li>
                  <li>✅ Customizable title and description</li>
                  <li>✅ Animated icon with pulse effect</li>
                  <li>✅ Smooth fade-in animations</li>
                  <li>✅ Optional back button with custom text and href</li>
                  <li>✅ Uses global CSS variables</li>
                  <li>✅ Fully responsive design</li>
                  <li>✅ Default messaging about Mehroob MVP</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Usage:</h4>
                <pre className="bg-[var(--color-surface)] p-4 rounded-lg text-sm overflow-x-auto">
{`import { ComingSoon } from '@/components/ui/ComingSoon';

// Default usage
<ComingSoon />

// Custom usage
<ComingSoon
  title="Feature Coming Soon"
  description="Custom description here"
  showBackButton={true}
  backButtonHref="/"
  backButtonText="Go Home"
/>`}
                </pre>
              </div>
            </div>
          </ComponentSection>

          {/* Colors Section */}
          <ComponentSection
            id="colors"
            title="Colors"
            description="Brand color palette"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch
                name="Primary"
                value="#C9A9A6"
                varName="--color-primary"
                description="Blush rose - accent color"
              />
              <ColorSwatch
                name="Secondary"
                value="#E0C8B1"
                varName="--color-secondary"
                description="Soft beige - secondary tone"
              />
              <ColorSwatch
                name="Background"
                value="#FFFFFF"
                varName="--color-background"
                description="Base background"
              />
              <ColorSwatch
                name="Surface"
                value="#F6F1EE"
                varName="--color-surface"
                description="Section backgrounds"
              />
              <ColorSwatch
                name="Text Primary"
                value="#2B2B2B"
                varName="--color-text-primary"
                description="Dark text"
              />
              <ColorSwatch
                name="Text Secondary"
                value="#7A7A7A"
                varName="--color-text-secondary"
                description="Muted text"
              />
              <ColorSwatch
                name="Border"
                value="#EDEDED"
                varName="--color-border"
                description="Soft divider lines"
              />
            </div>
          </ComponentSection>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-[var(--color-border)] bg-white">
        <div className="container text-center text-[var(--color-text-secondary)] text-sm">
          <p>SheetMask Component Library • Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

// Component Section Wrapper
function ComponentSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
          {title}
        </h2>
        <p className="text-[var(--color-text-secondary)]">{description}</p>
      </div>
      <div className="p-8 bg-white rounded-[var(--border-radius)] shadow-[var(--shadow-md)] min-h-[200px]">
        {children}
      </div>
    </section>
  );
}

// Color Swatch Component
function ColorSwatch({
  name,
  value,
  varName,
  description,
}: {
  name: string;
  value: string;
  varName: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div
        className="w-full h-24 rounded-lg mb-3 border border-[var(--color-border)]"
        style={{ backgroundColor: value }}
      />
      <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
        {name}
      </h4>
      <p className="text-xs text-[var(--color-text-secondary)] mb-1">
        {value}
      </p>
      <code className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded">
        var({varName})
      </code>
      <p className="text-xs text-[var(--color-text-secondary)] mt-2">
        {description}
      </p>
    </div>
  );
}

// Categories data
const categories = [
  { id: 'hero', name: 'Hero Section' },
  { id: 'header', name: 'Header' },
  { id: 'categories', name: 'Categories' },
  { id: 'bestselling', name: 'Best Selling' },
  { id: 'footer', name: 'Footer' },
  { id: 'productcard', name: 'Product Card' },
  { id: 'categorycard', name: 'Category Card' },
  { id: 'buttons', name: 'Buttons' },
  { id: 'links', name: 'Links' },
  { id: 'cards', name: 'Cards' },
  { id: 'inputs', name: 'Inputs' },
  { id: 'badges', name: 'Badges' },
  { id: 'modals', name: 'Modals' },
  { id: 'alerts', name: 'Alerts' },
  { id: 'loading', name: 'Loading' },
  { id: 'typography', name: 'Typography' },
  { id: 'comingsoon', name: 'Coming Soon' },
  { id: 'colors', name: 'Colors' },
];

