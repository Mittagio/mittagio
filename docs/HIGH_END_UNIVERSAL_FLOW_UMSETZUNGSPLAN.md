# High-End Universal-Flow – Konkreter Umsetzungsplan

**Stand:** Februar 2026  
**Referenz:** `docs/HIGH_END_UNIVERSAL_FLOW_SPEC.md`  
**Codebasis:** `app/index.html` (Vanilla JS, ein Wizard)

---

## 1. Wo was liegt (Überblick)

| Bereich | Ort in index.html | Beschreibung |
|--------|--------------------|--------------|
| **Universelle Maske („Salatsoße“)** | `buildListingStep()` – **Schritt 0** (ca. Zeile 22089–22382) | Ein einziger „Glass-Express“-Schritt: Gerichtsname, Kategorie, Preis, Bild, Smart-Bar, Allergene, Umsatz, Buttons. |
| **Quick-Post** | `#quickPostSheet` (ca. 6988–7013), `closeQuickPostSheet` / Öffnen bei Kochbuch | Nur Bestätigung „Jetzt live?“ + „Für 4,99 € inserieren“ / „Angaben ändern“. Kein voller Maskenaufbau – ruft bei „Angaben ändern“ den Wizard. |
| **Wizard-Container** | `#wizard`, `#wContent`, `.wizard-scroll`, `.w-actions` | Sheet mit `data-flow="listing"`; Inhalt wird per `setWizardContent(box)` gesetzt; Primär-Button über `setWizardNext(…)`. |
| **Einstiege** | `startListingFlow(context)` (ca. 21508), `startWizard('listing', ctx)` (21571) | `context.entryPoint`: `'dashboard'` \| `'cookbook'` \| `'week'`. Steuert Primär-Button und Umsatz-Anzeige. |
| **Publish-Fee / Abholnummer** | `#publishFeeSheet` (7042ff), Aufruf vor Veröffentlichung | Zeigt 4,99 € + 0,89 € Abholnummer. Wird nach Klick auf „Jetzt für 4,99 € inserieren“ (Schritt 3) geöffnet. |

Die **vereinheitlichte Maske** ist also **nur** der Inhalt von **Schritt 0** in `buildListingStep()`. Quick-Post und Wochenplan-Sheet nutzen bzw. rufen diesen Flow auf, bauen aber keine zweite Maske.

---

## 2. Bereits umgesetzt (Schritt 0)

- Gerichtsname mit Autovervollständigung (Suggestions als Pills).
- Kategorie-Pills: Vegetarisch, Vegan, Mit Fleisch, Salat (Glas-Optik, Emerald bei aktiv).
- Preis: `inputmode="decimal"`, großer Stil.
- Bild: Kamera + Galerie; bei Kamera wird `applyAppetizerFilter` genutzt.
- Smart-Bar: 🕒 🍴 🔄 🧾 (Abholzeiten, Vor Ort, Mehrweg, Abholnummer).
- Allergene: „Allergene prüfen? Ja/Nein“ + bei Ja Pills (ALLERGENS_14); Vorauswahl aus Gericht.
- Umsatz-Potenzial (nur bei entryPoint `dashboard` hervorgehoben).
- Primär-Button: Gelb „JETZT FÜR 4,99 € INSERIEREN“ (dashboard) oder Emerald „IM KOCHBUCH SPEICHERN“ / „IN WOCHENPLAN SPEICHERN“.
- Sekundär-Buttons: z. B. „In Kochbuch speichern“, „Wochenplan“, „Jetzt direkt inserieren“, „Nur Planung ändern“ je nach entryPoint.

---

## 3. Offene Punkte (Reihenfolge der Umsetzung)

### Phase A: Maske & Reihenfolge (Spec-konform)

| Nr | Aufgabe | Wo (Datei / Zeile / Element) | Konkret |
|----|---------|------------------------------|--------|
| A1 | **Beschreibungsfeld** (optional) | `buildListingStep()`, Schritt 0, nach Kategorie-Pills, vor Preis | Neues `<input>` oder `<textarea>` „Beschreibung (optional)“, z. B. Platzhalter „z. B. frisch aus dem Garten“. In `w.data.description` speichern; bei Speichern/Veröffentlichen mitschicken. |
| A2 | **Reihenfolge prüfen** | Schritt 0 | Spec: Gerichtsname → Kategorie → **Beschreibung** → Preis → Allergene → Foto → Smart-Icons. Aktuell: … → Preis → **Bild** → Smart-Bar → Allergene. Optional: Reihenfolge auf Spec umstellen (Beschreibung einfügen, Allergene vor Foto, dann Foto, dann Smart-Bar). Oder nur Beschreibung einfügen und Reihenfolge Allergene/Foto/Smart-Bar beibehalten (Spec „Salatsoße“ als inhaltliche Vorgabe, Reihenfolge minimal anpassbar). |

### Phase B: Kategorie-Pills & Allergene (UX)

| Nr | Aufgabe | Wo | Konkret |
|----|---------|-----|--------|
| B1 | **Kategorie-Pills horizontal scrollbar** | Schritt 0, `catRow` (ca. 22124–22134) | `catRow` in ein Wrapper-`div` mit `overflow-x: auto`, `-webkit-overflow-scrolling: touch`, `display: flex`, `flex-wrap: nowrap`, Pills `flex: 0 0 auto`. So „große Kacheln“ horizontal scrollbar. |
| B2 | **Allergene collapsible** | Schritt 0, Allergen-Block (ca. 22214–22245) | Zwei Zustände: (1) **Offen:** Gläserne Pills wie jetzt. (2) **Zugeklappt:** Eine Zeile „Allergene: A, G“ (oder „Keine“). Umschalten: z. B. bei Fokus-Wechsel (blur auf letztem Allergen-Feld / Klick außerhalb) oder Button „Fertig“ → kollabieren. Beim erneuten Klick auf die Zeile wieder aufklappen. `w.data.allergensCollapsed` o. ä. für Zustand. |

### Phase C: Foto (Filter & Crop)

| Nr | Aufgabe | Wo | Konkret |
|----|---------|-----|--------|
| C1 | **Gastro-Filter auch für Galerie** | Schritt 0, Galerie-Button (ca. 22164): `w.data.photoData=await toDataUrl(f);` | Nach Galerie-Upload dieselbe Filter-Funktion wie bei Kamera aufrufen: `applyAppetizerFilter(dataUrl)` (falls vorhanden), sonst mind. CSS-Filter auf der Vorschau (z. B. `filter: brightness(1.05) contrast(1.08) saturate(1.1)`). |
| C2 | **Crop nach Upload** | Nach `toDataUrl` / `applyAppetizerFilter` | Optionale Crop-UI: Canvas oder Overlay mit Zuschneide-Rahmen, ein „Übernehmen“-Button schreibt zugeschnittenes Bild zurück in `w.data.photoData`. Kann als kleines Modul (eigenes Sheet oder Inline) umgesetzt werden; Spez „reine Zuschneide-Funktion“. |

### Phase D: Liquid Flow (Auto-Advance, Keyboard, Haptik)

| Nr | Aufgabe | Wo | Konkret |
|----|---------|-----|--------|
| D1 | **Auto-Scroll zum nächsten Feld** | Schritt 0, nach jeder „erledigten“ Eingabe | Nach Gericht-Auswahl (Autocomplete-Pill): `scrollToEl(inputPrice)`. Nach Kategorie-Klick: `scrollToEl(inputPrice)` oder Beschreibung. Nach Preis-Enter / -blur: z. B. zum Bild-Bereich scrollen. Gemeinsame Hilfsfunktion `scrollToNextField(completedElement)` mit festen „next“-Zielen. |
| D2 | **Tastatur schließen** | Bei Autocomplete-Wahl, Kategorie-Klick, Preis Enter | Nach Klick auf Suggestion: `input.blur(); document.activeElement?.blur();`. Nach Kategorie-Pill: `document.activeElement?.blur();`. Auf Preis-`keydown` bei Enter: `inputPrice.blur();`. Optional: `navigator.keyboard?.hide()` falls PWA. |
| D3 | **Haptik** | Überall wo bereits `haptic(…)` | Prüfen, ob alle relevanten Aktionen (Auswahl, Fokus-Wechsel, Abschluss) `haptic(8)` oder `haptic(10)` aufrufen. Spec: „jede Auswahl, jeder Fokus-Wechsel, jeder Abschluss“. |

### Phase E: Pricing-Weiche (Option A / B) & Abholnummer bei 0,00 €

| Nr | Aufgabe | Wo | Konkret |
|----|---------|-----|--------|
| E1 | **Pricing-Weiche nur bei „Jetzt Inserieren“** | Schritt 0, Stelle wo der **eine** Primär-Button gesetzt wird (ca. 22268–22295) | Nur wenn `entryPoint === 'dashboard'` **und** es der Modus „Inserat abschließen“ ist: Statt **einem** gelben Button **zwei** Optionen anzeigen: **Option A:** Gelber Button „Jetzt für 4,99 € einmalig inserieren“ (wie bisher). **Option B:** Grüner Rahmen / Glas-Button „Jetzt für 0,00 € inserieren mit Abholnummer (0,89 € pro Vorgang)“. Bei Klick auf B: `w.data.pricingOption = 'abholnummer'` oder `w.data.hasPickupCode = true` und Flag für 0,00 € Inseratsgebühr setzen (z. B. `w.data.inseratFeeWaived = true` oder über bestehendes Abrechnungs-Flag). |
| E2 | **Abholnummer-Logik bei Option B** | Beim Absenden (Schritt 3 → Publish / API) und in `w.data` | Bei Wahl Option B: Sicherstellen, dass `hasPickupCode === true` gesetzt ist und das Backend/ die Logik „0,00 € Inserat + Abholnummer 0,89 € pro Vorgang“ verarbeitet. D. h. bei Veröffentlichung: Wenn `w.data.pricingOption === 'abholnummer'`: Inseratsgebühr 0,00 €, Abholnummer aktiv, Abrechnung 0,89 € pro Bestellung. Dazu prüfen: Wo wird das Angebot/Inserat an Server gesendet (Suche nach `hasPickupCode`, `orderingEnabled`, Preis- und Gebührenlogik)? Dort die Weiche einbauen. |
| E3 | **Schritt 3 anpassen** | Schritt 3 (ca. 22556–22590): „Jetzt für 4,99 € inserieren“ / Kochbuch / Wochenplan | Falls Nutzer bereits in Schritt 0 Option B gewählt hat, in Schritt 3 entweder (a) Option B nicht nochmal anzeigen, sondern direkt „Mit Abholnummer veröffentlichen (0,89 €/Vorgang)“ als Bestätigung, oder (b) Schritt 3 zeigt weiter beide Optionen; dann muss die in Schritt 0 getroffene Wahl in Schritt 3 berücksichtigt werden (z. B. vorausgewählt). Einfachste Variante: In Schritt 0 bei Option B auf „Weiter“ klicken → Schritt 1 überspringen? Oder Schritt 3 zeigt einen einzigen grünen Button „Mit Abholnummer live schalten (0,89 €/Vorgang)“ wenn Option B gewählt. |

### Phase F: Layout-Stabilität & Glassmorphism

| Nr | Aufgabe | Wo | Konkret |
|----|---------|-----|--------|
| F1 | **Kein Layout-Sprung bei Modus-Wechsel** | Wizard beim Wechsel `entryPoint` (z. B. „Jetzt direkt inserieren“ aus Kochbuch) | Beim `rebuildWizard()` (z. B. durch Sekundär-Button „Jetzt direkt inserieren“) gleiche DOM-Struktur und gleiche Reihenfolge der Blöcke beibehalten; nur Button-Texte und -Logik tauschen. Bereits weitgehend der Fall; beim Einfügen der Pricing-Weiche (E1) darauf achten, dass die Höhe der Button-Zone nicht springt (z. B. immer zwei Zeilen reservieren oder min-height). |
| F2 | **Glassmorphism schärfen** | CSS `.glass-express-step0`, `.glass-pill`, Backdrop des Wizard | Spec: „backdrop-blur-2xl“, weiße 70 % Overlays, feine Lichtkanten. Prüfen: `#wizard.sheet--kitchen`, `.glass-express-step0` (ca. 1499–1533). Ggf. `backdrop-filter: blur(24px)`, Hintergrund `rgba(255,255,255,0.7)`, `box-shadow` für Lichtkante. |

---

## 4. Abhängigkeiten & empfohlene Reihenfolge

1. **Zuerst:** Phase E (Pricing-Weiche + Abholnummer 0,00 €) – klar definierte Weiche und Datenmodell, danach Rest.
2. **Dann:** Phase A (Beschreibung, Reihenfolge) – minimale Erweiterung der Maske.
3. **Dann:** Phase B (Kategorie scrollbar, Allergene collapsible) – reine UX in Schritt 0.
4. **Dann:** Phase D (Auto-Scroll, Keyboard, Haptik) – verbessert Flow spürbar.
5. **Dann:** Phase C (Foto Filter/Crop) – optional aufwändiger.
6. **Abschließend:** Phase F (Layout, Glassmorphism) – Feinschliff.

---

## 5. Wichtige Zeilen / Suchbegriffe (index.html)

| Zweck | Suchbegriffe / ungefähre Zeile |
|-------|--------------------------------|
| Schritt 0 beginnen | `if(w.step===0){` in buildListingStep (22089) |
| Gerichtsname-Input | `input.placeholder='Was kochst du heute?'` (22102) |
| Kategorie-Pills | `catLabels`, `catRow` (22124) |
| Preis-Input | `inputPrice`, `inputmode='decimal'` (22147) |
| Bild Kamera/Galerie | `imgRow`, `pickImage`, `applyAppetizerFilter` (22161–22172) |
| Smart-Bar | `smartBar`, `addSmartBtn` (22174–22200) |
| Allergene | `allRow`, `wantsAllergens`, `pills` (22214–22245) |
| Primär-Button setzen | `setWizardNext(primaryLabel)`, `wNextBtn.onclick` (22268–22295) |
| Schritt 3 „4,99 € inserieren“ | `tilePub`, `w.step++` (22562–22566) |
| Publish-Fee öffnen | Suche nach `publishFeeBd`, `openPublishFeeModal` o. ä. |
| hasPickupCode setzen | `w.data.hasPickupCode` (22199, 22306, 7918) |

---

## 6. Kurz: Quick-Post & Wochenplan-Sheet

- **Quick-Post** (`#quickPostSheet`): Kein Umbau der Maske nötig; zeigt nur Zusammenfassung + „Für 4,99 € inserieren“ / „Angaben ändern“. Bei Option B (0,00 €) müsste hier entweder ein zweiter Button „Mit Abholnummer (0,89 €/Vorgang)“ angeboten werden oder der Einstieg „Angaben ändern“ führt in den Wizard, wo die Weiche in Schritt 0 liegt.
- **Wochenplan-Sheet** (`#weekAddSheet`): Listet Kochbuch-Gerichte zum Eintragen in den Plan. „Neues Gericht“ könnte `startListingFlow({ entryPoint: 'week' })` aufrufen – dann gilt in Schritt 0 nur Emerald „In Wochenplan speichern“, keine Pricing-Weiche. Kein zusätzlicher Masken-Code nötig.

---

*Bei Umsetzung die Spec `HIGH_END_UNIVERSAL_FLOW_SPEC.md` und die bestehenden Konzepte `INSERATSFLOW_KONZEPT.md` / `INSERATSFLOW_SPEC_2026.md` beachten.*
