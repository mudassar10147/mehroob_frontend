# Network Error Troubleshooting Guide

## Issue: Axios Network Error

This error typically occurs when:
1. **CORS is blocking the request** (most common)
2. **Backend is unreachable or down**
3. **Backend is spinning up** (Render free tier can take 50+ seconds)
4. **SSL/HTTPS certificate issues**

---

## Quick Checks

### 1. Check Backend Status
```bash
curl https://mehroob-backend.onrender.com/health
```

Expected: `{"success":true,"message":"Server is running",...}`

### 2. Check CORS in Browser Console

Open DevTools → Network tab → Find the failed request:

**If you see:**
- `CORS policy: No 'Access-Control-Allow-Origin' header` → CORS issue
- `Failed to fetch` or `Network Error` → Backend unreachable or CORS

### 3. Check Backend CORS Configuration

Your backend needs to allow:
- **Origin:** `http://localhost:5000` (development)
- **Origin:** Your production frontend URL (when deployed)
- **Methods:** GET, POST, PUT, DELETE, PATCH
- **Headers:** Content-Type, Authorization

---

## Solutions

### Solution 1: Verify Backend CORS Settings

Your backend should have CORS configured like this:

```javascript
// In your backend (Express.js example)
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5000',
    'http://localhost:3000',
    'https://your-frontend-domain.com' // Production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Solution 2: Check Render Backend Wake-Up Time

Render free tier spins down after inactivity:
- **First request:** Can take 50+ seconds
- **Subsequent requests:** Normal speed

**Solution:** Keep backend awake with a ping service or upgrade to paid tier.

### Solution 3: Verify Backend URL

Check your backend URL is correct:
- **Current:** `https://mehroob-backend.onrender.com/api`
- **Test:** `https://mehroob-backend.onrender.com/api/health`

### Solution 4: Temporary Workaround - Use Mock API

If backend is consistently unreachable, you can temporarily use the mock API:

The mock API route at `src/app/api/products/route.ts` is still available. If you want to force using the mock API locally, you can temporarily change the BASE_URL back to `/api`.

---

## Testing Steps

1. **Open Browser DevTools (F12)**
2. **Go to Network tab**
3. **Try to load products page**
4. **Check the failed request:**
   - Click on the failed request
   - Check the "Headers" tab
   - Look for CORS errors in "Response" tab

5. **Check Console tab:**
   - Look for detailed error messages
   - Check the error stack trace

---

## Common Error Messages

### "Network Error" or "ERR_NETWORK"
- **Cause:** CORS blocking or backend unreachable
- **Fix:** Check backend CORS settings

### "CORS policy blocked"
- **Cause:** Backend not allowing frontend origin
- **Fix:** Add frontend URL to backend CORS allowed origins

### "ECONNABORTED" or "timeout"
- **Cause:** Request took too long (30 seconds)
- **Fix:** Backend is spinning up, wait 50+ seconds for first request

### Status 0 with no response
- **Cause:** Request blocked before reaching server
- **Fix:** Usually CORS issue

---

## Next Steps

1. ✅ Error handling improved in `src/lib/api.ts`
2. ⚠️  Check backend CORS configuration
3. ⚠️  Verify backend is running: `https://mehroob-backend.onrender.com/health`
4. ⚠️  Test in browser DevTools Network tab
5. ⚠️  Check if backend needs to wake up (first request after inactivity)

---

## Backend CORS Check

If you have access to your backend code, verify:

```javascript
// Allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5000', // or your frontend URL
  credentials: true
}));
```

---

## Still Having Issues?

Check:
1. Browser console for detailed errors
2. Network tab for failed requests
3. Backend logs on Render dashboard
4. Backend CORS configuration
5. Backend is actually running (check Render dashboard)

