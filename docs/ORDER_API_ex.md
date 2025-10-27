# Order API - Request Examples

This document provides ready-to-use request examples for testing the Order API.

## Prerequisites

1. **Get Authentication Token**
   ```bash
   # Login first to get JWT token
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "password": "password123"
     }'
   ```

2. **Get Product IDs**
   ```bash
   # Get list of products
   curl -X GET http://localhost:3000/api/products
   ```

---

## 1. Place Order - Minimal Example

### Request
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "orderItems": [
      {
        "product": "507f1f77bcf86cd799439011",
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "fullName": "Ali Ahmed",
      "phone": "03001234567",
      "address": "House 123, Street 5, Block A",
      "city": "Karachi"
    }
  }'
```

### Response
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "order": {
      "_id": "...",
      "orderNumber": "ORD-20251016-12345",
      "totalPrice": 1650,
      "orderStatus": "pending",
      "createdAt": "2025-10-16T10:30:00.000Z"
    }
  }
}
```

---

## 2. Place Order - Complete Example

### Request
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "orderItems": [
      {
        "product": "507f1f77bcf86cd799439011",
        "quantity": 2
      },
      {
        "product": "507f1f77bcf86cd799439012",
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "fullName": "Sarah Khan",
      "phone": "+92-300-9876543",
      "email": "sarah@example.com",
      "address": "Flat 4B, Green Apartments, Main Boulevard",
      "city": "Lahore",
      "state": "Punjab",
      "postalCode": "54000",
      "country": "Pakistan"
    },
    "paymentMethod": "COD",
    "customerNotes": "Please call 30 minutes before delivery. Delivery between 2-5 PM preferred."
  }'
```

---

## 3. Place Order - Multiple Items

### Request (JSON)
```json
{
  "orderItems": [
    {
      "product": "670a1234bcf86cd799439011",
      "quantity": 3
    },
    {
      "product": "670a1234bcf86cd799439012",
      "quantity": 2
    },
    {
      "product": "670a1234bcf86cd799439013",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "fullName": "Muhammad Hassan",
    "phone": "03331234567",
    "address": "Office 301, 3rd Floor, Business Center",
    "city": "Islamabad",
    "state": "ICT",
    "postalCode": "44000"
  },
  "customerNotes": "Office delivery - Ask for Muhammad at reception"
}
```

---

## 4. Get My Orders - With Pagination

### Request
```bash
# Get first page (10 orders)
curl -X GET http://localhost:3000/api/orders/my-orders?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get second page (10 orders)
curl -X GET http://localhost:3000/api/orders/my-orders?page=2&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get first page (20 orders)
curl -X GET http://localhost:3000/api/orders/my-orders?page=1&limit=20 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Response
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "_id": "...",
        "orderNumber": "ORD-20251016-12345",
        "totalPrice": 3500,
        "orderStatus": "pending",
        "paymentMethod": "COD",
        "createdAt": "2025-10-16T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalOrders": 25,
      "limit": 10
    }
  }
}
```

---

## 5. Get Single Order Details

### Request
```bash
curl -X GET http://localhost:3000/api/orders/670a1234bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Response
```json
{
  "success": true,
  "data": {
    "order": {
      "_id": "670a1234bcf86cd799439011",
      "orderNumber": "ORD-20251016-12345",
      "user": {
        "_id": "...",
        "name": "Ali Ahmed",
        "email": "ali@example.com"
      },
      "orderItems": [
        {
          "product": {
            "_id": "...",
            "name": "Vitamin C Serum",
            "slug": "vitamin-c-serum",
            "thumbnail": "...",
            "price": 2500,
            "discountPrice": 2000
          },
          "name": "Vitamin C Serum",
          "quantity": 2,
          "price": 2000,
          "sku": "VCS-001"
        }
      ],
      "shippingAddress": {
        "fullName": "Ali Ahmed",
        "phone": "03001234567",
        "address": "House 123, Street 5",
        "city": "Karachi",
        "country": "Pakistan"
      },
      "itemsPrice": 4000,
      "shippingPrice": 0,
      "taxPrice": 0,
      "totalPrice": 4000,
      "orderStatus": "pending",
      "paymentStatus": "pending",
      "paymentMethod": "COD",
      "createdAt": "2025-10-16T10:30:00.000Z"
    }
  }
}
```

---

## 6. Cancel Order

### Request
```bash
curl -X PUT http://localhost:3000/api/orders/670a1234bcf86cd799439011/cancel \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Response
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "order": {
      "_id": "670a1234bcf86cd799439011",
      "orderNumber": "ORD-20251016-12345",
      "orderStatus": "cancelled",
      "cancelledAt": "2025-10-16T11:00:00.000Z"
    }
  }
}
```

---

## Error Examples

### 1. Insufficient Stock
```json
{
  "success": false,
  "message": "Stock availability issues",
  "data": [
    "Vitamin C Serum - Only 1 items available (requested: 2)",
    "Face Wash is currently out of stock"
  ]
}
```

### 2. Validation Error
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "shippingAddress.phone",
      "message": "Phone number must be at least 10 digits"
    },
    {
      "field": "orderItems",
      "message": "Order must contain at least one item"
    }
  ]
}
```

### 3. Product Not Found
```json
{
  "success": false,
  "message": "Some products in your cart are no longer available"
}
```

### 4. Cannot Cancel Order
```json
{
  "success": false,
  "message": "Cannot cancel order. Order status is: shipped"
}
```

### 5. Order Not Found
```json
{
  "success": false,
  "message": "Order not found"
}
```

### 6. Unauthorized Access
```json
{
  "success": false,
  "message": "Not authorized to view this order"
}
```

---

## Postman Collection

You can import this as a Postman collection:

```json
{
  "info": {
    "name": "Order API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000",
      "type": "string"
    },
    {
      "key": "token",
      "value": "YOUR_JWT_TOKEN",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Place Order",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"orderItems\": [\n    {\n      \"product\": \"PRODUCT_ID\",\n      \"quantity\": 1\n    }\n  ],\n  \"shippingAddress\": {\n    \"fullName\": \"Ali Ahmed\",\n    \"phone\": \"03001234567\",\n    \"address\": \"House 123, Street 5\",\n    \"city\": \"Karachi\"\n  }\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/orders",
          "host": ["{{baseUrl}}"],
          "path": ["api", "orders"]
        }
      }
    },
    {
      "name": "Get My Orders",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/orders/my-orders?page=1&limit=10",
          "host": ["{{baseUrl}}"],
          "path": ["api", "orders", "my-orders"],
          "query": [
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "10"
            }
          ]
        }
      }
    },
    {
      "name": "Get Order by ID",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/orders/ORDER_ID",
          "host": ["{{baseUrl}}"],
          "path": ["api", "orders", "ORDER_ID"]
        }
      }
    },
    {
      "name": "Cancel Order",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/orders/ORDER_ID/cancel",
          "host": ["{{baseUrl}}"],
          "path": ["api", "orders", "ORDER_ID", "cancel"]
        }
      }
    }
  ]
}
```

---

## JavaScript/Frontend Examples

### Using Fetch API

```javascript
// 1. Place Order
const placeOrder = async (orderData) => {
  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Order placed:', data.data.order);
      return data.data.order;
    } else {
      console.error('Error:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Usage
const orderData = {
  orderItems: [
    { product: '670a1234bcf86cd799439011', quantity: 2 }
  ],
  shippingAddress: {
    fullName: 'Ali Ahmed',
    phone: '03001234567',
    address: 'House 123, Street 5',
    city: 'Karachi'
  }
};

placeOrder(orderData);

// 2. Get My Orders
const getMyOrders = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/orders/my-orders?page=${page}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// 3. Get Order by ID
const getOrderById = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/orders/${orderId}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    const data = await response.json();
    return data.data.order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// 4. Cancel Order
const cancelOrder = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/orders/${orderId}/cancel`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Order cancelled:', data.data.order);
      return data.data.order;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};
```

### Using Axios

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. Place Order
export const placeOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data.data.order;
};

// 2. Get My Orders
export const getMyOrders = async (page = 1, limit = 10) => {
  const response = await api.get(`/orders/my-orders?page=${page}&limit=${limit}`);
  return response.data.data;
};

// 3. Get Order by ID
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data.data.order;
};

// 4. Cancel Order
export const cancelOrder = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return response.data.data.order;
};
```

---

## Testing Checklist

- [ ] Place order with single item
- [ ] Place order with multiple items
- [ ] Place order with all optional fields
- [ ] Test free shipping (order ≥ PKR 3000)
- [ ] Test paid shipping (order < PKR 3000)
- [ ] Test insufficient stock error
- [ ] Test invalid product ID error
- [ ] Test missing required fields
- [ ] Get orders with pagination
- [ ] Get single order details
- [ ] Cancel pending order
- [ ] Try to cancel shipped order (should fail)
- [ ] Test unauthorized access
- [ ] Test stock restoration after cancellation