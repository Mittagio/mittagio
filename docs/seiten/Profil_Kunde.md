# Profil (Kunde)

**View-ID:** `v-profile` · Kundenseite  
**Stand:** 08.04.2026

---

## Konzept

`Meins` ist als kompakter Customer-Hub aufgebaut: Identität oben, schnelle Aktionen, aktuelle Abholnummern und zuletzt relevante Bestellungen.

## Aufbau

- Header mit Aktionen (Hilfe, Anbieter-Portal, Einstellungen)
- Hero-Kachel:
  - Eingeloggt: Avatar + persönlicher Status
  - Ausgeloggt: Willkommen + CTA `Profil anlegen`
- Quick-Action-Reihe:
  - `Meine Lieblingsanbieter` → öffnet die eigene Seite `Lieblingsanbieter`
  - `Meine Daten` → öffnet direkt die Daten-Sektion im Einstellungen-Sheet
  - `Mein Food-Profil` → öffnet direkt die Food-Profil-Sektion im Einstellungen-Sheet
  - `Support` → öffnet die Support-Seite
  - Stabilität (08.04.2026, Hotfix): Header-Scroll-FX nutzt ein globales Guard-Flag (`window.__customerHeaderScrollFxBound`) ohne TDZ-Risiko, damit `initApp` nicht mehr mit `customerHeaderScrollFxBound` crasht.
  - Stabilität (08.04.2026, Hotfix): Legal/Support nutzt einen JS-seitigen Top-Reset (mehrfach via `requestAnimationFrame`/`setTimeout`) ohne globales Body-Layout-Locking, um Content-Ausblendungen zu vermeiden.
  - Stabilität (08.04.2026, Hotfix-2): `showLegalPage()` erzwingt einen mehrfachen Timing-Lock (`lockLegalTop`) auf `window`, `body`, `documentElement`, `#app`, `main`, aktive View und deren innere Scroll-Container; so wird späteres „Nachspringen“ auf Samsung reduziert.
  - Stabilität (08.04.2026, Hotfix-3): Im Customer-Mode erzwingen `#app` und `main` zusätzlich `padding-top: 0 !important;`, damit kein Rest-Top-Gap über Legal-/Support-Inhalten stehen bleibt.
  - Stabilität (08.04.2026, Hotfix-4): Für `v-support`, `v-legal-impressum`, `v-legal-agb-kurz`, `v-legal-datenschutz`, `v-legal-faq` wird das Section-Padding explizit auf **ohne Top-Padding** gesetzt; zusätzlich `> .panel { margin-top:0 }`, damit kein weißer Kopfbereich vor dem Inhalt bleibt.
  - Stabilität (05.05.2026, Scroll-Fix Live): Die Legal/Support-Views (`Support`, `Impressum`, `AGB`, `Datenschutz`, `FAQ`, `Version`) nutzen im Kundenmodus keinen fixen Viewport mehr, sondern einen normalen Flow-Container mit `overflow-y:auto`, `touch-action: pan-y` und `min-height`, damit die Inhalte auf Live-Geräten vollständig scrollbar bleiben.
  - Support/FAQ startet immer am Seitenanfang (kein initiales Nach-unten-Rutschen, kein Weißbereich oben)
  - Globaler View-Reset: Beim Wechsel auf Profil-Unterseiten (`Support`, `Datenschutz`, `Impressum`, FAQ) wird Scroll immer hart auf `0` gesetzt.
  - Globaler Navigations-Patch: `showView` wird zentral auf `behavior: auto` stabilisiert (kein `smooth`-Rutschen beim Seitenwechsel aus `Meins`).
  - Legal/Support-Views laufen ohne `viewIn`-Animation, damit beim Öffnen kein visueller Down-Shift entsteht.
  - Final an der Quelle: `app/js/ui-navigation.js` setzt beim View-Wechsel den Top-Reset auf Window, View und innere Scroll-Container (inkl. zusätzlichem rAF-Reset).
  - Legal/Support-Fix im CSS: `v-support`, `v-legal-impressum`, `v-legal-agb-kurz`, `v-legal-datenschutz`, `v-legal-faq` erzwingen `padding-top: 0`, damit kein weißer Top-Block sichtbar wird.
  - Hard-Reset erweitert: Beim View-Wechsel werden zusätzlich `#app`, `main`, `document.scrollingElement` und alle scrollbaren Elemente in der aktiven View auf `0` gesetzt (mehrfacher rAF/Timeout-Reset).
  - Legal-Safety-Fix: Beim Öffnen von Legal/Support wird für `#app`, `main` und die Ziel-View `transform:none`, `top:0` und `margin-top:0` erzwungen, um negative Container-Offets zu neutralisieren.
  - Customer-Root-Schutz in CSS: `body:not(.provider-mode) #app` und `#app > main` erzwingen ebenfalls `transform:none`/`top:0`, damit Root-Container nicht nach oben verschoben werden.
- Food-Profil beeinflusst `Entdecken` als Default:
  - `Vegan` aktiv → Discover startet mit Kategorie `Vegan`
  - `Veggie` aktiv (ohne Vegan) → Discover startet mit Kategorie `Veggie`
  - keine dieser Präferenzen aktiv → Discover startet mit `Alle`
  - Änderungen im Food-Profil greifen sofort im Discover-Feed
- Bereich Abholnummern:
  - aktive Abholnummern als Fokus-Karten
  - leerer Zustand mit CTA `Jetzt vorbestellen`
- Einstellungen-Sheet fokussiert auf `Meine Daten` und `Mein Food-Profil` (ohne doppelte Navigationspunkte)
- Bestellkarten mit Preis und Status-Pill (`Bezahlt`, `Abgeholt`, `Storniert`, `Offen`)
- Erweiterte Einstellungen weiterhin über das Zahnrad-Sheet

## Regeln

- Kundenseite
- UI-Aufwertung ohne riskante Logikänderung
- Konsistente Optik zu Favoriten/Detailseite (Cards, Radius, feine Schatten)

## Update: Scroll + Pull-to-Refresh

- `Meins` (`v-profile`) ist wieder normal vertikal scrollbar im Kundenmodus.
- Pull-to-Refresh ist auf dem Profil-Content aktiv: Runterziehen triggert `updateProfileView()`.
- Nach dem Refresh wird der Profil-Scrollbereich erneut synchronisiert, damit Inhalte auf kleinen und großen Geräten stabil scrollbar bleiben.

## Update: Kacheln + Abholnummer-Verlagerung (22.04.2026)

- Die drei Quick-Action-Kacheln (`Meine Lieblingsanbieter`, `Mein Food-Profil`, `Support`) sind deutlich größer und touchfreundlicher gestaltet (höhere Tiles, größere Rundung, stärkere visuelle Hierarchie).
- Der Abholnummer-Bereich wurde aus `Meins` entfernt.
- In `Meins` bleibt der Fokus auf Profil-Hub + Bestellhistorie; Abholnummern werden nicht mehr doppelt gezeigt.

## Update: Hilfe per Fragezeichen (27.04.2026)

- Die feste Sektion `Mittagio in 5 Schritten` wurde aus dem Haupt-Scrollbereich von `Meins` entfernt.
- Im Header von `Meins` gibt es jetzt oben rechts ein `?`-Icon als kontextuelle Hilfe.
- Tap auf das `?` öffnet ein eigenes Bottom-Sheet mit den bekannten 5 Schritten als Swipe-Cards (Bilder + Kurztexte).
- Das Sheet ist bewusst on-demand: Nutzer sehen die Hilfe nur bei Bedarf, die Seite bleibt im Alltag ruhiger und fokussierter.

## Update: Header vereinheitlicht (27.04.2026)

- Der Header von `Meins` nutzt jetzt dieselbe Typografie wie `Favoriten` und `Mittagsbox` (gleiche Schriftgröße, Gewicht und Farbsystem).
- Ziel: ein einheitliches Header-Muster über alle drei Kunden-Views ohne visuelle Sonderbehandlung für `Meins`.

## Update: Rechtliches im Footer vom Zahnrad-Sheet (05.05.2026)

- In `Einstellungen & mehr` sind `AGB`, `Datenschutz` und `Impressum` nicht mehr als große Listeneinträge enthalten.
- Die drei Punkte stehen jetzt als dezente Footer-Links unter den Kacheln, direkt über der Zeile `mittagio • made with ❤️ in Deutschland`.
- Ziel: weniger visuelle Dominanz im Haupt-Listenbereich, aber weiterhin schnell erreichbar.

## Update: Duplikate reduziert (05.05.2026)

- In `Einstellungen & mehr` wurden doppelte Navigationspunkte entfernt: `Meine Lieblingsanbieter`, `FAQ & Support` und `Zum Anbieter-Portal`.
- Diese Punkte bleiben auf der Hauptseite `Meins` (Quick Actions bzw. Header-Icon) und sind nicht mehr zusätzlich im Zahnrad-Menü gelistet.
- Das Sheet fokussiert damit auf echte Einstellungen/Kontoaktionen (`Meine Daten`, `Mein Food-Profil`, `App herunterladen`, `Abmelden`) plus dezente Rechtslinks im Footer.

## Update: Feinschliff Meins (05.05.2026)

- Label-Konsistenz: Die erste Quick-Action heißt jetzt wie im Sheet `Meine Daten` (statt `Mein Account`).
- Bestell-Fokus: Der Block heißt `Meine Bestellungen`; der CTA ist auf `Alle Bestellungen` verkürzt und visuell klarer priorisiert.
- Support-Microcopy: Quick-Action und Hinweise verwenden einheitlich `Support`.
- PWA-Kontext: Der Eintrag im Einstellungen-Sheet ist kontextsensitiv:
  - nicht installiert → `App herunterladen`
  - bereits installiert (Standalone) → `App-Tipps` (Install-Button im Sheet ausgeblendet)
- Header-Hierarchie: `Einstellungen` ist als primäre Aktion visuell hervorgehoben, `Hilfe` und `Anbieter-Portal` sind bewusst zurückhaltender.

## Update: Fehlerbehebung Meins (05.05.2026)

- Der Button `Alle Bestellungen` ist jetzt aktiv mit der Bestellseite verknüpft (`showOrders()` bzw. Fallback auf `v-orders`).
- Legacy-Referenzen in `updateProfileView()` auf nicht mehr vorhandene Elemente (`profileHeaderCard`, `profilePwaTip`, `btnDismissPwaTip`) wurden entfernt.
- Die E-Mail-Anzeige in `Meine Daten` wird unabhängig von alten Header-Containern zuverlässig synchronisiert.

## Update: Settings-Verhalten vereinheitlicht (05.05.2026)

- In `Einstellungen & mehr` öffnen `Meine Daten` und `Mein Food-Profil` jetzt beide über `openProfileSettingsSection(...)`.
- Dadurch verhalten sich beide Einträge gleich: Sie öffnen als Sheet-Inhalt am oberen Bereich statt als uneinheitliches Inline-Toggle in der Liste.

## Update: Logout nur für eingeloggte Nutzer (05.05.2026)

- Der Button `Abmelden` im Einstellungen-Sheet wird nur angezeigt, wenn `customer.loggedIn === true`.
- Für ausgeloggte Nutzer ist die Aktion ausgeblendet, damit keine unlogische „Abmelden ohne Login“-Option sichtbar ist.

## Update: Rechtliches-Links + Zurück-Verhalten (05.05.2026)

- Die Footer-Links `AGB`, `Datenschutz`, `Impressum` im Einstellungen-Sheet sind visuell dezent ohne Box-Optik dargestellt.
- Die drei Rechtslinks sind zusätzlich mittig im Footer zentriert, auch auf schmalen Geräten.
- Beim Öffnen einer Rechtsseite aus dem Kundenbereich wird die zuletzt aktive Seite als Quelle gemerkt.
- Hardware-Back von `AGB/Datenschutz/Impressum/Support` führt jetzt zuverlässig zurück zur zuletzt genutzten Kundenseite statt pauschal auf `Meins`.

## Update: Header- und Kachel-Feinschliff (05.05.2026)

- Das Einstellungen-Icon oben rechts nutzt wieder denselben subtilen Style wie die beiden Icons links daneben (nicht ausgegraut/abgesetzt).
- Zwischen den vier Quick-Action-Kacheln und `Meine Bestellungen` gibt es zusätzlichen vertikalen Abstand für mehr Luft.
- Der Abstand wird jetzt korrekt zwischen dem 4er-Kachelblock und der Bestellkarte gesetzt (über `margin-bottom` am `profileQuickActions`-Container), nicht mehr über `margin-top` der Bestellkarte.
- Zur klaren Sichtbarkeit auf Mobilgeräten wird der vertikale Abstand zur Bestellkarte zusätzlich zur Laufzeit erzwungen (`updateProfileView(): profileOrdersCard.marginTop = 32px`).
- `Mein Food Profil` nutzt jetzt ein Lucide-Icon (`utensils`) statt Emoji für konsistente Iconsprache.
- Der Settings-Eintrag `App herunterladen` nutzt ebenfalls ein Lucide-Icon (`smartphone`) statt Emoji.
- Die Rechtslinks `AGB · Datenschutz · Impressum` sind im Footer als zentrierter Inline-Block (`fit-content`) mittig ausgerichtet.
- Die Footer-Zentrierung der Rechtslinks wird zusätzlich direkt am Markup erzwungen (`display:flex; justify-content:center; width:100%`), damit es auf mobilen Browsern zuverlässig mittig bleibt.
