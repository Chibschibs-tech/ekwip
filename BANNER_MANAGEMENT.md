# Banner Management System

**Last Updated**: 2024-12-20 13:45 UTC

## Overview

The banner management system allows content managers to create and manage promotional banners for the Boutique homepage and other sections of the website. Banners are fully mobile-responsive and can be easily configured through the admin panel.

## Access

- **Admin Panel**: `/admin/content/banners` or `/daas/admin/content/banners`
- **Navigation**: Admin Sidebar → Contenu → Bannières

## Banner Structure

### Positions

Banners can be placed in different positions:
- **Boutique**: Promotional banners on `/boutique` homepage (3 banners: 1 large + 2 small)
- **Hero**: Hero banners for main pages
- **Sidebar**: Sidebar promotional banners
- **Footer**: Footer promotional banners

### Boutique Banner Layout

The Boutique page displays exactly **3 banners**:
1. **Order 0**: Large featured banner (left side, 2/3 width)
2. **Order 1-2**: Small banners (right side, stacked vertically, 1/3 width each)

Only **active banners** are displayed, sorted by **order** (ascending). The first 3 active banners are shown.

## Banner Fields

### Required Fields
- **Titre** (Title): Banner title displayed on the banner
- **Position**: Where the banner will appear (Boutique, Hero, Sidebar, Footer)
- **Image Desktop**: Main image URL for desktop displays
- **Ordre** (Order): Display order (0 = first/large for Boutique, 1-2 = small)

### Optional Fields
- **Description**: Subtitle/description text shown below title
- **Lien** (Link): URL to navigate when banner is clicked
- **Texte du bouton** (Button Text): Text for the call-to-action button
- **Date de début** (Start Date): When banner becomes active
- **Date de fin** (End Date): When banner expires (optional)
- **Active**: Enable/disable banner display

### Mobile Support

- **Activer sur mobile** (Activate on mobile): Toggle to enable mobile-optimized image
- **Image Mobile**: Separate image URL optimized for mobile devices (required if mobile is enabled)

## Image Guidelines

### Desktop Images

**Large Banner (Order 0)**:
- Recommended size: **1200x500px** minimum
- Aspect ratio: **2.4:1** (width:height)
- Format: WebP, PNG, or JPG
- The gradient/background should be **integrated into the image**

**Small Banners (Order 1-2)**:
- Recommended size: **600x500px** minimum
- Aspect ratio: **1.2:1** (width:height)
- Format: WebP, PNG, or JPG

### Mobile Images

- Recommended size: **800x600px** minimum
- Aspect ratio: **4:3** (width:height)
- Format: WebP, PNG, or JPG (optimized for mobile)

### Best Practices

1. **Optimize images** before uploading (compress for web)
2. **Include gradients** directly in images (no CSS gradients needed)
3. **Test on mobile** to ensure text is readable
4. **Use high contrast** between text and background
5. **Keep file sizes small** (< 500KB per image)

## Order Field Explanation

The **Order** field controls banner display order and size on the Boutique page:

- **Order 0**: 
  - Displayed as **large featured banner** on the left
  - Takes 2/3 of the width
  - Minimum height: 500px
  - **Only one banner should have order 0**

- **Order 1-2**:
  - Displayed as **small banners** on the right
  - Stacked vertically
  - Each takes 1/3 of the width
  - Minimum height: 245px each
  - Together they equal the height of the large banner

**Note**: Only the first 3 active banners (sorted by order) are displayed on the Boutique homepage.

## API Endpoints

### GET `/api/banners`
Fetch all banners with optional filters:
- `?position=boutique` - Filter by position
- `?active=true` - Only active banners

### POST `/api/banners`
Create a new banner

**Request Body**:
```json
{
  "title": "Promotion MacBook",
  "description": "Découvrez nos offres spéciales",
  "image": "https://example.com/banner.jpg",
  "mobileImage": "https://example.com/banner-mobile.jpg",
  "isMobileEnabled": true,
  "link": "/boutique?category=laptops",
  "buttonText": "Acheter maintenant",
  "position": "boutique",
  "order": 0,
  "isActive": true,
  "startDate": "2024-12-20T00:00:00Z",
  "endDate": null
}
```

### GET `/api/banners/[id]`
Fetch a single banner by ID

### PUT `/api/banners/[id]`
Update a banner

### DELETE `/api/banners/[id]`
Delete a banner

## Component Usage

The `BoutiquePromotionalBanners` component automatically:
- Fetches active boutique banners from the API
- Sorts them by order
- Displays the first 3 banners
- Shows mobile images on mobile devices (< 1024px width)
- Falls back to desktop images if mobile images not available

## Database Schema

```sql
CREATE TABLE banners (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500) NOT NULL,
  mobile_image VARCHAR(500),
  is_mobile_enabled BOOLEAN DEFAULT false,
  link VARCHAR(500),
  button_text VARCHAR(100),
  position VARCHAR(20) DEFAULT 'hero' CHECK (position IN ('hero', 'sidebar', 'footer', 'boutique')),
  sort_order INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Migration

To apply database changes, run:
```bash
npm run tsx scripts/run-banners-migration.ts
```

Or manually execute `scripts/006-update-banners-table.sql` in your database.

## Troubleshooting

### Banners not showing
1. Check banner is **active** (`isActive: true`)
2. Check banner **position** is "boutique"
3. Check banner **order** is 0, 1, or 2 (only first 3 are displayed)
4. Verify **start date** is in the past
5. Verify **end date** is in the future (or null)

### Mobile images not showing
1. Check **isMobileEnabled** is true
2. Verify **mobileImage** URL is valid
3. Clear browser cache
4. Check browser viewport width (< 1024px for mobile)

### Image display issues
1. Verify image URLs are accessible (not blocked by CORS)
2. Check image formats are supported (WebP, PNG, JPG)
3. Ensure images are properly sized (see guidelines above)
4. Check image file sizes aren't too large

---

**This document is updated with each banner system change.**

