import { useState, useEffect, useCallback } from 'react';
import { CartItem, Cart } from '@/types/order';
import { STORAGE_KEYS } from '@/lib/constants';

/**
 * Custom hook for managing shopping cart
 */
export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  // Calculate totals
  const calculateTotals = useCallback((items: CartItem[]) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax (adjust as needed)
    const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
    const discount = 0; // Will be calculated when coupon is applied
    const total = subtotal + tax + shipping - discount;

    return {
      items,
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  }, []);

  // Add item to cart
  const addItem = useCallback(
    (item: Omit<CartItem, 'id'>) => {
      setCart((prevCart) => {
        const existingItem = prevCart.items.find(
          (i) =>
            i.productId === item.productId && i.variantId === item.variantId
        );

        let newItems: CartItem[];
        if (existingItem) {
          // Update quantity if item exists
          newItems = prevCart.items.map((i) =>
            i.id === existingItem.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${item.variantId || 'default'}-${Date.now()}`,
          };
          newItems = [...prevCart.items, newItem];
        }

        return calculateTotals(newItems);
      });
    },
    [calculateTotals]
  );

  // Update item quantity
  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(itemId);
        return;
      }

      setCart((prevCart) => {
        const newItems = prevCart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        return calculateTotals(newItems);
      });
    },
    [calculateTotals]
  );

  // Remove item from cart
  const removeItem = useCallback(
    (itemId: string) => {
      setCart((prevCart) => {
        const newItems = prevCart.items.filter((item) => item.id !== itemId);
        return calculateTotals(newItems);
      });
    },
    [calculateTotals]
  );

  // Clear cart
  const clearCart = useCallback(() => {
    setCart({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
    });
  }, []);

  // Get item count
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    itemCount,
    isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}

