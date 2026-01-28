# 🛑 MITTAGIO UI-Framework (STOP & RESET)

**Stand:** 27.01.2026  
**Grundregel:** Verwirf Schiefertafel/dunkle Designs – exakt **Polaroid auf hellem Grund** (haptisch, hell, warm).  
**Ausnahme:** Die **Detailseite Gericht** (Offer-Sheet) behält **Schiefertafel-Optik** und folgt der festen Struktur in `DETAILSEITE_GERICHT_SPEC.md`.

---

## 1. Die „Küchentisch“-Umgebung

### Hintergrund
- **Hell, warmer Holz-Look** (gebleichte Eiche).
- CSS-Variable: `--bg-polaroid` (z. B. `#E8E0D6`). Für alle Kundenseiten verwenden.

### Header (Sticky)
- **Zentriert:** MITTAGIO-Logo.
- **Links:** [Nadel] Standort (z. B. „Jena“) – klickbar.
- **Rechts:** [Lupe] Suche.
- **Beim Scrollen:** `backdrop-filter: blur(10px)` (evtl. `saturate(160%) blur(8px)`).

### Navigation
- Sticky-Header wie oben. Kein dunkler Schiefertafel-Look.

### Filter-Schilder
- **Abgerundete Chips** („Fleisch“, „Salat“, „Vegetarisch“, „Vegan“ usw.).
- Optik: **Physische Plättchen**, die über dem Tisch schweben – dezent Schatten, nicht flach.

---

## 2. Die Restaurant Card (Polaroid-Komponente)

### Rahmen
- **Weißes Quadrat** mit **breitem unteren Rand** (klassische Polaroid-Haptik).
- Keine dunklen Panels, keine Schiefertafel-Optik.

### Bild-Overlay
- **Oben rechts:** Herz-Icon (Favorit). Bei Klick: Animation + Transfer in Favoriten-Tab.
- **Unten rechts:** Runder, **grüner Preis-Sticker** (z. B. „6,50 €“).  
  - Farbe: `--sticker-green` (z. B. `#27AE60`).

### Beschriftung (weißer Rand unter dem Bild)
- **Gerichtname:** Linksbündig, **Marker-Schrift** (z. B. `Permanent Marker`).  
  - CSS: `font-family: 'Permanent Marker', 'Kalam', cursive;`
- **Restaurant-Name:** Kleiner darunter (z. B. „Pizzeria Bella Vista“).
- **Teilen-Icon:** Dezent rechts auf dem weißen Rand.

---

## 3. Die Drei-Säulen-Regel (Feste Badge-Slots)

Unter dem Polaroid-Rahmen liegen **drei feste Kacheln**. Diese **rücken niemals nach**.

### Swipe-Modus: Nur Symbole, kein Text
In der **Swipe-Karten-Fußzeile** ausschließlich diese drei Symbole **ohne begleitenden Text**:

| Slot | Symbol | Bedeutung |
|------|--------|-----------|
| 1 | 🍴 | Vor Ort (Essen vor Ort möglich) |
| 2 | 🧾 | Abholnummer (wird bei Auswahl generiert) |
| 3 | 🔄 | Mehrweg (Nachhaltiges Pfandsystem) |

### Logik
- Wenn ein Feature **nicht existiert**: Slot bleibt eine **leere, dezente Platzhalter-Box** (kein Wegrücken, kein Umordnen).
- **Liste/Detail:** weiterhin optional Icon + Text (z. B. „Abholnummer“, „Vor Ort“, „Mehrweg“) erlaubt.

---

## 4. Wording & Compliance

### ❌ Verboten
- „Ticket“
- „Abholcode“
- „Express-Abholung“
- (Weitere siehe `CURSOR_UI_TEXTE.md`.)

### ✅ Pflicht
- Ausschließlich **Abholnummer** (nicht Abholcode, nicht Ticket).

---

## 5. Farbcodes (Hex)

| Token            | Hex      | Verwendung                    |
|------------------|----------|-------------------------------|
| `--brand`        | `#FFD700`| Mittagio-Gelb (Primär, CTAs)  |
| `--sticker-green`| `#27AE60`| Grüner Preis-Sticker, Mehrweg |
| `--bg-polaroid`  | `#E8E0D6`| Hintergrund (gebleichte Eiche)|

*Falls du exakte Werte aus dem Wunsch-Bild hast, hier ergänzen.*

---

## 6. Swipe-Modus: Button-Leiste & Stil

- **Karten:** Polaroid, **reinweiß**. Keine Schiefertafel.
- **Drei zentrale Aktions-Buttons** am unteren Rand:
  - **Links (Rot):** ❌ Keine Lust
  - **Mitte (Grau/Blau):** 🔄 Nächstes Gericht
  - **Rechts (Grün):** ❤️🍴 Will ich / Favorit

---

## 7. System-Beschränkungen

- **Nur eine aktive Sitzung** pro Nutzer.
- „Vor-Ort-Logik“ **nicht** in Nutzerkommunikation verwenden.

## 8. Dateien & Referenzen

- **UI-Texte:** `CURSOR_UI_TEXTE.md`
- **Cursor-Regeln:** `.cursorrules`
- **Detailseite Gericht (Schiefertafel):** `DETAILSEITE_GERICHT_SPEC.md`
- **Implementierung:** `app/index.html` (SPA).

---

**Bei Abweichungen:** Zuerst dieses Framework prüfen, dann anpassen.
