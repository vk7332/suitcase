# SUITCASE Cleanup Manifest
# Targets: Specific Supabase duplicates and Page file normalization

$root = "."
Write-Host "--- Starting SUITCASE Manifest Cleanup ---" -ForegroundColor Cyan

# --- 1. DELETE UNUSABLE DUPLICATES ---
# Based on your guide to prevent Supabase & Service conflicts
$filesToDelete = @(
    "src/supabase.ts",
    "src/services/supabaseClient.js",
    "src/utils/supabase/index.ts",
    "src/utils/supabase/server.ts",
    "src/services/emailService.js",
    "src/services/invoiceService.js",
    "src/services/razorpayService.js"
)

foreach ($file in $filesToDelete) {
    $path = Join-Path $root $file
    if (Test-Path $path) {
        Write-Host "Deleting Duplicate: $file" -ForegroundColor Red
        Remove-Item $path -Force
    }
}

# --- 2. RENAME SPECIFIC PAGE FILES ---
# Normalizing Page files for clean routing (kebab-case)
$pageRenames = @{
    "src/pages/Auth/LoginPage.tsx"              = "login-page.tsx"
    "src/pages/Auth/SignupPage.tsx"             = "signup-page.tsx"
    "src/pages/Clients/ClientsPage.tsx"         = "clients-page.tsx"
    "src/pages/Invoices/CreateInvoicePage.tsx"  = "create-invoice-page.tsx"
    "src/pages/Invoices/InvoiceListPage.tsx"    = "invoice-list-page.tsx"
    "src/pages/Ledger/ClientLedgerPage.tsx"     = "client-ledger-page.tsx"
    "src/pages/Profile/ProfileSettingsPage.tsx" = "profile-settings-page.tsx"
    "src/pages/Public/PrivacyPolicyPage.tsx"    = "privacy-policy-page.tsx"
    "src/pages/Public/TermsConditionsPage.tsx"  = "terms-conditions-page.tsx"
}

$pageRenames.GetEnumerator() | ForEach-Object {
    $oldPath = Join-Path $root $_.Key
    $newName = $_.Value
    
    if (Test-Path $oldPath) {
        Write-Host "Renaming Page: $($_.Key) -> $newName" -ForegroundColor Yellow
        Rename-Item -Path $oldPath -NewName $newName
    }
}

# --- 3. CLEANUP EMPTY GHOST FOLDERS ---
Write-Host "Cleaning empty directories..." -ForegroundColor Gray
Get-ChildItem -Path "$root/src" -Recurse | Where-Object { $_.PSIsContainer -and (Get-ChildItem $_.FullName).Count -eq 0 } | Remove-Item

Write-Host "--- Manifest Cleanup Complete ---" -ForegroundColor Green
Write-Host "Note: Remember to update your imports in SuitcaseRoutes.jsx!" -ForegroundColor White