# DNS Setup for daas.ekwip.ma Subdomain

## Current DNS Configuration

Based on your genious.net DNS management panel, you need to add a DNS record for the `daas` subdomain.

## Option 1: CNAME Record (Recommended)

**If your main domain `ekwip.ma` points to Vercel:**

1. Go to your DNS management panel (genious.net)
2. Click "Add Record" or use the empty row at the bottom
3. Fill in:
   - **Host Name**: `daas`
   - **Record Type**: `CNAME (Alias)`
   - **Address**: `cname.vercel-dns.com` (or your Vercel CNAME target)
   - **Priority**: `N/A`

**Note**: Vercel will provide the exact CNAME target when you add the domain in Vercel dashboard.

## Option 2: A Record (If using IP address)

**If you have a static IP address:**

1. Go to your DNS management panel
2. Click "Add Record"
3. Fill in:
   - **Host Name**: `daas`
   - **Record Type**: `A (Address)`
   - **Address**: `76.76.21.21` (or your server's IP address)
   - **Priority**: `N/A`

## Vercel Configuration

After adding the DNS record:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add `daas.ekwip.ma` as a domain
3. Vercel will verify the DNS record
4. Once verified, the subdomain will be active

## Verification

After DNS propagation (usually 5-30 minutes):

```bash
# Check DNS resolution
nslookup daas.ekwip.ma

# Or use dig
dig daas.ekwip.ma
```

You should see the DNS record pointing to Vercel or your server.

---

**Last Updated**: 2024-12-19

