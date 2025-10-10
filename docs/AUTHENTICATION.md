# Authentication & Authorization

Complete authentication setup using NextAuth.js with MongoDB and Prisma.

## 🔐 Features

- ✅ Email/Password authentication
- ✅ Google OAuth authentication
- ✅ JWT-based sessions
- ✅ Role-based access control (Customer/Admin)
- ✅ Password hashing with bcrypt
- ✅ MongoDB session storage
- ✅ Type-safe authentication

## 📦 Stack

- **NextAuth.js** v4 - Authentication framework
- **Prisma** - Database ORM with MongoDB adapter
- **bcryptjs** - Password hashing
- **JWT** - Secure session tokens

## 🚀 Setup

### 1. Environment Variables

Add to `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. Database

The Prisma schema includes:
- `User` - User accounts
- `Account` - OAuth accounts
- `Session` - Active sessions
- `VerificationToken` - Email verification tokens

Push schema to database:
```bash
npm run db:push
```

### 3. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

## 💻 Usage

### Client Components

```tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function UserProfile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <button onClick={() => signIn()}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {session?.user?.name}</p>
      <p>Role: {session?.user?.role}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Server Components

```tsx
import { getCurrentUser, requireAuth } from '@/lib/auth-helpers';

export default async function ProfilePage() {
  // Get current user (returns null if not authenticated)
  const user = await getCurrentUser();

  // Or require authentication (throws error if not authenticated)
  const user = await requireAuth();

  // Or require admin role
  const admin = await requireAdmin();

  return <div>Welcome {user.name}</div>;
}
```

### API Routes

```tsx
import { requireAuth } from '@/lib/auth-helpers';

export async function GET() {
  // Require authentication
  const user = await requireAuth();

  // Your logic here
  return Response.json({ user });
}
```

### Middleware

Protected routes are configured in `src/middleware.ts`:
- `/profile` - Requires authentication
- `/orders` - Requires authentication
- `/checkout` - Requires authentication

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in (handled by NextAuth)
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/callback/google` - Google OAuth callback

### Register Example

```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123',
  }),
});

const data = await response.json();
```

### Sign In Example

```typescript
import { signIn } from 'next-auth/react';

// Email/Password
await signIn('credentials', {
  email: 'john@example.com',
  password: 'SecurePass123',
  redirect: false,
});

// Google OAuth
await signIn('google', { callbackUrl: '/' });
```

## 🛡️ Authorization

### Role-Based Access

Users have roles: `CUSTOMER` or `ADMIN`

```tsx
// Check role in component
if (session?.user?.role === 'ADMIN') {
  // Admin-only content
}

// Server-side role check
import { requireAdmin } from '@/lib/auth-helpers';

const admin = await requireAdmin(); // Throws if not admin
```

## 📋 User Model

```prisma
model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  email         String    @unique
  name          String?
  password      String?   // Null for OAuth users
  image         String?
  role          Role      @default(CUSTOMER)
  emailVerified DateTime?
  
  accounts      Account[]  // OAuth accounts
  sessions      Session[]  // Active sessions
  addresses     Address[]
  orders        Order[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}
```

## 🔒 Security Features

1. **Password Hashing** - Passwords hashed with bcrypt (12 rounds)
2. **JWT Tokens** - Secure session tokens
3. **HTTPS Only** - Cookies set to secure in production
4. **CSRF Protection** - Built-in CSRF protection
5. **Session Rotation** - Sessions rotated on sign-in
6. **OAuth Security** - State parameter validation

## 🎨 Login/Register Pages

Create login and register pages:

```tsx
// app/(auth)/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.ok) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign In</button>
      
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </form>
  );
}
```

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [MongoDB Setup](https://www.mongodb.com/docs/manual/installation/)

## 🔍 Troubleshooting

### "Invalid credentials" error
- Check password is correct
- Verify user exists in database
- Ensure password was hashed during registration

### Google OAuth not working
- Verify Google Client ID and Secret in `.env.local`
- Check authorized redirect URIs in Google Console
- Ensure NEXTAUTH_URL is set correctly

### Session not persisting
- Check NEXTAUTH_SECRET is set
- Verify cookies are enabled in browser
- Check database connection is working

