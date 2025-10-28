# Backend Search Implementation Guide 🔍

## Overview
This guide explains how to implement the search functionality in your backend API to make the frontend searchbar work.

---

## Current Status

**Frontend Status:** ✅ Complete
- Search input in Hero section
- Real-time suggestions (max 5 products)
- Search suggestions dropdown
- Keyboard navigation
- Click outside to close
- Navigate to products page with search query

**Backend Status:** ❌ Needs Implementation
- The search parameter exists in the API documentation
- Need to implement the search logic in backend

---

## Backend API Requirements

### Endpoint to Update
**File:** `routes/products.js` or similar

**Endpoint:** `GET /api/products`

**Current Query Parameters Handled:**
```javascript
{
  page: number,
  limit: number,
  categoryId: string,
  brandId: string,
  minPrice: number,
  maxPrice: number,
  skinType: string,
  isActive: boolean,
  isFeatured: boolean,
  isNewArrival: boolean,
  isBestSeller: boolean,
  inStock: boolean,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
}
```

**Missing Parameter:** `search: string`

---

## Backend Implementation

### Step 1: Add Search Parameter Handler

**If using Express.js/Node.js:**

```javascript
// Example implementation for GET /api/products
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      categoryId,
      brandId,
      minPrice,
      maxPrice,
      skinType,
      search,  // ← ADD THIS
      isActive,
      isFeatured,
      isNewArrival,
      isBestSeller,
      inStock,
      sortBy,
      sortOrder
    } = req.query;

    // Build query object
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'categoryId.name': { $regex: search, $options: 'i' } },
        { 'brandId.name': { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Other filters...
    if (categoryId) query.categoryId = categoryId;
    if (brandId) query.brandId = brandId;
    if (minPrice) query.finalPrice = { ...query.finalPrice, $gte: minPrice };
    if (maxPrice) query.finalPrice = { ...query.finalPrice, $lte: maxPrice };
    if (skinType) query.skinType = skinType;
    if (isActive !== undefined) query.isActive = isActive;
    if (isFeatured !== undefined) query.isFeatured = isFeatured;
    if (isNewArrival !== undefined) query.isNewArrival = isNewArrival;
    if (isBestSeller !== undefined) query.isBestSeller = isBestSeller;
    if (inStock !== undefined) query.inStock = inStock;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortBy && sortOrder ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 } : {})
      .populate('brandId', 'name slug logo')
      .populate('categoryId', 'name slug icon');

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});
```

### Step 2: For Search Suggestions (Max 5 Results)

Create a separate endpoint or handle it in the main endpoint:

```javascript
// For search suggestions, set limit to 5 when search is provided
const suggestionLimit = search ? 5 : limit;

// Then use suggestionLimit instead of limit for search queries
const products = await Product.find(query)
  .skip(0) // Don't paginate suggestions
  .limit(suggestionLimit)
  .sort(sortBy && sortOrder ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 } : {})
  .populate('brandId', 'name slug logo')
  .populate('categoryId', 'name slug icon');
```

---

## Search Fields to Include

Search should look in these product fields:

1. ✅ **Product Name** (`name`) - Primary search field
2. ✅ **Description** (`description`, `shortDescription`, `longDescription`)
3. ✅ **Brand Name** (via `brandId.name` population)
4. ✅ **Category Name** (via `categoryId.name` population)
5. ✅ **Tags** (if tags array exists)

---

## Testing the Search

### Test URLs for Backend

1. **Basic Search:**
   ```
   http://localhost:4000/api/products?search=hydrating&limit=5
   ```

2. **Search with Other Filters:**
   ```
   http://localhost:4000/api/products?search=hydrating&minPrice=1000&maxPrice=2000&limit=5
   ```

3. **Search for Specific Product:**
   ```
   http://localhost:4000/api/products?search=Honey
   ```

### Expected Response Format

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "...",
        "name": "Hydrating Honey Sheet Mask",
        "slug": "hydrating-honey-sheet-mask",
        "brand": "Mediheal",
        "category": "Hydrating",
        "price": 1299,
        "finalPrice": 1299,
        "thumbnail": "...",
        "images": ["..."],
        "inStock": true,
        "stock": 50,
        "isActive": true,
        "isNewArrival": false,
        "isBestSeller": true
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 1,
      "total": 3,
      "limit": 5
    }
  }
}
```

---

## Alternative: Temporary Frontend Mock (Quick Fix)

If the backend is not ready yet, you can create a temporary mock in the frontend:

### Step 1: Create Mock Search API Route

Create file: `src/app/api/products/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { bestSellingProducts } from '@/data/mockProducts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');

    let products = bestSellingProducts;

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      products = bestSellingProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Limit results
    const limitedProducts = products.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: {
        products: limitedProducts,
        pagination: {
          current: 1,
          pages: Math.ceil(products.length / limit),
          total: products.length,
          limit
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

### Step 2: Update API Base URL

In `src/lib/constants.ts`, temporarily change the BASE_URL to use the local API routes:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',  // Changed from 'http://localhost:4000/api'
  TIMEOUT: 30000,
} as const;
```

---

## Verification Checklist

After implementing backend search:

- [ ] Search works in Hero section input
- [ ] Suggestions appear after typing 2+ characters
- [ ] Max 5 suggestions displayed
- [ ] Clicking suggestion navigates to products page
- [ ] Pressing Enter searches and navigates
- [ ] Keyboard navigation (Arrow keys) works
- [ ] Escape closes suggestions
- [ ] Clicking outside closes suggestions
- [ ] Search results appear on products page

---

## Summary

**You need to add the `search` query parameter handler in your backend API.**

The frontend is already fully implemented and ready to work once the backend accepts and processes the `search` parameter.

If you want a quick temporary solution, use the mock API route in the frontend until your backend is ready.

