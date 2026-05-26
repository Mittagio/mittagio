# Checkout

**View-ID:** `v-checkout` · Kundenseite  
**Stand:** 20.04.2026

---

## Konzept

Kasse: Name, Abholzeit, Zahlung (Stripe/Demo). Abholnummer-Option 0,89 €.

## Aufbau

- Name, E-Mail (optional)
- Abholzeit
- Bestellübersicht
- Zahlungs-Button
- App-like Checkout-Card mit klaren Sections (kein Formular-Look)
- Kein separater Zurück-Button oben links; Navigation bleibt über Bottom-Flow konsistent

## Stripe Checkout Session (live)

- Zahlungsstart über `POST /.netlify/functions/create-checkout-session`
- Erfolgs-Redirect enthält `session_id`; Abbruch-Redirect enthält `cancel=1`
- Nach Return wird die Session serverseitig verifiziert über `POST /.netlify/functions/verify-checkout-session`
- Orders werden nur bei bestätigtem Stripe-Status `paid + complete` auf `PAID` gesetzt
- Für Mehranbieter-Checkout werden alle `orderIds` als Metadata in die Session geschrieben und beim Return zugeordnet

## Netlify-Umgebung

- Pflicht: `STRIPE_SECRET_KEY` (nur Server, niemals im Client)
- Optional lokal: mit Netlify CLI (`netlify dev`) testen, damit Functions unter `/.netlify/functions/*` verfügbar sind
- Client nutzt `window.MITTAGIO_STRIPE.publishableKey` + `apiBase` für den Function-Call

## Fehlerverhalten

- Verifikation fehlgeschlagen oder nicht bezahlt: keine automatische `PAID`-Markierung, Rückführung zur Mittagsbox/Checkout
- Abgebrochene Zahlung setzt offene Orders auf `CANCELLED`

## Update: Responsive Summary + Verpackung (27.04.2026)

- Die obere Bestellübersicht ist nun robust gegen lange Gerichtsnamen (kein gequetschter Preisbereich, saubere Umbrüche).
- Verpackung wird im Checkout nicht mehr als große Button-Container-Auswahl geführt.
- Stattdessen zeigt der Checkout eine kompakte Verpackungs-Zusammenfassung; die eigentliche Auswahl erfolgt pro Gericht in der Mittagsbox.
- Mehrweg-Aufpreise aus der Mittagsbox werden in der Checkout-Gesamtsumme und im Zahlungsbetrag berücksichtigt.

## Update: Verzehrart-Textlogik (27.04.2026)

- Die Zeitfrage im Checkout ist jetzt kontextabhängig:
  - `Vor Ort` → **„Wann möchtest du essen?“**
  - `Mitnehmen` → **„Wann holst du dein Essen ab?“**
- Ziel: klare semantische Trennung zwischen Essenszeit und Abholzeit bei gleicher Slot-Logik.

## Regeln

- Kein Account nötig (Gast)
- Nach Zahlung → Abholnummer-Ansicht
