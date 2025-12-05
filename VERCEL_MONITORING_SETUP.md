# Vercel Deployment Monitoring Setup

## Overview

This guide explains how to set up automated monitoring for Vercel deployments to detect failures without manual intervention.

## Quick Fix: Next.js Vulnerability

✅ **Fixed**: Updated Next.js from `15.2.4` to `^15.2.6` (patched version for CVE-2025-66478)

## Monitoring Options

### Option 1: GitHub Actions (Recommended - Automated)

**Status**: ✅ Configured

The repository includes a GitHub Actions workflow (`.github/workflows/vercel-monitor.yml`) that:
- Runs every 15 minutes
- Checks deployment status
- Reports failures
- Can send Slack notifications

**Setup Steps:**

1. **Get Vercel Token:**
   - Go to https://vercel.com/account/tokens
   - Create a new token
   - Copy the token

2. **Add GitHub Secrets:**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN` - Your Vercel API token
     - `VERCEL_TEAM_ID` - (Optional) Your Vercel team ID
     - `VERCEL_PROJECT_NAME` - (Optional) Project name (default: 'ekwip')

3. **Enable Workflow:**
   - The workflow is already in `.github/workflows/vercel-monitor.yml`
   - It will run automatically after you add the secrets

### Option 2: Local Script (Manual)

**Status**: ✅ Available

Run the monitoring script locally:

```bash
# Set environment variables
$env:VERCEL_TOKEN="your-token-here"
$env:VERCEL_TEAM_ID="your-team-id"  # Optional
$env:VERCEL_PROJECT_NAME="ekwip"     # Optional

# Run monitor
pnpm vercel:monitor
```

### Option 3: Vercel Dashboard (Manual)

- Go to https://vercel.com/dashboard
- Select your project
- View deployments tab
- Set up email/Slack notifications in project settings

## Getting Vercel API Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it (e.g., "Deployment Monitor")
4. Copy the token
5. Add to GitHub Secrets or environment variables

## Getting Vercel Team/Project ID

1. Go to your Vercel project
2. Open browser DevTools (F12)
3. Go to Network tab
4. Refresh the page
5. Look for API calls to `api.vercel.com`
6. Find `teamId` and `projectId` in the requests

Or use the Vercel CLI:
```bash
vercel teams ls
vercel projects ls
```

## Monitoring Features

The monitoring script checks:
- ✅ Latest deployment status
- ✅ Build success/failure
- ✅ Deployment URLs
- ✅ Commit messages
- ✅ Error logs (if deployment failed)

## Automated Alerts

### GitHub Actions Notifications

The workflow can send notifications via:
- **Slack**: Add `SLACK_WEBHOOK_URL` to GitHub Secrets
- **Email**: GitHub sends emails on workflow failures (if enabled)
- **GitHub Actions UI**: View status in Actions tab

### Setting Up Slack Notifications

1. Create a Slack webhook:
   - Go to https://api.slack.com/messaging/webhooks
   - Create a new webhook
   - Copy the webhook URL

2. Add to GitHub Secrets:
   - `SLACK_WEBHOOK_URL` - Your Slack webhook URL

3. The workflow will automatically send notifications on failures

## Troubleshooting

### "VERCEL_TOKEN is required"

**Solution**: Add `VERCEL_TOKEN` to GitHub Secrets or environment variables

### "Project not found"

**Solution**: 
- Check `VERCEL_PROJECT_NAME` matches your project name
- Or set `VERCEL_PROJECT_ID` instead

### "Unauthorized"

**Solution**: 
- Verify your Vercel token is valid
- Check token has correct permissions
- Regenerate token if needed

## Current Status

- ✅ Next.js updated to secure version (15.2.6+)
- ✅ Monitoring script created
- ✅ GitHub Actions workflow configured
- ⏳ Add VERCEL_TOKEN to GitHub Secrets to enable

## Next Steps

1. **Update Next.js** (already done):
   ```bash
   pnpm install
   git add package.json pnpm-lock.yaml
   git commit -m "security: Update Next.js to fix CVE-2025-66478"
   git push
   ```

2. **Set up monitoring**:
   - Add `VERCEL_TOKEN` to GitHub Secrets
   - Workflow will start monitoring automatically

3. **Verify deployment**:
   - Check Vercel dashboard
   - Deployment should succeed after Next.js update

---

**Last Updated**: 2024-12-19
**Status**: ✅ Monitoring configured, waiting for VERCEL_TOKEN

