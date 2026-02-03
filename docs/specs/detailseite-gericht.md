# Ansichtskarte: Detailseite Gericht (Finale Struktur)

**Stand:** 27.01.2026  
**Design:** Schiefertafel-Optik (Ausnahme: Nur die Detailseite behält Schiefertafel; Rest der App Polaroid.)  
**Ziel:** Funktional präziser und kompakter. Bild tritt zurück, prozessuale Infos (Säulen) und Erreichbarkeit dominieren.

---

## 1. Visuelle Sektion (Kompakt)

- **Foto:** Deutlich kleiner (Thumbnail-Charakter), **in das Schiefer-Element eingebettet**.
- **Favorit:** Rotes Herz (mit Besteck-Icon 🍴) **oben rechts am Bildrand**.
- **Preis:** Dezentes Preis-Badge **direkt am Bild**.

---

## 2. Informations-Sektion

- **Titel:** Gerichtsname **groß/fett**.
- **Die 3 Säulen (Cursor-Regel):** Feste horizontale Badges – **Reihenfolge fest:**
  1. **Vor Ort** 🍴  
  2. **Mehrweg** 🔄  
  3. **Abholnummer** 🧾  
- **Essenszeit:** Klare Anzeige der Verfügbarkeit (z. B. *12:00 – 14:00 Uhr*).
- **Teilen:** Dezentes Share-Icon (neben Essenszeit oder Titel), Gericht an Kollegen senden.

---

## 3. Logistik & Distanz

- **Anbieter:** Name und Adresse.
- **Entfernungs-Check (Doppelte Anzeige):**
  - 🚶 **Zu Fuß:** Entfernung in Metern + Minuten.
  - 🚗 **Mit dem Auto:** Entfernung in Kilometern + Minuten.
- **Hinweis:** Das bisherige Navi-Icon rechts **entfällt**.

---

## 4. Interaktion & Allergene

- **Allergene:** Klickbarer Textlink **„Allergene anzeigen“** (mit Info-Icon ⓘ).  
  - Bei Klick: **Allergene-Overlay** mit Titel, Disclaimer und standardisierter Übersetzungs-Liste.  
  - Definition, Kürzel (A–R) und rechtlicher Hinweis: siehe **`ALLERGENE_OVERLAY_SPEC.md`**.
- **CTA-Button:** Markant am unteren Rand: **„In die Mittagsbox legen“**.  
  - Löst den besprochenen Übergang (Animation) in die Mittagsbox aus.
- **Hinweistext (unten):** Dynamisch, z. B.  
  - *„Dieser Anbieter nimmt nicht an der Abholnummer teil.“*  
  - *„Aktuell nicht bestellbar.“*

---

## 5. Cursor-Anpassung

- Diese Struktur ist als **feste Regel für die Detailansicht** hinterlegt.
- **Bild** rückt in den Hintergrund; **Säulen** und **Erreichbarkeit (Fuß/Auto)** dominieren.

---

## 6. Referenzen

- **UI-Framework:** `MITTAGIO_UI_FRAMEWORK.md`  
- **3-Säulen-Regel / Wording:** `.cursorrules` → Swipe-Modus & 3-Säulen-System  
- **Allergene-Overlay (Kürzel, Disclaimer):** `ALLERGENE_OVERLAY_SPEC.md`  
- **Implementierung:** `app/index.html` → Offer-Sheet (`#sheet`), `openOffer`, Allergene-Overlay usw.
