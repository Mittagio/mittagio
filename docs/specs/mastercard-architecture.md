# Mastercard-Architektur – Single Source of Truth

> Letzte Aktualisierung: 2026-03-10 (S25 Premium Scroll-Flow & Global Cleanup)  
> Gilt für: `app/style.css`, `app/script.js` → `buildListingStep()`

---

## Überblick: 2-Schritt Flow (Step 2 entfernt)

| Schritt | Bezeichnung | Zweck |
|---------|-------------|-------|
| **Step 1 (STEP_EDIT)** | S25 Cockpit | Dateneingabe: Bild, Name, Preis, Service-Grid, Allergene |
| ~~Step 2 (STEP_MONEY)~~ | ~~Monetarisierung~~ | ~~Entfernt – immer kostenlos mit Abholnummer~~ |
| **Step 3 (STEP_LIVE)** | Bestätigung | Live-Karte, Konfetti, Teilen-Button |

**Pricing:** Immer `pricingChoice = 'pro'` (0,89 € / Abholnummer). `btnWeiter` publiziert direkt.

---

## Schritt 1 – S25 Cockpit (35/45/20 Layout)

### Layout-Regel (100dvh, Flexbox)
- Container `.inserat-cockpit`: `height: 100dvh; display: flex; flex-direction: column; overflow: hidden`
- **35dvh**: Foto-Zone (`.inserat-cockpit-photo`)
- **45dvh**: Body-Zone (`.inserat-cockpit-body`, `overflow-y: auto`)
- **~20dvh**: Footer (fixiert, `position: fixed; bottom: 0`)

### Visuelle Reihenfolge (Top → Bottom)

1. **Hero-Foto-Modul** (35dvh, Edge-to-Edge)
   - Keine seitlichen Border-Radius, `object-fit: cover`
   - Schließen-X: oben links

2. **Gerichtsname** (Ghost-Input, zentriert)
   - `font-size: 28px`, `font-weight: 900`, `color: #0f172a`
   - Placeholder: „Was bietest du heute an?"

3. **Beschreibung** (optional, zentriert)

4. **Service-Grid** – 5 quadratische Kacheln (Airbnb-Highlight: 2px `#000` bei active)

   | Kachel | Emoji | Typ | Verhalten |
   |--------|-------|-----|-----------|
   | Vor Ort | 🍴 | `vor-ort` | Toggle |
   | Mehrweg | 🔄 | `mehrweg` | Toggle + Rebowl-Zeile |
   | Abholnummer | 🎫1️⃣ | `abholnummer` | Toggle |
   | Allergene | 🌿 | `allergene` | Öffnet Sub-Menu-Drawer |
   | Extras | ➕ | `extras` | Öffnet Quick-Adjust |

5. **Kategorie-Pills** (Fleisch / Veggie / Vegan, flache Zeile)

6. **Preis-Feld** (`font-size: 32px`, zentriert, `border-bottom`)

---

## 4. Allergen-Grid (Icon-Sprache)

Im Sub-Menu-Drawer (`.sub-menu-allergen-grid`) werden folgende Emojis als Kacheln angezeigt.
Jede Kachel ist quadratisch und folgt dem Airbnb-Highlight-Prinzip (2px schwarzer Rand bei Auswahl).

| Emoji | Allergen | Kürzel |
|-------|----------|--------|
| 🌾 | Gluten | A |
| 🥛 | Laktose | G |
| 🥚 | Ei | C |
| 🥜 | Erdnuss | E |
| 🐟 | Fisch | D |
| 🍤 | Krebstiere | B |
| 🫘 | Soja | F |
| 🌰 | Schalenfrüchte | H |
| 🥗 | Sellerie | I |
| 🌭 | Senf | J |
| 🥯 | Sesam | K |
| 🍷 | Sulfite | L |

### Drawer-Verhalten
- **Öffnen:** `cubic-bezier(0.2, 0.8, 0.2, 1)`, 0.4s, Slide-Up von unten
- **Footer:** bleibt fixiert (z-index: 1000100), Drawer darunter (z-index: 999990)
- **Schließen:** „Fertig"-Button oder Backdrop-Tap
- **Cleanup:** `closeWizard()` entfernt Drawer aus `document.body`

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

## Floating Category Badges (S25 Hero-Foto)

Im Foto-Modul (35dvh) erscheinen drei Glassmorphism-Badges am unteren linken Rand:

| Badge | Typ | Klasse bei Auswahl |
|-------|-----|--------------------|
| 🥩 Fleisch | `Fleisch` | `.badge.active` |
| 🥦 Veggie | `Veggie` | `.badge.active` |
| 🌿 Vegan | `Vegan` | `.badge.active` |

- **Klassen:** `.floating-badges` (Container), `.badge` (Button), `.badge.active` (schwarz)
- **Style:** `background: rgba(255,255,255,0.9)`, `backdrop-filter: blur(4px)`, `border-radius: 20px`
- **Logik:** Klick → `w.data.category` setzen + Kategorie-Pills unten synchronisieren
- **Global:** `window.toggleCategoryBadge(type)` – synchronisiert Badges und Pills

## Info-Section (Service-Grid Wrapper)

Das Service-Grid (5 Kacheln) ist in `.info-section` eingebettet:

```html
<div class="info-section">
  <p class="section-label">Was bietest du heute an?</p>
  <div class="inserat-service-grid service-grid"><!-- 5 Kacheln --></div>
</div>
```

- **`.info-section`:** `background: #f9f9f9`, `border-radius: 24px`, `margin: 12px 16px`
- **`.section-label`:** `font-size: 11px`, `font-weight: 800`, `color: #717171`, uppercase

## Cleanup-Regeln

- **Verboten in Step 1:** Jede Erwähnung von `4,99 €`, `Monetarisierung`, `Abholnummer-Upsell`
- Step 1 = reine Dateneingabe, kein kommerzieller Druck
- Alle Legacy-IDs (`#v-step-1`, `#v-step-2-monetize`, `#v-step-3-success`) sind aus `index.html` entfernt
- Legacy-Funktionen (`goToStep2` alt, `bridgeToPremiumMonetization`, `confirmFinalListing`) sind auf Stubs reduziert

---

## Referenz im Code

- `app/script.js` → `buildListingStep()` (~L17146)
- `app/style.css` → `.inserat-card-sheet`, `#mastercard-footer-step1`, `.btn-primary-black`
- CSS-Scope: `body.wizard-inserat-open #wizard` (immer scopen!)

---

## Foto-Workflow (eBay-Style, S25)

- **Kein Auto-Start Kamera:** Beim Öffnen der Mastercard wird die Kamera nicht automatisch gestartet.
- **Native Trigger:** Bildwahl nur über Klick auf Platzhalter/Bild oder `🔄 Ersetzen` (Hidden File Input mit `accept="image/*"` und `capture="environment"`).
- **Overlay:** `#photo-edit-overlay` ist schwarzes Vollbild mit eigenem `✓ Fertig` oben rechts.
- **Actions unten:** `🔄 Ersetzen`, `✂️ Zuschneiden`, `🗑️ Löschen` (mit Sicherheitsdialog „Foto löschen?“).
- **Touch-Drag Crop:** Im Zuschneiden-Modus wird das Bild auf `scale(1.1)` gesetzt; vertikales Verschieben per Touch-Drag schreibt `object-position` (0% bis 100%, Clamp aktiv).
- **Sync:** Bei `✓ Fertig` wird der finale `object-position` Wert auf das Hauptbild im Wizard übertragen und gespeichert.
- **Header-X Verhalten:** Das graue X im weißen Header schließt die Mastercard (nicht das schwarze Foto-Overlay).

---

## Smart Context Routing (S25)

- EntryPoints werden im Wizard normalisiert: `cookbook`, `weeklyPlan`, `activeOffers`, `newListing`.
- Unbekannte/kaputte EntryPoints fallen defensiv auf `activeOffers` (sicherer UI-Fallback, kein White-Screen).
- `Speichern` nutzt den zentralen Save-Path + Routing nach EntryPoint:
  - `cookbook` -> zurück ins Kochbuch
  - `weeklyPlan` -> zurück in den Wochenplan
  - `activeOffers` -> zurück zu Aktive Angebote / Anbieter-Home
  - `newListing` -> Standard: ins Kochbuch
- Exit erfolgt zentral über `closeMastercard()` (kein White-Screen, Body wieder scrollbar).
- `Weiter` wechselt in **Step 2 (Monetarisierung)** statt Direkt-Publish.
- Header-Titel wird pro Schritt synchronisiert:
  - Step 1: `Dein Gericht`
  - Step 2: `Verkaufseinstellungen`

## Step 2 Redesign (Clean UI)

- Foto bleibt in Step 2 Edge-to-Edge oben mit identischem Ausschnitt (`object-position`) wie in Step 1.
- Keine manuellen Zurück-Links im Content oder Footer; Navigation über System-Back und Header-X.
- Kompakte Abholnummer-Sektion als weiße Box mit Toggle und Label `0,89 € pro Vorgang`.
- Verdienst-Vorschau sitzt direkt oberhalb des Step-2-Insertions-Buttons.
- Primär-CTA im Footer: `Jetzt für 4,99 € inserieren` (schwarz, 8px Radius, Safe-Area-fest).
- Footer-Stabilität Step 1/2: Footer ist auf mobilen Geräten immer `fixed` mit `padding-bottom: env(safe-area-inset-bottom, 20px)` und zusätzlicher Scroll-Reserve im Content.
