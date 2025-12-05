# Deployment Configuration - Ekwip Web Application

## Domain Configuration

### Production Domains

**Corporate Site**: `ekwip.ma`
- Routes to: `/corporate/*`
- Content: Marketing pages, service overviews (DaaS, Connect, Tech)
- Default domain for main website

**DaaS Subdomain**: `daas.ekwip.ma`
- Routes to: `/daas/*`
- Content: Product catalog, client portal, admin panel
- Subdomain for Device as a Service platform

### Current Middleware Configuration

**File**: `middleware.ts`

```typescript
// DaaS subdomain detection
const isDaasDomain = hostname.startsWith("daas.") || 
                     hostname === "daas.localhost:3000" || 
                     hostname === "daas.localhost";

if (isDaasDomain) {
    // Rewrite daas.ekwip.ma/* to /daas/*
    return NextResponse.rewrite(new URL(`/daas${path}`, request.url));
}

// Default: Corporate domain (ekwip.ma, www.ekwip.ma, localhost)
return NextResponse.rewrite(new URL(`/corporate${path}`, request.url));
```

### Domain Routing Logic

1. **DaaS Subdomain** (`daas.ekwip.ma`):
   - Detected by: `hostname.startsWith("daas.")`
   - Rewrites to: `/daas/*`
   - Examples:
     - `daas.ekwip.ma/` → `/daas/`
     - `daas.ekwip.ma/catalogue` → `/daas/catalogue`
     - `daas.ekwip.ma/admin` → `/daas/admin`

2. **Corporate Domain** (`ekwip.ma`, `www.ekwip.ma`):
   - Default fallback
   - Rewrites to: `/corporate/*`
   - Examples:
     - `ekwip.ma/` → `/corporate/`
     - `ekwip.ma/connect` → `/corporate/connect`
     - `www.ekwip.ma/tech` → `/corporate/tech`

### Required DNS Configuration

**For Production:**

1. **Main Domain** (`ekwip.ma`):
   - A Record: `ekwip.ma` → Server IP
   - CNAME Record: `www.ekwip.ma` → `ekwip.ma`

2. **DaaS Subdomain** (`daas.ekwip.ma`):
   - A Record: `daas.ekwip.ma` → Same Server IP
   - OR CNAME: `daas.ekwip.ma` → `ekwip.ma`

**Note**: Both domains must point to the same Next.js server. The middleware handles routing based on hostname.

---

## Database Configuration

### Current Status

**File**: `lib/db.ts`

**Current Implementation**: Only uses Neon (production database)
```typescript
import { neon } from "@neondatabase/serverless"
const sql = neon(process.env.DATABASE_URL!)
```

**Issue**: No local Docker database support currently implemented.

### Expected Configuration

Based on documentation, the database should support:

1. **Local Development** (Docker PostgreSQL):
   - Package: `postgres` (not currently in dependencies)
   - Connection: `postgresql://user:password@localhost:5432/ekwip`
   - Detection: `process.env.DATABASE_URL?.includes('localhost')`

2. **Production** (Neon):
   - Package: `@neondatabase/serverless` ✅ (installed)
   - Connection: Neon connection string
   - Detection: Non-localhost URL

### Required Changes

**1. Add Postgres Package:**
```bash
pnpm add postgres
```

**2. Update `lib/db.ts` to support both:**
```typescript
import postgres from "postgres"
import { neon } from "@neondatabase/serverless"

const isLocal = process.env.DATABASE_URL?.includes('localhost') || 
                process.env.DATABASE_URL?.includes('127.0.0.1')

const postgresClient = isLocal ? postgres(process.env.DATABASE_URL!) : null
const neonClient = !isLocal ? neon(process.env.DATABASE_URL!) : null

export const sql = async (query: TemplateStringsArray, ...params: any[]) => {
  if (isLocal && postgresClient) {
    return await postgresClient(query, ...params)
  } else if (neonClient) {
    return await neonClient(query, ...params)
  }
  throw new Error('No database client available')
}
```

### Docker Configuration (To Be Created)

**Expected Structure:**
```
docker-compose.yml
├── PostgreSQL service
│   ├── Image: postgres:15
│   ├── Port: 5432
│   ├── Environment: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB
│   └── Volumes: ./data/postgres
```

**Required Files:**
- `docker-compose.yml` - Docker services definition
- `.env.local` - Local environment variables
- `.env.example` - Example environment variables template

### Environment Variables

**Local Development** (`.env.local`):
```bash
# Local Docker PostgreSQL
DATABASE_URL=postgresql://ekwip:password@localhost:5432/ekwip

# Email
RESEND_API_KEY=re_...
CONTACT_EMAIL=contact@ekwip.ma
```

**Production** (`.env.production` or Vercel/Platform env vars):
```bash
# Neon Production Database
DATABASE_URL=postgresql://user:password@neon-host/dbname?sslmode=require

# Email
RESEND_API_KEY=re_...
CONTACT_EMAIL=contact@ekwip.ma
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Verify domain DNS configuration
- [ ] Set up Docker for local development
- [ ] Update `lib/db.ts` to support both local and production
- [ ] Create `docker-compose.yml` for local PostgreSQL
- [ ] Create `.env.example` template
- [ ] Test domain routing locally
- [ ] Verify middleware routing logic

### Domain Setup

- [ ] Configure DNS for `ekwip.ma`
- [ ] Configure DNS for `daas.ekwip.ma`
- [ ] Verify both domains resolve to same server
- [ ] Test routing on production

### Database Setup

- [ ] Create Docker PostgreSQL container
- [ ] Run migration scripts (`scripts/001-create-schema.sql`)
- [ ] Seed initial data (`scripts/002-seed-data.sql`)
- [ ] Configure production Neon database
- [ ] Test connection for both environments
- [ ] Verify data sync between environments

### Post-Deployment

- [ ] Verify `ekwip.ma` shows corporate site
- [ ] Verify `daas.ekwip.ma` shows DaaS platform
- [ ] Test API routes with database
- [ ] Monitor error logs
- [ ] Set up database backups

---

## Next Steps

1. **Create Docker Configuration**
   - Set up `docker-compose.yml`
   - Configure PostgreSQL service
   - Add initialization scripts

2. **Update Database Connection**
   - Modify `lib/db.ts` to support both local and production
   - Add `postgres` package
   - Test both connections

3. **Environment Setup**
   - Create `.env.example`
   - Document all required variables
   - Set up local `.env.local`

4. **Domain Testing**
   - Test middleware routing locally
   - Verify subdomain detection
   - Test production deployment

---

**Last Updated**: 2024-12-19
**Status**: Configuration review in progress

