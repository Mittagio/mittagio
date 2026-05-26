# Admin

**View-ID:** `v-admin` · Intern  
**Stand:** 31.03.2026

---

## Konzept

Admin-Dashboard: KPIs, Inserats-Feed, Buchhaltung, CSV-Export und Pflege-Entry für die Anbieterbasis. Nur mit Flag (?admin=1).

## Aufbau

- KPIs: Aktive Inserate, etc.
- Anbieterbasis-Karte (Datenquelle + Reload)
- Inserats-Feed
- Buchhaltungstabelle

## Regeln

- Kein Zugang für normale Nutzer
- Anbieteradressen liegen in `app/data/provider-directory.csv` (nicht in MD, nicht hart im Script).

## Anbieter-Datenbasis (Live)

- **Source of truth:** `app/data/provider-directory.csv`
- **Import-Flow:** `script.js` lädt CSV per `fetch`, normalisiert (`parseProviderDirectoryCsv`) und speichert in `localStorage` (`LS.providerDirectory`).
- **Versionierung:** `REAL_PROVIDER_DIRECTORY_VERSION` steuert, wann ein Refresh der Basis erzwungen wird.
- **Keine Testadressen:** Beim Live-Refresh wird die lokale Liste auf den CSV-Bestand zurückgesetzt (statt zu mergen). Testeinträge werden dadurch entfernt; bestehende Login-E-Mails passender Live-Anbieter bleiben erhalten.
- **Admin-Hook:** In `v-admin` zeigt die Karte die Anzahl, Vorschau und bietet „Anbieterbasis neu laden“ (`window.refreshProviderDirectory()`).
- **Test-Login-Mails:** Falls `LoginEmail` in der CSV fehlt, wird pro Anbieter automatisch eine eindeutige Test-Mail erzeugt (`name.ort@mittagio-test.de`).

## Test-Seed: 3 Gerichte × 7 Tage

- **Ziel:** Für Last-/UI-Tests werden für jeden Anbieter aus der Live-Basis automatisch Tagesgerichte erzeugt.
- **Umfang:** `3` aktive Gerichte pro Anbieter und Tag für die nächsten `7` Tage (bei 200 Anbietern = `4.200` Inserate).
- **Datenpfad:** Einmaliger, versionierter Seed in `app/script.js` (`MASS_PROVIDER_WEEK_SEED_VERSION`), gespeichert in `LS.offers` und `LS.week`.
- **Reale Adressen:** Der Seed nutzt die echten `PLZ/Ort/Straße` aus der Anbieterbasis und erzeugt Marker-Koordinaten pro Stadt für Karten-/Radius-Tests.
- **Testkunden:** Beim Seed werden zusätzlich mehrere Testkundenprofile pro Stadt erzeugt (`LS.massTestCustomers`), z. B. `kunde.stuttgart@mittagio-test.de`.
- **Duplikatschutz:** Alte Seed-Einträge mit derselben Source werden vor Neuaufbau entfernt; normale manuelle Daten bleiben erhalten.
- **Manueller Trigger:** `window.seedAllProvidersTestWeek()` erzwingt den Seed erneut für Testzwecke.
- **Aktivierung Testkunde:** `window.activateMassTestCustomer(<id>)` setzt Standort/Radius auf das gewählte Testprofil.

## Anbieter-CRUD im Admin

- **Create:** Button „Neuer Anbieter“ öffnet ein Formular (Name, Login-E-Mail, Straße, PLZ, Ort) und speichert direkt in `LS.providerDirectory`.
- **Read:** Vorschau-Liste zeigt bis zu 25 Anbieter, sortiert nach Ort/Name.
- **Update:** Pro Eintrag „Bearbeiten“ lädt den Datensatz in das Formular und überschreibt den Eintrag beim Speichern.
- **Delete:** Pro Eintrag „Löschen“ mit Confirm-Dialog.
- **CSV-Export:** Button „Anbieter-CSV exportieren“ erzeugt eine aktuelle Datei aus dem verwalteten Bestand (`...;LoginEmail`).

## Filter & Suche (Admin)

- **Freitextsuche:** Feld sucht live in `Name`, `Straße`, `PLZ`, `Ort` und `address`.
- **Ortsfilter:** Dropdown mit dynamisch erzeugter Ortsliste aus der aktuellen Anbieterbasis.
- **Reset:** Button „Zurücksetzen“ leert Such- und Ortsfilter sofort.
- **Count-Anzeige:** Badge zeigt `gefilterte Treffer / Gesamtbestand` für schnelle Pflege bei großen Listen.

## Mini-Checkliste (Live-Tag)

- **UI-Hinweis im Admin:** In der Anbieterbasis-Karte gibt es eine sichtbare „Freischalten & Zugangsdaten senden“-Checkliste.
- **Ablauf kompakt:** Anbieter suchen/anlegen → `Login E-Mail` setzen → Freischaltstatus im Login prüfen → Zugangsdaten senden.
- **Ziel:** Schnell, reproduzierbar und ohne vergessene Freischaltung im Rollout.

## Dashboard-Ausbau (Verwaltung)

- **Erweitertes KPI-Board:** Zusätzlich zu Umsatz/Inseraten/Abholnummern jetzt auch `Anbieter gesamt` und `Freigeschaltet`.
- **Freischaltungsfortschritt:** Separate Progress-Karte mit Verhältnis `freigeschaltet / gesamt` und Prozent-Progressbar.
- **7-Tage-Umsatz:** Kompakte Verlaufskarte mit Tagesbalken und Betrag je Tag.
- **Systemaktivität:** Chronologische Kurzliste aus Buchungen und Live-Inseraten.
- **Freischaltstatus pro Anbieter:** Jeder Eintrag zeigt Badge `Freigeschaltet` oder `E-Mail fehlt` für schnelle operative Pflege.

## Operations-Boost (Freischaltung offen)

- **Tab-Filter:** In der Anbieterbasis gibt es `Alle Anbieter` und `Freischaltung offen`.
- **Open-Backlog Fokus:** Tab `Freischaltung offen` blendet alle bereits freigeschalteten Anbieter aus.
- **1-Klick-Export offen:** Button `Nur offene Freischaltungen exportieren` erzeugt eine CSV nur mit Datensätzen ohne Login-E-Mail.

## Pre-Created Anbieter Login

- **Verknüpfung:** Login läuft über `loginEmail` aus der Anbieterbasis.
- **Gatekeeper:** Nur vorangelegte Anbieter mit gesetzter Login-E-Mail können sich anmelden (außer Demo-Account).
- **Adress-Führung:** Nach Login wird das Profil mit dem vorangelegten Anbieter-Eintrag verknüpft (`linkedProviderDirectoryId`).
- **Login-Precheck:** Im Anbieter-Login wird sofort angezeigt, ob die eingegebene E-Mail freigeschaltet ist.
- **Login-Button-Lock:** `Einloggen` bleibt deaktiviert, bis die E-Mail in der Anbieterbasis freigeschaltet ist.
- **Testpasswort:** Für freigeschaltete Testanbieter gilt Passwort `admin` (Demo-Account bleibt separat).
