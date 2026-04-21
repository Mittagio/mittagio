# Profil (Kunde)

**View-ID:** `v-profile` · Kundenseite  
**Stand:** 08.04.2026

---

## Konzept

`Meins` ist als kompakter Customer-Hub aufgebaut: Identität oben, schnelle Aktionen, aktuelle Abholnummern und zuletzt relevante Bestellungen.

## Aufbau

- Header mit Aktionen (Anbieter-Portal, Einstellungen, Schließen)
- Hero-Kachel:
  - Eingeloggt: Avatar + persönlicher Status
  - Ausgeloggt: Willkommen + CTA `Profil anlegen`
- Quick-Action-Reihe:
  - `Meine Lieblingsanbieter` → öffnet die eigene Seite `Lieblingsanbieter`
  - `Mein Food-Profil` → öffnet direkt die Food-Profil-Sektion im Einstellungen-Sheet
  - `Support` → öffnet Support/FAQ
  - Stabilität (08.04.2026, Hotfix): Header-Scroll-FX nutzt ein globales Guard-Flag (`window.__customerHeaderScrollFxBound`) ohne TDZ-Risiko, damit `initApp` nicht mehr mit `customerHeaderScrollFxBound` crasht.
  - Stabilität (08.04.2026, Hotfix): Legal/Support nutzt einen JS-seitigen Top-Reset (mehrfach via `requestAnimationFrame`/`setTimeout`) ohne globales Body-Layout-Locking, um Content-Ausblendungen zu vermeiden.
  - Stabilität (08.04.2026, Hotfix-2): `showLegalPage()` erzwingt einen mehrfachen Timing-Lock (`lockLegalTop`) auf `window`, `body`, `documentElement`, `#app`, `main`, aktive View und deren innere Scroll-Container; so wird späteres „Nachspringen“ auf Samsung reduziert.
  - Stabilität (08.04.2026, Hotfix-3): Im Customer-Mode erzwingen `#app` und `main` zusätzlich `padding-top: 0 !important;`, damit kein Rest-Top-Gap über Legal-/Support-Inhalten stehen bleibt.
  - Stabilität (08.04.2026, Hotfix-4): Für `v-support`, `v-legal-impressum`, `v-legal-agb-kurz`, `v-legal-datenschutz`, `v-legal-faq` wird das Section-Padding explizit auf **ohne Top-Padding** gesetzt; zusätzlich `> .panel { margin-top:0 }`, damit kein weißer Kopfbereich vor dem Inhalt bleibt.
  - Stabilität (08.04.2026, Hotfix-5): Die fünf Legal/Support-Views laufen aktiv als fixer Customer-Viewport (`position:fixed; top:0; bottom:calc(78px + safe-area); overflow-y:auto`), damit kein 1-Screen-Offset oberhalb des Inhalts mehr scrollbar ist.
  - Support/FAQ startet immer am Seitenanfang (kein initiales Nach-unten-Rutschen, kein Weißbereich oben)
  - Globaler View-Reset: Beim Wechsel auf Profil-Unterseiten (`Support`, `Datenschutz`, `Impressum`, FAQ) wird Scroll immer hart auf `0` gesetzt.
  - Globaler Navigations-Patch: `showView` wird zentral auf `behavior: auto` stabilisiert (kein `smooth`-Rutschen beim Seitenwechsel aus `Meins`).
  - Legal/Support-Views laufen ohne `viewIn`-Animation, damit beim Öffnen kein visueller Down-Shift entsteht.
  - Final an der Quelle: `app/js/ui-navigation.js` setzt beim View-Wechsel den Top-Reset auf Window, View und innere Scroll-Container (inkl. zusätzlichem rAF-Reset).
  - Legal/Support-Fix im CSS: `v-support`, `v-legal-impressum`, `v-legal-agb-kurz`, `v-legal-datenschutz`, `v-legal-faq` erzwingen `padding-top: 0`, damit kein weißer Top-Block sichtbar wird.
  - Hard-Reset erweitert: Beim View-Wechsel werden zusätzlich `#app`, `main`, `document.scrollingElement` und alle scrollbaren Elemente in der aktiven View auf `0` gesetzt (mehrfacher rAF/Timeout-Reset).
  - Legal-Safety-Fix: Beim Öffnen von Legal/Support wird für `#app`, `main` und die Ziel-View `transform:none`, `top:0` und `margin-top:0` erzwungen, um negative Container-Offets zu neutralisieren.
  - Customer-Root-Schutz in CSS: `body:not(.provider-mode) #app` und `#app > main` erzwingen ebenfalls `transform:none`/`top:0`, damit Root-Container nicht nach oben verschoben werden.
- Food-Profil beeinflusst `Entdecken` als Default:
  - `Vegan` aktiv → Discover startet mit Kategorie `Vegan`
  - `Veggie` aktiv (ohne Vegan) → Discover startet mit Kategorie `Veggie`
  - keine dieser Präferenzen aktiv → Discover startet mit `Alle`
  - Änderungen im Food-Profil greifen sofort im Discover-Feed
- Bereich Abholnummern:
  - aktive Abholnummern als Fokus-Karten
  - leerer Zustand mit CTA `Jetzt vorbestellen`
- Einstellungen-Sheet enthält die Sektion `Meine Lieblingsanbieter`
- Bestellkarten mit Preis und Status-Pill (`Bezahlt`, `Abgeholt`, `Storniert`, `Offen`)
- Erweiterte Einstellungen weiterhin über das Zahnrad-Sheet

## Regeln

- Kundenseite
- UI-Aufwertung ohne riskante Logikänderung
- Konsistente Optik zu Favoriten/Detailseite (Cards, Radius, feine Schatten)

## Update: Scroll + Pull-to-Refresh

- `Meins` (`v-profile`) ist wieder normal vertikal scrollbar im Kundenmodus.
- Pull-to-Refresh ist auf dem Profil-Content aktiv: Runterziehen triggert `updateProfileView()`.
- Nach dem Refresh wird der Profil-Scrollbereich erneut synchronisiert, damit Inhalte auf kleinen und großen Geräten stabil scrollbar bleiben.
