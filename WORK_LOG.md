# Ekwip Development Work Log

This document tracks all development changes made to the Ekwip project to maintain context across sessions.

---

## Session: January 26, 2026

### Vercel Production Connection
- ✅ Linked local project to Vercel production (`v0-ekwip-website-design`)
- ✅ Pulled production environment variables to `.env.local`
- ✅ Database: Neon PostgreSQL (not Supabase)
- ✅ Domains: `ekwip.ma`, `daas.ekwip.ma`

### Homepage Improvements (Corporate)

#### 1. Hero CTA Button - "Nos domaines d'intervention"
- **File**: `app/(corporate)/corporate/page.tsx`
- **Change**: Made text white for better visibility on dark hero background
- **Before**: `text-ekwip-primary` (dark blue, hard to read)
- **After**: `text-white` with semi-transparent white background

#### 2. Language Switcher Hidden
- **Files**: 
  - `components/navbar.tsx` (DaaS site navbar)
  - `components/corporate-navbar.tsx` (Corporate site navbar)
- **Change**: Commented out FR/EN language switchers
- **Reason**: English translation not ready yet, keeping French only for now
- **Note**: Easy to re-enable by uncommenting the code

#### 3. Service Cards Styling (DaaS, Connect, Tech)
- **File**: `app/(corporate)/corporate/page.tsx`
- **Section**: "Nos domaines d'intervention aujourd'hui"
- **Changes**:
  - Card background: `bg-slate-50` (subtle grey) → `hover:bg-white` on hover
  - Border: `border-slate-200` (visible grey border)
  - Shadow: Lighter default, more prominent on hover
  - Image gradient overlay: Matches grey background, transitions to white on hover

#### 4. CardSlider Mobile Fix
- **File**: `components/ui/card-slider.tsx`
- **Change**: Fixed mobile slider visibility and gradient fades
- **Details**: Ensured mobile elements don't bleed through on desktop

---

## Pending Tasks / Future Work

- [ ] Complete English translations
- [ ] Re-enable language switcher when translations ready
- [ ] Review other pages for consistency

---

## Architecture Notes

### Database
- **Production**: Neon PostgreSQL (serverless)
- **Local**: Docker PostgreSQL
- **Config**: `lib/db.ts` auto-detects environment

### Deployment
- Push to `main` → Auto-deploy to Vercel
- Production URL: https://ekwip.ma

### Key Files
- `app/(corporate)/corporate/page.tsx` - Corporate homepage
- `app/(daas)/daas/` - DaaS platform pages
- `components/navbar.tsx` - Main navigation
- `lib/db.ts` - Database connection

---

*Last updated: January 26, 2026*
