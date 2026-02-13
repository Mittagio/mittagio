# MITTAGIO – KONZEPT ZWISCHENSTAND
Stand: 2026-01-18 (Punkte 1–6 FINAL)

REGEL:
Alle 5–10 Schritte wird ein Text-Zwischenstand erstellt.
Diese Datei ist die verbindliche Referenz für Design, Code & Umsetzung.

================================
1. GRUNDPRINZIPIEN
================================
- Kein Abo
- Keine Laufzeit
- Keine Verträge
- Anbieter entscheidet alles selbst
- Button-geführt, keine Formulare
- Entscheidungen immer erst am Ende eines Flows

================================
2. ANBIETER-DASHBOARD (STRUKTUR)
================================
Bottom-Navigation:
- Home
- Abholungen
- Kochbuch
- Profil

Header:
- Anbieter-Logo links
- Zwei Aktionen:
  • Neues Inserat
  • Aus Kochbuch
- Header scrollt normal (nicht sticky)

================================
3. HOME / DASHBOARD-INHALT
================================
- Fokus immer auf „Heute“
- Wenn heute nichts aktiv:
  • Wochenvorschau anzeigen

Inserat-Kacheln:
- Bild (optional)
- Gerichtname
- Preis
- Abholzeit
- Status-Icons
- Zusatz (nur wenn zutreffend):
  „Online-Abholcode · Heute“

Klick auf Kachel:
- Öffnet Vorschau (Gästeansicht)
- Keine Werbetexte

Aktionen unter Vorschau:
- Bearbeiten
- Aktivieren / Deaktivieren
- Teilen
- Drucken

================================
4. TEILEN (FINAL)
================================
- Kein freier Text
- Vorgegebene Texte
- Icons: 🍽️ 💰 ⏰
- Kanäle:
  • WhatsApp
  • Instagram
  • Website
  • Link kopieren

WhatsApp-Text (Beispiel):
{{Anbietername}}
Heute zu Mittag: {{Gerichtname}}
💰 {{Preis}} €
⏰ {{Abholzeit}}
Powered by Mittagio

Keine App-Werbung im Share.
Plattform-Hinweis nur dezent.

================================
5. ABHOLUNGEN / ABHOLSCREEN (USP)
================================
- Zeigt nur online bezahlte Abholungen
- Standard-Sortierung: Zeitlich (früh → spät)
- Optional umschaltbar auf Code-Gruppen

Abgeholt:
- Bleibt sichtbar
- Grau / abgehakt

Undo:
- Snackbar (ca. 5 Sekunden)

Leerer Zustand:
- Text + Button „Mehr erfahren“ (FAQ)

================================
6. INSERAT-FLOW (IMMOSCOUT-LOGIK)
================================
Button-geführt, kein Formular.

Schritte:
1. Kategorie (Buttons)
2. Gericht aus Kochbuch oder neu
3. Preis (Preset-Buttons)
4. Abholzeit (aus Profil)
5. Extras & Mehrweg (optional)
6. Allergene (optional)
7. Foto (optional)

Abschluss:
- Inserat veröffentlichen
- Im Kochbuch speichern
- Zum Wochenplan hinzufügen

Erfolg:
- Bestätigung
- Button „Weiteres Inserat erstellen“

================================
7. WOCHENVORSCHAU (DASHBOARD)
================================
- Unten im Dashboard
- Horizontal swipebar (Daumenbedienung)
- Zeitraum dynamisch (z. B. nächste 5 Tage)

Pro Tag:
- Inserate des Tages
- Gleiche Interaktionen wie aktive Inserate

Leerer Tag:
- Text: „Keine Inserate geplant“
- Button: „Inserat hinzufügen“

================================
8. WOCHENKARTE ALS PDF (AUSHANG)
================================
Format:
- DIN A4 Hochformat
- Einheitliches Layout für alle Anbieter

Header:
- Anbieter-Logo
- Anbietername
- Abholzeit
- Titel: „Unsere Gerichte – nächste Tage“

Inhalt:
- Pro Tag:
  • Gerichtname
  • Preis
  • Abholzeit

Footer (immer gleich):
- Mittagio-Logo
- Slogan:
  „Dein Mittag! lokal · frisch · digital“
- QR-Code zur Anbieter-Wochenansicht
- Label: „Jetzt scannen“

================================
9. KOCHBUCH (ANBIETER)
================================
Header:
- Titel: „Mein Kochbuch“
- Subline:
  „Dein digitales Kochbuch. Immer griffbereit für deine Planung.“

Struktur (horizontal swipebar):
- Entwürfe
- Gerichte

Entwürfe:
- Bleiben für immer
- Aktionen:
  • Bearbeiten
  • Weiterführen

Gerichte:
- Alle jemals gespeicherten Gerichte
- Sortierung (Standard):
  • Zuletzt verwendet
- Weitere Sortierungen (Filter):
  • Alphabetisch
  • Preis aufsteigend
  • Preis absteigend

Pro Gericht:
- Gerichtname
- Bild (optional)
- Letzte Veröffentlichung
- Verkäufe:
  „X verkauft (Mittagio, gesamt)“

Suche:
- Suche nur nach Gerichtnamen
- Keine Zutaten- oder Keyword-Suche

Tap auf Gericht:
- Vorschau
- Aktionen:
  • Inserat erstellen
  • Bearbeiten
  • Drucken

================================
ENDE DES ZWISCHENSTANDS
================================

MITTAGIO – KONZEPT ZWISCHENSTAND
Punkte 1–8 FINAL
Stand: 2026-01-18

==============================
PUNKT 7 – ANBIETER-PROFIL (FINAL)
==============================

Profil-Aufbau (App-like, Vinted-Style):

Kopfbereich:
- Rundes Logo
- Anbietername
- Ort
- Abholzeit (Chip)
- Button: Profil bearbeiten

Row-Gruppen:

1. Profil & Betrieb
- Profil bearbeiten
- Meine Abrechnungen

2. Aktionen
- Angebot teilen
- Wochenkarte als PDF

3. Hilfe
- FAQ
- Support kontaktieren (öffnet Mail-App)

4. Rechtliches
- Impressum
- Datenschutz
- AGB
- Preise & Konditionen

Kein Footer.
Keine Mini-Schrift.
Keine Support-Texte.
Unten nur:
„Kein Abo · Keine Laufzeit · Kein Vertrag“

Pflichtdaten:
- Anbietername
- Adresse
- Abholzeiten
- Unternehmensform

Pflicht für Auszahlung:
- IBAN
- Kontoinhaber

Keine Umsatzsteuer-ID.

Rechtstexte:
- Plattformweit einheitlich
- Automatisch personalisiert
- Nicht editierbar

==============================
PUNKT 8 – ABRECHNUNG (FINAL)
==============================

8.1 Startansicht:
- Großer auszahlbarer Betrag
- Letzte Auszahlung (Datum + Betrag)

8.2 Filter:
- Buttons: Heute, Woche, Monat, Benutzerdefiniert
- Monats-Dropdown

8.3 Liste:
- Zeitraum
- Anzahl Verkäufe
- Gesamtbetrag
- Status

8.4 Detailansicht:
- Zeitraum
- Verkäufe
- Gesamtbetrag
- Gebühren
- Auszahlungsbetrag
- Status
- PDF-Download

8.5 Bankdaten:
- Kein Hinweis im Alltag
- Hinweis erst bei Auszahlung

8.6 Auszahlung:
- Standard: automatisch (z. B. wöchentlich)
- Optional: manuell anstoßen

Status-Texte:
- Nächste Auszahlung geplant
- Auszahlung erfolgt
- Auszahlung ausstehend

==============================
ENDE – VERBINDLICHER STAND
==============================

MITTAGIO – KONZEPT ZWISCHENSTAND
Punkte 1–11 FINAL
Stand: 2026-01-18

==============================
PUNKT 11 – ADMIN-DASHBOARD (FINAL)
==============================

Ziel:
Unternehmen steuern, nicht überfrachten.

Zugang:
- Eigener Admin-Modus
- Zugriff über Admin-Rolle (Firebase Claims)
- Nicht sichtbar für Anbieter

Admin-Startseite (KPIs):
1. Aktive Anbieter
2. Umsatz heute
3. Abholcodes heute
4. Neue Anbieter (letzte 7 Tage)

Keine Charts zum Start.

------------------------------
Anbieter-Status (automatisch):
- Neu (registriert, kein Inserat)
- Onboarded (Profil vollständig)
- Aktiv (Inserate online)
- Inaktiv (14 Tage keine Aktivität)
- Deaktiviert (Admin)

Ein Status pro Anbieter.

------------------------------
Anbieter-Übersicht (CRM):
Spalten:
- Anbietername
- Ort
- Status
- Erste Aktivität
- Letzte Aktivität
- Verkäufe gesamt (Mittagio)

Filter:
- Status
- Ort
- Abholcodes genutzt (Ja/Nein)
- Umsatz > 0
- Registrierungszeitraum

Aktionen:
- Profil ansehen
- Anbieter per E-Mail kontaktieren
- Interne Notiz

------------------------------
Anbieter-Detailansicht:
Tabs:
- Überblick
- Inserate
- Abholcodes
- Abrechnung
- Kommunikation

Überblick:
- Stammdaten
- Status
- Inserate gesamt
- Abholcodes genutzt (%)
- Umsatz gesamt

------------------------------
Admin-Eingriffe:
- Anbieter aktivieren/deaktivieren
- Inserat pausieren
- Interne Notiz setzen

Keine Inhalts- oder Preisänderungen.

------------------------------
Monitoring:
- Anbieter 7 Tage inaktiv → Hinweis
- Inserate ohne Abholung → Hinweis
- Hoher Umsatz → Highlight

Keine Alerts, keine Banner.

------------------------------
Admin-Leerzustände:
- Noch keine Anbieter registriert
- Aktuell keine neuen Registrierungen

==============================
ENDE – VERBINDLICHER STAND
==============================

MITTAGIO – GESAMTPROJEKT ZUSAMMENFASSUNG
Stand: 19.–20.01.2026
Basis: stabile Index vom 19.01. (Baseline)

====================
1. ZIEL & USP
====================
Mittagio ist eine app‑artige Online‑Plattform für alle, die Mittagessen anbieten.
Kein Abo, keine Verträge, keine Laufzeiten.
Fokus: einfach einstellen, teilen, vorab bezahlen, strukturiert abholen.

USP:
- Abholcode (vorab bezahlt)
- Weniger Chaos, planbarer Mittag
- Anbieter können ihr Angebot teilen (WhatsApp, Instagram, Website)
- Gäste sehen Angebot, zahlen vorab, holen zur gewählten Zeit ab
- Optional: vor Ort essen möglich

Slogan (fix):
„Dein Mittag! lokal – frisch – digital“

====================
2. TECHNISCHE BASIS
====================
- Repository: GitHub (Single Repo)
- Hosting: Netlify
- App unter /app/index.html
- netlify.toml mit Redirect /app/* → /app/index.html
- Lokales Testen via: python -m http.server
- Baseline-Datei: Index vom 19.01. (funktional, klickbar)

====================
3. ROLLENLOGIK (APP-LIKE)
====================
- Kein Umschalter Kunde/Anbieter/Admin im UI
- Rolle wird über Login / Status bestimmt
- Kunde sieht Kundenmodus
- Anbieter sieht Anbieter-Dashboard
- Admin später separat

====================
4. ANBIETER – ONBOARDING
====================
Ziel: Button-geführt, keine Formulare, jederzeit änderbar.

Schritte:
1. Wie heißt dein Betrieb?
2. Adresse deines Betriebs (Auto-Vervollständigung)
3. Wann können Gäste dein Essen genießen?
   - Standard aus Profil
   - optional „Essenszeit ändern“ → Start/Ende per Buttons
4. Logo hochladen (optional) oder später
5. Abschluss:
   - Zusammenfassung (Logo, Adresse, Essenszeit)
   - Gefühl: „Profil ist bereit“
   - CTA: „Erstes Gericht erstellen“

Regeln:
- Zurück-Button immer sichtbar
- Fortschritt: „Schritt X von Y“
- Kein Online-Bezahlen im Onboarding

====================
5. ANBIETER – DASHBOARD
====================
Bottom Navigation:
- Home
- Abholungen
- Kochbuch
- Profil

Home:
- Neues Gericht erstellen
- Aktive Inserate (Kacheln)
- Wochenvorschau (Swipe, nächste Tage)
- Kleine Stats (Abholcodes heute)

Abholungen:
- Leerer Zustand:
  „Aktuell keine Abholungen geplant.
   Geplante Abholungen sorgen für weniger Chaos.“
- Abholscreen: Codes gruppiert (A1–A5 etc.)
- Sortierung: Zeit / Code / Gruppe

====================
6. ANBIETER – INSERAT ERSTELLEN (PUNKT 6 FINAL)
====================
Kein „10 Schritte“-Stress, aber klarer Flow mit Live‑Preview.

Flow:
1. Gerichtname (Autocomplete)
2. Preis pro Portion
   - Zahlen-Tastatur
   - Default 0,00
3. Essenszeit
   - Anzeige Standard aus Profil
   - optional ändern
4. Allergene
   - Ja / Nein
   - Bei Ja: 14 Allergene als Toggle + Kürzel
5. Extras
   - Presets (Beilagensalat, Extrasoße, Sonstiges)
   - Preis per Zahlen-Tastatur
6. Mehrweg anbieten?
   - Ja / Nein
   - Presets 2€, 3€, 5€, anderer Betrag
7. Foto
   - Kamera / Galerie / ohne Foto
   - Auto-Zuschnitt & Filter später
8. Bezahlung mit Abholcode?
   - Ja / Nein
   - Preview zeigt Badge + Abholcode-Beispiel
9. Vor Ort essen möglich?
   - Ja / Nein
   - Preview zeigt Badge
10. Abschluss:
   - Inserat veröffentlichen
   - In Kochbuch speichern
   - In Wochenplan übernehmen
   - Zurück

Live‑Preview:
- In jedem Schritt sichtbar
- Anbieter sieht sein Gericht wie der Gast

====================
7. ANBIETER – KOCHBUCH
====================
„Dein digitales Kochbuch – dein Kopf in der App“

Inhalte:
- Zuletzt verwendet (Standard)
- Entwürfe (bleiben für immer)
- Filter: alphabetisch, zuletzt verwendet
- Suche nach Gerichtsnamen

Pro Gericht:
- Veröffentlichen
- Bearbeiten
- Fakten:
  - Zuletzt online
  - Verkäufe über Mittagio

====================
8. ANBIETER – WOCHENPLAN
====================
- Swipebare Tage (nächste 5 Tage)
- Pro Tag mehrere Gerichte
- Aktionen wie bei Inseraten
- PDF-Wochenkarte:
  - Einheitliches Layout
  - Logo oben
  - Gericht, Preis, Essenszeit
  - Footer: „Powered by Mittagio“
  - QR-Code

====================
9. ANBIETER – PROFIL (ROW-STRUKTUR)
====================
Reihenfolge:
1. Mein Profil (Übersicht)
2. Profil bearbeiten
   - Name
   - Adresse
   - Logo
   - E-Mail
   - Website
3. Abrechnungen
4. Aktionen
5. FAQs & Hilfe
6. Rechtliches
   - Impressum
   - Datenschutz
   - AGB

App-like Rows, kein Footer-Menü mehr.

====================
10. KUNDENMODUS – ENTDECKEN
====================
Home:
- Standort optional
- Kategorien als Chips:
  vegetarisch, vegan, mit Fleisch
- Nächste 5 Tage (Swipe)

Kacheln:
- Bild mit Badges (Abholcode / vor Ort)
- Gericht + Anbieter + Preis
- Aktionen:
  - Bestellen
  - Favorit (Anbieter)
  - Teilen

====================
11. KUNDENMODUS – WARENKORB
====================
Logik:
- Warenkorb nur möglich, wenn Anbieter Abholcode anbietet
- Ohne Abholcode: nur ansehen

Flow:
1. Gericht im Warenkorb
2. Wann möchtest du ungefähr da sein?
   - Innerhalb Essenszeit
3. Menge wählen
4. Weiter → Zahlung

====================
12. KUNDENMODUS – BESTELLUNGEN
====================
- Liste aller Bestellungen
- Abholnummer immer sichtbar rechts
- Tap auf Abholnummer → Fullscreen Anzeige
- Status: offen / abgeholt

====================
13. SHARING
====================
Anbieter:
- Gericht teilen:
  - Website
  - WhatsApp
  - Instagram
- Vorgabetext:
  „Heute bei uns zu Mittag: {{Gericht}} – {{Preis}}
   powered by Mittagio“

Kunde:
- Gericht teilen aus Entdecken
- Fokus: „Zum Mittag“

====================
14. MONETARISIERUNG
====================
- Einnahmen über Vorab-Bezahlung
- Online-Zahlung = Abholcode
- Keine Bestellung ohne Bezahlung
- Anbieter sehen Badge, Gäste auch
- Social Proof durch Badges

====================
15. REGELN FÜR WEITERARBEIT
====================
- Baseline = Index vom 19.01.
- Änderungen blockweise
- Kein Neuschreiben der gesamten Index
- Ein Thema = ein Commit
- Erst UX klären, dann Code

====================
ENDE
====================
