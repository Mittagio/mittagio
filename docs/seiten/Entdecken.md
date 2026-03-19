# Entdecken

**View-ID:** `v-discover` - Kundenseite  
**Stand:** 14.02.2026

---

## Konzept

Startseite fuer Kunden: Angebote in der Naehe entdecken, nach Standort/Kategorie/Tag filtern. Clean, modern, kein Schiefertafel-Look.

## Aufbau

- Header: Standort, Kategorien-Pills, Tag-Auswahl
- Karten: Foto, Gerichtsname, Anbieter, Preis, 3 Saeulen, Distanz
- Bottom-Nav: Entdecken | Favoriten | Mittagsbox | Meins

## Regeln

- 3 Saeulen unter dem Bild; Icons farbig (aktiv) oder ausgegraut
- Layout nur Kundenseite

## Update: Airbnb-Footer, Header-Cleaning & Kachel-Korrektur

- **Airbnb-Footer:** Kunden-Bottom-Nav (`#customerNav`) ist `fixed`, reinweiss, `border-top: 1px solid #ebebeb`, `height: calc(65px + env(safe-area-inset-bottom))`, `z-index: 2000`.
- **Header-Cleaning:** `discover-header-sticky` auf `position: sticky`, `background: #ffffff`, `margin/padding: 0`, `z-index: 1500`. `#v-discover` Hintergrund auf `#fcfcfc`.
- **Kachel-Korrektur:** `discover-offers-list` als `flex-direction: column`, `gap: 40px`, `padding-bottom: 100px` (Footer-Platz). `.dish-card` und `.tgtg-list-item` auf `position: relative`, `max-width: 320px`, zentriert - kein Stapeln mehr.

## Update: Top-Rand Fix (Discover Header)

- Doppelter Safe-Area-Offset entfernt: `discover-header-top-row` nutzt kein zusaetzliches `env(safe-area-inset-top)` mehr (nur noch `padding-top: 8px`).
- Legacy-Offset entfernt: `#v-discover .discover-main` hat `padding-top: 0`, dadurch kein kuenstlicher oberer Leerraum mehr.
- Discover-Header wird explizit gegen `.cust-header-sticky`-Defaults ueberschrieben (`#v-discover .cust-header-sticky.discover-header-sticky`) - nur eine Safe-Area, kein doppelter Offset.

## Update: Customer Header bleibt sticky (kein Braunstich)

- `position: sticky` bleibt unveraendert fuer alle Kunden-Header (`.cust-header-sticky`).
- Der braune Schleier wurde entfernt: Hintergrund jetzt voll weiss (`#ffffff`) statt halbtransparentem Glas-Layer.
- Blur-Filters in `.cust-header-sticky` wurden deaktiviert (`backdrop-filter: none`), damit keine Farbstiche aus dem Seitenhintergrund mehr durchscheinen.
