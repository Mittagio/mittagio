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

## Update: USP-First Card-Layout

- Listenoptik entfernt: jede Speise als eigenstaendige weisse Card mit Radius (`~18px`), subtilem Schatten und klaren Abstaenden.
- Horizontaler Aufbau: kleines 1:1-Bild links, kompletter Inhalt rechts.
- Oben rechts in der Card: Favorit + Teilen als ruhige runde Mini-Buttons.
- Oberste Informationszeile priorisiert USPs: `Abholnummer`, `⏱️ Gehzeit`, `🚗 Fahrzeit`, `📍 Entfernung`.
- Zweite Zeile zeigt kompakt `Mehrweg` und `Vor Ort` als kurze Badges.
- Titel darunter prominent (max. 2 Zeilen), Anbietername nicht mehr prominent.
- Unten: Preis dunkel links, gelber CTA `In meine Box` rechts als Primary Action.

## Update: Card-Trennung (mobile.de-Charakter)

- Deutlich mehr Abstand zwischen den Karten (`~22px`), damit jede Kachel als einzelnes Modul wahrgenommen wird.
- Cards visuell abgehoben durch Kombination aus `1px`-Hellgrau-Border (`#eee`) und leicht staerkerem, aber weiterhin ruhigem Shadow.
- Klare Zonenstruktur in jeder Card: `USP-Zone` -> `Titel-Zone` -> `Preis+Button-Zone`.
- Vertikale Zone-Abstaende verstaerkt (USP->Titel und Titel->Preis/Button jeweils im Bereich `12-16px`).
- Preis und CTA bleiben nebeneinander, mit fixem Mindestabstand und ohne Full-Width-Button.
- Bild links sauber gebunden (`~110px`, 1:1, oben ausgerichtet), damit es nicht schwebend wirkt.

## Update: Vollbreiten-Titel + Trenner

- Card-Struktur in drei Bloecke: `Bild+USP` (oben), `Titel volle Breite` (Mitte), `Preis+CTA` (unten).
- Der Gerichtstitel ist aus der rechten Spalte geloest und steht als eigener, ruhiger Vollbreiten-Block.
- Zwischen Titelzeile und Preis/CTA liegt eine dezente horizontale Trennlinie (mobile.de-Charakter).
- Vertikale Lesereihenfolge ist damit klar: erst USP, dann Titel, dann Entscheidung ueber Preis und `In meine Box`.

## Update: Marketplace-Kachel (mobile.de-Logik)

- Alte `#v-discover .dish-card`-Styles im Discover-Bereich entfernt; Discover nutzt die neue Marketplace-Kachelstruktur.
- Oben: vollbreites Bild mit USP-Overlay rechts (`Abholnummer` + `Zeit`) fuer schnellen Vertrauensanker.
- Mitte: Name/Preis in einer Zeile (Name links, Preis rechts), darunter Anbieter klein und dezent.
- Unten: feste Action-Bar mit Favorit + Teilen links und gelbem CTA `In meine Box` rechts.
- Fokus bleibt auf schnellen Fakten und klarer Entscheidungszone statt Listenoptik.

## Update: Action-Bar + Haptik

- Action-Bar am Kartenfuß auf klare 48px-Höhe harmonisiert: zwei Icon-Buttons links, CTA rechts auf derselben Ebene.
- CTA `In meine Box` nutzt in der Leiste `flex-grow`, damit der verfügbare Restplatz sauber genutzt wird.
- Auf den Kernaktionen (`Favorit`, `Teilen`, `In meine Box`) wurde kurzes haptisches Feedback ergänzt (Vibration/Fallback).

## Update: Anbieter-Name tappbar

- In Discover-Karten wird der Anbietername ohne Pfeil (`>`) angezeigt.
- Der Anbietername ist als eigene tappbare Zeile umgesetzt und öffnet direkt die öffentliche Anbieter-Detailseite.

## Update: Reload immer Kunde

- Beim App-Reload wird der Startzustand konsequent auf Kundenseite gesetzt.
- `provider-mode` wird beim Init entfernt und die App landet auf `Entdecken` statt im Anbieterbereich.

## Update: Herz-Interaktion stabil

- Herz-Tap in Discover-Kacheln erzeugt kein störendes Match-Overlay mehr.
- Bei Favorisieren gibt es Haptik + Herz-Pop-Animation.
- Zusätzlich fliegt ein visuelles Element Richtung Favoriten-Tab (Bottom-Nav), damit der Transfer in Favoriten klar wahrnehmbar ist.
- Der Herz-Button zeigt im aktiven Zustand eine rote Optik (Icon + rote Tönung der Button-Fläche).

## Update: Sticky Header in Customer-Views

- Die Header in `Entdecken`, `Favoriten`, `Mittagsbox` und `Meins` sind einheitlich sticky (oben angeheftet).
- Umsetzung ist nur im Customer-Scope gesetzt (`body:not(.provider-mode)`), damit der Anbieterbereich unverändert bleibt.
- Header bleiben mit weißem Hintergrund und feiner Trennlinie app-like und stabil beim Scrollen.

## Update: Scroll-Effekt fuer Customer-Header

- In `Entdecken`, `Favoriten`, `Mittagsbox` und `Meins` reagiert der Header nun auf Scroll:
  - dezenter Blur/Glass-Effekt
  - leicht komprimierte Vertikal-Abstaende (Shrink)
  - sanfter Shadow fuer klare Trennung vom Content
- Der Effekt wird nur auf der aktiven Customer-View gesetzt und beim View-Wechsel sauber synchronisiert.
