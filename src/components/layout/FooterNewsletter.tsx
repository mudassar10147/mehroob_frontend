"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await api.newsletter.subscribe({
        email: email.trim(),
        source: 'website',
      }) as { success: boolean; message?: string; data?: any };

      if (response.success) {
        setMessage({ 
          type: 'success', 
          text: response.message || 'Successfully subscribed! Please check your email to verify your subscription.' 
        });
        setEmail(""); // Clear the form
      } else {
        setMessage({ 
          type: 'error', 
          text: response.message || 'Failed to subscribe. Please try again later.' 
        });
      }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Handle specific error cases
      if (error.response) {
        // Server responded with an error status
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 400) {
          // Bad Request - validation error
          let errorMessage = 'Invalid email address. Please check and try again.';
          
          if (errorData?.message) {
            errorMessage = errorData.message;
          } else if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
            // Handle validation errors array
            errorMessage = errorData.errors[0].msg || errorData.errors[0].message || errorMessage;
          } else if (errorData?.error) {
            errorMessage = errorData.error;
          }
          
          setMessage({ 
            type: 'error', 
            text: errorMessage 
          });
        } else if (status === 409) {
          // Conflict - already subscribed
          setMessage({ 
            type: 'error', 
            text: errorData?.message || 'This email is already subscribed to our newsletter.' 
          });
        } else if (errorData?.message) {
          setMessage({ 
            type: 'error', 
            text: errorData.message 
          });
        } else {
          setMessage({ 
            type: 'error', 
            text: `Error ${status}: Failed to subscribe. Please try again later.` 
          });
        }
      } else if (error.isNetworkError) {
        setMessage({ 
          type: 'error', 
          text: 'Network error. Please check your connection and try again.' 
        });
      } else if (error.message?.includes('already subscribed')) {
        setMessage({ 
          type: 'error', 
          text: 'This email is already subscribed to our newsletter.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: 'Failed to subscribe. Please try again later.' 
        });
      }
    } finally {
      setIsLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="footer-newsletter">
      <h4 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text-bold)] mb-4">
        Stay Updated
      </h4>
      <p className="text-sm text-[var(--color-text-primary)] mb-6 max-w-sm">
        Get the latest skincare tips, new product launches, and exclusive offers 
        delivered to your inbox.
      </p>
      
      <form onSubmit={handleNewsletterSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(null); // Clear message when user types
            }}
            className="flex-1 border-[var(--color-border)] focus:border-[var(--color-primary)]"
            required
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="sm" 
            disabled={isLoading}
            className="bg-[var(--color-secondary-1)] hover:bg-[var(--color-primary)] text-[var(--color-text-bold)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Success/Error Message */}
        {message && (
          <div className={`flex items-center gap-2 text-xs ${
            message.type === 'success' 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{message.text}</span>
          </div>
        )}
        
        <p className="text-xs text-[#8B8B8B]">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
