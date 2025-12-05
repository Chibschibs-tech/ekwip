# Database Configuration - Local vs Production

## Overview

The application is configured to work with **two separate databases**:

1. **Local Development Database** (Docker PostgreSQL)
   - Used for local development and testing
   - Runs in Docker container
   - Connection: `postgresql://ekwip:ekwip_dev_password@localhost:5432/ekwip`

2. **Production Database** (Neon PostgreSQL)
   - Used in production environment
   - Managed by Neon (serverless PostgreSQL)
   - Connection: Provided via `DATABASE_URL` environment variable

## How It Works

### Auto-Detection

The system automatically detects which database to use based on the `DATABASE_URL` environment variable:

**Local Database Detection:**
- If `DATABASE_URL` contains `localhost`
- If `DATABASE_URL` contains `127.0.0.1`
- If `DATABASE_URL` contains `postgres://ekwip`

**Production Database Detection:**
- Any other `DATABASE_URL` (assumed to be Neon)

### Code Implementation

**File**: `lib/db.ts`

```typescript
// Auto-detects environment
const isLocal = 
  DATABASE_URL.includes("localhost") ||
  DATABASE_URL.includes("127.0.0.1") ||
  DATABASE_URL.includes("postgres://ekwip")

// Uses appropriate client
if (isLocal) {
  postgresClient = postgres(DATABASE_URL)  // Local Docker
} else {
  neonClient = neon(DATABASE_URL)  // Production Neon
}
```

## Database Connection

### Local Development Setup

1. **Start Docker Database:**
   ```bash
   docker-compose up -d
   ```

2. **Set Environment Variable:**
   ```bash
   # .env.local
   DATABASE_URL=postgresql://ekwip:ekwip_dev_password@localhost:5432/ekwip
   ```

3. **Run Migrations:**
   ```bash
   docker exec -i ekwip-postgres psql -U ekwip -d ekwip < scripts/001-create-schema.sql
   docker exec -i ekwip-postgres psql -U ekwip -d ekwip < scripts/002-seed-data.sql
   ```

### Production Setup

1. **Set Environment Variable** (in your hosting platform):
   ```bash
   DATABASE_URL=postgresql://user:password@neon-host/dbname?sslmode=require
   ```

2. **Run Migrations** (via Neon SQL editor or psql):
   ```sql
   -- Execute scripts/001-create-schema.sql
   -- Execute scripts/002-seed-data.sql
   ```

## Important Notes

### ⚠️ Databases Are Separate

- **Local database** and **production database** are **completely separate**
- They do **NOT** sync automatically
- Data changes in one do **NOT** affect the other
- Each environment uses its own database instance

### 🔄 Switching Between Databases

The application automatically uses the correct database based on `DATABASE_URL`:

- **Local development**: Set `DATABASE_URL` to local Docker connection
- **Production**: Set `DATABASE_URL` to Neon connection string
- **No code changes needed** - it's automatic!

### 📊 Data Synchronization

If you need to sync data between databases:

1. **Export from production:**
   ```bash
   pg_dump "production-connection-string" > production-backup.sql
   ```

2. **Import to local:**
   ```bash
   docker exec -i ekwip-postgres psql -U ekwip -d ekwip < production-backup.sql
   ```

**⚠️ Warning**: Only do this for development/testing. Never overwrite production data!

## Current Status

✅ **Local Database**: Configured (Docker PostgreSQL)
✅ **Production Database**: Configured (Neon)
✅ **Auto-Detection**: Implemented
✅ **Connection Logic**: Supports both environments
✅ **API Routes**: Compatible with both databases

## Verification

### Test Local Database Connection

```bash
# Start Docker
docker-compose up -d

# Test connection
docker exec -it ekwip-postgres psql -U ekwip -d ekwip -c "SELECT version();"
```

### Test Production Database Connection

```bash
# Set production DATABASE_URL
export DATABASE_URL="your-neon-connection-string"

# Test via API
curl http://localhost:3000/api/products
```

## Troubleshooting

### "No database client available"

**Cause**: `DATABASE_URL` not set or invalid

**Solution**: 
- Check `.env.local` (local) or environment variables (production)
- Verify connection string format

### Connection Refused (Local)

**Cause**: Docker container not running

**Solution**:
```bash
docker-compose up -d
docker ps  # Verify container is running
```

### Connection Timeout (Production)

**Cause**: Wrong connection string or network issue

**Solution**:
- Verify Neon connection string
- Check if database is accessible
- Verify SSL mode (`?sslmode=require`)

---

**Last Updated**: 2024-12-19
**Status**: ✅ Configured and ready for use

