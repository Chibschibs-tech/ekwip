image.png# How to Verify Vercel Monitoring is Working

## ✅ Setup Verification

All components are in place:
- ✅ Monitoring script exists
- ✅ GitHub Actions workflow configured
- ✅ Workflow triggers: scheduled (every 15 min), manual, and on push
- ✅ VERCEL_TOKEN should be set in GitHub Secrets

## 🔍 Verify It's Working

### Method 1: Check GitHub Actions (Recommended)

1. **Go to Actions Tab:**
   ```
   https://github.com/Chibschibs-tech/ekwip/actions
   ```

2. **Look for "Monitor Vercel Deployments" workflow:**
   - Should show recent runs
   - Latest run should be from the recent push
   - Status should be ✅ (green) or ❌ (red)

3. **Check Latest Run:**
   - Click on the latest workflow run
   - Check the "Monitor Vercel deployments" step
   - Should show deployment status from Vercel

### Method 2: Manually Trigger Workflow

1. Go to: https://github.com/Chibschibs-tech/ekwip/actions
2. Click "Monitor Vercel Deployments" workflow
3. Click "Run workflow" button (top right)
4. Select branch: `main`
5. Click "Run workflow"
6. Wait for it to complete (usually 1-2 minutes)

### Method 3: Check Workflow Logs

If the workflow ran, you should see output like:
```
🔍 Monitoring Vercel deployments...

📦 Project: ekwip
🔗 URL: https://ekwip.vercel.app

📋 Recent Deployments:

✅ READY - 5m ago
   Branch: main
   Commit: security: Update Next.js to 15.2.6+ to fix CVE-2025-66478...
   URL: https://ekwip-xxx.vercel.app
```

## 🚨 Troubleshooting

### Workflow Not Running

**Possible causes:**
1. **GitHub Actions not enabled:**
   - Go to repository Settings → Actions → General
   - Ensure "Allow all actions and reusable workflows" is selected

2. **VERCEL_TOKEN not set:**
   - Go to Settings → Secrets and variables → Actions
   - Verify `VERCEL_TOKEN` exists

3. **Workflow file not committed:**
   - Check if `.github/workflows/vercel-monitor.yml` exists in repository

### Workflow Fails with "VERCEL_TOKEN is required"

**Solution:**
- The token is not set in GitHub Secrets
- Add it: Settings → Secrets → Actions → New repository secret
- Name: `VERCEL_TOKEN`
- Value: Your Vercel API token

### Workflow Fails with "Project not found"

**Solution:**
- The project name might be different
- Add `VERCEL_PROJECT_NAME` secret with your actual project name
- Or check your Vercel dashboard for the project name

### Workflow Runs But Shows No Deployments

**Possible causes:**
1. Project name mismatch
2. Team ID needed (if using team account)
3. Token doesn't have correct permissions

**Solution:**
- Add `VERCEL_TEAM_ID` if using a team account
- Verify project name matches exactly

## 📊 Expected Behavior

### Successful Monitoring:
- ✅ Workflow runs every 15 minutes
- ✅ Also runs on every push to main
- ✅ Can be manually triggered
- ✅ Shows deployment status
- ✅ Exits with code 0 if deployment is READY
- ✅ Exits with code 1 if deployment has ERROR

### Failure Detection:
- ❌ If latest deployment is ERROR, workflow fails
- ❌ Error logs are displayed
- ❌ GitHub Actions shows failed status
- ✅ You get notified (if notifications enabled)

## 🔔 Notifications

GitHub will automatically:
- Send email on workflow failure (if enabled in GitHub settings)
- Show badge in repository if workflow fails
- Display status in Actions tab

## ✅ Quick Test

Run this locally to test the monitoring script:

```bash
# Set your token (temporarily)
$env:VERCEL_TOKEN="your-token-here"

# Run the monitor
pnpm vercel:monitor
```

If it works locally, it should work in GitHub Actions too!

---

**Last Updated**: 2024-12-19

