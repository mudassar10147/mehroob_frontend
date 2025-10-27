# 🏗️ Cart System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     MaskBar.pk Cart System                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Header     │    │   Product    │    │    Cart      │ │
│  │   Component  │    │   Card       │    │    Page      │ │
│  │              │    │              │    │              │ │
│  │  • Logo      │    │  • Image     │    │  • Items     │ │
│  │  • Nav       │    │  • Name      │    │  • Totals    │ │
│  │  • Cart Icon │    │  • Price     │    │  • Controls  │ │
│  │  • Badge     │◄───┤  • Add Button├───►│  • Checkout  │ │
│  └──────┬───────┘    └──────────────┘    └──────────────┘ │
│         │                                                   │
│         │ onClick                                          │
│         ▼                                                   │
│  ┌──────────────┐                                          │
│  │ Cart Drawer  │                                          │
│  │              │                                          │
│  │  • Slide-in  │                                          │
│  │  • Items     │                                          │
│  │  • Quick     │                                          │
│  │    Checkout  │                                          │
│  └──────────────┘                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Uses
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    State Management Layer                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Zustand Cart Store (cartSlice.ts)          │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                       │  │
│  │  State:                                              │  │
│  │    • items: CartItem[]                               │  │
│  │    • subtotal: number                                │  │
│  │    • tax: number                                     │  │
│  │    • shipping: number                                │  │
│  │    • discount: number                                │  │
│  │    • total: number                                   │  │
│  │                                                       │  │
│  │  Actions:                                            │  │
│  │    • addItem(item)                                   │  │
│  │    • updateQuantity(id, qty)                         │  │
│  │    • removeItem(id)                                  │  │
│  │    • clearCart()                                     │  │
│  │    • calculateTotals()                               │  │
│  │                                                       │  │
│  └───────────────────────┬──────────────────────────────┘  │
│                          │                                  │
│                          │ Persists to                      │
│                          ▼                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Browser localStorage (cart-storage)          │  │
│  │    • Survives page refresh                           │  │
│  │    • Automatic sync                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Uses
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer (Types)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CartItem {                                                 │
│    id: string                                               │
│    productId: string                                        │
│    productName: string                                      │
│    productImage: string                                     │
│    price: number                                            │
│    quantity: number                                         │
│    variantId?: string                                       │
│    variantName?: string                                     │
│  }                                                          │
│                                                              │
│  Cart {                                                     │
│    items: CartItem[]                                        │
│    subtotal: number                                         │
│    tax: number                                              │
│    shipping: number                                         │
│    discount: number                                         │
│    total: number                                            │
│  }                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
│
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── SearchButton
│   ├── CartButton ──────► Opens CartDrawer
│   │   └── Badge (item count)
│   └── UserMenu
│
├── ProductsPage (/products)
│   ├── ShopHeader
│   ├── ProductFilters
│   └── ProductGrid
│       └── ProductCard (multiple)
│           └── AddToCartButton ──► Adds to store
│
├── CartDrawer (overlay)
│   ├── Header (close button)
│   ├── CartItemCard (compact, multiple)
│   └── Footer
│       ├── Subtotal
│       ├── Total
│       └── CheckoutButton
│
└── CartPage (/cart)
    ├── PageHeader
    ├── CartItems (2-column layout)
    │   └── CartItemCard (full, multiple)
    └── OrderSummary (sticky sidebar)
        ├── Subtotal
        ├── Shipping
        ├── Tax
        ├── Total
        ├── FreeShippingBar
        ├── CheckoutButton
        └── TrustBadges
```

---

## Data Flow

### Adding Item to Cart

```
User Action:
  Click "Add to Cart" on Product
         │
         ▼
AddToCartButton component
  • Calls useCartStore().addItem()
  • Shows success feedback (green checkmark)
  • Disables button for 2 seconds
         │
         ▼
Zustand Store (cartSlice)
  • Check if item exists
  • If exists: increment quantity
  • If new: add to items array
  • Recalculate totals
  • Update state
         │
         ▼
Zustand Middleware (persist)
  • Automatically save to localStorage
  • Key: 'cart-storage'
         │
         ▼
React Re-renders
  • Header badge updates
  • Cart drawer reflects new items
  • Cart page shows updated list
```

### Updating Quantity

```
User Action:
  Click + or - button
         │
         ▼
CartItemCard component
  • Calls onUpdateQuantity callback
         │
         ▼
Parent (Drawer or Page)
  • Calls useCartStore().updateQuantity(id, qty)
         │
         ▼
Zustand Store
  • Find item by ID
  • Update quantity
  • If quantity = 0, remove item
  • Recalculate totals
  • Update state
         │
         ▼
Persist & Re-render
  • Save to localStorage
  • UI updates instantly
```

### Cart Calculations

```
Items in Cart
      │
      ▼
Calculate Subtotal
  subtotal = Σ(item.price × item.quantity)
      │
      ▼
Calculate Tax (10%)
  tax = subtotal × 0.10
      │
      ▼
Calculate Shipping
  if (subtotal >= 5000)
    shipping = 0  // FREE
  else
    shipping = 5  // PKR 5
      │
      ▼
Calculate Total
  total = subtotal + tax + shipping - discount
      │
      ▼
Update Store State
  All components reflect new totals
```

---

## File Structure

```
sheetmask_frontend/
│
├── src/
│   ├── app/
│   │   └── (shop)/
│   │       └── cart/
│   │           └── page.tsx ..................... Full cart page
│   │
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx ................... Slide-in cart
│   │   │   ├── CartItemCard.tsx ................. Reusable item card
│   │   │   └── README.md ........................ Component docs
│   │   │
│   │   ├── layout/
│   │   │   └── Header.tsx ....................... Cart icon + drawer
│   │   │
│   │   └── product/
│   │       └── AddToCartButton.tsx .............. Add to cart action
│   │
│   ├── store/
│   │   └── slices/
│   │       └── cartSlice.ts ..................... Zustand cart store
│   │
│   └── types/
│       └── order.ts ............................. Cart & item types
│
├── docs/
│   └── CART_ARCHITECTURE.md ..................... This file
│
└── CART_SYSTEM_SUMMARY.md ....................... Feature summary
```

---

## State Management Details

### Zustand Store Benefits

1. **Simple API**: No boilerplate, just hooks
2. **Performance**: Only re-renders subscribed components
3. **Persistence**: Built-in localStorage middleware
4. **TypeScript**: Full type safety
5. **DevTools**: Redux DevTools compatible

### Store Pattern

```typescript
// Store Definition
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      // State
      items: [],
      total: 0,
      
      // Actions
      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);

// Component Usage
function MyComponent() {
  const { items, addItem } = useCartStore();
  
  return (
    <button onClick={() => addItem(newItem)}>
      Add to Cart ({items.length})
    </button>
  );
}
```

---

## API Endpoints (Future)

```
Cart API Routes (to be implemented):

POST   /api/cart/add           Add item to cart
PUT    /api/cart/update        Update item quantity
DELETE /api/cart/remove/:id    Remove item
GET    /api/cart               Get cart contents
POST   /api/cart/clear         Clear entire cart
POST   /api/cart/merge         Merge guest + user cart
GET    /api/cart/validate      Validate cart items (stock check)
```

---

## Testing Strategy

### Unit Tests
```typescript
describe('Cart Store', () => {
  test('adds item to cart')
  test('updates quantity')
  test('removes item')
  test('calculates subtotal correctly')
  test('calculates tax correctly')
  test('calculates shipping correctly')
  test('handles duplicate items')
})

describe('CartItemCard', () => {
  test('renders item details')
  test('handles quantity increase')
  test('handles quantity decrease')
  test('removes item on click')
})
```

### Integration Tests
- Add to cart flow
- Checkout flow
- Cart persistence
- Cross-device sync

### E2E Tests
- Complete purchase journey
- Cart abandonment recovery
- Mobile cart experience

---

## Performance Optimizations

1. **Image Optimization**
   - Next.js Image component
   - Lazy loading
   - Responsive sizes

2. **State Updates**
   - Memoized calculations
   - Selective re-renders
   - Optimistic UI updates

3. **Bundle Size**
   - Tree-shaking
   - Code splitting
   - Dynamic imports

4. **Network**
   - API request batching
   - Debounced saves
   - Offline support

---

## Security Considerations

1. **Client-Side**
   - Input validation
   - XSS prevention
   - CSRF tokens

2. **Server-Side** (future)
   - Rate limiting
   - Price validation
   - Stock checking
   - Session security

3. **Data Protection**
   - No sensitive data in localStorage
   - Secure checkout flow
   - PCI compliance

---

## Accessibility Features

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast compliance
- ✅ Error messaging

---

## Mobile Responsiveness

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Features
- Touch-friendly buttons (min 44px)
- Swipe-to-remove (future)
- Bottom sheet drawer
- Sticky checkout button
- Optimized images

---

## Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers

---

## Monitoring & Analytics

### Future Implementation
- Cart abandonment tracking
- Conversion funnel analysis
- Item popularity metrics
- Error tracking
- Performance monitoring

---

**Architecture designed for MaskBar.pk**  
*Scalable • Maintainable • Performant*

