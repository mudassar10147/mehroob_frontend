# Product API Documentation - Complete Guide

## 🎯 Overview

The Product API manages your e-commerce product catalog. Products reference **Brands** and **Categories**, so those must be created first.

**Base URL**: `/api/products`

---

## 📦 **Key Concept: Product Dependencies**

```
Workflow Order:
1. Create Brand     → Get brandId
2. Create Category  → Get categoryId
3. Create Product   → Use brandId + categoryId
```

Example:
```javascript
// Step 1: Brand exists
Brand: Mediheal (ID: abc123)

// Step 2: Category exists  
Category: Sheet Masks (ID: def456)

// Step 3: Create Product
Product: {
  name: "Hyaluronic Sheet Mask",
  brandId: "abc123",    ← References Brand
  categoryId: "def456"  ← References Category
}
```

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Required vs Auto-Generated Fields](#required-vs-auto-generated-fields)
3. [Public Endpoints](#public-endpoints)
4. [Admin Endpoints](#admin-endpoints)
5. [Frontend Integration Examples](#frontend-integration-examples)
6. [Filtering & Sorting](#filtering--sorting)

---

## ⚡ Quick Start

### Create a Product (Minimal)

```javascript
POST /api/products
{
  "name": "Hyaluronic Sheet Mask",
  "sku": "HSM-001",
  "brandId": "68ea3b1d...",      // Must exist
  "categoryId": "68eb4adb...",    // Must exist
  "price": 500,
  "stock": 100
}
```

### Response:
```javascript
{
  "success": true,
  "data": {
    "product": {
      "_id": "...",
      "name": "Hyaluronic Sheet Mask",
      "slug": "hyaluronic-sheet-mask",  // Auto-generated
      "sku": "HSM-001",
      "brand": "Mediheal",               // Auto-populated
      "brandId": {...},
      "category": "Sheet Masks",         // Auto-populated
      "categoryId": {...},
      "price": 500,
      "stock": 100,
      "inStock": true,                   // Auto-set
      "isNewArrival": true,              // Auto-set
      "createdBy": "...",                // Auto-filled
      ...
    }
  }
}
```

---

## 📝 Required vs Auto-Generated Fields

### ✅ **Send These (Required)**:
```javascript
{
  "name": string,        // Product name
  "sku": string,         // Unique code
  "brandId": ObjectId,   // Brand reference
  "categoryId": ObjectId,// Category reference
  "price": number,       // Base price
  "stock": number        // Quantity
}
```

### 🎨 **Send These (Optional)**:
```javascript
{
  // Media
  "images": [string],
  "thumbnail": string,
  "video": string,
  
  // Descriptions
  "shortDescription": string (max 30),
  "description": string (max 600),
  "longDescription": string (max 3000),
  
  // Product Details
  "type": string,
  "ingredients": [string],
  "howToUse": string,
  "skinType": [enum],      // Oily, Dry, Combination, Sensitive, Normal, All
  "benefits": [string],
  "countryOfOrigin": string,
  
  // Pricing
  "discountPrice": number,    // OR discountPercent (not both)
  "discountPercent": number,  // Backend calculates the other
  
  // SEO
  "seoTitle": string (30-150),
  "seoDescription": string (50-1000),
  "metaKeywords": [string],
  
  // Features
  "tags": [string],
  "isFeatured": boolean,
  "isActive": boolean
}
```

### ❌ **DON'T Send These (Auto-Generated)**:
```javascript
{
  "slug": "...",              // From name
  "brand": "Mediheal",        // From brandId
  "category": "Sheet Masks",  // From categoryId
  "inStock": true,            // From stock > 0
  "isNewArrival": true,       // If created < 2 months
  "isBestSeller": false,      // Top 4 by sales
  "finalPrice": 400,          // Virtual field
  "calculatedDiscountPercent": 20, // Virtual
  "createdBy": "...",         // From auth token
  "sold": 0,                  // Managed by system
  "averageRating": 0,         // From reviews
  "totalReviews": 0,          // From reviews
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 🌐 Public Endpoints

### 1. Get All Products

**Endpoint**: `GET /api/products`

**Query Parameters**:
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| page | integer | Page number (default: 1) | `?page=2` |
| limit | integer | Items per page (default: 20, max: 100) | `&limit=50` |
| search | string | Search in name, description, tags | `&search=hydrating` |
| brandId | ObjectId | Filter by brand | `&brandId=68ea...` |
| categoryId | ObjectId | Filter by category | `&categoryId=68eb...` |
| minPrice | number | Minimum price | `&minPrice=100` |
| maxPrice | number | Maximum price | `&maxPrice=1000` |
| skinType | enum | Filter by skin type | `&skinType=Dry` |
| isActive | boolean | Only active products | `&isActive=true` |
| isFeatured | boolean | Only featured | `&isFeatured=true` |
| isNewArrival | boolean | Only new arrivals | `&isNewArrival=true` |
| isBestSeller | boolean | Only best sellers | `&isBestSeller=true` |
| inStock | boolean | Only in-stock | `&inStock=true` |
| sortBy | string | Sort field (name, price, createdAt, sold, averageRating) | `&sortBy=price` |
| sortOrder | string | asc or desc | `&sortOrder=asc` |

**Example**:
```bash
GET /api/products?categoryId=68eb4adb...&skinType=Dry&minPrice=200&maxPrice=800&page=1&limit=20&sortBy=price&sortOrder=asc
```

**Response**:
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "current": 1,
      "pages": 5,
      "total": 95,
      "limit": 20
    }
  }
}
```

---

### 2. Get Featured Products

**Endpoint**: `GET /api/products/featured?limit=10`

Returns products with `isFeatured: true`, `isActive: true`, and `inStock: true`.

---

### 3. Get New Arrivals

**Endpoint**: `GET /api/products/new?limit=10`

Returns products with `isNewArrival: true` (created < 2 months ago).

---

### 4. Get Best Sellers

**Endpoint**: `GET /api/products/bestsellers?limit=10`

Returns top 4 products by sales (updated via admin endpoint).

---

### 5. Get Products by Brand

**Endpoint**: `GET /api/products/brand/:brandId?page=1&limit=20`

Returns all active products from a specific brand.

**Response**:
```json
{
  "success": true,
  "data": {
    "brand": {
      "_id": "...",
      "name": "Mediheal",
      "slug": "mediheal"
    },
    "products": [...],
    "pagination": {...}
  }
}
```

---

### 6. Get Products by Category

**Endpoint**: `GET /api/products/category/:categoryId?page=1&limit=20`

Returns all active products from a specific category (or subcategory).

---

### 7. Get Product by Slug

**Endpoint**: `GET /api/products/slug/:slug`

**Example**: `GET /api/products/slug/hyaluronic-sheet-mask`

---

### 8. Get Product by ID

**Endpoint**: `GET /api/products/:id`

---

### 9. Get Product Statistics

**Endpoint**: `GET /api/products/stats`

**Response**:
```json
{
  "success": true,
  "data": {
    "totalProducts": 150,
    "activeProducts": 145,
    "inactiveProducts": 5,
    "inStockProducts": 120,
    "outOfStockProducts": 25,
    "featuredProducts": 10,
    "newArrivals": 15,
    "bestSellers": 4,
    "priceRange": {
      "minPrice": 100,
      "maxPrice": 2500,
      "avgPrice": 650
    },
    "topSelling": [...]
  }
}
```

---

## 🔒 Admin Endpoints

### 1. Create Product

**Endpoint**: `POST /api/products`

**Headers**:
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Hyaluronic Acid Sheet Mask",
  "sku": "HSM-001",
  "brandId": "68ea3b1d...",
  "categoryId": "68eb4adb...",
  "type": "Hydrating",
  
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "thumbnail": "https://example.com/image1.jpg",
  
  "shortDescription": "Deep hydration sheet mask",
  "description": "Premium Korean sheet mask infused with hyaluronic acid for deep hydration and plumping effects.",
  "longDescription": "Full detailed description...",
  
  "ingredients": ["Hyaluronic Acid", "Glycerin", "Aloe Vera", "Vitamin E"],
  "howToUse": "Cleanse face, apply mask for 15-20 minutes, remove and pat remaining essence",
  "skinType": ["Dry", "Normal", "Combination"],
  "benefits": ["Hydrating", "Plumping", "Soothing", "Anti-aging"],
  "countryOfOrigin": "South Korea",
  
  "price": 500,
  "discountPercent": 20,
  "stock": 100,
  
  "seoTitle": "Best Hyaluronic Acid Sheet Mask - Deep Hydration",
  "seoDescription": "Premium Korean sheet mask with hyaluronic acid for deep hydration. Perfect for dry and dehydrated skin.",
  "metaKeywords": ["sheet mask", "hyaluronic acid", "korean skincare", "hydrating"],
  
  "tags": ["korean", "hydrating", "sheet-mask", "bestseller"],
  "isFeatured": true,
  "isActive": true
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": {
      "_id": "68eb4c1a...",
      "name": "Hyaluronic Acid Sheet Mask",
      "slug": "hyaluronic-acid-sheet-mask",
      "sku": "HSM-001",
      "brand": "Mediheal",
      "brandId": {...},
      "category": "Sheet Masks",
      "categoryId": {...},
      "price": 500,
      "discountPrice": 400,
      "discountPercent": 20,
      "finalPrice": 400,
      "stock": 100,
      "inStock": true,
      "isNewArrival": true,
      ...
    }
  }
}
```

**Errors**:
- `400`: SKU already exists
- `404`: Brand or Category not found
- `400`: Validation failed

---

### 2. Update Product

**Endpoint**: `PUT /api/products/:id`

All fields optional. Only send fields you want to update.

**Example**:
```json
{
  "price": 450,
  "stock": 80,
  "isFeatured": false
}
```

---

### 3. Delete Product (Permanent)

**Endpoint**: `DELETE /api/products/:id`

Permanently removes product from database.

---

### 4. Deactivate Product (Soft Delete)

**Endpoint**: `PUT /api/products/:id/deactivate`

Sets `isActive: false`. Can be restored.

---

### 5. Restore Product

**Endpoint**: `PUT /api/products/:id/restore`

Sets `isActive: true`.

---

### 6. Update Stock

**Endpoint**: `PUT /api/products/:id/stock`

**Body**:
```json
{
  "stock": 50
}
```

---

### 7. Update Best Sellers

**Endpoint**: `PUT /api/products/bestsellers/update`

Recalculates top 4 products by sales and updates `isBestSeller` flag.

---

## 🎨 Frontend Integration Examples

### Example 1: Product Creation Form

```javascript
const ProductForm = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch brands and categories for dropdowns
    Promise.all([
      fetch('/api/brands?isActive=true').then(r => r.json()),
      fetch('/api/categories/main?isActive=true').then(r => r.json())
    ]).then(([brandsData, categoriesData]) => {
      setBrands(brandsData.data.brands);
      setCategories(categoriesData.data.categories);
    });
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Upload images first (to your storage service)
    const uploadedImages = await uploadImages(formData.getAll('imageFiles'));
    
    const productData = {
      name: formData.get('name'),
      sku: formData.get('sku'),
      brandId: formData.get('brandId'),
      categoryId: formData.get('categoryId'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      images: uploadedImages.map(img => img.url),
      thumbnail: uploadedImages[0]?.url,
      shortDescription: formData.get('shortDescription'),
      description: formData.get('description'),
      discountPercent: formData.get('discountPercent') || undefined,
      isFeatured: formData.get('isFeatured') === 'on'
    };
    
    const response = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    
    const result = await response.json();
    if (result.success) {
      alert('Product created successfully!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" required />
      <input name="sku" required />
      
      <select name="brandId" required>
        {brands.map(b => <option value={b._id}>{b.name}</option>)}
      </select>
      
      <select name="categoryId" required>
        {categories.map(c => (
          <>
            <option value={c._id}>{c.name}</option>
            {c.subcategories?.map(sub => (
              <option value={sub._id}>└─ {sub.name}</option>
            ))}
          </>
        ))}
      </select>
      
      <input name="price" type="number" required />
      <input name="stock" type="number" required />
      <input name="discountPercent" type="number" placeholder="Discount %" />
      
      <input name="imageFiles" type="file" multiple accept="image/*" />
      
      <textarea name="shortDescription" maxLength="30" />
      <textarea name="description" maxLength="600" />
      
      <label>
        <input name="isFeatured" type="checkbox" />
        Featured Product
      </label>
      
      <button type="submit">Create Product</button>
    </form>
  );
};
```

---

### Example 2: Product Catalog with Filters

```javascript
const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    categoryId: '',
    brandId: '',
    minPrice: '',
    maxPrice: '',
    skinType: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const fetchProducts = async () => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    
    const response = await fetch(`/api/products?${params}`);
    const data = await response.json();
    setProducts(data.data.products);
  };
  
  useEffect(() => {
    fetchProducts();
  }, [filters]);
  
  return (
    <div>
      {/* Filters UI */}
      <Filters filters={filters} setFilters={setFilters} />
      
      {/* Product Grid */}
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {/* Pagination */}
      <Pagination />
    </div>
  );
};
```

---

### Example 3: Product Card Component

```javascript
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.name} />
      
      {product.isNewArrival && <span className="badge">New</span>}
      {product.isBestSeller && <span className="badge">Best Seller</span>}
      {product.discountPercent > 0 && (
        <span className="discount">-{product.discountPercent}%</span>
      )}
      
      <h3>{product.name}</h3>
      <p className="brand">{product.brandId.name}</p>
      <p className="category">{product.categoryId.name}</p>
      
      <div className="price">
        {product.discountPrice ? (
          <>
            <span className="original">PKR {product.price}</span>
            <span className="final">PKR {product.finalPrice}</span>
          </>
        ) : (
          <span>PKR {product.price}</span>
        )}
      </div>
      
      {!product.inStock && <p className="out-of-stock">Out of Stock</p>}
      
      <a href={`/product/${product.slug}`}>View Details</a>
    </div>
  );
};
```

---

### Example 4: Product Detail Page

```javascript
const ProductDetail = ({ slug }) => {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    fetch(`/api/products/slug/${slug}`)
      .then(r => r.json())
      .then(data => setProduct(data.data.product));
  }, [slug]);
  
  if (!product) return <div>Loading...</div>;
  
  return (
    <div className="product-detail">
      <div className="gallery">
        <img src={product.thumbnail} alt={product.name} />
        <div className="thumbnails">
          {product.images.map((img, i) => (
            <img key={i} src={img} alt={`View ${i+1}`} />
          ))}
        </div>
      </div>
      
      <div className="info">
        <h1>{product.name}</h1>
        <p className="brand">
          By <a href={`/brand/${product.brandId.slug}`}>{product.brandId.name}</a>
        </p>
        <p className="category">
          Category: <a href={`/category/${product.categoryId.slug}`}>
            {product.categoryId.name}
          </a>
        </p>
        
        <div className="price">
          {product.discountPrice ? (
            <>
              <span className="original">PKR {product.price}</span>
              <span className="final">PKR {product.finalPrice}</span>
              <span className="save">Save {product.calculatedDiscountPercent}%</span>
            </>
          ) : (
            <span className="price">PKR {product.price}</span>
          )}
        </div>
        
        <p className="stock">
          {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </p>
        
        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        
        {product.ingredients?.length > 0 && (
          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
        )}
        
        {product.benefits?.length > 0 && (
          <div className="benefits">
            <h3>Benefits</h3>
            <ul>
              {product.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
            </ul>
          </div>
        )}
        
        {product.howToUse && (
          <div className="how-to-use">
            <h3>How to Use</h3>
            <p>{product.howToUse}</p>
          </div>
        )}
        
        <button disabled={!product.inStock}>Add to Cart</button>
      </div>
    </div>
  );
};
```

---

### Example 5: Admin Product Management

```javascript
const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  
  const handleDelete = async (productId) => {
    if (!confirm('Delete permanently? Cannot be undone!')) return;
    
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    if (response.ok) {
      alert('Product deleted');
      fetchProducts(); // Refresh list
    }
  };
  
  const handleDeactivate = async (productId) => {
    const response = await fetch(`/api/products/${productId}/deactivate`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    if (response.ok) {
      alert('Product deactivated');
      fetchProducts();
    }
  };
  
  const handleStockUpdate = async (productId, newStock) => {
    const response = await fetch(`/api/products/${productId}/stock`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stock: parseInt(newStock) })
    });
    
    if (response.ok) {
      alert('Stock updated');
      fetchProducts();
    }
  };
  
  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>SKU</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td><img src={product.thumbnail} width="50" /></td>
            <td>{product.name}</td>
            <td>{product.sku}</td>
            <td>{product.brand}</td>
            <td>{product.category}</td>
            <td>PKR {product.finalPrice}</td>
            <td>
              <input 
                type="number" 
                value={product.stock}
                onChange={(e) => handleStockUpdate(product._id, e.target.value)}
              />
            </td>
            <td>
              {product.isActive ? '✅ Active' : '❌ Inactive'}
              {!product.inStock && ' (Out of Stock)'}
            </td>
            <td>
              <button onClick={() => editProduct(product._id)}>Edit</button>
              <button onClick={() => handleDeactivate(product._id)}>
                Deactivate
              </button>
              <button 
                className="btn-danger"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

---

## 🔍 Filtering & Sorting Guide

### Filter by Category (Including Subcategories)

```javascript
// Get all products in "Sheet Masks" category
GET /api/products?categoryId=68eb4adb...

// Get products in "Acne Control Sheet Mask" subcategory
GET /api/products?categoryId=68eb4ae8...
```

### Filter by Multiple Criteria

```javascript
// Dry skin products from Mediheal, price 200-800, in stock
GET /api/products?brandId=68ea3b1d...&skinType=Dry&minPrice=200&maxPrice=800&inStock=true
```

### Sort Products

```javascript
// Cheapest first
GET /api/products?sortBy=price&sortOrder=asc

// Best selling first
GET /api/products?sortBy=sold&sortOrder=desc

// Highest rated first
GET /api/products?sortBy=averageRating&sortOrder=desc
```

---

## ⚠️ Important Notes

### Discount Logic
```javascript
// Option 1: Send discount percentage
{
  "price": 500,
  "discountPercent": 20
}
// Backend calculates: discountPrice = 400

// Option 2: Send discount price
{
  "price": 500,
  "discountPrice": 400
}
// Backend calculates: discountPercent = 20

// DON'T send both - send one or the other!
```

### Stock Management
```javascript
// When stock = 0:
{
  "stock": 0,
  "inStock": false  // Auto-set by backend
}

// Backend automatically sets inStock based on stock quantity
```

### New Arrival Badge
```javascript
// Products created < 2 months ago automatically get:
{
  "isNewArrival": true  // Auto-set by backend
}
```

### Best Seller Badge
```javascript
// Admin must manually trigger update:
PUT /api/products/bestsellers/update

// Backend finds top 4 by sales and sets:
{
  "isBestSeller": true  // Only top 4 products
}
```

---

## 📊 Complete API Reference

### Public Endpoints (9):
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all (with filters) |
| GET | `/api/products/featured` | Featured products |
| GET | `/api/products/new` | New arrivals |
| GET | `/api/products/bestsellers` | Best sellers |
| GET | `/api/products/stats` | Statistics |
| GET | `/api/products/brand/:brandId` | Products by brand |
| GET | `/api/products/category/:categoryId` | Products by category |
| GET | `/api/products/slug/:slug` | Product by slug |
| GET | `/api/products/:id` | Product by ID |

### Admin Endpoints (7):
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete permanently |
| PUT | `/api/products/:id/deactivate` | Deactivate (soft) |
| PUT | `/api/products/:id/restore` | Restore |
| PUT | `/api/products/:id/stock` | Update stock |
| PUT | `/api/products/bestsellers/update` | Update best sellers |

---

## 🎉 Summary for Frontend Developer

**What You Need to Know**:
1. ✅ Only 6 required fields (name, sku, brandId, categoryId, price, stock)
2. ✅ Upload images FIRST, then send URLs
3. ✅ Send discountPercent OR discountPrice (not both)
4. ✅ Brand and Category must exist before creating product
5. ✅ DELETE = permanent, DEACTIVATE = soft delete
6. ✅ Many fields auto-calculated (slug, inStock, isNewArrival, etc.)

**Ready to Use**:
- ✅ Complete CRUD operations
- ✅ Advanced filtering (11+ filters)
- ✅ Sorting (5 sort fields)
- ✅ Pagination
- ✅ Auto-calculations
- ✅ Brand & Category integration

---

**API Version**: 1.0.0  
**Last Updated**: October 12, 2025  
**Base URL**: `http://localhost:4000/api/products`  
**Authentication**: Admin for write operations

