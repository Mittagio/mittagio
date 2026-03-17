# Inseratsflow

**Sheet-ID:** `#wizard` (kind=listing) · Anbieterseite  
**Stand:** 14.02.2026

---

## Konzept

Universelle Eingabemaske: Gericht erstellen / bearbeiten. Single-Page, eine Maske.

## Aufbau

- Foto → Name → Beschreibung → Kategorie → Preis → Logistik (🍴🧾🔄🕒) → Allergene → Extras → Buttons
- Pricing-Weiche (Dashboard): 4,99 € / Gratis + Abholnummer
- Kochbuch/Wochenplan: nur „Speichern“

## Regeln

**Einzige verbindliche Quelle:** `.cursor/rules/inseratsflow-ist-high-end-universal.mdc`  
Umsetzung: `buildListingStep()` in `app/index.html`

---

## Layout-Referenz (Silicon-Valley-Glas)

Visuelle Zielvorgabe (nur Optik, Schritte und Inhalt unverändert):

- **Container:** `border-radius: 3rem`, `bg-white/70`, starker `backdrop-blur` (48px), `border-white/40`, tiefer Glas-Schatten
- **Hintergrund:** warmes Küchen-Ambiente (Backdrop mit warmem Farbverlauf oder verschwommenem Bild)
- **Farben:** Emerald #10b981 (aktiv), Gelb #FACC15 (4,99-€-Button)

---

## Mastercard Step2 (UI-Fix)

- **Cutoff-Fix:** Step-Slider nutzt feste 100%-Pane-Breiten (3x 100%) und Track-Transition `0% / -100% / -200%`, damit Step 2 auf Mobile nicht links abgeschnitten wird.
- **Tile-Höhe:** Auswahl-Kacheln in Step 2 sind größer (`min-height: 104px`) für bessere Daumen-Bedienung.
- **App-Style:** stärkere Card-Optik mit größerem Radius, tieferem Shadow und klarerer Active-Glow-Darstellung.
