# Inseratsflow S25 – Finales Konzept abgeglichen

Kurzüberblick: Wo welcher Konzeptpunkt in der App umgesetzt ist (nur `app/index.html`).

---

## 1. Visueller Anker (Header & Foto)

| Konzept | Umsetzung |
|--------|------------|
| **Universal-X** – Frosted-Glass-Schließen-Button oben rechts auf dem Foto, einziger Ausstieg, haptisch | `.close-wizard-x` (CSS: backdrop-filter, position absolute top/right), `closeWizard()` + `haptic(10)` |
| **Smart-Photo** – Bei Gerichtsname oder Kategorie 3 Standard-Vorschläge im Header | `listingImageMap`, `getListingSuggestionUrls()`, `listingSuggestionsVisible()`, 3× `photo-suggestion`, Debounce 300 ms |

---

## 2. Pure Power-Bar (Symmetrie)

| Konzept | Umsetzung |
|--------|------------|
| **Icon-Only** – Fünf Icons [🍴][🔄][🕒][🌾][➕] ohne erklärende Texte | Power-Bar: nur Emoji in `status-pill` / `func-icon-btn`, `aria-label`/`title` für Accessibility |
| **Emerald Glow** – Aktive Icons weiß auf Grün, weicher Schatten | `.status-pill.active`, `.func-icon-btn.active` (#10b981), Active-Logik: Wert hinterlegt (Zeit/Allergene/Extras) |
| **Info-Legende (ⓘ)** – Ganz rechts, kurze Legende zu den Symbolen | `power-bar-legend-trigger` ⓘ, `power-bar-legend` Popup: „🍴 Vor Ort · 🔄 Mehrweg · 🕒 Zeit · 🌾 Allergene · ➕ Extras“ |

---

## 3. Fintech-Preisdesign

| Konzept | Umsetzung |
|--------|------------|
| **Rahmenlose Eingabe** – Große, fette Zahlen, kein Kasten | `inserat-price-fintech`: `background: transparent`, nur `border-bottom`, `font-size: 2.25rem`, `font-weight: 900` |
| **Pulsierende Emerald-Unterlinie** beim Fokus | `input.inserat-price-fintech:focus`: `border-bottom-color: #10b981`, `animation: magnet-pulse` |

---

## 4. Decision-Zone (Unten)

| Konzept | Umsetzung |
|--------|------------|
| **Umsatzprognose** – Preis × 30 über den Buttons | `inserat-prognose-wrap`, `#calc-val`, Text „Umsatzprognose (bei angenommen 30 Portionen): … €“ |
| **Fairness-Check (ⓘ)** – Gebühren-Overlay | `openPricingFairnessOverlay()` bei Klick auf ⓘ neben Prognose. Inhalt: **Risikofrei:** 0,89 € pro Abholnummer, Transaktionsgebühren von uns, Gäste vor Ort kostenlos (0,00 €). **Einmalig:** 4,99 € Fixpreis, 0 % Provision, 100 % Umsatz. |

---

## Buttons (bereinigt)

- Emerald: nur „Risikofrei inserieren“
- Gelb Outline: nur „Einmaliges Inserat“

---

*Stand: Abgleich mit finalem S25-Konzept (Geschwindigkeit, Vertrauen, natives Gefühl).*
