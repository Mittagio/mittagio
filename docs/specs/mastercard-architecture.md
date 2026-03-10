# Mastercard-Architektur – Single Source of Truth

> Letzte Aktualisierung: 2026-03-04  
> Gilt für: `app/index.html`, `app/style.css`, `app/script.js` → `buildListingStep()`

---

## Überblick: 3-Schritt Mastercard-Flow

| Schritt | Bezeichnung | Zweck |
|---------|-------------|-------|
| **Step 1 (STEP_EDIT)** | Edit / Neu | Dateneingabe: Bild, Name, Preis, Kategorie, Allergene |
| **Step 2 (STEP_MONEY)** | Monetarisierung | Paket-Wahl: 0,00 € Inserat + 0,89 € Stripe-Fee oder 4,99 € Einmalzahlung |
| **Step 3 (STEP_LIVE)** | Bestätigung | Live-Karte, Konfetti, Teilen-Button |

---

## Schritt 1 – Edit/Neu (Design-Spec)

### Vollbild-Immersion (Layout-Regel)
- **Kein Padding oben/seitlich** um das Foto-Modul
- `margin: 0`, `border-radius: 0` an den Seiten des Bildschirms
- Das Bild „springt dich an" – volle Breite, bündig mit dem Rand

### Visuelle Reihenfolge (Top → Bottom)

1. **Hero-Foto-Modul** (Full-Width)
   - Breite: `100%`, Höhe: `190px`, `object-fit: cover`
   - Keine seitlichen Border-Radius
   - Schließen-X: oben links, schwebt auf dem Bild (`position: absolute; top: 12px; left: 12px`)
   - Klick → Kamera/Galerie öffnen

2. **Gerichtsname** (Ghost-Input)
   - `font-size: 28px`, `font-weight: 900`, `color: #0f172a`
   - Kein sichtbarer Input-Rahmen, nur `border-bottom: 1px solid #ebebeb`
   - Placeholder: „Was kochst du heute?"

3. **Preis-Badge** (rechtsbündig oder direkt darunter)
   - Gelber Button-Badge, öffnet Preis-Eingabe per Hero-Morph

4. **Kategorie-Pills** (horizontal scrollbar)
   - Fleisch, Veggie, Fisch, Vegan, Salat, Suppe
   - Aktiv: Emerald `#10b981`

5. **Allergen-Leiste** (Icons dezent)
   - Collapsible, nur bei gesetzten Allergenen sichtbar

---

## Schritt 2 – Monetarisierung

### Zero-Entry-Modell
- **Kachel A** (Standard): `0,00 €` Inserat + `0,89 €` Stripe-Fee pro Abholnummer
- **Kachel B** (Einmalig): `4,99 €` Fixpreis, kein Abo

### Umsatz-Vorschau
- Formel: `Preis × 25 Portionen`
- Anzeige: „Möglicher Umsatz: X,XX €"

---

## Footer-Gesetz (Airbnb-Regel) – gilt für ALLE Schritte

```css
/* Step 1 Footer */
#mastercard-footer-step1 {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: #ffffff;
  border-top: 1px solid #ebebeb;
  padding: 12px 16px calc(16px + env(safe-area-inset-bottom, 0));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  z-index: 1000002; /* immer über Wizard */
}
```

### Button-Paarung Step 1

| Position | Button | Klasse | Aktion |
|----------|--------|--------|--------|
| LINKS | „Im Kochbuch speichern" | `btn-secondary-text` | Speichert Gericht ins Kochbuch, schließt Wizard |
| RECHTS | „Weiter" | `btn-primary-black` | → `goToStep2()` / Step 2 |

```css
.btn-secondary-text {
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 700;
  color: #222222;
  text-decoration: underline;
  cursor: pointer;
  padding: 12px 0;
  min-height: 48px;
}

.btn-primary-black {
  background: #222222 !important;
  color: #ffffff !important;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 800;
  min-height: 48px;
  padding: 0 24px;
  cursor: pointer;
  flex: 1;
}
```

---

## Navigation – Hardware-Zurück (popstate)

```javascript
// Bei Öffnen: history.pushState
history.pushState({ view: 'inserat-card', wizard: true }, '', location.pathname);

// popstate-Handler (bereits in script.js ~L5748):
// Step 2 → zurück zu Step 1
// Step 1 → Wizard schließen (closeMastercardWithAnim)
```

---

## Cleanup-Regeln

- **Verboten in Step 1:** Jede Erwähnung von `4,99 €`, `Monetarisierung`, `Abholnummer-Upsell`
- Step 1 = reine Dateneingabe, kein kommerzieller Druck
- Alle Legacy-IDs (`#v-step-1` bis `#v-step-3`) sind entfernt

---

## Referenz im Code

- `app/script.js` → `buildListingStep()` (~L17146)
- `app/style.css` → `.inserat-card-sheet`, `#mastercard-footer-step1`, `.btn-primary-black`
- CSS-Scope: `body.wizard-inserat-open #wizard` (immer scopen!)
