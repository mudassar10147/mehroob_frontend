# Hooks Directory

This directory contains custom React hooks for the SheetMask application.

## Available Hooks

### `useAuth.ts`
Authentication hook for managing user authentication state:
- `user` - Current user object
- `isLoading` - Loading state
- `isAuthenticated` - Authentication status
- `login()` - Login function
- `register()` - Registration function
- `logout()` - Logout function
- `updateProfile()` - Update user profile

### `useCart.ts`
Shopping cart hook for managing cart state:
- `cart` - Cart object with items and totals
- `itemCount` - Total number of items
- `isLoading` - Loading state
- `addItem()` - Add item to cart
- `updateQuantity()` - Update item quantity
- `removeItem()` - Remove item from cart
- `clearCart()` - Clear entire cart

### `useProducts.ts`
Products hook for fetching and managing products:
- `products` - Array of products
- `isLoading` - Loading state
- `error` - Error message
- `filters` - Current filters
- `pagination` - Pagination info
- `updateFilters()` - Update filters
- `resetFilters()` - Reset filters
- `goToPage()` - Navigate to page
- `refetch()` - Refetch products

Also includes `useProduct(id)` for fetching a single product.

## Usage Examples

### Using useAuth
```tsx
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { login, isLoading } = useAuth();
  
  const handleSubmit = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      // Redirect to dashboard
    }
  };
  
  return <form>...</form>;
}
```

### Using useCart
```tsx
import { useCart } from '@/hooks/useCart';

function ProductCard({ product }) {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      price: product.price,
      quantity: 1,
    });
  };
  
  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

### Using useProducts
```tsx
import { useProducts } from '@/hooks/useProducts';

function ProductsPage() {
  const { products, isLoading, filters, updateFilters } = useProducts();
  
  return (
    <div>
      <FilterBar 
        filters={filters} 
        onFilterChange={updateFilters} 
      />
      {isLoading ? <Loading /> : <ProductGrid products={products} />}
    </div>
  );
}
```

## Creating Custom Hooks

When creating new hooks:
1. Use the `use` prefix
2. Return an object with values and functions
3. Include loading and error states when applicable
4. Use TypeScript for type safety
5. Document the hook's purpose and usage

