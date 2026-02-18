#!/bin/sh
# MITTAGIO – Installiert den Auto-Push-Hook (post-commit)
# Einmal ausführen nach dem Klonen, damit nach jedem Commit automatisch gepusht wird.
# Nutzung: ./scripts/install-auto-push-hook.sh   oder   sh scripts/install-auto-push-hook.sh

HOOK_SRC="scripts/post-commit-hook"
HOOK_DST=".git/hooks/post-commit"

cd "$(dirname "$0")/.." || exit 1

if [ ! -d .git ]; then
    echo "FEHLER: Kein Git-Repository (kein .git-Ordner)."
    exit 1
fi

if [ -f "$HOOK_SRC" ]; then
    cp "$HOOK_SRC" "$HOOK_DST"
    chmod +x "$HOOK_DST" 2>/dev/null || true
    echo "OK: Auto-Push-Hook installiert unter .git/hooks/post-commit"
    echo "    Nach jedem Commit wird automatisch zu origin main gepusht."
else
    # Fallback: Hook direkt hier erzeugen
    cat > "$HOOK_DST" << 'HOOK_END'
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
HOOK_END
    chmod +x "$HOOK_DST" 2>/dev/null || true
    echo "OK: Auto-Push-Hook erstellt unter .git/hooks/post-commit"
fi
exit 0
