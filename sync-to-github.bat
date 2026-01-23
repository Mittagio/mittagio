@echo off
REM MITTAGIO - Automatische Synchronisation zu GitHub
REM Dieses Skript committed und pusht alle Änderungen

echo ========================================
echo MITTAGIO - GitHub Synchronisation
echo ========================================
echo.

REM Prüfe ob Git verfügbar ist
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo FEHLER: Git ist nicht installiert oder nicht im PATH!
    echo Bitte installiere Git oder verwende GitHub Desktop.
    pause
    exit /b 1
)

REM Status anzeigen
echo [1/4] Prüfe Git-Status...
git status
echo.

REM Alle Änderungen hinzufügen
echo [2/4] Fuege alle Aenderungen hinzu...
git add .
echo.

REM Commit erstellen (mit Datum/Zeit)
set COMMIT_MSG=Sync: %date% %time%
echo [3/4] Erstelle Commit...
git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo INFO: Keine Aenderungen zum Committen vorhanden.
) else (
    echo Commit erfolgreich erstellt!
)
echo.

REM Pushen
echo [4/4] Pushe zu GitHub...
git push origin main
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ERFOLG: Alle Aenderungen sind jetzt online!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo FEHLER: Push fehlgeschlagen!
    echo Bitte manuell pruefen: git status
    echo ========================================
)
echo.
pause
