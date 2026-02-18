# MITTAGIO – Installiert den Auto-Push-Hook (post-commit)
# Einmal ausführen nach dem Klonen. Nutzung: .\scripts\install-auto-push-hook.ps1

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path (Join-Path $repoRoot ".git"))) {
    Write-Host "FEHLER: Kein Git-Repository (kein .git-Ordner)." -ForegroundColor Red
    exit 1
}

$hookPath = Join-Path $repoRoot ".git\hooks\post-commit"
$hookContent = @'
#!/bin/sh
# Auto-Push nach jedem Commit (GitHub Desktop, Cursor, Bash, CMD)
exec 1>&2
echo ""
echo "[Auto-Push] Pushe zu origin main..."
if git push origin main 2>&1; then
    echo "[Auto-Push] Fertig – Änderungen sind online."
else
    echo "[Auto-Push] Push fehlgeschlagen (z.B. Offline?). Bitte später: git push origin main"
fi
echo ""
'@

Set-Content -Path $hookPath -Value $hookContent -Encoding UTF8 -NoNewline
Write-Host "OK: Auto-Push-Hook installiert unter .git/hooks/post-commit"
Write-Host "    Nach jedem Commit wird automatisch zu origin main gepusht."
