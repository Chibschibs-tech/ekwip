# PowerShell Script to Setup Git and Connect to GitHub
# Run this script after Git is installed

Write-Host "=== Ekwip Git Setup Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
Write-Host "Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Install with default settings" -ForegroundColor White
    Write-Host "3. Restart PowerShell" -ForegroundColor White
    Write-Host "4. Run this script again" -ForegroundColor White
    exit 1
}

Write-Host ""

# Check if already initialized
if (Test-Path .git) {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Repository initialized" -ForegroundColor Green
}

Write-Host ""

# Check Git configuration
Write-Host "Checking Git configuration..." -ForegroundColor Yellow
$userName = git config --global user.name
$userEmail = git config --global user.email

if ($userName -and $userEmail) {
    Write-Host "✓ Git configured:" -ForegroundColor Green
    Write-Host "  Name: $userName" -ForegroundColor White
    Write-Host "  Email: $userEmail" -ForegroundColor White
} else {
    Write-Host "⚠ Git user configuration missing" -ForegroundColor Yellow
    Write-Host ""
    $name = Read-Host "Enter your name (for Git commits)"
    $email = Read-Host "Enter your email (GitHub email)"
    
    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "✓ Git configured" -ForegroundColor Green
}

Write-Host ""

# Check remote
Write-Host "Checking remote repository..." -ForegroundColor Yellow
$remote = git remote get-url origin 2>$null

if ($remote) {
    Write-Host "✓ Remote already configured: $remote" -ForegroundColor Green
} else {
    Write-Host "⚠ No remote repository configured" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please provide your GitHub repository URL:" -ForegroundColor Yellow
    Write-Host "Example: https://github.com/username/ekwip-web-app.git" -ForegroundColor Gray
    $repoUrl = Read-Host "GitHub repository URL"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "✓ Remote added: $repoUrl" -ForegroundColor Green
    } else {
        Write-Host "⚠ No remote added. You can add it later with:" -ForegroundColor Yellow
        Write-Host "  git remote add origin <your-repo-url>" -ForegroundColor White
    }
}

Write-Host ""

# Check if there are uncommitted changes
Write-Host "Checking for uncommitted changes..." -ForegroundColor Yellow
$status = git status --porcelain

if ($status) {
    Write-Host "⚠ Uncommitted changes found" -ForegroundColor Yellow
    Write-Host ""
    $commit = Read-Host "Do you want to commit all changes now? (y/n)"
    
    if ($commit -eq "y" -or $commit -eq "Y") {
        Write-Host "Staging all files..." -ForegroundColor Yellow
        git add .
        
        $message = Read-Host "Enter commit message (or press Enter for default)"
        if (-not $message) {
            $message = "Initial commit: Ekwip web application"
        }
        
        git commit -m $message
        Write-Host "✓ Changes committed" -ForegroundColor Green
        
        Write-Host ""
        $push = Read-Host "Do you want to push to GitHub now? (y/n)"
        
        if ($push -eq "y" -or $push -eq "Y") {
            Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
            Write-Host "Note: You may be prompted for GitHub credentials" -ForegroundColor Gray
            Write-Host "Use a Personal Access Token as password (not your GitHub password)" -ForegroundColor Gray
            Write-Host ""
            
            git branch -M main
            git push -u origin main
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
            } else {
                Write-Host "⚠ Push failed. Check your credentials and try again." -ForegroundColor Yellow
            }
        }
    }
} else {
    Write-Host "✓ No uncommitted changes" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Verify your repository on GitHub" -ForegroundColor White
Write-Host "2. Start making changes and commit regularly" -ForegroundColor White
Write-Host "3. Use 'git push' to backup your work" -ForegroundColor White
Write-Host ""


