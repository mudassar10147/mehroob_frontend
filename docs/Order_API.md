# Order API Documentation

## Overview
The Order API provides endpoints for managing customer orders with Cash on Delivery (COD) payment method. This includes placing orders, viewing order history, retrieving order details, and cancelling orders.

## Base URL
```
/api/orders
```

## Authentication
All order endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Place Order (COD)

**POST** `/api/orders`

Creates a new order with Cash on Delivery payment method.

#### Request Body
```json
{
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
    "fullName": "John Doe",
    "phone": "+92-300-1234567",
    "email": "john@example.com",
    "address": "123 Main Street, Apartment 4B",
    "city": "Karachi",
    "state": "Sindh",
    "postalCode": "75500",
    "country": "Pakistan"
  },
  "paymentMethod": "COD",
  "customerNotes": "Please call before delivery"
}
```

#### Field Descriptions

**orderItems** (required, array)
- Array of order items with product IDs and quantities
- Each item must contain:
  - `product` (required): MongoDB ObjectId of the product
  - `quantity` (required): Quantity to order (min: 1)

**shippingAddress** (required, object)
- `fullName` (required): Customer's full name (2-100 chars)
- `phone` (required): Contact phone number (10-20 chars)
- `email` (optional): Email address
- `address` (required): Complete delivery address (10-200 chars)
- `city` (required): City name (2-50 chars)
- `state` (optional): State/Province name
- `postalCode` (optional): ZIP/Postal code
- `country` (optional): Country (default: "Pakistan")

**paymentMethod** (optional)
- Payment method (default: "COD")
- Currently only "COD" is supported

**customerNotes** (optional)
- Special instructions or notes (max: 500 chars)

#### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "order": {
      "_id": "507f1f77bcf86cd799439011",
      "user": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "orderItems": [
        {
          "product": {
            "_id": "507f1f77bcf86cd799439011",
            "name": "Skin Care Cream",
            "slug": "skin-care-cream",
            "thumbnail": "https://example.com/image.jpg"
          },
          "name": "Skin Care Cream",
          "quantity": 2,
          "price": 1500,
          "image": "https://example.com/image.jpg",
          "sku": "SKU-001"
        }
      ],
      "shippingAddress": {
        "fullName": "John Doe",
        "phone": "+92-300-1234567",
        "email": "john@example.com",
        "address": "123 Main Street, Apartment 4B",
        "city": "Karachi",
        "state": "Sindh",
        "postalCode": "75500",
        "country": "Pakistan"
      },
      "paymentMethod": "COD",
      "paymentStatus": "pending",
      "itemsPrice": 3000,
      "shippingPrice": 0,
      "taxPrice": 0,
      "totalPrice": 3000,
      "orderStatus": "pending",
      "orderNumber": "ORD-20251016-12345",
      "customerNotes": "Please call before delivery",
      "createdAt": "2025-10-16T10:30:00.000Z",
      "updatedAt": "2025-10-16T10:30:00.000Z"
    }
  }
}
```

#### Error Responses

**400 Bad Request** - Validation Error
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "orderItems",
      "message": "Order must contain at least one item"
    }
  ]
}
```

**400 Bad Request** - Stock Issues
```json
{
  "success": false,
  "message": "Stock availability issues",
  "data": [
    "Skin Care Cream - Only 1 items available (requested: 2)",
    "Face Wash is currently out of stock"
  ]
}
```

**401 Unauthorized**
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

#### Business Logic
1. **Product Validation**: Verifies all products exist and are active
2. **Stock Check**: Validates sufficient stock is available for each item
3. **Price Calculation**: Uses current product prices (including discounts)
4. **Shipping Calculation**: 
   - FREE shipping for orders ≥ PKR 3000
   - PKR 150 shipping for orders < PKR 3000
5. **Stock Update**: Automatically reduces product stock and increases sold count
6. **Order Number**: Generates unique order number (format: ORD-YYYYMMDD-XXXXX)

---

### 2. Get My Orders

**GET** `/api/orders/my-orders`

Retrieves all orders for the authenticated user with pagination.

#### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

#### Example Request
```
GET /api/orders/my-orders?page=1&limit=10
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "orderNumber": "ORD-20251016-12345",
        "orderItems": [
          {
            "product": {
              "name": "Skin Care Cream",
              "slug": "skin-care-cream",
              "thumbnail": "https://example.com/image.jpg"
            },
            "quantity": 2,
            "price": 1500
          }
        ],
        "totalPrice": 3000,
        "orderStatus": "pending",
        "paymentStatus": "pending",
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

### 3. Get Order by ID

**GET** `/api/orders/:id`

Retrieves detailed information about a specific order.

#### URL Parameters
- `id`: Order ID (MongoDB ObjectId)

#### Example Request
```
GET /api/orders/507f1f77bcf86cd799439011
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "order": {
      "_id": "507f1f77bcf86cd799439011",
      "user": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "orderItems": [
        {
          "product": {
            "_id": "507f1f77bcf86cd799439011",
            "name": "Skin Care Cream",
            "slug": "skin-care-cream",
            "thumbnail": "https://example.com/image.jpg",
            "images": ["https://example.com/image1.jpg"],
            "price": 2000,
            "discountPrice": 1500
          },
          "name": "Skin Care Cream",
          "quantity": 2,
          "price": 1500,
          "image": "https://example.com/image.jpg",
          "sku": "SKU-001"
        }
      ],
      "shippingAddress": {
        "fullName": "John Doe",
        "phone": "+92-300-1234567",
        "email": "john@example.com",
        "address": "123 Main Street, Apartment 4B",
        "city": "Karachi",
        "state": "Sindh",
        "postalCode": "75500",
        "country": "Pakistan"
      },
      "paymentMethod": "COD",
      "paymentStatus": "pending",
      "itemsPrice": 3000,
      "shippingPrice": 0,
      "taxPrice": 0,
      "totalPrice": 3000,
      "orderStatus": "pending",
      "orderNumber": "ORD-20251016-12345",
      "customerNotes": "Please call before delivery",
      "createdAt": "2025-10-16T10:30:00.000Z",
      "updatedAt": "2025-10-16T10:30:00.000Z"
    }
  }
}
```

#### Error Responses

**404 Not Found**
```json
{
  "success": false,
  "message": "Order not found"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "message": "Not authorized to view this order"
}
```

---

### 4. Cancel Order

**PUT** `/api/orders/:id/cancel`

Cancels an existing order and restores product stock.

#### URL Parameters
- `id`: Order ID (MongoDB ObjectId)

#### Example Request
```
PUT /api/orders/507f1f77bcf86cd799439011/cancel
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "order": {
      "_id": "507f1f77bcf86cd799439011",
      "orderNumber": "ORD-20251016-12345",
      "orderStatus": "cancelled",
      "cancelledAt": "2025-10-16T11:00:00.000Z",
      "totalPrice": 3000
    }
  }
}
```

#### Error Responses

**404 Not Found**
```json
{
  "success": false,
  "message": "Order not found"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "message": "Not authorized to cancel this order"
}
```

**400 Bad Request**
```json
{
  "success": false,
  "message": "Cannot cancel order. Order status is: shipped"
}
```

#### Business Logic
- Only orders with status `pending` or `processing` can be cancelled
- Automatically restores product stock when cancelled
- Updates best-seller status of products

---

## Order Status Flow

```
pending → processing → confirmed → shipped → delivered
           ↓
       cancelled
```

### Status Descriptions

- **pending**: Order placed, awaiting confirmation
- **processing**: Order confirmed, being prepared
- **confirmed**: Order ready for shipment
- **shipped**: Order dispatched for delivery
- **delivered**: Order successfully delivered
- **cancelled**: Order cancelled by user or admin

---

## Payment Status

- **pending**: Payment not yet received (COD orders)
- **paid**: Payment received
- **failed**: Payment failed (not applicable for COD)

---

## Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation Error) |
| 401 | Unauthorized (No/Invalid Token) |
| 403 | Forbidden (Not Authorized) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Testing with cURL

### Place Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "orderItems": [
      {
        "product": "507f1f77bcf86cd799439011",
        "quantity": 2
      }
    ],
    "shippingAddress": {
      "fullName": "John Doe",
      "phone": "+92-300-1234567",
      "address": "123 Main Street",
      "city": "Karachi",
      "country": "Pakistan"
    }
  }'
```

### Get My Orders
```bash
curl -X GET http://localhost:3000/api/orders/my-orders?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Order by ID
```bash
curl -X GET http://localhost:3000/api/orders/ORDER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Cancel Order
```bash
curl -X PUT http://localhost:3000/api/orders/ORDER_ID/cancel \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Testing with Postman

1. **Set Base URL**: `http://localhost:3000`
2. **Add Authorization**: 
   - Type: Bearer Token
   - Token: Your JWT token from login
3. **Create Collection**: Save all order endpoints for easy testing
4. **Environment Variables**: Store token and base URL

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Order numbers are unique and auto-generated
- Stock is automatically managed when orders are placed/cancelled
- Free shipping applies for orders PKR 3000 and above
- Currently supports only COD payment method
- Users can only view and manage their own orders (except admins)
- Orders can only be cancelled while in `pending` or `processing` status

---

## Future Enhancements (Not Yet Implemented)

- Online payment methods (Stripe, PayPal, JazzCash, EasyPaisa)
- Order tracking with real-time updates
- Order reviews and ratings
- Admin endpoints for order management
- Email notifications for order updates
- Invoice generation (PDF)
- Bulk order operations
- Order refunds and returns