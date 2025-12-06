# Ekwip Platform - Master Architecture Documentation

**Last Updated**: 2024-12-20  
**Version**: 1.0  
**Status**: Comprehensive Architecture Overview

---

## 📐 Table of Contents

1. [Application Overview](#application-overview)
2. [Routing Architecture](#routing-architecture)
3. [API Routes Reference](#api-routes-reference)
4. [Middleware Configuration](#middleware-configuration)
5. [Database Architecture](#database-architecture)
6. [State Management & Context Providers](#state-management--context-providers)
7. [Data Flow Diagrams](#data-flow-diagrams)
8. [Frontend-Backend Integration](#frontend-backend-integration)

---

## 🎯 Application Overview

### Business Structure

**Ekwip** is a multi-business platform with three main divisions:

1. **Corporate** (`ekwip.ma`)
   - Main corporate website
   - Connect: Audiovisual Solutions distribution
   - Tech: Technology solutions
   - Contact & About pages

2. **DaaS** (`daas.ekwip.ma`)
   - Device as a Service (Equipment Rental)
   - Catalog: Rental products (`/catalogue`)
   - Shop: Sales products (`/boutique`)
   - Client Portal: B2B customer dashboard

3. **Admin Panel** (`/admin`)
   - Shared admin panel (accessible from both domains)
   - Product/Category/Brand/Attribute management
   - Order management
   - Customer management
   - Inventory management

### Technology Stack

- **Framework**: Next.js 16.0.7 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Local: Docker, Production: Neon)
- **UI Components**: Radix UI + Custom Ekwip UI Kit
- **Deployment**: Vercel
- **Package Manager**: pnpm

---

## 🗺️ Routing Architecture

### Next.js App Router Structure

```
app/
├── layout.tsx                    # Root layout (global providers only)
├── (corporate)/                  # Route group for corporate pages
│   ├── layout.tsx               # Corporate-specific layout
│   └── corporate/               # Corporate pages
│       ├── page.tsx             # Homepage (ekwip.ma/)
│       ├── connect/
│       ├── tech/
│       └── contact/
│
├── (daas)/                       # Route group for DaaS pages
│   ├── layout.tsx               # DaaS-specific layout
│   └── daas/                    # DaaS pages
│       ├── page.tsx             # DaaS homepage (daas.ekwip.ma/)
│       ├── catalogue/           # Rental catalog
│       │   ├── [slug]/         # Category pages
│       │   └── product/[slug]/ # Product pages
│       ├── boutique/            # Sales shop
│       ├── admin/               # Admin panel (duplicate)
│       └── portail-client/      # Client portal
│
├── admin/                        # Admin panel (root level)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── catalogue/
│   ├── orders/
│   └── clients/
│
├── portail-client/               # Client portal (root level)
│   └── dashboard/
│
└── api/                          # API routes
    ├── categories/
    ├── brands/
    ├── products/
    └── ...
```

### Domain Routing Logic

**Middleware** (`middleware.ts`) handles domain-based routing:

1. **API Routes** (`/api/*`): Always pass through (no rewriting)
2. **Admin Routes** (`/admin/*`, `/portail-client/*`): Pass through (accessible from both domains)
3. **DaaS Domain** (`daas.ekwip.ma` or `daas.localhost:3000`):
   - Rewrites to `/daas/*` routes
   - Example: `daas.ekwip.ma/catalogue` → `/daas/catalogue`
4. **Corporate Domain** (`ekwip.ma` or `localhost:3000`):
   - Root (`/`) → `/corporate`
   - `/connect`, `/tech`, `/contact` → `/corporate/connect`, etc.
   - Default: Rewrite to `/corporate/*`

### Route Access Patterns

| Domain | Route | Actual Path | Layout |
|--------|-------|-------------|--------|
| `ekwip.ma/` | `/` | `/corporate` | CorporateLayout |
| `ekwip.ma/connect` | `/connect` | `/corporate/connect` | CorporateLayout |
| `daas.ekwip.ma/` | `/` | `/daas` | DaasLayout |
| `daas.ekwip.ma/catalogue` | `/catalogue` | `/daas/catalogue` | DaasLayout |
| `ekwip.ma/admin` | `/admin` | `/admin` | AdminLayout |
| `daas.ekwip.ma/admin` | `/admin` | `/admin` | AdminLayout |

---

## 🔌 API Routes Reference

### Core Entities API

#### Categories

```
GET    /api/categories              # List all categories
       ?active=true                 # Filter: active only
       ?parentId=cat-xxx            # Filter: by parent

POST   /api/categories              # Create category
Body: { name, slug, description, ... }

GET    /api/categories/[id]         # Get category by ID or slug

PUT    /api/categories/[id]         # Update category

DELETE /api/categories/[id]         # Delete category
```

**Database Query**: Uses template strings, transforms snake_case → camelCase

#### Brands

```
GET    /api/brands                  # List all brands
       ?active=true                 # Filter: active only

POST   /api/brands                  # Create brand

GET    /api/brands/[id]             # Get brand by ID or slug

PUT    /api/brands/[id]             # Update brand

DELETE /api/brands/[id]             # Delete brand
```

**Database Query**: Uses template strings ✅

#### Products

```
GET    /api/products                # List products
       ?categoryId=cat-xxx          # Filter by category
       ?brandId=brand-xxx           # Filter by brand
       ?productType=rent|sale       # Filter by type
       ?status=active               # Filter by status
       ?featured=true               # Filter featured
       ?search=keyword              # Search
       ?limit=100&offset=0          # Pagination

POST   /api/products                # Create product

GET    /api/products/[id]           # Get product by ID or slug

PUT    /api/products/[id]           # Update product

DELETE /api/products/[id]           # Delete product
```

**Database Query**: Uses template strings with conditional filters ✅

#### Attributes

```
GET    /api/attributes              # List all attributes

POST   /api/attributes              # Create attribute

GET    /api/attributes/[id]         # Get attribute by ID

PUT    /api/attributes/[id]         # Update attribute

DELETE /api/attributes/[id]         # Delete attribute
```

### Orders & Clients API

#### Orders

```
GET    /api/orders                  # List orders
       ?status=pending              # Filter by status
       ?clientId=client-xxx         # Filter by client
       ?orderType=rental|sale       # Filter by type

POST   /api/orders                  # Create order

GET    /api/orders/[id]             # Get order details

PUT    /api/orders/[id]             # Update order status

DELETE /api/orders/[id]             # Cancel order
```

#### Clients

```
GET    /api/clients                 # List clients
       ?status=active               # Filter by status
       ?search=keyword              # Search

POST   /api/clients                 # Create client

GET    /api/clients/[id]            # Get client details

PUT    /api/clients/[id]            # Update client

DELETE /api/clients/[id]            # Delete client
```

### Other API Routes

- `/api/suppliers` - Supplier management
- `/api/customers` - Customer management (B2C)
- `/api/quote-requests` - Quote request handling
- `/api/dashboard/stats` - Dashboard statistics
- `/api/contact-coming-soon` - Contact form

### Debug API Routes

- `/api/debug/categories` - Debug categories data
- `/api/debug/brands` - Debug brands data
- `/api/debug/products` - Debug products data

---

## 🔄 Middleware Configuration

### File: `middleware.ts`

**Purpose**: Multi-domain routing with Next.js App Router

**Logic Flow**:

```
Request → Middleware
  ├─ Skip: /_next, /static, /api, files with extensions
  ├─ Skip: /admin, /portail-client (pass through)
  │
  ├─ DaaS Domain? (daas.*)
  │   └─ Rewrite to /daas/*
  │
  └─ Corporate Domain (default)
      ├─ / → /corporate
      ├─ /connect, /tech, /contact → /corporate/*
      └─ Default → /corporate/*
```

**Key Rules**:

1. API routes (`/api/*`) always pass through
2. Admin routes accessible from both domains
3. DaaS subdomain rewrites to `/daas/*` paths
4. Corporate domain rewrites to `/corporate/*` paths
5. Route groups `(corporate)` and `(daas)` don't appear in URLs

---

## 💾 Database Architecture

### Connection Strategy

**File**: `lib/db.ts`

**Auto-Detection**:
- **Local**: `DATABASE_URL` contains `localhost`, `127.0.0.1`, or `postgres://ekwip`
  - Uses `postgres` package
  - Connection pooling enabled
- **Production**: Any other `DATABASE_URL` (assumed Neon)
  - Uses `@neondatabase/serverless` package
  - Serverless connection

**Unified SQL Function**:
```typescript
export const sql = async (
  query: TemplateStringsArray | string,
  ...params: any[]
): Promise<any[]>
```

**Supports**:
- Template strings (preferred, auto-parameterized)
- String queries with parameters (for dynamic WHERE clauses)

### Database Schema

**Core Tables**:
- `categories` - Product categories
- `brands` - Product brands
- `attributes` - Product attributes (specifications)
- `products` - Main products table
- `orders` - Orders
- `order_items` - Order line items
- `clients` - B2B clients
- `customers` - B2C customers
- `suppliers` - Suppliers
- `warehouses` - Warehouse locations
- `stock` - Inventory tracking
- `admin_users` - Admin accounts
- `shop_settings` - Shop configuration

### Column Naming Convention

- **Database**: `snake_case` (e.g., `is_active`, `product_count`)
- **API Response**: `camelCase` (e.g., `isActive`, `productCount`)
- **Transformation**: Done in API routes

---

## 🔄 State Management & Context Providers

### Context Provider Hierarchy

**Root Layout** (`app/layout.tsx`):
```
LanguageProvider
  └─ AuthProvider
      └─ ProductsProvider
          └─ CategoriesProvider
              └─ BrandsProvider
                  └─ AttributesProvider
                      └─ NeedsListProvider (Cart)
                          └─ DataSync
                              └─ {children}
```

**Admin Layout** (`app/admin/layout.tsx`):
```
AdminAuthProvider
  └─ CategoriesProvider
      └─ BrandsProvider
          └─ AttributesProvider
              └─ ProductsProvider
                  └─ AdminSidebar + AdminTopbar
                      └─ {children}
```

### Context Providers

#### 1. ProductsProvider (`contexts/products-context.tsx`)

**Purpose**: Manage products state

**Data Source**: `/api/products`

**State**:
- `products: Product[]`
- `loading: boolean`
- `error: string | null`

**Methods**:
- `addProduct()` - Create product
- `updateProduct()` - Update product
- `deleteProduct()` - Delete product
- `getProduct()` - Get by ID
- `refreshProducts()` - Reload from API

#### 2. CategoriesProvider (`contexts/categories-context.tsx`)

**Purpose**: Manage categories state

**Data Source**: `/api/categories`

**State**: Similar to ProductsProvider

**Methods**: Similar pattern (add, update, delete, get, refresh)

#### 3. BrandsProvider (`contexts/brands-context.tsx`)

**Purpose**: Manage brands state

**Data Source**: `/api/brands`

#### 4. AttributesProvider (`contexts/attributes-context.tsx`)

**Purpose**: Manage attributes state

**Data Source**: `/api/attributes`

#### 5. AuthProvider (`contexts/auth-context.tsx`)

**Purpose**: Manage customer authentication

**Current**: Mocked with localStorage

**TODO**: Implement real authentication

#### 6. AdminAuthProvider (`contexts/admin-auth-context.tsx`)

**Purpose**: Manage admin authentication

**Current**: Mocked (auto-logged in as admin)

**TODO**: Implement real admin authentication

#### 7. NeedsListProvider (`contexts/cart-context.tsx`)

**Purpose**: Manage cart/needs list

**Data Source**: localStorage (for now)

#### 8. LanguageProvider (`contexts/language-context.tsx`)

**Purpose**: Manage language (French/Arabic)

**Current**: French only, Arabic UI prepared

### DataSync Component

**Purpose**: Listen for localStorage changes and force page reload

**Usage**: Helps sync admin changes across tabs

**Location**: Rendered in root layout

---

## 🔗 Data Flow Diagrams

### Frontend Catalog Data Flow

```
User visits /catalogue/ordinateurs-portables
  ↓
Middleware: Rewrite to /daas/catalogue/ordinateurs-portables
  ↓
Page Component: app/(daas)/daas/catalogue/[slug]/page.tsx
  ↓
useCategories() hook (from CategoriesProvider)
  ↓
Fetches: GET /api/categories
  ↓
API Route: app/api/categories/route.ts
  ↓
Database Query: SELECT * FROM categories WHERE slug = 'ordinateurs-portables'
  ↓
Transform: snake_case → camelCase
  ↓
Return JSON
  ↓
Context updates state
  ↓
Component renders with category data
```

### Admin Panel Data Flow

```
User visits /admin/catalogue/categories
  ↓
Middleware: Pass through (no rewrite)
  ↓
Page Component: app/admin/catalogue/categories/page.tsx
  ↓
AdminLayout: Wraps with AdminAuthProvider + all data providers
  ↓
CategoriesProvider: Fetches from /api/categories
  ↓
API Route: Same as frontend
  ↓
Database Query: SELECT * FROM categories
  ↓
Transform & Return
  ↓
Context: Sets categories state
  ↓
Component: Renders table with categories
```

### Product Creation Flow (Admin)

```
Admin creates product in /admin/catalogue/products/create
  ↓
Form submission
  ↓
ProductsContext.addProduct()
  ↓
POST /api/products
  ↓
API Route validates & inserts into database
  ↓
Updates category.product_count
  ↓
Updates brand.product_count
  ↓
Returns created product
  ↓
Context updates state
  ↓
UI shows success + redirects to product list
```

---

## 🔍 Frontend-Backend Integration

### API Consumption Patterns

#### 1. Context-Based (Recommended)

**Used by**: Admin panel, catalog pages

**Pattern**:
```typescript
const { categories, loading, error } = useCategories()
```

**Advantages**:
- Centralized state management
- Automatic loading/error states
- Shared data across components
- Refresh capability

#### 2. Direct Fetch

**Used by**: Some components (e.g., ProductTabs)

**Pattern**:
```typescript
const [data, setData] = useState([])
useEffect(() => {
  fetch('/api/categories').then(res => res.json()).then(setData)
}, [])
```

**Disadvantages**:
- Duplicate requests
- No shared state
- Manual loading/error handling

### Data Transformation

**Database → API → Frontend**:

1. **Database**: `snake_case` columns
   ```sql
   SELECT is_active, product_count FROM categories
   ```

2. **API Route**: Transform to `camelCase`
   ```typescript
   {
     isActive: c.is_active,
     productCount: c.product_count
   }
   ```

3. **Frontend Context**: Uses `camelCase`
   ```typescript
   category.isActive
   category.productCount
   ```

### Error Handling

**API Routes**:
- Try-catch blocks
- Console.error logging
- Returns `{ error: "message" }` with status codes

**Frontend Contexts**:
- Sets error state
- Console.error logging
- UI can display errors

**Frontend Components**:
- Check `loading` state
- Check `error` state
- Display appropriate UI

---

## 🚨 Current Issues & Fixes

### Fixed Issues

1. ✅ **API Routes Using String Queries**
   - **Fix**: Converted to template strings
   - **Files**: `/api/categories`, `/api/brands`, `/api/products`

2. ✅ **Missing useEffect Import**
   - **Fix**: Added to categories page

3. ✅ **Admin Route Blocking**
   - **Fix**: Middleware now skips `/admin` routes

4. ✅ **Duplicate Navbars**
   - **Fix**: Removed global Navbar from root layout

### Known Issues

1. ⚠️ **Categories Not Showing in Admin Panel**
   - **Status**: Data exists in database (verified)
   - **Likely Cause**: Context not loading correctly or API error
   - **Next**: Check API response and context loading

2. ⚠️ **404 on Category Pages**
   - **Status**: Category exists in database (`ordinateurs-portables`)
   - **Likely Cause**: Routing or data fetching issue
   - **Next**: Debug category page component

3. ⚠️ **Mocked Authentication**
   - **Status**: Both customer and admin auth are mocked
   - **Risk**: Security vulnerability
   - **Priority**: High (but separate task)

4. ⚠️ **Hardcoded Store Products**
   - **Status**: `lib/store-products.ts` exists but not used
   - **Action**: Should be removed or integrated

---

## 📊 API Route Status

### ✅ Fully Functional

- `/api/categories` - GET, POST ✅
- `/api/categories/[id]` - GET, PUT, DELETE ✅
- `/api/brands` - GET, POST ✅
- `/api/brands/[id]` - GET, PUT, DELETE ✅
- `/api/products` - GET, POST ✅ (with template strings)
- `/api/products/[id]` - GET, PUT, DELETE ✅
- `/api/attributes` - GET, POST ✅

### ⚠️ Needs Review

- `/api/orders` - Uses string queries (should convert)
- `/api/clients` - Uses string queries (should convert)
- `/api/customers` - Needs review
- `/api/suppliers` - Needs review

### 🔍 Debug Endpoints

- `/api/debug/categories` ✅
- `/api/debug/brands` ✅
- `/api/debug/products` ✅

---

## 🎯 Next Steps

### Immediate Actions

1. **Test API Routes**:
   - Verify all routes return correct data
   - Check error handling
   - Test with production database

2. **Fix Admin Panel**:
   - Debug why categories don't show
   - Check context loading
   - Verify API responses

3. **Fix Category Pages**:
   - Debug 404 errors
   - Verify routing works
   - Check data fetching

### Architecture Improvements

1. **Standardize API Routes**:
   - All routes should use template strings
   - Consistent error handling
   - Consistent transformation logic

2. **Improve State Management**:
   - Consider React Query for better caching
   - Optimize context providers
   - Reduce duplicate API calls

3. **Authentication**:
   - Implement real auth (NextAuth.js or similar)
   - Replace mocked auth
   - Add session management

---

## 📝 File Organization

### Key Directories

```
app/
├── api/                    # API routes (backend)
├── (corporate)/           # Corporate pages
├── (daas)/                # DaaS pages
├── admin/                 # Admin panel
└── portail-client/        # Client portal

contexts/                  # React Context providers
components/                # Reusable components
  ├── ui/                 # UI component library
  ├── admin/              # Admin-specific components
  └── corporate/          # Corporate components

lib/                      # Utilities
  ├── db.ts              # Database connection
  └── utils.ts           # Helper functions

types/                    # TypeScript type definitions
  └── admin.ts           # Admin types

scripts/                  # Utility scripts
  ├── verify-database.ts # Database verification
  └── *.sql              # SQL scripts
```

---

**Document Version**: 1.0  
**Last Updated**: 2024-12-20 01:15 UTC  
**Maintained By**: Development Team

