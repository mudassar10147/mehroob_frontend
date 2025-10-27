"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isProcessing: boolean;
}

export interface CheckoutFormData {
  // Contact Information
  email: string;
  phone: string;
  
  // Shipping Address
  fullName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  
  // Additional
  orderNotes?: string;
}

const pakistanProvinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Kashmir",
  "Islamabad Capital Territory",
];

export function CheckoutForm({ onSubmit, isProcessing }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    orderNotes: "",
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{11}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Phone number must be 11 digits";
    }

    // Required fields
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.province) newErrors.province = "Province is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div className="bg-[var(--color-surface)] rounded-lg p-6">
        <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-6">
          Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-[var(--color-text-primary)] mb-2 block">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={errors.email ? "border-red-500" : ""}
              disabled={isProcessing}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-[var(--color-text-primary)] mb-2 block">
              Phone Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="03001234567"
              className={errors.phone ? "border-red-500" : ""}
              disabled={isProcessing}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-[var(--color-surface)] rounded-lg p-6">
        <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-6">
          Shipping Address
        </h2>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="text-[var(--color-text-primary)] mb-2 block">
              Full Name *
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.fullName ? "border-red-500" : ""}
              disabled={isProcessing}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="text-[var(--color-text-primary)] mb-2 block">
              Street Address *
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="House # 123, Street # 45, Area Name"
              className={errors.address ? "border-red-500" : ""}
              disabled={isProcessing}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* City and Province */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-[var(--color-text-primary)] mb-2 block">
                City *
              </Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Lahore"
                className={errors.city ? "border-red-500" : ""}
                disabled={isProcessing}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <Label htmlFor="province" className="text-[var(--color-text-primary)] mb-2 block">
                Province *
              </Label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
                  errors.province ? "border-red-500" : "border-[var(--color-border)]"
                }`}
                disabled={isProcessing}
              >
                <option value="">Select Province</option>
                {pakistanProvinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province && (
                <p className="text-red-500 text-sm mt-1">{errors.province}</p>
              )}
            </div>
          </div>

          {/* Postal Code */}
          <div>
            <Label htmlFor="postalCode" className="text-[var(--color-text-primary)] mb-2 block">
              Postal Code (Optional)
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="54000"
              disabled={isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-[var(--color-surface)] rounded-lg p-6">
        <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-6">
          Payment Method
        </h2>
        
        <div className="bg-white rounded-lg p-4 border-2 border-[var(--color-primary)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                Cash on Delivery (COD)
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Pay when you receive your order
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Order Notes */}
      <div className="bg-[var(--color-surface)] rounded-lg p-6">
        <h2 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)] mb-6">
          Order Notes (Optional)
        </h2>
        
        <Textarea
          id="orderNotes"
          name="orderNotes"
          value={formData.orderNotes}
          onChange={handleChange}
          placeholder="Any special instructions for your order..."
          rows={4}
          disabled={isProcessing}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white py-6 text-lg font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing Order...
          </span>
        ) : (
          "Place Order"
        )}
      </Button>

      <p className="text-center text-sm text-[var(--color-text-secondary)]">
        By placing your order, you agree to our terms and conditions
      </p>
    </form>
  );
}

