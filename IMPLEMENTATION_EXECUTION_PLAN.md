# Implementation Execution Plan - Complete Fix & Enhancement

**Date**: 2024-12-20  
**Status**: Ready for Execution

---

## 🎯 Overview

This document outlines the complete step-by-step execution plan to fix all issues and implement all enhancements as requested.

---

## ✅ Phase 1: Critical Fixes (Immediate)

### **Step 1.1: Fix Category Page Slug Issue** ✅

**Status**: ✅ **COMPLETED**
- Fixed `params.slug` undefined by using `useParams()` hook
- File: `app/(daas)/daas/catalogue/[slug]/page.tsx`

---

### **Step 1.2: Fix Products Not Showing on Catalog Page** ⏳

**Issue**: Catalog page uses hardcoded `storeProducts` instead of API data

**Actions Required**:
1. Replace `storeProducts` import with API contexts
2. Use `useProducts()` from ProductsContext
3. Use `useCategories()` from CategoriesContext
4. Filter products: `productType === "rent"` and `status === "active"`
5. Create/update product card component for API Product type
6. Add loading states
7. Add error handling

**Files to Modify**:
- `app/(daas)/daas/catalogue/page.tsx` - Main catalog page
- `components/catalog-product-card.tsx` - Product card component (may need new one)

**Estimated Time**: 1-2 hours

---

## ✅ Phase 2: Orders/Clients Backend Enhancements

### **Step 2.1: Database Schema Updates**

**Priority**: **HIGH** ⚠️

**Required Changes**:

1. **Add `order_type` field**:
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
   ALTER TABLE orders ADD COLUMN rental_duration INTEGER;  -- in months
   ```

3. **Update order_items for rental**:
   ```sql
   ALTER TABLE order_items ADD COLUMN monthly_fee DECIMAL(10,2);
   ALTER TABLE order_items ADD COLUMN upfront_contribution DECIMAL(10,2);
   ```

**Files to Create**:
- `scripts/003-add-order-type-migration.sql` - Migration script

**Estimated Time**: 2-3 hours

---

### **Step 2.2: Update Orders API Routes**

**Priority**: **HIGH** ⚠️

**Actions Required**:
1. Update GET route to handle `order_type` filter
2. Update POST route to accept rental-specific fields
3. Differentiate status workflows by order type
4. Handle both `client_id` (B2B) and `customer_id` (B2C)

**Files to Modify**:
- `app/api/orders/route.ts`
- `app/api/orders/[id]/route.ts`

**Estimated Time**: 2-3 hours

---

### **Step 2.3: Create Rental-Specific Endpoints**

**Priority**: **MEDIUM** 📋

**New Endpoints**:
- `/api/orders/rental` - Rental orders only
- `/api/orders/shop` - Shop orders only
- `/api/rentals/active` - Active rentals
- `/api/rentals/[id]/renew` - Renew rental

**Files to Create**:
- `app/api/orders/rental/route.ts`
- `app/api/orders/shop/route.ts`
- `app/api/rentals/active/route.ts`
- `app/api/rentals/[id]/renew/route.ts`

**Estimated Time**: 3-4 hours

---

## ✅ Phase 3: Boutique E-commerce Implementation

### **Step 3.1: Foundation (Week 2-3)**

**Routes to Create**:
- `/boutique/page.tsx` - Shop homepage
- `/boutique/[category]/page.tsx` - Category pages
- `/boutique/produit/[slug]/page.tsx` - Product pages

**Components to Create**:
- `components/boutique/product-grid.tsx`
- `components/boutique/filter-sidebar.tsx`
- `components/boutique/product-card.tsx`
- `components/boutique/product-gallery.tsx`

**Estimated Time**: 1 week

---

### **Step 3.2: Advanced Features (Week 4-5)**

- Shopping cart
- Checkout process
- Advanced filtering
- Order creation

**Estimated Time**: 1-2 weeks

---

## 📋 Execution Checklist

### **Immediate (Today)**

- [x] Fix category page slug issue
- [ ] Fix products not showing on catalog page
- [ ] Verify all fixes work
- [ ] Test category pages
- [ ] Test product display

### **This Week**

- [ ] Database schema migration script
- [ ] Update Orders API routes
- [ ] Test rental vs shop order creation
- [ ] Review and verify all changes

### **Next Week**

- [ ] Start Boutique implementation
- [ ] Create route structure
- [ ] Build homepage
- [ ] Build category pages

---

## 🔍 Testing Requirements

After each phase:

1. **Functional Testing**:
   - All pages load correctly
   - Products display from database
   - Categories display correctly
   - Filters work (if implemented)
   - No console errors

2. **Integration Testing**:
   - API routes return correct data
   - Database queries work
   - Context providers work
   - Data flows correctly

3. **User Testing**:
   - Navigation works
   - All links functional
   - Mobile responsive
   - Performance acceptable

---

**Last Updated**: 2024-12-20  
**Status**: Ready for Execution

