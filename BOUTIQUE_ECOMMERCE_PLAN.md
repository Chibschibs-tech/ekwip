# Boutique E-commerce Section - Complete Build Plan

**Date**: 2024-12-20  
**Status**: Comprehensive Development Plan

---

## 🎯 Overview

**Boutique** (`/boutique`) is the e-commerce shop section where equipment is **sold** (not rented). This section needs to be built from scratch as a complete, modern e-commerce platform.

---

## 📋 Business Requirements

### **Purpose**
- Sell equipment (one-time purchase)
- Standard e-commerce workflow
- Complete shopping experience

### **Key Features Required**
1. ✅ Product catalog with advanced filtering
2. ✅ Category pages
3. ✅ Product detail pages
4. ✅ Shopping cart
5. ✅ Checkout process
6. ✅ Order management
7. ✅ Payment integration (next phase)

---

## 🏗️ Architecture Plan

### **Route Structure**

```
/boutique/
├── page.tsx                    # Shop homepage (all products)
├── [category]/                 # Category pages
│   └── page.tsx
├── produit/                    # Product pages
│   └── [slug]/
│       └── page.tsx
├── panier/                     # Shopping cart
│   └── page.tsx
└── checkout/                   # Checkout
    └── page.tsx
```

### **Data Source**
- Products from database where `product_type = 'sale'`
- Categories (shared with rental catalog)
- Brands (shared)
- Attributes (shared)

---

## 🎨 Advanced Filtering System

### **Filter Categories**

1. **Basic Filters**:
   - Category
   - Brand
   - Price range
   - Stock availability

2. **Advanced Filters**:
   - Product attributes (CPU, RAM, Storage, etc.)
   - Multiple attribute combinations
   - Search by keyword
   - Featured products
   - On sale products

3. **Sorting Options**:
   - Price: Low to High
   - Price: High to Low
   - Name: A-Z
   - Newest first
   - Best selling
   - Relevance (search)

### **Filter UI Design**

**Desktop**:
- Left sidebar with all filters
- Sticky filters while scrolling
- Active filter badges
- Clear all filters button

**Mobile**:
- Collapsible filter panel
- Bottom sheet filter modal
- Quick filter chips

**Features**:
- Real-time filtering (no page reload)
- URL query parameters for sharing
- Filter state persistence
- Filter count badges

---

## 📄 Page Specifications

### 1. **Shop Homepage** (`/boutique`)

**Sections**:
- Hero section with shop introduction
- Featured categories grid
- Featured products carousel
- All products grid with filters
- Brands section
- CTA section

**Features**:
- Product grid with pagination/infinite scroll
- Quick view modal
- Add to cart from grid
- Product comparison (future)

---

### 2. **Category Pages** (`/boutique/[category]`)

**Features**:
- Category hero (image, description)
- Advanced filtering sidebar
- Product grid
- Sort options
- Pagination
- Breadcrumbs

**Filter Sidebar**:
- Categories (subcategories)
- Brands
- Price range slider
- Attributes (dynamic based on category)
- Stock filter
- On sale filter

---

### 3. **Product Detail Pages** (`/boutique/produit/[slug]`)

**Sections**:
- Product image gallery (zoom, thumbnails)
- Product information
  - Title, SKU
  - Price (with compare price if on sale)
  - Description (full)
  - Specifications table
  - Stock status
  - Add to cart (quantity selector)
  - Buy now button
- Product tabs:
  - Description
  - Specifications
  - Reviews (future)
  - Shipping & Returns
- Related products
- Recently viewed

**Features**:
- Image zoom
- Variant selection (if applicable)
- Quantity selector
- Stock availability indicator
- Share product
- Wishlist (future)

---

### 4. **Shopping Cart** (`/boutique/panier`)

**Features**:
- Cart items list
  - Product image
  - Product name
  - Price
  - Quantity (increase/decrease/remove)
  - Subtotal
- Cart summary:
  - Subtotal
  - Shipping estimate
  - Tax
  - Total
- Coupon code input
- Continue shopping link
- Proceed to checkout button

**Empty State**:
- Empty cart illustration
- Browse products CTA

---

### 5. **Checkout Page** (`/boutique/checkout`)

**Sections**:
- Step 1: Shipping Address
  - Form fields
  - Save for future orders
  - Delivery options
- Step 2: Payment Method
  - Payment options (next phase)
  - Billing address
- Step 3: Review Order
  - Order summary
  - Shipping details
  - Payment details
- Order placement
  - Place order button
  - Terms & conditions checkbox

**Features**:
- Multi-step checkout
- Address validation
- Order summary sidebar
- Guest checkout option
- Login/register option

---

## 🔧 Technical Implementation

### **Data Fetching**

**Products**:
```typescript
// Fetch sale products only
const products = await fetch('/api/products?productType=sale&status=active')
```

**Filters**:
- Client-side filtering for fast UX
- Server-side filtering for large datasets
- Hybrid approach (initial load + client filtering)

### **State Management**

**Cart**:
- Context provider: `NeedsListProvider` (already exists, may need renaming)
- localStorage persistence
- Sync with backend on checkout

**Filters**:
- URL query parameters
- localStorage for user preferences
- Context or local state

---

## 🎨 UI/UX Requirements

### **Design Principles**

1. **Modern E-commerce Standards**:
   - Clean, product-focused design
   - High-quality product images
   - Clear pricing
   - Easy navigation
   - Fast loading

2. **Mobile-First**:
   - Responsive grid
   - Touch-friendly buttons
   - Swipe gestures
   - Mobile-optimized filters

3. **Performance**:
   - Image optimization
   - Lazy loading
   - Code splitting
   - Fast filtering

### **Visual Distinctions from Rental**

**Rental Catalog** (`/catalogue`):
- Blue/teal color scheme
- "MAD/mois" pricing
- Rental duration selection
- Subscription-like UI

**Shop Boutique** (`/boutique`):
- Green/purple color scheme (or distinct from rental)
- "MAD" one-time pricing
- Immediate purchase CTA
- Standard e-commerce UI

---

## 📦 Component Structure

### **New Components Needed**

```
components/
├── boutique/
│   ├── product-grid.tsx          # Product grid with filters
│   ├── filter-sidebar.tsx        # Advanced filter sidebar
│   ├── product-card.tsx          # Product card (sale)
│   ├── product-gallery.tsx       # Image gallery with zoom
│   ├── product-tabs.tsx          # Description, specs tabs
│   ├── cart-item.tsx             # Cart item component
│   ├── cart-summary.tsx          # Cart totals
│   ├── checkout-steps.tsx        # Multi-step checkout
│   ├── shipping-form.tsx         # Shipping address form
│   └── order-summary.tsx         # Order review
```

---

## 🔄 Integration Points

### **Shared with Rental**

- Categories API
- Brands API
- Products API (filter by `productType=sale`)
- Attributes API

### **Boutique-Specific**

- Cart API (or extend existing)
- Checkout API
- Orders API (`order_type='sale'`)
- Customer API (B2C)

---

## 📊 Database Requirements

### **Already Supported**

- ✅ Products table has `product_type` field (`rent` | `sale`)
- ✅ Orders table structure exists
- ✅ Customers table exists (for B2C)

### **Needs Addition**

- Order type differentiation (see Orders/Clients Audit)
- Cart persistence (optional, can use localStorage + sync)
- Customer addresses (already exists)

---

## 🚀 Implementation Phases

### **Phase 1: Foundation** (Week 1)

1. ✅ Create route structure
2. ✅ Shop homepage layout
3. ✅ Basic product grid
4. ✅ Product filtering (basic)

**Deliverables**:
- `/boutique` homepage
- Product listing with basic filters
- Category navigation

---

### **Phase 2: Product Pages** (Week 2)

1. ✅ Category pages
2. ✅ Product detail pages
3. ✅ Image gallery
4. ✅ Product specifications

**Deliverables**:
- Category pages with filters
- Product detail pages
- Image zoom functionality

---

### **Phase 3: Shopping Cart** (Week 3)

1. ✅ Cart context/state
2. ✅ Cart page
3. ✅ Add to cart functionality
4. ✅ Cart persistence

**Deliverables**:
- Functional shopping cart
- Add/remove/update quantities
- Cart summary

---

### **Phase 4: Advanced Filtering** (Week 4)

1. ✅ Advanced filter sidebar
2. ✅ Multi-attribute filtering
3. ✅ URL parameter sync
4. ✅ Filter persistence

**Deliverables**:
- Complete filtering system
- Real-time filtering
- Shareable filtered URLs

---

### **Phase 5: Checkout** (Week 5)

1. ✅ Checkout page structure
2. ✅ Multi-step checkout
3. ✅ Address forms
4. ✅ Order creation

**Deliverables**:
- Complete checkout flow
- Order placement
- Order confirmation

---

### **Phase 6: Polish** (Week 6)

1. ✅ Mobile optimization
2. ✅ Performance optimization
3. ✅ Error handling
4. ✅ Loading states
5. ✅ Empty states

**Deliverables**:
- Production-ready boutique
- Mobile-responsive
- Fast and polished

---

## 📝 Detailed Component Specifications

### **1. Filter Sidebar Component**

**Location**: `components/boutique/filter-sidebar.tsx`

**Filters**:
- Categories (with subcategories)
- Brands
- Price range (min/max slider)
- Attributes (dynamic)
- Stock availability
- On sale only

**Features**:
- Collapsible sections
- Active filter count
- Clear all button
- Real-time filtering
- Mobile-responsive

---

### **2. Product Grid Component**

**Location**: `components/boutique/product-grid.tsx`

**Features**:
- Grid layout (responsive)
- Product cards
- Loading states
- Empty states
- Pagination/infinite scroll
- Quick view modal

---

### **3. Product Detail Component**

**Location**: `components/boutique/product-detail.tsx`

**Sections**:
- Image gallery
- Product info
- Add to cart
- Description tabs
- Specifications
- Related products

---

### **4. Cart Component**

**Location**: `components/boutique/cart.tsx`

**Features**:
- Cart items list
- Quantity controls
- Remove items
- Cart summary
- Coupon code
- Checkout button

---

### **5. Checkout Component**

**Location**: `components/boutique/checkout.tsx`

**Steps**:
1. Shipping information
2. Payment method
3. Review & place order

---

## 🎯 Success Criteria

### **Functional Requirements**

- [ ] All products display correctly
- [ ] Advanced filtering works
- [ ] Category pages functional
- [ ] Product detail pages complete
- [ ] Shopping cart functional
- [ ] Checkout process works
- [ ] Orders created correctly

### **Performance Requirements**

- [ ] Page load < 2 seconds
- [ ] Filter response < 500ms
- [ ] Image optimization
- [ ] Mobile-friendly

### **UX Requirements**

- [ ] Intuitive navigation
- [ ] Clear product information
- [ ] Easy checkout process
- [ ] Professional appearance

---

## 📚 Next Steps After Boutique

1. **Payment Module** (next phase)
2. **Order Tracking**
3. **Customer Account**
4. **Wishlist**
5. **Product Reviews**
6. **Recommendations**

---

**Last Updated**: 2024-12-20  
**Status**: Ready for Implementation

