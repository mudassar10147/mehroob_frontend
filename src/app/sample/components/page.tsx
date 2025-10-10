import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';

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

          {/* Buttons Section */}
          <ComponentSection
            id="buttons"
            title="Buttons"
            description="Various button styles and states for user interactions"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Button components will be displayed here
            </div>
          </ComponentSection>

          {/* Links Section */}
          <ComponentSection
            id="links"
            title="Links"
            description="Text links and navigation elements"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Link components will be displayed here
            </div>
          </ComponentSection>

          {/* Cards Section */}
          <ComponentSection
            id="cards"
            title="Cards"
            description="Card components for displaying content and products"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Card components will be displayed here
            </div>
          </ComponentSection>

          {/* Inputs Section */}
          <ComponentSection
            id="inputs"
            title="Form Inputs"
            description="Input fields, textareas, and form controls"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Input components will be displayed here
            </div>
          </ComponentSection>

          {/* Badges Section */}
          <ComponentSection
            id="badges"
            title="Badges & Tags"
            description="Labels, badges, and tag elements"
          >
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Badge components will be displayed here
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
  { id: 'header', name: 'Header' },
  { id: 'buttons', name: 'Buttons' },
  { id: 'links', name: 'Links' },
  { id: 'cards', name: 'Cards' },
  { id: 'inputs', name: 'Inputs' },
  { id: 'badges', name: 'Badges' },
  { id: 'modals', name: 'Modals' },
  { id: 'alerts', name: 'Alerts' },
  { id: 'loading', name: 'Loading' },
  { id: 'typography', name: 'Typography' },
  { id: 'colors', name: 'Colors' },
];

