# SheetMask E-Commerce Frontend

A modern, scalable Next.js e-commerce application for selling premium sheet masks.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Form Validation**: Zod + React Hook Form
- **HTTP Client**: Axios
- **Linting**: ESLint
- **Formatting**: Prettier

## 📁 Project Structure

```
sheetmask_frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/                   # Shop route group
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   └── orders/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── loading.tsx               # Global loading
│   │   ├── error.tsx                 # Global error
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # Base UI components
│   │   ├── layout/                   # Layout components
│   │   ├── product/                  # Product components
│   │   └── cart/                     # Cart components
│   │
│   ├── lib/                          # Utilities & config
│   │   ├── api.ts                    # API client
│   │   ├── utils.ts                  # Helper functions
│   │   ├── constants.ts              # Constants
│   │   └── validations.ts            # Zod schemas
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useCart.ts                # Cart management hook
│   │   └── useProducts.ts            # Products hook
│   │
│   ├── store/                        # Zustand state management
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   └── productsSlice.ts
│   │   └── index.ts
│   │
│   ├── types/                        # TypeScript definitions
│   │   ├── user.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── api.ts
│   │
│   └── middleware.ts                 # Next.js middleware
│
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── tests/                            # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local                        # Local env variables
├── .env.example                      # Env template
├── application_setup_guide.txt       # Setup guide
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sheetmask_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your actual values.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### App Router
Using Next.js 13+ App Router for:
- Server Components by default
- Built-in loading and error states
- Route groups for organization
- API routes colocated with pages

### State Management
- **Zustand** for client state (cart, filters)
- **React hooks** for server state
- **Context** for theme/auth (when needed)

### Styling
- **Tailwind CSS** for utility-first styling
- Component-based design system
- Responsive and mobile-first

### Type Safety
- **TypeScript** throughout the codebase
- Strict mode enabled
- Zod for runtime validation

## 📚 Key Features (Planned)

- [ ] User authentication (email/password, OAuth)
- [ ] Product catalog with filters
- [ ] Shopping cart management
- [ ] Checkout flow with Stripe
- [ ] Order management
- [ ] User profile and order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Newsletter subscription
- [ ] Admin dashboard

## 🔐 Environment Variables

See `.env.example` for all required environment variables:
- API endpoints
- Authentication secrets
- Payment gateway keys
- Email service credentials
- Analytics IDs

## 📖 Documentation

- **Setup Guide**: See `application_setup_guide.txt`
- **Component Docs**: See `src/components/README.md`
- **Hooks Docs**: See `src/hooks/README.md`
- **Lib Docs**: See `src/lib/README.md`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and tests
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📧 Contact

For questions or support, contact the development team.

---

Built with ❤️ using Next.js and TypeScript
