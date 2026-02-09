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

## Projektstruktur & wichtige Dateien

| Was | Wo |
|-----|-----|
| **Regeln, Routing, UI-Kurzfassung** | `.cursorrules` (Root) |
| **Vollständiger Kontext** | `docs/kontext/mittagio-voll.md` |
| **Kurzfassung Kontext** | `docs/kontext/mittagio-kurz.md` |
| **Verbindliche UI-Texte** | `docs/texte/ui-texte-mittagio.md` |
| **Specs** (UI-Framework, Detailseite, Swipe, Allergene) | `docs/specs/` |
| **Analysen & Fehlerberichte** | `docs/analysen/` |
| **Feature-Tickets** (A–D) | `tickets/` |
| **Aufräum-Vorschlag & Struktur** | `PROJEKT_STRUKTUR_UND_AUFRÄUMEN.md` |

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

## 💳 Stripe (Zahlungen) einrichten

Für echte Kartenzahlung im Checkout:

1. **Stripe-Konto:** [dashboard.stripe.com](https://dashboard.stripe.com) – API-Keys unter „Developers → API keys“.
2. **Netlify (Backend):** In deinem Netlify-Site unter **Site settings → Environment variables** hinzufügen:
   - `STRIPE_SECRET_KEY` = `sk_live_...` (Live) oder `sk_test_...` (Test).
3. **Frontend (Publishable Key):** In `app/index.html` am Anfang des Script-Blocks setzen:
   - `window.MITTAGIO_STRIPE = { publishableKey: 'pk_live_...' oder 'pk_test_...', apiBase: '' };`
   - Oder vor dem Laden der App ein eigenes Script einbinden, das `MITTAGIO_STRIPE` setzt.
4. **Deployment:** Site bei Netlify bauen (mit `npm install`), damit die Function `create-checkout-session` verfügbar ist.

Ohne Konfiguration läuft der Checkout weiter im **Demo-Modus** (Bestätigungsdialog, keine echte Zahlung).
