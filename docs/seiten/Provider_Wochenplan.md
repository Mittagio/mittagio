# Provider Wochenplan

**View-ID:** `v-provider-week` · Anbieterseite  
**Stand:** 20.03.2026

---

## Konzept

Wochenübersicht: Gerichte pro Tag planen. Plus-Kacheln öffnen Inseratsauswahl.

## Aufbau

- Header: „Wochenplan“, KW-Navigation
- Tag-Pills: Mo–So
- KW-Board: Tages-Kacheln, Slots, Plus (+)
- Plus → Inseratsauswahl (#createFlowSheet)

## Regeln

- Helles Layout
- Swipe: Reveal-Delete (rote Fläche + Mülleimer), Undo-Snackbar
- KW-Label in der Header-Mitte bleibt einzeilig und zentriert (`.kw-label` mit `white-space: nowrap`, responsive `clamp(14px, 4vw, 16px)`).
- KW-Navigation ist als eine visuell abgesetzte, interaktive Zeile umgesetzt: `<` · `KW + Datumsbereich` · `>` in **einer** Reihe, mit dezentem Border/Background als klarer Hinweis auf Änderbarkeit.
- Wochenplan-Meal-Karten sind homogen aufgebaut: Bild links, Name rechts, Preis unten rechts; responsiv mit `clamp(...)` für saubere Skalierung auf kleinen und größeren Handys.
- Bild-Overlays auf Wochenplan-Gerichten sind deaktiviert (keine Icons direkt auf dem Gerichtsbild), damit die Karte ruhiger und fotozentriert bleibt.
- Preisdarstellung ist bewusst dezenter: kleiner und weniger fett, damit Name/Bild Priorität behalten.
- Smart-Reminder „Vegetarische Option ergänzen“ läuft als dezenter Hint (kein Vollformat-Slot): Trigger nur bei Fleisch/Vegan ohne vegetarische Option, mit Cooldown und Dismiss, damit die Erinnerung hilft ohne zu nerven.
- Wochenplan-Karten im Tagesbereich sind auf eine einheitliche feste Höhe gesetzt, damit alle Slots homogen wirken (kein visuelles Springen bei unterschiedlichen Titellängen).
- Alte rote Offline-/Test-Markierungen auf Slot-Karten sind entfernt; Entwurfs- und Live-Karten bleiben im ruhigen, neutralen Kartenstil.
- Tages-Slotkarten werden als Block mit voller Containerbreite gerendert (`.kw-slot.slot-card`), damit kurze Titel (z. B. „Käsespätzle“) nicht zu schmalen Karten führen.
- Seitlicher Stabilitäts-Lock: Slot-Karten verrutschen beim normalen Vertikal-Scrollen nicht mehr links/rechts; Swipe öffnet nur noch bei klar dominanter, bewusster Horizontal-Geste (höherer Schwellenwert + Horizontal-vor-Vertikal-Filter).
- S25/PWA Header-Hintergrund-Fix: Für `v-provider-week` wird der Headerhintergrund auf ein solides Weiß gelockt (kein translucenter Blur), damit auf Samsung/PWA kein schwarzer Header-Hintergrund mehr auftritt.
- Mobile-Browser-Stabilizer (kein PWA): Für `display-mode: browser` wurden harte `100dvh`-Locks im Provider-Bereich entschärft (`100svh/auto`) und Footer/Chrome (`providerNav`, Week-/Cookbook-Footer) auf volle Breite mit Safe-Area-Inset und weißem Background vereinheitlicht, damit Dashboard + Wochenplan im Browser gleich ruhig wie in der installierten App wirken.
- Browser-Navigation Feintuning (Provider): Das aktive Tab in der Bottom-Navigation ist im mobilen Browser nun klarer erkennbar (höhere aktive Kontrastierung + dezente Goldfläche am Icon), während inaktive Tabs bewusst zurückgenommen bleiben.

## Update: Magic in den Header verlegt

- Der bisherige `weekMagicFab` (Floating Button unten rechts) wurde vollständig entfernt (Markup, FAB-Styles, FAB-Klick-Bindings).
- Stattdessen gibt es im Wochenplan-Header ein dezentes Sparkles-Icon `btnWeekMagicHeader` neben dem Kebab-Menü, im gleichen Button-Stil und gleicher Größe.
- Klick auf `✨` öffnet das bestehende `weekMagicSheet` (kein neuer Flow).
- Sheet-Titel: **„Ideen für deine Woche“**.
- Sheet-Optionen sind auf klare Einträge reduziert:
  - `✨ Ideen` – Passende Gerichte entdecken
  - `🍂 Saison` – Gerichte nach Saison anzeigen
  - `🎲 Überrasch mich` – Zufällige Gerichte auswählen
  - optional `🤖 KI-Vorschläge`, wenn verfügbar
- Nach Auswahl bleibt der Nutzer im Wochenplan-Kontext; Footer und „Woche jetzt inserieren“-Flow bleiben unverändert.

## Header Shrink (Provider)

- `Wochenplan` nutzt jetzt denselben Shrink-Flow: großer Header beim Einstieg, kompakt beim Scroll-down, expandiert bei Scroll-up.
- Der Header wird **nicht** ausgeblendet, sondern nur verdichtet; KW-/Datumsbedienung bleibt vollständig sichtbar und klickbar.
- Im kompakten State werden Abstände/Typografie reduziert (`week-nav-btn`, `kw-label`, `date-range`), aber Touch-Ziele bleiben daumenfreundlich.

## Phase 2 – Interaktion & Mechanik

### Drag & Drop Theken-Renner (Magnet)

- Renner-Karten sind als Drag-Quelle aktiv (`.theken-renner-card`).
- Slots im KW-Board sind Drop-Ziele (`.week-grid-slot`).
- Beim `dragover` bekommt der Slot einen grünen Magnet-Glow (`.drag-over-active` / `.kw-slot-drop-over`).
- Beim `drop`:
  - Smart-Bubble steigt auf (`spawnSmartBubble`),
  - Haptik wird ausgelöst,
  - Inserat-Wizard startet direkt mit Kontext `date + dishId` (`startListingFlowFromRenner`).

### Swipe-to-Delete

- Wochenplan-Slots nutzen einen Swipe-Wrapper (`.week-card-swipe-wrapper`) mit roter Reveal-Fläche (`.delete-reveal-bg`).
- Ein Swipe nach links öffnet den Löschmodus (`.swipe-open`, `.swiped-left`), statt sofort zu löschen.
- Tippen auf die rote Fläche löscht den Eintrag:
  - Entwurfseintrag über `deletePlannedEntryWithUndo`,
  - Live-Eintrag direkt aus `offers` mit Re-Render.
