# Wochenplan – High-End Planer-Optimierung

**Hinweis:** Die App ist eine SPA in `app/index.html` (kein React/TSX). Alle Änderungen erfolgen in dieser Datei.

---

## 1. Sticky & X – Vorgeschlagene Gerichte

### 1.1 Sticky-Header für Vorschlagsleiste

- **Ziel:** Die Leiste mit vorgeschlagenen Gerichten (aus Kochbuch / Auto-Vollständigung) **fixiert unter der Kalenderbar** am oberen Bildschirmrand, beim Scrollen des Wochenplans sticky.
- **Aktuell:** `#kwCookbookStrip` (Klasse `kw-cookbook-drag-strip`) wird in `renderWeekPlanBoard()` erzeugt und per `scrollEl.insertBefore(strip, grid)` **in** `#kwBoardScroll` eingefügt – scrollt also mit.
- **Umsetzung:**
  - Strip aus dem Scroll-Container herausnehmen: Strip **vor** `#kwBoardScroll` oder als festes Element im `#kwBoardHeader` (unter der KW-Carousel-Leiste) platzieren.
  - CSS: `#kwCookbookStrip` (oder neuer Wrapper) mit `position: sticky; top: <Höhe Kalenderbar>; z-index: 10; background: ...`, sodass die Leiste beim Scrollen kleben bleibt.
  - Referenz: `#v-provider-week` – Struktur `#kwBoardHeader` (darin `#kwCarousel`, `#kwProgressFill`) → darunter Strip → dann `#kwBoardScroll` mit `#kwGrid`.

### 1.2 Dismiss-Button (X) pro Vorschlag

- **Ziel:** Jedes vorgeschlagene Gericht in der Leiste hat ein **kleines, deutliches X-Icon**. Klick entfernt den Vorschlag sofort (aus der Anzeige/aus der Vorschlagsliste), mehr Platz und aufgeräumte Ansicht.
- **Aktuell:** Pills sind `kw-cookbook-drag-pill` mit nur Text (Gerichtsname), kein X.
- **Umsetzung:**
  - Beim Erzeugen der Pills in `renderWeekPlanBoard()` (ca. Zeile 21476–21479) jedes Pill um ein `<button type="button" class="kw-pill-dismiss" aria-label="Entfernen">` mit X-Icon ergänzen.
  - Optional: Nur die **angezeigten** Vorschläge dismissbar machen; wenn „dismiss“ = aus der aktuellen Sticky-Liste entfernen, reicht ein lokales Array oder Datenattribut, das beim nächsten Render (oder sofort per DOM-Entfernen) die angezeigte Menge reduziert.
  - Event: Klick auf X → `stopPropagation()` (kein Drag/kein Klick auf Pill), Pill aus DOM entfernen oder aus einer „dismissedIds“-Liste für diese Session filtern und Strip neu rendern.

---

## 2. Endlose Kalender-Navigation

### 2.1 8-Wochen-Slider (oder unbegrenzt)

- **Ziel:** Horizontale Kalender-Bar auf **mindestens 8 Wochen** (oder unbegrenzt slidebar) erweitern.
- **Aktuell:** In `renderWeekPlanBoard()` wird nur **4 Wochen** gebaut: `for (var w = 0; w < 4; w++)` (ca. Zeile 21450).
- **Umsetzung:**
  - Schleife auf z. B. **8 Wochen** erweitern: `for (var w = 0; w < 8; w++)` oder dynamisch ab aktueller KW ± N Wochen.
  - Optional „unbegrenzt“: z. B. 12 oder 16 Wochen; oder virtuelle Liste, die bei Scroll nachlädt.

### 2.2 Snap-Scrolling

- **Ziel:** KW-Elemente sollen beim Sliden **geschmeidig einrasten** (Snap-Scrolling).
- **Aktuell:** Es gibt bereits `#v-provider-week .week-dayrow{ scroll-snap-type: x mandatory; … }` (ca. Zeile 5056) – ggf. für dayrow; die **KW-Pills** sitzen in `#kwCarousel`.
- **Umsetzung:**
  - Container der KW-Pills (`.kw-carousel` oder Parent): `scroll-snap-type: x mandatory; overflow-x: auto;`.
  - Jeder KW-Pill: `scroll-snap-align: center` (oder `start`).
  - So wird beim horizontalen Scrollen immer eine KW sauber zentriert/eingerastet.

---

## 3. Symmetrisches Kachel-Design (feste Höhen)

### 3.1 Gleiche Bauweise aller Tages-Kacheln

- **Ziel:** Alle Tages-Kacheln (Mo–So) haben eine **feste, identische Höhe**, unabhängig von Gerichtsname/Beschreibungslänge.
- **Aktuell:** `.kw-day-card` enthält `.kw-slots`; `.kw-slot-main` hat `min-height: 80px`, Slots haben `min-height: 56px` (CSS ca. 5170–5181). Keine feste Höhe pro **Karte** (day-card).
- **Umsetzung:**
  - CSS: `#v-provider-week .kw-day-card` mit **fester min-height** (z. B. einheitlich 280px oder so, dass 3 Slots + Label + Datum immer gleich hoch sind).
  - `.kw-slots` mit `min-height` und festem Platz für 3 Slots, sodass alle 7 Karten gleich hoch sind.

### 3.2 Text: line-clamp

- **Ziel:** Zu langer Text nach **2 Zeilen** mit "…" abkürzen; 3 Slots pro Tag optisch auf gleicher vertikaler Linie.
- **Aktuell:** `.kw-slot-main .kw-slot-name` und `.kw-slot-small .kw-slot-name` haben bereits `-webkit-line-clamp: 2` (ca. 5176, 5185).
- **Umsetzung:**
  - Prüfen, ob überall wo Gerichtsname/Beschreibung steht, `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;` gesetzt ist.
  - Sicherstellen, dass Slot-Container (z. B. `.kw-slot-main`, `.kw-slot-small`) feste Höhe haben, damit die untere Kante der 3 Slots pro Tag auf einer Linie liegt.

---

## 4. Silent UI & Deep-Links

### 4.1 Silent Defaults (3 Säulen)

- **Ziel:** Icons für Vor Ort 🍴, Abholnummer 🎫1️⃣ und Mehrweg 🔄 **ausgeblendet**, wenn sie den Profil-Standards entsprechen.
- **Aktuell:** In `renderWeekPlanBoard()` (ca. 21518–21523) werden `showVorOrt` und `showMehrweg` nur bei **Abweichung** vom Profil gesetzt; `overrideBadges` werden gebaut, aber im aktuellen Slot-HTML (21529–21537) **nicht** in die Slot-Nodes eingebaut – die Badges werden also derzeit nicht angezeigt. Damit ist die „Silent“-Logik faktisch schon erfüllt; Abweichungs-Badges müssten nur dann ins DOM, wenn gewünscht.
- **Umsetzung:**
  - Bestätigen: Keine Anzeige von 🍴/🧾/🔄 auf den Karten, **außer** bei expliziter Abweichung vom Profil (dann nur die abweichenden Icons).
  - Regel: `week-meal-badges` oder Äquivalent nur rendern, wenn `showVorOrt || showPickup || showMehrweg` (Abweichung).

### 4.2 Dashboard Deep-Link

- **Ziel:** Klick auf „Zum Wochenplan“ im Dashboard führt **exakt zur gewählten KW und zum korrekten Tag** (Deep-Link).
- **Aktuell:** Navigation zu `v-provider-week` und Aufruf von `renderWeekPlanBoard()` bzw. `renderWeekPlan()`; `weekPlanKWIndex` und ggf. Tag müssen aus URL/Query oder State gesetzt werden.
- **Umsetzung:**
  - Beim Wechsel zur Wochenplan-View (z. B. `showProviderWeek()` oder Link „Zum Wochenplan“): gewünschte KW und Tag aus Hash/Query lesen (z. B. `#week=2&day=2026-02-19`) und `weekPlanKWIndex` sowie `weekPlanDay` setzen, dann `renderWeekPlanBoard()` aufrufen.
  - Beim Setzen der View-State-URL (z. B. beim Wechsel der KW) Hash/Query schreiben, damit „Zum Wochenplan“ mit Parametern aufgerufen werden kann.

---

## 5. Clean-Up: Aktivierungs-UI

### 5.1 Visuelle Reduktion auf den Karten

- **Ziel:** **Keine** permanenten „Jetzt aktivieren“-Buttons auf den Tageskarten. Inaktive Gerichte (Status ENTWURF) nur **leicht transparent (opacity 0.7)** und mit **feinem rötlichen Rand** darstellen.
- **Aktuell:** Es gibt `week-activate-inline` („Plan aktivieren“) im Status-Block (ca. 21781) und ggf. weitere Aktivierungs-Buttons. Die Slot-Karten selbst (kw-slot-main, kw-slot-small) haben Klassen `kw-slot-offline` für Entwurf (roter Hintergrund 2172–2173).
- **Umsetzung:**
  - Permanente „Jetzt aktivieren“-Buttons **von den Tageskarten entfernen** (nicht in den Slot-Inhalten, nicht in der day-card).
  - CSS für inaktive/Entwurf-Slots: z. B. `opacity: 0.7`, `border` oder `box-shadow` in dezentem Rot (z. B. `1px solid rgba(239,68,68,0.25)`), statt großer Button-Flächen.

### 5.2 Zentrale Aktivierung in der Sticky-KW-Bar

- **Ziel:** In der **Sticky-KW-Bar** (Kalenderzeile) einen **Sammel-Button**: „Woche aktivieren (Summe €)“. Er erscheint **nur**, wenn in der aktuellen KW inaktive Gerichte (Entwürfe) vorhanden sind.
- **Aktuell:** `weekMasterActivateBar` / `btnWeekMasterActivate` („Gesamte Auswahl aktivieren (… × 4,99 €)“) existieren in der Thumb-Zone (ca. 21661). Die Thumb-Zone ist am unteren Rand; die Anforderung ist „in der Sticky-KW-Bar oben“.
- **Umsetzung:**
  - Einen Button „Woche aktivieren (Summe €)“ im Bereich **kwBoardHeader** (neben oder unter der KW-Carousel) einbauen.
  - Sichtbarkeit: Nur anzeigen, wenn für die aktuelle KW (`getWeekDayKeys(weekPlanKWIndex)`) mindestens ein Tag Entwürfe (nicht live) hat; Summe = Anzahl Tage mit Entwürfen × 4,99 €.
  - Klick: Bestehende Logik für „Gesamte Auswahl aktivieren“ nutzen (z. B. `activateWeekDay` für alle Tage der KW oder vorhandene Master-Aktivierung).

### 5.3 Einzel-Option im Bottom-Sheet

- **Ziel:** **Nur** beim Öffnen des **Bottom-Sheets (Bearbeiten-Modus)** für ein konkretes Gericht die Option **„Dieses Gericht einzeln aktivieren“** prominent anzeigen.
- **Aktuell:** `openProviderOffer(…, { source: 'week' })` bzw. `openWeekAddSheet` öffnen das Sheet; dort muss ein klarer Button „Dieses Gericht einzeln aktivieren“ (4,99 €) ergänzt werden.
- **Umsetzung:**
  - Im Provider-Sheet (psheet) oder im Wochenplan-Add-Sheet: Wenn Kontext „week“ und Gericht ist Entwurf, einen Button „Dieses Gericht einzeln aktivieren (4,99 €)“ einbauen, der nur dieses eine Gericht aktiviert (z. B. `activateWeekDay(dayKey)` für den einen Tag oder Publish dieses Eintrags).

### 5.4 Layout-Stabilität

- **Ziel:** Kacheln behalten **feste Höhe**; kein „Springen“, wenn ein Gericht aktiviert wird.
- **Umsetzung:** Wie in Abschnitt 3 – feste min-height für `.kw-day-card` und `.kw-slot-*`; beim Wechsel von Entwurf zu Live nur Farben/Opacity ändern, keine Höhenänderung.

---

## Referenz im Code (app/index.html)

| Thema | Bereich (ca.) |
|-------|----------------|
| KW-Carousel, Strip, Grid | Zeilen 21438–21575 (`renderWeekPlanBoard`) |
| Strip einfügen | 21466–21490 (kwCookbookStrip) |
| KW-Pills (4 Wochen) | 21449–21457 |
| Slot-HTML (main/small), Badges | 21507–21550 |
| Silent Defaults (showVorOrt, showMehrweg) | 21518–21523 |
| week-activate-inline, Master-Activate | 21661, 21781, 21885 |
| CSS kw-slot, kw-day-card | 5169–5201, 4988–4998 |
| CSS week-dayrow snap | 5056, 4987 |
| showProviderWeek, Deep-Link | 11280, 11030 |

---

## Reihenfolge der Umsetzung (Empfehlung)

1. **Sticky Strip + X-Button** (1.1, 1.2) – Strip aus Scroll raus, sticky machen; Pills mit Dismiss-X.
2. **8-Wochen-Slider + Snap** (2.1, 2.2) – Schleife auf 8 (oder mehr), Carousel mit scroll-snap.
3. **Feste Kachel-Höhen + line-clamp** (3.1, 3.2) – CSS für day-card und Slots; line-clamp prüfen.
4. **Clean Activation UI** (5.1, 5.2, 5.3) – Buttons von Karten entfernen; zentraler „Woche aktivieren“ in Header; Einzel-Aktivierung nur im Sheet.
5. **Silent UI + Deep-Link** (4.1, 4.2) – Bestätigen/ergänzen.
