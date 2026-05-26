# Provider Login

**View-ID:** `v-provider-login` · Anbieterseite  
**Stand:** 31.03.2026

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
