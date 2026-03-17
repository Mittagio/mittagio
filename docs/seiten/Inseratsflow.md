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

## Mastercard Step1 (UI/Scroll-Fix)

- **Pills direkt unter Bild:** Kategorie-Pills folgen ohne zusätzlichen Weißabstand direkt auf das Foto.
- **Fotohöhe kompakter:** Hero in Step 1 ist auf `190px` gesetzt, damit keine große Leerfläche zwischen Bild und Inhalt entsteht.
- **Scroll-Jump behoben:** Kein erzwungenes `scrollIntoView(..., smooth)` mehr beim normalen Scrollen; Keyboard-Repositionierung greift nur bei tatsächlich geöffneter Tastatur.
- **Sichtbarkeits-Hotfix:** Step-Track nutzt `width: 100%` (nicht 300%), damit Step‑1‑Inhalt nicht seitlich außerhalb des Viewports gerendert wird.

## Mastercard Step2 (Umbau: Reihenfolge + Marketing)

- **Fixe Reihenfolge:** Oben `Standard-Inserat` (4,99 €), unten `Abholnummer-Paket ⚡` (Default aktiv).
- **Marketing-Text (Abholnummer):** „Kein Chaos in der Küche • Bezahlen schon durch • Kein Kassen-Stress“ + Hinweis „zzgl. 0,89 € bei Erfolg“.
- **Visual:** Zwei schwebende weiße Kacheln auf `#f9f9f9`; aktive Abholnummer-Kachel mit blauem Rahmen/Glow.
- **Interaktion:** Beide Kacheln mit `:active { transform: scale(0.98); }`.
- **Button-Logik:** Aktiv unten → „Jetzt für 0,00 € inserieren“, aktiv oben → „Jetzt für 4,99 € inserieren“.

## Mastercard Step2 (Final Finish: Haptic Heartbeat)

- **Kachel oben:** „Manuelle Abwicklung“ mit Subtext „Barzahlung & Wechselgeld vor Ort“ und Preisbadge „4,99 €“.
- **Kachel unten (Default aktiv):** „Stressfrei-Autopilot 🚀“ mit 4 Nutzen-Bullets, Smartphone-Thumbnail rechts und prominentem Badge „HEUTE 0,00 €“.
- **Aktiv-Visual:** Untere Kachel erhält blauen Rahmen/Glow plus „Bestseller“-Badge.
- **Button:** Bei aktiver 0,00-Option Text „Küche entlasten für 0,00 €“ + sanfte `heartbeat`-Animation.
- **S25 Footer:** Weiß, edge-to-edge, Bottom-Padding `calc(10px + env(safe-area-inset-bottom))`.

## Mastercard Step2 (Refined Publish Workflow)

- **Step2-Trigger:** CTA öffnet immer `showPublishFeeModal()`, wenn Pflichtfelder valide sind.
- **Blocking:** Bei fehlendem Name/Preis/Foto Toast „Ups! Dein Gericht braucht noch ein Bild/Namen.“; bei fehlender Adresse `openAddressModal()` / Address-Sheet.
- **Modal-Text:** Header „Fast geschafft! 🚀“, dynamischer Preis-/Subtext für Stressfrei (0,00 € + 0,89 € Erfolgsgebühr) vs. Manuell (4,99 € einmalig).
- **Success-Transition:** Nach erfolgreichem Publish sofort zu Step 3 (Live), inkl. Toast und zusätzlichem `confetti()`-Hook falls Library vorhanden.
- **Log-Check:** `hasPickupCode`, `pricingChoice`, `inseratFeeWaived` werden im Publish-Objekt mitgeführt und beim Publish geloggt.

## Mastercard Step3 (Success View + WhatsApp)

- **Success-Header:** „Glückwunsch! Dein Inserat ist live! 🚀“ zentriert in Step 3.
- **Konfetti:** Beim Eintritt in Step 3 läuft `confetti()` (wenn verfügbar) über ca. 2 Sekunden.
- **Live-Preview:** Mini-Karte mit Bild, Name, Preis und Badge „● LIVE“ (grün, pulsierend).
- **WhatsApp-CTA:** Prominenter Button „Auf WhatsApp teilen 🟢“ öffnet WhatsApp mit vordefiniertem Viral-Text und Inserat-Link.
- **Actions:** Footer mit „Neues Inserat erstellen“ (Sekundär-Stil) + „Zur Übersicht“ (Text-Link), weiß und Safe-Area-konform.
- **No-Scroll:** Step 3 ist als strahlende One-Page ohne internes Scrollen umgesetzt.
