# Favoriten

**View-ID:** `v-fav` · Kundenseite  
**Stand:** 06.04.2026

---

## Konzept (Marketplace + Solo-first)

Die Favoriten-Seite nutzt zwei Modi:

- **Solo (Default):** persoenliche Favoriten ohne Voting-Badges.
- **Gemeinsam (opt-in Zusatz):** Beliebtheits-Badges + Teilen fuer die Gruppe.

## Empty State

Wenn keine Favoriten vorhanden sind, ist der Text vom Modus abhängig:

- **Solo:** persönlicher Einstieg (Favorit markieren, später wiederfinden, zur Mittagsbox legen).
- **Gemeinsam:** Onboarding für gemeinsames Entscheiden (`Allein essen ist doof?` + Share-Flow).
- Primär-CTA: **„Angebote in Schorndorf entdecken“** (führt zu Discover).

## Aktive Favoriten (Cards)

- Hero-Bild mit Hand-Cut-Radius.
- USP-Overlay oben rechts (Abholnummer + Zeit), Discovery-Optik.
- Mitte: Titel links (Serif), Preis rechts (Sans/Bold) in einer Zeile.
- Untertitel: Anbietername in Grau.
- Beliebtheits-Badge: `🔥 X Stimmen` (**nur im Gemeinsam-Modus**).
- Action-Bar:
  - Links: Favorit (rot gefüllt), Teilen.
  - Rechts: Gelber CTA „Zur Mittagsbox“.
  - Alle Controls exakt **52px** hoch.

## Interaktion

- Favorit entfernen via Herz:
  - Karte verschwindet sofort per Shrink-Out.
  - Haptik-Feedback.
  - Undo-Banner (3 Sekunden): „Gericht entfernt – Rückgängig?“.

- Header-Aktion (dezent):
  - Im Solo-Modus: kleines Share-Icon im Header oeffnet ein Bottom-Sheet mit:
    - **Dieses Gericht teilen** (ein Vorschlag)
    - **Alle Favoriten teilen** (Default)
    - **Gemeinsam entscheiden** (opt-in als Zusatz)
  - Im Gemeinsam-Modus: kleines Users-Icon (tap = zurueck auf Solo).

## Share-Texte (versendet + Toast)

- **Dieses Gericht teilen**
  - Versandtext: `Mein Vorschlag fuer heute: <Gericht> bei <Anbieter> ... <Link>`
  - Toast Erfolg: `Gericht geteilt`
  - Toast Fallback: `Link kopiert`

- **Alle Favoriten teilen**
  - Versandtext: `Schau dir meine Favoriten an: <Gericht 1>, <Gericht 2> ... <Link>`
  - Toast Erfolg: `Alle Favoriten geteilt`
  - Toast Fallback: `Link kopiert`

- **Fehlerfall**
  - Toast: `Teilen nicht moeglich`

## Footer-System

- Kundenseiten-Footer immer weiß.
- Obere Trennlinie: `#ebebeb`.
- Bündig mit Displayrand, Safe-Area via `env(safe-area-inset-bottom)`.
