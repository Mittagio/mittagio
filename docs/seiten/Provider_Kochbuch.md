# Provider Kochbuch

**View-ID:** `v-provider-cookbook` · Anbieterseite  
**Stand:** 14.02.2026

---

## Konzept

Anbieter verwaltet Gerichte. Kategorie-Pills, Karten, Bar: Bearbeiten | Wochenplan | Auswählen.

## Aufbau

- Header: „Mein Kochbuch“
- Pills: Alle, Fleisch, Vegetarisch, …
- Karten: Bild, Name, Preis
- Tap → Bar: Bearbeiten | Wochenplan | Auswählen

## Regeln

- „Neues Gericht“ startet Inseratsflow
- Helles Layout

## Update: Sticky & Native Vertical List

- **Vertikale Native-Liste:** Das Kochbuch wird als echte vertikale Kartenliste gerendert (kein Horizontal-Swipe-Karussell mehr).
- **Sticky Header:** Bereich mit `Mein Kochbuch` + Kategorie-Pills bleibt oben sticky (`top: 0`) und erhält bei Scroll einen dezenten Shadow.
- **Card-Layout:** Karten sind vollbreit innerhalb sicherer Seitenabstände, Bild im `16:9`-Look mit weichen Ecken, Text direkt darunter linksbündig.
- **Snap-Verhalten:** Scroll-Container nutzt `scroll-snap-type: y mandatory`; jede Gerichtskarte snappt mit `scroll-snap-align: start`.
- **FAB unten fixiert:** „Dieses Gericht jetzt inserieren“ bleibt als fixierter CTA über der Safe-Area (`env(safe-area-inset-bottom)`).

## Update: Smart Adopt (Schatzkammer → Mastercard)

- **Direkt-Adoption:** Tippen auf eine Schatzkammer-Karte löst `adoptProDish(dish)` aus und überträgt Titel, Preis, Kategorie und Allergene in den Listing-Draft (`w.data`).
- **Draft-Status + Haptik:** Der Datensatz wird als Entwurf markiert (`isDraft: true`) und triggert kurzes haptisches Feedback.
- **Transition:** Die Schatzkammer schließt mit einer Slide-Down-Bewegung; danach öffnet sofort Mastercard Step 1.
- **Preis-Fokus:** Nach dem Öffnen wird das Preisfeld automatisch fokussiert und markiert, damit der eigene Preis direkt überschrieben werden kann.
- **Feedback beim Einstieg:** Toast „Vorlage geladen! Preis prüfen? ✨“ plus kurzzeitiger blauer Glow-Rand an der Mastercard.
- **Foto-Vorlage:** Das Profi-Bild wird als temporäre Vorlage in Step 1 gezeigt und kann dort direkt über den Foto-Flow ersetzt werden.

## Fix: X-Verhalten aus Mein Kochbuch

- **Kein Save-Popup beim X:** Wenn die InseratCard aus dem Kochbuch- oder Wochenplan-Kontext geöffnet wurde, schließt `X` die Karte jetzt direkt mit der Pop-Away-Animation.
- **Rücksprung bleibt gleich:** Nach dem Schließen bleibt der Nutzer im jeweiligen Kontext (`entryPoint: cookbook` bzw. `entryPoint: weeklyPlan`).
- **Scope:** Der Bypass gilt für Kochbuch + Wochenplan; andere EntryPoints behalten ihren bisherigen Dirty-Check/Save-Dialog.
