# Gericht-Detail

**Sheet** (Tap auf Discovery-Kachel) · Kundenseite  
**Stand:** 07.04.2026

---

## Konzept (Discovery-Logic Sync)

Die Detailansicht folgt exakt der visuellen Sprache der Discovery-Kachel (Marketplace-Stil): Hero-Bild mit USP-Overlay, Titel/Preis-Zeile, Anbieter, kompakte Allergene, optionale Extras und ein symmetrischer Airbnb-Footer.

## Aufbau

- Hero-Bild mit Hand-Cut-Radius, USP-Overlay oben rechts (Abholnummer + Gehzeit).
- Titel (Serif, Bold) links und Preis (Sans, Bold) rechts in einer Zeile.
- Anbieterzeile in Grau mit dezenter Aktion "Alle Gerichte" (ohne Chevron-Link-Optik).
- Allergene als kompakte Pills (A, C, G) inkl. Erle-Symbol.
- Extras-Modul nur bei vorhandenen Extras; Auswahl aktualisiert den Live-Preis im CTA.
- Footer mit drei gleich hohen Controls (52px): Favorit, Teilen, gelber Haupt-CTA.
- Tap auf die Adresse öffnet ein Distanz-Sheet mit `Zu Fuß` / `Auto` (ca.-Werte) und CTA `Route starten`.
- Distanz-Sheet zeigt Status (`Ca.` / `Live`) plus `Zuletzt aktualisiert`.
- Unter dem CTA steht ein Ankunftshinweis (`Ankunft ca. HH:MM Uhr`), wenn eine Distanz verfügbar ist.

## Regeln

- Keine 3-Säulen-Leiste im Detail-Sheet.
- USP-Overlay bleibt neutral (kein Gelb als Hintergrund, dunkler Text, graue Icons).
- Footer ist reinweiß, obere Trennlinie `#ebebeb`, Safe-Area bündig.
- CTA-Text enthält den Live-Preis: `In meine Box • <Preis>`.
- Preis wird nur noch an zwei Stellen gezeigt: Titelzeile + CTA (kein drittes Preis-Badge im Bild).
- Distanz-Doppelanzeige unter dem Anbieter entfällt; Zeit bleibt ausschließlich im USP-Overlay.
- Allergene-Overlay ist mobile-safe: heller Blur-Backdrop statt Vollschwarz, Close per X **und** Tap auf Backdrop, keine eingefrorene Interaktion im Hintergrund.
- Distanz-Sheet ist Google-ready: lokale Schätzung jetzt, später optional `window.getGoogleTravelEstimates(...)` für Live-Routing.
- Distanz-Sheet nutzt die oberen Kacheln (`Zu Fuß` / `Auto`) direkt als Moduswahl (Default: `Zu Fuß`) und startet Google Maps mit passendem `travelmode`.
- Kachel-Auswahl ist app-like umgesetzt (klarer Active-State, keine Browser-Button-Optik, direkte Auswahl ohne extra Schalter unterhalb).
- Öffnen des Distanz-Sheets triggert leichtes Haptic-Feedback.
