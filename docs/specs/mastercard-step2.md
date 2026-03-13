# Mastercard Step 2 (Monetarisierung)

## Ziel

Step 2 ist eine finale Review-Ansicht im S25-Look: ein kompakter Stamp-Block mit Thumbnail, dazu zwei schwebende Auswahl-Kacheln fuer die Monetarisierung und ein dynamischer Abschluss-CTA im Footer.

## Struktur

1. Fester Header mit Titel `Verkaufseinstellungen` und Safe-Area.
2. Edge-to-Edge Hero-Foto wie Step 1 (volle Breite, keine seitlichen Einrueckungen im Bildbereich).
3. Titelbereich `Dein Gericht` und Meta-Zeile (Gerichtsname + Preis) mit konsistentem Seiten-Padding (`20px`).
4. Zwei Floating-Tiles (Airbnb-Look):
   - `Standard-Inserat` mit Preis `4,99 EUR`
   - `Abholnummer` mit Preis `0,00 EUR` und Hinweis `Inklusive Abholnummer` + `0,89 EUR pro Vorgang`
5. Tile-Logik:
   - Abholnummer-Tile ist standardmaessig aktiv (blau markiert)
   - Umschalten per Tap auf die jeweilige Kachel (mutual exclusive)
   - Aktive Kachel zeigt blauen Rahmen plus blauen Check-Indikator

## Footer-Regel

- Weiss (`#ffffff`), oben `1px solid #ebebeb`, keine Rundung.
- Unterkante mit Safe-Area (`padding-bottom: env(safe-area-inset-bottom)`).
- Motivationssatz ueber dem CTA: `Dein Gericht sieht fantastisch aus! Bereit zum Verkaufen?`
- Nur Primaer-CTA in Step 2:
  - `Jetzt fuer 0,00 EUR inserieren` wenn Abholnummer aktiv
  - `Jetzt fuer 4,99 EUR inserieren` wenn Standard aktiv
- Kein Zurueck-Link in Step 2.

## Pricing-Logik beim Veröffentlichen

- Abholnummer aktiv:
  - `pricingChoice = "pro"`
  - `inseratFeeWaived = true`
  - `pricingOption = "abholnummer"`
  - CTA zeigt `0,00 EUR`
- Standard aktiv:
  - `pricingChoice = "499"`
  - `inseratFeeWaived = false`
  - `pricingOption` wird entfernt
  - CTA zeigt `4,99 EUR`

## S25 Layout Lock

- Step 2 laeuft im One-Page-Modus mit `overflow: hidden`.
- Keine Scrollbars im Step-2-Content.
- Footer bleibt als finaler Anker am unteren Rand mit Safe-Area.
