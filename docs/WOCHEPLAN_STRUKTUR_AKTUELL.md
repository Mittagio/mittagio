# Wochenplan-Seite – aktuelle Struktur (Zusammenfassung)

## HTML-Aufbau

- **Section:** `<section class="view onboarding-view" id="v-provider-week">`
  - Keine explizite Höhe oder Flex-Layout auf der Section → füllt den Viewport nicht zuverlässig.
- **Header:** `.week-header-compact`
  - Nur Titel „Wochenplan“, zentriert, sticky, `position: sticky; top: 0`.
- **Content-Wrapper:** `.week-plan-wrap` (`display: flex; flex-direction: column`)
  - **#weekDays** – horizontale Zeile mit Tages-Pills (Heute, SO 8.2., …), Snap-Carousel.
  - **#weekList** – scrollbarer Bereich für Gerichtskarten (flex: 1, overflow-y: auto); wird von `renderWeekPlan()` befüllt (Statusblock, Karten, „+ Weiteres Gericht“).
  - **#weekThumbZone** – fixer unterer Block: Aktivieren-Button („Jetzt für 4,99 € aktivieren“), darunter Aktionsleiste (Aktualisieren, Drucken, Teilen).

## CSS (aktuell)

- **Section:** Gemeinsam mit Pickups/Kochbuch/Profil: `padding: 16px 16px 100px !important` (kein eigener Flex/Height).
- **.week-plan-wrap:** `max-width: 500px; margin: 0 auto; padding: 0 20px 24px` – nur zentriert, keine `min-height: 0` / `flex: 1` auf Section-Ebene.
- **Ergebnis:** Die Section hat keine `min-height: 100vh` und kein `display: flex`, daher wirkt die Seite auf dem Handy nicht wie eine volle App-Ansicht (nicht „applike eingebettet“).

## Bottom-Navigation (Provider)

- **#providerNav:** Feste Tab-Leiste unten mit 5 Buttons: Küche (`provider-home`), Abholungen, **Wochenplan (`provider-week`)**, Kochbuch, Meins.
- **Aktiv-Zustand:** Die Klasse `.active` wird auf den Button mit passendem `data-pgo` gesetzt; Farbe Brand (z. B. Gold), kräftigere Schrift.
- **setProviderNavActive(go)** vergleicht `b.dataset.pgo === go` und setzt `.active` entsprechend.

## Bekannter Bug

- In **showProviderWeek()** wird fälschlich **setProviderNavActive('provider-home')** aufgerufen statt **setProviderNavActive('provider-week')**.
- Folge: Beim Tipp auf „Wochenplan“ leuchtet der Tab „Küche“, der Wochenplan-Tab bleibt inaktiv.

## Kurz: drei Punkte

1. **Tab leuchtet nicht** → setProviderNavActive in showProviderWeek auf `'provider-week'` stellen.
2. **Größe nicht applike** → Section mit `min-height: 100vh`/100dvh, Flex-Layout, Safe-Area; Content-Bereich flex:1 und min-height:0.
3. **Sieht nicht applike aus** → Einheitliche Abstände, klare Karten, Hintergrund, Safe-Area unten für die Nav.
