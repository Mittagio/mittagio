# Inseratsflow Master-Prompt v2.0 (verbindlich)

**Rolle:** Expert UI/UX Developer. **Projekt:** 5-Stufen-High-Conversion-Inseratsflow für Gastronomen. **Design:** Clean, modern, Emerald-Grün (#10b981). Keine Schiefertafeln.

---

## STRIKTE REGEL

Verwende im gesamten Code, in der UI und in allen Texten **ausschließlich den Begriff Abholnummer**. Die Wörter **„Ticket“** oder **„Abholcode“** sind **strengstens untersagt** und müssen überall ersetzt werden.

---

## FLOW-STRUKTUR (5 Stufen)

### 1. BASIS
- Name (Autocomplete)
- 3-Slot-Bild: Kamera | Galerie | KI
- Standard-Zeit 11:30–14:00, große +/- Tasten
- Preis-Input

### 2. SERVICE & EXTRAS
- Toggles: **Vor Ort (🍴)** und **Mehrweg (🔄)**
- Frage: „Allergene angeben?“ (Pills nur bei Ja)
- Extra-Pills (Beilagensalat, Sauce, Brot, Ketchup, Mayo) mit **sofortigem Preis-Overlay** bei Auswahl

### 3. VORSCHAU (Erfolgsmoment)
- Zeige die **Discovery-Card** (Kundenansicht)
- Die Icons **🍴, 🔄, 🧾** MÜSSEN **direkt unter dem Bild** gruppiert sein

### 4. PLANUNG
- 3 Kacheln:
  - **„Jetzt Inserieren (4,99 €)“**
  - **„Ins Kochbuch speichern“**
  - **„Im Wochenkalender planen“** (Wochentage Mo–So)

### 5. ABHOLNUMMER-UPSELL
- Erst **nach** Klick auf „Inserieren“
- Emotionales Foto (Handy mit Abholnummer an der Theke)
- Vorteile: Stressfrei, Speed, Ordnung
- Option: **„Abholnummer für 0,89 € hinzufügen“** oder **„Ohne fortfahren“**

---

## TECHNIK

- **Usability:** Alle Interaktionsflächen „fettfinger-sicher“ (min. 44px)
- **Earnings:** Live-Vorschau in Emerald-Grün: `(Preis + Extras) − 4,99 − (optional 0,89)`
- **Dashboard:** Widget für den Wochenplaner (Status: Live / Geplant / Leer)

---

*Stand: Master v2.0 verbindlich. Änderungen nur in Absprache.*
