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
  - 🛍️ Mitnehmen (`shopping-bag`)
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

## Update: Verzehrart nur einmal wählen (22.04.2026)

- Die Entscheidung für die Verzehrart bleibt in der Mittagsbox (`v-cart`) als primäre Auswahl.
- Im Checkout (`v-checkout`) wird die Verzehrart nur noch als Zusammenfassung angezeigt (kein zweites Primär-Toggle).
- Im Checkout gibt es stattdessen eine klare Änderungsmöglichkeit: **„In Mittagsbox ändern“** (Rücksprung zur Bearbeitung).
- Wenn „Vor Ort“ für die enthaltenen Angebote nicht möglich ist, wird automatisch auf „Mitnehmen“ korrigiert.
- Die Zusammenfassung ist als ruhige, app-like Pill gestaltet (Icon + Label): `🍴 Vor Ort` oder `🔄 Mitnehmen`.
- Mobile-Feinschliff: Auf sehr schmalen Screens (<381px) bricht der Änderungs-Button unter die Pill, damit kein gequetschtes Layout entsteht.
- Zusätzlicher Breakpoint (`381px–430px`): kompaktere Paddings/Typo für Pill + Änderungs-Button, damit die Checkout-Zeile auf kleineren Geräten ruhiger wirkt.

## Update: Checkout textärmer (22.04.2026)

- Die Info-Texte unter `JETZT BEZAHLEN` wurden entfernt (reduzierter, ruhiger Checkout).
- Feldlabels wurden verkürzt auf `Name` und `E-Mail` (statt erklärender Zusätze).
- Die Verzehrart im Checkout wurde auf Variante D vereinfacht: eine knappe Statuszeile (`Aktuell: Vor Ort/Mitnehmen`) plus kleiner `Ändern`-Link statt großer Pill-Komponente.
- Bei `Vor Ort` wird der Statuswert jetzt als kleine UI-Pill dargestellt (statt reinem Fließtext).
- Das Label `Zahlungsart` über dem Payment-Block wurde entfernt.
- Der Checkout-Header lautet jetzt `Bestellübersicht`.
- Im Summary-Container wurden die Anbieterzeile (`Bei: ...`) und der zusätzliche Titel `Bestellübersicht` entfernt.
- Der CTA in `v-cart` wurde von `Weiter zum Checkout` auf `Weiter zur Bezahlung` umbenannt.
- Micro-Feinschliff für ruhigere Wirkung: Verzehrart-Zeile kompakter/leichter (`Aktuell` dezenter, kleinere Vor-Ort-Pill, dezentere `Ändern`-Typo), weichere Trennlinie über `Gesamt` und kompaktere Eingabefelder (`Name`/`E-Mail`).

## Update: Scroll-Stabilität Mittagsbox (22.04.2026)

- `v-cart` hat einen stabilen, dedizierten vertikalen Scroll-Container im Kundenmodus.
- Der Inhaltsbereich (`.customer-main-wrap`) bleibt auch bei langen Warenkörben zuverlässig scrollbar (inkl. Safe-Area unten).

## Update: Mitnehmen-Icon (27.04.2026)

- Der Toggle `Mitnehmen` in der Mittagsbox nutzt jetzt ein eindeutigeres Takeaway-Symbol (`shopping-bag`) statt des bisherigen Recycling-Emojis.
- Ziel: bessere semantische Erkennbarkeit der Verzehrart „zum Mitnehmen“.

## Update: Mehrweg pro Gericht (27.04.2026)

- Mehrweg wird in der Mittagsbox jetzt **pro einzelnem Gericht** gewählt (nicht mehr nur global im Checkout).
- Die Auswahl ist als kompakte Quick-Chips umgesetzt: `Eigener Behälter` oder `Mehrweg +5 €`.
- Die Mehrweg-Auswahl erscheint nur bei Gerichten/Anbietern mit aktivierter Mehrweg-Unterstützung.
- Der Mehrweg-Aufpreis wird direkt in der Mittagsbox-Gesamtsumme berücksichtigt.

## Update: Verzehrart-Semantik für Zeiten (27.04.2026)

- Die Auswahl in der Mittagsbox (`Vor Ort` / `Mitnehmen`) steuert im Checkout die Formulierung der Zeitfrage.
- `Vor Ort` bedeutet Essenszeit vor Ort; `Mitnehmen` bedeutet Abholzeit.
- Dadurch bleibt die Logik für Nutzer klar, ohne zusätzliche Schritte im Flow.
