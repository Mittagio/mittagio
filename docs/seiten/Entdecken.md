# Entdecken

**View-ID:** `v-discover` · Kundenseite  
**Stand:** 14.02.2026

---

## Konzept

Startseite für Kunden: Angebote in der Nähe entdecken, nach Standort/Kategorie/Tag filtern. Clean, modern, kein Schiefertafel-Look.

## Aufbau

- Header: Standort, Kategorien-Pills, Tag-Auswahl
- Karten: Foto, Gerichtsname, Anbieter, Preis, 3 Säulen (🍴🧾🔄), Distanz
- Bottom-Nav: Entdecken | Favoriten | Mittagsbox | Meins

## Regeln

- 3 Säulen unter dem Bild; Icons farbig (aktiv) oder ausgegraut
- Layout nur Kundenseite

## Update: Airbnb-Footer, Header-Cleaning & Kachel-Korrektur

- **Airbnb-Footer:** Kunden-Bottom-Nav (`#customerNav`) ist `fixed`, reinweiß, `border-top: 1px solid #ebebeb`, `height: calc(65px + env(safe-area-inset-bottom))`, `z-index: 2000`.
- **Header-Cleaning:** `discover-header-sticky` auf `position: sticky`, `background: #ffffff`, `margin/padding: 0`, `z-index: 1500`. `#v-discover` Hintergrund auf `#fcfcfc`.
- **Kachel-Korrektur:** `discover-offers-list` als `flex-direction: column`, `gap: 40px`, `padding-bottom: 100px` (Footer-Platz). `.dish-card` und `.tgtg-list-item` auf `position: relative`, `max-width: 320px`, zentriert — kein Stapeln mehr.
