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

## Update: Header-Konsistenz (Kunde)

- Customer-Header wurden für `Favoriten`, `Lieblingsanbieter`, `Mittagsbox` und `Meins` auf ein gemeinsames Muster vereinheitlicht.
- Einheitliche Struktur: `customer-header-row` mit klarer Titelzone und optionalen Action-Buttons.
- Einheitliche Action-Buttons: gleiche Größe (`44x44`), Radius (`12px`), Border/Farbe und gleiches Touch-Feedback.
- Einheitliche Typografie und vertikale Abstände für ruhige, konsistente Wahrnehmung über alle Customer-Seiten.
- Kein Back-Button in Customer-Headern; Navigation zurück läuft über den Hardware-Back-Button.
- Header-Regel: Titel steht links, Aktionen stehen rechts.
- Tap auf den Header-Titel löst ein Refresh der aktiven Seite aus (Discover/Favoriten/Lieblingsanbieter/Mittagsbox/Meins/Orders/Anbieter-Detail).

## Update: Scroll-Effekt fuer Customer-Header

- In `Entdecken`, `Favoriten`, `Mittagsbox` und `Meins` reagiert der Header nun auf Scroll:
  - dezenter Blur/Glass-Effekt
  - leicht komprimierte Vertikal-Abstaende (Shrink)
  - sanfter Shadow fuer klare Trennung vom Content
- Der Effekt wird nur auf der aktiven Customer-View gesetzt und beim View-Wechsel sauber synchronisiert.
- Kompatibilitaet: Discover-Styles reagieren auf `is-scrolled` und `scrolled`, damit der Effekt auf allen geraeten konsistent greift.
- Scroll-Basis: Der Header-Effekt wertet den aktiven Customer-Scroll-Container aus (`discover-main` bzw. `customer-main-wrap`) und nicht nur `window.scrollY`.
- Header-Lock: Customer-Header werden in den vier Kunden-Views als oberer Hard-Lock gerendert (fixiert), Content startet darunter mit dynamischem Offset pro View.

## Update: Anbietername und Vorbestellung

- Der Betriebsname wird in Kundenkarten ohne nachgestelltes `>` gerendert.
- Wenn ein Angebot aktiv ist, aber erst in der Zukunft liegt (z. B. morgen/übermorgen), zeigt der CTA `Jetzt vorbestellen!`.
- Das gilt in Discover-Karten und Favoriten-Karten konsistent.

## Update: Kartenmodus Ladezeit + Vollflaeche

- Der kuenstliche `300ms`-Delay in `renderDiscover()` wurde entfernt, damit Karten/Listen ohne spuerbare Wartezeit rendern.
- In der Discover-Kartenansicht wird die Liste jetzt zuverlaessig ausgeblendet (`.discover-offers-list.is-hidden { display:none !important; }`), damit unten nichts durchscheint.
- Die Kartenansicht nutzt den verfuegbaren Bereich nun vollflaechig bis zur Bottom-Nav (`bottom: var(--customer-nav-total-height, calc(64px + var(--safe-area-bottom)))`), sodass kein abgeschnittener Eindruck mehr entsteht.

## Update: Kartenmodus Groesse + Guard

- Fuer den Kartenmodus wird auf `#v-discover` jetzt zusaetzlich die Klasse `is-map-mode` gesetzt, damit der Zustand Liste/Karte robust gesteuert ist.
- Guard-Regel: `#v-discover.is-map-mode #discoverOffers { display:none !important; }` verhindert, dass die Liste bei Spaeteren CSS-Aenderungen wieder durchscheint.
- Groessenanpassung: Die Karte endet im Kartenmodus exakt ueber der Kunden-Bottom-Nav (`bottom: var(--customer-nav-total-height, calc(64px + var(--safe-area-bottom)))`), damit sie den nutzbaren Bereich sauber ausfuellt.

## Neue Regel: JEDES HANDY (nicht nur S25)

- Die Kartenhoehe im Discover-Kartenmodus ist jetzt geraeteunabhaengig: statt fixer S25-Werte wird die echte Hoehe von `#customerNav` live gemessen.
- Neue CSS-Variable: `--customer-nav-total-height` (wird per JS gesetzt) und im Kartenmodus als Bottom-Offset verwendet.
- Regel: `#v-discover.is-map-mode #discoverMap.discover-map-wrap { bottom: var(--customer-nav-total-height, calc(64px + var(--safe-area-bottom))); }`
- Re-Sync bei `load`, `resize`, `orientationchange` und `visualViewport.resize`, damit es auf kleinen/grossen Androids und iPhones konsistent bleibt.

## Update: Pin-Drawer dynamisch (alle Handys)

- Der `discoverPinDrawer` nutzt keine starre Geraete-Annahme mehr, sondern eine dynamische Max-Hoehe fuer kleine und grosse Displays.
- Neue Viewport-Variable: `--viewport-height-px` (aus `visualViewport.height` bzw. `innerHeight`) wird zusammen mit `--customer-nav-total-height` gesetzt.
- Regel fuer den Drawer: `max-height: min(72vh, calc(var(--viewport-height-px, 100vh) - var(--customer-nav-total-height, calc(64px + var(--safe-area-bottom))) - 12px))`.
- Ergebnis: Der Drawer bleibt auf jedem Handy gut bedienbar, ohne unten hinter der Navigation zu verschwinden oder auf kleinen Displays zu dominant zu werden.

## Update: Small-Display Fine-Tune

- Fuer sehr kleine Displays bekommt der Drawer eine dynamische Mindesthoehe, damit Inhalte nicht zu stark zusammengedrueckt werden.
- Regel: `min-height: min(320px, calc(var(--viewport-height-px, 100vh) - var(--customer-nav-total-height, calc(64px + var(--safe-area-bottom))) - 12px))`.
- Damit bleibt das Verhalten geraeteunabhaengig: genug sichtbarer Inhalt auf kleinen Handys, ohne die verfuegbare Hoehe zu ueberschreiten.

## Update: Drawer-Inhalt unter 700px Hoehe

- Fuer kleine Viewport-Hoehen (`@media (max-height: 700px)`) wird nur der Discover-Pin-Drawer kompakter gerendert.
- Anpassungen: geringeres Padding, kleineres Hero-Bild (`132px`), reduzierte Typografie fuer Titel/Preis, engere Abstaende bei Pillars und Navigationszeile.
- CTA und Route-Button bleiben thumb-friendly, werden aber leicht verdichtet (`min-height: 50px`, kleinere Innenabstaende), damit mehr Inhalt sichtbar bleibt.
- Scope bleibt strikt auf `#discoverPinDrawer` beschraenkt, andere Views/Layouts werden nicht beeinflusst.

## Update: Extreme Small-Height unter 620px

- Zusaetzliche zweite Kompakt-Stufe fuer sehr kleine Display-Hoehen (`@media (max-height: 620px)`), weiterhin nur fuer `#discoverPinDrawer`.
- Weitere Verdichtung: Bildhoehe auf `112px`, kleinere Typografie fuer Titel/Preis sowie noch engere Abstaende fuer Pillars/Nav-Row.
- Aktionen bleiben nutzbar: Route-Button und CTA werden nochmals reduziert, behalten aber klare Touchflaechen (`CTA min-height: 46px`).
- Damit bleibt der Kerninhalt auch auf sehr niedrigen Viewports sichtbar, ohne Layout-Brueche in anderen Bereichen.

## Update: Ultra-Compact unter 560px

- Dritte Stufe fuer extrem niedrige Display-Hoehen (`@media (max-height: 560px)`), weiterhin strikt auf `#discoverPinDrawer` begrenzt.
- Zuschnitt fuer Minimal-Height: Hero-Bild auf `92px`, feinere Typografie/Abstaende und nochmals kompaktere Controls.
- CTA bleibt funktional bedienbar (`min-height: 42px`), Route-Button ebenfalls weiter erreichbar.
- Zusatzregel fuer den Container: dynamische Mindesthoehe in dieser Stufe (`min-height: min(260px, calc(...))`), damit der Drawer nicht kollabiert.

## Test-Checkliste: JEDES HANDY

### Android klein (z. B. 360x640)

- [ ] Discover auf Kartenmodus wechseln: Karte fuellt den Bereich bis exakt ueber der Bottom-Nav.
- [ ] Unten scheint keine Liste durch.
- [ ] Pin tippen: Drawer oeffnet voll sichtbar, CTA und Route sind erreichbar.

### Android mittel/gross (z. B. 393x852, 412x915)

- [ ] Kartenmodus hat keine abgeschnittene Hoehe, kein Leerstreifen unten.
- [ ] Drawer-Hoehe wirkt ausgewogen (nicht zu klein, nicht zu dominant).
- [ ] Rotation Portrait/Landscape: Hoehen passen sich nach kurzer Reflow-Zeit korrekt an.

### iPhone klein (z. B. SE-Klasse)

- [ ] Kartenmodus bleibt ueber der Bottom-Nav, trotz Safe-Area korrekt.
- [ ] Drawer bleibt bedienbar bei kleiner Hoehe (Bild, Titel, CTA sichtbar).
- [ ] Beim Oeffnen/Schliessen des Drawers kein Springen des Layouts.

### iPhone normal/pro/max

- [ ] Karte + Drawer nutzen den verfuegbaren Viewport konsistent.
- [ ] Keine Ueberlagerung mit Home-Indicator/Bottom-Nav.
- [ ] Button-Touchflaechen bleiben gut bedienbar.

### Funktionsregression (alle Geraete)

- [ ] Kartenwechsel Liste <-> Karte ist ohne spuerbaren Lade-Delay.
- [ ] Pin-Drawer-Button `Gericht ansehen` oeffnet weiterhin die Detailansicht korrekt.
- [ ] Discover-Filter (Kategorie/Tag/Standort) funktionieren unveraendert.

## Update: Oberer Kartenbereich immer sichtbar

- Der obere Kartenbereich im Discover-Kartenmodus wird jetzt ueber ein dynamisches Top-Inset stabilisiert.
- Neue Variable: `--discover-map-top-inset` (wird aus dem realen Ueberlapp zwischen `.discover-header-sticky` und `.discover-main` berechnet).
- Regel: `#v-discover.is-map-mode #discoverMap.discover-map-wrap { top: var(--discover-map-top-inset, 0px); }`
- Re-Sync erfolgt bei `load`, `resize`, `orientationchange`, `visualViewport.resize` und beim Umschalten auf Kartenmodus.

## Update: Map-Toolbar direkt unter Header

- Die Map-Toolbar (`#discoverMapToolbar`) hat im Kartenmodus jetzt einen festen, konsistenten Abstand unterhalb des Headers.
- Regel: `#v-discover.is-map-mode #discoverMapToolbar { top: var(--discover-map-toolbar-gap, 8px); left/right: 12px; }`
- Der Button `In diesem Bereich suchen` behält dadurch auf allen Handys eine stabile Position direkt unter dem Header, ohne zu verrutschen.

## Update: Zurueck-zur-Liste immer sichtbar

- Problemfall behoben: Der Karten/Liste-Umschalter war bei offenem Pin-Drawer verdeckt.
- Der Umschalter hat jetzt einen hohen Layer (`z-index: 1201`) und bleibt damit nicht hinter Drawer/Map-Overlays.
- Wenn der Pin-Drawer offen ist, wird der Umschalter automatisch nach oben unter den Header verschoben (`#v-discover.is-map-mode.map-drawer-open .discover-view-switch`).
- Beim Wechsel zur Liste wird der Drawer sauber geschlossen und der Drawer-Status (`map-drawer-open`) entfernt.

## Update: Discover-Header kompakter + Logo-Refresh

- Der Discover-Header wurde vertikal verdichtet (weniger Weißfläche zwischen Top-Row und Kategorien-Pills).
- Anpassungen: geringerer Header-Offset, kleinere Top-Row-Paddings sowie kompaktere Kategorien-Leiste.
- Das mittige `MITTAGIO` ist jetzt als tappbarer Button umgesetzt (`#discoverLogoTap`) und triggert ein Refresh von `renderDiscover()`.
- Beim Tap auf das Logo wird leichtes Haptic-Feedback ausgeloest; danach wird das Map-Top-Inset erneut synchronisiert.

## Update: Logo optisch unveraendert + Header noch kompakter

- `MITTAGIO` ist wieder als normales Logo-Element umgesetzt (kein Button-Look), aber bleibt technisch tappbar (`#discoverLogoTap`).
- Der Refresh bleibt gleich: Tap auf Logo triggert `renderDiscover()` plus Re-Sync vom Map-Top-Inset.
- Header-White-Space wurde nochmals reduziert: kleinerer Discover-Offset, kompaktere Top-Row, dichteres Kategorien-Band und leicht reduzierte Chip-Hoehe.

## Update: Logo-Tap robust + Header weiter verdichtet

- Logo-Tap ist jetzt direkt am Element gebunden (`click` + `keydown`) statt delegiert, damit der Tap auch bei Layer-Overlaps stabil ausloest.
- Beim erfolgreichen Logo-Tap gibt es kurzes Feedback (`showToast('Aktualisiert')`) plus Haptik.
- Discover-Header wurde ein weiteres Mal verdichtet: geringerer Header-Offset, kleinere Top-Row-Hoehe und kompaktere Kategorien-Pills.

## Update: Header Ultra-Compact + Tap-Hardening

- Header erneut gestrafft: Discover-Offset weiter reduziert, Top-Row und Kategorienbereich nochmals komprimiert.
- Ziel: sichtbar weniger Weißflaeche zwischen Standort/Logo-Zeile und den Kategorie-Pills.
- Logo-Refresh robuster gemacht: direkte Bindung auf `click`, `pointerup` und `keydown` mit kurzem Anti-Doppeltrigger.
- Ergebnis: `MITTAGIO` bleibt optisch unveraendert, reagiert aber zuverlaessiger auf Tap.

## Update: Variante A final umgesetzt (Detail = eigener Raum)

- Beim Oeffnen der Gerichtsdetailansicht (`openOffer`) wird auf `body` die Klasse `discover-detail-open` gesetzt.
- Solange diese Klasse aktiv ist, wird der Discover-Header inkl. Pills vollstaendig ausgeblendet (`opacity:0`, `visibility:hidden`, `pointer-events:none`, `translateY(-100%)`).
- Beim Schliessen der Detailansicht (`closeSheet`) wird `discover-detail-open` wieder entfernt und der Discover-Header sofort normal angezeigt.
- Effekt: Die Detailansicht hat einen ruhigeren, eigenen Fokus ohne konkurrierende Filterleiste.

## Update: Variante A auch bei Standort-Tap im Detail

- Beim Oeffnen des Distanz-/Routen-Sheets ueber den Standort-Tap im Gerichtsdetail (`openDetailDistanceSheet`) wird zusaetzlich `detail-distance-open` auf `body` gesetzt.
- Solange dieses Sheet offen ist, bleibt der Discover-Header ebenfalls ausgeblendet (gleiche A-Logik wie im Detail).
- Beim Schliessen des Distanz-Sheets (`closeDetailDistanceSheet`) wird `detail-distance-open` wieder entfernt.
- Beim Schliessen der Haupt-Detailansicht (`closeSheet`) werden beide Klassen aufgeraumt (`discover-detail-open`, `detail-distance-open`).

## Update: Variante A mit weicher Transition

- Das Aus-/Einblenden des Discover-Headers in Variante A laeuft nun ueber eine zentrale, weichere Transition am Header selbst.
- Transition-Werte: `opacity`, `transform`, `visibility` mit `0.24s ease`.
- Effekt: Beim Oeffnen/Schliessen von Detail und Distanzsheet wirkt der Wechsel ruhiger und weniger abrupt.

## Update: Variante A auch im Kartenmodus konsequent

- Im Kartenmodus werden bei offenem Gerichtsdetail bzw. Distanzsheet nun zusaetzlich die Karten-Controls ausgeblendet.
- Betroffen: `#discoverMapToolbar` und `#discoverViewSwitchBtn`.
- Dadurch ist die Wirkung im Kartenmodus jetzt gleich zur Liste: Detailansicht ohne konkurrierende Header-/Map-Controls.

## Update: Variante A auch bei offenem Pin-Drawer

- Im Kartenmodus mit offenem Pin-Drawer (`#v-discover.map-drawer-open`) wird der Discover-Header jetzt ebenfalls komplett ausgeblendet.
- Zusaetzlich bleiben `#discoverMapToolbar` und `#discoverViewSwitchBtn` in diesem Zustand verborgen.
- Effekt: Kein „halb umgesetzter“ Zustand mehr; die Fokuslogik ist in Karte und Liste konsistent.

## Update: Pin-Drawer Fokus jetzt ueber Body-State

- Fuer maximale Robustheit setzt der Pin-Drawer jetzt zusaetzlich einen globalen Zustand auf `body`: `discover-map-drawer-open`.
- Header und Karten-Controls reagieren auf diesen Body-State; dadurch greift das Ausblenden sicher auch dann, wenn View-Klassen nicht rechtzeitig synchron sind.
- Der Body-State wird beim Schliessen des Drawers, beim Wechsel zur Liste und beim Schliessen des Details wieder entfernt.

## Hotfix: Variante A nicht mehr "halb" im Kartenmodus

- Fokus-Stati (`discover-detail-open`, `detail-distance-open`, `discover-map-drawer-open`) blenden den Discover-Header jetzt hart per `display:none` aus.
- Gleichzeitig wird im Fokuszustand `discover-main` auf `margin-top: 0` gesetzt, damit kein Header-Restabstand bleibt.
- Karten-Controls (`#discoverMapToolbar`, `#discoverViewSwitchBtn`) werden im Fokuszustand ebenfalls per `display:none` entfernt.
- Die Map erzwingt im Fokuszustand `top:0`, damit kein alter Top-Inset-Wert die Ansicht "halb" wirken laesst.

## Hotfix: Karten-Pin oeffnet jetzt direkt volles Gerichtsdetail

- Im Kartenmodus fuehrt ein Tap auf den Pin jetzt direkt in `openOffer(...)` statt in die halbe Pin-Preview.
- Dadurch verhaelt sich Karte wie Liste: Der Nutzer landet sofort in der vollen Gerichtsdetailansicht.
- Vor dem Oeffnen wird ein eventuell offener Pin-Drawer geschlossen, damit keine Zwischenzustand-UI sichtbar bleibt.

## Update: Pin-Drawer vollstaendig deaktiviert

- Der Discover-Pin-Drawer (`#discoverPinDrawer`) und sein Backdrop sind nun per CSS deaktiviert (`display:none`).
- `openDiscoverPinDrawer(...)` ist als Direkt-Weiterleitung auf `openOffer(...)` umgestellt.
- Ergebnis: Im Kartenmodus gibt es nur noch einen klaren Pfad - Pin-Tap oeffnet direkt das volle Gerichtsdetail.

## Hotfix: Wochenplan-Footer nicht mehr in Kunden-Views

- `#weekViewFooter` wird nur noch bei `body.provider-mode.provider-week-active` angezeigt.
- In allen Kunden-Views (`body:not(.provider-mode)`) wird der Footer hart unterdrueckt (`display:none`, `visibility:hidden`, `pointer-events:none`).
- Effekt: Der Text `0 Gerichte inserieren / Woche jetzt inserieren` erscheint nicht mehr in `Meins`, `Favoriten` oder `Mittagsbox`.

## Hotfix: Wochenplan-Footer an aktive View gebunden

- `#weekViewFooter` startet jetzt mit `week-footer-hidden` als Default versteckt.
- Neue JS-Guard `syncWeekFooterVisibility()` blendet den Footer nur ein, wenn wirklich `provider-mode` aktiv ist und die aktive View `v-provider-week` ist.
- Beim View-Wechsel (`showView`) und beim App-Load wird die Sichtbarkeit erneut synchronisiert.
- `updateWeekViewFooter()` beendet frueh, wenn der Footer nicht im gueltigen Anbieter-Wochenplan-Kontext ist.

## Hotfix: Hard-Gate gegen Footer-Leaks

- `#weekViewFooter` ist per CSS standardmaessig immer versteckt.
- Sichtbar wird er nur ueber die explizite Body-Freigabe `week-footer-visible`, die von `syncWeekFooterVisibility()` gesetzt wird.
- Die Freigabe gilt nur bei `provider-mode` + aktiver View `v-provider-week` und wird in Preview/Wizard-Zustaenden blockiert.
- Zusatztaktung fuer robuste Korrektur bei Legacy-States: Synchronisierung auch ueber `hashchange`, `popstate` und einen kurzen Poll-Intervall.

## Hotfix: Finale JS-Hartsperre fuer Wochenplan-Footer

- `syncWeekFooterVisibility()` setzt die Sichtbarkeit jetzt zusaetzlich direkt per Inline-Style mit `!important`.
- Bei ungueltigem Kontext erzwingt JS: `display:none`, `visibility:hidden`, `pointer-events:none` direkt auf `#weekViewFooter`.
- Nur im gueltigen Anbieter-Wochenplan-Kontext setzt JS aktiv auf sichtbar (`display:flex`, `visibility:visible`, `pointer-events:auto`).
- Damit bleibt der Footer auch dann sicher weg, wenn spaetere CSS-Regeln oder Legacy-Klassen versehentlich gegensteuern.

## Update: Variante A fuer Bottom-Nav in Favoriten/Mittagsbox/Meins

- Fuer `v-fav`, `v-cart` und `v-profile` wird die Customer-Bottom-Nav nicht mehr als fixed Overlay genutzt, sondern im Runtime-Guard auf inline (`position: relative`) umgestellt.
- Die Umschaltung ist zustandsbasiert: nur in diesen drei Views inline, in allen anderen Customer-Views weiterhin fixed wie bisher.
- Der Content-Wrap der drei Views bekommt dabei nur einen kleinen unteren Sicherheitsabstand (`8px`), damit kein kuenstlicher Leerraum mehr unterhalb des Inhalts entsteht.
- Umsetzung in `app/script.js` ueber `applyCustomerBottomGapFix()` inklusive Body-Flag `customer-nav-inline`.

## Hotfix: Customer-Nav wieder fixiert (Regression-Fix)

- Die zuvor eingefuehrte Inline-Navigation wurde rueckgaengig gemacht, da die Bottom-Nav beim Scrollen mitlief.
- `#customerNav` wird in Customer-Views wieder hart auf `position: fixed` am unteren Rand gesetzt.
- Der Inhaltsbereich in `v-fav`, `v-cart`, `v-profile`, `v-fav-providers`, `v-orders` behaelt stattdessen nur einen nav-hohen Bottom-Abstand, damit nichts von der fixed Nav ueberdeckt wird.

## Update: Hybrid fuer kurze vs. lange Seiten (Favoriten/Mittagsbox/Meins)

- Runtime-Logik in `applyCustomerBottomGapFix()` unterscheidet jetzt zwischen kurzem und langem Content.
- **Kurzer Content** (`v-fav`, `v-cart`, `v-profile`): Nav wird inline (`position: relative`) direkt unter dem Inhalt gesetzt, damit kein großer Leerraum sichtbar bleibt.
- **Langer Content**: Nav bleibt `fixed` am unteren Rand, damit sie beim Scrollen nicht mitwandert.
- Der untere Content-Abstand wird entsprechend dynamisch gesetzt (`8px` bei inline, sonst Nav-Höhe).

## Hotfix: Hybrid zurückgenommen (Footer darf nie mitscrollen)

- Die Hybrid-Umschaltung wurde entfernt, weil die Bottom-Nav in kurzen Seiten wieder mitscrollte.
- `#customerNav` bleibt nun in Customer-Views strikt `fixed` mit `bottom: 0`.
- Der Inhaltsbereich in `v-fav`, `v-cart`, `v-profile`, `v-fav-providers`, `v-orders` erhält wieder einen nav-hohen Bottom-Abstand, um Überlagerung zu vermeiden.
