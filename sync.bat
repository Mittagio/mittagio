@echo off
REM MITTAGIO - Git Pull Synchronisation
REM Dieses Skript holt die neuesten Änderungen von GitHub

echo ========================================
echo MITTAGIO - Git Pull
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
echo [1/2] Prüfe Git-Status...
git status
echo.

REM Pull durchführen
echo [2/2] Hole neueste Änderungen von GitHub...
git pull origin main
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ERFOLG: Lokales Repository ist jetzt synchronisiert!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo FEHLER: Pull fehlgeschlagen!
    echo Bitte manuell pruefen: git status
    echo ========================================
)
echo.
pause
