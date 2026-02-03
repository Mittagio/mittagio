# Master-Prompt: Inseratsflow (Single Source of Truth)

**Rolle:** Fullstack UI/UX Developer & Architect.  
**Projekt:** Gastro-App mit 5-Stufen-Inseratsflow und Wochenplaner.  
**Design:** Clean, modern, Emerald-Grün (#10B981). Keine Schiefertafeln.

---

## STRIKTE TERMINOLOGIE-REGEL

Ersetze in **allen Dateien, UI-Texten und Kommentaren** die Begriffe **"Ticket"** oder **"Abholcode"** durch **Abholnummer**. Dies gilt ausnahmslos.

---

## MODULE & FLOW (5 Stufen)

### Screen 1 (Basis)
- Name (mit Autocomplete)
- 3-Slot-Bild: Kamera / Galerie / KI
- Standardzeit 11:30–14:00 mit großen +/- Tasten
- Preis-Input

### Screen 2 (Service & Extras)
- Toggles: **Vor Ort (🍴)** und **Mehrweg (🔄)**
- Frage: „Allergene angeben?“ (Pills nur bei Ja)
- Extra-Pills (Beilagensalat, Sauce, Brot, Ketchup, Mayo) mit **sofortigem Preis-Overlay** bei Auswahl

### Screen 3 (Vorschau – Erfolgsmoment)
- Zeige die **Discovery-Card** (Kundenansicht)
- Icons **🍴, 🔄, 🧾** MÜSSEN **direkt unter dem Bild** gruppiert sein
- Sanfte Übergänge (z. B. Framer-Motion) für den Erfolgsmoment

### Screen 4 (Aktion)
- 3 Kacheln:
  - **„Jetzt Inserieren (4,99 €)“**
  - **„Ins Kochbuch speichern“**
  - **„Im Wochenkalender planen“** (Wochentage Mo–So)

### Screen 5 (Abholnummer-Upsell)
- Erst nach Klick auf „Inserieren“
- Emotionales Foto (Handy mit Abholnummer an der Theke)
- Vorteile: Stressfrei, Speed, Ordnung
- Option: **„Abholnummer für 0,89 € hinzufügen“** oder **„Ohne fortfahren“**

---

## DATEN-LOGIK

- **listings**, **cookbook**, **calendar** – Schema wie JSON-Vorgabe
- **Earnings live:** (Basis + Extras) − 4,99 − (optional 0,89)
- **Dashboard-Widget „Wochenplaner“:** Status-Dots (Grün = Live, Blau = Geplant, Grau = Leer)

---

## USABILITY

- Alle Interaktionsflächen **„fettfinger-sicher“** (min. 44×44 px)
- Buttons und Kacheln entsprechend groß

---

*Stand: Master-Prompt verbindlich. Alle Änderungen am Inseratsflow an diesem Dokument ausrichten.*
