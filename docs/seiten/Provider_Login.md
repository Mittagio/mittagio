# Provider Login

**View-ID:** `v-provider-login` · Anbieterseite  
**Stand:** 26.05.2026

---

## Konzept

Anmeldung für Anbieter mit Pre-Created-Freischaltung. E-Mail/Passwort bleibt, aber Login ist nur für vorangelegte Anbieter aktiv (Demo ausgenommen).

## Aufbau

- E-Mail, Passwort
- Precheck-Hinweis unter E-Mail (Freigeschaltet / Nicht freigeschaltet)
- Button „Anmelden“

## Regeln

- Anbieterseite, helles Layout
- Nicht freigeschaltete E-Mails werden vor dem Login visuell markiert.
- Freischaltung erfolgt zentral über Admin-Anbieterbasis (`loginEmail`).
- Button-Gate: `Einloggen` ist deaktiviert, solange die E-Mail nicht freigeschaltet ist (außer Demo).

## Phase 7 – Applike Login (26.05.2026)

- **Scope:** Nur Optik/Microcopy auf `#v-provider-login`; Freischaltungs- und Login-Logik unverändert.
- **Klassen:** `phase7-applite`.
- **Copy:** Titel „Login“, kürzerer Demo-Hinweis.
- **Layout:** Panel und Felder mit 52–56px Touch, 20px Card-Radius.
