# GitHub Setup Guide - Ekwip Project

## Prerequisites

### 1. Install Git (if not already installed)

**Windows:**
1. Download Git for Windows: https://git-scm.com/download/win
2. Run the installer
3. Use default settings (recommended)
4. After installation, restart your terminal/PowerShell

**Verify Installation:**
```powershell
git --version
```

### 2. Create GitHub Account (if needed)
- Go to https://github.com
- Sign up for a free account
- Verify your email

### 3. Create GitHub Repository

**Option A: Create via GitHub Website**
1. Go to https://github.com/new
2. Repository name: `ekwip-web-app` (or your preferred name)
3. Description: "Ekwip - IT Equipment Rental & Solutions Platform"
4. Choose: **Private** (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

**Option B: Create via GitHub CLI** (if you have it installed)
```powershell
gh repo create ekwip-web-app --private --description "Ekwip - IT Equipment Rental & Solutions Platform"
```

---

## Setup Steps

### Step 1: Initialize Git Repository (if not already done)

Open PowerShell in your project directory:
```powershell
cd C:\Users\GOCOM\.gemini\antigravity\playground\tensor-galileo
```

Check if Git is already initialized:
```powershell
# This will show an error if not initialized, or show status if initialized
git status
```

If not initialized, initialize it:
```powershell
git init
```

### Step 2: Configure Git (First Time Setup)

Set your name and email (use your GitHub account email):
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Verify configuration:
```powershell
git config --global --list
```

### Step 3: Add Remote Repository

After creating the GitHub repository, add it as remote:

```powershell
# Replace YOUR_USERNAME with your GitHub username
# Replace REPO_NAME with your repository name
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**Example:**
```powershell
git remote add origin https://github.com/ekwip/ekwip-web-app.git
```

Verify remote was added:
```powershell
git remote -v
```

### Step 4: Stage All Files

Add all files to staging:
```powershell
git add .
```

Check what will be committed:
```powershell
git status
```

### Step 5: Create Initial Commit

```powershell
git commit -m "Initial commit: Ekwip web application

- Next.js 15 application with TypeScript
- Multi-domain routing (Corporate, DaaS)
- Admin panel and client portal
- Product catalog and quote system
- Database schema and API routes
- Design system and UI components"
```

### Step 6: Push to GitHub

**First Push:**
```powershell
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)

**Create Personal Access Token:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name: "Ekwip Development"
4. Expiration: Choose your preference
5. Scopes: Check `repo` (full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again)
8. Use this token as your password when pushing

---

## Authentication Methods

### Option 1: Personal Access Token (Recommended for HTTPS)

Use the token as password when prompted. For convenience, you can cache credentials:

```powershell
# Cache credentials for 1 hour
git config --global credential.helper wincred

# Or cache for longer (8 hours)
git config --global credential.helper 'cache --timeout=28800'
```

### Option 2: SSH (More Secure, Recommended for Long-term)

**Generate SSH Key:**
```powershell
ssh-keygen -t ed25519 -C "your.email@example.com"
```

Press Enter to accept default location, then enter a passphrase (optional but recommended).

**Add SSH Key to GitHub:**
1. Copy your public key:
```powershell
cat ~/.ssh/id_ed25519.pub
```

2. Go to GitHub → Settings → SSH and GPG keys → New SSH key
3. Title: "Ekwip Development"
4. Key: Paste your public key
5. Click "Add SSH key"

**Update Remote to Use SSH:**
```powershell
git remote set-url origin git@github.com:YOUR_USERNAME/REPO_NAME.git
```

---

## Daily Workflow

### Making Changes and Pushing

1. **Check Status:**
```powershell
git status
```

2. **Stage Changes:**
```powershell
# Stage specific files
git add path/to/file.tsx

# Or stage all changes
git add .
```

3. **Commit Changes:**
```powershell
git commit -m "Description of changes

- Feature: Added new component
- Fix: Resolved bug in API route
- Style: Updated button styles"
```

4. **Push to GitHub:**
```powershell
git push
```

### Creating Branches (Recommended for Features)

```powershell
# Create and switch to new branch
git checkout -b feature/ux-harmonization

# Or using newer syntax
git switch -c feature/ux-harmonization

# Make changes, commit, then push
git push -u origin feature/ux-harmonization
```

### Pulling Latest Changes

```powershell
git pull
```

---

## Important Files to Commit

### ✅ Should Be Committed:
- Source code (`.tsx`, `.ts`, `.css`)
- Configuration files (`package.json`, `tsconfig.json`, `tailwind.config.ts`)
- Documentation (`.md` files)
- Database scripts (`scripts/*.sql`)
- Public assets (`public/` folder)

### ❌ Should NOT Be Committed (Already in .gitignore):
- `node_modules/`
- `.next/`
- `.env` and `.env.local`
- Build artifacts
- IDE files (`.vscode/`, `.idea/`)

---

## Backup Strategy

### Regular Backups

**Daily Commits:**
```powershell
git add .
git commit -m "Daily backup: [Date]"
git push
```

**Feature Branches:**
- Create a branch for each major feature
- Push branches to GitHub for backup
- Merge to main when complete

**Tags for Releases:**
```powershell
# Create a tag for important milestones
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

---

## Troubleshooting

### Git Not Found
**Error:** `git : Le terme «git» n'est pas reconnu`

**Solution:**
1. Install Git for Windows (see Prerequisites)
2. Restart PowerShell/terminal
3. Verify: `git --version`

### Authentication Failed
**Error:** `remote: Support for password authentication was removed`

**Solution:**
- Use Personal Access Token instead of password
- Or switch to SSH authentication

### Push Rejected
**Error:** `Updates were rejected because the remote contains work`

**Solution:**
```powershell
# Pull latest changes first
git pull origin main

# Resolve any conflicts, then push
git push
```

### Large Files
**Error:** File too large for GitHub

**Solution:**
- GitHub has a 100MB file size limit
- Use Git LFS for large files:
```powershell
git lfs install
git lfs track "*.pdf"
git add .gitattributes
```

---

## Quick Reference Commands

```powershell
# Check status
git status

# View changes
git diff

# Stage all changes
git add .

# Commit
git commit -m "Message"

# Push
git push

# Pull latest
git pull

# View commit history
git log --oneline

# Create branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# View branches
git branch -a

# View remote
git remote -v
```

---

## Next Steps After Setup

1. ✅ Verify push was successful on GitHub
2. ✅ Set up branch protection (GitHub Settings → Branches)
3. ✅ Add collaborators (if needed)
4. ✅ Set up GitHub Actions for CI/CD (optional)
5. ✅ Create issues for tracking tasks
6. ✅ Set up project board for workflow management

---

## Security Best Practices

1. **Never commit sensitive data:**
   - `.env` files
   - API keys
   - Passwords
   - Database credentials

2. **Use environment variables:**
   - Store in `.env.local` (already in .gitignore)
   - Document required variables in README

3. **Use Personal Access Tokens:**
   - Don't use your GitHub password
   - Rotate tokens regularly
   - Use minimum required permissions

4. **Keep repository private:**
   - Unless it's open source
   - Review access permissions regularly

---

## Support

If you encounter issues:
1. Check GitHub documentation: https://docs.github.com
2. Check Git documentation: https://git-scm.com/doc
3. Search Stack Overflow for specific errors

---

**Once setup is complete, you'll have:**
- ✅ Version control for all code
- ✅ Cloud backup on GitHub
- ✅ Ability to collaborate
- ✅ Change history tracking
- ✅ Branch management for features

