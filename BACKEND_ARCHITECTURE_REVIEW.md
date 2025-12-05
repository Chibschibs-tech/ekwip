# Ekwip Web Application - Backend Architecture Review

## Executive Summary

**Architecture Score: 5.5/10**

The application has a solid database foundation with PostgreSQL/Neon, but suffers from **critical architectural issues** including dual data systems (database + localStorage), inconsistent data flow, and missing real-time synchronization. The backend API is well-structured but underutilized by the frontend.

---

## Database Architecture

### Schema Overview

The database uses **PostgreSQL** (local) or **Neon** (production) with a well-designed relational schema:

#### Core Tables:
1. **Categories** - Hierarchical category structure with parent-child relationships
2. **Brands** - Brand management with product counts
3. **Attributes** - Flexible attribute system (select, text, number, color) with category associations
4. **Products** - Comprehensive product data with:
   - JSONB fields for images, attributes, tags, rental_durations, variations
   - Support for both rental and sale product types
   - Stock management with low stock thresholds
5. **Stock** - Multi-warehouse inventory tracking
6. **Stock Movements** - Audit trail for inventory changes
7. **Customers** - Customer management with addresses
8. **Orders** - Order management with items
9. **Quote Requests** - "Ma liste de besoins" functionality
10. **Suppliers** - Supplier management
11. **Coupons** - Discount management
12. **Banners** - Content management
13. **Pages** - CMS functionality
14. **Admin Users** - Admin authentication
15. **Shop Settings** - Configuration

### Database Strengths ✅

1. **Well-normalized schema** - Proper foreign keys and relationships
2. **JSONB usage** - Flexible storage for attributes, images, rental_durations
3. **Indexes** - Performance indexes on frequently queried columns
4. **Audit fields** - created_at, updated_at on all tables
5. **Soft deletes** - Status fields instead of hard deletes
6. **Multi-warehouse support** - Stock tracking per warehouse
7. **Comprehensive order system** - Full order lifecycle management

### Database Issues ⚠️

1. **No migrations system** - SQL files are manual, no versioning
2. **Missing constraints** - Some business rules not enforced at DB level
3. **No full-text search** - Product search uses ILIKE (slow for large catalogs)
4. **No caching layer** - Every request hits the database
5. **No database backups strategy** - Not visible in codebase

---

## API Architecture

### API Structure

**Location:** `app/api/`

**RESTful Endpoints:**
- `/api/products` - GET, POST
- `/api/products/[id]` - GET, PUT, DELETE
- `/api/categories` - GET, POST
- `/api/categories/[id]` - GET, PUT, DELETE
- `/api/brands` - GET, POST
- `/api/brands/[id]` - GET, PUT, DELETE
- `/api/attributes` - GET, POST
- `/api/attributes/[id]` - GET, PUT, DELETE
- `/api/clients` - GET, POST
- `/api/clients/[id]` - GET, PUT, DELETE
- `/api/orders` - GET, POST
- `/api/orders/[id]` - GET, PUT
- `/api/quote-requests` - GET, POST
- `/api/dashboard/stats` - GET
- `/api/suppliers` - GET, POST
- `/api/customers` - GET, POST
- `/api/contact-coming-soon` - POST

### API Strengths ✅

1. **Consistent structure** - All endpoints follow similar patterns
2. **Proper HTTP methods** - GET, POST, PUT, DELETE used correctly
3. **Query parameters** - Filtering, pagination, search support
4. **Error handling** - Try-catch blocks with proper error responses
5. **Data transformation** - Consistent camelCase transformation from snake_case DB
6. **Automatic counts** - Category/brand product counts updated on product changes

### API Critical Issues 🔴

#### 1. **SQL Injection Vulnerability**
**Location:** `lib/db.ts` and all API routes

**Problem:**
```typescript
// lib/db.ts - Line 18
const result = await postgresClient.unsafe(query)  // ⚠️ VULNERABLE
```

While most queries use parameterized template literals, the `sql()` function accepts raw strings and uses `unsafe()`, which is vulnerable to SQL injection.

**Impact:** Critical security risk

**Recommendation:**
- Remove `unsafe()` usage entirely
- Enforce parameterized queries only
- Add input validation middleware

#### 2. **No Authentication/Authorization**
**Problem:** All API endpoints are publicly accessible. No middleware to verify:
- Admin authentication for write operations
- Customer authentication for order access
- Role-based permissions

**Impact:** Anyone can create/update/delete products, orders, etc.

**Recommendation:**
- Add authentication middleware
- Implement RBAC checks
- Add API key or JWT token validation

#### 3. **No Input Validation**
**Problem:** No validation of request bodies before database operations.

**Example:**
```typescript
// app/api/products/route.ts
export async function POST(request: Request) {
  const body = await request.json()  // ⚠️ No validation
  // Directly inserts into database
}
```

**Impact:** Invalid data can be stored, causing runtime errors

**Recommendation:**
- Use Zod for schema validation
- Validate all inputs before database operations
- Return clear validation error messages

#### 4. **No Rate Limiting**
**Problem:** No protection against:
- DDoS attacks
- API abuse
- Brute force attempts

**Recommendation:**
- Implement rate limiting (e.g., using Upstash Redis)
- Add per-IP and per-user limits
- Return 429 status for rate limit exceeded

#### 5. **Inconsistent Error Responses**
**Problem:** Error responses vary in format:
```typescript
// Some return:
{ error: "Failed to fetch products" }

// Others might return different formats
```

**Recommendation:**
- Standardize error response format
- Include error codes
- Add request IDs for debugging

---

## Data Flow Architecture

### Current Data Flow (Problematic)

```
┌─────────────┐
│  Database   │
│ (PostgreSQL)│
└──────┬──────┘
       │
       │ API Calls
       ▼
┌─────────────┐
│  API Routes │
│  (/api/*)   │
└──────┬──────┘
       │
       │ Fetch
       ▼
┌─────────────┐      ┌──────────────┐
│  Contexts   │      │ localStorage  │
│ (React)     │◄────►│  (Fallback)   │
└──────┬──────┘      └──────────────┘
       │
       │ Render
       ▼
┌─────────────┐
│  Frontend   │
│ Components  │
└─────────────┘
```

### Issues with Current Flow

#### 1. **Dual Data Systems** 🔴
**Problem:** The application uses TWO separate data sources:

**Source 1: Database (via API)**
- Admin panel uses this
- Contexts (ProductsContext, CategoriesContext) fetch from API
- Real data, persisted

**Source 2: Hardcoded/LocalStorage**
- `lib/store-products.ts` - Hardcoded product array
- `lib/products.ts` - Uses localStorage as fallback
- Catalog pages use this instead of API
- `components/data-sync.tsx` - Just reloads page on localStorage changes

**Evidence:**
```typescript
// lib/products.ts - Line 194
const stored = localStorage.getItem("ekwip_admin_categories")
if (stored) {
  return JSON.parse(stored)  // Uses localStorage
}

// app/(daas)/daas/catalogue/page.tsx - Line 24
import { storeProducts } from "@/lib/store-products"  // Hardcoded!
```

**Impact:**
- Admin creates product → Saved to database
- Catalog page → Shows hardcoded products (not from database!)
- Data inconsistency
- Changes in admin don't appear in catalog

#### 2. **No Real-Time Sync**
**Problem:** When admin updates a product:
1. Product saved to database ✅
2. Context refetches (if on admin page) ✅
3. Catalog page still shows old hardcoded data ❌
4. `DataSync` component just reloads entire page (inefficient) ❌

**Recommendation:**
- Remove all hardcoded data
- Make catalog fetch from API
- Implement proper cache invalidation
- Consider WebSockets or Server-Sent Events for real-time updates

#### 3. **Inefficient Data Loading**
**Problem:**
- Each context fetches independently
- No request deduplication
- No caching strategy
- Multiple API calls for same data

**Example:**
```typescript
// ProductsContext fetches /api/products
// CategoriesContext fetches /api/categories
// BrandsContext fetches /api/brands
// All happen on page load, no coordination
```

**Recommendation:**
- Implement React Query or SWR for caching
- Add request deduplication
- Batch API calls where possible
- Implement proper cache invalidation

---

## Admin Panel Data Management

### How Admin Panel Works

1. **Product Creation:**
   ```
   Admin Form → ProductsContext.addProduct() → POST /api/products → Database
   ```

2. **Product Update:**
   ```
   Admin Form → ProductsContext.updateProduct() → PUT /api/products/[id] → Database
   ```

3. **Data Display:**
   ```
   Admin Page → ProductsContext.fetchProducts() → GET /api/products → Display
   ```

### Admin Panel Issues ⚠️

1. **No Optimistic Updates** - UI doesn't update until API responds
2. **No Offline Support** - Can't work without internet
3. **No Draft System** - Can't save work in progress
4. **No Bulk Operations** - Can't update multiple products at once
5. **No Import/Export** - Can't bulk import products from CSV/Excel

---

## Configuration & Environment

### Database Configuration

**Location:** `lib/db.ts`

**Current Setup:**
```typescript
// Determines local vs production
const isLocal = process.env.DATABASE_URL?.includes('localhost')

// Uses postgres package for local
const postgresClient = isLocal ? postgres(process.env.DATABASE_URL!) : null

// Uses Neon for production
const neonClient = !isLocal ? neon(process.env.DATABASE_URL!) : null
```

### Issues ⚠️

1. **No Connection Pooling** - Each request creates new connection (inefficient)
2. **No Connection Retry Logic** - Fails immediately on connection error
3. **No Health Checks** - Can't detect database issues
4. **Environment Variable Validation** - No validation, fails silently if missing

### Environment Variables Needed

```bash
# Database
DATABASE_URL=postgresql://...

# Email (Resend)
RESEND_API_KEY=...
CONTACT_EMAIL=...

# WordPress/WooCommerce (if used)
NEXT_PUBLIC_WORDPRESS_API_URL=...
WC_CONSUMER_KEY=...
WC_CONSUMER_SECRET=...
```

**Issue:** No validation that these are set, app fails at runtime

---

## Data Synchronization Issues

### Current Sync Mechanism

**Component:** `components/data-sync.tsx`

**How it works:**
```typescript
// Listens for localStorage changes
window.addEventListener("storage", handleStorageChange)
// Reloads entire page on change
window.location.reload()
```

**Problems:**
1. Only works for localStorage changes (not database changes)
2. Reloads entire page (poor UX)
3. Doesn't sync admin changes to catalog
4. No real-time updates

### Recommended Solution

1. **Remove localStorage for business data**
2. **Use API for all data**
3. **Implement React Query with cache invalidation**
4. **Add WebSocket/SSE for real-time updates** (optional, for future)

---

## Critical Architecture Fixes Needed

### Priority 1: Security (Immediate)

1. **Fix SQL Injection**
   - Remove `unsafe()` from `lib/db.ts`
   - Enforce parameterized queries only
   - Add input sanitization

2. **Add Authentication**
   - Implement JWT or session-based auth
   - Add auth middleware to all write endpoints
   - Protect admin routes

3. **Add Input Validation**
   - Use Zod for all API endpoints
   - Validate before database operations
   - Return clear error messages

### Priority 2: Data Consistency (Week 1)

1. **Remove Dual Data Systems**
   - Delete `lib/store-products.ts` hardcoded data
   - Remove localStorage fallbacks from `lib/products.ts`
   - Make all pages use API

2. **Fix Catalog Data Source**
   - Update `app/(daas)/daas/catalogue/page.tsx` to use API
   - Update category pages to use API
   - Update product pages to use API

3. **Implement Proper Caching**
   - Add React Query or SWR
   - Implement cache invalidation
   - Add request deduplication

### Priority 3: Performance (Week 2)

1. **Database Optimization**
   - Add connection pooling
   - Add database indexes for search
   - Implement full-text search (PostgreSQL)

2. **API Optimization**
   - Add response caching
   - Implement pagination everywhere
   - Add request batching

3. **Frontend Optimization**
   - Implement proper loading states
   - Add skeleton loaders
   - Optimize bundle size

### Priority 4: Developer Experience (Week 3)

1. **Add Migrations System**
   - Use Prisma or similar
   - Version control schema changes
   - Easy rollback capability

2. **Add API Documentation**
   - OpenAPI/Swagger spec
   - Postman collection
   - TypeScript types generation

3. **Add Testing**
   - Unit tests for API routes
   - Integration tests for data flow
   - E2E tests for critical paths

---

## Recommended Architecture Improvements

### 1. Unified Data Layer

```
┌─────────────┐
│  Database   │
└──────┬──────┘
       │
       │ (Single Source of Truth)
       ▼
┌─────────────┐
│  API Layer  │
│  + Auth     │
│  + Validation│
│  + Rate Limit│
└──────┬──────┘
       │
       │ (React Query Cache)
       ▼
┌─────────────┐
│  Frontend   │
│  (All Pages)│
└─────────────┘
```

### 2. Add API Middleware Stack

```typescript
// middleware/api.ts
export function apiMiddleware(handler) {
  return async (req, res) => {
    // 1. Authentication
    const user = await authenticate(req)
    
    // 2. Authorization
    await authorize(user, req)
    
    // 3. Rate Limiting
    await checkRateLimit(user)
    
    // 4. Input Validation
    const validated = await validate(req.body)
    
    // 5. Execute handler
    return handler(validated, user)
  }
}
```

### 3. Implement Caching Strategy

```typescript
// Use React Query
const { data: products } = useQuery({
  queryKey: ['products', filters],
  queryFn: () => fetchProducts(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
})

// Invalidate on mutations
const mutation = useMutation({
  mutationFn: updateProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(['products'])
  }
})
```

### 4. Database Connection Pooling

```typescript
// lib/db.ts - Improved
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const sql = async (query: TemplateStringsArray, ...params: any[]) => {
  const client = await pool.connect()
  try {
    return await client.query(query, params)
  } finally {
    client.release()
  }
}
```

---

## Migration Plan

### Phase 1: Security & Data Consistency (Week 1)
- [ ] Fix SQL injection vulnerability
- [ ] Add authentication middleware
- [ ] Add input validation (Zod)
- [ ] Remove hardcoded `store-products.ts`
- [ ] Update catalog to use API
- [ ] Remove localStorage for business data

### Phase 2: Performance & Caching (Week 2)
- [ ] Add React Query/SWR
- [ ] Implement connection pooling
- [ ] Add API response caching
- [ ] Optimize database queries
- [ ] Add full-text search

### Phase 3: Developer Experience (Week 3)
- [ ] Add migrations system (Prisma)
- [ ] Add API documentation
- [ ] Add TypeScript types generation
- [ ] Add unit tests
- [ ] Add integration tests

### Phase 4: Advanced Features (Week 4+)
- [ ] Real-time updates (WebSocket/SSE)
- [ ] Bulk operations
- [ ] Import/Export functionality
- [ ] Advanced search
- [ ] Analytics integration

---

## Metrics to Track

### Backend Performance
- API response times (target: <200ms p95)
- Database query times (target: <50ms p95)
- Error rates (target: <0.1%)
- API uptime (target: 99.9%)

### Data Consistency
- Catalog sync latency (target: <1 second)
- Cache hit rate (target: >80%)
- Data accuracy (admin changes appear in catalog)

### Security
- Failed authentication attempts
- Rate limit violations
- SQL injection attempts (should be 0)

---

## Conclusion

The backend architecture has a **solid foundation** with a well-designed database schema and RESTful API structure. However, **critical issues** need immediate attention:

1. **Security vulnerabilities** (SQL injection, no auth)
2. **Data inconsistency** (dual systems)
3. **Performance issues** (no caching, no pooling)

**Recommended Next Steps:**
1. Fix security issues immediately
2. Unify data sources (remove hardcoded data)
3. Implement proper caching
4. Add authentication and authorization

**Expected Impact:**
- +100% data consistency
- +50% API performance
- 100% security improvement
- Better developer experience

---

## Appendix: Code Examples

### Example: Secure Product API Route

```typescript
// app/api/products/route.ts - Improved
import { z } from 'zod'
import { authenticate, authorize } from '@/lib/auth'
import { sql } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

const productSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  price: z.number().positive(),
  // ... more validation
})

export async function POST(request: Request) {
  // 1. Authenticate
  const user = await authenticate(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Authorize
  if (!authorize(user, 'create_products')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 3. Rate limit
  const rateLimitResult = await rateLimit(user.id, 'create_product')
  if (!rateLimitResult.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  // 4. Validate
  const body = await request.json()
  const validated = productSchema.parse(body)

  // 5. Database operation (parameterized only)
  const result = await sql`
    INSERT INTO products (name, slug, price, ...)
    VALUES (${validated.name}, ${validated.slug}, ${validated.price}, ...)
    RETURNING *
  `

  return NextResponse.json(result[0], { status: 201 })
}
```

### Example: Catalog Using API

```typescript
// app/(daas)/daas/catalogue/page.tsx - Improved
'use client'

import { useQuery } from '@tanstack/react-query'

export default function Catalogue() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'catalog'],
    queryFn: async () => {
      const res = await fetch('/api/products?status=active')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  if (isLoading) return <SkeletonLoader />
  if (!products) return <EmptyState />

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

