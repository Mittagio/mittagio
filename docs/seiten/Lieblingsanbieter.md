# Lieblingsanbieter (Kunde)

**View-ID:** `v-fav-providers` · Kundenseite  
**Stand:** 06.04.2026

---

## Zweck

Eigene Seite nur für favorisierte Anbieter, getrennt von den Gericht-Favoriten.

## Einstieg

- Quick-Action in `Meins`:
  - `Meine Lieblingsanbieter` → `showView('v-fav-providers')`

## Inhalt

- Liste mit allen favorisierten Anbietern aus `providerFavs`
- Jede Anbieter-Karte öffnet die öffentliche Anbieter-Detailseite (`showProviderProfilePublic(providerId)`)
- Anbieter mit aktuellem Tagesangebot werden oben angezeigt
- Anbieter ohne Tagesangebot bleiben sichtbar und zeigen weiterhin den CTA `Anbieter ansehen`

## Empty State

- Wenn keine Anbieter favorisiert sind:
  - zentrierter Empty-State mit Hinweistext
  - CTA `Anbieter entdecken` führt zu `Entdecken`

## UI/Verhalten

- Kunden-Header ist sticky/shrink wie bei `Favoriten`, `Mittagsbox`, `Meins`
- Zurück-Button oben rechts führt zurück zu `Meins`
- Änderungen an Anbieter-Favoriten werden live übernommen (Discover, Favoriten, Lieblingsanbieter-Seite, Profil)
