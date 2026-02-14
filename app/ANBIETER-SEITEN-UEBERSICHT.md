# Anbieterbereich – Übersicht jeder Seite

Kurze Zusammenfassung jeder Ansicht im Anbieterbereich der Mittagio-App.

---

## 1. **Anbieter-Login** (`v-provider-login`)

- **Zweck:** Einloggen als Gastronom.
- **Inhalt:** E-Mail- und Passwort-Felder, Button „Einloggen“, „Zurück“. Accordion „Hilfe? Demo-Zugang“ (beliebige E-Mail/Passwort zum Testen).
- **Navigation:** Nach Login → Dashboard (Meine Küche). Zurück → Kundenbereich.

---

## 2. **Onboarding (alt)** (`v-provider-onboarding`)

- **Zweck:** Älterer 5-Schritte-Onboarding-Flow.
- **Schritte:** (1) Betriebsname, (2) Adresse (Straße, PLZ, Stadt + Pin), (3) Essenszeiten (Start/Ende), (4) Logo optional, (5) Zusammenfassung.
- **Hinweis:** Es gibt einen neueren „Speed-Einstieg“ über `v-provider-onboarding-entry`.

---

## 3. **Onboarding Einstieg** (`v-provider-onboarding-entry`)

- **Zweck:** Schneller Einstieg – „In unter 30 Sekunden live“.
- **Inhalt:** Headline „Sofort verkaufen. Ohne Abo & Vertrag.“, 4,99 € pro Inserat. Feld „Was bietest du heute an?“ (z. B. Kürbissuppe), Buttons „Inserat starten“ und „Bereits Konto? Login“.
- **Navigation:** Inserat starten → Erstes Gericht; Login → Anbieter-Login.

---

## 4. **Onboarding – Erstes Gericht** (`v-provider-onboarding-first-dish`)

- **Zweck:** Erstes Gericht anlegen (Name, Preis, Kategorie, Beschreibung, Abholzeiten, Foto).
- **Inhalt:** Gerichtname, Preis (+/−), Kategorie (Fleisch/Veggie/Vegan), Beschreibung, Zeit „Von“/„Bis“, Kamera/Galerie für Foto. Zurück / Weiter.
- **Navigation:** Weiter → Signup oder Business (je nach Flow); Zurück → Einstieg.

---

## 5. **Onboarding – Signup** (`v-provider-onboarding-signup`)

- **Zweck:** Konto erstellen (E-Mail, Passwort) um das Inserat zu sichern.
- **Inhalt:** E-Mail, Passwort, Hinweis „Inseratsgebühr fällt erst bei Veröffentlichung an“. Buttons „Login“ und „Konto erstellen“.
- **Navigation:** Konto erstellen → Business; Login → Anbieter-Login.

---

## 6. **Onboarding – Dein Betrieb** (`v-provider-onboarding-business`)

- **Zweck:** Betriebsdaten für den Standort erfassen.
- **Inhalt:** Betriebsname, Stadt/Adresse, Hinweis „Später im Profil verfeinern“. Zurück / Weiter.
- **Navigation:** Weiter → Vorschau; Zurück → vorheriger Schritt.

---

## 7. **Onboarding – Vorschau** (`v-provider-onboarding-preview`)

- **Zweck:** So sieht das Gericht für Kunden aus.
- **Inhalt:** „Vorschau-Modus“-Hinweis, dynamische Gerichtskarte (`onboardingPreviewCard`). Buttons „Bearbeiten“ und „Fertigstellen“.
- **Navigation:** Fertigstellen → Dashboard (Meine Küche); Bearbeiten → zurück im Flow.

---

## 8. **Meine Küche (Dashboard)** (`v-provider-home`)

- **Zweck:** Haupt-Dashboard nach dem Login.
- **Inhalt:**
  - **Header:** Icon + „Meine Küche“, Refresh-Button.
  - **3 KPIs:** Meine Tagesessen (klickbar → scrollt zu Aktive Angebote), Meine Bestellungen (→ Abholungen), Umsatz (→ Finanzen).
  - **Aktive Angebote:** Überschrift, „Gericht erstellen“-Button, Badge „Online“, Liste aktiver Inserate.
  - **Mein Kochbuch:** Kurzbeschreibung, 3 Kacheln (letzte Gerichte) + „X Gerichte“ (→ Kochbuch).
  - **Dein Wochenplan:** Kurzbeschreibung, Karte mit Tagen + Inhalten.
  - **Empty State:** „Bereit für Gäste?“ + „Jetzt Gericht erstellen“, wenn noch nichts da ist.
- **Navigation:** Über Tab-Leiste zu Abholungen, Wochenplan, Kochbuch, Profil.

---

## 9. **Abholungen** (`v-provider-pickups`)

- **Zweck:** Bestellungen/Abholungen verwalten („Theken-Ansicht“).
- **Inhalt:** Header mit Icon „Abholungen“, Buttons PDF + E-Mail. Filter-Tabs (dynamisch). Subheader-Status. Entweder leere Ansicht „Noch keine Abholungen“ oder Grid/Liste der Abholungen.
- **Navigation:** Tab-Leiste; PDF/E-Mail für Küchenliste.

---

## 10. **Wochenplan** (`v-provider-week`)

- **Zweck:** 4-Wochen-Planung, Gerichte pro Tag, Entwürfe aktivieren.
- **Inhalt:** Header „Wochenplan“, Untertitel „Deine Woche · Gerichte planen“, Button „Fertig“. Horizontale Datumsleiste (`weekDays`), scrollbare Tagesliste (`weekList`), Bereich für Aktionen (`weekThumbZone`): „Jetzt für 4,99 € aktivieren“, Drucken, Teilen, Aktualisieren.
- **Navigation:** Tab-Leiste; Fertig schließt Bearbeitung.

---

## 11. **Mein Kochbuch** (`v-provider-cookbook`)

- **Zweck:** Alle Gerichte verwalten, nach Kategorie filtern, durchsuchen, sortieren, neu anlegen.
- **Inhalt:** Header „Mein Kochbuch“ + Untertitel „Deine Umsatz-Könige“, Suchfeld, Sortierung (🕒/AZ/€↑/€↓). **Oben: Kategorie-Pills** (Alle, Vegetarisch, Vegan, Fisch, Mit Fleisch). Bestseller-Strip (horizontal), darunter 1-Spalte Karten. Sticky Bottom-Bar: Suche, Neues Gericht, Sortieren; bei Auswahl: Bearbeiten, Wochenplan, Auswählen.
- **Navigation:** Bottom-Nav; Gericht antippen → Auswahl, dann Bearbeiten / Wochenplan / Auswählen (4,99‑€-Sheet).

---

## 12. **Mein Profil** (`v-provider-profile`)

- **Zweck:** Profil-Schaufenster, Einstellungen, Abmelden.
- **Inhalt:**
  - **Header:** Logo, Name „Mein Profil“, Zahnrad (→ Einstellungen scrollen).
  - **Kachel 1:** „Mittags-Inserat schalten“ 4,99 €, „Kein Abo. Kein Vertrag.“
  - **Kachel 2:** „Digitale Abholnummer“ 0,89 €, „Weniger Chaos, mehr Zeit“.
  - **Einstellungs-Menü (Apple-Style #F2F2F7):** Meine Daten, Präferenzen & Zeiten, Zahlung & Abrechnung, FAQ & Support (jeweils mit Chevron).
  - **Abmelden-**Button (rot umrandet).
- **Sub-Seiten (über Menüzeilen):**
  - **Meine Daten:** Betriebsdaten (Floating Labels), Sicherheit (Passwort ändern), „Account dauerhaft löschen“.
  - **Präferenzen & Zeiten:** Mittagszeiten (Start/Ende, Wochentage), Toggles: Vor Ort essen, Mehrweg, Abholnummer, Allergene.
  - **Zahlung & Abrechnung:** Zahlungsmethode (Stripe-Status), Button „Stripe Dashboard“, Rechnungsverlauf → **Rechnungsarchiv**.
  - **FAQ & Support:** Häufige Themen (Kacheln), dann Support/Kontakt.
- **Navigation:** Tab-Leiste; Zahnrad scrollt zu Einstellungen; Zeilen öffnen Sub-Seiten; Rechnungsarchiv → Billing-View.

---

## 13. **Finanzen & Abrechnung** (`v-provider-billing`)

- **Zweck:** Kontodaten, Tagesumsatz, Abrechnungsliste mit PDF.
- **Inhalt:** Header „Finanzen & Abrechnung“, Zurück-Button. **Karte 1:** Meine Kontodaten (Status „Hinterlegt“, Kartenvorschau, „Zahlungsmittel ändern“). **Karte 2:** Tagesumsatz heute (Betrag, Liste heutiger Umsätze oder „Noch keine Umsätze heute“). **Karte 3:** Meine Abrechnungen – Liste mit Datum, Posten, Betrag, PDF-Button pro Zeile; oder „Noch keine Abrechnungen“.
- **Navigation:** Zurück → Profil; PDF-Button → Rechnungs-Druckansicht (Als PDF speichern).

---

## 14. **Anbieter-Detail (öffentlich)** (`v-provider-detail-public`)

- **Zweck:** Öffentliche Anbieter-Seite für Kunden (aus Entdecken angezeigt).
- **Inhalt:** Header mit Zurück, Anbietername, Favoriten-Button. Hero-Karte: Logo, Name, Adresse, Buttons „Route“ (Google Maps) und „Teilen“. Sektion „Tagesessen heute“ (LIVE-Badge), Sektion „Wochenplan“ mit Angeboten.
- **Hinweis:** Gehört inhaltlich zum Kundenbereich (Entdecken), wird aber technisch als View mit `v-provider-detail-public` geführt.

---

## Tab-Leiste (Bottom Nav)

- **Küche** (provider-home)  
- **Abholungen** (provider-pickups)  
- **Wochenplan** (provider-week)  
- **Kochbuch** (provider-cookbook)  
- **Profil** (provider-profile)

Session-Check: Beim Öffnen von Home, Abholungen, Woche, Kochbuch, Profil, Rechnungsarchiv und Billing wird `checkSessionValidity()` ausgeführt (inkl. Ein-Session-Limit).
