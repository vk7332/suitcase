Write-Host "🔧 Fixing Import Paths..."

$files = Get-ChildItem -Path src -Recurse -Include *.ts, *.tsx

foreach ($file in $files) {

    $content = Get-Content $file.FullName -Raw

    # 🔁 Fix OLD paths → NEW paths
    $content = $content -replace "@/components/calculators", "@/calculators"
    $content = $content -replace "@/lib/supabase", "@/utils/supabase/supabaseclient"
    $content = $content -replace "@/pages/calculators/calculators", "@/pages/calculators"
    
    # Optional cleanup
    $content = $content -replace "\\", "/"

    Set-Content $file.FullName $content

    Write-Host "✔ Fixed: $($file.Name)"
}

Write-Host "✅ Import Fix Completed!"