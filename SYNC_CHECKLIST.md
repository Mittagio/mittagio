# MITTAGIO - Synchronisations-Checkliste

## ✅ Wichtige Dateien die IMMER online sein müssen:

### App-Dateien (KRITISCH)
- [x] `app/index.html` - Haupt-App-Datei
- [x] `app/sw.js` - Service Worker
- [x] `app/manifest.json` - PWA Manifest
- [x] `app/assets/` - Alle Assets (Icons, Logos, Platzhalter)

### Konfiguration
- [x] `.github/workflows/pages.yml` - GitHub Pages Deployment
- [x] `netlify.toml` - Netlify Konfiguration
- [x] `.gitignore` - Git Ignore Regeln
- [x] `README.md` - Projekt-Dokumentation

### Dokumentation
- [x] `docs/06_Gesamtprojekt_Zusammenfassung/` - Gesamtprojekt
- [x] `docs/07_Konzept_Zwischenstand/` - Konzept-Zwischenstand
- [x] `docs/08_Offene_Themen_Fragenkatalog.md` - Offene Themen
- [ ] `docs/*.docx` - Word-Dokumente (falls wichtig)

## 🔄 Workflow für Synchronisation:

### Vor dem Arbeiten (auf neuem PC):
1. Repository klonen: `git clone https://github.com/[username]/mittagio.git`
2. Oder pullen: `git pull origin main`

### Nach dem Arbeiten (immer!):
1. **Alle Dateien speichern** (Strg+S in allen geöffneten Dateien)
2. **Status prüfen**: `git status`
3. **Alle Änderungen hinzufügen**: `git add .`
4. **Commit erstellen**: `git commit -m "Beschreibung der Änderungen"`
5. **Pushen**: `git push origin main`

### Automatische Synchronisation:
- **Auto-Push:** Nach jedem Commit pusht ein Git-Hook automatisch zu `origin main` – du musst nicht mehr manuell pushen (gilt für GitHub Desktop, Cursor, Bash, CMD).
- GitHub Desktop: "Commit" reicht, Push passiert danach automatisch.
- Terminal: `git commit -m "..."` → Push läuft automatisch danach.

## ⚠️ WICHTIG:
- **NIEMALS** ohne Commit/Push den PC wechseln!
- **IMMER** vor dem Schließen des PCs: `git push`
- Bei Unsicherheit: `git status` prüfen

## 📝 Git-Befehle (Kurzreferenz):

```bash
# Status prüfen
git status

# Alle Änderungen hinzufügen
git add .

# Commit erstellen
git commit -m "Beschreibung"

# Pushen
git push origin main

# Neueste Version holen
git pull origin main
```

## 🔍 Prüfen ob alles synchronisiert ist:

1. Auf GitHub.com gehen: `https://github.com/[username]/mittagio`
2. Prüfen ob letzter Commit deine Änderungen enthält
3. Auf anderem PC: `git pull` ausführen
4. Prüfen ob Dateien aktuell sind
