# Warenkorb / Mittagsbox

**View-ID:** `v-cart` · Kundenseite  
**Stand:** 08.04.2026

---

## Konzept

Die Mittagsbox unterstützt mehrere Anbieter in einer gemeinsamen Bestellung.  
Jeder Anbieter hat seine eigene Abholzeit, der Checkout bleibt ein einziger Zahlungsvorgang.

## Aufbau

- Header-Titel: `Deine Mittagsbox` (ohne vorangestelltes Icon)
- Gruppierung nach Anbieter in `v-cart`
- Pro Anbieter:
  - Gerichte mit Mengensteuerung
  - eigene Abholzeit-Chips im Anbieter-Fenster (`von–bis`, 15-Minuten-Takt), z. B. bei `11:30 – 13:30` nur Slots zwischen `11:30` und `13:30`
- Globale Verzehrart für den Checkout:
  - 🍴 Vor Ort
  - 🔄 Mitnehmen
- CTA: „Jetzt bezahlen“

## Checkout-Logik

- **Single-Provider:** Abholzeit kann im Checkout gesetzt/angepasst werden – ebenfalls nur im Anbieter-Fenster (`von–bis`).
- **Single-Provider UI:** Im Checkout erfolgt die Auswahl ausschließlich über die Zeit-Chips; `Andere Uhrzeit` ist ausgeblendet.
- **Time-Chips UX:** Aktiver Slot erhält einen klaren Premium-Active-State (kräftiges Gelb, stärkerer Kontrast, Shadow), damit die Auswahl sofort erkennbar ist.
- **Multi-Provider:** Abholzeiten werden in der Mittagsbox pro Anbieter gesetzt und im Checkout nur als Zusammenfassung angezeigt.
- **Abholzeit-Default:** Wenn für einen Anbieter noch keine Zeit gewählt wurde, wird die Startzeit des Angebots automatisch gesetzt.
- **Fensterlogik:** Nur Zeiten innerhalb des Angebotsfensters sind auswählbar; existiert ein gespeicherter Wert außerhalb des Fensters, wird er auf den ersten gültigen Slot korrigiert.
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
