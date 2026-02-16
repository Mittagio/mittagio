# Inseratsflow S25 – Prüfbericht (Content-driven Navigation)

**Stand:** Nach großem Umbau (8× Reopen & Weiter). Kontrolle ob alle Punkte umgesetzt sind.

---

## 1. Content-driven Navigation (kein unterer Button-Balken)

| Punkt | Status | Stelle |
|-------|--------|--------|
| `.w-actions` aus Wizard-HTML entfernt | ✅ | Wizard-Markup (#wBox) enthält nur: wTitle, wStep, wQ, wHelp, **wContent**, wizardFooter – keine #wBack/#wNext |
| Listing: `.w-actions` ausgeblendet | ✅ | CSS Zeile 2224: `#wizard[data-flow="listing"] .w-actions { display: none !important; }` |
| `clearWizardActionsBar` / `restoreWizardActionsBar` No-Ops | ✅ | Zeilen 22502–22503 |
| `wBackBtn` / `wNextBtn` nur mit Null-Check | ✅ | Zeile 22788 Kommentar; getElementById('wBack'/'wNext') = null, alle Zugriffe mit if(wNextBtn)/if(wBackBtn) |
| Toter Code im Listing (wNextBtn/wBackBtn setzen) entfernt | ✅ | buildListingStep setzt keine Footer-Buttons mehr |

---

## 2. CSS (Wizard-Scroll & Content)

| Punkt | Status | Stelle |
|-------|--------|--------|
| `#wContent` flex: 1, min-height: 0 | ✅ | Zeilen 2092–2096 (allgemein), 2254–2258 (Listing) |
| `.wizard-scroll` flex: 1, min-height: 0 (Listing) | ✅ | Zeilen 2217–2222 |

---

## 3. Listing-Flow (Master Inseratsflow)

| Punkt | Status | Stelle |
|-------|--------|--------|
| photoTile feste Höhe **190px** | ✅ | Zeile 23184 style height:190px; Zeile 2300 CSS |
| Universal-X (`.close-wizard-x`) oben rechts | ✅ | Zeilen 2226–2238 (CSS), 23186–23191 (closeX, Klick → closeWizard + Haptik) |
| Frosted-Glass-CSS für .close-wizard-x | ✅ | backdrop-filter, border-radius, z-index in Zeile 2227ff. |

---

## 4. Smart-Photo / Smart-Search

| Punkt | Status | Stelle |
|-------|--------|--------|
| `listingImageMap` (Keywords → Bild-Arrays) | ✅ | Zeilen 23160–23165 (inkl. default_meat/veggie/vegan/salat) |
| Drei Vorschaubilder im Placeholder | ✅ | getListingSuggestionUrls(), for(si=0;si<urls.length;si++) → photo-suggestion Imgs (23195–23198) |
| Debounce **300 ms** am Eingabefeld „Was kochst du heute?“ | ✅ | Zeile 23277: listingDebounceTimer=setTimeout(..., 300) |
| Kategorie-Fallback (getListingSuggestionKey) | ✅ | Zeilen 23166–23170 |
| Anti-Frust (opacity 0 ohne Match) | ✅ | Zeile 23197: opacity showSuggestions ? '1' : '0', pointer-events |

---

## 5. Unified Power-Bar

| Punkt | Status | Stelle |
|-------|--------|--------|
| Eine Leiste unter dem Foto | ✅ | powerBar (Zeilen 23220–23256): inserat-power-bar, inserat-unified-pills |
| 5 Pills: 🍴 Vor Ort, 🔄 Mehrweg, 🕒 Zeit, 🌾 Allergene, ➕ Extras | ✅ | addPowerPill + timePill + allergenBarBtn + extrasBarBtn |
| Doppelte funcIcons-Leiste im Scroll entfernt | ✅ | Nur diese eine powerBar; 🌾/➕ scrollen zu #step-allergens / #step-extras |

---

## 6. Fairness-Tooltip (Umsatzprognose)

| Punkt | Status | Stelle |
|-------|--------|--------|
| ⓘ-Tooltip-Text: Abholnummer 0,89 €, Alternativ 4,99 € ohne Abholnummer | ✅ | Zeile 23353: „Abholnummer: 0,89 € pro Vorgang (egal wie viele Portionen). Alternativ: Einmaliges Inserat für 4,99 € ohne Abholnummer.“ |

---

## 7. Provider-Wizard (Schritte 0–4)

| Schritt | In-Content-Buttons | Status |
|---------|---------------------|--------|
| 0 | Abbrechen, Weiter | ✅ Zeilen 22911–22914 (nav, btnAbort, btnNext) |
| 1 | Abbrechen, Zurück, Weiter | ✅ Zeilen 22928–22933 |
| 2 | Abbrechen, Zurück, Weiter | ✅ nav2, btnBack2, btnNext2 (23006–23008) |
| 3 | Abbrechen, Zurück, Weiter | ✅ nav3, wrap (23047–23049) |
| 4 | Zurück, „Erstes Gericht erstellen“ (Fertig) | ✅ btnBack4, cta (23078–23085); setWizardNext entfernt |

---

## 8. Cookbook-Wizard (Schritte 0–7)

| Schritt | In-Content-Buttons | Status |
|---------|---------------------|--------|
| 0 | Abbrechen, Weiter | ✅ navC (24287–24290) |
| 1–6 | Abbrechen, Zurück, Weiter | ✅ navC1 … navC6 (24305, 24320, 24349, 24369, 24390, 24407) |
| 7 | Abbrechen, Zurück, „Im Kochbuch speichern“ / „Änderungen speichern“ | ✅ navC7, btnSaveC7, showProviderCookbook (24435–24446) |

Kein `setWizardNext('Weiter')` / `setWizardNext('Fertig')` / `wNextBtn.onclick` mehr in buildCookbookStep.

---

## 9. Week-Wizard

| Punkt | Status | Stelle |
|-------|--------|--------|
| Abbrechen + „Zum Wochenplan hinzufügen“ im Content | ✅ | navW, btnAbortW, btnFertigW (24473–24486) |
| Nach Hinzufügen: closeWizard(true), showProviderHome() | ✅ | Zeile 24482–24483 |
| Kein setWizardNext / wNextBtn.onclick | ✅ | Keine Aufrufe mehr |

---

## 10. Haptik

| Punkt | Status | Stelle |
|-------|--------|--------|
| Wizard-Content-Buttons nutzen zentrale `haptic()` | ✅ | Überall: `if(typeof haptic==='function') haptic(10); else if(navigator.vibrate) navigator.vibrate(10);` |
| close-wizard-x (Listing) | ✅ | Zeile 23191 |

---

## 11. Abholnummer-Wording

| Punkt | Status |
|-------|--------|
| In Wizard/Listing nur „Abholnummer“ (kein Ticket/Abholcode in UI) | ✅ | Tooltip, Rechtstexte nutzen „Abholnummer“; Ticket/Abholcode nur in Wording-Hinweis als untersagt |

---

## Kleinigkeiten (optional)

- **listingDebounceTimer:** Zwei aufeinanderfolgende `var listingDebounceTimer = null;` (Zeilen 23157–23158) – nur Redundanz, kein Fehler.

---

## Fazit

**Alle geplanten Punkte des Umbaus sind umgesetzt.** Navigation läuft ausschließlich im Content (Abbrechen, Zurück, Weiter/Fertig); kein unterer Button-Balken im Wizard; Listing mit Universal-X und einer Power-Bar; Provider/Cookbook/Week mit durchgängiger In-Content-Navigation und Haptik.
