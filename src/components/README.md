# Components Directory

This directory contains all reusable React components for the SheetMask application.

## Structure

### `/ui`
Base UI components (buttons, inputs, cards, modals, etc.)
- Reusable across the entire application
- Should be generic and configurable
- Examples: Button, Input, Card, Modal, Badge, Alert

### `/layout`
Layout components (header, footer, sidebar, etc.)
- Components that define the page structure
- Examples: Header, Footer, Sidebar, Navigation

### `/product`
Product-specific components
- Components related to product display and interaction
- Examples: ProductCard, ProductGrid, ProductDetails, ProductFilters

### `/cart`
Cart-specific components
- Components for shopping cart functionality
- Examples: CartItem, CartSummary, CartDrawer

## Guidelines

1. **Keep components small and focused** - Each component should do one thing well
2. **Use TypeScript** - All components should have proper type definitions
3. **Export types** - Export component prop types for reuse
4. **Document props** - Add JSDoc comments for complex props
5. **Use Tailwind CSS** - Style components using Tailwind utility classes
6. **Make components composable** - Design for composition over configuration
7. **Handle loading and error states** - Components should gracefully handle these states

## Example Component

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md font-semibold',
        variant === 'primary' && 'bg-blue-600 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-900',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg'
      )}
    >
      {children}
    </button>
  );
}
```

