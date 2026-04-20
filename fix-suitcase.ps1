Write-Host "Renaming all files & folders to lowercase..."

Get-ChildItem -Recurse | Sort-Object FullName -Descending | ForEach-Object {
    $newName = $_.Name.ToLower()

    if ($_.Name -ne $newName) {
        Rename-Item -Path $_.FullName -NewName $newName -Force
        Write-Host "Renamed: $($_.Name)"
    }
}

Write-Host "Done."