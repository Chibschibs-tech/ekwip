#!/usr/bin/env node
/**
 * Test Vercel Monitoring Script
 * 
 * Tests the Vercel monitoring setup without making API calls
 * 
 * Usage:
 *   node scripts/test-vercel-monitor.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Vercel Monitoring Setup...\n');

// Check if monitoring script exists
const monitorScript = path.join(__dirname, 'monitor-vercel.js');
if (fs.existsSync(monitorScript)) {
  console.log('✅ Monitoring script exists: scripts/monitor-vercel.js');
} else {
  console.log('❌ Monitoring script not found');
  process.exit(1);
}

// Check if GitHub Actions workflow exists
const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'vercel-monitor.yml');
if (fs.existsSync(workflowPath)) {
  console.log('✅ GitHub Actions workflow exists: .github/workflows/vercel-monitor.yml');
  
  // Read and validate workflow
  const workflow = fs.readFileSync(workflowPath, 'utf8');
  
  // Check for required elements
  if (workflow.includes('VERCEL_TOKEN')) {
    console.log('✅ Workflow references VERCEL_TOKEN');
  } else {
    console.log('⚠️  Workflow does not reference VERCEL_TOKEN');
  }
  
  if (workflow.includes('cron')) {
    console.log('✅ Workflow has scheduled trigger (cron)');
  } else {
    console.log('⚠️  Workflow missing cron schedule');
  }
  
  if (workflow.includes('workflow_dispatch')) {
    console.log('✅ Workflow can be manually triggered');
  } else {
    console.log('⚠️  Workflow cannot be manually triggered');
  }
  
} else {
  console.log('❌ GitHub Actions workflow not found');
  process.exit(1);
}

// Check package.json for script
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
if (packageJson.scripts && packageJson.scripts['vercel:monitor']) {
  console.log('✅ pnpm script "vercel:monitor" exists');
} else {
  console.log('⚠️  pnpm script "vercel:monitor" not found');
}

// Check for documentation
const docsPath = path.join(__dirname, '..', 'VERCEL_MONITORING_SETUP.md');
if (fs.existsSync(docsPath)) {
  console.log('✅ Documentation exists: VERCEL_MONITORING_SETUP.md');
} else {
  console.log('⚠️  Documentation not found');
}

console.log('\n📋 Setup Checklist:');
console.log('   [ ] VERCEL_TOKEN added to GitHub Secrets');
console.log('   [ ] VERCEL_TEAM_ID added (if using team account)');
console.log('   [ ] VERCEL_PROJECT_NAME added (optional, defaults to "ekwip")');
console.log('   [ ] GitHub Actions enabled for repository');

console.log('\n🔍 To verify GitHub Actions is working:');
console.log('   1. Go to: https://github.com/Chibschibs-tech/ekwip/actions');
console.log('   2. Look for "Monitor Vercel Deployments" workflow');
console.log('   3. Check if it runs successfully');
console.log('   4. Or manually trigger it: Actions → Monitor Vercel Deployments → Run workflow');

console.log('\n✅ Setup verification complete!');

