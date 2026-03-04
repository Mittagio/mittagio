# Analyse: Flow FAB → CreateFlowSheet → Mastercard (Stand 2026-03-02)

**Kontext:** Vor den Wochenplan-/FAB-Änderungen hat alles funktioniert. Diese Analyse prüft den kompletten Pfad.

---

## 1. Flow-Übersicht

| Schritt | Aktion | Funktion / Element |
|--------|--------|--------------------|
| 1 | Dashboard: Klick auf "+" (FAB) | `ensureProviderFab` → `btn.onclick` → `window.openCreateFlowSheet()` |
| 2 | CreateFlowSheet öffnet sich | Renner + "Neues Gericht" sichtbar |
| 3 | Klick "Neues Gericht" | `createNewListingBtn.onclick` → `window.closeCreateFlowSheet()` → `window.openDishFlow(date, ep)` |
| 4 | openDishFlow | `startListingFlow(ctx)` → `startWizard('listing', context)` |
| 5 | Mastercard Step 1 | `buildListingStep()` rendert InseratCard im #wizard |

**Alternativ (ohne CreateFlowSheet):**
- Dashboard: Klick auf Karte (aktives Inserat) → `startListingFlow({ editOfferId })`
- Wochenplan: Klick auf Slot → `startListingFlow({ date, entryPoint: 'week' })`

---

## 2. Relevante Stellen im Code

| Datei | Zeile | Inhalt |
|-------|-------|--------|
| script.js | 1259 | FAB: `window.openCreateFlowSheet()` |
| script.js | 6224–6256 | `openCreateFlowSheet`, `closeCreateFlowSheet`, window-Export |
| script.js | 6270–6277 | createNewListingBtn: `window.openDishFlow(date, ep)` |
| script.js | 16293–16300 | `openDishFlow` → `startListingFlow(ctx)` |
| script.js | 16326–16338 | `startListingFlow` → `startWizard('listing', context)` |
| index.html | 3107 | createFlowBd: `onclick="closeCreateFlowSheet()"` |
| index.html | 3130 | createNewListing: Button "+ Neues Gericht" |

---

## 3. Umgesetzte defensive Fixes

1. **Früher Stub:** `window.startListingFlow` wird am Anfang von script.js als Stub gesetzt (falls die Implementierung später nicht erreicht wird).
2. **openDishFlow:** Nutzt `startListingFlow` oder `window.startListingFlow` mit Fallback und Warnung.
3. **createNewListingBtn:** Fallback auf `startListingFlow` bzw. `window.startListingFlow`, falls `openDishFlow` fehlt.

---

## 4. Mögliche Ursachen (wenn es weiterhin nicht funktioniert)

| Ursache | Prüfung |
|---------|---------|
| Laufzeitfehler vor Zeile 16338 | Konsole: Fehler beim Laden? |
| Script-Reihenfolge | utils.js → ui-views.js → script.js → app-logic.js → ui-navigation.js |
| Cache | Cache-Bust: `script.js?v=20260301` – evtl. erhöhen |
| Z-Index / Sichtbarkeit | Wizard hinter #wbd oder #createFlowBd? (bereits gefixt: z-index 99999) |

---

## 5. Debug in der Konsole

```javascript
// Nach vollständigem Laden:
typeof window.startListingFlow   // sollte "function" sein
typeof window.openDishFlow      // sollte "function" sein
typeof window.openCreateFlowSheet  // sollte "function" sein
```

Bei Klick auf "Neues Gericht" sollte erscheinen: `[startListingFlow] called { date: "...", entryPoint: "dashboard" }`

---

## 6. Referenz

- **Regeln:** `.cursor/rules/inserat-flow-stop-order.mdc`, `unified-inserat-flow-conduct.mdc`
- **Dokumentation:** `docs/FEHLER_NACH_REFACTORING.md`
