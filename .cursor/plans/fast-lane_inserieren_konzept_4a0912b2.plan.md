# Fast-Lane Inserieren: Smart-Context, Blitz, Blauer Button, Wochenplan

**Status: umgesetzt** (Phasen 1–4; alle Punkte aus Abschnitt 6 erledigt)

## Ausgangslage

- **Psheet (Sammelkarte):** Wird in `openProviderOffer(id, options)` aufgebaut; `psheetOpenSource = options.source` ist bereits vorhanden (`'dashboard' | 'week' | 'cookbook'`). Decision Zone: [app/index.html](app/index.html) Zeile 8450–8454. Logik: ca. 15548–15693.
- **Kochbuch:** `renderCookbook()` ab 23393; Magazin-Karte `.cookbook-magazine-card`; Klick öffnet `openCookbookActionSheet`.
- **Wochenplan:** `renderWeekPlanBoard()` ab 20547; `addCookbookEntryToWeek(dayKey, cookbookId)` (21153); Daten: `week[dayKey]`.

---

## Klärung 1: Blitz = Draft-First (verbindlich)

**Option (a): Temporäres Draft-Offer.**

- Beim Tippen des Blitzes wechselt die Intention von „Verwalten“ zu „Verkaufen“. Das System legt sofort ein **Draft-Offer** an.
- **Signatur:** Es bleibt bei `openProviderOffer(id)`. Der Blitz-Klick führt im Hintergrund **`createOfferFromCookbook(cookbookId)`** (oder `initializeDraftFromCookbook(item)`) aus: erzeugt ein neues Offer-Objekt im State mit **`status: 'draft'`**, kopiert alle Daten aus dem Cookbook-Eintrag (Titel, Bild, Allergene, Standard-Preis z. B. 8,50 € falls leer), gibt die neue `draftId` zurück und ruft **`openProviderOffer(draftId)`** mit MODE_AD (z. B. `instantLive: true`) auf.
- **Vorteil:** Änderungen (Preis, Uhrzeit) werden direkt im Draft gespeichert; bei Abbruch oder Ablenkung ist der Verkaufs-Entwurf gesichert.

**Logik-Satz:** Beim Klick auf ⚡ (Blitz) ein neues Offer-Objekt in der Datenbank/State mit `status: 'draft'` anlegen, alle Daten aus dem Cookbook-Eintrag hineinkopieren und die Karte via `openProviderOffer(newId)` direkt im MODE_AD öffnen.

---

## Klärung 2: Blauer Button – MODE_AD vs. MODE_PLAN (verbindlich)

**Aufteilung:**

| Modus    | Grüner Button              | Blauer Button                          |
|----------|----------------------------|----------------------------------------|
| MODE_AD  | Jetzt Veröffentlichen      | „Für später einplanen“                 |
| MODE_PLAN| Im Kochbuch speichern      | „Datum für Wochenplan wählen“          |

- **MODE_AD:** Grün = Geld verdienen (mit Abholnummer / Nur Inserat wie bisher). **Blau = „Für später einplanen“:** Öffnet Datums-Picker, speichert im Wochenplan, **ohne** das Offer zu aktivieren (status bleibt `draft` oder wird `scheduled`).
- **MODE_PLAN:** Grün = „Im Kochbuch speichern“ (allgemeines Archivieren). **Blau = „Datum für Wochenplan wählen“:** Öffnet Kalender-Slider und setzt den `scheduledDate`-Tag für diesen Cookbook-Eintrag.
- Grüner Button = immer die einfachste Standard-Aktion des Modus; blauer Button = Zusatz-Option (Planung/Timing).

**UI:** „Preisübersicht ⓘ“ bleibt im MODE_PLAN unsichtbar und erscheint sofort, wenn durch Blitz oder blauen Button in den Inserats-Kontext (MODE_AD) gewechselt wird.

---

## 1. Mode Detection (MODE_AD vs. MODE_PLAN)

- **MODE_AD:** Inserat mit Gebührenoptionen. **MODE_PLAN:** Nur Speichern/Planen, keine Gebühr, kein Live-Badge.
- In `openProviderOffer()`: `source === 'week' || source === 'cookbook'` → initial `MODE_PLAN`; `source === 'dashboard'` oder `options.instantLive === true` → `MODE_AD`.
- Variable `psheetCardMode` im Closure + **`data-mode="ad"`** bzw. **`data-mode="plan"`** an `#psheet` / `#psheetDecisionZone`.

---

## 2. Button-Labels und Aktionen (PLAN vs. AD)

**MODE_PLAN:**

- Grün: **„Im Kochbuch speichern“** – nur Speichern, keine Gebühr, kein Live; Sheet schließen, ggf. `renderCookbook`/`renderWeekPlanBoard`.
- Gelb: **„Abbrechen“** (dezent grau) – Sheet schließen ohne Speichern.
- **Preisübersicht ⓘ** und Umsatzprognose: ausblenden.

**MODE_AD:**

- Grün: **„mit Abholnummer“**, Gelb: **„Nur Inserat“** – bestehende Logik (inkl. 800 ms Spinner, Success-Sheet, Konfetti).
- Preisübersicht und Prognose einblenden.

Zentrale Hilfsfunktion **`applyPsheetDecisionZoneMode(mode)`**: Labels, Sichtbarkeit, Handler-Verzweigung. Beim Wechsel PLAN → AD (Blitz): Flip-Animation der Buttons, Preisübersicht einblenden.

---

## 3. Blitz-Icon (Instant-Live) + Draft-Pipeline

- **UI:** Blitz (⚡) oben rechts auf Kochbuch-Magazin-Karte und auf belegten Wochenplan-Slots; weiße Glass-Pill, gelbes Blitz-Symbol; optional Tooltip „Sofort inserieren“.
- **Pipeline:**
  1. **`initializeDraftFromCookbook(item)`** (oder `createOfferFromCookbook(cookbookId)`): Neues Offer mit `status: 'draft'`, Mapping Titel, Bild, Allergene, Standard-Preis (8,50 € falls leer). Offer in `offers` pushen, `save(LS.offers, offers)`, Rückgabe `draftId`.
  2. **`openProviderOffer(draftId, { source: 'cookbook'|'week', instantLive: true })`** → Karte öffnet in MODE_AD.
- **Haptik:** `navigator.vibrate([10, 50, 10])` beim Blitz-Tap.
- **Wochenplan:** Blitz auf Slot-Karte → bei bestehendem Offer: `openProviderOffer(items[idx].id, { source: 'week', instantLive: true })`; bei reinem Plan-Eintrag (nur cookbookId): Draft aus Cookbook erzeugen, dann `openProviderOffer(draftId, { source: 'week', instantLive: true })`.

---

## 4. Blauer Button – Kontextlogik

- **Position:** Über der Decision Zone (Grün/Gelb) in der Psheet.
- **MODE_AD:** Label **„Für später einplanen“**. Aktion: Datums-Picker (Header-Morph mit Kalender-Slider) → Speichern im Wochenplan, Offer **nicht** aktivieren (status `draft` oder `scheduled`).
- **MODE_PLAN:** Label **„Datum für Wochenplan wählen“**. Aktion: Kalender-Slider öffnen → `scheduledDate` für diesen Cookbook-Eintrag setzen (Eintrag in `week[chosenDate]` + ggf. `cookbook.lastScheduledDate` o. ä.).
- Gemeinsam: Nach Datumswahl Button **„Für [Datum] einplanen“**; **`saveToWeeklyPlan`** / `addCookbookEntryToWeek`; Feedback, Sheet schließen (X wegploppen, Slide-Down).

---

## 5. Drag-and-Drop Wochenplan (Verfeinerung)

- **assignToDate(mealId, date):** Wrapper um `addCookbookEntryToWeek(date, cookbookId)`.
- **Haptik:** `navigator.vibrate(15)` beim Aufheben (dragstart), `navigator.vibrate(10)` beim Drop.
- **Visuell:** Belegte Slots = Emerald-Rand; leere Slots = gestrichelt + „+“. Beim Ziehen: `scale(0.95)`, `opacity: 0.8`, Cursor `grabbing`.

---

## 6. Implementierungs-Reihenfolge

1. **Phase 1:** Mode Detection, `applyPsheetDecisionZoneMode`, Button-Texte und Aktionen (PLAN vs. AD), Preisübersicht in PLAN ausblenden.
2. **Phase 2:** `initializeDraftFromCookbook` / `createOfferFromCookbook`, Blitz-UI (Kochbuch + Wochenplan), Blitz-Tap → Draft + `openProviderOffer(draftId, { instantLive: true })`, Button-Flip-Animation.
3. **Phase 3:** Blauer Button (Labels „Für später einplanen“ / „Datum für Wochenplan wählen“), Kalender-Slider im Header-Morph, `saveToWeeklyPlan` / Wochenplan-Speicherung je Modus.
4. **Phase 4:** Drag-Haptik und -Optik, `assignToDate`-Alias.

---

## Wichtige Datei

- **[app/index.html](app/index.html):** Alle Änderungen (HTML, CSS, openProviderOffer, renderCookbook, renderWeekPlanBoard, updatePsheetDecisionZone, doPsheetSave, addCookbookEntryToWeek, neue Funktionen initializeDraftFromCookbook/createOfferFromCookbook, saveToWeeklyPlan, applyPsheetDecisionZoneMode, assignToDate).
