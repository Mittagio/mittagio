# Support

**View-ID:** `v-support` · Gemeinsam  
**Stand:** 26.05.2026

---

## Konzept

Support-Seite für Kunden mit reduziertem, klaren Aufbau.

## Aufbau

- Überschrift `Support` (ohne `& Hilfe`)
- Kein Untertitel unter der Überschrift
- Kein 5-Schritte-Block im Support-Bereich
- FAQ im gleichen hochwertigen App-Stil wie der Rest (kein „billiger“ Look, ruhige aber klare Typografie)
- Keine zusätzliche Subline direkt unter `Häufige Fragen`
- Abholnummer ist wieder als eigene FAQ enthalten (`Wie funktioniert die Abholnummer?`)
- Storno bleibt als eigene FAQ-Antwort verbindlich formuliert (`Nein. Bestellungen werden nach Abschluss sofort verarbeitet. Eine Stornierung ist nicht möglich.`)
- App-like Kontaktbereich:
  - Dropdown `Bestellung auswählen` mit den letzten Bestellungen (inkl. Anbieter/Datum/Abholnummer)
  - Dropdown steht im Formular direkt nach `Betreff` und vor `Abholnummer (optional)`
  - Auswahl übernimmt Betreff und Abholnummer automatisch
  - neueste Bestellung wird automatisch vorgewählt, wenn noch keine Auswahl aktiv ist
- Kontaktformular
  - Betreff ist verpflichtend (Submit wird ohne Betreff blockiert)
- Kein `made with ...`-Footer am Seitenende

## Regeln

- Hell, einheitlich
- Fokus auf schnelle Lesbarkeit statt starke visuelle Hervorhebung

## Update: Mobile-Layout + smarter Bestellbezug (09.05.2026)

- Das Formular im Bereich `Nachricht senden` wird im Kunden-Support jetzt strikt einspaltig gerendert (auch bei kollidierenden Fremdregeln).
- Felder und CTA sind touch-optimiert (`min-height` fuer Inputs, groesserer Senden-Button) und brechen nicht mehr in eine gequetschte Inline-Darstellung.
- Die Schnellkontext-Logik waehlt automatisch die neueste Bestellung vor, wenn noch keine Auswahl aktiv ist.
- Bei der Vorwahl werden Betreff und Abholnummer automatisch gesetzt; die Nachricht erhaelt einen sinnvollen Bezugstext zur letzten Bestellung.

## Update: Scroll + Dropdown-Auswahl (09.05.2026)

- `v-support` hat einen stabilen, eigenen Scroll-Container (`#v-support > .panel`) und ist damit wieder sauber bis ganz unten scrollbar.
- Der Bereich `Letzte Bestellungen & Abholnummern` wurde von Karten/Pills auf ein kompaktes Dropdown umgestellt.
- Die Auswahl im Dropdown setzt den Support-Kontext automatisch (Betreff, Abholnummer, Bezugstext), ohne bestehende freie Texte unnoetig zu ueberschreiben.

## Update: Feintuning Layout/Flow (09.05.2026)

- Der Hinweistext unter dem Dropdown (`Auswahl uebernimmt ...`) wurde entfernt.
- Das Dropdown ist jetzt im Formularfluss zwischen `Betreff` und `Abholnummer (optional)` positioniert.
- Scroll-Handling fuer `v-support` wurde auf nativen Vertikal-Scroll zurueckgestellt (`overflow-y:auto` auf der aktiven View), damit die Seite wieder durchgehend nach unten scrollt.

## Update: Scroll-Hardening (09.05.2026)

- `v-support` nutzt jetzt eine feste, nav-bereinigte View-Hoehe (`height/max-height` auf Basis von `--app-height` minus Kunden-Nav), damit der interne Scrollbereich auf allen Geraeten sicher greift.
- Fuer den Support-Panel-Container wurde `overflow:visible` gesetzt, damit der Formular-Content nicht abgeschnitten wird.

## Update: Runtime-Scroll-Fix beim Oeffnen (09.05.2026)

- Beim Aufruf von `showLegalPage('support')` wird die Scroll-Geometrie zusaetzlich zur Laufzeit gesetzt (hoehenbasierter Scroll-Container anhand `window.innerHeight` minus Kunden-Nav).
- Der Fix wird mehrfach kurz nach dem View-Switch erneut angewendet (`setTimeout` + `requestAnimationFrame`), um spaete CSS-Ueberschreibungen abzufangen.

## Update: App-like Smart Picker (09.05.2026)

- Der Bestell-Dropdown ist als `Smart Picker` aufgewertet (groesseres Touch-Ziel, klarerer Fokuszustand, staerkere Typo).
- Nach der Auswahl erscheint eine kompakte Vorschaukarte mit Gericht, Kontextdaten und Aktion `Bestellung oeffnen`.
- Auto-Befuellung ist jetzt schonender: Betreff/Abholnummer werden nur automatisch gesetzt, wenn Felder leer sind (oder vorher automatisch gesetzt wurden).
- Der Senden-Button zeigt einen app-aehnlichen `bereit`-Zustand erst dann, wenn Betreff und Nachricht vorhanden sind.

## Update: Footer-Leak Fix (09.05.2026)

- Die Wochenplan-Footer-Leiste (`0 Gerichte inserieren / Woche jetzt inserieren`) wird im Kundenkontext strikt ausgeblendet.
- Sichtbarkeit des Week-Footers ist jetzt auf `body.provider-mode.week-footer-visible` begrenzt; in Customer-/Support-Views greift ein harter Hide-Guard.

## Update: Hard Kill fuer Footer-Leak (09.05.2026)

- Beim Oeffnen von `Support`/Kunden-Rechtsseiten setzt `showLegalPage(...)` den `weekViewFooter` zusaetzlich per Inline-Style auf `display:none !important`.
- Gleichzeitig werden `provider-mode`, `provider-week-active` und `week-footer-visible` im Body entfernt, damit die Leiste nicht mehr in den Kundenfluss hineinleakt.

## Phase 5 – Applike Support (UI/UX Relaunch, 26.05.2026)

- **Scope:** Nur UI auf `#v-support`; Submit- und FAQ-Routing unverändert.
- **Klassen:** `phase5-applite` auf der View; Formular-Styles im Phase-5-Block in `app/style.css`.
- **Copy:** Kürzere Labels („FAQ“, „Kontakt“, „Senden“), kompaktere Select-Optionen, weniger Hilfstext.
- **Layout:** Große Touch-Felder (min. 60px), Karten-Surface, ruhiger Abstand; keine Tabellen-Optik.
