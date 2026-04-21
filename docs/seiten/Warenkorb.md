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
  - Gerichte mit kleinem Thumbnail links (44–52px) für schnellere Erfassung
  - Gerichte mit Mengensteuerung als kompakte Pill-Control (`- qty +`)
  - eigene Abholzeit-Chips im Anbieter-Fenster (`von–bis`, 15-Minuten-Takt), z. B. bei `11:30 – 13:30` nur Slots zwischen `11:30` und `13:30`
- Globale Verzehrart für den Checkout:
  - 🍴 Vor Ort
  - 🔄 Mitnehmen
- CTA: „Jetzt bezahlen“

## UI-Feinschliff (Stand 20.04.2026)

- Die Zeilen innerhalb eines Anbieter-Blocks nutzen eine Card-Row mit mehr vertikalem Abstand statt harter Tabellenoptik.
- Der Name bleibt primär, darunter wird der Einzelpreis als sekundäre Info angezeigt; der Gesamtpreis pro Zeile bleibt klar hervorgehoben.
- Mengensteuerung und Thumbnail sind touchfreundlich ausgerichtet, damit die Mittagsbox auf mobilen Geräten weniger kahl wirkt und schneller scannbar ist.

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

## Update: Scroll + Pull-to-Refresh

- `Mittagsbox` (`v-cart`) bleibt im Kundenmodus vertikal scrollbar; restriktive Empty-Scroll-Locks greifen dort nicht mehr.
- Pull-to-Refresh ist aktiv: Runterziehen im Hauptbereich der Mittagsbox triggert `renderCart()`.
- Nach Refresh wird die Scrollfähigkeit des Inhaltsbereichs erneut synchronisiert, damit lange und kurze Warenkörbe stabil bleiben.
