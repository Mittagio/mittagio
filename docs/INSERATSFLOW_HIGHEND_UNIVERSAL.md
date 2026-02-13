# Inseratsflow – High-End Universal-Flow (Blaupause)

**Stand:** Februar 2026 · Verbindliche Design- und Logik-Vorgabe für den Inseratsflow.

---

## 1. Visuelles Fundament (Glassmorphism & Style)

- **Design:** Schwebendes Haupt-Panel mit starkem Weichzeichner (`backdrop-blur`), weiße ~70 % Overlays, feine Lichtkanten.
- **Atmosphäre:** Gastronomie-Hintergrund bleibt als unscharfe Farbwelt sichtbar.
- **Akzente:** Emerald-Grün (#10b981) für aktive Zustände, **Gelb (#FACC15)** für den Haupt-Aktions-Button („Jetzt für 4,99 € inserieren“).
- **Terminologie:** Nur **Abholnummer** – Verbot von „Ticket“ oder „Code“.

---

## 2. Universelle Eingabemaske („Salatsoße“)

In allen Modi (Inserat, Kochbuch, Wochenplan) **dieselbe** Maske:

1. **Gerichtsname:** Input mit intelligenter Autovervollständigung.
2. **Kategorie-Pills:** Große Kacheln (Mit Fleisch, Vegetarisch, Vegan, Salat), horizontal scrollbar; Vorwahl durch Autocomplete.
3. **Beschreibung:** Optional, dezent (z. B. „frisch aus dem Garten“).
4. **Preis:** Maximale Präsenz, `inputmode="decimal"`.
5. **Allergene (collapsible):** Ausgeklappt = gläserne Pills; eingeklappt = kompakte Zeile („Allergene: A, G“).
6. **Foto-Modul:** Eine große Kachel (Kamera | Galerie). Nach Upload: Auto-Filter (Gastro: Wärme/Kontrast) + optional Zuschneiden.
7. **Smart-Icons (4 Säulen):** Große Kacheln für 🕒 (Zeit), 🍴 (Vor Ort), 🔄 (Mehrweg), 🧾 (Abholnummer).

---

## 3. App-like Interaktion (Liquid Flow)

- **Auto-Advance:** Nach Eingabe (z. B. Gericht-Wahl) sanft zum nächsten Feld scrollen.
- **Tastatur:** Nach Autocomplete-Wahl, Kategorie-Klick oder Preis-Enter schließen (`blur`).
- **Haptik:** Kurze Vibration bei Auswahl, Fokus-Wechsel, Abschluss (`navigator.vibrate` / `haptic()`).

---

## 4. Pricing-Weiche (Monetarisierung)

**Modus „Jetzt Inserieren“ (Dashboard):** Zwei Optionen am unteren Ende:

- **Option A (Gelber Button):** „Jetzt für 4,99 € einmalig inserieren“ → führt zum Abholnummer-Upsell-Schritt, dann Publish.
- **Option B (Grüner Rahmen/Glas):** „Jetzt für 0,00 € inserieren mit Abholnummer (0,89 € pro Vorgang)“ → Abholnummer technisch gesetzt, direkt Publish-Modal.

**Modi „Wochenplan“ / „Kochbuch“:** Keine Weiche, nur **Emerald-grüner „Speichern“-Button** (+ optional „Stattdessen jetzt für 4,99 € inserieren“).

---

## 5. Technik (Cursor/Code)

- **Eine** universelle Maske (Step 0), Layout bei Modus-Wechsel stabil.
- **Fokus-Leitung:** Auto-Scroll zum nächsten aktiven Element.
- **Allergene:** Sektion collapsible; eingeklappt nur eine Zeile.
- **Foto:** Nach Upload Auto-Filter (z. B. `applyAppetizerFilter`).
- **Option B:** Bei Wahl 0,00 € mit Abholnummer: `hasPickupCode = true`, `inseratFeeWaived = true` / `pricingOption = 'abholnummer'`, dann Publish-Modal.

---

*Umsetzung: `buildListingStep()` Step 0 = „Salatsoße“ mit Weiche; Daten in `previewOfferFromWizard()` inkl. `description`.*
