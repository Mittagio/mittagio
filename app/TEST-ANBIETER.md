# Anbieterseite – Testplan (Meine Küche)

Vollständige Checkliste zum manuellen Testen der Anbieter-App. Alle Punkte der Reihe nach prüfen.

---

## A) Einstieg & Login

- [ ] **A1** Kunde wechselt ins Anbieter-Portal (z. B. Profil → „Zum Anbieter-Portal“ oder entsprechender Einstieg).
- [ ] **A2** Anbieter-Login-Seite erscheint (E-Mail, Passwort, „Einloggen“, „Zurück“).
- [ ] **A3** Demo-Login: beliebige E-Mail/Passwort (z. B. `test@test.de` / `123`) → Login funktioniert.
- [ ] **A4** Nach Login: Wechsel in **Provider-Modus**, Bottom-Nav zeigt **Küche | Abholungen | Wochenplan | Kochbuch | Profil**.
- [ ] **A5** Erste sichtbare Seite ist **Dashboard (Meine Küche)** – **kein leerer Bildschirm oben**; Header „Meine Küche“ und KPIs sind sofort sichtbar.

---

## B) Dashboard (Meine Küche)

- [ ] **B1** **Header:** Icon, „Meine Küche“, Refresh-Button sichtbar; Klick auf Refresh lädt Daten (ggf. Toast „Daten aktualisiert“).
- [ ] **B2** **3 KPIs:** „Tagesessen“, „Abholungen“, „Umsatz heute“ mit Zahlen; Klick auf Abholungen → Wechsel zu Abholungen; Klick auf Umsatz → Finanzen.
- [ ] **B3** **Aktive Angebote:** Bereich „Aktive Angebote“ mit Button „+ Gericht erstellen“ und ggf. Badge „Online“. Wenn Angebote da: Karten mit Gericht, Status, Zeit.
- [ ] **B4** **Wochenplan-Pills (7 Tage):** Horizontale Leiste mit Heute / Do 12. / Fr 13. / …; **Status-Punkte:** Grün = Tag hat Online-Angebot, Blau = nur Geplant, Grau = kein Eintrag.
- [ ] **B5** **Pill-Klick:** Nur Tag auswählen (Liste unten wechselt), **kein** sofort geöffnetes „Gericht hinzufügen“-Sheet.
- [ ] **B6** **Gericht-Karten (unter Pills):** Bei ausgewähltem Tag werden Online-Gerichte (grüner Rand, „● Online“) und Geplante (gestrichelt, „Geplant“) angezeigt.
- [ ] **B7** **Direkt-Edit:** Klick auf eine **Online**-Karte → Inserats-Bearbeitungsflow (startListingFlow); Klick auf **Geplant**-Karte → Wochenplan-Sheet zum Bearbeiten.
- [ ] **B8** **Leerer Tag:** Wenn gewählter Tag keine Einträge hat: „Noch nichts geplant“, Button „Jetzt Woche planen“, Link „Zum Wochenplan“, plus **Reaktivierungs-Tipp** (blaue Karte).
- [ ] **B9** **Reaktivierungs-Tipp (Stolz-Archiv):** Label z. B. „Dein Erfolg vom letzten Donnerstag“ oder „Lücke am [Wochentag]“, Gerichtsname als Vorschlag, ggf. „✅ X Portionen verkauft“, Button „JETZT“ → startListingFlow mit diesem Gericht für den Tag (kein leeres Sheet).
- [ ] **B10** **Weiteres Gericht planen:** Button „Weiteres Gericht planen“ öffnet Wochenplan-Sheet für den ausgewählten Tag.
- [ ] **B11** **Zum Wochenplan:** Link „Zum Wochenplan“ wechselt zur Wochenplan-Ansicht (KW-Board).

---

## C) Abholungen

- [ ] **C1** Tab „Abholungen“ → Ansicht „Abholungen“ mit Header, PDF- und E-Mail-Buttons.
- [ ] **C2** Keine Reste des Wochenplan-UI (kein offenes Sheet, keine Snackbar, kein Move-Overlay).
- [ ] **C3** Bei Bestellungen: Liste/Grid mit Abholnummern; bei leer: „Noch keine Abholungen“ o. Ä.
- [ ] **C4** Überall Begriff **Abholnummer** (nicht „Abholcode“ oder „Ticket“).

---

## D) Wochenplan (KW-Board)

- [ ] **D1** Tab „Wochenplan“ → Kalender-/Slots-Ansicht mit Tagen und Gerichten.
- [ ] **D2** Klick auf Slot (live) → Bearbeitungsflow; Klick auf Slot (Entwurf/Geplant) → Wochenplan-Sheet.
- [ ] **D3** Action-Leiste (Drucken & Teilen): schlank, 44px Höhe, Inhalt nicht verdeckt (genug padding-bottom im Scroll-Bereich).
- [ ] **D4** **3 Säulen** in der Darstellung: 🍴 **Vor Ort möglich**, 🧾 **Abholnummer aktiv**, 🔄 **Mehrweg verfügbar** (exakte Formulierung).

---

## E) Kochbuch

- [ ] **E1** Tab „Kochbuch“ → Kategorie-Pills (Alle, Fleisch, Eintopf, Snack, Vegetarisch), Magazin-Karte (eine Karte, ‹ ›), Bar BEARBEITEN | WOCHENPLAN | AUSWÄHLEN (siehe docs/KOCHBUCH_KONZEPT.md).
- [ ] **E2** Gericht wählen → Auswahl markiert; **Haupt-Button** zeigt „**Jetzt für 4,99 € inserieren**“ (Preis immer sichtbar).
- [ ] **E3** Klick „Jetzt für 4,99 € inserieren“ → Flow zum Inserieren (Datum, Zeit, ggf. Abholnummer) → gelber Button mit Preis.
- [ ] **E4** Kein anderer Begriff für den Zahlungs-Button (z. B. nicht nur „Jetzt inserieren“ ohne Preis).

---

## F) Profil (Anbieter)

- [ ] **F1** Tab „Profil“ → Anbieter-Profil mit Präferenzen, Zeiten, Abholnummer-Toggle, Mehrweg, Vor Ort.
- [ ] **F2** Kachel „Inserat“ / Live schalten: Button „**Jetzt für 4,99 € inserieren**“.
- [ ] **F3** Überall **Abholnummer** (nicht Abholcode/Ticket); 3 Säulen-Labels wie unter D4.

---

## G) Texte & Labels (Regelkonformität)

- [ ] **G1** **Abholnummer:** Überall einheitlich „Abholnummer“ (inkl. Bestellungen, Profil, Hilfe).
- [ ] **G2** **3 Säulen:** Nur folgende Formulierungen: „🍴 Vor Ort möglich“, „🧾 Abholnummer aktiv“, „🔄 Mehrweg verfügbar“ (inkl. Tooltips/Pillar-Labels).
- [ ] **G3** **Monetarisierung:** Primäre Inserat-Buttons zeigen immer den Preis: „Jetzt für 4,99 € inserieren“.

---

## H) Wichtige Flows (Kurztest)

- [ ] **H1** **Neues Gericht:** Dashboard → „+ Gericht erstellen“ oder Kochbuch → „Jetzt für 4,99 € inserieren“ → Flow durchspielen bis „Live“ → zurück im Dashboard, neues Gericht sichtbar.
- [ ] **H2** **Reaktivierung (Stolz-Archiv):** Tag ohne Eintrag wählen (graue Pill) → Reaktivierungs-Karte mit Vorschlag → „JETZT“ → Flow mit vorbelegtem Gericht & Datum → Abschluss → Dashboard, gewählter Tag hat blauen Punkt (Geplant) oder nach Aktivierung grünen (Online).
- [ ] **H3** **Direkt-Edit aus Dashboard:** Tag mit Online-Gericht wählen → Klick auf grüne Karte → Bearbeitungsflow; Tag mit Geplant-Gericht → Klick auf gestrichelte Karte → Wochenplan-Sheet.

---

## Kurzfassung (Schnellcheck)

1. Login → Dashboard **ohne leeren Screen oben**.
2. Pills: Grün/Blau/Grau, Klick nur Tag wechseln.
3. Karte tippen → Direkt-Edit (Online = Flow, Geplant = Sheet).
4. Leerer Tag → Reaktivierungs-Tipp mit „JETZT“ → Flow mit Gericht.
5. Überall: **Abholnummer**, 3 Säulen exakt, Button **„Jetzt für 4,99 € inserieren“**.

---

*Stand: Testplan Anbieterseite – alle Bereiche (A–H).*
