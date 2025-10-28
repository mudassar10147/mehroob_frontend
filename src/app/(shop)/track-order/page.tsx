"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Package, Truck, CheckCircle, XCircle, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber) {
      setError("Please enter your order number");
      return;
    }

    if (!email && !phone) {
      setError("Please enter either email or phone number");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response: any = await api.orders.track({
        orderNumber: orderNumber.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
      });

      if (response.success && response.data?.order) {
        setOrder(response.data.order);
      } else {
        setError(response.message || "Order not found");
      }
    } catch (err: any) {
      console.error("Track order error:", err);
      setError(err.response?.data?.message || "Failed to track order. Please check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case "processing":
        return <Package className="w-6 h-6 text-blue-600" />;
      case "confirmed":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "shipped":
        return <Truck className="w-6 h-6 text-purple-600" />;
      case "delivered":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Clock className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="track-order-page min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[var(--color-surface)] py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-6">
              <Search className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Enter your order number and email or phone number to track your order status
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Tracking Form */}
            <div className="bg-[var(--color-surface)] rounded-lg p-6 md:p-8 mb-8">
              <form onSubmit={handleTrackOrder} className="space-y-6">
                {/* Order Number */}
                <div>
                  <Label htmlFor="orderNumber" className="text-[var(--color-text-primary)] mb-2 block font-medium">
                    Order Number *
                  </Label>
                  <Input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="ORD-20251016-12345"
                    className="text-lg"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    You received this in your order confirmation
                  </p>
                </div>

                {/* Email or Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-[var(--color-text-primary)] mb-2 block font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[var(--color-text-primary)] mb-2 block font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03001234567"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)]">
                  * Enter at least one: email OR phone number used during checkout
                </p>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white py-6 text-lg font-medium"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Tracking Order...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Search className="w-5 h-5" />
                      Track Order
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800 mb-1">Unable to Track Order</h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Details */}
            {order && (
              <div className="space-y-6">
                {/* Order Status Card */}
                <div className="bg-white border-2 border-[var(--color-primary)] rounded-lg p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    {getStatusIcon(order.orderStatus)}
                    <div className="flex-1">
                      <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-text-primary)]">
                        Order #{order.orderNumber}
                      </h2>
                      <p className="text-[var(--color-text-secondary)]">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border-2 font-semibold text-sm uppercase ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </div>
                  </div>

                  {/* Order Progress */}
                  <div className="relative pt-4">
                    <div className="flex justify-between mb-2">
                      <div className={`flex flex-col items-center ${['pending', 'processing', 'confirmed', 'shipped', 'delivered'].includes(order.orderStatus) ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${['pending', 'processing', 'confirmed', 'shipped', 'delivered'].includes(order.orderStatus) ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                          <Package className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2 font-medium">Pending</span>
                      </div>

                      <div className={`flex flex-col items-center ${['processing', 'confirmed', 'shipped', 'delivered'].includes(order.orderStatus) ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${['processing', 'confirmed', 'shipped', 'delivered'].includes(order.orderStatus) ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                          <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2 font-medium">Processing</span>
                      </div>

                      <div className={`flex flex-col items-center ${['confirmed', 'shipped', 'delivered'].includes(order.orderStatus) ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${['confirmed', 'shipped', 'delivered'].includes(order.orderStatus) ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2 font-medium">Confirmed</span>
                      </div>

                      <div className={`flex flex-col items-center ${['shipped', 'delivered'].includes(order.orderStatus) ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${['shipped', 'delivered'].includes(order.orderStatus) ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                          <Truck className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2 font-medium">Shipped</span>
                      </div>

                      <div className={`flex flex-col items-center ${order.orderStatus === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.orderStatus === 'delivered' ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2 font-medium">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Number */}
                  {order.trackingNumber && (
                    <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-1">Tracking Number</p>
                      <p className="font-semibold text-[var(--color-text-primary)] text-lg">{order.trackingNumber}</p>
                    </div>
                  )}
                </div>

                {/* Order Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Address */}
                  <div className="bg-[var(--color-surface)] rounded-lg p-6">
                    <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                      Delivery Address
                    </h3>
                    <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {order.shippingAddress.fullName}
                      </p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}
                        {order.shippingAddress.state && `, ${order.shippingAddress.state}`}
                      </p>
                      {order.shippingAddress.postalCode && (
                        <p>{order.shippingAddress.postalCode}</p>
                      )}
                      <p>{order.shippingAddress.country || "Pakistan"}</p>
                    </div>
                  </div>

                  {/* Contact & Payment */}
                  <div className="bg-[var(--color-surface)] rounded-lg p-6">
                    <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                      Contact & Payment
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-[var(--color-text-secondary)]" />
                        <span className="text-[var(--color-text-secondary)]">
                          {order.shippingAddress.phone}
                        </span>
                      </div>
                      {order.shippingAddress.email && (
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-[var(--color-text-secondary)]" />
                          <span className="text-[var(--color-text-secondary)]">
                            {order.shippingAddress.email}
                          </span>
                        </div>
                      )}
                      <div className="pt-3 border-t border-[var(--color-border)]">
                        <p className="text-sm text-[var(--color-text-secondary)] mb-1">Payment Method</p>
                        <p className="font-medium text-[var(--color-text-primary)]">{order.paymentMethod}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] capitalize">
                          Status: {order.paymentStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-[var(--color-surface)] rounded-lg p-6">
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                    Order Items ({order.orderItems?.length || 0})
                  </h3>
                  <div className="space-y-4">
                    {order.orderItems?.map((item: any, index: number) => (
                      <div
                        key={item._id || index}
                        className="flex gap-4 pb-4 border-b border-[var(--color-border)] last:border-0"
                      >
                        {/* Product Image */}
                        {item.image && (
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        )}

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[var(--color-text-primary)] mb-1">
                            {item.name}
                          </h4>
                          {item.sku && (
                            <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                              SKU: {item.sku}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-[var(--color-text-secondary)]">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-[var(--color-text-secondary)]">
                              PKR {item.price?.toLocaleString()} each
                            </span>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="font-semibold text-[var(--color-text-primary)]">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-[var(--color-surface)] rounded-lg p-6">
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[var(--color-text-secondary)]">
                      <span>Subtotal</span>
                      <span>PKR {order.itemsPrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[var(--color-text-secondary)]">
                      <span>Shipping</span>
                      <span>
                        {order.shippingPrice === 0 ? (
                          <span className="text-green-600 font-medium">FREE</span>
                        ) : (
                          `PKR ${order.shippingPrice?.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {order.taxPrice > 0 && (
                      <div className="flex justify-between text-[var(--color-text-secondary)]">
                        <span>Tax</span>
                        <span>PKR {order.taxPrice?.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-semibold text-[var(--color-text-primary)] pt-3 border-t border-[var(--color-border)]">
                      <span className="font-[var(--font-heading)]">Total</span>
                      <span>PKR {order.totalPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Notes */}
                {order.customerNotes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Order Notes</h4>
                    <p className="text-sm text-blue-800">{order.customerNotes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="flex-1 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                  >
                    Print Order Details
                  </Button>
                  <Link href="/products" className="flex-1">
                    <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Help Section */}
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
                {" "}or call{" "}
                <a
                  href="tel:+923001234567"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  +92 300 1234567
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}





