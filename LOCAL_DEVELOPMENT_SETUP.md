# Local Development Setup for Subdomains

## Problem

When developing locally, clicking "DaaS" in the menu redirects to `daas.ekwip.ma` (production), but it should work locally.

## Solution: Localhost Subdomain Setup

### Windows (Hosts File)

1. **Open Notepad as Administrator:**
   - Right-click Notepad → "Run as administrator"

2. **Open hosts file:**
   - File → Open
   - Navigate to: `C:\Windows\System32\drivers\etc\`
   - Change file type to "All Files"
   - Open `hosts`

3. **Add local subdomain:**
   ```
   127.0.0.1    daas.localhost
   127.0.0.1    localhost
   ```

4. **Save the file**

### macOS/Linux (Hosts File)

1. **Open terminal**

2. **Edit hosts file:**
   ```bash
   sudo nano /etc/hosts
   ```

3. **Add local subdomain:**
   ```
   127.0.0.1    daas.localhost
   127.0.0.1    localhost
   ```

4. **Save**: `Ctrl+X`, then `Y`, then `Enter`

## Testing Local Subdomain

### Start Development Server

```bash
pnpm dev
```

### Access Sites

- **Corporate**: http://localhost:3000
- **DaaS**: http://daas.localhost:3000

## Alternative: Use Port-Based Routing

If hosts file setup is complex, you can use port-based routing:

- **Corporate**: http://localhost:3000
- **DaaS**: http://localhost:3001

But this requires running two Next.js instances.

## Current Middleware Support

The middleware already supports:
- `daas.localhost:3000`
- `daas.localhost`
- `daas.ekwip.ma` (production)

So once you set up the hosts file, it should work automatically!

---

**Last Updated**: 2024-12-19

