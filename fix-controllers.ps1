# PowerShell script to fix TypeScript controller parameter types

$controllerPath = "server/controllers"
$files = Get-ChildItem -Path $controllerPath -Filter "*.ts" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix untyped async function parameters
    $content = $content -replace 'export const (\w+) = async \(req, res\) =>', 'export const $1 = async (req: Request, res: Response) =>'
    
    # Fix untyped regular function parameters
    $content = $content -replace 'export const (\w+) = \(req, res\) =>', 'export const $1 = (req: Request, res: Response) =>'
    
    # Ensure Request and Response are imported
    if ($content -notmatch 'import.*Request.*Response.*from.*express') {
        if ($content -match '^import') {
            $content = $content -replace '(^import[^\n]+\n)', "`$1import { Request, Response } from 'express';`n"
        } else {
            $content = "import { Request, Response } from 'express';`n" + $content
        }
    }
    
    # Fix err: unknown to err: any
    $content = $content -replace '\} catch \(err\) \{', '} catch (err: any) {'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "`nAll controller files have been updated!"
