# Mittagio – Architektur (PWA)

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## 1. Projektstruktur

- **App-Code (SPA):** Einziger Ort ist `app/` – `index.html`, `manifest.json`, `assets/`, ggf. `sw.js`.
- **Dokumentation:** Nur die 6 Dateien unter `docs/` sind Source of Truth (siehe `docs/rules.md`). Keine neuen MDs anlegen.
- **Cursor-Regeln:** `.cursor/rules/*.mdc` – technische/layout-spezifische Regeln (Layout-Scope, Silent Defaults, Inseratsflow, High-End).
- **Arbeitspfad:** Einziger gültiger Projektpfad: `C:\Users\quach\Documents\GitHub\mittagio`. Alle Befehle und Git-Operationen nur dort.

---

## 2. PWA & Startbildschirm

- **Formulierung:** Überall **„Zum Startbildschirm hinzufügen“** (nicht „Home-Bildschirm“).
- **Profil → „App installieren (PWA)“:** Öffnet ein **Sheet** (nicht Toast):
  - Titel: „App auf dem Startbildschirm“
  - Text: „Im Browser **Teilen** (oder Menü) tippen → **‚Zum Startbildschirm hinzufügen‘** wählen. Dann startest du Mittagio wie eine App.“
  - Button: „Verstanden“
- **Technik:** IDs `pwaStartScreenBd`, `pwaStartScreenSheet`; Funktionen `openProfilePwaTipSheet()`, `closePwaStartScreenSheet()`.

---

## 3. Kunde / Anbieter: technische Trennung

- **Layout:** Alle layout-kritischen CSS-Regeln sind strikt gescoped:
  - **Nur Anbieter:** `body.provider-mode`, `#v-provider-*`, `#providerNavWrap`, `.prov-*`
  - **Nur Kunde:** `body:not(.provider-mode)`, `.customer-view`, `#v-discover`, `#v-fav`, etc.
- **Layout-kritisch** (immer scopen): height, min-height, max-height, overflow, scroll, display:flex auf #app/main, flex:1/min-height:0 in Scroll-Ketten.
- **View-Switch:** Nur eine `.view` aktiv; inaktive per JS `display: none !important`. Zuerst neue View aktivieren, dann andere ausblenden (kein leerer Frame).
- **Modus-Sync:** Beim Wechsel in Kunden-View: `provider-mode` entfernen, `mode = 'customer'`. Beim Wechsel in Anbieter-View: `provider-mode` setzen.
- **Init:** Nach `setMode()` wird `document.body.style.visibility = 'visible'` gesetzt (gegen Flackern).

### Kunden-View-IDs (customerViewIds)

| View-ID       | Verwendung        |
|---------------|-------------------|
| v-discover    | Entdecken         |
| v-fav         | Favoriten         |
| v-orders      | Bestellungen      |
| v-cart        | Warenkorb         |
| v-profile     | Profil (Kunde)    |
| v-order-success | Nach Bestellung |
| v-pickup-code | Abholnummer       |
| v-checkout    | Checkout          |

Neue Kunden-Views in `customerViewIds` in `showView()` ergänzen.

### Anbieter-Views

- `#v-provider-home`, `#v-provider-profile`, `#v-provider-week`, `#v-provider-cookbook`, `#v-provider-pickups`, `#v-provider-billing`, `#v-provider-login`
- Anbieter-Navigation: `#providerNavWrap`, `#providerNav`, `.navbtn`

### Anbieter-Portal Einstieg

- **Nur in Kundenansicht „Meins“:** Icon „Hochhaus“ (Building) oben rechts + Menüpunkt „Zum Anbieter-Portal“ im Zahnrad-Menü.
- Klick öffnet **Gastgeber-Login-Modal (Sheet)** – keine Vollbild-Login-Seite. Nach Login: Wechsel in Provider-Modus, Dashboard.
- Technik: `showProviderLoginModal()`, `window.showProviderLoginModal` / `closeProviderLoginModal` global.

---

## 4. Provider: Inhalt oben, kein leerer Screen

- **body.provider-mode main:** `padding: 0 !important`, `max-width: none !important`.
- **body.provider-mode [id^="v-provider-"]:** `padding-top: calc(8px + env(safe-area-inset-top, 0px)) !important`.
- **Dashboard:** `.prov-header` mit reduziertem Padding; `.dashboard-floating-wrap` absolut positioniert, `overflow-y: auto` für Scroll.
- **Routing/Hash:** Magic-Link `#/plan/…` nutzt eigene Logik und entfernt `provider-mode`; sonst `setMode` + `showView`.

---

## 5. Zahlung (Stripe)

- **Publishable Key:** In `app/index.html` → `STRIPE_PUBLISHABLE_KEY` (Frontend).
- **Secret Key:** Nur in Netlify Environment Variables → `STRIPE_SECRET_KEY`.
- Leerer Publishable Key → Demo-Modus („Zahlung simulieren?“).

---

## 6. Referenz im Code

- In `app/index.html` im `<style>`: Block **„OPTION 1: KUNDE / ANBIETER LAYOUT TRENNUNG“** mit Kurz-Checkliste. Bei Änderungen an Layout/Scroll/Höhe dort prüfen und Regeln nach Kunde vs. Anbieter scopen.
