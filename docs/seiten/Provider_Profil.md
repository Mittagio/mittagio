# Provider Profil (Meins)

**View-ID:** `v-provider-profile` · Anbieterseite  
**Stand:** 14.02.2026

---

## Konzept

Anbieter-Profil: Betriebsdaten, Einstellungen, Rechtliches, Support, Abmelden.

## Aufbau

- Meine Daten
- Standard-Zeitfenster, Abholnummer, Mehrweg
- Impressum, AGB, Datenschutz, FAQ
- Support, Abmelden

## Regeln

- Anbieterseite

## Bugfix: Mein Betrieb + Geld-Overlay

- **Mein Betrieb klickbar:** Die Header-Kachel `#providerProfileMasterKachel` öffnet wieder zuverlässig den Subbereich „business“.
- **Overlay-Reset:** Das Overlay „Mein Geld“ wird beim Profil-Setup aktiv geschlossen, damit kein hängen gebliebener Zustand die obere UI blockiert.
- **Overlay-Hitbox-Schutz:** `account-regeln-sheet` reagiert nur im Zustand `.active` auf Pointer-Events; inaktiv ist es unsichtbar und nicht klickbar.
