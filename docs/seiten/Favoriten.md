# Favoriten

**View-ID:** `v-fav` · Kundenseite  
**Stand:** 06.04.2026

---

## Konzept (Marketplace + Gemeinsam-entscheiden optional)

Die Favoriten-Seite nutzt zwei Modi:

- **Solo (Default):** persönliche Favoriten ohne Voting-Badges.
- **Gemeinsam (opt-in):** Beliebtheits-Badges + Teilen für die Gruppe.

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

- Header-Aktion:
  - Im Solo-Modus: **„Was essen wir heute?“** öffnet ein Bottom-Sheet mit:
    - **Schnell teilen** (bleibt Solo)
    - **Gemeinsam entscheiden** (opt-in)
  - Im Gemeinsam-Modus: **„Ich entscheide heute allein“**.

## Footer-System

- Kundenseiten-Footer immer weiß.
- Obere Trennlinie: `#ebebeb`.
- Bündig mit Displayrand, Safe-Area via `env(safe-area-inset-bottom)`.
