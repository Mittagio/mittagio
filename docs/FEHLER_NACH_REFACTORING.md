# FEHLER NACH REFACTORING

**Stand:** 28.02.2026  
**Referenz:** App war am 26.02.2026 (dc21201) fertig  
**Auslöser:** Refactorings (Sprint 4, 5, 5b)

---

## 1. Übersicht der aufgetretenen Fehler

| Fehler | Beschreibung | Status |
|--------|--------------|--------|
| Fehlende Bottom-Navigation | Kunden- und/oder Anbieter-Nav nicht sichtbar | Behoben (DESIGN-GESETZ) |
| Falscher Discover-Header | Tage-Leiste „Heute, Morgen, Übermorgen“ + Radius-Filter unerwünscht | Behoben (display: none) |
| Inserieren im Kundenbereich | „Dieses Gericht jetzt inserieren“ im Kochbuch sichtbar | Behoben (body:not(.provider-mode)) |
| Leere Seiten / Flackern | Views rendern nicht oder flackern | Teilweise behoben (Render-Wrapper, setupLiveSync deaktiviert) |
| Navigation reagiert nicht | Klicks auf Nav-Tabs führen nicht zum View-Wechsel | Behoben (showView-Wrapper) |

---

## 2. Kundenbereich – Fehler und Fixes

### Entdecken (#v-discover)
- **Fehler:** Tage-Leiste und Radius-Row sichtbar (nicht vorgesehen)
- **Fix:** `#discoverDaysBar`, `.discover-radius-time-row` → `display: none !important`
- **Datei:** `app/style.css` (Zeilen 5617–5627)

### Favoriten, Mittagsbox, Meins
- **Fehler:** Leere Seiten nach View-Wechsel
- **Fix:** `showView`-Wrapper ruft `renderFavorites()`, `renderCart()`, `updateProfileView()` nach 60 ms auf
- **Datei:** `app/script.js` (MITTAGIO MASTER-RESTORE)

### Bottom-Nav (#customerNav)
- **Fehler:** Nav nicht sichtbar oder falsch positioniert
- **Fix:** DESIGN-GESETZ: `height: 70px`, `z-index: 999999`, `border-top: 1px solid #ebebeb`

### Cookbook-Footer
- **Fehler:** „Dieses Gericht jetzt inserieren“ im Kundenbereich sichtbar
- **Fix:** `body:not(.provider-mode) #cookbookFooterWrap { display: none !important }`

---

## 3. Anbieterbereich – Fehler und Fixes

### Bottom-Nav (#providerNav)
- **Fehler:** Nav nicht sichtbar oder überlappt
- **Fix:** DESIGN-GESETZ: gleiche Footer-Regeln wie Kunden-Nav
- **Offen:** Regel fordert 5 Tabs (inkl. Kochbuch), aktuell nur 4 Tabs im HTML

### Cookbook-Footer
- **Fehler:** Footer überlappt Provider-Nav
- **Fix:** `body.provider-cookbook-active #cookbookFooterWrap { bottom: calc(75px + env(safe-area-inset-bottom)) }`

---

## 4. JavaScript – Fehler und Fixes

| Problem | Ursache | Fix |
|---------|---------|-----|
| Flackern | `setupLiveSync` liest Storage und triggert Re-Render | `setupLiveSync` deaktiviert (No-Op) |
| Leere Views | Render-Funktionen werden nach View-Wechsel nicht aufgerufen | `showView`-Wrapper mit 60 ms Timeout ruft Render-Funktionen auf |
| Nav-Klicks | `data-go` / `data-pgo` führt nicht zu `showView` | Zusätzlicher Klick-Handler mit View-ID-Mapping |

---

## 5. CSS – Änderungen (DESIGN-GESETZ)

| Regel | Zweck |
|-------|-------|
| Footer `#customerNav`, `#providerNavWrap` | Sichtbarkeit, Höhe, z-index, Border |
| `.tgtg-list-item`, `.dish-card` | Flex-Layout für Karten |
| `.card-pillars`, `.pillar-row` | Säulen-Icons (🍴🧾🔄), order, gap |
| `.primary-btn-black`, `.btn-primary` | Einheitliche Button-Farben (#222222), border-radius |
| Cookbook-Footer im Anbieterbereich | Position über Provider-Nav |
| Cookbook-Footer im Kundenbereich | Ausblenden |

---

## 6. Offene Punkte / Restrisiken

1. **Provider-Nav:** Kochbuch-Tab fehlt (Regel: 5 Tabs, Code: 4 Tabs)
2. **setupLiveSync:** Deaktiviert → kein Live-Sync über Storage/Intervall
3. **Doppelte Handler:** Zusätzliche Klick-Handler neben Original-Navigation
4. **Provider-Views:** Kein expliziter Render-Wrapper im MASTER-RESTORE (nur Kunden-Views)

---

## 7. Relevante Dateien

| Datei | Stellen |
|-------|---------|
| `app/script.js` | Ende: MITTAGIO MASTER-RESTORE (SAFE VERSION) |
| `app/style.css` | Ende: MITTAGIO DESIGN-GESETZ (STAND 26.02.) |
| `app/style.css` | Zeilen 5617–5627: Discover-Tage/Radius ausgeblendet |
| `app/js/ui-navigation.js` | Original `showView`, `go()` |
| `docs/diff-dc21201-to-head.md` | Diff seit Referenzstand |
