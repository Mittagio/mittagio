# Provider Abholungen

**View-ID:** `v-provider-pickups` · Anbieterseite  
**Stand:** 14.02.2026

---

## Konzept

Liste der Abholungen/Bestellungen. Status (Offen/Abgeholt), Abholnummern.

## Aufbau

- Header: „Abholungen“
- Karten pro Bestellung: Gericht, Abholnummer, Status
- Tap: Markieren als abgeholt

## Regeln

- Karten, keine Tabellen
- Große Abholnummern (72px+)

## Header Shrink (Provider)

- `Abholnummern` hat jetzt denselben Scroll-Mechanismus wie Dashboard: Header groß beim Einstieg, kompakt bei Scroll-down, wieder groß bei Scroll-up.
- Der Filterbereich unter dem Header bleibt sticky; sein `top`-Offset passt sich im kompakten Zustand an, damit keine Überlagerung entsteht.
- Technisch über `is-compact`-Klasse am Header und zentralen Scroll-Controller in `app/script.js`.
