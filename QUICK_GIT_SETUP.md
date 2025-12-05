# Quick Git Setup - Ekwip Project

## Current Status
✅ GitHub repository created  
⚠️ Git not installed or not in PATH  
⚠️ Local repository not initialized  

## Quick Setup Steps

### Step 1: Install Git (if not installed)

1. **Download Git for Windows:**
   - https://git-scm.com/download/win
   - Run installer with default settings
   - **Restart PowerShell after installation**

2. **Verify Installation:**
   ```powershell
   git --version
   ```

### Step 2: Run Setup Script

After Git is installed, run the automated setup script:

```powershell
.\setup-git.ps1
```

The script will:
- ✅ Check Git installation
- ✅ Initialize repository (if needed)
- ✅ Configure Git user (name & email)
- ✅ Add GitHub remote
- ✅ Stage and commit all files
- ✅ Push to GitHub

### Step 3: Manual Setup (Alternative)

If you prefer manual setup:

```powershell
# 1. Initialize repository
git init

# 2. Configure Git (use your GitHub email)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 3. Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 4. Stage all files
git add .

# 5. Create initial commit
git commit -m "Initial commit: Ekwip web application"

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Authentication

When pushing, GitHub will ask for credentials:

**Username:** Your GitHub username  
**Password:** Use a **Personal Access Token** (not your password)

**Create Token:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Name: "Ekwip Development"
5. Check `repo` scope
6. Generate and **copy the token**
7. Use token as password when pushing

## Verify Connection

After setup, verify everything works:

```powershell
# Check status
git status

# Check remote
git remote -v

# View commits
git log --oneline
```

## Daily Workflow

```powershell
# 1. Check what changed
git status

# 2. Stage changes
git add .

# 3. Commit
git commit -m "Description of changes"

# 4. Push to GitHub
git push
```

## Need Help?

See [GITHUB_SETUP_GUIDE.md](./GITHUB_SETUP_GUIDE.md) for detailed instructions.

---

**Once Git is installed, run `.\setup-git.ps1` for automated setup!**

