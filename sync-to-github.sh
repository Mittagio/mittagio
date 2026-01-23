#!/bin/bash
# MITTAGIO - Automatische Synchronisation zu GitHub
# Dieses Skript committed und pusht alle Änderungen

echo "========================================"
echo "MITTAGIO - GitHub Synchronisation"
echo "========================================"
echo ""

# Prüfe ob Git verfügbar ist
if ! command -v git &> /dev/null; then
    echo "FEHLER: Git ist nicht installiert!"
    exit 1
fi

# Status anzeigen
echo "[1/4] Prüfe Git-Status..."
git status
echo ""

# Alle Änderungen hinzufügen
echo "[2/4] Füge alle Änderungen hinzu..."
git add .
echo ""

# Commit erstellen (mit Datum/Zeit)
COMMIT_MSG="Sync: $(date '+%Y-%m-%d %H:%M:%S')"
echo "[3/4] Erstelle Commit..."
if git commit -m "$COMMIT_MSG"; then
    echo "Commit erfolgreich erstellt!"
else
    echo "INFO: Keine Änderungen zum Committen vorhanden."
fi
echo ""

# Pushen
echo "[4/4] Pushe zu GitHub..."
if git push origin main; then
    echo ""
    echo "========================================"
    echo "ERFOLG: Alle Änderungen sind jetzt online!"
    echo "========================================"
else
    echo ""
    echo "========================================"
    echo "FEHLER: Push fehlgeschlagen!"
    echo "Bitte manuell prüfen: git status"
    echo "========================================"
    exit 1
fi
