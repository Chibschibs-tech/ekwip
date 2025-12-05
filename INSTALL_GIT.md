# Install Git for Windows - Step by Step

## Git is Not Currently Installed

Based on the checks, Git is not installed on your system. Here's how to install it:

---

## Method 1: Official Git Installer (Recommended)

### Step 1: Download Git
1. Go to: **https://git-scm.com/download/win**
2. The download should start automatically
3. Or click "Click here to download" if it doesn't

### Step 2: Run the Installer
1. Double-click the downloaded file (e.g., `Git-2.43.0-64-bit.exe`)
2. Click "Next" through the setup wizard

### Step 3: Important Installation Options

**On "Select Components" page:**
- ✅ Check "Git Bash Here"
- ✅ Check "Git GUI Here"
- ✅ Check "Associate .git* configuration files with the default text editor"
- ✅ Check "Associate .sh files to be run with Bash"

**On "Choosing the default editor" page:**
- Select your preferred editor (VS Code, Notepad++, etc.)
- Or leave default (Vim)

**On "Adjusting your PATH environment" page:**
- ✅ Select **"Git from the command line and also from 3rd-party software"** (IMPORTANT!)
- This ensures Git is available in PowerShell

**On "Choosing HTTPS transport backend" page:**
- ✅ Select "Use the OpenSSL library" (default)

**On "Configuring the line ending conversions" page:**
- ✅ Select "Checkout Windows-style, commit Unix-style line endings" (default)

**On "Configuring the terminal emulator" page:**
- ✅ Select "Use Windows' default console window" (default)

**On "Default behavior of `git pull`" page:**
- ✅ Select "Default (fast-forward or merge)" (default)

**On "Choose a credential helper" page:**
- ✅ Select "Git Credential Manager" (default)

**On "Extra options" page:**
- ✅ Check "Enable file system caching"
- ✅ Check "Enable symbolic links"

**On "Experimental options" page:**
- Leave unchecked (unless you want experimental features)

### Step 4: Complete Installation
1. Click "Install"
2. Wait for installation to complete
3. Click "Finish"

### Step 5: Verify Installation
1. **Close and reopen PowerShell** (important!)
2. Open PowerShell in your project folder
3. Run:
   ```powershell
   git --version
   ```
4. You should see something like: `git version 2.43.0.windows.1`

---

## Method 2: Using Winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```powershell
winget install --id Git.Git -e --source winget
```

Then restart PowerShell and verify:
```powershell
git --version
```

---

## Method 3: Using Chocolatey (If Installed)

If you have Chocolatey package manager:

```powershell
choco install git -y
```

Then restart PowerShell and verify:
```powershell
git --version
```

---

## After Installation

Once Git is installed:

1. **Restart PowerShell** (very important!)
2. Navigate to your project:
   ```powershell
   cd C:\Users\GOCOM\.gemini\antigravity\playground\tensor-galileo
   ```
3. Verify Git works:
   ```powershell
   git --version
   ```
4. Then we can connect to GitHub!

---

## Troubleshooting

### Git Still Not Found After Installation

1. **Restart PowerShell** - This is the most common issue
2. **Restart your computer** - Sometimes needed for PATH to update
3. **Check PATH manually:**
   - Windows Settings → System → About → Advanced system settings
   - Environment Variables → System variables → Path
   - Look for: `C:\Program Files\Git\cmd` or `C:\Program Files\Git\bin`
   - If missing, add it manually

### Verify Git Installation Location

After installing, check if Git exists here:
- `C:\Program Files\Git\bin\git.exe`
- `C:\Program Files\Git\cmd\git.exe`

If it exists but PowerShell can't find it, the PATH wasn't updated. Restart PowerShell or add to PATH manually.

---

## Quick Test

After installation and restarting PowerShell, run:

```powershell
# Test Git
git --version

# Test Git Bash (if installed)
bash --version
```

Both should work if installation was successful.

---

## Next Steps

Once Git is installed and working:

1. Run the setup script: `.\setup-git.ps1`
2. Or follow: `QUICK_GIT_SETUP.md`

---

**Download Link:** https://git-scm.com/download/win


