# Gericht-Detail

**Sheet** (Tap auf Discovery-Kachel) · Kundenseite  
**Stand:** 08.04.2026

---

## Konzept (Discovery-Logic Sync)

Die Detailansicht folgt exakt der visuellen Sprache der Discovery-Kachel (Marketplace-Stil): Hero-Bild mit USP-Overlay, Titel/Preis-Zeile, Anbieter, kompakte Allergene, optionale Extras und ein symmetrischer Airbnb-Footer.

## Aufbau

- Hero-Bild mit Hand-Cut-Radius, USP-Overlay oben rechts (Abholnummer + Gehzeit).
- Titel (Serif, Bold) als Fokuszeile ohne zusätzlichen Preis neben dem Titel.
- Anbieterzeile in Grau mit dezenter Aktion "Alle Gerichte" (ohne Chevron-Link-Optik).
- Allergene als kompakte Pills (A, C, G) inkl. Erle-Symbol.
- Extras-Modul nur bei vorhandenen Extras; Auswahl aktualisiert den Live-Preis im CTA.
- Footer mit drei gleich hohen Controls (52px): Favorit, Teilen, gelber Haupt-CTA.
- Tap auf die Adresse öffnet ein Distanz-Sheet mit `Zu Fuß` / `Auto` (ca.-Werte) und CTA `Route starten`.
- Distanz-Sheet zeigt Status (`Ca.` / `Live`) plus `Zuletzt aktualisiert`.
- Unter dem CTA steht kein zusätzlicher Ankunftshinweis mehr.
- Abholzeit wird im Info-Bereich nur angezeigt (Anbieter-Zeitfenster), ohne Auswahl im Detail-Sheet.

## Regeln

- Keine 3-Säulen-Leiste im Detail-Sheet.
- USP-Overlay bleibt neutral (kein Gelb als Hintergrund, dunkler Text, graue Icons).
- Footer ist reinweiß, obere Trennlinie `#ebebeb`, Safe-Area bündig.
- CTA-Text enthält den Live-Preis: `Zur Mittagsbox • <Preis>`.
- Preis wird im Detail-Sheet nur im CTA gezeigt (kein zusätzlicher Preis in der Titelzeile).
- Distanz-Doppelanzeige unter dem Anbieter entfällt; Zeit bleibt ausschließlich im USP-Overlay.
- Allergene-Overlay ist mobile-safe: heller Blur-Backdrop statt Vollschwarz, Close per X **und** Tap auf Backdrop, keine eingefrorene Interaktion im Hintergrund.
- Neben `Allergene` gibt es kein separates Info-Icon; Tap auf den gesamten Allergene-Block öffnet die Detailansicht.
- Distanz-Sheet ist Google-ready: lokale Schätzung jetzt, später optional `window.getGoogleTravelEstimates(...)` für Live-Routing.
- Distanz-Sheet nutzt die oberen Kacheln (`Zu Fuß` / `Auto`) direkt als Moduswahl (Default: `Zu Fuß`) und startet Google Maps mit passendem `travelmode`.
- Kachel-Auswahl ist app-like umgesetzt (klarer Active-State, keine Browser-Button-Optik, direkte Auswahl ohne extra Schalter unterhalb).
- Öffnen des Distanz-Sheets triggert leichtes Haptic-Feedback.
- Der Anbietername wird ohne nachgestelltes `>` angezeigt.
- Bei aktiven Angeboten in der Zukunft (morgen/übermorgen) lautet der Haupt-CTA `Jetzt vorbestellen!` statt `Angebot nicht mehr verfügbar`.
- Zeit-Auswahl erfolgt ausschließlich in der Mittagsbox/Checkout; im Gericht-Detail ist sie bewusst read-only.
- Zeitanzeige ist robust: bevorzugt `pickupWindow` des Angebots, sonst Anbieter-Zeitfenster, sonst Fallback `11:30 – 14:00`.
- Position der Zeitanzeige: direkt unter der Adresszeile in der Meta-Info (`#sInfoRow`) mit Uhr-Icon.
- Beim Öffnen der Gericht-Detailkarte wird der Hintergrund-Scroll konsequent gesperrt (Body/Root-Lock), damit nur die geöffnete Karte bzw. das Distanz-Sheet scrollt.
- In der Detailansicht steht bei der Adresse kein Map-Pin mehr.
- In der Zeile mit der Uhrzeit werden keine zusätzlichen Icons mehr angezeigt.
- `Allergene` ist typografisch leichter (nicht fett/keine aggressive Uppercase-Wirkung).
- Der Platzhalter-Strich (`–`) hinter `Allergene` wurde entfernt, wenn keine Kürzel vorliegen.
