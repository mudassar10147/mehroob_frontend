# Cart Components

This directory contains all cart-related UI components for the MaskBar.pk shopping experience.

## Components

### CartDrawer
A slide-in drawer that displays the shopping cart from the right side of the screen.

**Usage:**
```tsx
import { CartDrawer } from '@/components/cart/CartDrawer';

<CartDrawer 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

**Features:**
- Slide-in animation from right
- Shows all cart items with images
- Quantity controls
- Remove item functionality
- Displays subtotal and total
- Quick checkout button
- Empty cart state with CTA

---

### CartItemCard
Reusable cart item component with two variants: compact and full.

**Usage:**
```tsx
import { CartItemCard } from '@/components/cart/CartItemCard';

<CartItemCard
  item={cartItem}
  onUpdateQuantity={handleUpdateQuantity}
  onRemove={handleRemove}
  variant="compact" // or "full"
/>
```

**Variants:**
- `compact`: Smaller layout for drawer/mobile views
- `full`: Detailed layout for cart page

**Features:**
- Product image, name, price
- Quantity controls (+/-)
- Remove button
- Responsive design
- Hover effects

---

## State Management

Cart state is managed using **Zustand** store located at:
- `/src/store/slices/cartSlice.ts`

### Available Actions:
- `addItem(item)` - Add product to cart
- `updateQuantity(itemId, quantity)` - Update item quantity
- `removeItem(itemId)` - Remove item from cart
- `clearCart()` - Empty the entire cart

### Cart Data:
- `items` - Array of cart items
- `subtotal` - Sum of all items
- `tax` - Calculated tax (10%)
- `shipping` - Shipping cost (free over PKR 5,000)
- `total` - Final total amount

---

## Pages

### Cart Page
Full cart page located at `/cart`
- Grid layout with items and order summary
- Quantity controls
- Remove items
- Clear cart option
- Free shipping progress bar
- Trust badges
- Empty cart state

---

## Styling

All components follow the MaskBar brand guidelines:
- Global CSS variables from `globals.css`
- Brand colors: `--color-primary` (Blush Rose), `--color-surface` (Off-white)
- Brand fonts: Playfair Display (headings), Inter (body)
- Smooth transitions and hover effects
- Responsive mobile-first design

---

## Integration

The cart system is integrated with:
1. **Header** - Cart icon with item count badge
2. **Product Cards** - Add to Cart button
3. **Products Page** - Direct add to cart
4. **Cart Drawer** - Quick view and checkout
5. **Cart Page** - Full cart management
6. **Checkout** (future) - Proceed to payment

---

## Future Enhancements

- [ ] Apply coupon codes
- [ ] Save cart for later
- [ ] Recently viewed items in cart
- [ ] Related products suggestions
- [ ] Cart abandonment recovery
- [ ] Guest cart merge with user account

