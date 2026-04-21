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

## Regeln

- Kein Account nötig (Gast)
- Nach Zahlung → Abholnummer-Ansicht
