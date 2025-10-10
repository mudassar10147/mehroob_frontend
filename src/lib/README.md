# Lib Directory

This directory contains utility functions, configurations, and shared logic.

## Files

### `utils.ts`
General utility functions used throughout the application:
- `cn()` - Merge Tailwind CSS classes
- `formatPrice()` - Format numbers as currency
- `formatDate()` - Format dates
- `debounce()` - Debounce function calls
- `truncate()` - Truncate text
- And more...

### `constants.ts`
Application-wide constants:
- API configuration
- Route paths
- Product categories
- Validation rules
- Error messages
- Local storage keys
- And more...

### `api.ts`
API client configuration and endpoint definitions:
- Axios instance with interceptors
- Authentication token handling
- Error handling
- API endpoint definitions for all resources

### `validations.ts`
Form validation schemas using Zod:
- Authentication schemas (login, register)
- Profile schemas
- Address schemas
- Checkout schemas
- Contact form schemas
- And more...

## Usage Examples

### Using utilities
```tsx
import { formatPrice, cn } from '@/lib/utils';

const price = formatPrice(29.99); // "$29.99"
const classes = cn('btn', isActive && 'active'); // Merged classes
```

### Using constants
```tsx
import { ROUTES, CATEGORIES } from '@/lib/constants';

<Link href={ROUTES.PRODUCTS}>Products</Link>
```

### Using API client
```tsx
import { api } from '@/lib/api';

const products = await api.products.getAll();
const user = await api.auth.me();
```

### Using validations
```tsx
import { loginSchema } from '@/lib/validations';

const result = loginSchema.safeParse({ email, password });
if (!result.success) {
  console.error(result.error);
}
```

