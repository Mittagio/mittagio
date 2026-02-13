# Wochenplan – Stand & Vorschläge (vor dem Weitermachen)

## Was du beschrieben hast

1. **„Sobald ich auf Wochenplan drücke, verschiebt sich der Button“**  
   Beim Wechsel auf die Wochenplan-Ansicht verschiebt sich etwas im Layout (z. B. die Bottom-Nav oder ein Tab).

2. **„Das Layout lässt sich leider verschieben“**  
   Die Seite wirkt verschiebbar oder nicht fest „eingebettet“ – nicht wie eine feste App-Ansicht.

3. **„Unten ist etwas mit Meine Daten – sieht noch nicht applike aus“**  
   Unten (vermutlich die Tab-Leiste mit „Küche | Abholungen | Wochenplan | Kochbuch | **Meins**“) wirkt nicht wie eine klare App-Navigation; „Meins“ = deine Daten/Profil.

4. **„Von oben sieht es aus wie eine Club-Seite mit Kalender“**  
   Der obere Bereich (nur Titel + Tages-Pills) wirkt wie eine generische Kalender-/Event-Seite, nicht wie eine klare „Mittagsplaner“-App.

5. **„Ich habe den Eindruck, alle Änderungen, die wir beim Wochenplan besprochen hatten, fehlen“**  
   Du möchtest sichergehen, dass die besprochenen Punkte umgesetzt sind.

---

## Was wir früher besprochen hatten (Wochenplan)

| Thema | Inhalt | Im Code? |
|-------|--------|----------|
| **Header** | Nur Titel „Wochenplan“, keine kleinen Buttons in den Ecken (Back/Refresh in Thumb-Zone) | ✅ Header ist nur Titel; Aktualisieren/Drucken/Teilen in #weekThumbZone |
| **Thumb-Zone** | Wichtige Aktionen unten (Aktivieren, Drucken, Teilen, Aktualisieren) | ✅ #weekThumbZone mit Buttons |
| **Bottom-Sheet „Inserat hinzufügen“** | Beim Öffnen aus Wochenplan: Top-5/Suche, ein Tap = Gericht nur zum Plan (nicht Inseratsflow) | ✅ addCookbookEntryToWeek, Sheet mit „Tap = zum Plan“ |
| **Swipe auf Karten** | Nach links = Löschen, nach rechts = Kopieren (Zieltag wählen) | ✅ attachSwipeToWeekCard, copyWeekEntryToOtherDay |
| **Aktivierung** | Großer Button „Jetzt für 4,99 € aktivieren“ in der Thumb-Zone | ✅ #weekActivateBlock, #btnWeekActivateThumb |
| **Single-Page** | Tag-Wechsel ohne Reload (nur renderWeekPlan()) | ✅ weekPlanDay = key; renderWeekPlan(); |
| **Tab leuchtet** | Beim Tap auf „Wochenplan“ soll der Wochenplan-Tab aktiv leuchten | ✅ setProviderNavActive('provider-week') |
| **Applike-Größe** | Volle Höhe, Safe-Area, fest eingebettet | ✅ Section mit flex, min-height 100vh, padding-bottom für Nav |

Die **Logik** der besprochenen Punkte ist also drin. Was fehlt oder stört, sind vor allem **Layout-Stabilität** und **optische Klarheit** (kein Verschieben, kein „Club-Kalender“, klare App-Navigation).

---

## Vermutete Ursachen für die genannten Probleme

### 1. Button verschiebt sich

- Beim Wechsel auf Wochenplan bekommt der Tab „Wochenplan“ die Klasse `.active` (font-weight: 800). Dadurch kann der Tab breiter werden und die anderen Tabs minimal verschieben.
- Zusätzlich: Beim View-Wechsel läuft die Animation `viewIn` (translateY(8px) → 0). Das kann wie ein „Springen“ wirken.

**Vorschlag:**  
- Bottom-Nav: Tabs mit fester Breite oder `flex: 1` und zentriertem Text, sodass der aktive Zustand (nur Farbe/Icon) **keine Breitenänderung** erzeugt.  
- Optional: Animation für Provider-Views abschwächen oder abschalten (z. B. nur opacity, kein translateY).

### 2. Layout „lässt sich verschieben“

- Wenn die **ganze** Seite scrollt statt nur der Bereich #weekList, wirkt es unruhig und nicht applike.
- Möglich: Section oder Body haben kein `overflow: hidden` und die Section zieht sich in die Höhe, sodass die ganze Page scrollbar ist.

**Vorschlag:**  
- Sicherstellen: Nur `#weekList` scrollt; Header und Thumb-Zone bleiben fix.  
- Section: `overflow: hidden` (oder mind. kein overflow: auto auf der Section), damit nur der mittlere Bereich scrollt.

### 3. „Unten Meine Daten“ / nicht applike

- Unten ist die **Provider-Bottom-Nav** mit dem Tab „Meins“ (Profil/Meine Daten). Das ist korrekt, wirkt aber vielleicht wie „irgendwas mit Meine Daten“ statt wie eine klare Tab-Leiste.

**Vorschlag:**  
- Nav optisch klarer als App-Tab-Bar: einheitliche Höhe, klare Trennlinie, aktiver Tab z. B. mit kleinem Indikator (Punkt/Strich) statt nur Fettdruck, damit es weniger „verschiebt“ und klarer wirkt.

### 4. „Von oben wie Club-Seite mit Kalender“

- Aktuell: nur „Wochenplan“-Titel + eine Zeile mit Tages-Pills (Heute, SO 8.2., …). Das kann wie eine neutrale Kalender-/Event-App wirken.

**Vorschlag:**  
- Leicht applike aufwerten: z. B. kurzer Untertitel („Deine Woche · Gerichte planen“) oder eine klarere visuelle Hierarchie (Titel größer/klarer, Pills als „Tag-Auswahl“ erkennbar, nicht wie ein großer Kalender).  
- Optional: Pills etwas reduzieren (z. B. weniger „Kalender“, mehr „Tagesauswahl“ durch kompaktere Pills oder eine andere Form).

---

## Konkrete Vorschläge vor dem Weitermachen

1. **Nav-Shift beheben**  
   - Bottom-Nav so bauen, dass der aktive Tab **nicht breiter** wird (z. B. alle Tabs `flex: 1`, Text zentriert, aktiver Zustand nur Farbe + ggf. kleiner Indikator).

2. **Nur eine Scroll-Zone**  
   - Prüfen: Section `#v-provider-week` hat `overflow: hidden`, nur `#weekList` hat `overflow-y: auto`.  
   - Kein Scroll auf Body/HTML, wenn die Wochenplan-View aktiv ist (z. B. `body` oder Wrapper mit `overflow: hidden` wenn Provider-View aktiv).

3. **Wochenplan-Ansicht klarer machen**  
   - Optional: Kleiner Untertitel unter „Wochenplan“ (ein Satz wie „Deine Woche planen“).  
   - Tag-Pills optisch als „Tagesauswahl“ statt als großer Kalender (z. B. kompakter, oder Label „Tag wählen“).

4. **Dokumentation anpassen**  
   - In `WOCHEPLAN_STRUKTUR_AKTUELL.md` den aktuellen Stand eintragen (Flex, Thumb-Zone, Swipe, Sheet, Tab-Aktivierung) und die offenen Punkte (Nav-Shift, Scroll, Optik) kurz notieren.

Wenn du möchtest, setze ich als Nächstes **nur** die technischen Fixes um (Nav-Shift, Scroll-Verhalten, ggf. Animation), und die rein optischen Anpassungen (Untertitel, Pills) machen wir in einem zweiten Schritt.
