# Mittagio

[![Deploy GitHub Pages](https://github.com/Mittagio/mittagio/actions/workflows/pages.yml/badge.svg)](https://github.com/Mittagio/mittagio/actions/workflows/pages.yml)

Digitale Plattform für strukturierte Mittagstische.
Dieses Repository enthält:
- Produkt- & UX-Konzept (docs/)
- Web-App (app/)

## Vorschau (GitHub Pages)
https://mittagio.github.io/mittagio/

## Lokale Vorschau
http://localhost:8000/app/

Stand: Konzept-first, App in Umsetzung.

## 🔄 Synchronisation (Multi-PC-Arbeit)

**WICHTIG:** Alle Änderungen müssen committed und gepusht werden, damit sie auf anderen PCs verfügbar sind!

### Schnell-Synchronisation:
- **Windows:** Doppelklick auf `sync-to-github.bat`
- **Mac/Linux:** `./sync-to-github.sh` ausführen

### Manuell:
```bash
git add .
git commit -m "Beschreibung der Änderungen"
git push origin main
```

### Auf neuem PC:
```bash
git clone https://github.com/[username]/mittagio.git
# oder wenn bereits geklont:
git pull origin main
```

📋 Siehe `SYNC_CHECKLIST.md` für detaillierte Anleitung.
