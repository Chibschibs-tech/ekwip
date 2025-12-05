#!/usr/bin/env node
/**
 * Vercel Deployment Monitor
 * 
 * Monitors Vercel deployments and reports status
 * 
 * Usage:
 *   node scripts/monitor-vercel.js
 *   OR
 *   pnpm vercel:monitor
 * 
 * Requires:
 *   - VERCEL_TOKEN environment variable (get from Vercel dashboard)
 *   - VERCEL_PROJECT_ID or VERCEL_TEAM_ID (optional, auto-detected)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const PROJECT_NAME = process.env.VERCEL_PROJECT_NAME || 'ekwip';

if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN environment variable is required');
  console.error('   Get your token from: https://vercel.com/account/tokens');
  process.exit(1);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function getProject() {
  const url = VERCEL_TEAM_ID
    ? `https://api.vercel.com/v9/projects/${PROJECT_NAME}?teamId=${VERCEL_TEAM_ID}`
    : `https://api.vercel.com/v9/projects/${PROJECT_NAME}`;

  const response = await makeRequest(url);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

async function getDeployments(projectId, limit = 5) {
  const url = VERCEL_TEAM_ID
    ? `https://api.vercel.com/v6/deployments?projectId=${projectId}&teamId=${VERCEL_TEAM_ID}&limit=${limit}`
    : `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=${limit}`;

  const response = await makeRequest(url);
  if (response.status === 200) {
    return response.data.deployments || [];
  }
  return [];
}

async function getDeploymentLogs(deploymentId) {
  const url = VERCEL_TEAM_ID
    ? `https://api.vercel.com/v2/deployments/${deploymentId}/events?teamId=${VERCEL_TEAM_ID}`
    : `https://api.vercel.com/v2/deployments/${deploymentId}/events`;

  const response = await makeRequest(url);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

function formatStatus(status) {
  const statusMap = {
    'READY': '✅',
    'BUILDING': '🔄',
    'ERROR': '❌',
    'QUEUED': '⏳',
    'CANCELED': '🚫',
  };
  return statusMap[status] || status;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

async function monitor() {
  console.log('🔍 Monitoring Vercel deployments...\n');

  try {
    // Get project
    const project = await getProject();
    if (!project) {
      console.error('❌ Project not found. Check VERCEL_PROJECT_NAME or VERCEL_PROJECT_ID');
      process.exit(1);
    }

    console.log(`📦 Project: ${project.name}`);
    console.log(`🔗 URL: https://${project.name}.vercel.app\n`);

    // Get recent deployments
    const deployments = await getDeployments(project.id, 5);
    
    if (deployments.length === 0) {
      console.log('⚠️  No deployments found');
      return;
    }

    console.log('📋 Recent Deployments:\n');
    
    for (const deployment of deployments) {
      const status = formatStatus(deployment.state);
      const time = formatTime(deployment.createdAt);
      const commit = deployment.meta?.githubCommitMessage || 'No commit message';
      const branch = deployment.meta?.githubCommitRef || 'unknown';
      
      console.log(`${status} ${deployment.state} - ${time}`);
      console.log(`   Branch: ${branch}`);
      console.log(`   Commit: ${commit.substring(0, 60)}`);
      console.log(`   URL: https://${deployment.url}`);
      
      if (deployment.state === 'ERROR') {
        console.log(`   ⚠️  Build failed! Check logs for details.`);
      }
      console.log('');
    }

    // Check latest deployment
    const latest = deployments[0];
    if (latest.state === 'ERROR') {
      console.log('❌ Latest deployment failed!\n');
      console.log('📄 Fetching error logs...\n');
      
      const logs = await getDeploymentLogs(latest.uid);
      if (logs && logs.length > 0) {
        const errorLogs = logs.filter(log => log.type === 'command' && log.payload?.text);
        if (errorLogs.length > 0) {
          console.log('Error details:');
          errorLogs.slice(-5).forEach(log => {
            console.log(`  ${log.payload.text}`);
          });
        }
      }
      
      process.exit(1);
    } else if (latest.state === 'READY') {
      console.log('✅ Latest deployment successful!');
      process.exit(0);
    } else {
      console.log(`⏳ Latest deployment is ${latest.state}`);
      process.exit(0);
    }

  } catch (error) {
    console.error('❌ Error monitoring deployments:', error.message);
    process.exit(1);
  }
}

// Run monitor
monitor();

