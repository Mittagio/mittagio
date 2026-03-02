# Wochenplan – Audit: Fehler, Doppel, Inkonsistenzen

**Stand:** 02.03.2026  
**Scope:** CSS, Script, HTML – Wochenplan (`v-provider-week`)

**Behoben am 02.03.2026:** KW-Trigger, Header-Titel, tote Referenzen, CSS-Doppel, Sprint 5b31 (show/hide), Z-Index.

---

## 1. Kritische Fehler (Funktion bricht)

### 1.1 KW-Selector nicht öffnbar

**Problem:** Das Script bindet `openKWSelector()` an `#weekHeaderKWTrigger` – dieses Element existiert **nicht** im HTML.

| Datei | Zeile | Referenz |
|-------|-------|----------|
| script.js | 9456 | `e.target.closest('#weekHeaderKWTrigger')` |
| script.js | 11555 | `kwBadge = getElementById('weekHeaderKWBadge')` |
| script.js | 11903, 11956 | `kwTr = getElementById('weekHeaderKWTrigger')` |
| script.js | initWeekPlanInteractions | Bindet `kwTr.onclick` → openKWSelector |
| style.css | 7272, 7290–7292 | `#weekHeaderKWTrigger` |

**Aktuelles HTML:** KW-Anzeige sitzt in `#kwNavContainer` mit `#kwDisplay` (h2), `#kwNavPrev`, `#kwNavNext`. Kein Klick öffnet das KW-Sheet.

**Fix:** `openKWSelector` an `#kwDisplay` oder `#kwNavContainer` / `.kw-selector` binden (z.B. Klick auf „KW 10“ öffnet Sheet).

---

### 1.2 weekHeaderTitle vs weekHeaderTitleText

**Problem:** Script und ui-views referenzieren `weekHeaderTitle` – HTML hat `weekHeaderTitleText`.

| Datei | Zeile | Referenz |
|-------|-------|----------|
| script.js | 12018–12019 | `headerTitle = getElementById('weekHeaderTitle')` |
| script.js | 12023, 12074 | `headerTitle.textContent = '...'` |
| app/js/ui-views.js | 83 | `weekTitle = getElementById('weekHeaderTitle')` |

**Fix:** Entweder HTML anpassen (`id="weekHeaderTitle"`) oder Script auf `weekHeaderTitleText` umstellen.

---

## 2. Tote Referenzen (Element fehlt, kein Crash)

| Element | Verwendet in | HTML vorhanden? |
|---------|--------------|-----------------|
| `weekHeaderKWBadge` | script.js 11555 | Nein |
| `weekHeaderSubtitle` | script.js 12019, 12024, 12075 | Nein |
| `weekHeaderBackBtn` | script.js 14702–14705 | Nein |
| `weekDays` | script.js 12004 | Nein |
| `weekList` | script.js 12005 | Nein |
| `weekThumbZone` | script.js 12017 | Nein |
| `weekIndicatorRow` | script.js 12028, 12094 | Nein (wird ggf. dynamisch erzeugt) |

**Hinweis:** `renderWeekPlan()` prüft `dayWrap`/`list` – wenn null, wird früh `renderWeekPlanBoard()` aufgerufen. Der alte Overview-/Edit-Mode mit Pills läuft nie. Das ist konsistent mit dem aktuellen KW-Board-Layout.

---

## 3. CSS – Doppel und Legacy

### 3.1 #weekMagicFab – mehrfach display:none

| Zeile | Regel |
|-------|-------|
| 7252 | `#weekMagicFab{ display:none !important; }` |
| 7834 | `#weekMagicFab{ display:none !important; }` |

**Fix:** Eine Regel reicht; zweite entfernen oder in Media-Query konsolidieren.

---

### 3.2 #weekHeaderKWTrigger – CSS für nicht existierendes Element

| Zeile | Regel |
|-------|-------|
| 7272 | `#v-provider-week.view.active #weekHeaderKWTrigger` |
| 7290–7292 | `#weekHeaderKWTrigger` Styling |

**Fix:** Entweder Element hinzufügen oder CSS entfernen. Wenn KW über `kwDisplay` klickbar wird, können diese Regeln weg.

---

### 3.3 Legacy-Layout-Klassen (nicht mehr im DOM)

- `.week-plan-wrap`
- `.week-list-scroll`
- `.week-dayrow`
- `.week-thumb-zone`
- `.week-header-subtitle`
- `.week-status-block`, `.week-status-online`, `.week-status-draft`
- `.week-meal-card-wrap`, `.week-meal-card`, `.week-add-more`
- `.week-empty-state`, `.week-day-pill`, `.week-indicator-dot`

Diese Klassen stammen vom alten Wochenplan-Layout (weekDays/weekList). Das aktuelle Layout nutzt `kwBoardWrap`, `kwGrid`, `kw-day-card`, `kw-slot`. Die Legacy-Klassen werden von `renderWeekPlan()` im Overview-/Edit-Mode verwendet – der nie ausgeführt wird. CSS kann bleiben (falls später wieder genutzt) oder bereinigt werden.

---

### 3.4 week-header-compact – Duplikate

Mehrere fast identische Regeln in verschiedenen Media Queries (z.B. 7293, 7338, 7380, 7515, 7553). Kein Fehler, aber redundant – könnte zusammengefasst werden.

---

## 4. style.display / Sprint 5b31

**Regel:** UI-State über `show`/`hide`/`setVisible`, nicht über `element.style.display`.

| Datei | Stelle | Verwendung |
|-------|--------|------------|
| script.js | openWeekMagicSheet | `bd.style.display = 'block'`, `sheet.style.display = 'flex'` |
| script.js | closeWeekMagicSheet | `bd.style.display = 'none'`, `sheet.style.display = 'none'` |
| script.js | closeKWSelector | `bd.style.display = 'none'`, `sheet.style.display = 'none'` |
| script.js | toggleWeekKebabMenu, Kebab-Close | `kebabDrop.style.display = 'block'/'none'` |
| script.js | openKWSelector | `bd.style.setProperty('display','block','important')` etc. |

**Fix:** Auf `show()`/`hide()`/`setVisible()` umstellen (siehe `app/script.js` – clearVisibility, show, hide, setVisible).

---

## 5. Z-Index-Inkonsistenz

| Element | z-index |
|---------|---------|
| weekTemplatePreviewBd | 1192 |
| weekTemplatePreviewSheet | 1193 |
| weekTemplatesBd | 10104 |
| weekTemplatesSheet | 10105 |

Die Preview-Sheets haben niedrigeren z-index als die Templates-Sheets. Wenn die Preview über dem Templates-Sheet erscheinen soll, müssten die Werte angepasst werden (z.B. 10106/10107).

---

## 6. Kurz-Checkliste für Fixes

| Priorität | Aufgabe |
|-----------|---------|
| P0 | KW-Selector klickbar machen: `kwDisplay` oder `kwNavContainer` an `openKWSelector` binden |
| P0 | `weekHeaderTitle` ↔ `weekHeaderTitleText` vereinheitlichen |
| P1 | Tote Referenzen (weekHeaderKWBadge, weekHeaderSubtitle, weekHeaderBackBtn) entfernen oder Elemente hinzufügen |
| P2 | Doppelte `#weekMagicFab` display:none-Regel bereinigen |
| P2 | CSS für `#weekHeaderKWTrigger` entfernen (wenn Element nicht kommt) |
| P3 | style.display → show/hide/setVisible migrieren |
| P3 | Z-Index weekTemplatePreview prüfen |

---

## 7. Relevante Dateien

| Datei | Stellen |
|-------|---------|
| app/index.html | 1246–1287 (Wochenplan-Section), 1289–1321 (Sheets) |
| app/script.js | renderWeekPlanBoard ~11540, renderWeekPlan ~12001, initWeekPlanInteractions ~11955, ensureWeekHeaderKWTriggerBound ~11902 |
| app/style.css | 7250–7465 (Wochenplan-Block), 5157 (main > * Regel) |
| app/js/ui-views.js | 83 (weekHeaderTitle) |
