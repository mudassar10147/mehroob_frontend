"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/slices/cartSlice";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { api } from "@/lib/api";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderConfirmation, setOrderConfirmation] = useState<any>(null);

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  const handlePlaceOrder = async (formData: any) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Transform cart items to backend format
      const orderItems = items.map(item => ({
        product: item.productId,
        quantity: item.quantity
      }));

      // Create order payload matching backend API
      const orderPayload = {
        orderItems,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.province,
          postalCode: formData.postalCode,
          country: "Pakistan"
        },
        paymentMethod: "COD",
        customerNotes: formData.orderNotes || undefined
      };

      // Call backend API
      const response: any = await api.orders.create(orderPayload);

      if (response.success && response.data?.order) {
        // Show confirmation modal first
        setOrderConfirmation(response.data.order);
        
        // Clear cart
        clearCart();

        // Redirect to success page after 2 seconds with email for verification
        setTimeout(() => {
          const email = formData.email || '';
          const phone = formData.phone || '';
          router.push(`/checkout/success?order=${response.data.order.orderNumber}&id=${response.data.order._id}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to place order');
      }
    } catch (error: any) {
      console.error("❌ Order placement error:", error);
      
      // Handle specific error cases
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        
        // Show stock issues if available
        if (error.response.data.data && Array.isArray(error.response.data.data)) {
          const stockIssues = error.response.data.data.join('\n');
          setError(`Stock availability issues:\n${stockIssues}`);
        }
      } else {
        setError(error.message || 'Failed to place order. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="checkout-page min-h-screen bg-white">
      {/* Order Confirmation Modal */}
      {orderConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[var(--z-modal)] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="text-center">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 animate-in zoom-in duration-500">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              {/* Success Message */}
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
                Order Placed Successfully! 🎉
              </h2>
              
              <p className="text-[var(--color-text-secondary)] mb-6">
                Your order has been confirmed and will be processed shortly.
              </p>

              {/* Order Number */}
              <div className="bg-[var(--color-surface)] rounded-lg p-4 mb-6">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                  Order Number
                </p>
                <p className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-primary)]">
                  {orderConfirmation.orderNumber}
                </p>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Redirecting to order details...
              </p>

              {/* Loading Spinner */}
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-[var(--color-surface)] py-8 md:py-12">
        <div className="container">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)]">
            Checkout
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Complete your order
          </p>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 mb-1">Order Error</h3>
                  <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm 
                onSubmit={handlePlaceOrder} 
                isProcessing={isProcessing}
              />
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

