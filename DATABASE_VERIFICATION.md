# Database Verification Guide

This guide explains how to verify database connections and data for both local and production databases.

## Quick Start

### Check Local Database
```bash
pnpm db:verify
```

### Check Production Database
```bash
# Set production database URL first
$env:PROD_DATABASE_URL="your-production-connection-string"
pnpm db:verify:prod
```

### Check Both Databases
```bash
$env:PROD_DATABASE_URL="your-production-connection-string"
pnpm db:verify:both
```

## Prerequisites

### For Local Database
1. **Docker must be running**
   ```bash
   docker ps
   ```

2. **Database container must be started**
   ```bash
   pnpm db:start
   # Or
   docker-compose up -d
   ```

3. **Database must be initialized**
   - Schema created: `scripts/001-create-schema.sql`
   - Data seeded: `scripts/002-seed-data.sql`

### For Production Database
1. **Production database URL must be set**
   ```bash
   # PowerShell
   $env:PROD_DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   
   # Or add to .env.local (not committed to git)
   PROD_DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
   ```

## Database Configuration

### Local Database (Docker)
- **Container**: `ekwip-dev-db`
- **User**: `ekwip_dev`
- **Password**: `ekwip_dev_password`
- **Database**: `ekwip_dev`
- **Port**: `5432`
- **Connection String**: `postgresql://ekwip_dev:ekwip_dev_password@localhost:5432/ekwip_dev`

### Production Database (Neon)
- **Provider**: Neon PostgreSQL
- **Connection**: Provided via `PROD_DATABASE_URL` environment variable
- **Format**: `postgresql://user:pass@host/db?sslmode=require`

## What Gets Verified

The script checks:

1. **Categories**
   - Total count
   - Sample records
   - Specific category: `ordinateurs-portables`

2. **Brands**
   - Total count
   - Sample records

3. **Products**
   - Total count
   - Sample records
   - Products in target category

## Troubleshooting

### "Docker container not running"
```bash
# Start Docker container
pnpm db:start

# Check if it's running
docker ps | grep ekwip-dev-db
```

### "Connection refused" (Local)
- Make sure Docker Desktop is running
- Check container is up: `docker ps`
- Check container logs: `pnpm db:logs`

### "No database URL provided" (Production)
```bash
# Set the environment variable
$env:PROD_DATABASE_URL="your-connection-string"

# Or create .env.local with:
PROD_DATABASE_URL=your-connection-string
```

### "No categories/brands/products found"
The database might not be seeded yet. Run:
```bash
# Connect to database
docker exec -it ekwip-dev-db psql -U ekwip_dev -d ekwip_dev

# Or run seed script
docker exec -i ekwip-dev-db psql -U ekwip_dev -d ekwip_dev < scripts/002-seed-data.sql
```

## Example Output

```
╔══════════════════════════════════════════════════════════════════════════╗
║                   Database Verification Script                          ║
║           Ekwip - Categories, Brands, Products Check                    ║
╚══════════════════════════════════════════════════════════════════════════╝

======================================================================
📊 Verifying Local (Docker) Database (LOCAL)
======================================================================
✅ Docker container is running
✅ Connected to Local (Docker) database

📁 Checking Categories...
   Total: 5
   Sample categories:
   - Ordinateurs portables (ordinateurs-portables) - Active: Yes - Products: 3
   - Smartphones (smartphones) - Active: Yes - Products: 1
   ...

🏷️  Checking Brands...
   Total: 5
   Sample brands:
   - Apple (apple) - Active: Yes - Products: 3
   ...

📦 Checking Products...
   Total: 5
   Sample products:
   - MacBook Pro 14 (macbook-pro-14) - Type: rent - Status: active - Stock: 15
   ...

🔍 Checking specific category: "ordinateurs-portables"...
   ✅ Found: Ordinateurs portables
      ID: cat-laptops
      Active: Yes
      Product Count: 3
      Actual Products: 3

======================================================================
📋 SUMMARY
======================================================================

📍 LOCAL DATABASE:
   Categories: 5
   Brands: 5
   Products: 5
   Target category found: ✅

======================================================================
✅ Verification complete!
======================================================================
```

## Next Steps

After verifying:

1. **If data is missing**: Run seed scripts
2. **If connection fails**: Check Docker/Database status
3. **If categories/brands/products are empty**: Seed the database
4. **For API issues**: Check API routes use template strings (already fixed)

