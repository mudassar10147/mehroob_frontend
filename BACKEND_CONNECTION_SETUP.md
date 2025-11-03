# Backend Connection Setup ✅

## Backend URL
**Production Backend:** `https://mehroob-backend.onrender.com`

**API Base URL:** `https://mehroob-backend.onrender.com/api`

---

## Frontend Configuration Status

### ✅ Configured Files

1. **`src/lib/constants.ts`**
   - ✅ API base URL set to: `https://mehroob-backend.onrender.com/api`
   - ✅ Falls back to environment variable: `NEXT_PUBLIC_API_URL`
   - ✅ Timeout set to 30 seconds

2. **`src/lib/api.ts`**
   - ✅ Axios client configured
   - ✅ Base URL uses API_CONFIG
   - ✅ Authentication token handling
   - ✅ Error interceptors configured
   - ✅ All endpoints properly mapped

---

## Environment Variables

### Recommended `.env.local` file:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://mehroob-backend.onrender.com/api

# Frontend URL (for CORS)
NEXT_PUBLIC_APP_URL=http://localhost:5000

# NextAuth (if using)
NEXTAUTH_URL=http://localhost:5000
NEXTAUTH_SECRET=your-secret-key-here
```

---

## API Endpoints Configured

### Products
- ✅ `GET /api/products` - Get all products with filters
- ✅ `GET /api/products/:id` - Get product by ID
- ✅ `GET /api/products/slug/:slug` - Get product by slug
- ✅ `GET /api/products/featured` - Get featured products
- ✅ `GET /api/products/new` - Get new arrivals
- ✅ `GET /api/products/bestsellers` - Get best sellers
- ✅ `GET /api/products/brand/:brandId` - Get by brand
- ✅ `GET /api/products/category/:categoryId` - Get by category

### Auth
- ✅ `POST /api/auth/login` - User login
- ✅ `POST /api/auth/register` - User registration
- ✅ `POST /api/auth/logout` - User logout
- ✅ `GET /api/auth/me` - Get current user
- ✅ `POST /api/auth/refresh` - Refresh token

### Orders
- ✅ `POST /api/orders` - Create order
- ✅ `GET /api/orders/my-orders` - Get user orders
- ✅ `GET /api/orders/:id` - Get order by ID
- ✅ `PUT /api/orders/:id/cancel` - Cancel order
- ✅ `POST /api/orders/track` - Track order

### Cart
- ✅ `GET /api/cart` - Get cart
- ✅ `POST /api/cart/items` - Add item to cart
- ✅ `PUT /api/cart/items/:itemId` - Update cart item
- ✅ `DELETE /api/cart/items/:itemId` - Remove cart item
- ✅ `DELETE /api/cart` - Clear cart

### User
- ✅ `GET /api/user/profile` - Get user profile
- ✅ `PUT /api/user/profile` - Update user profile
- ✅ `POST /api/user/change-password` - Change password

---

## Temporary Mock API

**Note:** There is a temporary mock API route at `src/app/api/products/route.ts` that was created for development. 

**Options:**
1. **Keep it** - Will be used if backend is unavailable (fallback)
2. **Remove it** - Direct connection to backend only

**To remove:** Delete the file `src/app/api/products/route.ts`

**To keep:** The frontend will prefer the backend, and only use the mock if the backend is unreachable.

---

## CORS Configuration

The backend appears to have CORS configured properly based on the headers:
- ✅ `access-control-allow-credentials: true`
- ✅ `vary: Origin`

If you encounter CORS errors, ensure your backend allows:
- Origin: `http://localhost:5000` (development)
- Origin: Your production frontend URL (when deployed)
- Methods: GET, POST, PUT, DELETE, PATCH
- Headers: Content-Type, Authorization

---

## Testing the Connection

### Test Backend Health
```bash
curl https://mehroob-backend.onrender.com/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "...",
  "environment": "development"
}
```

### Test from Frontend
1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit `/products` page
4. Check if requests go to `https://mehroob-backend.onrender.com/api/products`

---

## Troubleshooting

### If requests fail:

1. **Check Network Tab:**
   - Open DevTools → Network
   - Look for failed requests
   - Check error messages

2. **Check Backend Logs:**
   - Visit Render dashboard
   - Check service logs

3. **Check CORS:**
   - Look for CORS errors in console
   - Verify backend CORS settings

4. **Check API Response:**
   - Verify backend returns expected format
   - Check response status codes

5. **Check Environment Variables:**
   - Verify `NEXT_PUBLIC_API_URL` if set
   - Restart dev server after changes

---

## Next Steps

1. ✅ Backend URL configured
2. ✅ API client ready
3. ⚠️  Test actual API calls
4. ⚠️  Verify CORS allows frontend origin
5. ⚠️  Remove mock API if backend works (optional)

---

## Summary

Your frontend is **properly configured** to connect to the Render backend at:
- **Backend:** `https://mehroob-backend.onrender.com/api`

All API endpoints are mapped and ready to use. The frontend will automatically use the backend API for all requests.

**Status:** ✅ Ready to connect

