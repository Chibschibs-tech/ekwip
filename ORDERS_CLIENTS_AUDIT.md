# Orders & Clients - Complete Business Logic Audit

**Date**: 2024-12-20  
**Status**: Comprehensive Analysis - Rental vs Shop Orders

---

## 🎯 Business Model Understanding

### **Two Distinct Order Types**

#### 1. **Rental Orders** (Subscription-like)
**Location**: `/catalogue` - Rental equipment  
**Flow**: Like subscriptions with duration

**Characteristics**:
- **Duration-based**: Orders have a rental duration (6, 12, 24, 36 months)
- **Recurring payments**: Monthly payments over the duration
- **Subscription-like**: Active for the entire duration period
- **Equipment tracking**: Equipment is assigned to clients during rental period
- **Lifecycle**: 
  - Quote → Order Confirmed → Equipment Assigned → Active Rental → Renewal/Return

**Status Flow** (Rental):
1. `pending` - Quote/Order created
2. `confirmed` - Order accepted, contract signed
3. `active` - Equipment assigned, rental active
4. `renewed` - Rental period extended
5. `completed` - Rental period ended, equipment returned
6. `cancelled` - Order cancelled before start

#### 2. **Shop Orders** (Normal E-commerce)
**Location**: `/boutique` - Equipment for sale  
**Flow**: Standard e-commerce workflow

**Characteristics**:
- **One-time purchase**: Equipment is sold, not rented
- **Immediate payment**: Full payment upfront
- **Standard shipping**: Physical delivery

**Status Flow** (Shop):
1. `pending` - New order placed
2. `confirmed` - Order confirmed
3. `processing` - Order being prepared
4. `shipped` - Order shipped
5. `delivered` - Order delivered
6. `cancelled` - Order cancelled

---

## 📊 Current Database Schema Analysis

### Orders Table Structure

**Current Schema** (`scripts/001-create-schema.sql`):
```sql
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id VARCHAR(50),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  payment_status VARCHAR(20) DEFAULT 'pending',
  subtotal DECIMAL(12,2),
  tax DECIMAL(12,2),
  shipping DECIMAL(12,2),
  discount DECIMAL(12,2),
  total DECIMAL(12,2),
  shipping_address JSONB,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  delivered_at TIMESTAMP
)
```

### Issues Identified

1. ❌ **No `order_type` field** to distinguish rental vs sale
2. ❌ **No `rental_start_date`** field in current schema
3. ❌ **No `rental_end_date`** field in current schema
4. ❌ **No `rental_duration`** field at order level (only in order_items)
5. ❌ **Status values don't match business logic**:
   - Current: `pending`, `processing`, `shipped`, `delivered`, `cancelled`
   - Needed Rental: `pending`, `confirmed`, `active`, `renewed`, `completed`, `cancelled`
   - Needed Shop: `pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`
6. ❌ **No `client_id` field** - uses `customer_id` (should distinguish B2B clients vs B2C customers)

### Order Items Table

**Current Schema**:
```sql
CREATE TABLE order_items (
  id VARCHAR(50) PRIMARY KEY,
  order_id VARCHAR(50),
  product_id VARCHAR(50),
  product_name VARCHAR(255),
  sku VARCHAR(100),
  quantity INTEGER,
  price DECIMAL(10,2),
  total DECIMAL(12,2),
  rental_duration INTEGER,  -- ✅ Good: exists
  created_at TIMESTAMP
)
```

**Issues**:
1. ✅ `rental_duration` exists (good for rental)
2. ❌ No `monthly_fee` field for rental orders
3. ❌ No `upfront_contribution` field for rental orders
4. ❌ No `start_date` / `end_date` for rental items

---

## 🔍 Current API Implementation Analysis

### Orders API Route (`app/api/orders/route.ts`)

**Current Implementation**:
- ✅ Supports `orderType` filter (rental/sale)
- ✅ Has `rental_duration`, `rental_start_date`, `rental_end_date` in POST
- ❌ Database schema doesn't match (fields not in schema)
- ❌ Status workflow not differentiated by order type

**Issues**:
1. API accepts `orderType` but database schema doesn't have this field
2. API accepts `rentalStartDate`, `rentalEndDate` but schema doesn't have these fields
3. Status values are generic, not specific to order type

---

## 📋 Clients vs Customers

### Current Structure

**Clients Table** (`clients`):
- B2B clients (companies)
- Used for rental orders
- Fields: `company_name`, `contact_name`, `tax_id`, etc.

**Customers Table** (`customers`):
- B2C customers (individuals)
- Used for shop orders
- Fields: `first_name`, `last_name`, `customer_type`, etc.

**Issues**:
1. Orders table uses `customer_id` but should use:
   - `client_id` for rental orders (B2B)
   - `customer_id` for shop orders (B2C)
2. Current orders schema references `customers` table only

---

## 🔧 Required Database Schema Changes

### 1. Add `order_type` Field

```sql
ALTER TABLE orders ADD COLUMN order_type VARCHAR(20) 
  CHECK (order_type IN ('rental', 'sale')) DEFAULT 'sale';
```

### 2. Add Rental-Specific Fields

```sql
ALTER TABLE orders ADD COLUMN rental_start_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE orders ADD COLUMN rental_end_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE orders ADD COLUMN rental_duration INTEGER;  -- in months
ALTER TABLE orders ADD COLUMN client_id VARCHAR(50) REFERENCES clients(id);
```

### 3. Update Status Values

**Option A**: Keep single status field with type-specific values
```sql
-- Status values depend on order_type:
-- Rental: pending, confirmed, active, renewed, completed, cancelled
-- Sale: pending, confirmed, processing, shipped, delivered, cancelled
```

**Option B**: Add separate status field for rental
```sql
ALTER TABLE orders ADD COLUMN rental_status VARCHAR(20);
ALTER TABLE orders ADD COLUMN shipping_status VARCHAR(20);
```

### 4. Update Order Items for Rental

```sql
ALTER TABLE order_items ADD COLUMN monthly_fee DECIMAL(10,2);
ALTER TABLE order_items ADD COLUMN upfront_contribution DECIMAL(10,2);
ALTER TABLE order_items ADD COLUMN item_start_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE order_items ADD COLUMN item_end_date TIMESTAMP WITH TIME ZONE;
```

---

## 🏗️ Required Business Logic Changes

### Rental Order Workflow

**Flow**:
```
Quote Created → Order Confirmed → Equipment Assigned → Active Rental → Return/Renewal
```

**Key Features**:
1. **Quote Stage**: Customer selects equipment and duration
2. **Confirmation**: Contract signed, payment setup
3. **Assignment**: Equipment assigned to client
4. **Active Rental**: Monthly payments, equipment in use
5. **Renewal**: Option to extend rental
6. **Return**: Equipment returned, rental ends

**Payment Model**:
- Upfront contribution (optional)
- Monthly payments (recurring)
- Total contract value = monthly_fee × duration + upfront

### Shop Order Workflow

**Flow**:
```
New Order → Order Confirmed → Order Being Prepared → Shipped → Delivered
```

**Key Features**:
1. **New Order**: Customer places order
2. **Confirmed**: Payment received, order confirmed
3. **Processing**: Order being prepared for shipment
4. **Shipped**: Order shipped with tracking
5. **Delivered**: Order delivered to customer

**Payment Model**:
- Full payment upfront
- Standard e-commerce flow

---

## 📝 Complete Fix Plan

### Phase 1: Database Schema Updates

**Priority**: **CRITICAL** 🔴

1. **Add order_type field**:
   ```sql
   ALTER TABLE orders ADD COLUMN order_type VARCHAR(20) 
     CHECK (order_type IN ('rental', 'sale')) DEFAULT 'sale';
   CREATE INDEX idx_orders_type ON orders(order_type);
   ```

2. **Add rental-specific fields**:
   ```sql
   ALTER TABLE orders ADD COLUMN client_id VARCHAR(50) REFERENCES clients(id);
   ALTER TABLE orders ADD COLUMN rental_start_date TIMESTAMP WITH TIME ZONE;
   ALTER TABLE orders ADD COLUMN rental_end_date TIMESTAMP WITH TIME ZONE;
   ALTER TABLE orders ADD COLUMN rental_duration INTEGER;
   ```

3. **Update order_items for rental**:
   ```sql
   ALTER TABLE order_items ADD COLUMN monthly_fee DECIMAL(10,2);
   ALTER TABLE order_items ADD COLUMN upfront_contribution DECIMAL(10,2);
   ```

4. **Fix customer/client references**:
   - Keep `customer_id` for shop orders
   - Use `client_id` for rental orders
   - Make both nullable, ensure at least one exists

### Phase 2: API Route Updates

**Priority**: **HIGH** ⚠️

1. **Update Orders API**:
   - Add `order_type` field handling
   - Differentiate status values by order type
   - Handle rental-specific fields
   - Support both `client_id` and `customer_id`

2. **Create Rental-Specific Endpoints**:
   - `/api/orders/rental` - Rental orders only
   - `/api/orders/shop` - Shop orders only
   - `/api/rentals/active` - Active rentals
   - `/api/rentals/[id]/renew` - Renew rental

### Phase 3: Frontend Updates

**Priority**: **HIGH** ⚠️

1. **Admin Panel**:
   - Separate views for rental vs shop orders
   - Rental order management (assign equipment, track duration)
   - Shop order management (standard workflow)

2. **Client Portal**:
   - Active rentals view
   - Rental history
   - Equipment assignment tracking

---

## 🔄 Order Status Mapping

### Rental Orders Status Flow

| Status | Description | Next Actions |
|--------|-------------|--------------|
| `pending` | Quote created, awaiting confirmation | Confirm, Cancel |
| `confirmed` | Order confirmed, contract signed | Assign Equipment |
| `active` | Equipment assigned, rental active | Monitor, Renew, Return |
| `renewed` | Rental period extended | Continue Active |
| `completed` | Rental period ended, equipment returned | Archive |
| `cancelled` | Order cancelled before start | Archive |

### Shop Orders Status Flow

| Status | Description | Next Actions |
|--------|-------------|--------------|
| `pending` | New order placed | Confirm, Cancel |
| `confirmed` | Order confirmed, payment received | Prepare Order |
| `processing` | Order being prepared | Ship Order |
| `shipped` | Order shipped with tracking | Track, Mark Delivered |
| `delivered` | Order delivered to customer | Complete |
| `cancelled` | Order cancelled | Refund, Archive |

---

## 🎯 Implementation Priority

### **Immediate (Critical)**

1. ✅ Update database schema to support `order_type`
2. ✅ Add rental-specific fields to orders table
3. ✅ Update Orders API to handle both types
4. ✅ Fix status workflow differentiation

### **Short Term**

5. Create separate admin views for rental vs shop
6. Implement rental equipment assignment
7. Add recurring payment tracking
8. Build rental renewal flow

### **Medium Term**

9. Equipment tracking system
10. Rental contract management
11. Automated billing for rentals
12. Equipment return process

---

## 📚 Next Steps

1. **Review this audit** with business team
2. **Confirm business logic** matches requirements
3. **Create migration script** for schema updates
4. **Update API routes** to support both order types
5. **Build separate admin interfaces** for rental vs shop

---

**Last Updated**: 2024-12-20  
**Status**: Ready for Review

