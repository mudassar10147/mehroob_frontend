import { z } from 'zod';
import { VALIDATION } from './constants';

/**
 * Authentication Schemas
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, 'Password must be at least 8 characters'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(VALIDATION.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
      .max(VALIDATION.NAME_MAX_LENGTH, 'Name must not exceed 50 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(
        VALIDATION.PASSWORD_MIN_LENGTH,
        `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`
      )
      .max(
        VALIDATION.PASSWORD_MAX_LENGTH,
        `Password must not exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters`
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(VALIDATION.PASSWORD_MIN_LENGTH, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Profile Schemas
 */
export const profileSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(VALIDATION.NAME_MAX_LENGTH, 'Name must not exceed 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(VALIDATION.PHONE_REGEX, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

/**
 * Address Schemas
 */
export const addressSchema = z.object({
  fullName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(VALIDATION.NAME_MAX_LENGTH, 'Name must not exceed 50 characters'),
  phone: z.string().regex(VALIDATION.PHONE_REGEX, 'Invalid phone number'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  postalCode: z
    .string()
    .regex(VALIDATION.POSTAL_CODE_REGEX, 'Invalid postal code'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  isDefault: z.boolean().optional(),
});

/**
 * Checkout Schema
 */
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsShipping: z.boolean().optional(),
  paymentMethod: z.enum(['card', 'paypal', 'other']),
});

/**
 * Product Review Schema
 */
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters'),
  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must not exceed 1000 characters'),
});

/**
 * Contact Form Schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(VALIDATION.NAME_MAX_LENGTH, 'Name must not exceed 50 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

/**
 * Newsletter Subscription Schema
 */
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

/**
 * Search Schema
 */
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.string().optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  sortBy: z.enum(['price-asc', 'price-desc', 'name-asc', 'name-desc', 'newest']).optional(),
});

// Export types from schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type SearchInput = z.infer<typeof searchSchema>;

