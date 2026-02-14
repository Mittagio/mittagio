# High-End Universal-Flow – Spezifikation (verbindlich)

**Stand:** Februar 2026  
**Quelle:** Architektur- und Design-Vorgaben für die universelle Eingabemaske („Salatsoße“) in allen Modi.  
**Verwendung:** Master-Vorgabe für Inserat, Kochbuch und Wochenplan. Cursor/Implementierung orientiert sich an diesem Dokument.

---

## 1. Visuelles Fundament (Glassmorphism & Style)

| Element | Vorgabe |
|--------|--------|
| **Haupt-Panel** | Schwebend, extremer Weichzeichner: `backdrop-blur-2xl` (bzw. starkes `backdrop-filter: blur(24px)`), weiße ~70 % Overlays, feine Lichtkanten. |
| **Atmosphäre** | Gastronomie-Hintergrund bleibt als unscharfe Farbwelt sichtbar (nicht überdecken). |
| **Aktive Zustände** | Emerald-Grün `#10b981`. |
| **Haupt-Aktions-Button (CTA)** | Gelb `#FACC15`. |
| **Terminologie** | Absolutes Verbot von „Ticket“ oder „Code“. Es heißt ausschließlich **Abholnummer**. |

---

## 2. Universelle Eingabemaske („Salatsoße“)

Der Aufbau ist in jedem Modus (**Inserat**, **Kochbuch**, **Wochenplan**) exakt gleich. Eine gemeinsame logische „Master-Maske“ mit einheitlicher Reihenfolge und Optik.

### 2.1 Reihenfolge der Felder

1. **Gerichtsname**  
   - Input mit intelligenter Autovervollständigung (wie bestehend, ggf. erweitert).

2. **Kategorie-Pills (neu)**  
   - Große Kacheln: **Fleisch**, **Vegetarisch**, **Vegan**, **Salat**.  
   - Direkt unter dem Namen, horizontal scrollbar.  
   - Automatisierte Vorwahl durch das Autocomplete (wenn Gericht gewählt wird).

3. **Beschreibung**  
   - Dezent darunter, optional für Details (z. B. „frisch aus dem Garten“).

4. **Preis**  
   - Maximale Präsenz.  
   - Öffnet zwingend die Zahlentastatur: `inputmode="decimal"` (ggf. `type="number"` oder `inputmode="numeric"`).

5. **Allergene (Collapsible)**  
   - Öffnen sich als **gläserne Pills** darunter.  
   - Sobald erledigt oder Fokus-Wechsel: klappen sie sanft zu einer **kompakten Zeile** zusammen (z. B. „Allergene: A, G“).  
   - Sektion nimmt nur bei Bedarf Platz ein, danach kollabiert.

6. **Foto-Modul**  
   - Eine große Kachel für **Kamera** / **Galerie**.  
   - Nach Upload:  
     - Automatischer **Gastro-Filter** (Wärme/Kontrast) – z. B. CSS: `filter: brightness(…) contrast(…) saturation(…)`.  
     - Reine **Zuschneide-Funktion (Crop)**.

7. **Smart-Icons (4 Säulen)**  
   - Große Kacheln für:  
     - 🕒 **Zeit**  
     - 🍴 **Vor Ort**  
     - 🔄 **Mehrweg**  
     - 🧾 **Abholnummer**

---

## 3. App-like Interaktions-Logik (Liquid Flow)

| Verhalten | Umsetzung |
|-----------|-----------|
| **Auto-Advance** | Die App führt den Nutzer: Sobald eine Eingabe fertig ist (z. B. Gericht gewählt), scrollt der Screen **automatisch sanft** zum nächsten Feld. |
| **Keyboard-Management** | Tastatur schließt sich automatisch (`blur()` / `document.activeElement.blur()` bzw. bei PWA `navigator.keyboard?.hide()`), sobald: Autocomplete-Vorschlag gewählt, Kategorie geklickt, oder Preis mit „Enter“ bestätigt. |
| **Animations-Sequenz** | Wenn die Tastatur schließt, rücken die unteren Elemente (Foto, Buttons) **weich nach oben** (z. B. CSS-Transitions oder Spring-Animationen). |
| **Haptik** | Jede Auswahl, jeder Fokus-Wechsel und jeder Abschluss triggert eine kurze Vibration: `navigator.vibrate(10)` (oder vergleichbar). |

---

## 4. Pricing-Weiche (Monetarisierung)

Nur im Modus **„Jetzt Inserieren“** (direkter Inserats-Flow) erscheinen am unteren Ende **zwei klare Optionen**:

| Option | Darstellung | Text / Logik |
|--------|-------------|--------------|
| **A** | Gelber Button (Haupt-CTA) | „Jetzt für 4,99 € einmalig inserieren“. |
| **B** | Grüner Rahmen / Glas (sekundär) | „Jetzt für 0,00 € inserieren mit Abholnummer (0,89 € pro Vorgang)“. |

- In den Modi **Wochenplan** oder **Kochbuch** wird diese Weiche **nicht** angezeigt.  
- Stattdessen: ein einfacher **Emerald-grüner „Speichern“-Button**.

---

## 5. Technische Master-Anweisungen (für Cursor/Implementierung)

| Anforderung | Umsetzung |
|-------------|-----------|
| **Einheitliche Maske** | Eine wiederverwendbare „InseratMaster“-Logik/Struktur (in Mittagio: gleicher HTML-Aufbau + gleiche JS-Funktionen für Quick-Post, Kochbuch, Wochenplan). |
| **Transitions** | Layout der Maske darf bei Modus-Wechseln **nicht springen**. Framer-Motion ist im aktuellen Stack nicht vorhanden → **CSS-Transitions** bzw. weiche `scrollIntoView({ behavior: 'smooth' })` nutzen. |
| **Fokus-Leitung** | **Auto-Scroll** zum jeweils nächsten aktiven Element nach Abschluss eines Schritts (Gericht, Kategorie, Preis, …). |
| **Allergene** | Sektion so bauen, dass sie **nur bei Bedarf Platz einnimmt** und danach **kollabiert** (z. B. „Allergene: A, G“ in einer Zeile). |
| **Foto** | Nach Upload: **Auto-Filter** (CSS: `filter: brightness(…) contrast(…) saturation(…)`) für „Gastro-Look“; plus **reine Zuschneide-Funktion (Crop)**. |
| **Abholnummer bei 0,00 €** | Bei Wahl der **Option B** (0,00 € mit Abholnummer) die **Abholnummer-Logik** technisch im Hintergrund verknüpfen (Flag/Settings, damit 0,89 € pro Vorgang korrekt abgerechnet wird). |

---

## 6. Abgrenzung zu bestehenden Docs

- Inseratsflow: Siehe `.cursor/rules/inseratsflow-ist-high-end-universal.mdc` (einzig verbindliche Quelle). Fixkosten 4,99 €, Verdienst-Vorschau.  
- **Dieses Dokument**: Definiert die **einheitliche Eingabemaske**, das **Visuelle (Glassmorphism)**, die **Interaktion (Liquid Flow)** und die **Pricing-Weiche** als verbindliche Erweiterung/Präzisierung.

---

*Stand: Februar 2026. Änderungen nur in Absprache.*
