/**
 * Cart Store Slice (Zustand)
 * Manages shopping cart state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart } from '@/types/order';

interface CartState extends Cart {
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  calculateTotals: (items: CartItem[]) => void;
}

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
  const discount = 0;
  const total = subtotal + tax + shipping - discount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.productId === item.productId && i.variantId === item.variantId
          );

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            const newItem: CartItem = {
              ...item,
              id: `${item.productId}-${item.variantId || 'default'}-${Date.now()}`,
            };
            newItems = [...state.items, newItem];
          }

          return { items: newItems, ...calculateCartTotals(newItems) };
        }),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.id !== itemId);
            return { items: newItems, ...calculateCartTotals(newItems) };
          }

          const newItems = state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          return { items: newItems, ...calculateCartTotals(newItems) };
        }),

      removeItem: (itemId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== itemId);
          return { items: newItems, ...calculateCartTotals(newItems) };
        }),

      clearCart: () =>
        set({
          items: [],
          subtotal: 0,
          tax: 0,
          shipping: 0,
          discount: 0,
          total: 0,
        }),

      calculateTotals: (items) =>
        set({ items, ...calculateCartTotals(items) }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

