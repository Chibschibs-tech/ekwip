# Database Configuration Summary

## ✅ Confirmed Configuration

### Local Database (Docker)
- **Container Name**: `ekwip-dev-db`
- **Image**: `postgres:16`
- **Connection**: `postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev`
- **Status**: Container exists but currently stopped
- **Location**: `.env.local` file

### Production Database (Neon)
- **Provider**: Neon PostgreSQL (serverless)
- **Connection**: `postgresql://neondb_owner:npg_ecKvVIh5rz9f@ep-sparkling-credit-agmyf0sl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require`
- **Database**: `neondb`
- **Status**: ✅ Deployed and accessible
- **Location**: Commented in `.env.local` (should be set in production environment)

## 🔗 Linking Local to Production

### Current Setup

1. **Local Development**:
   - Uses Docker PostgreSQL (`ekwip-dev-db`)
   - Auto-detected when `DATABASE_URL` contains `localhost`
   - Connection handled by `postgres` package

2. **Production**:
   - Uses Neon PostgreSQL
   - Auto-detected when `DATABASE_URL` is non-localhost
   - Connection handled by `@neondatabase/serverless` package

3. **Auto-Switching**:
   - Code in `lib/db.ts` automatically detects which database to use
   - No code changes needed when switching environments
   - Based on `DATABASE_URL` environment variable

## 📤 Pushing Changes from Local to Production

### Method 1: Automated Sync Script (Recommended)

**Created**: `scripts/sync-local-to-prod.ts`

**Usage**:
```bash
# Set production database URL
$env:PROD_DATABASE_URL="postgresql://neondb_owner:npg_ecKvVIh5rz9f@ep-sparkling-credit-agmyf0sl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# Run sync
pnpm db:sync
```

**What it does**:
- Connects to both local and production databases
- Syncs data from local → production
- Uses upsert (INSERT ... ON CONFLICT) to update existing records
- Preserves production orders and audit trails

**Tables synced**:
- ✅ categories, brands, attributes
- ✅ products, warehouses, stock
- ✅ clients, customer_addresses
- ✅ suppliers, coupons, banners
- ✅ pages, admin_users, shop_settings

**NOT synced** (to preserve production data):
- ❌ orders, order_items
- ❌ stock_movements
- ❌ quote_requests

### Method 2: Manual Export/Import

**Export from Local**:
```bash
# Start local database
docker start ekwip-dev-db

# Export data
docker exec ekwip-dev-db pg_dump -U ekwip_dev -d ekwip_dev --data-only > local-data.sql
```

**Import to Production**:
```bash
# Using psql
psql "postgresql://neondb_owner:npg_ecKvVIh5rz9f@ep-sparkling-credit-agmyf0sl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" < local-data.sql
```

## 🚀 Quick Start

### 1. Start Local Database

```bash
# Start Docker container
docker start ekwip-dev-db

# Or use docker-compose
pnpm db:start
```

### 2. Set Environment Variables

**For local development** (`.env.local`):
```bash
DATABASE_URL=postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev
```

**For production sync** (temporary):
```bash
$env:PROD_DATABASE_URL="postgresql://neondb_owner:npg_ecKvVIh5rz9f@ep-sparkling-credit-agmyf0sl-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

### 3. Sync Data

```bash
# Install dependencies (if not done)
pnpm install

# Run sync
pnpm db:sync
```

## 📋 Verification Checklist

Before syncing:

- [ ] ✅ Local database is running (`docker ps`)
- [ ] ✅ Production database connection string is correct
- [ ] ✅ Both databases have same schema
- [ ] ✅ Backup production database (recommended)
- [ ] ✅ Test sync on staging first (if available)

After syncing:

- [ ] ✅ Verify data in production database
- [ ] ✅ Test API endpoints
- [ ] ✅ Check for any errors in logs

## 🔧 Troubleshooting

### Local Database Not Running

```bash
# Start container
docker start ekwip-dev-db

# Check status
docker ps | Select-String "ekwip"
```

### Connection Issues

**Local**:
- Verify container is running: `docker ps`
- Check connection string matches `.env.local`
- Test: `docker exec -it ekwip-dev-db psql -U ekwip_dev -d ekwip_dev`

**Production**:
- Verify connection string is correct
- Check SSL mode (`?sslmode=require`)
- Test connection via Neon dashboard

### Sync Errors

- Check both databases have same schema
- Verify table names match
- Check for foreign key constraints
- Review error messages in sync output

## 📚 Documentation Files

- `DATABASE_CONFIGURATION.md` - Full database setup guide
- `DATABASE_SETUP.md` - Step-by-step setup instructions
- `scripts/push-to-prod.md` - Detailed sync guide
- `scripts/sync-local-to-prod.ts` - Sync script source code

## 🎯 Next Steps

1. **Start local database**: `docker start ekwip-dev-db`
2. **Install dependencies**: `pnpm install`
3. **Test local connection**: Verify API routes work
4. **Set production URL**: Add to environment variables
5. **Run sync**: `pnpm db:sync`
6. **Verify**: Check production database

---

**Last Updated**: 2024-12-19  
**Status**: ✅ Configuration confirmed and sync script ready

