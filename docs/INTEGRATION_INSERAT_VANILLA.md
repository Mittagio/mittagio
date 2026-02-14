# Inseratsflow – Layout & Logik (Vanilla)

**Einzig verbindliche Definition:** `.cursor/rules/inseratsflow-ist-high-end-universal.mdc`

Umsetzung in `app/index.html` (kein React).

---

## Code-Mapping

| Was | Wo |
|-----|-----|
| Wizard (Single-Page) | `buildListingStep()` |
| Wizard-State | `w.data` |
| Angebot aus Wizard | `previewOfferFromWizard()` |
| Veröffentlichen | `showPublishFeeModal(o)` → `publishOffer(o)` |
| Foto im State | `w.data.photoData` |
| Wizard neu rendern | `rebuildWizard()` |

---

## Button-Logik

| entryPoint | Aktion |
|------------|--------|
| `dashboard` | Pricing-Weiche: „Jetzt für 4,99 € inserieren“ (Gelb) / „Gratis inserieren“ (Emerald, inkl. Abholnummer) |
| `cookbook` / `week` | Nur Emerald „Speichern“ (Im Kochbuch / Im Wochenplan) |
