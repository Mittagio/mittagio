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
