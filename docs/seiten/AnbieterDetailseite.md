# Anbieter-Detailseite

**View-ID:** `v-provider-detail-public` · Kundenseite  
**Stand:** 07.04.2026

---

## Ziel

Diese Seite ist der Ort für **weitere Gerichte des Anbieters** (nicht die Gericht-Detailseite).

- Tagesessen von heute
- weitere Kategorien (z. B. Veggie/Fleisch/Vegan)
- Vorschau auf die nächsten Tage mit **Wochentag + Datum** (z. B. `Do 09.04.`)

## Layout-Regel

- Bestehendes Layout der öffentlichen Anbieterseite beibehalten.
- Keine neue Designsprache einführen.
- Konsistent zu Discover und Gericht-Detail (Typo, Cards, Buttons, Abstände).

## Inhalt

- Kopfbereich im Header mit Anbietername + Adresse als Subline.
- Share-Aktion oben rechts im Header (app-like, ohne separate Hero-Kachel) mit neutralem Einladungstext (z. B. "Hast du am Fr Mittag Zeit?").
- Header mit leichtem **Shrink-Verhalten** beim Scrollen (kompakter, bleibt oben sticky).
- Back-Button im Header ist robust und führt immer zurück zu Discover.
- Android/Samsung-Feinschliff: kompaktere Spacings und Card-Maße bei sehr schmalen Viewports (`<=390px`), damit Inhalte nicht eingeengt wirken.
- Schutz gegen Nav-Leak: `#providerNavWrap` bleibt im Kundenkontext (`body:not(.provider-mode)`) immer ausgeblendet.
- Zusätzlich auf JS-Ebene abgesichert: Beim Öffnen von `v-provider-detail-public` wird `provider-mode` entfernt und die Anbieter-Navigation inline versteckt, damit kein Footer-Leak nach Kundenseitenwechsel sichtbar bleibt.
- Bereich **Tagesessen heute** mit aktiven Gerichten.
- Kategorien als Filter-Chips mit Discover-Logik und Icon-Sprache (`✨ Alle`, `🥩 Fleisch`, `🥦 Veggie`, `🌿 Vegan`).
- Bereich **Nächste Tage** mit Gruppierung je Datum (`Mo 08.04.`, `Di 09.04.` etc.).
- Premium-Offer-Cards (großes Thumbnail, Titel/Preis-Zeile, dezente Kategorie-Pill inkl. passendem Emoji) im gleichen Qualitätsniveau wie Favoriten/Detail.
- Content-Spacing ist so gesetzt, dass Karten nicht eingeengt wirken (kein doppeltes Seiten-Padding).
- Kachel-Klick öffnet direkt die **Gerichtsdetails**.
- Auf den Kacheln werden **keine Abholzeiten** angezeigt.

## Abgrenzung zur Gericht-Detailseite

- `Gericht_Detail.md` bleibt fokussiert auf **ein Gericht**.
- Multi-Gerichte-Ansichten gehören in die Anbieter-Detailseite.
