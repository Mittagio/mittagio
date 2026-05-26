# Bestell-Erfolg

**View-ID:** `v-order-success` · Kundenseite  
**Stand:** 14.02.2026

---

## Konzept

Bestätigung nach erfolgreicher Zahlung. Abholnummer, „Kollegen bescheid geben“.

## Aufbau

- Erfolgs-Hinweis
- Abholnummer
- CTA: „Erledigt“, „Weiter einkaufen“

## Regeln

- Kundenseite

## Update: Phase 2 Relaunch (26.05.2026)

- Erfolgsseite nutzt weiterhin den Boarding-Pass-Fokus, jetzt mit harmonisierten Action-Abstaenden und zentraler Card-Aussteuerung.
- Zielbild bleibt: Code maximal im Fokus, aber konsistente visuelle Sprache zu Checkout und Mittagsbox.

## Update: Phase 3 Abholpass (26.05.2026)

- Boarding-Pass-Look mit Ticket-Notches, goldenem Code-Stage und sanfter Glow-Animation.
- Status-Badge „Bezahlt – bereit zur Abholung“, Abholnummer als dominanter Hero-Wert.
- Bottom-Nav wird im Erfolgsmoment ausgeblendet (`:has(#v-order-success.active)`), damit nichts vom Code ablenkt.
- Terminologie in der UI: **Abholnummer** (nicht „Abholcode“).
- Haptik beim Erscheinen nach erfolgreicher Zahlung.
