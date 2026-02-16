# Prüfbericht: Inseratsflow-Umbau (S25) – Content-driven Navigation

**Stand:** Nach 8× „reopen und weiter“. Kontrolle ob alle Umbau-Punkte umgesetzt wurden.

---

## 1. Content-driven Navigation (kein unterer Button-Balken)

| Punkt | Status | Nachweis |
|-------|--------|----------|
| `.w-actions` aus Wizard-HTML entfernt | ✅ | Im Wizard-Markup (#wBox) gibt es nur wTitle, wStep, wQ, wHelp, **wContent**, wizardFooter – keine #wBack/#wNext (Zeile 8255–8265). |
| `clearWizardActionsBar` / `restoreWizardActionsBar` No-Ops | ✅ | Zeile 22501–22503: beide Funktionen sind `/* no-op */`. |
| `wBackBtn` / `wNextBtn` nur mit Null-Check | ✅ | Zeile 22788–22807: Refs auf `getElementById('wBack')` / `getElementById('wNext')` (Elemente existieren nicht); `setWizardNext` bricht mit `if(!wNextBtn) return;` ab. |
| Kein `setWizardNext('Weiter')` / `setWizardNext('Fertig')` in Provider/Cookbook/Week | ✅ | Grep: keine Treffer für `setWizardNext('Weiter')` oder `setWizardNext('Fertig')`. Nur `setWizardNextDefault()` am Anfang der Flows. |
| Toter Code im Listing (wNextBtn/wBackBtn) entfernt | ✅ | In `buildListingStep` keine Zuweisungen mehr an wNextBtn/wBackBtn. |

---

## 2. CSS (#wContent, Wizard-Scroll)

| Punkt | Status | Nachweis |
|-------|--------|----------|
| `#wContent` mit `flex: 1` und `min-height: 0` | ✅ | Zeile 2092–2096 (allgemein), 2254–2258 (Listing). |
| `.wizard-scroll` mit `flex: 1; min-height: 0` (Listing) | ✅ | Zeile 2217–2222. |
| Listing: `.liquid-master-panel` füllt Platz | ✅ | Zeile 2248–2252. |

---

## 3. Listing-Flow (Master Inseratsflow)

| Punkt | Status | Nachweis |
|-------|--------|----------|
| `photoTile` feste Höhe **190px** | ✅ | Zeile 23184: `height:190px`; Zeile 2300: CSS `height: 190px; min-height: 190px`. |
| Universal-X (`.close-wizard-x`) oben rechts | ✅ | Zeile 23186, 23206: closeX mit Klasse `close-wizard-x`; Zeile 2226–2238: Frosted-Glass-CSS; Klick → haptic + closeWizard(). |
| Smart-Photo / Smart-Search: `listingImageMap` | ✅ | Zeile 23160–23178: Keywords → Bild-Arrays inkl. default_meat/veggie/vegan/salat. |
| 3 Vorschaubilder im Placeholder | ✅ | Zeile 23195–23198: `getListingSuggestionUrls()`, bis zu 3 Bilder mit Klasse `photo-suggestion`. |
| Debounce **300 ms** am Eingabefeld „Was kochst du heute?“ | ✅ | Zeile 23157, 23277: `listingDebounceTimer`, `setTimeout(..., 300)`, danach `rebuildWizard()`. |
| **Unified Power-Bar** unter dem Foto | ✅ | Zeile 23220–23256: eine Leiste mit 🍴 Vor Ort, 🔄 Mehrweg, 🕒 Zeit, 🌾 Allergene, ➕ Extras; keine doppelte funcIcons-Leiste im Scroll. |
| **Fairness-Tooltip** bei Umsatzprognose | ✅ | Zeile 23353–23355: ⓘ-Tooltip mit Text „Abholnummer: 0,89 € pro Vorgang … Alternativ: Einmaliges Inserat für 4,99 € ohne Abholnummer.“ |

---

## 4. Provider-Wizard (Schritte 0–4)

| Schritt | In-Content-Buttons | Status |
|---------|--------------------|--------|
| 0 | Abbrechen, Weiter | ✅ Zeile 22910–22914 |
| 1 | Abbrechen, Zurück, Weiter | ✅ Zeile 22930–22933 |
| 2 | Zurück, Weiter (nav2) | ✅ Zeile 23006–23012 (nav2, btnBack2, btnNext2) |
| 3 | Zurück, Weiter (nav3) | ✅ Zeile 23047–23053 |
| 4 | Zurück, „Erstes Gericht erstellen“ (Fertig) | ✅ Zeile 23078–23087 (btnBack4, cta mit Haptik) |

---

## 5. Cookbook-Wizard (Schritte 0–7)

| Schritt | In-Content-Buttons | Status |
|---------|--------------------|--------|
| 0 | Abbrechen, Weiter (navC) | ✅ Zeile 24287–24290 |
| 1–6 | Abbrechen, Zurück, Weiter (navC1–navC6) | ✅ Jeweils eigene nav-Variablen, gleiches Muster |
| 7 | Abbrechen, Zurück, „Im Kochbuch speichern“ / „Änderungen speichern“ | ✅ Zeile 24432–24444 (navC7, btnAbortC7, btnBackC7, btnSaveC7); nach Speichern: closeWizard(true), showProviderCookbook(), renderCookbook(), alert. |

---

## 6. Week-Wizard

| Punkt | Status | Nachweis |
|-------|--------|----------|
| Abbrechen + „Zum Wochenplan hinzufügen“ (Fertig) im Content | ✅ | Zeile 24471–24486: navW, btnAbortW, btnFertigW; nach Hinzufügen: closeWizard(true), showProviderHome(). |
| Kein `setWizardNext` / `wNextBtn.onclick` | ✅ | Am Ende von `buildWeekStep` nur noch `setWizardContent(box);`. |

---

## 7. Haptik & Abholnummer

| Punkt | Status | Nachweis |
|-------|--------|----------|
| Wizard-Content-Buttons nutzen Haptik | ✅ | Überall `if(typeof haptic==='function') haptic(10); else if(navigator.vibrate) navigator.vibrate(10);` in Provider-, Cookbook- und Week-Nav-Buttons. |
| Wording „Abholnummer“ (kein Ticket/Abholcode in UI) | ✅ | Grep: „Ticket“/„Abholcode“ nur in Rechtstext/Wording-Hinweis („ist untersagt“). |

---

## 8. Sonstiges

| Punkt | Status |
|-------|--------|
| Listing: Schließen nur über .close-wizard-x oder Backdrop | ✅ |
| Kommentar zu #wBack/#wNext und No-Ops im Code | ✅ Zeile 22788, 22501 |

---

## Fazit

**Alle geprüften Umbau-Punkte sind umgesetzt.** Navigation läuft ausschließlich im Content (Abbrechen, Zurück, Weiter/Fertig); der untere Button-Balken wird nicht mehr genutzt, die zugehörigen DOM-IDs fehlen; CSS, Listing-Flow, Provider-, Cookbook- und Week-Wizard sowie Haptik/Wording sind konsistent umgesetzt.

---

## 9. Testanleitung (manuell prüfen)

App lokal starten (z. B. `npx serve app` oder Netlify Dev) und im Browser prüfen:

| Flow | Was prüfen |
|------|------------|
| **Provider-Setup** | Als Anbieter einloggen → Profil/Setup starten. In jedem Schritt: **Abbrechen**, **Zurück** (ab Schritt 1), **Weiter** bzw. **Erstes Gericht erstellen** nur im Content, kein fester Button-Balken unten. |
| **Inserat (Listing)** | Inserat erstellen öffnen. **X** oben rechts schließt; Power-Bar (🍴🔄🕒🌾➕) unter dem Foto; „Was kochst du heute?“ mit Debounce; ⓘ bei Umsatzprognose zeigt Abholnummer-Text. Kein Zurück/Weiter-Balken. |
| **Kochbuch** | Gericht zum Kochbuch hinzufügen. Alle 8 Schritte: **Abbrechen**, **Zurück**, **Weiter** bzw. **Im Kochbuch speichern** nur im Content. |
| **Wochenplan** | „Zum Wochenplan hinzufügen“ aus Kochbuch. **Abbrechen** und **Zum Wochenplan hinzufügen** im Content; danach Anzeige Provider-Home. |

Auf Mobilgerät oder mit DevTools (Touch/Responsive): Haptik (Vibration) bei Buttons, wenn unterstützt.

---

*Erstellt: Prüfung am Code (app/index.html).*
