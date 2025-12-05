# Ekwip Business & Technical Context Tracker

**Last Updated**: 2024-12-19
**Purpose**: Central repository of all business and technical knowledge to maintain context

---

## 1. Business Overview

### Company: Ekwip
- **Location**: Morocco
- **Market**: B2B (Business-to-Business)
- **Currency**: MAD (Moroccan Dirham)
- **Tax**: 20% VAT (TVA)

### Mission Statement
"Alignez vos équipes, vos outils et vos équipements."
Ekwip conçoit et opère l'infrastructure matérielle et digitale de votre entreprise.

---

## 2. Three Core Business Domains

### 2.1 Ekwip DaaS (Device as a Service)
**Domain**: `daas.ekwip.ma` or `/daas/*`
**Color**: Blue (`#38BDF8` / `ekwip-daas`)
**Icon**: Laptop

**Service**: IT Equipment Rental Platform
- **Products**: Laptops, smartphones, tablets, accessories, IT furniture
- **Model**: Monthly rental with upfront contributions
- **Durations**: 6, 12, 24, 36 months
- **Pricing**: Monthly fee (HT) + upfront contribution (HT) + 20% VAT
- **Features**:
  - Product catalog (e-commerce style)
  - Client portal for equipment management
  - Contract renewals tracking
  - Equipment health status
  - "Ma liste de besoins" (needs list) for quote requests

**Target**: B2B customers needing flexible IT equipment

**Key Pages**:
- `/daas/catalogue` - Product catalog
- `/daas/catalogue/[slug]` - Category pages
- `/daas/catalogue/product/[slug]` - Product detail
- `/daas/ma-liste-besoins` - Quote request page
- `/daas/portail-client/*` - Client portal
- `/daas/admin/*` - Admin panel

---

### 2.2 Ekwip Connect
**Domain**: `/corporate/connect`
**Color**: Green (`#10B981` / `ekwip-connect`)
**Icon**: Cast (Audiovisual)

**Service**: Audiovisual Solutions Distribution & Integration
- **Solutions**: Meeting rooms, video conferencing, digital signage
- **Process**: Full-service approach
  1. Audit
  2. Design
  3. Installation
  4. Support
- **Focus**: Technical integration and configuration on-site
- **Value Prop**: Teams focus on content, not technology

**Target**: Companies needing AV infrastructure

**Key Pages**:
- `/corporate/connect` - Service page

---

### 2.3 Ekwip Tech
**Domain**: `/corporate/tech`
**Color**: Orange (`#F97316` / `ekwip-tech`)
**Icon**: CPU

**Service**: Custom Development & AI Solutions
- **Offerings**:
  - Web apps (internal tools)
  - AI agents
  - Automation
  - Connectors
- **Approach**: Adapted to existing tech stack
- **Focus**: Streamline processes, reduce repetitive tasks
- **Value Prop**: Digital transformation support

**Target**: Companies needing digital transformation

**Key Pages**:
- `/corporate/tech` - Service page

---

## 3. Corporate Site Structure

**Domain**: Main corporate site
**Purpose**: Marketing, service overview, lead generation

**Key Pages**:
- `/corporate` - Homepage (overview of all three services)
- `/corporate/connect` - Connect service page
- `/corporate/tech` - Tech service page
- `/corporate/contact` - Contact page

**Navigation**:
- Links to DaaS catalog
- Links to Connect services
- Links to Tech services
- Contact CTA

---

## 4. Technical Architecture

### 4.1 Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Ekwip UI Kit
- **Database**: PostgreSQL (local) / Neon (production)
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **Email**: Resend API
- **Image Processing**: Client-side (Canvas API)

### 4.2 Domain Routing
- **Middleware**: Routes based on hostname
- **Corporate**: `/corporate/*`
- **DaaS**: `/daas/*`

### 4.3 Current Issues (To Fix)
1. **Dual Data System**: Admin uses DB, catalog uses hardcoded data
2. **SQL Injection**: Vulnerability in `lib/db.ts`
3. **No Authentication**: API routes unprotected
4. **WordPress Integration**: Legacy code, to be removed

---

## 5. Design System

### 5.1 Color Palette
- **Primary Deep**: `#1F3B57` (Dark blue)
- **DaaS**: `#38BDF8` (Sky blue)
- **Connect**: `#10B981` (Green)
- **Tech**: `#F97316` (Orange)

### 5.2 UI Components
- Custom Ekwip UI Kit
- Radix UI primitives
- Glassmorphism effects
- Scroll reveal animations

### 5.3 Current Design Patterns
- **Corporate**: Glassmorphic cards, gradient backgrounds
- **DaaS**: E-commerce style, product cards
- **Connect**: Service-focused, solution-oriented
- **Tech**: Modern, tech-forward

---

## 6. User Flows

### 6.1 DaaS Flow
1. Browse catalog (`/daas/catalogue`)
2. View product details
3. Add to "Ma liste de besoins"
4. Request quote
5. Client portal access (after order)
6. Equipment management

### 6.2 Connect Flow
1. View service page (`/corporate/connect`)
2. Request audit/consultation
3. Design phase
4. Installation
5. Support

### 6.3 Tech Flow
1. View service page (`/corporate/tech`)
2. Discuss project needs
3. Proposal
4. Development
5. Deployment

---

## 7. Key Features

### 7.1 DaaS Features
- Product catalog with filters
- "Ma liste de besoins" (needs list)
- Quote request system
- Client portal
- Equipment tracking
- Contract renewals
- Admin panel for inventory

### 7.2 Connect Features
- Service descriptions
- Solution showcases
- Process explanation
- Contact/consultation request

### 7.3 Tech Features
- Service descriptions
- Use case examples
- Project discussion
- Contact/consultation request

---

## 8. Content Strategy

### 8.1 Messaging
- **Corporate**: "Une seule entreprise pour vos besoins IT, AV et développement"
- **DaaS**: "Location d'équipements IT avec portail de gestion"
- **Connect**: "Solutions audiovisuelles pensées pour vos équipes"
- **Tech**: "Outils internes, automatisations et agents IA sur-mesure"

### 8.2 CTAs
- **Primary**: "Parler à un expert Ekwip" / "Parler d'un projet"
- **Secondary**: "Demander un devis" / "Demander un audit"
- **Tertiary**: "Explorer" / "Découvrir"

---

## 9. Data Models

### 9.1 Products (DaaS)
- Rental durations: 6, 12, 24, 36 months
- Monthly fee (HT)
- Upfront contribution (HT)
- Total calculation: (monthlyFee × duration) + upfront + VAT

### 9.2 Orders
- Types: rent, sale, quote
- Status: pending, confirmed, processing, shipped, delivered, cancelled
- Payment status: pending, paid, partial, refunded

### 9.3 Clients
- Company information
- Contact details
- Order history
- Equipment assignments

---

## 10. Known Gaps (To Fill Later)

### 10.1 Business Strategy
- Market positioning details
- Competitive advantages
- Growth strategy
- Target customer segments (detailed)

### 10.2 Operations
- Warehouse management workflow
- Equipment procurement process
- Maintenance and repair processes
- Equipment lifecycle management

### 10.3 Financial
- Profit margins
- Cost structure
- Pricing elasticity
- Revenue forecasting

### 10.4 Customer Success
- Customer retention strategies
- Upselling/cross-selling approaches
- Customer satisfaction metrics
- Churn prevention

### 10.5 Team Structure
- Organizational structure
- Role definitions
- Team workflows

---

## 11. Technical Debt & Issues

### 11.1 Critical
- SQL injection vulnerability
- Dual data system (admin vs catalog)
- No authentication on API routes

### 11.2 High Priority
- WordPress integration code (to remove)
- Hardcoded product data
- localStorage as data source

### 11.3 Medium Priority
- No data fetching library (React Query/SWR)
- Image handling (base64 in DB)
- Error handling improvements

---

## 12. Design Principles (Inferred)

### 12.1 Corporate
- Professional, trustworthy
- Modern, glassmorphic
- Clear service differentiation
- Strong CTAs

### 12.2 DaaS
- E-commerce feel
- Product-focused
- Easy browsing
- Clear pricing

### 12.3 Connect
- Solution-oriented
- Process-focused
- Trust-building
- Consultation-driven

### 12.4 Tech
- Modern, tech-forward
- Innovation-focused
- Project-oriented
- Customization emphasis

---

## Notes

- WordPress integration is legacy code from previous plan
- To be cleaned up once final architecture is decided
- Current focus: UX/UI harmonization of front pages

