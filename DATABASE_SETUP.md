# Database Setup Guide - Ekwip

## Overview

The application supports two database configurations:
1. **Local Development**: PostgreSQL running in Docker
2. **Production**: Neon PostgreSQL (serverless)

---

## Local Development Setup (Docker)

### Prerequisites
- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

### Step 1: Start Docker PostgreSQL

```bash
# Start the database container
docker-compose up -d

# Verify it's running
docker ps

# Check logs
docker-compose logs postgres
```

### Step 2: Configure Environment

Create `.env.local` file (copy from `env.example`):

```bash
DATABASE_URL=postgresql://ekwip:ekwip_dev_password@localhost:5432/ekwip
RESEND_API_KEY=your_key_here
CONTACT_EMAIL=contact@ekwip.ma
```

### Step 3: Run Database Migrations

```bash
# Connect to the database
docker exec -it ekwip-postgres psql -U ekwip -d ekwip

# Or use a database client (DBeaver, pgAdmin, etc.)
# Connection: localhost:5432
# Database: ekwip
# User: ekwip
# Password: ekwip_dev_password
```

**Run SQL scripts:**
```sql
-- Execute scripts/001-create-schema.sql
-- Execute scripts/002-seed-data.sql
```

Or from command line:
```bash
# Run schema
docker exec -i ekwip-postgres psql -U ekwip -d ekwip < scripts/001-create-schema.sql

# Run seed data
docker exec -i ekwip-postgres psql -U ekwip -d ekwip < scripts/002-seed-data.sql
```

### Step 4: Verify Connection

```bash
# Test connection
pnpm dev

# Check if API routes work
curl http://localhost:3000/api/products
```

### Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v

# View logs
docker-compose logs -f postgres

# Access PostgreSQL shell
docker exec -it ekwip-postgres psql -U ekwip -d ekwip
```

---

## Production Setup (Neon)

### Step 1: Create Neon Database

1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string

### Step 2: Configure Environment

Set `DATABASE_URL` in your deployment platform (Vercel, etc.):

```
DATABASE_URL=postgresql://user:password@neon-host/dbname?sslmode=require
```

### Step 3: Run Migrations

Use Neon's SQL editor or connect via psql:

```bash
# Connect to Neon
psql "your-neon-connection-string"

# Run migrations
\i scripts/001-create-schema.sql
\i scripts/002-seed-data.sql
```

---

## Database Configuration

### Current Implementation

**File**: `lib/db.ts`

**Auto-detection**:
- Local: If `DATABASE_URL` contains `localhost`, `127.0.0.1`, or `postgres://ekwip`
- Production: Otherwise (assumes Neon)

**Connection**:
- Local: Uses `postgres` package (connection pooling)
- Production: Uses `@neondatabase/serverless` (serverless)

### Environment Variables

**Required**:
```bash
DATABASE_URL=postgresql://user:password@host:port/database
```

**Local Example**:
```bash
DATABASE_URL=postgresql://ekwip:ekwip_dev_password@localhost:5432/ekwip
```

**Production Example**:
```bash
DATABASE_URL=postgresql://user:password@ep-xxx.region.neon.tech/dbname?sslmode=require
```

---

## Database Schema

### Tables

1. **categories** - Product categories
2. **brands** - Product brands
3. **attributes** - Product attributes
4. **products** - Main products table
5. **warehouses** - Warehouse locations
6. **stock** - Inventory tracking
7. **stock_movements** - Inventory audit trail
8. **clients** - B2B clients
9. **customer_addresses** - Client addresses
10. **orders** - Orders
11. **order_items** - Order line items
12. **suppliers** - Suppliers
13. **coupons** - Discount codes
14. **banners** - Marketing banners
15. **pages** - CMS pages
16. **admin_users** - Admin accounts
17. **shop_settings** - Shop configuration
18. **quote_requests** - Quote requests

### Migration Scripts

- `scripts/001-create-schema.sql` - Creates all tables
- `scripts/002-seed-data.sql` - Seeds initial data

---

## Troubleshooting

### Connection Issues

**Error**: "No database client available"

**Solution**:
1. Check `DATABASE_URL` is set
2. Verify Docker container is running (local)
3. Check connection string format

**Error**: "Connection refused"

**Solution**:
1. Verify Docker container is running: `docker ps`
2. Check port 5432 is not in use
3. Verify connection string matches Docker config

### Migration Issues

**Error**: "relation already exists"

**Solution**:
- Tables already created, skip schema script
- Or drop and recreate: `docker-compose down -v && docker-compose up -d`

### Data Issues

**Reset Database**:
```bash
# Stop and remove volumes
docker-compose down -v

# Restart
docker-compose up -d

# Re-run migrations
docker exec -i ekwip-postgres psql -U ekwip -d ekwip < scripts/001-create-schema.sql
docker exec -i ekwip-postgres psql -U ekwip -d ekwip < scripts/002-seed-data.sql
```

---

## Security Notes

⚠️ **Important**:
- Never commit `.env.local` or `.env` files
- Use strong passwords in production
- Enable SSL for production connections (`?sslmode=require`)
- Rotate database credentials regularly
- Use connection pooling (configured in `lib/db.ts`)

---

## Next Steps

1. ✅ Docker configuration created
2. ✅ Database connection updated
3. ⏳ Install `postgres` package: `pnpm add postgres`
4. ⏳ Test local database connection
5. ⏳ Verify production database connection
6. ⏳ Document production deployment process

---

**Last Updated**: 2024-12-19


