# Push Local Database to Production

## Overview

This guide explains how to sync/push data from your local Docker database to the production Neon database.

## Prerequisites

1. **Local Docker database** running and accessible
2. **Production database** connection string available
3. **Both databases** have the same schema

## Setup

### 1. Set Environment Variables

Create or update `.env.local`:

```bash
# Local Database (Docker)
LOCAL_DATABASE_URL=postgresql://ekwip:ekwip_dev_password@localhost:5432/ekwip

# Production Database (Neon)
PROD_DATABASE_URL=postgresql://user:password@neon-host/dbname?sslmode=require
```

**OR** set them temporarily:

```bash
# Windows PowerShell
$env:LOCAL_DATABASE_URL="postgresql://ekwip:ekwip_dev_password@localhost:5432/ekwip"
$env:PROD_DATABASE_URL="your-neon-connection-string"
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Sync Script

```bash
# Using tsx (recommended)
pnpm tsx scripts/sync-local-to-prod.ts

# Or using ts-node
pnpm ts-node scripts/sync-local-to-prod.ts
```

## What Gets Synced

The script syncs the following tables (in order):

1. ✅ `categories` - Product categories
2. ✅ `brands` - Product brands
3. ✅ `attributes` - Product attributes
4. ✅ `products` - Products
5. ✅ `warehouses` - Warehouse locations
6. ✅ `stock` - Inventory levels
7. ✅ `clients` - B2B clients
8. ✅ `customer_addresses` - Client addresses
9. ✅ `suppliers` - Suppliers
10. ✅ `coupons` - Discount codes
11. ✅ `banners` - Marketing banners
12. ✅ `pages` - CMS pages
13. ✅ `admin_users` - Admin accounts
14. ✅ `shop_settings` - Shop configuration

**⚠️ NOT Synced:**
- `orders` - Preserves production order history
- `order_items` - Preserves production order items
- `stock_movements` - Preserves production audit trail
- `quote_requests` - Preserves production quotes

## Sync Behavior

- **Upsert**: Uses `INSERT ... ON CONFLICT` to update existing records or insert new ones
- **ID-based**: Matches records by `id` field
- **Non-destructive**: Only adds/updates data, doesn't delete

## Manual Sync (Alternative)

If you prefer to sync manually:

### Export from Local

```bash
# Export specific table
docker exec ekwip-postgres pg_dump -U ekwip -d ekwip -t products > products.sql

# Export all data
docker exec ekwip-postgres pg_dump -U ekwip -d ekwip --data-only > local-data.sql
```

### Import to Production

```bash
# Using psql
psql "your-neon-connection-string" < local-data.sql

# Or using Neon SQL Editor
# Copy and paste SQL from local-data.sql
```

## Safety Checklist

Before syncing:

- [ ] ✅ Backup production database
- [ ] ✅ Verify local database has correct data
- [ ] ✅ Test sync on a staging database first (if available)
- [ ] ✅ Verify production DATABASE_URL is correct
- [ ] ✅ Ensure both databases have same schema

## Troubleshooting

### "PROD_DATABASE_URL not set"

**Solution**: Set the environment variable:
```bash
$env:PROD_DATABASE_URL="your-neon-connection-string"
```

### "Connection refused" (Local)

**Solution**: Start Docker database:
```bash
docker-compose up -d
```

### "Connection timeout" (Production)

**Solution**: 
- Verify Neon connection string
- Check if database is accessible
- Verify SSL mode (`?sslmode=require`)

### "Table does not exist"

**Solution**: Run migrations on production:
```bash
psql "your-neon-connection-string" < scripts/001-create-schema.sql
```

## Best Practices

1. **Always backup production** before syncing
2. **Test on staging first** if available
3. **Sync during low-traffic hours**
4. **Verify data after sync**
5. **Keep local and production schemas in sync**

## Automated Sync (Future)

Consider setting up:
- GitHub Actions for automated syncs
- Scheduled syncs (daily/weekly)
- Change detection (only sync modified data)
- Rollback mechanism

---

**Last Updated**: 2024-12-19

