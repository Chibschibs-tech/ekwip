# Ekwip Web Application

**Ekwip** - IT Equipment Rental & Solutions Platform

A comprehensive Next.js 15 application providing three core services:
- **DaaS** (Device as a Service): IT equipment rental platform
- **Connect**: Audiovisual solutions and integration
- **Tech**: Custom web apps, AI agents, and automation

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Ekwip UI Kit
- **Database**: PostgreSQL (local) / Neon (production)
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **Email**: Resend API

## 📁 Project Structure

```
├── app/
│   ├── (corporate)/     # Corporate marketing pages
│   ├── (daas)/          # DaaS platform pages
│   ├── api/             # API routes
│   └── actions/         # Server actions
├── components/          # React components
├── contexts/            # React contexts
├── lib/                 # Utilities and helpers
├── scripts/             # Database scripts
└── types/               # TypeScript types
```

## 🏗️ Architecture

### Multi-Domain Routing
- **Corporate Site**: `/corporate/*` - Marketing and service pages
- **DaaS Site**: `/daas/*` - Product catalog and client portal
- **Admin Panel**: `/daas/admin/*` - Content management

### Key Features
- Product catalog with filtering
- Client portal for equipment management
- Admin panel for inventory management
- Quote request system ("Ma liste de besoins")
- Multi-language support (FR/EN)
- Responsive design

## 🗄️ Database

PostgreSQL schema includes:
- Products, Categories, Brands, Attributes
- Orders, Customers, Clients
- Stock management (multi-warehouse)
- Quote requests
- Admin users and settings

See `scripts/001-create-schema.sql` for full schema.

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- PostgreSQL (local) or Neon (production)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
# Execute scripts/001-create-schema.sql
# Execute scripts/002-seed-data.sql

# Start development server
pnpm dev
```

### Environment Variables

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `RESEND_API_KEY` - Resend email API key
- `CONTACT_EMAIL` - Contact form recipient email

Optional:
- `NEXT_PUBLIC_WORDPRESS_API_URL` - WordPress API (legacy)
- `WC_CONSUMER_KEY` - WooCommerce key (legacy)
- `WC_CONSUMER_SECRET` - WooCommerce secret (legacy)

## 📚 Documentation

- [UX/UI Harmonization Plan](./UX_UI_HARMONIZATION_PLAN.md)
- [Backend Architecture Review](./BACKEND_ARCHITECTURE_REVIEW.md)
- [Deep Dive Analysis](./DEEP_DIVE_ANALYSIS.md)
- [Context Tracker](./CONTEXT_TRACKER.md)
- [GitHub Setup Guide](./GITHUB_SETUP_GUIDE.md)

## 🔧 Development

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### Code Structure

- **Pages**: Next.js App Router pages in `app/`
- **Components**: Reusable UI components in `components/`
- **Contexts**: React Context providers in `contexts/`
- **API Routes**: Next.js API routes in `app/api/`
- **Utilities**: Helper functions in `lib/`

## 🎨 Design System

### Colors
- **Primary**: `#1F3B57` (Dark blue)
- **DaaS**: `#38BDF8` (Sky blue)
- **Connect**: `#10B981` (Green)
- **Tech**: `#F97316` (Orange)

### Components
- Custom Ekwip UI Kit
- Radix UI primitives
- Glassmorphism effects
- Scroll reveal animations

## 🔐 Security Notes

⚠️ **Important**: This application currently has:
- Mocked authentication (to be implemented)
- SQL injection vulnerability in `lib/db.ts` (to be fixed)
- No API route authentication (to be added)

See [Deep Dive Analysis](./DEEP_DIVE_ANALYSIS.md) for security recommendations.

## 📝 License

Private - Ekwip

## 👥 Team

Ekwip Development Team

---

**Status**: Active Development
**Last Updated**: 2024-12-19

