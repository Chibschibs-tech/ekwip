# API Routes Master Reference

**Last Updated**: 2024-12-20  
**Purpose**: Complete reference for all API endpoints, their methods, parameters, and responses

---

## 📋 API Routes Overview

### Core Entity Routes

| Route | Methods | Purpose | Status |
|-------|---------|---------|--------|
| `/api/categories` | GET, POST | Categories management | ✅ Template strings |
| `/api/categories/[id]` | GET, PUT, DELETE | Single category operations | ✅ Template strings |
| `/api/brands` | GET, POST | Brands management | ✅ Template strings |
| `/api/brands/[id]` | GET, PUT, DELETE | Single brand operations | ✅ Template strings |
| `/api/products` | GET, POST | Products management | ✅ Template strings |
| `/api/products/[id]` | GET, PUT, DELETE | Single product operations | ✅ Template strings |
| `/api/attributes` | GET, POST | Attributes management | ✅ Template strings |
| `/api/attributes/[id]` | GET, PUT, DELETE | Single attribute operations | ✅ Template strings |

### Order & Client Routes

| Route | Methods | Purpose | Status |
|-------|---------|---------|--------|
| `/api/orders` | GET, POST | Orders management | ⚠️ String queries |
| `/api/orders/[id]` | GET, PUT, DELETE | Single order operations | ⚠️ Needs review |
| `/api/clients` | GET, POST | B2B clients management | ⚠️ String queries |
| `/api/clients/[id]` | GET, PUT, DELETE | Single client operations | ⚠️ Needs review |
| `/api/customers` | GET, POST | B2C customers management | ⚠️ Needs review |

### Other Routes

| Route | Methods | Purpose | Status |
|-------|---------|---------|--------|
| `/api/suppliers` | GET, POST | Suppliers management | ⚠️ Needs review |
| `/api/quote-requests` | GET, POST | Quote requests | ⚠️ Needs review |
| `/api/dashboard/stats` | GET | Dashboard statistics | ⚠️ Needs review |
| `/api/contact-coming-soon` | POST | Contact form | ⚠️ Needs review |

### Debug Routes

| Route | Methods | Purpose | Status |
|-------|---------|---------|--------|
| `/api/debug/categories` | GET | Debug categories | ✅ |
| `/api/debug/brands` | GET | Debug brands | ✅ |
| `/api/debug/products` | GET | Debug products | ✅ |

---

## 🔍 Detailed Route Documentation

### Categories API

#### GET `/api/categories`

**Query Parameters**:
- `active=true` - Filter active categories only
- `parentId=cat-xxx` - Filter by parent category (use `null` for root categories)

**Response**:
```json
[
  {
    "id": "cat-laptops",
    "name": "Ordinateurs portables",
    "slug": "ordinateurs-portables",
    "description": "...",
    "parentId": null,
    "image": "/images/...",
    "icon": null,
    "order": 1,
    "isActive": true,
    "productCount": 3,
    "createdAt": "2024-...",
    "updatedAt": "2024-..."
  }
]
```

**Status**: ✅ Uses template strings

#### POST `/api/categories`

**Request Body**:
```json
{
  "name": "Category Name",
  "slug": "category-slug",
  "description": "...",
  "parentId": null,
  "image": "/images/...",
  "icon": null,
  "order": 0,
  "isActive": true
}
```

**Response**: Created category object

---

### Brands API

#### GET `/api/brands`

**Query Parameters**:
- `active=true` - Filter active brands only

**Response**: Array of brand objects

**Status**: ✅ Uses template strings

---

### Products API

#### GET `/api/products`

**Query Parameters**:
- `categoryId=cat-xxx` - Filter by category
- `brandId=brand-xxx` - Filter by brand
- `productType=rent|sale` - Filter by type
- `status=active` - Filter by status
- `featured=true` - Filter featured products
- `search=keyword` - Search in name/description/SKU
- `limit=100` - Limit results (default: 100)
- `offset=0` - Pagination offset

**Response**: Array of product objects with category/brand joins

**Status**: ✅ Uses template strings (with conditional filters)

**Complex Query**: Uses string queries for dynamic WHERE clauses, but with proper parameterization

---

### Orders API

#### GET `/api/orders`

**Query Parameters**:
- `status=pending` - Filter by status
- `clientId=client-xxx` - Filter by client
- `orderType=rental|sale` - Filter by type
- `limit=100` - Pagination limit
- `offset=0` - Pagination offset

**Status**: ⚠️ Uses string queries (should convert to template strings)

---

### Clients API

#### GET `/api/clients`

**Query Parameters**:
- `status=active` - Filter by status
- `search=keyword` - Search in company/contact/email
- `limit=100` - Pagination limit
- `offset=0` - Pagination offset

**Status**: ⚠️ Uses string queries (should convert to template strings)

---

## 🔧 API Route Patterns

### Query Pattern (Template Strings)

```typescript
// Simple query
const data = await sql`
  SELECT * FROM table
  WHERE condition = ${value}
  ORDER BY field ASC
`

// Conditional query
let data
if (filter) {
  data = await sql`
    SELECT * FROM table
    WHERE filter = ${filter}
  `
} else {
  data = await sql`
    SELECT * FROM table
  `
}
```

### Transformation Pattern

All API routes transform database columns:

```typescript
const transformed = data.map((item: any) => ({
  id: item.id,
  name: item.name,
  isActive: item.is_active,        // snake_case → camelCase
  productCount: item.product_count, // snake_case → camelCase
  createdAt: item.created_at,
  updatedAt: item.updated_at,
}))
```

---

## 🚨 Issues to Fix

### 1. String Query Routes

These routes still use string queries and should be converted:

- `/api/orders` - GET method
- `/api/clients` - GET method

**Risk**: Potential SQL injection if not properly parameterized

**Solution**: Convert to template strings or ensure proper parameterization

### 2. Error Handling

All routes have basic error handling, but could be improved:
- More specific error messages
- Status code consistency
- Error logging to monitoring service

### 3. Response Consistency

Some routes return different formats:
- Some return arrays directly
- Some return `{ data: [...] }`
- Some return `{ success: true, data: [...] }`

**Recommendation**: Standardize response format

---

## 📊 API Route Status Summary

### ✅ Fully Functional (Template Strings)
- Categories (all methods)
- Brands (all methods)
- Products (all methods)
- Attributes (all methods)

### ⚠️ Needs Conversion (String Queries)
- Orders (GET)
- Clients (GET)

### ⚠️ Needs Review
- Customers
- Suppliers
- Quote Requests
- Dashboard Stats
- Contact Form

---

## 🧪 Testing API Routes

### Manual Testing

```bash
# Test categories
curl http://localhost:3000/api/categories

# Test brands
curl http://localhost:3000/api/brands

# Test products
curl http://localhost:3000/api/products

# Test with filters
curl "http://localhost:3000/api/products?categoryId=cat-laptops&status=active"
```

### Debug Endpoints

```bash
# Check categories
curl http://localhost:3000/api/debug/categories

# Check brands
curl http://localhost:3000/api/debug/brands

# Check products
curl http://localhost:3000/api/debug/products
```

---

## 🔄 Next Steps

1. **Convert Remaining Routes**: Convert orders and clients to template strings
2. **Standardize Responses**: Create consistent response format
3. **Add Validation**: Use Zod for request validation
4. **Add Authentication**: Protect admin routes with auth middleware
5. **Improve Error Handling**: Better error messages and logging

