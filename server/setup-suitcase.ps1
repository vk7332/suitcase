# ============================================

# SUITCASE – Automated Setup Script

# Court Fee & Case Manager

# Developed by VK Tax & Law Chamber®

# ============================================

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   SUITCASE – Project Setup Initialization   " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Set Project Path

$projectPath = "C:\Users\vkskt\Desktop\SUITCASE"
Set-Location $projectPath

# --------------------------------------------

# Step 1: Verify Node.js Installation

# --------------------------------------------

Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
node -v
npm -v
} catch {
Write-Host "Node.js is not installed. Please install Node.js LTS from https://nodejs.org" -ForegroundColor Red
exit
}

# --------------------------------------------

# Step 2: Clean Old Dependencies and Builds

# --------------------------------------------

Write-Host ""
Write-Host "Cleaning old dependencies and build files..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
Remove-Item -Recurse -Force node_modules
Write-Host "Deleted node_modules"
}

if (Test-Path "dist") {
Remove-Item -Recurse -Force dist
Write-Host "Deleted dist"
}

if (Test-Path "package-lock.json") {
Remove-Item -Force package-lock.json
Write-Host "Deleted package-lock.json"
}

# Optional Cleanup

$optionalFolders = @("playwright-report", "test-results", "tests", ".claude")

foreach ($folder in $optionalFolders) {
if (Test-Path $folder) {
Remove-Item -Recurse -Force $folder
Write-Host "Deleted optional folder: $folder"
}
}

# Remove duplicate nested SUITCASE folder if exists

if (Test-Path "suitcase") {
Write-Host "Removing duplicate nested 'suitcase' folder..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "suitcase"
}

# --------------------------------------------

# Step 3: Clean NPM Cache

# --------------------------------------------

Write-Host ""
Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

# --------------------------------------------

# Step 4: Install Dependencies

# --------------------------------------------

Write-Host ""
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
npm install

# --------------------------------------------

# Step 5: Setup Backend Server

# --------------------------------------------

if (Test-Path "server") {
Write-Host ""
Write-Host "Setting up backend server..." -ForegroundColor Yellow
Set-Location "$projectPath\server"

```
if (Test-Path "package.json") {
    npm install
} else {
    Write-Host "Initializing backend package.json..." -ForegroundColor Cyan
    npm init -y
    npm install express cors dotenv
}

Set-Location $projectPath
```

}

# --------------------------------------------

# Step 6: Verify Environment Files

# --------------------------------------------

Write-Host ""
Write-Host "Checking environment files..." -ForegroundColor Yellow

if (!(Test-Path ".env")) {
Write-Host "WARNING: .env file not found. Please create one based on .env.example." -ForegroundColor Red
} else {
Write-Host ".env file found." -ForegroundColor Green
}

# --------------------------------------------

# Step 7: Build the Project

# --------------------------------------------

Write-Host ""
Write-Host "Building the SUITCASE project..." -ForegroundColor Yellow
npm run build

# --------------------------------------------

# Step 8: Start Development Servers

# --------------------------------------------

Write-Host ""
Write-Host "Launching development servers..." -ForegroundColor Cyan

# Start Frontend

Start-Process powershell -ArgumentList "npm run dev"

# Start Backend

if (Test-Path "server\server.js") {
Start-Process powershell -ArgumentList "cd server; node server.js"
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host " SUITCASE Setup Completed Successfully! " -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
