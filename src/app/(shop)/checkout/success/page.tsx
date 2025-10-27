"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const orderId = searchParams.get("id");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId && (email || phone)) {
        try {
          setIsLoading(true);
          // Use track endpoint since we have email/phone
          const response: any = await api.orders.track({
            orderNumber: orderNumber || '',
            email: email || undefined,
            phone: phone || undefined,
          });
          
          if (response.success && response.data?.order) {
            setOrderDetails(response.data.order);
          }
        } catch (err: any) {
          console.error('Error fetching order:', err);
          setError('Failed to load order details');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setError('Missing order verification details');
      }
    };

    fetchOrderDetails();
  }, [orderId, orderNumber, email, phone]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderNumber || error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
            {error || "No Order Found"}
          </h1>
          <Link href="/products">
            <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-success-page min-h-screen bg-white">
      {/* Success Header */}
      <section className="bg-gradient-to-b from-green-50 to-[var(--color-surface)] py-16 md:py-24 border-b-4 border-green-500">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon with Animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 mb-6 animate-in zoom-in duration-500 shadow-lg">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>

            {/* Success Message */}
            <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-green-600 mb-4 animate-in fade-in duration-700">
              Order Confirmed! 🎉
            </h1>
            <p className="text-xl text-[var(--color-text-primary)] mb-3 font-medium">
              Thank you for your purchase!
            </p>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              We've received your order and will process it shortly. You'll receive a confirmation email soon.
            </p>

            {/* Order Number - More Prominent */}
            <div className="inline-block bg-white rounded-xl px-8 py-6 shadow-lg border-2 border-green-500">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2 font-medium">
                Your Order Number
              </p>
              <p className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)] mb-2">
                {orderNumber}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Save this number to track your order
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/track-order">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md">
                  Track Order
                </button>
              </Link>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-medium hover:bg-[var(--color-surface)] transition-all"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* What's Next */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 md:p-8 mb-8 shadow-md">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                What Happens Next?
              </h2>
              <ol className="space-y-3 text-blue-900">
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
                  <span className="pt-1"><strong>Order Confirmation:</strong> We'll confirm your order via email and SMS</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm">2</span>
                  <span className="pt-1"><strong>Processing:</strong> Your order will be processed within 24 hours</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm">3</span>
                  <span className="pt-1"><strong>Tracking:</strong> You'll receive tracking information once shipped</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm">4</span>
                  <span className="pt-1"><strong>Delivery:</strong> Delivered within 3-5 business days</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white font-bold text-sm">5</span>
                  <span className="pt-1"><strong>Payment:</strong> Pay cash on delivery when you receive your order 💵</span>
                </li>
              </ol>
            </div>

            {/* Order Information Grid */}
            {orderDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Delivery Address */}
                <div className="bg-[var(--color-surface)] rounded-lg p-6">
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                    Delivery Address
                  </h3>
                  <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {orderDetails.shippingAddress.fullName}
                    </p>
                    <p>{orderDetails.shippingAddress.address}</p>
                    <p>
                      {orderDetails.shippingAddress.city}{orderDetails.shippingAddress.state && `, ${orderDetails.shippingAddress.state}`}
                    </p>
                    {orderDetails.shippingAddress.postalCode && (
                      <p>{orderDetails.shippingAddress.postalCode}</p>
                    )}
                    <p>{orderDetails.shippingAddress.country || 'Pakistan'}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-[var(--color-surface)] rounded-lg p-6">
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    {orderDetails.shippingAddress.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-[var(--color-text-secondary)]" />
                        <span className="text-[var(--color-text-secondary)]">
                          {orderDetails.shippingAddress.email}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-[var(--color-text-secondary)]" />
                      <span className="text-[var(--color-text-secondary)]">
                        {orderDetails.shippingAddress.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-[var(--color-surface)] rounded-lg p-6">
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <span className="text-xl">💵</span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {orderDetails.paymentMethod}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Total */}
                <div className="bg-[var(--color-surface)] rounded-lg p-6">
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                    Order Total
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                      <span>Subtotal</span>
                      <span>PKR {orderDetails.itemsPrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                      <span>Shipping</span>
                      <span>{orderDetails.shippingPrice === 0 ? <span className="text-green-600">FREE</span> : `PKR ${orderDetails.shippingPrice?.toLocaleString()}`}</span>
                    </div>
                    {orderDetails.taxPrice > 0 && (
                      <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                        <span>Tax</span>
                        <span>PKR {orderDetails.taxPrice?.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-semibold text-[var(--color-text-primary)] pt-2 border-t border-[var(--color-border)]">
                      <span>Total</span>
                      <span>PKR {orderDetails.totalPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            {orderDetails && orderDetails.orderItems && (
              <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
                <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                  Order Items ({orderDetails.orderItems.length})
                </h3>
                <div className="space-y-4">
                  {orderDetails.orderItems.map((item: any, index: number) => (
                    <div
                      key={item._id || index}
                      className="flex items-center gap-4 pb-4 border-b border-[var(--color-border)] last:border-0"
                    >
                      <div className="text-[var(--color-text-secondary)] text-sm font-medium">
                        {item.quantity}x
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {item.name}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          PKR {item.price?.toLocaleString()} each
                        </p>
                        {item.sku && (
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            SKU: {item.sku}
                          </p>
                        )}
                      </div>
                      <div className="font-semibold text-[var(--color-text-primary)]">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Track Order Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">📦 Track Your Order</h3>
              <p className="text-sm text-blue-800 mb-3">
                You can track your order anytime without logging in. Just use your order number and email/phone.
              </p>
              <Link href="/track-order">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                  Go to Order Tracking
                </Button>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white px-8">
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
              >
                Print Order Details
              </Button>
            </div>

            {/* Support Info */}
            <div className="mt-12 text-center">
              <p className="text-[var(--color-text-secondary)] mb-2">
                Need help with your order?
              </p>
              <p className="text-[var(--color-text-primary)]">
                Contact us at{" "}
                <a
                  href="mailto:support@maskbar.pk"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  support@maskbar.pk
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Loading order details...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}

