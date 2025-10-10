# Prisma Database Setup - SheetMask E-Commerce

## 🗄️ Database: MongoDB

This project uses MongoDB as the database with Prisma as the ORM.

## 📋 Schema Overview

### Models Included:

1. **User** - Customer and admin accounts
2. **Address** - Shipping addresses
3. **Product** - Sheet mask products
4. **ProductReview** - Customer reviews
5. **Order** - Order records
6. **OrderItem** - Items in orders
7. **Coupon** - Discount coupons
8. **Newsletter** - Email subscribers

## 🚀 Getting Started

### 1. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Start MongoDB
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env.local` with your connection string

### 2. Configure Environment Variable

Update `.env.local`:
```env
# Local MongoDB
DATABASE_URL="mongodb://localhost:27017/sheetmask_db"

# MongoDB Atlas (replace with your connection string)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/sheetmask_db?retryWrites=true&w=majority"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. (Optional) Seed Database

```bash
npx prisma db seed
```

## 📝 Useful Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Open Prisma Studio (visual database browser)
npx prisma studio

# Format schema file
npx prisma format

# Validate schema
npx prisma validate

# Push schema to database (development only)
npx prisma db push

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

## 🔧 Usage in Code

```typescript
import { prisma } from '@/lib/prisma';

// Get all products
const products = await prisma.product.findMany();

// Create a user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
    role: 'CUSTOMER',
  },
});

// Get user with relations
const userWithOrders = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    orders: true,
    addresses: true,
  },
});
```

## 📊 Schema Enums

### ProductCategory
- `HYDRATING` - Hydrating masks
- `BRIGHTENING` - Brightening masks
- `ANTI_AGING` - Anti-aging masks
- `PURIFYING` - Purifying masks
- `SOOTHING` - Soothing masks

### SkinType
- `DRY` - Dry skin
- `OILY` - Oily skin
- `COMBINATION` - Combination skin
- `SENSITIVE` - Sensitive skin
- `NORMAL` - Normal skin

### OrderStatus
- `PENDING` - Order placed, awaiting processing
- `PROCESSING` - Order being prepared
- `SHIPPED` - Order shipped
- `DELIVERED` - Order delivered
- `CANCELLED` - Order cancelled

### PaymentStatus
- `PENDING` - Payment pending
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `REFUNDED` - Payment refunded

### Role
- `CUSTOMER` - Regular customer
- `ADMIN` - Admin user

## 🔒 Best Practices

1. **Always use transactions** for operations that modify multiple records
2. **Use proper indexes** for frequently queried fields (MongoDB handles this automatically)
3. **Validate data** before database operations
4. **Handle errors** gracefully
5. **Use select/include** to fetch only needed fields
6. **Close connections** properly (handled by singleton pattern)

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

