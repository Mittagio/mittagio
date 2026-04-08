# Warenkorb / Mittagsbox

**View-ID:** `v-cart` · Kundenseite  
**Stand:** 06.04.2026

---

## Konzept

Die Mittagsbox unterstützt mehrere Anbieter in einer gemeinsamen Bestellung.  
Jeder Anbieter hat seine eigene Abholzeit, der Checkout bleibt ein einziger Zahlungsvorgang.

## Aufbau

- Gruppierung nach Anbieter in `v-cart`
- Pro Anbieter:
  - Gerichte mit Mengensteuerung
  - eigene Abholzeit-Chips
- Globale Verzehrart für den Checkout:
  - 🍴 Vor Ort
  - 🔄 Mitnehmen
- CTA: „Jetzt bezahlen“

## Checkout-Logik

- **Single-Provider:** Abholzeit kann im Checkout gesetzt/angepasst werden.
- **Multi-Provider:** Abholzeiten werden in der Mittagsbox pro Anbieter gesetzt und im Checkout nur als Zusammenfassung angezeigt.
- Checkout startet nur, wenn für jeden betroffenen Anbieter eine Abholzeit vorhanden ist.
- Beim Erstellen der Orders wird die jeweilige Anbieter-Abholzeit je Order gespeichert (`pickupTime` / `abholzeit` / `etaTime`).
- CTA in der Mittagsbox: **„Jetzt bezahlen“** (führt in den Checkout).
- Payment-CTA im Checkout: **„JETZT BEZAHLEN“**.
- Beim Start der Zahlung wird der Button gesperrt (`Zahlung wird gestartet...`), um Doppelklicks und doppelte Orders zu verhindern.
- Return-URLs nutzen Query-Handling (`success=1` / `cancel=1` + `orderId`), damit Success/Cancel robust im Client verarbeitet wird.
- Bei Abbruch werden offene `PAYMENT_PENDING`-Orders pro Session bzw. `orderId` auf `CANCELLED` gesetzt.

## Regeln

- Kundenseite
- Ein Checkout, mehrere Anbieter-Orders
