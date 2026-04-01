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
- App-Start ist immer Kundenseite `Entdecken` (kein automatischer Provider-Start beim Laden).
- Test-Voreinstellung aktiv: Standort-Fallback `Stuttgart`, großer Radius (`50 km`) und kein Zeitlimit, damit alle Anbieter schnell durchgeklickt werden können.

## Update: Airbnb-Footer, Header-Cleaning & Kachel-Korrektur

- **Airbnb-Footer:** Kunden-Bottom-Nav (`#customerNav`) ist `fixed`, reinweiss, ohne Trennlinie oben, `height: calc(65px + env(safe-area-inset-bottom))`, `z-index: 2000`.
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

## Update: Globaler Top-Gap Fix (Kunden-Header)

- Fuer alle Kunden-Views ausser Discover startet der Header nun ohne oberen Innenabstand.
- Regel: `body:not(.provider-mode) .customer-view:not(#v-discover) > .cust-header-sticky { padding-top: 0; margin-top: 0; top: 0; }`
- `position: sticky` bleibt aktiv; es wurde nur der sichtbare Top-Rand entfernt.

## Update: Header Weiss + Scroll-Ruhe

- Legacy-Topbar in der Kundenseite wird komplett ausgeblendet (`body:not(.provider-mode) .topbar { display:none !important; }`), damit kein brauner Reststreifen mehr oberhalb sichtbar ist.
- `topbar.customer-context` ist zusaetzlich auf reines Weiss gesetzt (`#ffffff`) als Fallback.
- Discover-Header bleibt beim Scrollen visuell stabil: keine Logo-Skalierung und kein Ausblenden der Standort-Zeile mehr im `scrolled`-Zustand.

## Update: Bottom-Nav Airbnb-clean (Kunde)

- `#customerNav` wurde auf ruhige Airbnb-Optik vereinheitlicht: weisse Flaeche, keine harte Schatten-/Linienartefakte, konsistente Safe-Area.
- Vertikale Ausrichtung der Tabs ist gestrafft (`height/min-height`, reduziertes `padding`/`gap`), damit Icons und Labels nicht zu weit unten sitzen.
- Active-State ist bewusst subtil (dunkler Text/Icon + leicht hoehere Gewichtung), inaktive Tabs bleiben neutral grau.
- Inline-Layoutstyles an `#customerNav` und den Nav-Buttons wurden entfernt; Groessen/Abstaende/Typografie laufen jetzt zentral ueber CSS.
- Kein Separator oberhalb der Kunden-Nav: die Leiste bleibt bewusst clean ohne graue Trennlinie.
