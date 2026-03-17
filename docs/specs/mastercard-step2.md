# Mastercard Step 2 (Monetarisierung)

## Ziel

Step 2 ist eine finale Review-Ansicht im S25-Look: ein kompakter Stamp-Block mit Thumbnail, dazu zwei schwebende Auswahl-Kacheln fuer die Monetarisierung und ein dynamischer Abschluss-CTA im Footer.

## Struktur

1. Fester Header mit Titel `Dein Gericht` und Safe-Area.
2. Titelbereich `Dein Gericht` mit konsistentem Seiten-Padding (`20px`).
3. Kompakte Stamp-Karte:
   - Thumbnail links (`80x80`, Radius `12px`)
   - Rechts Preis (oben) und Gerichtsname (max. 2 Zeilen)
4. Zwei Floating-Tiles (Airbnb-Look):
   - `Standard-Inserat` mit Preis `4,99 EUR`
   - `Abholnummer` mit Preis `0,00 EUR` und Hinweis `Inklusive Abholnummer` + `0,89 EUR pro Vorgang`
5. Tile-Logik:
   - Abholnummer-Tile ist standardmaessig aktiv (blau markiert)
   - Umschalten per Tap auf die jeweilige Kachel (mutual exclusive)
   - Aktive Kachel zeigt blauen Rahmen plus blauen Check-Indikator
6. Sizing-Stabilitaet:
   - Step-2 nutzt Step-1-nahe Proportionen (keine uebergrossen Titelbereiche)
   - Hero in Step-2 bleibt edge-to-edge, aber ohne negative Offset-Hacks
   - Ziel: keine abgeschnittenen Inhalte auf typischen S25-Viewport-Groessen
7. Premium-Look:
   - Step-2-Container mit hellem Premium-Hintergrund (`#f6f8fa`)
   - Kacheln als `service-tile-card` (weiß, Radius `16px`, dezenter Schatten)
   - Aktive Kachel klar mit blauem Rahmen (`#007aff`) und blauem Check
8. Marketing-Erweiterung:
   - In der `Stressfrei-Autopilot`-Kachel stehen 3 Check-Items in Gruen (`#28a745`):
     - `Kein Kassen-Chaos: Bezahlung erledigt`
     - `Mehr Planbarkeit: Feste Abholzeiten`
     - `Null Verwaltung: Automatische Buchung`
   - Neben dem Abholnummer-Titel ist ein kleines Info-Icon (`ⓘ`) mit Popover.
   - Popover-Text:
     - `Die Abholnummer sichert deinen Verkauf. Der Kunde zahlt vorab online, erhält eine Abholnummer und du händigst das Essen stressfrei gegen die Abholnummer aus.`

## Footer-Regel

- Weiss (`#ffffff`), oben `1px solid #ebebeb`, keine Rundung.
- Unterkante mit Safe-Area (`padding-bottom: env(safe-area-inset-bottom)`).
- Motivationssatz ueber dem CTA: `Dein Gericht sieht fantastisch aus! Bereit zum Verkaufen?`
- Nur Primaer-CTA in Step 2:
  - `Jetzt fuer 0,00 EUR inserieren` wenn Abholnummer aktiv
  - `Jetzt fuer 4,99 EUR inserieren` wenn Standard aktiv
- Kein Zurueck-Link in Step 2.

## Pricing-Logik beim Veröffentlichen

- Abholnummer aktiv (`selectPricing('stressfrei')`):
  - `pricingChoice = "pro"`
  - `inseratFeeWaived = true`
  - `pricingOption = "abholnummer"`
  - CTA zeigt `Küche entlasten für 0,00 €`
  - CTA hat Klasse `btn-pulse`
- Standard aktiv (`selectPricing('standard')`):
  - `pricingChoice = "499"`
  - `inseratFeeWaived = false`
  - `pricingOption` wird entfernt
  - CTA zeigt `Jetzt für 4,99 € inserieren`

## S25 Layout Lock

- Step 2 laeuft im One-Page-Modus mit `overflow: hidden`.
- Keine Scrollbars im Step-2-Content.
- Footer bleibt als finaler Anker am unteren Rand mit Safe-Area.
