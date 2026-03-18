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

## Update: Floating Photo Editor (Instagram-Style)

- **Full-Bleed Hintergrund:** Das Bild im Editor läuft jetzt über den gesamten Screen (`#photo-edit-overlay`) statt als weißes Panel.
- **Top-Navigation:** „Abbrechen“ (links) und „Fertig“ (rechts) sind als weiße Text-Actions mit Shadow direkt über dem Foto.
- **Schwebende Bottom-Tools:** Die Tool-Reihe ist als Floating-Bar umgesetzt (`Ersetzen`, `Zuschneiden`, `Löschen`) mit transparentem Look und Safe-Area-Abstand.
- **Photo-Coach als Glass-Pill:** Tipps liegen als halbtransparente, geblurte Overlay-Pill oberhalb der Tool-Bar.
- **S25-Abstand unten:** Die Floating-Elemente berücksichtigen `env(safe-area-inset-bottom)`, damit nichts auf der Home-Bar klebt.
